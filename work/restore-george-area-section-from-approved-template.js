const fs = require('fs');

const site = 'https://dev1.mynewwebsite.co.za';
const username = 'barry';
const password = process.env.BARRY_APP_PASS;
if (!password) throw new Error('Missing BARRY_APP_PASS');
const auth = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`;
const pageId = 6710;
const serviceAreasId = 6414;

const suburbs = [
  ['Heather Park', 'heather-park', 'Plumbing support for homes, estates, rentals and guest accommodation around Heather Park and nearby western George routes.'],
  ['Fancourt', 'fancourt', 'Plumbing help for estate homes, guest stays and managed properties near Fancourt, where neat work and clear access planning matter.'],
  ['Kingswood Golf Estate', 'kingswood-golf-estate', 'Plumbing service for estate homes and rental properties around Kingswood, including leaks, drains, fixtures and planned maintenance.'],
  ['George Central', 'george-central', 'Help for town-centre homes, shops, offices and older buildings where pipe layouts and access points can vary from property to property.'],
  ['Blanco', 'blanco', 'Plumbing support for Blanco homes, guesthouses and estate-style properties close to the western side of George.'],
  ['Loerie Park', 'loerie-park', 'Practical plumbing help for family homes and rental properties in Loerie Park, from everyday faults to drainage concerns.'],
  ['Bergsig', 'bergsig', 'Service coverage for Bergsig properties where pressure changes, older fittings, leaks and drainage issues need careful checking.'],
  ['Denneoord', 'denneoord', 'Plumbing help for Denneoord homes near the mountain side of George, including repairs, renovations and water fault checks.'],
  ['Camphers Drift', 'camphers-drift', 'Support for leafy residential streets, cottages and guest accommodation close to town, with a practical approach to plumbing faults.'],
  ['Dormehls Drift', 'dormehls-drift', 'Plumbing service for central George properties where neat access, clear communication and careful repair planning are often important.'],
  ['Levalia', 'levalia', 'Everyday plumbing help for Levalia homes and local properties, including leaks, fixtures, blocked drains and maintenance work.'],
  ['Pacaltsdorp', 'pacaltsdorp', 'Plumbing support for busy homes and businesses in Pacaltsdorp, with practical fault checks and straightforward service guidance.'],
];

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

function walk(el, fn) {
  fn(el);
  (el.elements || []).forEach(child => walk(child, fn));
}

function hasText(section, re) {
  let found = false;
  walk(section, node => {
    if (found || !node.settings) return;
    for (const value of Object.values(node.settings)) {
      if (typeof value === 'string' && re.test(value)) found = true;
    }
  });
  return found;
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

function collect(section, type) {
  const out = [];
  walk(section, node => {
    if (node.widgetType === type) out.push(node);
  });
  return out;
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

function setButton(widget, text, url) {
  if (!widget?.settings) return;
  if ('text' in widget.settings) widget.settings.text = text;
  if ('button_text' in widget.settings) widget.settings.button_text = text;
  if ('link' in widget.settings) widget.settings.link = { url, is_external: false, nofollow: false, custom_attributes: '' };
  if ('button_link' in widget.settings) widget.settings.button_link = { url, is_external: false, nofollow: false, custom_attributes: '' };
  if (widget.settings.__dynamic__) {
    delete widget.settings.__dynamic__.link;
    delete widget.settings.__dynamic__.button_link;
  }
}

function setImage(widget, suburb) {
  if (!widget?.settings) return;
  const [name, slug] = suburb;
  const url = `https://dev1.mynewwebsite.co.za/wp-content/uploads/2026/07/h2o-plumbers-plumber-${slug}-george-service-area.webp`;
  widget.settings.image = { id: '', url };
  widget.settings.image_alt = `Plumber in ${name} George local service area landscape for H2O Plumbers`;
}

function removeAddedCtas(section) {
  return hasText(section, /Need plumbing help in George\?|Have a plumbing issue in your area\?/i);
}

function normaliseApprovedSection(section) {
  const headings = collect(section, 'heading');
  const textEditors = collect(section, 'text-editor');
  const images = collect(section, 'image');
  const buttons = collect(section, 'button');

  const eyebrow = headings.find(h => /^GEORGE$/i.test((h.settings?.title || h.settings?.ekit_title || '').trim())) || headings[0];
  if (eyebrow) setHeading(eyebrow, 'GEORGE');

  // The approved section has no separate H2 widget in the exported source, so preserve the existing structure.
  // Only update card widgets, images and copy.
  const cardHeadings = headings.filter(h => h !== eyebrow).slice(0, suburbs.length);
  const cardTexts = textEditors.slice(0, suburbs.length);

  suburbs.forEach((suburb, index) => {
    const [name, slug, desc] = suburb;
    if (cardHeadings[index]) setHeading(cardHeadings[index], name);
    if (cardTexts[index]) setText(cardTexts[index], desc);
    if (buttons[index]) setButton(buttons[index], `Plumber In ${name}`, `#${slug}-spoke`);
    if (images[index]) setImage(images[index], suburb);
  });
  return section;
}

async function main() {
  const [page, serviceAreas] = await Promise.all([
    wp(`/wp-json/wp/v2/pages/${pageId}?context=edit`),
    wp(`/wp-json/wp/v2/pages/${serviceAreasId}?context=edit`),
  ]);
  const data = JSON.parse(page.meta._elementor_data).filter(section => !removeAddedCtas(section));
  const serviceAreasData = JSON.parse(serviceAreas.meta._elementor_data);
  const approved = serviceAreasData.find(section => hasText(section, /Heather Park/i) && hasText(section, /Kingswood Golf Estate/i) && hasText(section, /^GEORGE$/i));
  if (!approved) throw new Error('Approved George section not found on Service Areas page');
  const replacement = normaliseApprovedSection(reid(clone(approved)));
  const index = data.findIndex(section => hasText(section, /Plumber In George And Nearby Areas|service-area-suburb-card|Kingswood Golf Estate/i));
  if (index < 0) throw new Error('Current local area section not found on George page');
  data[index] = replacement;
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
  fs.writeFileSync('C:/Users/USER/Documents/Codex/Barry/work/george-6710-restored-approved-area-section.json', JSON.stringify(data, null, 2));
  console.log(JSON.stringify({ removedAddedCtas: true, replacedIndex: index, cards: suburbs.length }, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
