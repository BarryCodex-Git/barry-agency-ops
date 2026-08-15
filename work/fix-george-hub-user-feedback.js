const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const site = 'https://dev1.mynewwebsite.co.za';
const username = 'barry';
const password = process.env.BARRY_APP_PASS;
if (!password) throw new Error('Missing BARRY_APP_PASS');
const auth = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`;

const pageId = 6710;
const sourceSheet = 'C:/Users/USER/.codex/generated_images/019ec538-822b-76e2-8a57-2e683ff59d2f/call_mIZ0u9CYflg1sCwjTZEtQnjj.png';
const outDir = 'C:/Users/USER/Documents/Codex/Barry/clients/H2O Plumbers/assets/AI Images/location-hubs/george-suburbs';
fs.mkdirSync(outDir, { recursive: true });

const suburbs = [
  {
    name: 'Heather Park',
    slug: 'heather-park',
    desc: 'Plumbing support for homes, estates, rentals and guest accommodation around Heather Park and nearby western George routes.',
  },
  {
    name: 'Fancourt',
    slug: 'fancourt',
    desc: 'Plumbing help for estate homes, guest stays and managed properties near Fancourt, where neat work and clear access planning matter.',
  },
  {
    name: 'Kingswood Golf Estate',
    slug: 'kingswood-golf-estate',
    desc: 'Plumbing service for estate homes and rental properties around Kingswood, including leaks, drains, fixtures and planned maintenance.',
  },
  {
    name: 'George Central',
    slug: 'george-central',
    desc: 'Help for town-centre homes, shops, offices and older buildings where pipe layouts and access points can vary from property to property.',
  },
  {
    name: 'Blanco',
    slug: 'blanco',
    desc: 'Plumbing support for Blanco homes, guesthouses and estate-style properties close to the western side of George.',
  },
  {
    name: 'Loerie Park',
    slug: 'loerie-park',
    desc: 'Practical plumbing help for family homes and rental properties in Loerie Park, from everyday faults to drainage concerns.',
  },
  {
    name: 'Bergsig',
    slug: 'bergsig',
    desc: 'Service coverage for Bergsig properties where pressure changes, older fittings, leaks and drainage issues need careful checking.',
  },
  {
    name: 'Denneoord',
    slug: 'denneoord',
    desc: 'Plumbing help for Denneoord homes near the mountain side of George, including repairs, renovations and water fault checks.',
  },
  {
    name: 'Camphers Drift',
    slug: 'camphers-drift',
    desc: 'Support for leafy residential streets, cottages and guest accommodation close to town, with a practical approach to plumbing faults.',
  },
  {
    name: 'Dormehls Drift',
    slug: 'dormehls-drift',
    desc: 'Plumbing service for central George properties where neat access, clear communication and careful repair planning are often important.',
  },
  {
    name: 'Levalia',
    slug: 'levalia',
    desc: 'Everyday plumbing help for Levalia homes and local properties, including leaks, fixtures, blocked drains and maintenance work.',
  },
  {
    name: 'Pacaltsdorp',
    slug: 'pacaltsdorp',
    desc: 'Plumbing support for busy homes and businesses in Pacaltsdorp, with practical fault checks and straightforward service guidance.',
  },
];

const services = [
  ['General Plumbing', 'Everyday taps, toilets, traps, valves and visible pipework for homes, rentals and businesses in George.'],
  ['Leak Detection', 'Practical leak checks when damp, pressure drops or rising water use suggest a hidden pipe fault in George.'],
  ['Blocked Drains', 'Help for slow drains, gully overflows, bad smells and repeat blockages around George properties.'],
  ['Core Drilling', 'Clean openings for plumbing pipe routes, renovations, drainage changes and service access in George.'],
  ['Drain Hydro Jetting', 'High-pressure drain cleaning for suitable lines affected by grease, sludge, roots or recurring build-up.'],
  ['Bathroom Renovation', 'Plumbing support for showers, basins, toilets and drainage before new bathroom finishes are completed.'],
  ['Toilet Installations', 'Secure toilet fitting, sealing, water connection and flush testing for homes and rental properties.'],
  ['French Drains', 'Outdoor drainage planning for pooling water, soggy ground and runoff around George properties.'],
  ['Pipe Relining', 'A repair option for suitable damaged drain lines where full excavation may not be ideal.'],
  ['Burst Pipe Repair', 'Fast water control and practical repair when a failed pipe needs urgent attention in George.'],
  ['Commercial Plumbing', 'Plumbing help for offices, shops, kitchens, rentals and staff bathroom areas in George.'],
  ['Water Pressure Problems', 'Checks for weak flow, uneven pressure, noisy pipes and pressure valve concerns.'],
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

function cropImages() {
  const py = 'C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe';
  const code = `
from PIL import Image
from pathlib import Path
src=Path(r'''${sourceSheet}''')
out=Path(r'''${outDir}''')
out.mkdir(parents=True, exist_ok=True)
names=${JSON.stringify(suburbs.map(s => s.slug))}
im=Image.open(src).convert('RGB')
w,h=im.size
cols,rows=4,3
for idx,name in enumerate(names):
    col=idx%cols
    row=idx//cols
    left=round(col*w/cols)+3
    right=round((col+1)*w/cols)-3
    top=round(row*h/rows)+3
    bottom=round((row+1)*h/rows)-3
    crop=im.crop((left,top,right,bottom))
    crop=crop.resize((1000,625), Image.LANCZOS)
    crop.save(out / f'h2o-plumbers-plumber-{name}-george-service-area.webp', 'WEBP', quality=82, method=6)
`;
  const result = spawnSync(py, ['-c', code], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(result.stderr || result.stdout);
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
      if (typeof value === 'string' && patterns.some(pattern => pattern.test(value))) found = true;
    }
  });
  return found;
}

function collectWidgets(section, type) {
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

function setImage(widget, media) {
  if (!widget?.settings) return;
  widget.settings.image = { id: media.id, url: media.url };
  widget.settings.image_alt = media.alt;
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

function setLinksToPlaceholder(section) {
  walk(section, node => {
    if (!node.settings) return;
    for (const key of ['link', 'button_link', 'selected_icon_link']) {
      const val = node.settings[key];
      if (val?.url && /\/services\//.test(val.url)) {
        node.settings[key] = { ...val, url: '#george-service-spokes' };
      }
    }
    if (node.settings.__dynamic__) {
      for (const key of ['link', 'button_link']) {
        if (node.settings.__dynamic__[key] && /\/services\//.test(node.settings.__dynamic__[key])) {
          delete node.settings.__dynamic__[key];
        }
      }
    }
  });
}

function isFloatingCtaSection(section) {
  const buttons = collectWidgets(section, 'button');
  const headings = collectWidgets(section, 'heading');
  const textEditors = collectWidgets(section, 'text-editor');
  if (buttons.length !== 2 || headings.length || textEditors.length) return false;
  const text = buttons.map(b => b.settings?.text || b.settings?.button_text || '').join(' ');
  return /WhatsApp Us/.test(text) && /072 651 4447/.test(text);
}

function createCtaBand(label) {
  const id = () => Math.random().toString(16).slice(2, 9);
  return {
    id: id(),
    elType: 'container',
    settings: {
      content_width: 'boxed',
      boxed_width: { unit: 'px', size: 1180, sizes: [] },
      flex_direction: 'row',
      align_items: 'center',
      justify_content: 'space-between',
      gap: { unit: 'px', size: 22, sizes: [] },
      background_background: 'classic',
      background_color: '#F4F8FC',
      border_border: 'solid',
      border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
      border_color: '#D8E6F5',
      border_radius: { unit: 'px', top: '8', right: '8', bottom: '8', left: '8', isLinked: true },
      margin: { unit: 'px', top: '35', right: 'auto', bottom: '45', left: 'auto', isLinked: false },
      padding: { unit: 'px', top: '22', right: '26', bottom: '22', left: '26', isLinked: false },
    },
    elements: [
      {
        id: id(),
        elType: 'widget',
        widgetType: 'heading',
        settings: {
          title: label,
          header_size: 'h3',
          title_color: '#000000',
          typography_typography: 'custom',
          typography_font_size: { unit: 'px', size: 22, sizes: [] },
        },
        elements: [],
      },
      {
        id: id(),
        elType: 'container',
        settings: {
          flex_direction: 'row',
          justify_content: 'flex-end',
          gap: { unit: 'px', size: 16, sizes: [] },
        },
        elements: [
          {
            id: id(),
            elType: 'widget',
            widgetType: 'button',
            settings: {
              text: 'WhatsApp Us',
              link: { url: 'https://wa.me/27726514447', is_external: false, nofollow: false, custom_attributes: '' },
              button_background_color: '#1060B0',
              button_text_color: '#FFFFFF',
              border_radius: { unit: 'px', top: '6', right: '6', bottom: '6', left: '6', isLinked: true },
            },
            elements: [],
          },
          {
            id: id(),
            elType: 'widget',
            widgetType: 'button',
            settings: {
              text: '072 651 4447',
              link: { url: 'tel:0726514447', is_external: false, nofollow: false, custom_attributes: '' },
              button_background_color: '#FFFFFF',
              button_text_color: '#1060B0',
              border_border: 'solid',
              border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
              border_color: '#1060B0',
              border_radius: { unit: 'px', top: '6', right: '6', bottom: '6', left: '6', isLinked: true },
            },
            elements: [],
          },
        ],
        isInner: true,
      },
    ],
    isInner: false,
  };
}

async function main() {
  cropImages();
  const media = [];
  for (const suburb of suburbs) {
    const file = path.join(outDir, `h2o-plumbers-plumber-${suburb.slug}-george-service-area.webp`);
    media.push(await uploadWebp(
      file,
      `Plumber in ${suburb.name} George service area`,
      `Plumber in ${suburb.name} George local service area landscape for H2O Plumbers`
    ));
  }

  const page = await wp(`/wp-json/wp/v2/pages/${pageId}?context=edit`);
  let data = JSON.parse(page.meta._elementor_data);

  // Remove the earlier floating two-button rows and replace with cleaner boxed CTA bands.
  data = data.filter(section => !isFloatingCtaSection(section));

  // H1: stronger but still human-readable.
  data.forEach(section => walk(section, node => {
    if (!node.settings) return;
    const title = node.settings.title || node.settings.ekit_title;
    if (typeof title === 'string' && /^Plumber In George$/i.test(title.trim())) {
      setHeading(node, 'Professional Plumber In George');
    }
  }));

  const serviceSectionIndex = data.findIndex(section => textIncludes(section, [/Plumbing Services Available in George/i]));
  if (serviceSectionIndex >= 0) {
    const section = data[serviceSectionIndex];
    setLinksToPlaceholder(section);
    const headings = collectWidgets(section, 'heading').filter(h => {
      const title = h.settings?.title || h.settings?.ekit_title || '';
      return services.some(([service]) => title.trim() === service);
    });
    const textEditors = collectWidgets(section, 'text-editor').filter(t => !/Use these service links|Dedicated George|SEO build/i.test(t.settings?.editor || t.settings?.text || ''));
    services.forEach(([title, desc], i) => {
      if (headings[i]) setHeading(headings[i], title);
      if (textEditors[i]) setText(textEditors[i], desc);
    });
    const intro = collectWidgets(section, 'text-editor').find(t => /Use these service links|Dedicated George|SEO build/i.test(t.settings?.editor || t.settings?.text || ''));
    if (intro) setText(intro, 'Choose the plumbing service you need in George. These links will connect to dedicated George service pages as the local service pages are created.');
  }

  const localSection = data.find(section => textIncludes(section, [/Plumber In George And Nearby Areas/i, /Kingswood Golf Estate/i]));
  if (!localSection) throw new Error('George local suburb card section not found');

  const headings = collectWidgets(localSection, 'heading');
  const textEditors = collectWidgets(localSection, 'text-editor');
  const images = collectWidgets(localSection, 'image');
  const buttons = collectWidgets(localSection, 'button');

  const sectionHeading = headings.find(h => /Plumber In George And Nearby Areas/i.test(h.settings?.title || h.settings?.ekit_title || ''));
  if (sectionHeading) setHeading(sectionHeading, 'Plumber In George And Nearby Areas');
  const intro = textEditors[0];
  if (intro) setText(intro, 'H2O Plumbers serves established George suburbs, estates, central business areas, guesthouses and rental properties with practical plumbing support for everyday faults and planned work.');

  const suburbHeadings = headings.filter(h => suburbs.some(s => new RegExp(s.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(h.settings?.title || h.settings?.ekit_title || '')) || /Plumber In George And Nearby Areas/i.test(h.settings?.title || h.settings?.ekit_title || ''));
  // The copied section accidentally included the section H2 as the first card. Use all headings after the real section heading as card headings.
  const cardHeadings = headings.filter(h => h !== sectionHeading).slice(0, suburbs.length);
  const cardTexts = textEditors.slice(1, 1 + suburbs.length);

  suburbs.forEach((suburb, i) => {
    if (cardHeadings[i]) setHeading(cardHeadings[i], suburb.name);
    if (cardTexts[i]) setText(cardTexts[i], suburb.desc);
    if (buttons[i]) setButton(buttons[i], `Plumber In ${suburb.name}`, `#${suburb.slug}-spoke`);
    if (images[i]) setImage(images[i], media[i]);
  });

  // Drop surplus duplicated cards if the source section had more than 12 button/card widgets is unsafe at widget-level,
  // so keep the approved section layout and ensure the first 12 card data points are correct.
  data.splice(Math.min(serviceSectionIndex + 1, data.length), 0, createCtaBand('Need plumbing help in George?'));
  const localIndex = data.indexOf(localSection);
  data.splice(Math.max(localIndex, 0), 0, createCtaBand('Have a plumbing issue in your area?'));

  await wp(`/wp-json/wp/v2/pages/${pageId}`, {
    method: 'POST',
    body: JSON.stringify({
      title: 'Professional Plumber In George',
      meta: {
        _elementor_edit_mode: 'builder',
        _elementor_template_type: 'wp-page',
        _elementor_data: JSON.stringify(data),
        _elementor_page_settings: page.meta._elementor_page_settings || {},
        _yoast_wpseo_focuskw: 'Professional Plumber George',
        _yoast_wpseo_title: 'Professional Plumber In George | H2O Plumbers',
        _yoast_wpseo_metadesc: 'Need a professional plumber in George? H2O Plumbers helps homes, rentals, guesthouses and businesses with leaks, drains, repairs and practical plumbing support.',
      },
    }),
  });
  await wp('/wp-json/yoast/v1/bulk_editor/update_search', {
    method: 'POST',
    body: JSON.stringify({
      object_id: pageId,
      object_type: 'post',
      wpseo_title: 'Professional Plumber In George | H2O Plumbers',
      wpseo_desc: 'Need a professional plumber in George? H2O Plumbers helps homes, rentals, guesthouses and businesses with leaks, drains, repairs and practical plumbing support.',
    }),
  });
  await wp('/wp-json/elementor/v1/cache', { method: 'DELETE' });
  fs.writeFileSync('C:/Users/USER/Documents/Codex/Barry/work/george-6710-user-feedback-fixed.json', JSON.stringify(data, null, 2));
  console.log(JSON.stringify({ uploadedImages: media.length, serviceSectionIndex, localCards: suburbs.length }, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
