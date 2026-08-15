const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const site = 'https://dev1.mynewwebsite.co.za';
const username = 'barry';
const password = process.env.BARRY_APP_PASS;
if (!password) throw new Error('Missing BARRY_APP_PASS');

const auth = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`;
const pageId = 6732;
const sourceDir = 'C:/Users/USER/Documents/Codex/Barry/clients/H2O Plumbers/assets/AI Images/location-hubs/heather-park';
const fixedDir = path.join(sourceDir, 'fixed');
fs.mkdirSync(fixedDir, { recursive: true });

const files = {
  hero: {
    src: path.join(sourceDir, 'h2o-plumbers-professional-plumber-heather-park-hero.webp'),
    out: path.join(fixedDir, 'h2o-plumbers-professional-plumber-heather-park-hero-clean.webp'),
    size: [1920, 1080],
    crop: 12,
    title: 'Professional plumber Heather Park hero image',
    alt: 'Professional plumber in Heather Park with H2O Plumbers serving local homes and estates',
  },
  support1: {
    src: path.join(sourceDir, 'h2o-plumbers-plumbing-team-heather-park-support-square.webp'),
    out: path.join(fixedDir, 'h2o-plumbers-plumbing-team-heather-park-square-clean.webp'),
    size: [1000, 1000],
    crop: 8,
    title: 'H2O Plumbers team Heather Park plumbing support image',
    alt: 'H2O Plumbers team checking outdoor plumbing at a Heather Park home',
  },
  support2: {
    src: path.join(sourceDir, 'h2o-plumbers-plumbing-consultation-heather-park-square.webp'),
    out: path.join(fixedDir, 'h2o-plumbers-plumbing-consultation-heather-park-square-clean.webp'),
    size: [1000, 1000],
    crop: 8,
    title: 'H2O Plumbers Heather Park consultation image',
    alt: 'H2O Plumbers discussing plumbing repairs with a Heather Park homeowner',
  },
};

function makeCleanImages() {
  const py = 'C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe';
  const code = `
from PIL import Image
tasks = ${JSON.stringify(Object.values(files).map((f) => ({
    src: f.src,
    out: f.out,
    size: f.size,
    crop: f.crop,
  })))}
for task in tasks:
    im = Image.open(task['src']).convert('RGB')
    c = task['crop']
    if c:
        im = im.crop((c, c, im.size[0] - c, im.size[1] - c))
    target = tuple(task['size'])
    scale = max(target[0] / im.size[0], target[1] / im.size[1])
    resized = im.resize((round(im.size[0] * scale), round(im.size[1] * scale)), Image.LANCZOS)
    left = (resized.size[0] - target[0]) // 2
    top = (resized.size[1] - target[1]) // 2
    final = resized.crop((left, top, left + target[0], top + target[1]))
    final.save(task['out'], 'WEBP', quality=84, method=6)
`;
  const result = spawnSync(py, ['-c', code], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(result.stderr || result.stdout);
}

async function wp(endpoint, options = {}) {
  const res = await fetch(`${site}${endpoint}`, {
    ...options,
    headers: {
      Authorization: auth,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const text = await res.text();
  let body = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }
  if (!res.ok) throw new Error(`${options.method || 'GET'} ${endpoint} failed ${res.status}: ${typeof body === 'string' ? body.slice(0, 500) : JSON.stringify(body).slice(0, 500)}`);
  return body;
}

async function uploadWebp(fileInfo) {
  const res = await fetch(`${site}/wp-json/wp/v2/media`, {
    method: 'POST',
    headers: {
      Authorization: auth,
      'Content-Type': 'image/webp',
      'Content-Disposition': `attachment; filename="${path.basename(fileInfo.out)}"`,
    },
    body: fs.readFileSync(fileInfo.out),
  });
  const text = await res.text();
  let body = null;
  try {
    body = JSON.parse(text);
  } catch {
    body = text;
  }
  if (!res.ok) throw new Error(`media upload failed ${res.status}: ${typeof body === 'string' ? body.slice(0, 500) : JSON.stringify(body).slice(0, 500)}`);
  await wp(`/wp-json/wp/v2/media/${body.id}`, {
    method: 'POST',
    body: JSON.stringify({ title: fileInfo.title, alt_text: fileInfo.alt, caption: fileInfo.alt }),
  });
  return { id: body.id, url: body.source_url, alt: fileInfo.alt, source: 'library', size: 'full' };
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

function textWidgets(section) {
  const out = [];
  walk(section, (node) => {
    if (node.widgetType === 'text-editor') out.push(node);
  });
  return out;
}

function headingWidgets(section) {
  const out = [];
  walk(section, (node) => {
    if (node.widgetType === 'heading') out.push(node);
  });
  return out;
}

function applySquareImage(widget, media) {
  widget.settings.image = { id: media.id, url: media.url, alt: media.alt, source: 'library', size: 'full' };
  widget.settings.image_size = 'full';
  widget.settings.image_alt = media.alt;
  widget.settings['object-fit'] = 'cover';
  widget.settings['object-fit_tablet'] = 'cover';
  widget.settings['object-fit_mobile'] = 'cover';
  widget.settings.image_custom_dimension = { width: '1000', height: '1000' };
}

async function main() {
  makeCleanImages();
  const media = {
    hero: await uploadWebp(files.hero),
    support1: await uploadWebp(files.support1),
    support2: await uploadWebp(files.support2),
  };

  const page = await wp(`/wp-json/wp/v2/pages/${pageId}?context=edit`);
  const data = JSON.parse(page.meta._elementor_data);

  const hero = data[0];
  hero.settings.background_image = { ...hero.settings.background_image, ...media.hero };
  hero.settings.background_video_fallback = { ...hero.settings.background_video_fallback, ...media.hero };
  hero.settings.background_slideshow_gallery = [];

  applySquareImage(imageWidgets(data[2])[0], media.support1);
  applySquareImage(imageWidgets(data[3])[0], media.support2);

  const areaHeadings = headingWidgets(data[6]);
  if (areaHeadings[0]) areaHeadings[0].settings.title = 'LOCAL AUTHORITY';
  if (areaHeadings[1]) areaHeadings[1].settings.title = 'Where Private Plumbing Ends and Municipal Reporting Starts in Heather Park';
  const areaText = textWidgets(data[6])[0];
  if (areaText) {
    areaText.settings.editor = 'H2O Plumbers handles plumbing work inside Heather Park properties, including homes, estates, rentals, guest accommodation and small business spaces. If a fault appears to involve municipal water supply, public sewer lines or stormwater outside the property boundary, report it through <a href="https://www.george.gov.za/" target="_blank" rel="noopener">George Municipality</a> so the correct public-service team can investigate.';
  }

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
