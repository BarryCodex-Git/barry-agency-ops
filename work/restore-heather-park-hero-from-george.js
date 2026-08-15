const site = 'https://dev1.mynewwebsite.co.za';
const username = 'barry';
const password = process.env.BARRY_APP_PASS;
if (!password) throw new Error('Missing BARRY_APP_PASS');

const auth = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`;
const sourcePageId = 6710;
const targetPageId = 6732;
const heroMedia = {
  id: 6729,
  url: 'https://dev1.mynewwebsite.co.za/wp-content/uploads/2026/07/h2o-plumbers-professional-plumber-heather-park-hero.webp',
  alt: 'Professional plumber Heather Park with H2O Plumbers branded service vehicle',
  source: 'library',
  size: 'full',
};

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
  if (!res.ok) {
    throw new Error(`${options.method || 'GET'} ${endpoint} failed ${res.status}: ${typeof body === 'string' ? body.slice(0, 500) : JSON.stringify(body).slice(0, 500)}`);
  }
  return body;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function newId() {
  return Math.random().toString(16).slice(2, 9);
}

function reid(el) {
  el.id = newId();
  (el.elements || []).forEach(reid);
  return el;
}

function walk(el, fn) {
  fn(el);
  (el.elements || []).forEach((child) => walk(child, fn));
}

function setHeading(widget, value) {
  if (!widget?.settings) return;
  if ('title' in widget.settings) widget.settings.title = value;
  if ('ekit_title' in widget.settings) widget.settings.ekit_title = value;
}

function setText(widget, value) {
  if (!widget?.settings) return;
  if ('editor' in widget.settings) widget.settings.editor = value;
  if ('text' in widget.settings) widget.settings.text = value;
}

function headings(section) {
  const out = [];
  walk(section, (node) => {
    if (node.widgetType === 'heading') out.push(node);
  });
  return out;
}

function textEditors(section) {
  const out = [];
  walk(section, (node) => {
    if (node.widgetType === 'text-editor') out.push(node);
  });
  return out;
}

function replaceVisibleGeorgeText(section) {
  walk(section, (node) => {
    if (!node.settings) return;
    for (const [key, value] of Object.entries(node.settings)) {
      if (typeof value !== 'string' || /url|link|css|class/i.test(key)) continue;
      node.settings[key] = value
        .replace(/Professional Plumber In George/g, 'Professional Plumber In Heather Park')
        .replace(/Plumber In George/g, 'Plumber In Heather Park')
        .replace(/Plumber George/g, 'Plumber Heather Park')
        .replace(/in George/g, 'in Heather Park')
        .replace(/around George/g, 'around Heather Park')
        .replace(/George homes/g, 'Heather Park homes')
        .replace(/George customers/g, 'Heather Park customers');
    }
  });
}

function applyHeroMediaOnlyToApprovedFields(hero) {
  if (!hero.settings) throw new Error('Approved hero section has no settings');
  for (const key of ['background_image', 'background_video_fallback']) {
    if (!hero.settings[key] || typeof hero.settings[key] !== 'object') {
      throw new Error(`Approved hero missing ${key}`);
    }
    hero.settings[key] = { ...hero.settings[key], ...heroMedia };
  }
}

async function main() {
  const source = await wp(`/wp-json/wp/v2/pages/${sourcePageId}?context=edit`);
  const target = await wp(`/wp-json/wp/v2/pages/${targetPageId}?context=edit`);

  const sourceData = JSON.parse(source.meta._elementor_data);
  const targetData = JSON.parse(target.meta._elementor_data);
  const hero = reid(clone(sourceData[0]));

  applyHeroMediaOnlyToApprovedFields(hero);
  replaceVisibleGeorgeText(hero);

  const hs = headings(hero);
  if (hs[0]) setHeading(hs[0], 'Professional Plumber In Heather Park');

  const ts = textEditors(hero);
  if (ts[0]) {
    setText(ts[0], 'H2O Plumbers helps Heather Park homes, estates, rentals and guest properties with practical plumbing repairs, leak checks, blocked drains and planned plumbing work around the western side of George.');
  }

  targetData[0] = hero;

  await wp(`/wp-json/wp/v2/pages/${targetPageId}`, {
    method: 'POST',
    body: JSON.stringify({
      meta: {
        _elementor_edit_mode: 'builder',
        _elementor_template_type: 'wp-page',
        _elementor_data: JSON.stringify(targetData),
        _elementor_page_settings: target.meta._elementor_page_settings || {},
      },
    }),
  });
  await wp('/wp-json/elementor/v1/cache', { method: 'DELETE' });

  console.log(JSON.stringify({
    page: targetPageId,
    restoredFrom: sourcePageId,
    changedFields: ['background_image', 'background_video_fallback', 'hero visible text'],
    preserved: ['background overlay settings', 'position settings', 'shape dividers', 'container spacing'],
  }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
