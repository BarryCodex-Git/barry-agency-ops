const fs = require('fs');
const path = require('path');

const site = 'https://dev1.mynewwebsite.co.za';
const username = 'barry';
const password = process.env.BARRY_APP_PASS;
if (!password) throw new Error('Missing BARRY_APP_PASS');
const auth = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`;

const pageId = 6710;
const serviceAreasId = 6414;
const clientRoot = 'C:/Users/USER/Documents/Codex/Barry/clients/H2O Plumbers';
const imageRoot = path.join(clientRoot, 'assets/AI Images');
const locationRoot = path.join(imageRoot, 'location-hubs');

const localAreas = [
  ['Heather Park', '/service-areas/george/heather-park/', 'Plumbing support for homes, estates, rentals and guest accommodation around Heather Park and nearby western George routes.'],
  ['Fancourt', '/service-areas/george/fancourt/', 'Plumbing help for estate homes, guest stays and managed properties near Fancourt, where neat work and clear access planning matter.'],
  ['Kingswood Golf Estate', '/service-areas/george/kingswood-golf-estate/', 'Plumbing service for estate homes and rental properties around Kingswood, including leaks, drains, fixtures and planned maintenance.'],
  ['George Central', '/service-areas/george/george-central/', 'Help for town-centre homes, shops, offices and older buildings where pipe layouts and access points can vary from property to property.'],
  ['Blanco', '/service-areas/george/blanco/', 'Plumbing support for Blanco homes, guesthouses and estate-style properties close to the western side of George.'],
  ['Loerie Park', '/service-areas/george/loerie-park/', 'Practical plumbing help for family homes and rental properties in Loerie Park, from everyday faults to drainage concerns.'],
  ['Bergsig', '/service-areas/george/bergsig/', 'Service coverage for Bergsig properties where pressure changes, older fittings, leaks and drainage issues need careful checking.'],
  ['Denneoord', '/service-areas/george/denneoord/', 'Plumbing help for Denneoord homes near the mountain side of George, including repairs, renovations and water fault checks.'],
  ['Camphers Drift', '/service-areas/george/camphers-drift/', 'Support for leafy residential streets, cottages and guest accommodation close to town, with a practical approach to plumbing faults.'],
  ['Dormehls Drift', '/service-areas/george/dormehls-drift/', 'Plumbing service for central George properties where neat access, clear communication and careful repair planning are often important.'],
  ['Levalia', '/service-areas/george/levalia/', 'Everyday plumbing help for Levalia homes and local properties, including leaks, fixtures, blocked drains and maintenance work.'],
  ['Pacaltsdorp', '/service-areas/george/pacaltsdorp/', 'Plumbing support for busy homes and businesses in Pacaltsdorp, with practical fault checks and straightforward service guidance.'],
];

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
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  if (!res.ok) {
    throw new Error(`${options.method || 'GET'} ${endpoint} failed ${res.status}: ${typeof body === 'string' ? body.slice(0, 500) : JSON.stringify(body).slice(0, 500)}`);
  }
  return body;
}

async function uploadWebp(file, title, alt) {
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
  let body = null;
  try { body = JSON.parse(text); } catch { body = text; }
  if (!res.ok) throw new Error(`media upload failed ${res.status}: ${typeof body === 'string' ? body.slice(0, 300) : JSON.stringify(body).slice(0, 300)}`);
  await wp(`/wp-json/wp/v2/media/${body.id}`, { method: 'POST', body: JSON.stringify({ title, alt_text: alt, caption: alt }) });
  return { id: body.id, url: body.source_url, alt };
}

function newId() {
  return Math.random().toString(16).slice(2, 9);
}

function cloneDeep(value) {
  return JSON.parse(JSON.stringify(value));
}

function walk(el, fn, parent = null) {
  fn(el, parent);
  (el.elements || []).forEach(child => walk(child, fn, el));
}

function textIncludes(el, patterns) {
  let found = false;
  walk(el, node => {
    if (found || !node.settings) return;
    for (const value of Object.values(node.settings)) {
      if (typeof value === 'string' && patterns.some(p => p.test(value))) found = true;
    }
  });
  return found;
}

function reid(el) {
  el.id = newId();
  (el.elements || []).forEach(reid);
  return el;
}

function getEditableData(page) {
  const raw = page.meta?._elementor_data;
  if (!raw) throw new Error(`Page ${page.id} has no editable Elementor data`);
  return JSON.parse(raw);
}

function setImage(widget, media) {
  if (!widget?.settings) return;
  widget.settings.image = { id: media.id, url: media.url };
  widget.settings.image_alt = media.alt;
}

function firstSetting(settings, keys) {
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(settings, key)) return key;
  }
  return null;
}

function setHeading(widget, value) {
  if (!widget?.settings) return;
  const key = firstSetting(widget.settings, ['title', 'ekit_title', 'header_title']);
  if (key) widget.settings[key] = value;
}

function setText(widget, value) {
  if (!widget?.settings) return;
  const key = firstSetting(widget.settings, ['editor', 'text', 'description_text']);
  if (key) widget.settings[key] = value;
}

function setButton(widget, text, url) {
  if (!widget?.settings) return;
  const textKey = firstSetting(widget.settings, ['text', 'button_text']);
  if (textKey) widget.settings[textKey] = text;
  const linkKey = firstSetting(widget.settings, ['link', 'button_link']);
  if (linkKey) widget.settings[linkKey] = { url, is_external: false, nofollow: false, custom_attributes: '' };
  if (widget.settings.__dynamic__?.[linkKey]) delete widget.settings.__dynamic__[linkKey];
}

function collectWidgets(section, type) {
  const out = [];
  walk(section, node => {
    if (node.widgetType === type) out.push(node);
  });
  return out;
}

function makeCtaSection() {
  return {
    id: newId(),
    elType: 'container',
    settings: {
      content_width: 'boxed',
      boxed_width: { unit: 'px', size: 1180, sizes: [] },
      flex_direction: 'row',
      justify_content: 'center',
      gap: { unit: 'px', size: 20, sizes: [] },
      margin: { unit: 'px', top: '5', right: '0', bottom: '25', left: '0', isLinked: false },
      padding: { unit: 'px', top: '0', right: '20', bottom: '0', left: '20', isLinked: false },
    },
    elements: [
      {
        id: newId(),
        elType: 'widget',
        widgetType: 'button',
        settings: {
          text: 'WhatsApp Us',
          link: { url: 'https://wa.me/27726514447', is_external: false, nofollow: false, custom_attributes: '' },
          icon: { value: 'fab fa-whatsapp', library: 'fa-brands' },
          icon_align: 'left',
          button_background_color: '#6090C0',
          button_text_color: '#FFFFFF',
          border_radius: { unit: 'px', top: '6', right: '6', bottom: '6', left: '6', isLinked: true },
          button_box_shadow_box_shadow_type: 'yes',
          button_box_shadow_box_shadow: { horizontal: 0, vertical: 3, blur: 10, spread: 0, color: 'rgba(16,96,176,0.18)' },
        },
        elements: [],
      },
      {
        id: newId(),
        elType: 'widget',
        widgetType: 'button',
        settings: {
          text: '072 651 4447',
          link: { url: 'tel:0726514447', is_external: false, nofollow: false, custom_attributes: '' },
          icon: { value: 'fas fa-phone-alt', library: 'fa-solid' },
          icon_align: 'left',
          button_background_color: '#FFFFFF',
          button_text_color: '#6090C0',
          border_border: 'solid',
          border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
          border_color: '#1060B0',
          border_radius: { unit: 'px', top: '6', right: '6', bottom: '6', left: '6', isLinked: true },
        },
        elements: [],
      },
    ],
    isInner: false,
  };
}

function fixExistingCtas(data) {
  const buttons = [];
  data.forEach(section => walk(section, node => {
    if (node.widgetType === 'button') buttons.push(node);
  }));
  let flip = 0;
  for (const btn of buttons) {
    const text = btn.settings?.text || btn.settings?.button_text || '';
    if (/Get Free Quote|WhatsApp|Call|405|768|072/.test(text)) {
      if (flip % 2 === 0) setButton(btn, 'WhatsApp Us', 'https://wa.me/27726514447');
      else setButton(btn, '072 651 4447', 'tel:0726514447');
      flip++;
    }
  }
}

async function main() {
  const [page, serviceAreas] = await Promise.all([
    wp(`/wp-json/wp/v2/pages/${pageId}?context=edit`),
    wp(`/wp-json/wp/v2/pages/${serviceAreasId}?context=edit`),
  ]);
  const data = getEditableData(page);
  const serviceAreasData = getEditableData(serviceAreas);

  const sourceSection = serviceAreasData.find(sec => textIncludes(sec, [/Heather Park/i, /Kingswood Golf Estate/i, /Plumber In George/i]));
  if (!sourceSection) throw new Error('Could not find George service area card section on Service Areas page');

  const landscapeMedia = await uploadWebp(
    path.join(locationRoot, 'h2o-plumbers-plumber-george-location-hub-background.webp'),
    'Plumber George local service area view',
    'View over George service areas for H2O Plumbers plumbing support'
  );
  const alternateMedia = await uploadWebp(
    path.join(clientRoot, 'assets/AI Images/about-us/h2o-plumbers-about-local-plumbing-team-george.webp'),
    'H2O Plumbers George local plumbing discussion',
    'H2O Plumbers team discussing practical plumbing support at a George property'
  );

  // Stop the same George landscape image being used in consecutive two-column content blocks.
  const allImages = [];
  data.forEach(section => walk(section, node => {
    if (node.widgetType === 'image') allImages.push(node);
  }));
  if (allImages[1]) setImage(allImages[1], alternateMedia);

  fixExistingCtas(data);

  const localSection = reid(cloneDeep(sourceSection));
  const headings = collectWidgets(localSection, 'heading');
  const textEditors = collectWidgets(localSection, 'text-editor');
  const imageWidgets = collectWidgets(localSection, 'image');
  const buttons = collectWidgets(localSection, 'button');

  if (headings[0]) setHeading(headings[0], 'GEORGE');
  if (headings[1]) setHeading(headings[1], 'Plumber In George And Nearby Areas');
  if (textEditors[0]) {
    setText(textEditors[0], 'H2O Plumbers serves George and nearby residential and commercial areas, including established suburbs, estates, guesthouses and rental properties that need practical plumbing support.');
  }

  const cardHeadings = headings.filter(h => {
    const value = h.settings?.title || h.settings?.ekit_title || '';
    return !/GEORGE|Plumber In George/i.test(value);
  });
  const cardTexts = textEditors.slice(1);

  localAreas.forEach((area, index) => {
    const [name, url, desc] = area;
    if (cardHeadings[index]) setHeading(cardHeadings[index], name);
    if (cardTexts[index]) setText(cardTexts[index], desc);
    if (buttons[index]) setButton(buttons[index], `Plumber In ${name}`, url);
    if (imageWidgets[index]) setImage(imageWidgets[index], landscapeMedia);
  });

  const replaceIndex = data.findIndex(sec => textIncludes(sec, [/George Local Area Spokes/i, /Plumber In Heather Park/i]));
  if (replaceIndex < 0) throw new Error('Could not find old George local areas section to replace');
  data[replaceIndex] = localSection;

  // Add two light conversion rows after early content blocks, useful on mobile scroll.
  data.splice(2, 0, makeCtaSection());
  data.splice(6, 0, makeCtaSection());

  const payload = {
    meta: {
      _elementor_edit_mode: 'builder',
      _elementor_template_type: 'wp-page',
      _elementor_data: JSON.stringify(data),
      _elementor_page_settings: page.meta._elementor_page_settings || {},
    },
  };
  await wp(`/wp-json/wp/v2/pages/${pageId}`, { method: 'POST', body: JSON.stringify(payload) });
  await wp('/wp-json/elementor/v1/cache', { method: 'DELETE' });

  fs.writeFileSync('C:/Users/USER/Documents/Codex/Barry/work/george-6710-fixed-elementor-data.json', JSON.stringify(data, null, 2));
  console.log(JSON.stringify({ updated: pageId, replacedSectionIndex: replaceIndex, localCards: localAreas.length }, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
