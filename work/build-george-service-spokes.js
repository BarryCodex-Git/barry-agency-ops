const fs = require('fs');
const path = require('path');

const site = 'https://dev1.mynewwebsite.co.za';
const username = 'barry';
const password = process.env.BARRY_APP_PASS;
if (!password) throw new Error('Missing BARRY_APP_PASS');

const auth = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`;
const georgeHubId = 6710;
const workRoot = 'C:/Users/USER/Documents/Codex/Barry/work';

const services = [
  { name: 'General Plumbing', slug: 'general-plumbing', sourceId: 6654, focus: 'General Plumbing George', adjective: 'Professional', short: 'general plumbing', related: ['Leak Detection', 'Toilet Installations', 'Bathroom Renovation', 'Burst Pipe Repair'] },
  { name: 'Leak Detection', slug: 'leak-detection', sourceId: 6655, focus: 'Leak Detection George', adjective: 'Expert', short: 'leak detection', related: ['Burst Pipe Repair', 'General Plumbing', 'Bathroom Renovation', 'Water Pressure Problems'] },
  { name: 'Blocked Drains', slug: 'blocked-drains', sourceId: 6077, focus: 'Blocked Drains George', adjective: 'Professional', short: 'blocked drains', related: ['Drain Hydro Jetting', 'Leak Detection', 'Pipe Relining', 'General Plumbing'] },
  { name: 'Core Drilling', slug: 'core-drilling', sourceId: 6656, focus: 'Core Drilling George', adjective: 'Precise', short: 'core drilling', related: ['Bathroom Renovation', 'General Plumbing', 'Pipe Relining', 'Commercial Plumbing'] },
  { name: 'Drain Hydro Jetting', slug: 'drain-hydro-jetting', sourceId: 6657, focus: 'Drain Hydro Jetting George', adjective: 'Professional', short: 'drain hydro jetting', related: ['Blocked Drains', 'Pipe Relining', 'French Drains', 'Commercial Plumbing'] },
  { name: 'Bathroom Renovation', slug: 'bathroom-renovation', sourceId: 6658, focus: 'Bathroom Renovation Plumbing George', adjective: 'Practical', short: 'bathroom renovation plumbing', related: ['General Plumbing', 'Toilet Installations', 'Core Drilling', 'Leak Detection'] },
  { name: 'Toilet Installations', slug: 'toilet-installations', sourceId: 6659, focus: 'Toilet Installations George', adjective: 'Neat', short: 'toilet installations', related: ['General Plumbing', 'Bathroom Renovation', 'Blocked Drains', 'Leak Detection'] },
  { name: 'French Drains', slug: 'french-drains', sourceId: 6660, focus: 'French Drains George', adjective: 'Reliable', short: 'French drains', related: ['Blocked Drains', 'Drain Hydro Jetting', 'Pipe Relining', 'General Plumbing'] },
  { name: 'Pipe Relining', slug: 'pipe-relining', sourceId: 6661, focus: 'Pipe Relining George', adjective: 'Careful', short: 'pipe relining', related: ['Blocked Drains', 'Drain Hydro Jetting', 'Leak Detection', 'Core Drilling'] },
  { name: 'Burst Pipe Repair', slug: 'burst-pipe-repair', sourceId: 6662, focus: 'Burst Pipe Repair George', adjective: 'Fast', short: 'burst pipe repair', related: ['Leak Detection', 'General Plumbing', 'Water Pressure Problems', 'Bathroom Renovation'] },
  { name: 'Commercial Plumbing', slug: 'commercial-plumbing', sourceId: 6663, focus: 'Commercial Plumbing George', adjective: 'Professional', short: 'commercial plumbing', related: ['General Plumbing', 'Blocked Drains', 'Drain Hydro Jetting', 'Leak Detection'] },
  { name: 'Water Pressure Problems', slug: 'water-pressure-problems', sourceId: 6664, focus: 'Water Pressure Problems George', adjective: 'Practical', short: 'water pressure problems', related: ['Leak Detection', 'Burst Pipe Repair', 'General Plumbing', 'Commercial Plumbing'] },
];

const byName = Object.fromEntries(services.map((service) => [service.name, service]));

const problemCards = {
  'General Plumbing': [['Leaking Taps', 'Drips around mixers, washers or cartridges can waste water and damage cupboards if they are left too long.'], ['Running Toilets', 'A cistern that keeps filling can point to worn seals, inlet valves or poor float settings.'], ['Loose Fittings', 'Traps, connectors and stop taps can loosen with daily use in homes, offices and rentals.'], ['Visible Pipe Leaks', 'Small pipe leaks should be checked before moisture reaches walls, floors or electrical areas.']],
  'Leak Detection': [['Moving Meter', 'A meter that turns with all taps closed can suggest a private-side leak.'], ['Damp Walls', 'Moisture near bathrooms, kitchens or outside walls needs careful tracing before opening finishes.'], ['Pressure Drops', 'Changing pressure may connect to hidden leaks, faulty valves or supply restrictions.'], ['Mould Smells', 'A musty cupboard or room can point to trapped moisture before obvious damage appears.']],
  'Blocked Drains': [['Slow Drainage', 'Slow sinks, showers and gullies can point to grease, soap, roots or debris in the line.'], ['Bad Smells', 'Sewer smells usually mean waste is sitting where it should be moving away.'], ['Gurgling Pipes', 'Gurgling after flushing can show air struggling past a partial blockage.'], ['Repeat Blockages', 'A drain that blocks again needs a deeper look, not another quick attempt.']],
  'Core Drilling': [['Pipe Routes', 'New pipe routes need accurate openings that suit the pipe size and position.'], ['Drain Access', 'Drainage openings must allow for fall, sleeve space and realistic installation access.'], ['Renovation Work', 'Bathroom or kitchen upgrades often need neat holes before new services are installed.'], ['Commercial Openings', 'Business premises need controlled drilling where finishes and operations matter.']],
  'Drain Hydro Jetting': [['Recurring Build-up', 'Grease, sludge and soap residue can keep narrowing a drain after basic clearing.'], ['Outside Lines', 'Longer outside drains may need stronger cleaning when debris collects beyond the gully.'], ['Commercial Drain Use', 'Kitchens and busy premises can place heavier demand on drainage lines.'], ['Root Trouble', 'Roots may need careful assessment before pressure cleaning is considered.']],
  'Bathroom Renovation': [['Pipe Positions', 'Basins, showers and toilets need plumbing positions confirmed before finishes are installed.'], ['Waste Fall', 'Drainage must fall correctly so the new bathroom works after tiling and cabinets are complete.'], ['Waterproofing Risk', 'Plumbing changes should be planned before surfaces are closed and sealed.'], ['Fixture Connections', 'Mixers, traps and valves need suitable access for future maintenance.']],
  'Toilet Installations': [['Loose Toilets', 'Movement can damage seals, create smells and affect the finished floor area.'], ['Poor Flushing', 'Flush problems may come from the cistern, pan, waste route or water supply.'], ['Bad Seals', 'A toilet that smells around the base may need the pan connection checked.'], ['Renovation Layouts', 'New bathroom layouts need toilet positions planned before pipework is covered.']],
  'French Drains': [['Pooling Water', 'Water collecting near paving, lawns or walls can need better ground drainage planning.'], ['Soggy Gardens', 'Heavy soil and poor fall can leave garden areas wet after rain.'], ['Boundary Runoff', 'Water movement near boundaries should be planned so it does not create new problems.'], ['Foundation Moisture', 'Persistent water around structures should be handled with practical drainage awareness.']],
  'Pipe Relining': [['Damaged Drain Lines', 'Relining may be considered when a pipe is damaged but still suitable for internal repair.'], ['Root Entry', 'Roots can enter through joins or cracks and cause repeat blockages.'], ['Low-disruption Repairs', 'Some properties benefit from options that reduce excavation where pipe condition allows.'], ['Camera Findings', 'Relining decisions usually need clear evidence of the pipe condition first.']],
  'Burst Pipe Repair': [['Active Leaks', 'Fast water loss should be isolated before damage spreads through the property.'], ['Wet Walls', 'Sudden damp or bubbling paint can point to a failed pipe behind the surface.'], ['Ceiling Drips', 'Water from above may connect to bathroom, geyser or supply pipework.'], ['Failed Pipe Sections', 'Corrosion, movement or pressure changes can weaken older pipework.']],
  'Commercial Plumbing': [['Staff Bathrooms', 'Toilets, basins and drains need to work properly for staff and customer spaces.'], ['Kitchen Areas', 'Sinks, traps and hot water points matter in shops, offices and food premises.'], ['Tenant Callouts', 'Managed properties need clear fault notes for owners, tenants and managers.'], ['Trading Disruption', 'A plumbing issue can affect access, hygiene and operating hours if not handled practically.']],
  'Water Pressure Problems': [['Weak Flow', 'Low shower or tap flow may come from strainers, valves, pipes or supply conditions.'], ['Uneven Pressure', 'Different pressure between rooms helps narrow down where the problem may sit.'], ['Noisy Pipes', 'Banging or humming can point to pressure movement, valves or loose pipework.'], ['High Pressure Risk', 'Excess pressure can stress geyser valves, flex connectors and older fittings.']],
};

function serviceExamples(service) {
  const lower = service.short.toLowerCase();
  const name = service.name;
  const base = {
    'General Plumbing': [
      ['Mixer Tap Repair in Heather Park', 'A Heather Park homeowner booked H2O Plumbers after a kitchen mixer started leaking around the base and staining the cupboard shelf. The team isolated the water, checked the cartridge and flexible connectors, then repaired the fitting and tested it under normal use. The customer was shown what had failed and when replacement would become a better option.'],
      ['Running Toilet Fixed Near George Central', 'A small office close to George Central had a toilet cistern that kept filling after every flush. H2O Plumbers checked the inlet valve, flush mechanism and seal seating before replacing the worn part. The bathroom was tested through several flushes so the manager could reopen the staff area with confidence.'],
      ['Stop Tap Replaced in Blanco', 'A Blanco property owner could not isolate water properly before planned maintenance. The team checked the old stop tap, explained why it was no longer closing cleanly and replaced it with a more reliable control point. That gave the owner a safer way to manage future plumbing repairs on the property.'],
      ['Bathroom Trap Leak Repaired in Loerie Park', 'A Loerie Park home had moisture inside a vanity cupboard after the basin was used. H2O Plumbers checked the trap, waste connection and nearby pipework, then resealed the affected fitting and tested the basin. The repair helped prevent cupboard swelling and gave the owner a clear explanation of the leak source.'],
    ],
    'Leak Detection': [
      ['Hidden Leak Checked in Heather Park', 'A Heather Park homeowner noticed the water meter moving even when taps were closed. H2O Plumbers compared meter behaviour, checked visible fixtures and isolated sections where possible before narrowing the likely fault area. The customer received a practical repair plan instead of opening walls without enough evidence.'],
      ['Damp Cupboard Investigated Near Fancourt', 'A property near Fancourt had a damp smell inside a bathroom vanity. The team checked the mixer tails, trap, wall supply points and nearby wet areas to separate a plumbing leak from normal splash moisture. The work helped the owner understand where access would be needed if moisture returned.'],
      ['Pressure Drop Assessed in Denneoord', 'A Denneoord home had weaker shower pressure and rising water use over the same week. H2O Plumbers compared fixtures, valves and meter readings before explaining which symptoms suggested a private-side leak. That gave the customer a clearer next step before any repair work began.'],
      ['Moisture Pattern Reviewed in George Central', 'An older George Central building showed damp marks on a wall away from the bathroom. The team checked nearby plumbing routes, visible fittings and moisture behaviour before recommending the least disruptive access point. This prevented random breaking and helped the owner deal with the likely source first.'],
    ],
    'Blocked Drains': [
      ['Kitchen Drain Cleared in Heather Park', 'A Heather Park home had a kitchen sink backing up after meals, with water pushing slowly through the waste. H2O Plumbers checked the trap and cleared the accessible line, then flushed the drain to confirm better flow. The customer was advised how grease build-up may have contributed to the problem.'],
      ['Outside Gully Overflow Stopped in George Central', 'A busy George Central property had an outside gully overflowing when the bathroom and laundry were used together. The team opened the accessible drain point, cleared the obstruction and tested the line with water. The owner was told what to monitor if the blockage returns.'],
      ['Slow Shower Drain Fixed in Kingswood', 'A Kingswood rental had a shower draining slowly between guest stays. H2O Plumbers cleared the affected waste route, checked for hair and soap build-up, and confirmed the water moved away cleanly before handover. The repair helped the property manager avoid a guest complaint.'],
      ['Repeat Toilet Blockage Checked in Blanco', 'A Blanco home had a toilet that blocked again after short-term clearing. The team checked the symptoms, cleared the immediate obstruction and explained why repeat blockages may need deeper inspection if the same line gives trouble again.'],
    ],
  };
  if (base[name]) return base[name];
  return [
    [`${name} Completed in Heather Park`, `A Heather Park property needed ${lower} after a plumbing issue started affecting daily use. H2O Plumbers checked the immediate symptom, confirmed the practical access points and completed the work in a way that suited the property layout. The customer received a clear explanation of what was done and what to watch afterwards.`],
    [`${name} Support Near Fancourt`, `A property near Fancourt required ${lower} where neat work and clear planning mattered around finished areas. The team reviewed the existing plumbing, explained the likely repair route and carried out the job without adding unnecessary disruption. The handover focused on what had been changed and why it mattered.`],
    [`${name} Work Around George Central`, `A George Central business space needed ${lower} while keeping access practical for staff and visitors. H2O Plumbers checked the site conditions, worked around the affected service area and explained any follow-up that could prevent the same issue from interrupting daily operations again.`],
    [`${name} Checked in Blanco`, `A Blanco homeowner asked for ${lower} after noticing a plumbing concern that was starting to affect normal use. The team checked nearby fittings, pipe routes and visible risk points before completing the agreed work. The customer was left with practical notes rather than vague advice.`],
  ];
}

function faqFor(service) {
  const lower = service.short.toLowerCase();
  return [
    [`When should I book ${service.name.toLowerCase()} in George?`, `Book a plumber when the problem affects daily use, keeps returning, creates water damage, smells bad, changes pressure or needs work before finishes are closed. H2O Plumbers can check the issue and explain the next practical step for George homes, rentals and business premises.`],
    [`Can H2O Plumbers help with ${lower} in Heather Park and nearby George suburbs?`, `Yes. H2O Plumbers works across George suburbs including Heather Park, Fancourt, Kingswood, Blanco and nearby areas. The exact response depends on the job type, access, timing and how urgent the plumbing problem is.`],
    [`Will the plumber explain the problem before starting?`, `The aim is to explain what can be seen, what needs checking and what repair route makes sense before unnecessary work starts. Some faults only become clear after access is opened, but customers should still understand the reasoning behind the next step.`],
    [`Can ${lower} be handled without damaging tiles or finishes?`, `Sometimes, but it depends on where the fault sits and what access is available. A careful check helps avoid random breaking, but hidden pipework, drainage faults and renovation work may still need proper access to complete the repair safely.`],
    [`Does this service link to municipal water or sewer problems?`, `H2O Plumbers works on private-property plumbing. If the issue appears to involve municipal water supply, public sewer infrastructure or stormwater outside the property boundary, the customer may also need to report it through George Municipality.`],
  ];
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
  (el.elements || []).forEach((child) => walk(child, fn));
}

function find(id, els) {
  for (const e of els) {
    if (e.id === id) return e;
    const f = find(id, e.elements || []);
    if (f) return f;
  }
  return null;
}

function headings(section) {
  const out = [];
  walk(section, (node) => { if (node.widgetType === 'heading') out.push(node); });
  return out;
}

function textEditors(section) {
  const out = [];
  walk(section, (node) => { if (node.widgetType === 'text-editor') out.push(node); });
  return out;
}

function iconBoxes(section) {
  const out = [];
  walk(section, (node) => { if (node.widgetType === 'icon-box') out.push(node); });
  return out;
}

function htmlP(text) {
  return `<p>${text}</p>`;
}

function replaceStrings(data, service) {
  walk({ elements: data }, (node) => {
    if (!node.settings) return;
    for (const [key, value] of Object.entries(node.settings)) {
      if (typeof value !== 'string' || /url|link|css|class/i.test(key)) continue;
      node.settings[key] = value
        .replace(new RegExp(`${service.name} in the Garden Route`, 'gi'), `${service.adjective} ${service.name} in George`)
        .replace(/Garden Route customers/gi, 'George customers')
        .replace(/Garden Route homes/gi, 'George homes')
        .replace(/Garden Route properties/gi, 'George properties')
        .replace(/Garden Route service areas/gi, 'George service areas')
        .replace(/the Garden Route/gi, 'George')
        .replace(/Garden Route/gi, 'George')
        .replace(/George, Mossel Bay, Knysna, Oudtshoorn and nearby George towns/gi, 'George, including Heather Park, Fancourt, Kingswood, Blanco and nearby suburbs')
        .replace(/Mossel Bay, Knysna, Oudtshoorn and nearby towns/gi, 'Heather Park, Fancourt, Kingswood, Blanco and nearby suburbs');
    }
  });
}

function setText(widget, text) {
  if (!widget?.settings) return;
  if ('editor' in widget.settings) widget.settings.editor = text;
  if ('text' in widget.settings) widget.settings.text = text;
}

function setHeading(widget, text) {
  if (!widget?.settings) return;
  if ('title' in widget.settings) widget.settings.title = text;
  if ('ekit_title' in widget.settings) widget.settings.ekit_title = text;
}

function applyGeorgeContent(data, service) {
  replaceStrings(data, service);
  const title = `${service.adjective} ${service.name} in George`;

  setHeading(headings(data[0])[0], title);
  setText(textEditors(data[0])[0], htmlP(`H2O Plumbers helps George homes, rentals, guesthouses and businesses with ${service.short.toLowerCase()} that is explained clearly and handled with practical care. This page focuses on ${service.focus.toLowerCase()} support across Heather Park, Fancourt, Kingswood, Blanco, George Central and nearby suburbs.`));

  setHeading(headings(data[1])[1], `Common ${service.name} Problems George Property Owners Should Notice`);
  setText(textEditors(data[1])[0], htmlP(`${service.name} in George can look different between older central buildings, newer estates, guest accommodation and busy business spaces. H2O Plumbers checks the visible symptom first, then explains whether the fault is simple, recurring or connected to a wider plumbing issue.`));
  const boxes = iconBoxes(data[1]);
  (problemCards[service.name] || problemCards['General Plumbing']).forEach((card, index) => {
    if (!boxes[index]) return;
    boxes[index].settings.title_text = card[0];
    boxes[index].settings.description_text = card[1];
    boxes[index].settings.link = { url: '', is_external: '', nofollow: '', custom_attributes: '' };
    boxes[index].settings._title = `George ${service.name} Problem - ${card[0]}`;
  });

  setHeading(headings(data[2])[1], `How H2O Plumbers Handles ${service.name} in George`);
  setHeading(headings(data[2])[2], `Practical ${service.short.toLowerCase()} with clear next steps`);
  setText(textEditors(data[2])[0], htmlP(`Good ${service.short.toLowerCase()} starts with the property, the symptom and the access available on site. H2O Plumbers works through those details before recommending a repair path, so George customers understand what is being done and why.`));

  setHeading(headings(data[3])[1], `Reliable ${service.name} Support for George Homes and Businesses`);
  setHeading(headings(data[3])[2], `Local plumbing work that suits the property`);
  setText(textEditors(data[3])[0], htmlP(`George properties range from family homes and estates to guesthouses, offices, shops and older buildings near the centre of town. H2O Plumbers keeps the service practical by matching the work to the property type, access limits and level of disruption involved.`));

  setHeading(headings(data[4])[0], 'RECENT WORK');
  setHeading(headings(data[4])[1], `Recent ${service.name} Work Completed Around George`);
  setText(textEditors(data[4])[0], htmlP(`These completed George work examples show how ${service.short.toLowerCase()} can affect different suburbs, estates, rentals and business properties. Each job starts with the actual problem on site, then moves into the repair or next step that makes practical sense.`));
  const storyText = textEditors(data[4]).slice(1, 5);
  serviceExamples(service).forEach((story, index) => {
    if (!storyText[index]) return;
    storyText[index].settings.editor = `<h3>${story[0]}</h3><p>${story[1]}</p>`;
    storyText[index].settings._title = `${service.name} George Recent Work - ${story[0]}`;
  });

  setHeading(headings(data[5])[1], `Related George Plumbing Services for ${service.name}`);
  setText(textEditors(data[5])[0], htmlP(`${service.name} in George can connect to other plumbing needs on the same property. These related service pages keep the George hub linked clearly so customers can move to the exact help they need.`));
  iconBoxes(data[5]).slice(0, 4).forEach((box, index) => {
    const rel = service.related[index];
    const relService = byName[rel];
    if (!relService) return;
    box.settings.title_text = rel;
    box.settings.description_text = `Related ${relService.short.toLowerCase()} help for George properties when ${service.short.toLowerCase()} connects to a wider plumbing concern.`;
    box.settings.link = { url: `/service-areas/george/${relService.slug}/`, is_external: '', nofollow: '', custom_attributes: '' };
    if (box.settings.__dynamic__) delete box.settings.__dynamic__.link;
  });
  const relatedFooter = textEditors(data[5]).find((widget) => /Explore|services|service areas|home page/i.test(widget.settings.editor || ''));
  if (relatedFooter) {
    relatedFooter.settings.editor = `<p>Explore the <a href="/service-areas/george/">George plumbing hub</a>, view the <a href="/service-areas/">H2O Plumbers service areas</a>, or return to the <a href="/">H2O Plumbers home page</a> for broader plumbing support.</p>`;
  }

  setHeading(headings(data[6])[0], 'LOCAL AUTHORITY');
  setHeading(headings(data[6])[1], `Where Private ${service.name} Work Ends and Municipal Reporting Starts in George`);
  setText(textEditors(data[6])[0], htmlP(`H2O Plumbers assists with ${service.short.toLowerCase()} on private properties in George, including homes, estates, rentals, guest accommodation and business spaces. If the issue appears to involve municipal water supply, public sewer infrastructure or stormwater outside the property boundary, report it through <a href="https://www.george.gov.za/" target="_blank" rel="noopener">George Municipality</a> so the correct public-service team can investigate.`));

  setHeading(headings(data[7])[0], `${service.name.toUpperCase()} GEORGE FAQS`);
  setHeading(headings(data[7])[1], `${service.name} Questions George Customers Ask Before Booking`);
  setText(textEditors(data[7])[0], htmlP(`Useful answers for George customers who want to understand ${service.short.toLowerCase()} before booking H2O Plumbers.`));
  const faqAnswers = textEditors(data[7]).slice(1, 6);
  const accordion = find('9b703bb', data);
  const faqs = faqFor(service);
  if (accordion?.settings?.items) {
    accordion.settings.items = faqs.map((faq, index) => ({
      ...(accordion.settings.items[index] || {}),
      _id: (accordion.settings.items[index] || {})._id || `faq${index + 1}`,
      item_title: faq[0],
    }));
  }
  faqs.forEach((faq, index) => {
    if (faqAnswers[index]) faqAnswers[index].settings.editor = htmlP(faq[1]);
  });

  walk({ elements: data }, (node) => {
    if (!node.settings) return;
    if (node.settings._title) node.settings._title = String(node.settings._title).replace(/Garden Route|Blocked Drains|Service/g, `${service.name} George`);
    if (node.settings._css_classes || node.settings.css_classes) {
      node.settings._css_classes = node.settings._css_classes || node.settings.css_classes;
      node.settings.css_classes = node.settings.css_classes || node.settings._css_classes;
    }
  });
}

function updateGeorgeHubLinks(data, created) {
  const linkByName = Object.fromEntries(created.map((item) => [item.name, item.link]));
  const serviceSection = data[5];
  const boxes = iconBoxes(serviceSection);
  boxes.forEach((box) => {
    const title = box.settings?.title_text;
    if (!title || !linkByName[title]) return;
    box.settings.link = { url: linkByName[title], is_external: '', nofollow: '', custom_attributes: '' };
    if (box.settings.__dynamic__) delete box.settings.__dynamic__.link;
  });
}

async function main() {
  const me = await wp('/wp-json/wp/v2/users/me?context=edit');
  if (me.slug !== 'barry') throw new Error('Authenticated WordPress user is not barry');

  const created = [];
  for (const service of services) {
    const source = await wp(`/wp-json/wp/v2/pages/${service.sourceId}?context=edit`);
    const sourceData = JSON.parse(source.meta._elementor_data);
    applyGeorgeContent(sourceData, service);
    const existing = await wp(`/wp-json/wp/v2/pages?slug=${service.slug}&parent=${georgeHubId}&context=edit`);
    const payload = {
      title: `${service.adjective} ${service.name} in George`,
      slug: service.slug,
      status: 'publish',
      parent: georgeHubId,
      meta: {
        _elementor_edit_mode: 'builder',
        _elementor_template_type: 'wp-page',
        _elementor_data: JSON.stringify(sourceData),
        _elementor_page_settings: source.meta._elementor_page_settings || {},
      },
    };
    const page = existing.length
      ? await wp(`/wp-json/wp/v2/pages/${existing[0].id}`, { method: 'POST', body: JSON.stringify(payload) })
      : await wp('/wp-json/wp/v2/pages', { method: 'POST', body: JSON.stringify(payload) });
    created.push({ name: service.name, id: page.id, slug: page.slug, link: `/service-areas/george/${service.slug}/`, focus: service.focus, title: payload.title });
  }

  await wp('/wp-json/yoast/v1/bulk_editor/update_search', {
    method: 'POST',
    body: JSON.stringify({
      items: created.map((page) => {
        const service = services.find((item) => item.name === page.name);
        return {
          id: page.id,
          focus_keyphrase: service.focus,
          seo_title: `${service.focus} | H2O Plumbers`,
          meta_description: `${service.name} in George by H2O Plumbers. Practical help for homes, rentals, guesthouses and businesses in Heather Park, Fancourt, Kingswood and nearby suburbs.`,
        };
      }),
    }),
  });

  const george = await wp(`/wp-json/wp/v2/pages/${georgeHubId}?context=edit`);
  const georgeData = JSON.parse(george.meta._elementor_data);
  updateGeorgeHubLinks(georgeData, created);
  await wp(`/wp-json/wp/v2/pages/${georgeHubId}`, {
    method: 'POST',
    body: JSON.stringify({
      meta: {
        _elementor_edit_mode: 'builder',
        _elementor_template_type: 'wp-page',
        _elementor_data: JSON.stringify(georgeData),
        _elementor_page_settings: george.meta._elementor_page_settings || {},
      },
    }),
  });

  await wp('/wp-json/elementor/v1/cache', { method: 'DELETE' });
  fs.writeFileSync(path.join(workRoot, 'george-service-spokes-created.json'), JSON.stringify(created, null, 2));
  console.log(JSON.stringify({ created: created.length, updatedHub: georgeHubId, pages: created }, null, 2));
}

main().catch((err) => {
  console.error(err.stack || err.message);
  process.exit(1);
});
