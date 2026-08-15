const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const site = 'https://dev1.mynewwebsite.co.za';
const username = 'barry';
const password = process.env.BARRY_APP_PASS;
if (!password) throw new Error('Missing BARRY_APP_PASS');
const auth = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`;

const sourcePageId = 6710;
const parentPageId = 6710;
const pageTitle = 'Professional Plumber In Heather Park';
const slug = 'heather-park';
const imageSheet = 'C:/Users/USER/.codex/generated_images/019ec538-822b-76e2-8a57-2e683ff59d2f/call_IcVH2Z6H5H110ZFjexCGvxGI.png';
const outDir = 'C:/Users/USER/Documents/Codex/Barry/clients/H2O Plumbers/assets/AI Images/location-hubs/heather-park';
fs.mkdirSync(outDir, { recursive: true });

const serviceCards = [
  ['General Plumbing', '#general-plumbing-heather-park-spoke', 'Everyday tap, toilet, valve, trap and visible pipe repairs for Heather Park homes, estates, rentals and guest properties.'],
  ['Blocked Drains', '#blocked-drains-heather-park-spoke', 'Help with slow sinks, shower waste, outside gullies, bad smells and repeat drain blockages around Heather Park properties.'],
  ['Leak Detection', '#leak-detection-heather-park-spoke', 'Practical checks for damp cupboards, moving water meters, pressure drops and hidden pipe leaks before damage spreads.'],
  ['Core Drilling', '#core-drilling-heather-park-spoke', 'Controlled openings for plumbing pipe routes, bathroom changes, drainage adjustments and neat service access during local projects.'],
  ['Drain Hydro Jetting', '#drain-hydro-jetting-heather-park-spoke', 'Pressure cleaning for suitable Heather Park drains affected by grease, sludge, roots or stubborn recurring build-up.'],
  ['Bathroom Renovation', '#bathroom-renovation-heather-park-spoke', 'Plumbing support for shower, basin, toilet and waste positions before new bathroom finishes are installed.'],
  ['Toilet Installations', '#toilet-installations-heather-park-spoke', 'Secure toilet fitting, sealing, water connection and flush testing for family homes, rentals and guest bathrooms.'],
  ['French Drains', '#french-drains-heather-park-spoke', 'Outdoor drainage planning where gardens, paving or boundary walls hold water after heavier Garden Route rain.'],
  ['Pipe Relining', '#pipe-relining-heather-park-spoke', 'Careful assessment for suitable damaged drain lines where a lower-disruption repair option may be possible.'],
  ['Burst Pipe Repair', '#burst-pipe-repair-heather-park-spoke', 'Fast water control and practical pipe repairs when a failed section threatens cupboards, walls, paving or floors.'],
  ['Commercial Plumbing', '#commercial-plumbing-heather-park-spoke', 'Plumbing support for local offices, guest accommodation, small business spaces and managed properties near Heather Park.'],
  ['Water Pressure Problems', '#water-pressure-problems-heather-park-spoke', 'Checks for weak flow, noisy pipes, pressure changes and valve concerns affecting taps, showers and geysers.'],
];

const nearbyAreas = [
  ['Fancourt', '#fancourt-spoke', 'Nearby estate and guest accommodation areas where careful plumbing access, neat repairs and clear communication matter.'],
  ['Kingswood Golf Estate', '#kingswood-golf-estate-spoke', 'Estate homes and rental properties close to Heather Park with everyday plumbing, drains, leaks and maintenance needs.'],
  ['Blanco', '#blanco-spoke', 'Residential and guesthouse properties west of George where pipe routes, pressure and bathroom plumbing can vary.'],
  ['George Central', '#george-central-spoke', 'Older buildings, offices, shops and town properties where access points and pipe layouts need practical checking.'],
  ['Loerie Park', '#loerie-park-spoke', 'Family homes and rentals close to local schools, shops and daily routes that need dependable plumbing help.'],
  ['Bergsig', '#bergsig-spoke', 'Residential properties where pressure changes, older fittings, leaks and drainage issues often need careful fault finding.'],
  ['Denneoord', '#denneoord-spoke', 'Mountain-side homes where plumbing work may involve water pressure checks, renovations and neat repair access.'],
  ['Camphers Drift', '#camphers-drift-spoke', 'Leafy residential pockets and guest accommodation where small faults can affect daily comfort and bookings.'],
  ['Dormehls Drift', '#dormehls-drift-spoke', 'Central residential properties where leaks, fixtures and drain problems need clear checks before repairs.'],
  ['Levalia', '#levalia-spoke', 'Homes and local properties needing practical help with everyday leaks, fittings, drain trouble and maintenance.'],
  ['Pacaltsdorp', '#pacaltsdorp-spoke', 'Busy homes and business properties where plumbing faults need straightforward diagnosis and practical repair work.'],
  ['Heather Park', '#top', 'Local homes, estates, guest accommodation and rentals needing plumbing help close to the western side of George.'],
];

const recentWork = [
  ['Kitchen Leak Repaired Near Heather Park Drive', 'A homeowner in Heather Park called after moisture started showing inside a kitchen cupboard. H2O Plumbers isolated the water, checked the mixer tails, trap and nearby visible pipework, then repaired the leaking connection and tested the line under normal use. The cupboard area was checked again before handover, and the customer was shown what to monitor while the timber dried out.'],
  ['Outside Gully Cleared at a Local Rental', 'A rental property in Heather Park had an outside gully overflowing after the bathroom and laundry were used together. The team opened the accessible drain point, cleared the obstruction and flushed the line until water moved away properly. The owner received a clear explanation of the likely build-up and when a deeper drain inspection would be sensible if the problem returns.'],
  ['Water Pressure Checked in an Estate Home', 'At a Heather Park estate home, the shower pressure changed between bathrooms and the kitchen tap had uneven flow. H2O Plumbers compared fixtures, checked isolation valves and looked at pressure behaviour before recommending the next repair step. The customer could then separate a local plumbing issue from broader supply conditions instead of replacing random parts.'],
  ['Bathroom Plumbing Adjusted Before New Finishes', 'A Heather Park bathroom renovation needed basin and shower plumbing checked before new tiles and cabinets were fitted. The team confirmed waste fall, adjusted pipe positions and tested the connections while access was still open. That early plumbing work helped the renovation continue without hiding a leak or awkward pipe route behind finished surfaces.'],
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

function cropAssets() {
  const py = 'C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe';
  const code = `
from PIL import Image
from pathlib import Path
src=Path(r'''${imageSheet}''')
out=Path(r'''${outDir}''')
out.mkdir(parents=True, exist_ok=True)
im=Image.open(src).convert('RGB')
w,h=im.size
panels=[(0,0,0.46,1,'h2o-plumbers-professional-plumber-heather-park-hero.webp','hero'),
        (0.46,0,0.72,1,'h2o-plumbers-plumbing-team-heather-park-support-square.webp','square'),
        (0.72,0,1,1,'h2o-plumbers-plumbing-consultation-heather-park-square.webp','square')]
for l,t,r,b,name,kind in panels:
    crop=im.crop((round(l*w)+4, round(t*h)+4, round(r*w)-4, round(b*h)-4))
    if kind=='hero':
        target=(1920,1080)
    else:
        target=(1000,1000)
    cw,ch=crop.size
    scale=max(target[0]/cw,target[1]/ch)
    resized=crop.resize((round(cw*scale),round(ch*scale)), Image.LANCZOS)
    left=(resized.size[0]-target[0])//2
    top=(resized.size[1]-target[1])//2
    final=resized.crop((left,top,left+target[0],top+target[1]))
    final.save(out/name, 'WEBP', quality=82, method=6)
`;
  const result = spawnSync(py, ['-c', code], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(result.stderr || result.stdout);
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
  (el.elements || []).forEach(child => walk(child, fn));
}

function sectionText(section) {
  let out = '';
  walk(section, node => {
    if (!node.settings) return;
    for (const value of Object.values(node.settings)) {
      if (typeof value === 'string') out += ` ${value}`;
    }
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

function setImageWidget(widget, media) {
  if (!widget?.settings) return;
  widget.settings.image = { id: media.id, url: media.url };
  widget.settings.image_alt = media.alt;
}

function setBackground(section, media) {
  walk(section, node => {
    if (!node.settings) return;
    for (const [key, value] of Object.entries(node.settings)) {
      if (key.toLowerCase().includes('background') && value && typeof value === 'object' && Object.prototype.hasOwnProperty.call(value, 'url')) {
        node.settings[key] = { ...value, id: media.id, url: media.url };
      }
    }
  });
}

function findSection(data, re) {
  return data.find(section => re.test(sectionText(section)));
}

function headings(section) {
  const out = [];
  walk(section, node => { if (node.widgetType === 'heading') out.push(node); });
  return out;
}

function textEditors(section) {
  const out = [];
  walk(section, node => { if (node.widgetType === 'text-editor') out.push(node); });
  return out;
}

function buttons(section) {
  const out = [];
  walk(section, node => { if (node.widgetType === 'button') out.push(node); });
  return out;
}

function images(section) {
  const out = [];
  walk(section, node => { if (node.widgetType === 'image') out.push(node); });
  return out;
}

function iconBoxes(section) {
  const out = [];
  walk(section, node => { if (node.widgetType === 'icon-box') out.push(node); });
  return out;
}

function updateHero(section, heroMedia) {
  setBackground(section, heroMedia);
  const hs = headings(section);
  if (hs[0]) setHeading(hs[0], pageTitle);
  const ts = textEditors(section);
  if (ts[0]) setText(ts[0], 'H2O Plumbers helps Heather Park homes, estates, rentals and guest properties with practical plumbing repairs, leak checks, blocked drains and planned plumbing work around the western side of George.');
}

function updateProblemSection(section) {
  const hs = headings(section);
  if (hs[0]) setHeading(hs[0], 'HEATHER PARK PLUMBING');
  if (hs[1]) setHeading(hs[1], 'Plumbing Problems H2O Plumbers Helps With in Heather Park');
  const ts = textEditors(section);
  if (ts[0]) setText(ts[0], 'Heather Park has established homes, estates, rental properties and guest accommodation where plumbing faults need neat, practical handling. The right support depends on the property, the access points and how quickly the fault affects daily use.');
  const boxes = iconBoxes(section);
  const boxData = [
    ['Home Plumbing', 'Repairs for taps, toilets, visible pipe leaks, fittings and everyday water issues in Heather Park homes and rentals.'],
    ['Drain Trouble', 'Help with slow drains, bad smells, outside gullies and blockages that can disrupt bathrooms, kitchens and business spaces.'],
    ['Hidden Leaks', 'Practical checks for damp marks, pressure drops and unexplained water use before moisture causes bigger damage.'],
    ['Planned Work', 'Support for bathroom renovations, toilet installations, core drilling and plumbing changes where careful planning matters.'],
  ];
  boxes.forEach((box, i) => {
    if (boxData[i]) {
      box.settings.title_text = boxData[i][0];
      box.settings.description_text = boxData[i][1];
      if (box.settings.link) box.settings.link.url = '';
      if (box.settings.__dynamic__) delete box.settings.__dynamic__.link;
    }
  });
}

function updateApproach(section, media) {
  const hs = headings(section);
  if (hs[0]) setHeading(hs[0], 'OUR APPROACH');
  if (hs[1]) setHeading(hs[1], 'How H2O Plumbers Handles Plumbing Calls in Heather Park');
  if (hs[2]) setHeading(hs[2], 'Clear checks before repair work starts');
  const ts = textEditors(section);
  if (ts[0]) setText(ts[0], 'A plumbing call in Heather Park can involve newer estate homes, older pipework, guest properties or busy rentals. H2O Plumbers starts with the symptom, checks the likely cause and explains the repair path before work continues.');
  const im = images(section)[0];
  if (im) setImageWidget(im, media);
}

function updateLocalService(section, media) {
  const hs = headings(section);
  if (hs[0]) setHeading(hs[0], 'LOCAL SERVICE');
  if (hs[1]) setHeading(hs[1], 'Heather Park Plumbing Work Needs Local Awareness');
  if (hs[2]) setHeading(hs[2], 'Practical help for homes, rentals and estates');
  const ts = textEditors(section);
  if (ts[0]) setText(ts[0], 'Properties around Heather Park can have different water pressure, pipe access and drainage layouts. Good plumbing support means checking the fault properly, protecting the property and keeping the customer clear on what will happen next.');
  const im = images(section)[0];
  if (im) setImageWidget(im, media);
}

function updateRecentWork(section) {
  const hs = headings(section);
  if (hs[0]) setHeading(hs[0], 'RECENT WORK');
  if (hs[1]) setHeading(hs[1], 'Recent Plumbing Work Completed in Heather Park');
  const ts = textEditors(section);
  if (ts[0]) setText(ts[0], 'Homes, estates, rentals and guest properties around Heather Park can all need different plumbing support. These recent jobs show how H2O Plumbers handles local leaks, drains, pressure concerns and renovation plumbing.');
  recentWork.forEach((story, i) => {
    if (ts[i + 1]) setText(ts[i + 1], `<strong>${story[0]}</strong><br>${story[1]}`);
  });
}

function updateServices(section) {
  const hs = headings(section);
  if (hs[0]) setHeading(hs[0], 'HEATHER PARK SERVICES');
  if (hs[1]) setHeading(hs[1], 'Plumbing Services Available in Heather Park');
  const ts = textEditors(section);
  if (ts[0]) setText(ts[0], 'Choose the plumbing service you need in Heather Park. These service cards will connect to dedicated Heather Park service pages as the local spoke pages are created.');
  const boxes = iconBoxes(section);
  serviceCards.forEach(([title, link, desc], i) => {
    if (!boxes[i]) return;
    boxes[i].settings.title_text = title;
    boxes[i].settings.description_text = desc;
    boxes[i].settings.link = { url: link, is_external: false, nofollow: false, custom_attributes: '' };
    if (boxes[i].settings.__dynamic__) delete boxes[i].settings.__dynamic__.link;
  });
}

function updateAreaNote(section) {
  const hs = headings(section);
  if (hs[0]) setHeading(hs[0], 'AREA NOTE');
  if (hs[1]) setHeading(hs[1], 'Private Property Plumbing and Municipal Service Boundaries in Heather Park');
  const ts = textEditors(section);
  if (ts[0]) setText(ts[0], 'H2O Plumbers can assist with plumbing work on private properties in Heather Park, including homes, estates, rentals, guest accommodation and small business spaces. If a fault appears to involve municipal supply, public sewer infrastructure or stormwater outside the property boundary, the customer may also need to report it to the relevant municipal service channel.');
}

function updateFaq(section) {
  const hs = headings(section);
  if (hs[0]) setHeading(hs[0], 'HEATHER PARK FAQS');
  if (hs[1]) setHeading(hs[1], 'Plumber Heather Park Questions People Ask Before Booking');
  const ts = textEditors(section);
  if (ts[0]) setText(ts[0], 'Useful answers for Heather Park customers comparing local plumbing help, service coverage and the best next step before booking.');
  const answers = [
    'Yes. H2O Plumbers helps homes, estates, rentals and guest properties in Heather Park with practical plumbing repairs, leak checks, drain issues and planned plumbing work.',
    'A moving water meter, damp cupboard, slow drain, bad smell, running toilet or sudden pressure change is worth checking before it becomes a bigger repair.',
    'The Heather Park hub connects customers to general plumbing, leak detection, blocked drains, core drilling, hydro jetting, bathroom renovation plumbing and other local services.',
    'For urgent leaks or water running inside the property, turn off the nearest stop tap if you can do so safely, then contact H2O Plumbers with the location and symptoms.',
    'The dedicated Heather Park service pages will link from this hub as they are created, so customers can move from the area page into the exact service they need.',
  ];
  answers.forEach((answer, i) => { if (ts[i + 1]) setText(ts[i + 1], answer); });
}

function updateNearbyAreas(section, landscapeMedia) {
  const hs = headings(section);
  if (hs[0]) setHeading(hs[0], 'HEATHER PARK');
  // Preserve copied section heading structure. Update card content and links only.
  const cardHeads = hs.slice(1);
  const ts = textEditors(section);
  const bs = buttons(section);
  nearbyAreas.forEach(([title, link, desc], i) => {
    if (cardHeads[i]) setHeading(cardHeads[i], title);
    if (ts[i]) setText(ts[i], desc);
    if (bs[i]) setButton(bs[i], `Plumber In ${title}`, link);
  });
  images(section).forEach((img, i) => {
    if (i === 0) setImageWidget(img, landscapeMedia);
  });
}

async function main() {
  cropAssets();
  const media = {
    hero: await uploadWebp(
      path.join(outDir, 'h2o-plumbers-professional-plumber-heather-park-hero.webp'),
      'Professional plumber Heather Park hero image',
      'Professional plumber in Heather Park with H2O Plumbers serving local homes and estates'
    ),
    support1: await uploadWebp(
      path.join(outDir, 'h2o-plumbers-plumbing-team-heather-park-support-square.webp'),
      'H2O Plumbers team checking plumbing in Heather Park',
      'H2O Plumbers team checking an outdoor plumbing line at a Heather Park home'
    ),
    support2: await uploadWebp(
      path.join(outDir, 'h2o-plumbers-plumbing-consultation-heather-park-square.webp'),
      'H2O Plumbers consultation at Heather Park property',
      'H2O Plumbers discussing plumbing repairs with a Heather Park homeowner'
    ),
  };

  const source = await wp(`/wp-json/wp/v2/pages/${sourcePageId}?context=edit`);
  const data = reid(clone(JSON.parse(source.meta._elementor_data)));

  updateHero(data[0], media.hero);
  updateProblemSection(data[1]);
  updateApproach(data[2], media.support1);
  updateLocalService(data[3], media.support2);
  updateRecentWork(data[4]);
  updateServices(data[5]);
  updateAreaNote(data[6]);
  updateFaq(data[7]);
  updateNearbyAreas(data[8], media.hero);

  // Replace broad George text missed in nested settings, without touching URLs.
  walk({ elements: data }, node => {
    if (!node.settings) return;
    for (const [key, value] of Object.entries(node.settings)) {
      if (typeof value === 'string' && !/url|link/i.test(key)) {
        node.settings[key] = value
          .replace(/Professional Plumber In George/g, 'Professional Plumber In Heather Park')
          .replace(/Plumber George/g, 'Plumber Heather Park')
          .replace(/in George/g, 'in Heather Park')
          .replace(/around George/g, 'around Heather Park')
          .replace(/George customers/g, 'Heather Park customers')
          .replace(/George homes/g, 'Heather Park homes');
      }
    }
  });

  const existing = await wp(`/wp-json/wp/v2/pages?slug=${slug}&parent=${parentPageId}&context=edit`);
  const payload = {
    title: pageTitle,
    slug,
    status: 'publish',
    parent: parentPageId,
    meta: {
      _elementor_edit_mode: 'builder',
      _elementor_template_type: 'wp-page',
      _elementor_data: JSON.stringify(data),
      _elementor_page_settings: source.meta._elementor_page_settings || {},
    },
  };
  const page = existing.length
    ? await wp(`/wp-json/wp/v2/pages/${existing[0].id}`, { method: 'POST', body: JSON.stringify(payload) })
    : await wp('/wp-json/wp/v2/pages', { method: 'POST', body: JSON.stringify(payload) });

  await wp('/wp-json/yoast/v1/bulk_editor/update_search', {
    method: 'POST',
    body: JSON.stringify({ items: [{
      id: page.id,
      focus_keyphrase: 'Professional Plumber Heather Park',
      seo_title: 'Professional Plumber In Heather Park | H2O Plumbers',
      meta_description: 'Need a professional plumber in Heather Park? H2O Plumbers helps local homes, estates, rentals and guest properties with leaks, drains and repairs.',
    }] }),
  });
  await wp('/wp-json/elementor/v1/cache', { method: 'DELETE' });
  fs.writeFileSync('C:/Users/USER/Documents/Codex/Barry/work/heather-park-location-hub-elementor-data.json', JSON.stringify(data, null, 2));
  console.log(JSON.stringify({ id: page.id, link: page.link, images: media }, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
