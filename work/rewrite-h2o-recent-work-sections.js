const fs = require('fs');

const site = 'https://dev1.mynewwebsite.co.za';
const username = 'barry';
const password = process.env.BARRY_APP_PASS;
if (!password) throw new Error('Missing BARRY_APP_PASS');
const auth = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`;

const pages = {
  6654: {
    eyebrow: 'RECENT WORK',
    h2: 'General Plumbing Jobs Completed Across the Garden Route',
    intro: 'These completed general plumbing examples help show how everyday faults are solved in different Garden Route properties. Each job starts with the symptom, checks the actual plumbing cause and ends with a clear repair or next step.',
    stories: [
      ['Mixer Tap Leak Repaired in Heather Park', 'A Heather Park homeowner called after a kitchen mixer started dripping into the cupboard below the sink. The team isolated the water, checked the flexible connectors, trap area and mixer body, then replaced the worn connection and resealed the fitting. Before leaving, the cupboard base was checked for active moisture and the customer was shown how to watch for any slow return of water.'],
      ['Running Toilet Sorted at a Mossel Bay Rental', 'At a Mossel Bay rental property, the toilet cistern kept refilling long after flushing. H2O Plumbers checked the inlet valve, flush mechanism and water level, then replaced the faulty internal parts and tested several full flush cycles. The repair helped reduce wasted water and gave the property manager a clear explanation of what had failed inside the cistern.'],
      ['Loose Sink Trap Fixed for a Knysna Office', 'A small office kitchen in Knysna had a damp smell under the sink and staff noticed water after busy lunch periods. The trap and waste connection were checked, removed, cleaned and refitted with a proper seal. The team tested the basin under running water, checked the cupboard base and explained why the loose trap had leaked only when the sink was used heavily.'],
      ['Stiff Stop Tap Replaced in Oudtshoorn', 'An Oudtshoorn homeowner needed a stop tap that could close properly before other plumbing repairs were carried out. The old valve was stiff and unreliable, so the water was isolated, the fitting was removed and a suitable replacement valve was installed. The new stop tap was tested open and closed, giving the customer better control if a future leak or repair is needed.'],
    ],
  },
  6655: {
    eyebrow: 'RECENT WORK',
    h2: 'Leak Detection Work Completed in Local Garden Route Areas',
    intro: 'Leak detection examples give search crawlers and customers useful detail about how hidden water problems are traced. These completed-work examples mention local areas, warning signs and the practical checks used before repair decisions are made.',
    stories: [
      ['Hidden Pipe Leak Traced in Heather Park', 'A Heather Park homeowner noticed the water meter moving even when taps were closed. H2O Plumbers checked visible fittings, isolated sections where possible and followed the damp pattern near an internal wall. The fault was traced to a concealed pipe section, allowing the repair area to be narrowed before unnecessary opening work was done.'],
      ['Vanity Moisture Checked in Mossel Bay', 'In a Mossel Bay apartment, a bathroom vanity had swelling at the base and a faint mould smell. The team checked the trap, mixer connections, wall feed and waste outlet before identifying a slow connection leak. The fitting was repaired, the area was dried as far as practical and the customer was advised to monitor the cupboard over the next few days.'],
      ['Pressure Drop Investigated in Knysna Heights', 'A Knysna Heights property had lower pressure in one section of the home and no obvious visible leak. H2O Plumbers compared fixture flow, checked shut-off valves and looked for damp clues around nearby walls and floors. The inspection helped separate a likely plumbing fault from a general supply issue, giving the owner a clearer repair path.'],
      ['Garden Line Leak Found in Oudtshoorn', 'At an Oudtshoorn home, a wet patch kept returning near an outside line even during dry weather. The team checked irrigation isolation, visible pipe routes and nearby fittings before exposing the likely leak point carefully. The damaged section was repaired and tested so the owner could see that the water movement had stopped before the area was closed again.'],
    ],
  },
  6077: {
    eyebrow: 'RECENT WORK',
    h2: 'Blocked Drain Jobs Completed Around the Garden Route',
    intro: 'Blocked drain examples are useful for local SEO because they show real symptoms, property types and practical drain-clearing decisions. These completed jobs connect common drainage problems to specific Garden Route areas.',
    stories: [
      ['Kitchen Drain Cleared in Heather Park', 'A Heather Park home had a kitchen sink backing up after meals, with water pushing slowly through the waste. H2O Plumbers checked the trap first, then worked through the drain line to remove greasy build-up that had collected beyond the visible fitting. The sink was tested with sustained water flow and the customer was advised on simple habits that reduce repeat kitchen blockages.'],
      ['Outside Gully Overflow Stopped Near Diaz Beach', 'Near Diaz Beach in Mossel Bay, an outside gully overflowed after bathrooms and laundry outlets were used together. The team checked the access point, cleared the blockage and flushed the line to confirm that water was moving away properly. Coastal sand and heavy guest use were discussed as likely contributors, so the owner knew what warning signs to watch for.'],
      ['Guest Bathroom Drain Opened in Knysna Central', 'A Knysna Central guesthouse had a bathroom drain that slowed badly during peak check-in days. H2O Plumbers checked the shower waste, basin trap and branch line before clearing built-up hair and soap residue. The drain was flow-tested, and the manager received practical advice on early warning signs so maintenance could be booked before another guest disruption.'],
      ['Repeat Toilet Blockage Resolved in Oudtshoorn', 'An Oudtshoorn home had a toilet that blocked more than once after short-term clearing attempts. The team checked whether the fault was sitting in the pan, connector or downstream drain line, then cleared the obstruction properly and tested repeated flushes. The customer was told when repeat symptoms would justify a deeper drain inspection.'],
    ],
  },
  6656: {
    eyebrow: 'RECENT WORK',
    h2: 'Core Drilling Completed for Garden Route Plumbing Projects',
    intro: 'Core drilling examples help show the planning behind neat pipe openings. These completed-work entries explain where openings were needed, what was checked before drilling and how the work supported the wider plumbing job.',
    stories: [
      ['Bathroom Pipe Route Opened in Heather Park', 'During a Heather Park bathroom update, a new waste route needed a clean opening through a masonry wall. H2O Plumbers confirmed the pipe fall, checked the wall thickness and marked the route before drilling. The opening was made to suit the pipe sleeve, helping the rest of the bathroom plumbing continue without rough chasing or unnecessary patching.'],
      ['Laundry Drain Access Created in Mossel Bay', 'A Mossel Bay home needed a laundry outlet moved to suit a new appliance position. The team checked the planned drain route, nearby services and floor level before core drilling the opening. Once the access was made, the pipework could be installed with a neater fall and the customer avoided a messy, oversized hole through the finished surface.'],
      ['Commercial Basin Waste Route Drilled in Knysna', 'At a Knysna business premises, additional basin plumbing required a controlled opening through a solid wall. H2O Plumbers measured the route from both sides, confirmed the service position and drilled the correct diameter for the waste pipe. The work allowed the installation to continue neatly while keeping the business area easier to reinstate.'],
      ['Outdoor Pipe Opening Planned in Oudtshoorn', 'An Oudtshoorn property needed an outdoor pipe route through a thick wall for a plumbing alteration. The team checked wall material, pipe size and the point where the pipe would exit before drilling. The opening was kept controlled, reducing rough edges and helping the new pipe sit correctly before sealing and final connection work.'],
    ],
  },
  6657: {
    eyebrow: 'RECENT WORK',
    h2: 'Drain Hydro Jetting Work Completed in Local Areas',
    intro: 'Hydro jetting work needs clear judgement because pressure cleaning is not suitable for every drain. These completed examples show where stubborn build-up was cleaned and where drain condition was checked before stronger cleaning was used.',
    stories: [
      ['Grease Build-Up Cleared in George Central', 'A food-service drain near George Central slowed repeatedly even after basic clearing. H2O Plumbers checked the access point and confirmed that the line was suitable for pressure cleaning before hydro jetting was used. Grease and sludge were flushed from the line, then water flow was tested so the business could return to normal use with clearer maintenance guidance.'],
      ['Holiday Home Drain Cleaned Near Diaz Beach', 'A Mossel Bay holiday home near Diaz Beach had recurring outside drain smells after busy occupancy periods. The team checked the gully, access chamber and drain flow before using hydro jetting to clear built-up residue. The line was flushed and tested, and the owner was told which usage patterns can lead to faster build-up during peak holiday stays.'],
      ['Guesthouse Drain Flow Restored in Knysna', 'A Knysna guesthouse had slow bathroom drainage across more than one room, suggesting the issue was deeper than a single trap. H2O Plumbers inspected available access points, cleared the line with hydro jetting where suitable and checked that fixtures drained more evenly afterwards. The manager was given practical signs to watch before the next busy booking period.'],
      ['Stormwater-Affected Drain Checked in Oudtshoorn', 'After repeated outdoor drain trouble at an Oudtshoorn property, H2O Plumbers checked whether sand, garden debris and silt were collecting in the line. Hydro jetting was used only after access and pipe condition were considered. The drain was flushed clear, and the customer was advised where debris control could help reduce future blockages.'],
    ],
  },
  6658: {
    eyebrow: 'RECENT WORK',
    h2: 'Bathroom Renovation Plumbing Completed Across the Garden Route',
    intro: 'Bathroom renovation examples help show the hidden plumbing decisions behind a finished room. These completed jobs focus on pipe routes, fixture positions, waste fall and practical checks before tiles and fittings close the work in.',
    stories: [
      ['Shower Plumbing Planned in Blanco', 'A Blanco homeowner wanted to replace an old bath with a walk-in shower. H2O Plumbers checked the existing hot and cold feeds, waste position and floor fall before the new shower layout was finalised. Pipework was adjusted before waterproofing and tiling, helping the finished bathroom avoid awkward waste routes and poor drainage after completion.'],
      ['Guest Bathroom Update in Knysna Central', 'A Knysna Central guest bathroom needed new basin and toilet positions for easier guest use. The team checked the wall feeds, waste line and pan connector position before the renovation contractor closed the surfaces. Plumbing changes were completed and tested early, giving the owner more confidence that the new finishes would not hide unresolved pipework issues.'],
      ['Rental Bathroom Repairs in Mossel Bay', 'At a Mossel Bay rental property, the bathroom renovation included replacing worn fittings and correcting a leaking basin waste. H2O Plumbers checked all visible connections, replaced problem fittings and tested the basin, toilet and shower before the room returned to use. The property manager received a clear summary of what had been repaired.'],
      ['Family Bathroom Pipework in Heather Park', 'A Heather Park family home needed bathroom pipework adjusted during a layout change. The team checked fixture spacing, isolation valves and drainage fall before installing the new connections. The work was tested before finishes were completed, reducing the risk of leaks behind cupboards or tiles once the bathroom was handed back to the household.'],
    ],
  },
  6659: {
    eyebrow: 'RECENT WORK',
    h2: 'Toilet Installation Jobs Completed in Garden Route Homes',
    intro: 'Toilet installation examples show why correct fitting matters. These completed jobs include pan position, waste connection, sealing, flushing and leak checks in real local property contexts.',
    stories: [
      ['Close-Coupled Toilet Installed in Heather Park', 'A Heather Park homeowner replaced an older toilet that had movement at the base and an unreliable flush. H2O Plumbers removed the old unit, checked the waste connection, fitted the new pan and cistern, then sealed and tested the installation. Several flush cycles were checked so the customer could see that the pan was stable and the water feed was not leaking.'],
      ['Rental Toilet Replacement in Mossel Bay', 'A Mossel Bay rental needed a toilet replaced between bookings after the cistern started failing. The team checked the inlet position, pan connector and floor fixing points before fitting the replacement toilet. The flush mechanism was adjusted, the base was sealed and the property manager was given a practical handover before guests arrived.'],
      ['Guest Bathroom Toilet Fitted in Knysna', 'At a Knysna guesthouse, a worn guest bathroom toilet was replaced to prevent repeat callouts. H2O Plumbers checked the existing connector, fitted the new pan neatly and tested the cistern under normal use. The installation was checked for leaks around the feed and base, helping the guest bathroom return to service without ongoing movement or odour concerns.'],
      ['Toilet Seal Corrected in Oudtshoorn', 'An Oudtshoorn home had a toilet that rocked slightly and left moisture near the base. The team lifted and checked the fitting, corrected the seating, resealed the pan and tested the flush. The customer was shown what had caused the movement and why a stable, well-sealed installation matters for odours, leaks and floor protection.'],
    ],
  },
  6660: {
    eyebrow: 'RECENT WORK',
    h2: 'French Drain Work Completed for Local Drainage Problems',
    intro: 'French drain examples help explain how water is redirected around real properties. These completed jobs focus on pooling, soggy ground, garden runoff and practical drainage routes across different Garden Route conditions.',
    stories: [
      ['Pooling Water Redirected in Heather Park', 'A Heather Park garden had water collecting near a boundary wall after heavy rain. H2O Plumbers checked the slope, soil behaviour and where water could be discharged safely before planning a French drain route. The trench, stone and pipe layout were installed to move water away from the problem area without sending it toward the house.'],
      ['Soggy Lawn Improved Near Mossel Bay', 'A Mossel Bay property had a low lawn section that stayed wet long after rain. The team checked the fall of the ground and the nearest suitable outlet before installing French drain support through the soft area. The work helped reduce standing water and gave the homeowner a clearer plan for keeping surface water away from paving and planted beds.'],
      ['Guesthouse Drainage Managed in Knysna', 'A Knysna guesthouse had water pooling near a walkway used by visitors. H2O Plumbers checked the runoff pattern from roofs, paving and garden beds before installing a drainage route that could handle regular wet weather. The completed work helped move water away from the walking area and reduced the risk of muddy access during busy guest periods.'],
      ['Runoff Controlled at an Oudtshoorn Home', 'An Oudtshoorn home had stormwater washing across a garden section and collecting near an outside wall. The team assessed the slope and soil before installing a French drain path to guide water toward a safer outlet. The customer was advised that keeping surface debris clear would help the drain continue working during heavier rain.'],
    ],
  },
  6661: {
    eyebrow: 'RECENT WORK',
    h2: 'Pipe Relining Assessments and Repairs in the Garden Route',
    intro: 'Pipe relining examples need to show judgement, not automatic recommendations. These completed-work examples explain how damaged lines were checked, when relining was considered and what outcome was practical for the property.',
    stories: [
      ['Damaged Drain Line Checked in George Central', 'A George Central property had repeat drain problems where the same section kept slowing. H2O Plumbers checked the available access points and assessed whether the line condition could support relining or needed another repair method. The customer received a clear explanation of the damaged section, the likely cause and why the chosen repair path suited the pipe condition.'],
      ['Root-Affected Pipe Reviewed in Knysna', 'A Knysna home with established trees had recurring drain trouble that suggested root entry. The team checked the line condition and explained where relining could help only if the pipe shape and damage allowed it. The work focused on understanding the pipe first, so the homeowner did not pay for a repair method that would fail in an unsuitable line.'],
      ['Holiday Property Drain Decision in Mossel Bay', 'At a Mossel Bay holiday property, a drain line under a paved section needed careful repair planning. H2O Plumbers checked the fault location, access and pipe condition before discussing whether relining could reduce disruption. The outcome gave the owner a practical repair direction that considered both the plumbing fault and the cost of disturbing finished paving.'],
      ['Older Pipework Assessed in Oudtshoorn', 'An Oudtshoorn property with older underground pipework had repeat blockages and signs of pipe wear. The team assessed whether the line was still structurally suitable for an internal repair option or whether replacement would be more reliable. The customer was given a clear explanation of the risk areas before any major repair decision was made.'],
    ],
  },
  6662: {
    eyebrow: 'RECENT WORK',
    h2: 'Burst Pipe Repairs Completed Across the Garden Route',
    intro: 'Burst pipe examples give useful detail about urgency, water control and repair decisions. These completed jobs show how H2O Plumbers handles leaks that can quickly damage cupboards, ceilings, walls or outdoor pipework.',
    stories: [
      ['Cupboard Pipe Leak Stopped in Heather Park', 'A Heather Park homeowner called after water started spreading from a cupboard under the kitchen sink. H2O Plumbers isolated the supply, checked the failed pipe section and replaced the damaged fitting before testing the line under pressure. The area was checked for continued moisture and the customer was told what to monitor while the cupboard dried out.'],
      ['Outdoor Burst Pipe Repaired in Mossel Bay', 'A Mossel Bay property had water running from an outside pipe near a paved area. The team isolated the line, exposed the damaged section and repaired the pipe with suitable materials for the location. After pressure testing, the area was closed neatly and the owner was advised to watch for movement or corrosion around nearby older fittings.'],
      ['Ceiling Leak Source Found in Knysna', 'A Knysna home had water marks spreading across a ceiling below an upstairs bathroom. H2O Plumbers checked the bathroom fixtures, isolated the water and traced the fault to a failed pipe connection. The repair was completed with the smallest practical access area, then the line was tested so the homeowner could arrange drying and ceiling repair with more confidence.'],
      ['Pressure Line Repair in Oudtshoorn', 'An Oudtshoorn home had a pressure line fail near an outside wall, sending water across the paving. The team controlled the water first, removed the damaged section and installed a suitable repair. The pipe was tested before reinstatement, and the customer was shown where the failure occurred so future warning signs would be easier to recognise.'],
    ],
  },
  6663: {
    eyebrow: 'RECENT WORK',
    h2: 'Commercial Plumbing Work Completed for Local Businesses',
    intro: 'Commercial plumbing examples help show how service work is handled around staff, customers, tenants and trading hours. These completed jobs include practical faults that affect business premises across the Garden Route.',
    stories: [
      ['Office Kitchen Leak Fixed in George Central', 'A George Central office had water collecting inside a kitchenette cupboard during the workday. H2O Plumbers checked the trap, mixer connections and waste line, then repaired the leaking connection and tested the sink under normal use. The work was completed with minimal disruption, and staff were told what had caused the leak and when to call if moisture returned.'],
      ['Restaurant Drain Cleared in Mossel Bay', 'A Mossel Bay food business had a drain slowing during busy service periods. The team checked the access point, cleared the blockage and flushed the line so the kitchen could keep operating. Grease management and early warning signs were discussed with the manager, helping the business plan maintenance before the next blockage affected trading.'],
      ['Guesthouse Bathroom Fault Resolved in Knysna', 'A Knysna guesthouse reported a leaking bathroom fitting in a room needed for incoming guests. H2O Plumbers checked the visible pipework, isolated the fault and repaired the connection before testing the fixture. The manager received a clear explanation of the repair, which helped the room return to use without leaving an unresolved leak behind a cabinet.'],
      ['Staff Toilet Repair in Oudtshoorn', 'An Oudtshoorn business had a staff toilet that kept running and wasting water throughout the day. The team checked the cistern mechanism, replaced the faulty internal part and tested the flush repeatedly. The repair reduced water waste and gave the business a practical next step if the older pan or feed line starts showing further problems.'],
    ],
  },
  6664: {
    eyebrow: 'RECENT WORK',
    h2: 'Water Pressure Problems Checked in Garden Route Properties',
    intro: 'Water pressure examples help crawlers understand the difference between weak flow, pressure spikes and fixture-specific faults. These completed checks show how pressure issues are measured before parts are changed.',
    stories: [
      ['Weak Shower Pressure Checked in Heather Park', 'A Heather Park homeowner had weak shower pressure while nearby taps seemed normal. H2O Plumbers compared flow at different fixtures, checked isolation valves and looked for restrictions in the shower feed. The fault was narrowed to the local fixture line rather than the whole property, giving the customer a clear repair path without replacing unrelated parts.'],
      ['Pressure Fluctuation Reviewed in Mossel Bay', 'A Mossel Bay apartment had pressure that changed between morning and evening use. The team checked the unit fixtures, valve settings and supply behaviour before explaining which symptoms pointed to building supply conditions and which could be handled inside the apartment. The customer received practical guidance instead of a guessed repair.'],
      ['Geyser Feed Pressure Tested in Knysna', 'A Knysna home had uneven hot water pressure after other plumbing work had been done. H2O Plumbers checked the cold feed, geyser-related valves and hot outlet behaviour before deciding what needed adjustment. The work helped separate a pressure-control issue from a possible fixture problem, making the next repair decision more accurate.'],
      ['High Pressure Concern in Oudtshoorn', 'An Oudtshoorn homeowner noticed noisy pipes and forceful flow at several taps. The team measured the pressure, checked valve behaviour and explained how excessive pressure can affect fittings over time. A suitable pressure-control recommendation was made so the customer could reduce stress on mixers, toilets, geyser components and appliance connections.'],
    ],
  },
  6710: {
    eyebrow: 'RECENT WORK',
    h2: 'Recent Plumbing Work Completed Around George',
    intro: 'These completed George work examples help show local plumbing relevance across suburbs, estates, rental properties and business areas. Each example connects a real service problem to the kind of practical checks and repairs H2O Plumbers carries out in George.',
    stories: [
      ['Leak Repair Completed in Heather Park', 'A Heather Park homeowner called after damp appeared near a kitchen cupboard and the water meter continued moving with taps closed. H2O Plumbers isolated the supply, checked visible fittings and traced the fault to a concealed connection near the cupboard line. The damaged section was repaired, the line was tested and the customer was shown how to monitor the area while it dried.'],
      ['Blocked Drain Cleared Near George Central', 'A property near George Central had a bathroom drain backing up during busy morning use. The team checked the trap, branch line and outside access before clearing the obstruction and flushing the drain properly. Once water moved away at a normal rate, the customer was told which warning signs would suggest a deeper line issue rather than a simple bathroom blockage.'],
      ['Bathroom Plumbing Planned in Blanco', 'A Blanco home needed bathroom plumbing adjusted before new finishes were installed. H2O Plumbers checked the basin, shower and toilet positions, confirmed waste fall and adjusted pipework before the surfaces were closed. The work helped the renovation continue with better fixture spacing and reduced the risk of hidden leaks behind the new vanity and tiles.'],
      ['Water Pressure Checked in Denneoord', 'A Denneoord homeowner had pressure that changed between rooms, especially when the shower and kitchen tap were used close together. The team compared fixture flow, checked valves and looked at supply behaviour before identifying the likely pressure-control issue. The customer received a clear explanation of what could be repaired on the property and what needed monitoring.'],
    ],
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
  if (!res.ok) throw new Error(`${options.method || 'GET'} ${endpoint} failed ${res.status}: ${typeof body === 'string' ? body.slice(0, 500) : JSON.stringify(body).slice(0, 500)}`);
  return body;
}

function walk(el, fn) {
  fn(el);
  (el.elements || []).forEach(child => walk(child, fn));
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

function textOf(section) {
  let out = '';
  walk(section, node => {
    if (!node.settings) return;
    for (const value of Object.values(node.settings)) {
      if (typeof value === 'string') out += ` ${value}`;
    }
  });
  return out;
}

function storyHtml([title, body]) {
  return `<strong>${title}</strong><br>${body}`;
}

async function updatePage(id, spec) {
  const page = await wp(`/wp-json/wp/v2/pages/${id}?context=edit`);
  const data = JSON.parse(page.meta._elementor_data);
  const index = data.findIndex(section => /LOCAL JOBS|LOCAL EXAMPLES|Recent Plumbing Work|Work Across Garden Route|How Plumbing Issues Can Show Up/i.test(textOf(section)));
  if (index < 0) throw new Error(`Could not find local work section on page ${id}`);
  const section = data[index];
  const headings = [];
  const texts = [];
  walk(section, node => {
    if (node.widgetType === 'heading') headings.push(node);
    if (node.widgetType === 'text-editor') texts.push(node);
  });
  if (headings[0]) setHeading(headings[0], spec.eyebrow);
  if (headings[1]) setHeading(headings[1], spec.h2);
  if (texts[0]) setText(texts[0], spec.intro);
  spec.stories.forEach((story, i) => {
    if (texts[i + 1]) setText(texts[i + 1], storyHtml(story));
  });
  await wp(`/wp-json/wp/v2/pages/${id}`, {
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
  return { id, title: page.title?.raw || page.title?.rendered || '', sectionIndex: index, stories: spec.stories.length };
}

async function main() {
  const updated = [];
  for (const [id, spec] of Object.entries(pages)) updated.push(await updatePage(id, spec));
  await wp('/wp-json/elementor/v1/cache', { method: 'DELETE' });
  fs.writeFileSync('C:/Users/USER/Documents/Codex/Barry/work/h2o-recent-work-section-copy.json', JSON.stringify(pages, null, 2));
  console.log(JSON.stringify({ updated }, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
