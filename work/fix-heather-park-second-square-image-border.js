const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const site = 'https://dev1.mynewwebsite.co.za';
const username = 'barry';
const password = process.env.BARRY_APP_PASS;
if (!password) throw new Error('Missing BARRY_APP_PASS');
const auth = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`;

const pageId = 6732;
const src = 'C:/Users/USER/Documents/Codex/Barry/clients/H2O Plumbers/assets/AI Images/location-hubs/heather-park/h2o-plumbers-plumbing-consultation-heather-park-square.webp';
const out = 'C:/Users/USER/Documents/Codex/Barry/clients/H2O Plumbers/assets/AI Images/location-hubs/heather-park/fixed/h2o-plumbers-plumbing-consultation-heather-park-square-edge-to-edge.webp';
const alt = 'H2O Plumbers discussing plumbing repairs with a Heather Park homeowner';

function cleanImage() {
  const py = 'C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe';
  const code = `
from PIL import Image, ImageChops
from pathlib import Path
src=Path(r'''${src}''')
out=Path(r'''${out}''')
out.parent.mkdir(parents=True, exist_ok=True)
im=Image.open(src).convert('RGB')
# Detect and remove near-white generated margins.
bg=Image.new('RGB', im.size, (255,255,255))
diff=ImageChops.difference(im, bg).convert('L')
mask=diff.point(lambda p: 255 if p > 18 else 0)
bbox=mask.getbbox()
if bbox:
    l,t,r,b=bbox
    pad=2
    im=im.crop((max(0,l-pad), max(0,t-pad), min(im.size[0],r+pad), min(im.size[1],b+pad)))
target=(1000,1000)
scale=max(target[0]/im.size[0], target[1]/im.size[1])
resized=im.resize((round(im.size[0]*scale), round(im.size[1]*scale)), Image.LANCZOS)
left=(resized.size[0]-target[0])//2
top=(resized.size[1]-target[1])//2
final=resized.crop((left, top, left+target[0], top+target[1]))
final.save(out, 'WEBP', quality=84, method=6)
`;
  const result = spawnSync(py, ['-c', code], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(result.stderr || result.stdout);
}

async function wp(endpoint, options = {}) {
  const res = await fetch(`${site}${endpoint}`, {
    ...options,
    headers: { Authorization: auth, 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  const text = await res.text();
  let body = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  if (!res.ok) throw new Error(`${options.method || 'GET'} ${endpoint} failed ${res.status}: ${typeof body === 'string' ? body.slice(0, 500) : JSON.stringify(body).slice(0, 500)}`);
  return body;
}

async function upload() {
  const res = await fetch(`${site}/wp-json/wp/v2/media`, {
    method: 'POST',
    headers: {
      Authorization: auth,
      'Content-Type': 'image/webp',
      'Content-Disposition': `attachment; filename="${path.basename(out)}"`,
    },
    body: fs.readFileSync(out),
  });
  const text = await res.text();
  let body = null;
  try { body = JSON.parse(text); } catch { body = text; }
  if (!res.ok) throw new Error(`media upload failed ${res.status}: ${typeof body === 'string' ? body.slice(0, 500) : JSON.stringify(body).slice(0, 500)}`);
  await wp(`/wp-json/wp/v2/media/${body.id}`, { method: 'POST', body: JSON.stringify({ title: 'H2O Plumbers Heather Park consultation image edge to edge', alt_text: alt, caption: alt }) });
  return { id: body.id, url: body.source_url, alt, source: 'library', size: 'full' };
}

function walk(el, fn) {
  fn(el);
  (el.elements || []).forEach((child) => walk(child, fn));
}

function imageWidgets(section) {
  const out = [];
  walk(section, (node) => {
    if (node.widgetType === 'image') out.push(node);
  });
  return out;
}

async function main() {
  cleanImage();
  const media = await upload();
  const page = await wp(`/wp-json/wp/v2/pages/${pageId}?context=edit`);
  const data = JSON.parse(page.meta._elementor_data);
  const widget = imageWidgets(data[3])[0];
  widget.settings.image = { id: media.id, url: media.url, alt: media.alt, source: 'library', size: 'full' };
  widget.settings.image_alt = media.alt;
  widget.settings.image_custom_dimension = { width: '1000', height: '1000' };
  widget.settings['object-fit'] = 'cover';
  widget.settings['object-fit_tablet'] = 'cover';
  widget.settings['object-fit_mobile'] = 'cover';
  widget.settings.image_border_radius = { unit: 'px', top: '10', right: '10', bottom: '10', left: '10', isLinked: true };

  await wp(`/wp-json/wp/v2/pages/${pageId}`, {
    method: 'POST',
    body: JSON.stringify({
      meta: {
        _elementor_edit_mode: 'builder',
        _elementor_template_type: 'wp-page',
        _elementor_data: JSON.stringify(data),
        _elementor_page_settings: page.meta._elementor_page_settings || {},
      },
    }),
  });
  await wp('/wp-json/elementor/v1/cache', { method: 'DELETE' });
  console.log(JSON.stringify({ pageId, media }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
