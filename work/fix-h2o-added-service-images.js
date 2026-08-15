const fs = require('fs');
const path = require('path');

const site = 'https://dev1.mynewwebsite.co.za';
const username = 'barry';
const password = process.env.BARRY_APP_PASS;
if (!password) throw new Error('Missing BARRY_APP_PASS');
const auth = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`;
const workRoot = 'C:/Users/USER/Documents/Codex/Barry/work';
const imgRoot = 'C:/Users/USER/Documents/Codex/Barry/clients/H2O Plumbers/assets/AI Images/service-pages-webp';

const targets = {
  'commercial-plumbing': {
    pageId: 6663,
    pageSlug: 'commercial-plumbing-garden-route',
    name: 'Commercial Plumbing',
    short: 'commercial plumbing',
    square: path.join(imgRoot, 'h2o-plumbers-commercial-plumbing-garden-route-service-square.webp'),
    background: path.join(imgRoot, 'h2o-plumbers-commercial-plumbing-garden-route-service-background.webp'),
  },
  'water-pressure-problems': {
    pageId: 6664,
    pageSlug: 'water-pressure-problems-garden-route',
    name: 'Water Pressure Problems',
    short: 'water pressure problems',
    square: path.join(imgRoot, 'h2o-plumbers-water-pressure-problems-garden-route-service-square.webp'),
    background: path.join(imgRoot, 'h2o-plumbers-water-pressure-problems-garden-route-service-background.webp'),
  },
};

async function wp(endpoint, options = {}) {
  const res = await fetch(`${site}${endpoint}`, {
    ...options,
    headers: { Authorization: auth, 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  const text = await res.text();
  let body = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  if (!res.ok) throw new Error(`${options.method || 'GET'} ${endpoint} failed ${res.status}: ${typeof body === 'string' ? body.slice(0, 400) : JSON.stringify(body).slice(0, 400)}`);
  return body;
}

async function uploadMedia(file, title, alt) {
  const res = await fetch(`${site}/wp-json/wp/v2/media`, {
    method: 'POST',
    headers: {
      Authorization: auth,
      'Content-Type': 'image/webp',
      'Content-Disposition': `attachment; filename="${path.basename(file)}"`,
    },
    body: fs.readFileSync(file),
  });
  const text = await res.text();
  let media;
  try { media = JSON.parse(text); } catch { media = text; }
  if (!res.ok) throw new Error(`media upload failed ${res.status}: ${typeof media === 'string' ? media.slice(0, 300) : JSON.stringify(media).slice(0, 300)}`);
  await wp(`/wp-json/wp/v2/media/${media.id}`, {
    method: 'POST',
    body: JSON.stringify({ title, alt_text: alt, caption: alt }),
  });
  return { id: media.id, url: media.source_url, alt };
}

function find(id, els) {
  for (const e of els) {
    if (e.id === id) return e;
    const f = find(id, e.elements || []);
    if (f) return f;
  }
}
function mediaObj(m) { return { id: m.id, url: m.url, alt: m.alt, source: 'library', size: 'full' }; }
function setBackground(el, media) {
  if (!el?.settings) return;
  el.settings.background_image = mediaObj(media);
  el.settings.background_video_fallback = mediaObj(media);
  el.settings.background_video_link = '';
  el.settings.background_position = 'center center';
  el.settings.background_size = 'cover';
}
function setImage(el, media) {
  if (!el?.settings) return;
  el.settings.image = mediaObj(media);
}

async function updateServicePage(target, media) {
  const page = await wp(`/wp-json/wp/v2/pages/${target.pageId}?context=edit`);
  const data = JSON.parse(page.meta._elementor_data);
  setBackground(find('8c893f2', data), media.background);
  setBackground(find('26c91ca', data), media.background);
  setBackground(find('a1fe463', data), media.background);
  setImage(find('63c3393', data), media.square);
  setImage(find('9204026', data), media.square);
  await wp(`/wp-json/wp/v2/pages/${target.pageId}`, {
    method: 'POST',
    body: JSON.stringify({ meta: { _elementor_data: JSON.stringify(data) } }),
  });
}

async function updateHub(mediaMap) {
  const page = await wp('/wp-json/wp/v2/pages/6217?context=edit');
  const data = JSON.parse(page.meta._elementor_data);
  const ids = {
    'commercial-plumbing': 'a750002',
    'water-pressure-problems': 'a760002',
  };
  for (const [slug, imgId] of Object.entries(ids)) {
    setImage(find(imgId, data), mediaMap[slug].square);
  }
  await wp('/wp-json/wp/v2/pages/6217', {
    method: 'POST',
    body: JSON.stringify({ meta: { _elementor_data: JSON.stringify(data) } }),
  });
}

async function main() {
  const mediaMap = {};
  for (const [slug, target] of Object.entries(targets)) {
    mediaMap[slug] = {
      square: await uploadMedia(target.square, `H2O Plumbers ${target.name} Garden Route service image`, `H2O Plumbers ${target.short} service in the Garden Route`),
      background: await uploadMedia(target.background, `H2O Plumbers ${target.name} Garden Route background image`, `H2O Plumbers ${target.short} support for Garden Route homes and businesses`),
    };
    await updateServicePage(target, mediaMap[slug]);
  }
  await updateHub(mediaMap);
  fs.writeFileSync(path.join(workRoot, 'h2o-added-service-corrected-media.json'), JSON.stringify(mediaMap, null, 2));
  console.log(JSON.stringify({ corrected: Object.keys(mediaMap) }, null, 2));
}

main().catch(err => { console.error(err.stack || err.message); process.exit(1); });
