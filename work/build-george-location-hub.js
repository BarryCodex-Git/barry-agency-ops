const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const site = 'https://dev1.mynewwebsite.co.za';
const username = 'barry';
const password = process.env.BARRY_APP_PASS;
if (!password) throw new Error('Missing BARRY_APP_PASS');
const auth = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`;

const workRoot = 'C:/Users/USER/Documents/Codex/Barry/work';
const imgRoot = 'C:/Users/USER/Documents/Codex/Barry/clients/H2O Plumbers/assets/AI Images';
const outRoot = path.join(imgRoot, 'location-hubs');
fs.mkdirSync(outRoot, { recursive: true });

let sourcePage = null;
let sourceData = null;

const services = [
  ['General Plumbing', '/services/general-plumbing-garden-route/', 'Everyday taps, toilets, traps, valves and visible pipework for George homes, rentals and businesses.'],
  ['Leak Detection', '/services/leak-detection-garden-route/', 'Practical leak checks when damp, pressure drops or rising water use suggest a hidden pipe fault.'],
  ['Blocked Drains', '/services/blocked-drains-garden-route/', 'Help for slow drains, gully overflows, bad smells and repeat blockages around George properties.'],
  ['Core Drilling', '/services/core-drilling-garden-route/', 'Clean openings for plumbing pipe routes, renovations, drainage changes and service access.'],
  ['Drain Hydro Jetting', '/services/drain-hydro-jetting-garden-route/', 'High-pressure cleaning for suitable drains affected by grease, sludge, roots or recurring build-up.'],
  ['Bathroom Renovation', '/services/bathroom-renovation-garden-route/', 'Plumbing support for showers, basins, toilets and drainage before new bathroom finishes are completed.'],
  ['Toilet Installations', '/services/toilet-installations-garden-route/', 'Secure toilet fitting, sealing, water connection and flush testing for homes and rental properties.'],
  ['French Drains', '/services/french-drains-garden-route/', 'Outdoor drainage planning for pooling water, soggy ground and runoff around George properties.'],
  ['Pipe Relining', '/services/pipe-relining-garden-route/', 'A repair option for suitable damaged drain lines where full excavation may not be ideal.'],
  ['Burst Pipe Repair', '/services/burst-pipe-repair-garden-route/', 'Fast water control and practical repair when a pipe leak needs urgent attention.'],
  ['Commercial Plumbing', '/services/commercial-plumbing-garden-route/', 'Plumbing help for offices, shops, kitchens, rentals and staff bathroom areas in George.'],
  ['Water Pressure Problems', '/services/water-pressure-problems-garden-route/', 'Checks for weak flow, uneven pressure, noisy pipes and pressure valve concerns.'],
];

const localAreas = [
  ['Heather Park', '/service-areas/george/heather-park/', 'Established homes, estates and rentals close to the western side of George.'],
  ['George Central', '/service-areas/george/george-central/', 'Town-centre homes, offices, shops and older buildings with mixed plumbing layouts.'],
  ['Blanco', '/service-areas/george/blanco/', 'Residential properties, guesthouses and estate-style homes near Fancourt and the western routes.'],
  ['Loerie Park', '/service-areas/george/loerie-park/', 'Family homes and rental properties where everyday plumbing faults need clear handling.'],
  ['Bergsig', '/service-areas/george/bergsig/', 'Residential areas where older fittings, pressure changes and drain issues can appear.'],
  ['Denneoord', '/service-areas/george/denneoord/', 'Homes near the mountain side of George with varied layouts and renovation plumbing needs.'],
  ['Camphers Drift', '/service-areas/george/camphers-drift/', 'Leafy residential streets with homes, cottages and guest accommodation close to town.'],
  ['Dormehls Drift', '/service-areas/george/dormehls-drift/', 'Central George properties where plumbing access and neat repairs often matter.'],
  ['Eden', '/service-areas/george/eden/', 'Homes and commercial spaces around broader George service routes.'],
  ['Levalia', '/service-areas/george/levalia/', 'Residential properties needing practical help with leaks, fixtures and drainage issues.'],
  ['Pacaltsdorp', '/service-areas/george/pacaltsdorp/', 'Busy homes and local businesses that need dependable plumbing support.'],
  ['Wilderness', '/service-areas/george/wilderness/', 'Coastal homes, guesthouses and holiday properties needing practical plumbing care.'],
];

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
  await wp(`/wp-json/wp/v2/media/${media.id}`, { method: 'POST', body: JSON.stringify({ title, alt_text: alt, caption: alt }) });
  return { id: media.id, url: media.source_url, alt };
}

function convertAssets() {
  const source = path.join(imgRoot, 'h2o-plumbers-plumber-george-service-area-ai-01.jpg');
  const square = path.join(outRoot, 'h2o-plumbers-plumber-george-location-hub-square.webp');
  const background = path.join(outRoot, 'h2o-plumbers-plumber-george-location-hub-background.webp');
  const py = 'C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe';
  const code = `
from PIL import Image
src=r'''${source}'''
sq=r'''${square}'''
bg=r'''${background}'''
im=Image.open(src).convert('RGB')
w,h=im.size
side=min(w,h)
left=(w-side)//2
top=(h-side)//2
im.crop((left,top,left+side,top+side)).resize((1000,1000), Image.LANCZOS).save(sq,'WEBP',quality=82,method=6)
target=(1920,1080)
scale=max(target[0]/w,target[1]/h)
resized=im.resize((round(w*scale),round(h*scale)),Image.LANCZOS)
left=(resized.size[0]-target[0])//2
top=(resized.size[1]-target[1])//2
resized.crop((left,top,left+target[0],top+target[1])).save(bg,'WEBP',quality=80,method=6)
`;
  const result = spawnSync(py, ['-c', code], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(result.stderr || result.stdout || 'Image conversion failed');
  return { square, background };
}

function find(id, els) {
  for (const e of els) {
    if (e.id === id) return e;
    const f = find(id, e.elements || []);
    if (f) return f;
  }
  return null;
}

function clone(obj) { return JSON.parse(JSON.stringify(obj)); }
function mediaObj(m) { return { id: m.id, url: m.url, alt: m.alt, source: 'library', size: 'full' }; }
function p(text) { return `<p>${text}</p>`; }

function setBackground(el, media) {
  if (!el?.settings) return;
  el.settings.background_image = mediaObj(media);
  el.settings.background_video_fallback = mediaObj(media);
  el.settings.background_video_link = '';
  el.settings.background_position = 'center center';
  el.settings.background_size = 'cover';
}

function setImage(el, media, title) {
  if (!el?.settings) return;
  el.settings.image = mediaObj(media);
  if (title) el.settings._title = title;
}

function uniqueIds(el, prefix) {
  let n = 0;
  function walk(e) {
    e.id = `${prefix}${(n++).toString(36).padStart(3, '0')}`.slice(0, 7);
    (e.elements || []).forEach(walk);
  }
  walk(el);
}

function updateIconBox(box, title, desc, link) {
  box.settings.title_text = title;
  box.settings.description_text = desc;
  box.settings._title = `George Hub Card - ${title}`;
  box.settings.link = { url: link, is_external: '', nofollow: '', custom_attributes: '' };
}

function buildCardGridSection(baseRelatedSection, titlePrefix, eyebrow, h2, intro, cards, prefix) {
  const section = clone(baseRelatedSection);
  uniqueIds(section, prefix);
  section.settings._title = titlePrefix;
  const headings = [];
  const boxes = [];
  function collect(e) {
    if (e.widgetType === 'heading') headings.push(e);
    if (e.widgetType === 'text-editor') headings.push(e);
    if (e.widgetType === 'icon-box') boxes.push(e);
    (e.elements || []).forEach(collect);
  }
  collect(section);
  const eyebrowEl = headings.find(e => /Eyebrow/.test(e.settings?._title || '')) || headings.find(e => e.widgetType === 'heading');
  const h2El = headings.find(e => /Heading/.test(e.settings?._title || '') && e !== eyebrowEl) || headings.filter(e => e.widgetType === 'heading')[1];
  const introEl = headings.find(e => e.widgetType === 'text-editor' && /Copy|Links/.test(e.settings?._title || '')) || headings.find(e => e.widgetType === 'text-editor');
  if (eyebrowEl) eyebrowEl.settings.title = eyebrow;
  if (h2El) h2El.settings.title = h2;
  if (introEl) introEl.settings.editor = p(intro);
  const grid = boxes[0] ? findParentOf(section, boxes[0].id) : null;
  while (boxes.length < cards.length && grid) {
    const base = clone(boxes[boxes.length % 4]);
    uniqueIds(base, `${prefix}b${boxes.length}`);
    grid.elements.push(base);
    boxes.push(base);
  }
  boxes.slice(0, cards.length).forEach((box, i) => updateIconBox(box, cards[i][0], cards[i][2], cards[i][1]));
  boxes.slice(cards.length).forEach(box => {
    const parent = findParentOf(section, box.id);
    if (parent) parent.elements = parent.elements.filter(e => e.id !== box.id);
  });
  return section;
}

function findParentOf(root, id, parent = null) {
  if (root.id === id) return parent;
  for (const e of root.elements || []) {
    const f = findParentOf(e, id, root);
    if (f) return f;
  }
  return null;
}

function applyGeorge(data, media) {
  const page = clone(data);
  setBackground(find('8c893f2', page), media.background);
  setBackground(find('26c91ca', page), media.background);
  setBackground(find('a1fe463', page), media.background);
  setImage(find('63c3393', page), media.square, 'George Hub Approach Image');
  setImage(find('9204026', page), media.square, 'George Hub Local Service Image');

  find('cd5afd7', page).settings.title = 'Plumber in George';
  find('a028392', page).settings.editor = p('H2O Plumbers helps George homes, rentals, guesthouses and businesses with practical plumbing support across town. From everyday repairs to leaks, blocked drains, pressure issues and planned bathroom work, the page brings local George plumbing services together in one place.');
  find('3d49090', page).settings.icon_list = [{ text: 'Local Team', _id: 'h1' }];
  find('d686603', page).settings.icon_list = [{ text: 'Clear Help', _id: 'h2' }];

  find('2ff76e5', page).settings.title = 'GEORGE PLUMBING';
  find('2390ad1', page).settings.title = 'Plumbing Problems H2O Plumbers Helps With in George';
  find('faacfd2', page).settings.editor = p('George has a mix of family homes, estates, older buildings, guest accommodation and busy commercial spaces. Plumbing support needs to suit the property, the area and the way the fault affects daily use.');
  [
    ['Home Plumbing', 'Repairs for taps, toilets, visible pipe leaks, fittings and everyday water issues in George homes and rentals.'],
    ['Drain Trouble', 'Help with slow drains, bad smells, outside gullies and blockages that can disrupt bathrooms, kitchens and business spaces.'],
    ['Hidden Leaks', 'Practical checks for damp marks, pressure drops and unexplained water use before moisture causes bigger damage.'],
    ['Planned Work', 'Support for bathroom renovations, toilet installations, core drilling and plumbing changes where careful planning matters.'],
  ].forEach(([title, desc], i) => {
    const ids = ['05608d4', '77587c1', 'b8496da', '959054a'];
    updateIconBox(find(ids[i], page), title, desc, '#');
  });

  find('e00c453', page).settings.title = 'OUR APPROACH';
  find('aa059ce', page).settings.title = 'How H2O Plumbers Handles Plumbing Calls in George';
  find('ba594ed', page).settings.title = 'Local support across everyday properties';
  find('ap3desc', page).settings.editor = p('A plumbing call in George can look different from one suburb to the next. The team looks at the symptom, property type, access and urgency before explaining the most practical repair route.');
  find('ap3desc', page).settings.text_color = '#000000';
  find('1a6d842', page).settings.icon_list = [
    { text: '<strong>Understand the property:</strong> Homes, offices, rentals and guesthouses all need slightly different handling, timing and communication.', _id: 'a1' },
    { text: '<strong>Check the actual fault:</strong> A visible symptom can come from a fitting, pipe, drain, valve or pressure issue.', _id: 'a2' },
    { text: '<strong>Explain the next step:</strong> Customers should know what was found, what can be repaired and when further work may be needed.', _id: 'a3' },
  ];

  find('9d6770f', page).settings.title = 'LOCAL SERVICE';
  find('cd61791', page).settings.title = 'George Plumbing Work Needs Practical Local Awareness';
  find('7dce8ee', page).settings.title = 'Clear decisions for homes, rentals and businesses';
  find('tr3desc', page).settings.editor = p('George properties include older pipework, newer estates, guest accommodation and busy commercial areas. A local plumbing page should help customers understand which services are available and how those services connect to their part of town.');
  find('tr3desc', page).settings.text_color = '#000000';
  find('a73192f', page).settings.icon_list = [
    { text: '<strong>Area-aware help:</strong> Plumbing needs can change between central town properties, estates, rentals and coastal-facing routes.', _id: 't1' },
    { text: '<strong>Service clarity:</strong> Customers can move from this George hub into the exact service page they need.', _id: 't2' },
    { text: '<strong>Useful structure:</strong> The page prepares the website for future suburb and service-location SEO pages without thin content.', _id: 't3' },
  ];

  find('89cee13', page).settings.title = 'LOCAL EXAMPLES';
  find('e0d87c0', page).settings.title = 'How Plumbing Issues Can Show Up Around George';
  find('2f37425', page).settings.editor = p('These George examples are written as local service scenarios, not fake job claims. They show how different property types and suburbs can create different plumbing decisions.');
  [
    ['Hidden Leak Concern in Heather Park', 'A Heather Park homeowner may first notice damp near a cupboard, a pressure change or a moving water meter. A practical plumbing check would compare visible fittings, nearby pipe routes and water use before deciding whether leak detection or a direct repair is the better next step.'],
    ['Blocked Drain Symptoms Near George Central', 'Older buildings and busy shops around central George can show slow drainage in kitchens, bathrooms or outside gullies. The correct approach is to look at the affected fixture, check whether other drains are involved and avoid treating a deeper blockage as a simple trap issue.'],
    ['Bathroom Renovation Planning in Blanco', 'Renovation work around Blanco often needs plumbing decisions before tiles, vanities and shower screens are installed. Pipe routes, waste fall, mixer positions and toilet spacing should be confirmed early so the finished bathroom does not inherit awkward plumbing problems.'],
    ['Water Pressure Questions Around Denneoord', 'A home near Denneoord may have pressure that changes between rooms or feels different at certain times of day. The plumber should check fixtures, valves and supply behaviour before recommending replacements, because the symptom is not always caused by the tap or shower itself.'],
  ].forEach(([title, desc], i) => {
    const ids = ['b570634', '050dd12', 'bcd0631', 'a5aadff'];
    find(ids[i], page).settings.editor = `<h3>${title}</h3><p>${desc}</p>`;
  });

  find('45e979d', page).settings.title = 'GEORGE SERVICES';
  find('3ca9b87', page).settings.title = 'Plumbing Services Available in George';
  find('4e6cdc8', page).settings.editor = p('Use these service links to move from the George hub into the specific plumbing help you need. Dedicated George service-location pages can be created later as the SEO build expands.');
  const serviceBoxIds = ['660de7c', 'b0f4bea', 'f9504d0', '9b3ce5a'];
  const relatedGrid = findParentOf({ elements: page }, '660de7c');
  while (relatedGrid.elements.filter(e => e.widgetType === 'icon-box').length < services.length) {
    const boxes = relatedGrid.elements.filter(e => e.widgetType === 'icon-box');
    const c = clone(boxes[boxes.length % 4]);
    uniqueIds(c, `gsvc${boxes.length}`);
    relatedGrid.elements.push(c);
  }
  relatedGrid.elements.filter(e => e.widgetType === 'icon-box').forEach((box, i) => {
    if (services[i]) updateIconBox(box, services[i][0], services[i][2], services[i][1]);
  });
  find('cdc933f', page).settings.editor = '<p>These links support the wider <a href="/services/">H2O Plumbers services</a> hub and connect George customers back to the main <a href="/service-areas/">Garden Route service areas</a> structure.</p>';

  find('19a86b9', page).settings.title = 'AREA NOTE';
  find('b10d8c4', page).settings.title = 'Private Property Plumbing and Municipal Service Boundaries in George';
  find('3eb8050', page).settings.editor = p('H2O Plumbers can assist with plumbing work on private properties in George, including homes, rentals, guesthouses and business premises. If a fault appears to sit in a municipal water, sewer or stormwater line, customers may need to report that part to the relevant authority. The <a href="https://www.george.gov.za/" target="_blank" rel="noopener">George Municipality</a> website is a useful public reference for local service notices.');

  find('bfe2683', page).settings.title = 'GEORGE FAQS';
  find('3501291', page).settings.title = 'Plumber George Questions People Ask Before Booking';
  find('f0e1fa0', page).settings.editor = p('Useful answers for George customers comparing local plumbing help, service coverage and the next step before booking H2O Plumbers.');
  const acc = find('9b703bb', page);
  acc.settings.items = [
    { _id: 'f1', item_title: 'Does H2O Plumbers work throughout George?' },
    { _id: 'f2', item_title: 'Which plumbing services are available in George?' },
    { _id: 'f3', item_title: 'Can I book a plumber for a rental or guesthouse in George?' },
    { _id: '7d684a7', item_title: 'What should I explain when I call about a plumbing fault?' },
    { _id: '899ef6f', item_title: 'Will George suburb pages be added later?' },
  ];
  [
    'Yes. H2O Plumbers serves George and nearby areas, including residential suburbs, business properties, rentals and guest accommodation. Availability depends on the job type, timing and how urgent the plumbing issue is.',
    'The George hub connects customers to general plumbing, leak detection, blocked drains, core drilling, hydro jetting, bathroom renovation plumbing, toilet installations, French drains, pipe relining, burst pipe repairs, commercial plumbing and pressure checks.',
    'Yes. Rental homes, guesthouses and managed properties often need clear communication because owners, tenants and managers may all be involved. H2O Plumbers can help explain the fault and the practical next step.',
    'Share the suburb, the affected fixture or area, when the issue started, whether water is actively leaking and whether other fixtures are affected. Photos can help the team understand access and urgency before arriving.',
    'Yes. This George hub is structured for future hub-and-spoke SEO. Suburb pages such as Heather Park, Blanco and George Central can later link to individual service-location pages like Blocked Drains Heather Park.',
  ].forEach((answer, i) => {
    const ids = ['77c725d', '52b33c5', '4b3d608', '8de3531', '09c3709'];
    find(ids[i], page).settings.editor = p(answer);
  });

  const areasSection = buildCardGridSection(
    find('d877100', page),
    'George Local Area Spokes',
    'GEORGE AREAS',
    'Local Plumbing Areas Around George',
    'These local area cards prepare the George hub for suburb-level spoke pages. Each area can later become a full local page with its own service-specific spoke links.',
    localAreas,
    'garea'
  );
  page.push(areasSection);
  return page;
}

async function upsertMenu(pageId) {
  const items = await wp('/wp-json/wp/v2/menu-items?menus=13&per_page=100&context=edit');
  const existing = items.find(i => (i.title?.raw || i.title?.rendered) === 'George' && i.parent === 6482);
  const payload = { title: 'George', url: `${site}/service-areas/george/`, menus: 13, parent: 6482, status: 'publish' };
  if (existing) await wp(`/wp-json/wp/v2/menu-items/${existing.id}`, { method: 'POST', body: JSON.stringify(payload) });
  else await wp('/wp-json/wp/v2/menu-items', { method: 'POST', body: JSON.stringify({ ...payload, type: 'custom' }) });
}

(async () => {
  sourcePage = await wp('/wp-json/wp/v2/pages/6077?context=edit');
  sourceData = JSON.parse(sourcePage.meta._elementor_data);
  const converted = convertAssets();
  const media = {
    square: await uploadMedia(converted.square, 'H2O Plumbers George plumber location hub image', 'George service area for H2O Plumbers local plumbing help'),
    background: await uploadMedia(converted.background, 'H2O Plumbers plumber George background image', 'Plumber George service area with Outeniqua Mountain views'),
  };
  const data = applyGeorge(sourceData, media);
  const payload = {
    title: 'Plumber George',
    slug: 'george',
    parent: 6414,
    status: 'publish',
    featured_media: media.square.id,
    meta: {
      _elementor_edit_mode: 'builder',
      _elementor_template_type: 'wp-page',
      _elementor_data: JSON.stringify(data),
      _elementor_page_settings: sourcePage.meta._elementor_page_settings || {},
    },
  };
  const existing = await wp('/wp-json/wp/v2/pages?slug=george&parent=6414&context=edit');
  const page = existing.length
    ? await wp(`/wp-json/wp/v2/pages/${existing[0].id}`, { method: 'POST', body: JSON.stringify(payload) })
    : await wp('/wp-json/wp/v2/pages', { method: 'POST', body: JSON.stringify(payload) });
  await wp('/wp-json/yoast/v1/bulk_editor/update_search', {
    method: 'POST',
    body: JSON.stringify({ items: [{
      id: page.id,
      focus_keyphrase: 'Plumber George',
      seo_title: 'Plumber George | H2O Plumbers Garden Route',
      meta_description: 'Need a plumber in George? H2O Plumbers helps homes, rentals, guesthouses and businesses with leaks, drains, repairs and practical plumbing support.',
    }] }),
  });
  await upsertMenu(page.id);
  await wp('/wp-json/elementor/v1/cache', { method: 'DELETE' });
  fs.writeFileSync(`${workRoot}/george-location-hub-result.json`, JSON.stringify({ id: page.id, slug: page.slug, link: page.link, media }, null, 2));
  console.log(JSON.stringify({ id: page.id, slug: page.slug, link: page.link }, null, 2));
})().catch(err => {
  console.error(err.stack || err.message);
  process.exit(1);
});
