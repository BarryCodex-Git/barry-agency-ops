const fs = require('fs');

const site = 'https://dev1.mynewwebsite.co.za';
const username = 'barry';
const password = process.env.BARRY_APP_PASS;
if (!password) throw new Error('Missing BARRY_APP_PASS');
const auth = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`;
const pageId = 6710;

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

function id() {
  return Math.random().toString(16).slice(2, 9);
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

function mediaFor(slug) {
  const base = `https://dev1.mynewwebsite.co.za/wp-content/uploads/2026/07/h2o-plumbers-plumber-${slug}-george-service-area.webp`;
  return {
    id: '',
    url: base,
    alt: `Plumber in ${slug.replace(/-/g, ' ')} George local service area landscape for H2O Plumbers`,
  };
}

function heading(title, size = 'h2', extra = {}) {
  return {
    id: id(),
    elType: 'widget',
    widgetType: 'heading',
    settings: {
      title,
      header_size: size,
      align: extra.align || 'center',
      title_color: extra.color || '#000000',
      _css_classes: extra.className || 'barry-field barry-heading',
      typography_typography: 'custom',
      typography_font_size: extra.fontSize || (size === 'h2' ? { unit: 'px', size: 38, sizes: [] } : { unit: 'px', size: 24, sizes: [] }),
      typography_font_weight: extra.weight || '700',
    },
    elements: [],
  };
}

function text(editor, extra = {}) {
  return {
    id: id(),
    elType: 'widget',
    widgetType: 'text-editor',
    settings: {
      editor,
      align: extra.align || 'center',
      text_color: extra.color || '#000000',
      _css_classes: extra.className || 'barry-field barry-copy',
      typography_typography: 'custom',
      typography_font_size: extra.fontSize || { unit: 'px', size: 18, sizes: [] },
      typography_line_height: { unit: 'em', size: 1.55, sizes: [] },
    },
    elements: [],
  };
}

function button(label, url) {
  return {
    id: id(),
    elType: 'widget',
    widgetType: 'button',
    settings: {
      text: label,
      link: { url, is_external: false, nofollow: false, custom_attributes: '' },
      selected_icon: { value: 'fas fa-arrow-right', library: 'fa-solid' },
      icon_align: 'right',
      button_background_color: '#1060B0',
      button_text_color: '#FFFFFF',
      border_radius: { unit: 'px', top: '6', right: '6', bottom: '6', left: '6', isLinked: true },
      _css_classes: 'barry-field barry-button service-area-suburb-card-cta',
    },
    elements: [],
  };
}

function card([name, slug, desc]) {
  const media = mediaFor(slug);
  return {
    id: id(),
    elType: 'container',
    settings: {
      content_width: 'full',
      width: { unit: '%', size: 31.8, sizes: [] },
      min_height: { unit: 'px', size: 0, sizes: [] },
      background_background: 'classic',
      background_color: '#FFFFFF',
      border_border: 'solid',
      border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
      border_color: '#1060B0',
      border_radius: { unit: 'px', top: '8', right: '8', bottom: '8', left: '8', isLinked: true },
      overflow: 'hidden',
      box_shadow_box_shadow_type: 'yes',
      box_shadow_box_shadow: { horizontal: 0, vertical: 10, blur: 24, spread: 0, color: 'rgba(16,96,176,0.08)' },
      padding: { unit: 'px', top: '0', right: '0', bottom: '28', left: '0', isLinked: false },
      _css_classes: 'barry-section service-area-suburb-card',
    },
    elements: [
      {
        id: id(),
        elType: 'widget',
        widgetType: 'image',
        settings: {
          image: { id: media.id, url: media.url },
          image_alt: media.alt,
          image_size: 'full',
          width: { unit: '%', size: 100, sizes: [] },
          height: { unit: 'px', size: 245, sizes: [] },
          object_fit: 'cover',
          _css_classes: 'barry-field service-area-suburb-card-image',
        },
        elements: [],
      },
      {
        id: id(),
        elType: 'container',
        settings: {
          content_width: 'full',
          padding: { unit: 'px', top: '24', right: '24', bottom: '0', left: '24', isLinked: false },
          _css_classes: 'barry-card-body service-area-suburb-card-body',
        },
        elements: [
          heading(name, 'h3', { align: 'left', fontSize: { unit: 'px', size: 24, sizes: [] }, className: 'barry-field barry-heading service-area-suburb-card-title' }),
          text(desc, { align: 'left', fontSize: { unit: 'px', size: 17, sizes: [] }, className: 'barry-field barry-copy service-area-suburb-card-description' }),
          button(`Plumber In ${name}`, `#${slug}-spoke`),
        ],
        isInner: true,
      },
    ],
    isInner: true,
  };
}

function localAreaSection() {
  return {
    id: id(),
    elType: 'container',
    settings: {
      content_width: 'boxed',
      boxed_width: { unit: 'px', size: 1240, sizes: [] },
      flex_direction: 'column',
      align_items: 'center',
      gap: { unit: 'px', size: 24, sizes: [] },
      padding: { unit: 'px', top: '80', right: '20', bottom: '80', left: '20', isLinked: false },
      _css_classes: 'barry-section service-area-region george-suburb-hub-section',
    },
    elements: [
      heading('GEORGE', 'p', { color: '#FFFFFF', fontSize: { unit: 'px', size: 20, sizes: [] }, className: 'barry-field barry-heading service-area-region-eyebrow' }),
      heading('Plumber In George And Nearby Areas', 'h2', { className: 'barry-field barry-heading service-area-region-heading' }),
      {
        id: id(),
        elType: 'widget',
        widgetType: 'divider',
        settings: {
          color: '#6090C0',
          width: { unit: 'px', size: 52, sizes: [] },
          align: 'center',
          gap: { unit: 'px', size: 6, sizes: [] },
          _css_classes: 'barry-field barry-divider service-area-region-divider',
        },
        elements: [],
      },
      text('H2O Plumbers serves established George suburbs, estates, central business areas, guesthouses and rental properties with practical plumbing support for everyday faults and planned work.', { className: 'barry-field barry-copy service-area-region-description' }),
      {
        id: id(),
        elType: 'container',
        settings: {
          content_width: 'full',
          flex_direction: 'row',
          flex_wrap: 'wrap',
          justify_content: 'space-between',
          gap: { unit: 'px', size: 30, sizes: [] },
          _css_classes: 'barry-grid service-area-suburb-card-grid',
        },
        elements: suburbs.map(card),
        isInner: true,
      },
    ],
    isInner: false,
  };
}

async function main() {
  const page = await wp(`/wp-json/wp/v2/pages/${pageId}?context=edit`);
  const data = JSON.parse(page.meta._elementor_data);
  const index = data.findIndex(section => hasText(section, /Plumber In George And Nearby Areas|service-area-suburb-card/i));
  if (index < 0) throw new Error('Local area section not found');
  data[index] = localAreaSection();
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
  fs.writeFileSync('C:/Users/USER/Documents/Codex/Barry/work/george-6710-local-area-section-clean.json', JSON.stringify(data, null, 2));
  console.log(JSON.stringify({ replacedIndex: index, cards: suburbs.length }, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
