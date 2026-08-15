const fs = require('fs');
const path = require('path');

const site = 'https://dev1.mynewwebsite.co.za';
const username = 'barry';
const password = process.env.BARRY_APP_PASS;
if (!password) throw new Error('Missing BARRY_APP_PASS');

const auth = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`;
const workRoot = 'C:/Users/USER/Documents/Codex/Barry/work';
const sourcePagePath = path.join(workRoot, 'page-6077-edit.json');
const mediaManifestPath = path.join(workRoot, 'h2o-service-page-webp-manifest.json');

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));
}

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

async function uploadMedia(file, title, alt) {
  const buf = fs.readFileSync(file);
  const res = await fetch(`${site}/wp-json/wp/v2/media`, {
    method: 'POST',
    headers: {
      Authorization: auth,
      'Content-Type': 'image/webp',
      'Content-Disposition': `attachment; filename="${path.basename(file)}"`,
    },
    body: buf,
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

const services = [
  {
    name: 'General Plumbing', slug: 'general-plumbing-garden-route', short: 'general plumbing', keyphrase: 'general plumbing Garden Route',
    bubble: ['Clear Advice', 'Neat Work'], imageSlug: 'general-plumbing', icon: 'fas fa-tools',
    h1: 'General Plumbing in the Garden Route',
    intro: 'Small plumbing faults can still disrupt a home, rental or workplace when they are left too long. H2O Plumbers helps with everyday plumbing repairs across George, Mossel Bay, Knysna, Oudtshoorn and nearby Garden Route towns.',
    warningH2: 'Everyday Plumbing Problems That Need a Proper Look',
    warningCopy: 'General plumbing covers the practical jobs that keep water moving safely through a property. The right fix depends on where the fault sits, how often it returns and whether nearby fittings are affected.',
    cards: [
      ['Leaking Taps', 'A dripping tap can waste water, stain fittings and point to worn washers, cartridges or mixer components that need proper replacement.'],
      ['Running Toilets', 'A cistern that keeps filling may have a faulty valve, seal or float setting, which can quietly increase water use.'],
      ['Faulty Fittings', 'Loose traps, flexible connectors, stop taps and valves can create leaks or unreliable water control inside busy rooms.'],
      ['Minor Pipe Leaks', 'Small pipe leaks under sinks or behind fixtures should be checked before moisture reaches cupboards, floors or walls.'],
    ],
    approachH2: 'How H2O Plumbers Handles General Plumbing Repairs',
    approachH3: 'Practical repairs before bigger problems start',
    approachBullets: [
      '<strong>Check the fixture:</strong> The team looks at the affected tap, toilet, trap, valve or pipework before recommending the simplest sensible repair.',
      '<strong>Protect nearby finishes:</strong> Plumbing work is handled carefully around cupboards, tiles, counters and floors where small leaks can create hidden damage.',
      '<strong>Explain the next step:</strong> Customers are told whether the issue looks like a quick repair, a worn part or a sign of a wider plumbing fault.',
    ],
    trustH2: 'Good General Plumbing Keeps Daily Routines Running',
    trustH3: 'Useful help for homes, rentals and business spaces',
    trustBullets: [
      '<strong>Home plumbing support:</strong> Taps, toilets, kitchen fittings, bathroom fixtures and visible pipework can often be repaired before they become disruptive.',
      '<strong>Rental-friendly work:</strong> Guesthouses and holiday homes need plumbing faults handled clearly so guests and property managers know what has been done.',
      '<strong>Commercial basics:</strong> Shops, offices and small businesses rely on working toilets, sinks and service areas during normal trading hours.',
    ],
    stories: [
      ['Leaking Mixer Tap in Heather Park, George', 'A kitchen mixer in a Heather Park home can begin leaking around the base when seals wear or the cartridge no longer closes cleanly. The practical first step is to isolate the water, check the fitting and confirm whether a repair or replacement will give the owner a more reliable result.'],
      ['Running Toilet at a Mossel Bay Rental', 'In a holiday rental near Mossel Bay, a toilet that runs after every flush can waste water without drawing much attention at first. A plumber would check the inlet valve, flush mechanism and seal seating so the issue is explained properly to the owner or manager.'],
      ['Loose Trap Under a Knysna Office Sink', 'A small office kitchen in Knysna can develop cupboard moisture when a trap or connector loosens under regular use. The repair needs a neat check of the waste connection, a clean reseal where suitable and a flow test before the space is handed back.'],
      ['Stop Tap Trouble in an Oudtshoorn Home', 'When a stop tap becomes stiff or unreliable in an Oudtshoorn property, it can make future maintenance harder. The plumber needs to check whether the valve can be serviced safely or whether a replacement will give better control during future repairs.'],
    ],
    related: ['Leak Detection','Toilet Installations','Bathroom Renovation','Burst Pipe Repair'],
    authorityH2: 'When a Small Plumbing Issue Should Not Be Ignored',
    authorityCopy: 'A small plumbing repair can become more expensive when water reaches cabinetry, floors, walls or electrical areas. H2O Plumbers can assist with visible plumbing faults on private property and advise when the symptoms suggest a deeper pipe or pressure issue. For general water conservation guidance, the <a href="https://www.dws.gov.za/" target="_blank" rel="noopener">Department of Water and Sanitation</a> is a useful South African reference.',
    faqs: [
      ['What counts as general plumbing work?', 'General plumbing usually includes taps, toilets, traps, valves, small visible leaks, fixture connections and everyday repairs inside or around the property. If the fault points to a deeper line, pressure problem or hidden leak, the plumber can explain the next practical step.'],
      ['Should I repair or replace a leaking tap?', 'It depends on the condition of the tap, the availability of parts and where the leak is coming from. A simple washer or cartridge can sometimes solve it, but older fittings may be more sensible to replace if the body is worn.'],
      ['Can H2O Plumbers help with rental property plumbing?', 'Yes. Rental and guesthouse plumbing often needs clear communication because owners, managers and tenants may all be involved. H2O Plumbers can help with practical repairs and explain what was found so the next decision is easier.'],
      ['Why does a toilet keep running after flushing?', 'A running toilet often points to a worn seal, faulty inlet valve, poor float setting or flush mechanism problem. It should be checked because constant filling can waste water and may get worse over time.'],
      ['Do small leaks need urgent attention?', 'Small leaks should be looked at sooner rather than later, especially near cupboards, floors or walls. Even a slow drip can create swelling, staining or damp smells if it runs unnoticed for long enough.'],
    ],
  },
  {
    name: 'Leak Detection', slug: 'leak-detection-garden-route', short: 'leak detection', keyphrase: 'leak detection Garden Route',
    bubble: ['Hidden Leaks', 'Clear Checks'], imageSlug: 'leak-detection', icon: 'fas fa-search',
    h1: 'Leak Detection in the Garden Route',
    intro: 'A hidden leak can show up as a damp patch, high water use, mould smell or pressure drop long before the pipe is visible. H2O Plumbers helps Garden Route homes and businesses trace plumbing leaks sensibly.',
    warningH2: 'Signs a Hidden Water Leak May Be Developing',
    warningCopy: 'Leak detection starts with the clues the property is already giving. Water meter movement, damp walls, lifting floors and unexplained moisture can all point to different leak paths.',
    cards: [
      ['Moving Water Meter', 'A meter that moves while all taps are closed can suggest water is escaping somewhere on the private side of the supply.'],
      ['Damp Walls', 'Moisture marks near bathrooms, kitchens or outside walls may point to a pipe, fitting or waterproofing-related issue.'],
      ['Pressure Drops', 'Weak flow or changing pressure can sometimes connect to hidden leaks, faulty valves or supply line problems.'],
      ['Mould Smells', 'A musty smell in a closed room or cupboard can mean moisture is collecting before visible damage appears.'],
    ],
    approachH2: 'How H2O Plumbers Looks for Leak Clues',
    approachH3: 'Trace the source before opening walls',
    approachBullets: [
      '<strong>Start with symptoms:</strong> The position of damp, pressure behaviour and meter readings help narrow down where the fault may sit.',
      '<strong>Test carefully:</strong> Practical checks can separate supply leaks, waste leaks, fixture faults and moisture that comes from another source.',
      '<strong>Limit damage:</strong> The aim is to avoid unnecessary breaking while still finding enough evidence to choose a sensible repair.',
    ],
    trustH2: 'Hidden Leaks Need Calm, Methodical Plumbing Checks',
    trustH3: 'Better decisions before repair work begins',
    trustBullets: [
      '<strong>Avoid guesswork:</strong> Damp can travel, so the visible mark is not always directly above the damaged pipe or fitting.',
      '<strong>Protect finishes:</strong> Floors, cupboards and tiles should not be opened without a practical reason and a clear repair plan.',
      '<strong>Explain findings:</strong> Customers need to understand what was tested, what was found and what still needs confirmation.',
    ],
    stories: [
      ['Meter Movement Near King George Park, George', 'A homeowner near King George Park may notice the water meter turning while every tap is closed. A leak detection visit would start by confirming the meter behaviour, checking visible fittings and isolating sections where possible before deciding whether the supply line needs deeper investigation.'],
      ['Damp Cupboard in a Mossel Bay Apartment', 'A bathroom vanity in a Mossel Bay apartment can hide a slow leak from a trap, mixer connection or wall supply. The right check is careful because water may collect inside the cupboard before dripping onto the floor or showing on the wall.'],
      ['Moisture Smell in Knysna Heights', 'Homes around Knysna Heights can show moisture smells in closed rooms when a small pipe fault, shower leak or drainage issue sits behind the surface. A practical inspection looks for moisture patterns, nearby plumbing points and recent usage before recommending repair access.'],
      ['Low Pressure Concern in Oudtshoorn', 'A sudden pressure drop in an Oudtshoorn property may not always mean a leak, but it should be checked if water use also rises. The plumber would compare fixtures, valves and supply behaviour so the owner knows whether the problem is localised or wider.'],
    ],
    related: ['Burst Pipe Repair','General Plumbing','Bathroom Renovation','Water Pressure Problems'],
    authorityH2: 'What to Do When Water Use Suddenly Increases',
    authorityCopy: 'If water use jumps without a clear reason, close taps, check the meter and look for visible moisture around fixtures, walls and outside lines. H2O Plumbers can assist with private plumbing leak checks and advise if a municipal-side issue may need reporting. For local water notices, customers can also check their municipal channels such as the <a href="https://www.george.gov.za/" target="_blank" rel="noopener">George Municipality</a> website.',
    faqs: [
      ['How can I tell if I have a hidden leak?', 'A moving meter with all taps off, damp walls, swelling cupboards, mould smells or unexplained high water use can all point to a hidden leak. None of these signs proves the exact location, but they are good reasons to book a proper check.'],
      ['Can leak detection avoid breaking tiles?', 'Sometimes it can reduce unnecessary breaking by narrowing the likely fault area first. It cannot guarantee that no access will be needed, but practical testing helps customers avoid opening random areas without enough evidence.'],
      ['Why does damp appear away from the actual pipe?', 'Water can travel along walls, floors, cavities and pipe sleeves before it becomes visible. That is why the stain is only a clue. The surrounding plumbing layout and moisture pattern still need to be checked carefully.'],
      ['Is a pressure drop always caused by a leak?', 'No. Pressure can change because of supply interruptions, faulty valves, blocked strainers, pressure regulators or pipe restrictions. A leak becomes more likely when pressure changes appear together with rising water use or visible moisture.'],
      ['Should I switch off the water before calling?', 'If water is actively leaking or causing damage, it is sensible to isolate the supply if you can do so safely. If the leak is only suspected, note the symptoms and meter behaviour before calling so the plumber has useful information.'],
    ],
  },
  {
    name: 'Blocked Drains', slug: 'blocked-drains-garden-route', short: 'blocked drains', keyphrase: 'blocked drains Garden Route',
    bubble: ['Clear Advice', 'Neat Work'], imageSlug: 'blocked-drains', icon: 'fas fa-water',
    h1: 'Blocked Drains in the Garden Route',
    intro: 'Blocked drains can quickly move from a slow sink or bad smell to an overflow that disrupts the whole property. H2O Plumbers helps homes, guesthouses and businesses across the Garden Route deal with drain problems properly.',
    warningH2: 'Signs Your Drain Problem Needs Proper Attention',
    warningCopy: 'Blocked drains rarely fix themselves for long. If the same sink, toilet, shower or outside gully keeps giving trouble, there is usually a build-up, obstruction or pipe condition that needs a proper look.',
    cards: [
      ['Slow Drainage', 'Water that drains slowly from a sink, shower, bath or outside gully can point to grease, soap build-up, sand, roots or a narrowing in the line.'],
      ['Bad Smells', 'Sewer smells around bathrooms, kitchens or outdoor drains often mean waste is sitting in the pipe instead of moving away properly.'],
      ['Gurgling Pipes', 'Gurgling after flushing or draining can show that air is struggling to move through the system because the line is partly blocked.'],
      ['Repeat Blockages', 'A drain that clears and blocks again needs more than another quick attempt. The cause may sit deeper in the line.'],
    ],
    approachH2: 'How H2O Plumbers Clears Blocked Drains Properly',
    approachH3: 'More than a quick poke at the pipe',
    approachBullets: [
      '<strong>Check the symptoms:</strong> Slow drainage, smells, gurgling, outside gully overflows and repeat blockages all point to different possible causes.',
      '<strong>Choose the right method:</strong> A simple blockage, grease build-up, roots and deeper pipe problems do not always need the same clearing approach.',
      '<strong>Test the flow:</strong> Once the drain is cleared, the line should be checked where practical so the customer knows whether the issue looks resolved or likely to return.',
    ],
    trustH2: 'Blocked Drains Need Careful, Practical Fault Finding',
    trustH3: 'A cleaner way to deal with messy drain problems',
    trustBullets: [
      '<strong>Protect the property:</strong> Drain work can be messy, so the work area should be handled with care before, during and after clearing.',
      '<strong>Explain the likely cause:</strong> Customers should understand whether the blockage looked like grease, roots, debris, misuse or a deeper pipe issue.',
      '<strong>Prevent repeat trouble:</strong> If the same drain keeps blocking, H2O Plumbers can advise whether hydro jetting, inspection or pipe repair should be considered.',
    ],
    stories: [
      ['Kitchen Drain Backing Up Near Heather Park, George', 'A kitchen drain in a Heather Park home can start backing up when grease, food waste and soap residue collect beyond the trap. The practical response is to clear the accessible line, test the flow and explain whether the blockage looks local or deeper in the drainage run.'],
      ['Outside Gully Overflow Around Diaz Beach, Mossel Bay', 'Coastal properties near Diaz Beach can deal with sand, garden debris and heavy seasonal use. When an outside gully overflows, the plumber needs to clear the obstruction, check how waste water is moving and advise whether the line needs a stronger clean.'],
      ['Guest Bathroom Drain Trouble Close to Knysna Central', 'A guesthouse near Knysna Central cannot afford slow showers or bad smells during a busy booking period. The work needs to be handled neatly, with attention to hygiene, access and whether the problem is isolated to one bathroom or connected to a shared line.'],
      ['Repeat Toilet Blockage in an Oudtshoorn Home', 'When a toilet in Oudtshoorn blocks repeatedly, the cause may sit beyond the pan. The line may have a partial obstruction, root entry, poor fall or damaged section, so the plumber should explain what was found and when inspection may be worthwhile.'],
    ],
    related: ['Drain Hydro Jetting','Leak Detection','Pipe Relining','General Plumbing'],
    authorityH2: 'Private Drains, Municipal Lines and When to Report a Sewer Issue',
    authorityCopy: 'H2O Plumbers can assist with blocked drains on private property, including sinks, toilets, showers, gullies, inspection chambers and drainage lines linked to the property. If the issue appears to sit in a municipal sewer line, customers may need to report it to the relevant municipality. For Garden Route service information, the <a href="https://www.gardenroute.gov.za/" target="_blank" rel="noopener">Garden Route District Municipality</a> is a useful public reference.',
    faqs: [
      ['Why does my drain keep blocking after I clear it?', 'A drain that blocks again usually has a cause sitting deeper than the visible trap or toilet pan. Grease, soap residue, roots, debris, poor pipe fall or a damaged section can all create repeat trouble. Clearing the immediate blockage helps, but the pattern matters.'],
      ['Can H2O Plumbers help if an outside gully is overflowing?', 'Yes. An overflowing outside gully can mean the branch drain or main property line is not moving waste away properly. H2O Plumbers can check the affected area, clear the accessible blockage where possible and advise if the symptoms suggest a deeper line issue.'],
      ['Should I use drain chemicals before calling a plumber?', 'Repeated chemical use is not ideal. It can be harsh, may not reach the real obstruction and can make the work area less pleasant or safe to handle. If a drain is slow, smells bad or keeps backing up, a practical plumbing check is usually better.'],
      ['When is hydro jetting better than normal drain clearing?', 'Hydro jetting may suit heavy grease, sludge, roots or recurring build-up that normal clearing does not remove properly. The plumber still needs to decide whether high-pressure cleaning suits the pipe condition and the type of blockage.'],
      ['Do blocked drains need a camera inspection every time?', 'No. Camera inspection is useful for repeat blockages, suspected root entry, cracked pipes, collapsed sections or unclear underground problems. Many straightforward blockages can be cleared without camera work, but repeat issues may need deeper investigation.'],
    ],
  },
];

const extraServices = [
  ['Core Drilling','core-drilling-garden-route','core drilling','core drilling Garden Route','Access Holes','Clean Cuts','fas fa-dot-circle'],
  ['Drain Hydro Jetting','drain-hydro-jetting-garden-route','drain hydro jetting','drain hydro jetting Garden Route','High Pressure','Clear Flow','fas fa-shower'],
  ['Bathroom Renovation','bathroom-renovation-garden-route','bathroom renovation plumbing','bathroom renovation plumbing Garden Route','Neat Plumbing','Planned Work','fas fa-bath'],
  ['Toilet Installations','toilet-installations-garden-route','toilet installations','toilet installations Garden Route','Secure Fitting','Clean Finish','fas fa-toilet'],
  ['French Drains','french-drains-garden-route','French drains','French drains Garden Route','Better Drainage','Ground Control','fas fa-seedling'],
  ['Pipe Relining','pipe-relining-garden-route','pipe relining','pipe relining Garden Route','Pipe Repair','Less Digging','fas fa-project-diagram'],
  ['Burst Pipe Repair','burst-pipe-repair-garden-route','burst pipe repair','burst pipe repair Garden Route','Fast Isolation','Water Control','fas fa-wrench'],
  ['Commercial Plumbing','commercial-plumbing-garden-route','commercial plumbing','commercial plumbing Garden Route','Business Ready','Neat Work','fas fa-building'],
  ['Water Pressure Problems','water-pressure-problems-garden-route','water pressure problems','water pressure problems Garden Route','Pressure Checks','Clear Answers','fas fa-tachometer-alt'],
];

const specifics = {
  'Core Drilling': {
    warningH2: 'When Plumbing Work Needs Clean, Accurate Access',
    warningCopy: 'Core drilling helps create controlled openings for pipes, drains and service access where rough breaking would leave a poor finish. The work needs careful positioning before the drill starts.',
    cards: [['Pipe Access','Accurate openings help pipes pass through walls, slabs or surfaces without unnecessary damage around the work area.'],['Drain Routes','Drainage openings need the right fall, position and diameter so the pipe can run correctly after drilling.'],['Renovation Work','Bathroom and kitchen upgrades often need neat openings before new pipework can be installed cleanly.'],['Commercial Openings','Business premises may need controlled drilling where services must be added without disrupting surrounding finishes.']],
    approachH2: 'How H2O Plumbers Plans Core Drilling for Plumbing Work',
    approachH3: 'Measure first, drill once',
    approachBullets: ['<strong>Confirm the route:</strong> Pipe size, fall, wall thickness and nearby services all matter before the opening is made.','<strong>Use the right diameter:</strong> A plumbing opening should suit the pipe and sleeve, not just the closest available bit.','<strong>Keep the finish neat:</strong> Controlled drilling helps reduce rough edges, cracked surfaces and unnecessary patching.'],
    trustH2: 'Core Drilling Should Support the Plumbing Plan',
    trustH3: 'Clean access helps the rest of the job',
    trustBullets: ['<strong>Avoid poor positioning:</strong> A badly placed hole can make pipework awkward, visible or difficult to maintain.','<strong>Protect the structure:</strong> Drilling should be handled with awareness of slabs, walls, waterproofing and existing services.','<strong>Plan around finishes:</strong> Tiles, floors and walls need care so the final plumbing work looks intentional.'],
  },
  'Drain Hydro Jetting': {
    warningH2: 'When a Drain Needs More Than Basic Clearing',
    warningCopy: 'Hydro jetting uses high-pressure water to clean stubborn build-up inside suitable drains. It is not for every situation, but it can help where ordinary clearing keeps falling short.',
    cards: [['Grease Build-Up','Kitchen lines can collect greasy layers that narrow the pipe and keep catching food waste after each use.'],['Sludge in Drains','Outdoor and older drains may hold silt, soap residue and settled waste that normal clearing does not remove well.'],['Recurring Blocks','A line that blocks again after clearing may need a stronger clean or further inspection before the cause is understood.'],['Root Intrusion','Fine roots can catch waste and grow into a bigger obstruction when pipe joints or cracks allow entry.']],
    approachH2: 'How H2O Plumbers Decides if Hydro Jetting Is Suitable',
    approachH3: 'Pressure cleaning only where it makes sense',
    approachBullets: ['<strong>Check the drain first:</strong> The plumber considers the blockage pattern, pipe condition and access before recommending jetting.','<strong>Clean the line:</strong> High-pressure water can remove build-up along more of the pipe than a basic clearing attempt.','<strong>Watch for repeat causes:</strong> If roots or damage are suspected, jetting may be part of the answer rather than the whole repair.'],
    trustH2: 'Hydro Jetting Works Best With the Right Judgement',
    trustH3: 'A stronger clean still needs care',
    trustBullets: ['<strong>Match the method:</strong> Not every drain should be jetted, especially if pipe condition is uncertain.','<strong>Reduce build-up:</strong> Proper cleaning can help busy kitchens, rentals and commercial spaces avoid repeated slow drainage.','<strong>Explain limits:</strong> Customers should know when jetting is likely to help and when inspection or pipe repair may still be needed.'],
  },
  'Bathroom Renovation': {
    warningH2: 'Bathroom Plumbing Details That Matter During Renovations',
    warningCopy: 'A bathroom renovation depends on neat water, waste and fixture planning before the finishes go in. Poor plumbing decisions can become expensive once tiles, vanities and showers are installed.',
    cards: [['Shower Plumbing','Mixers, outlets, wastes and waterproofing positions need careful planning before walls are closed.'],['Basin Connections','Vanity plumbing should line up with the chosen basin, trap and cupboard space to avoid awkward visible pipework.'],['Toilet Positions','Toilet waste positions, water feeds and clearances need to suit the layout before final fixing.'],['Drainage Falls','Bathroom waste pipes need proper fall so showers, baths and basins drain reliably after the renovation.']],
    approachH2: 'How H2O Plumbers Supports Bathroom Renovation Plumbing',
    approachH3: 'Plan the pipework before the finishes',
    approachBullets: ['<strong>Review the layout:</strong> Fixture positions, pipe routes and drainage fall should be checked before plumbing points are moved.','<strong>Coordinate with finishes:</strong> Plumbing work needs to suit tiles, vanities, shower screens and the final bathroom layout.','<strong>Test before closing:</strong> Water and waste connections should be checked before walls, floors or cupboards hide the work.'],
    trustH2: 'Renovation Plumbing Needs More Than Quick Fitting',
    trustH3: 'The hidden work affects the finished room',
    trustBullets: ['<strong>Protect the layout:</strong> Neat plumbing helps the final bathroom look clean instead of patched around bad pipe positions.','<strong>Prevent drainage issues:</strong> A beautiful bathroom still fails if the shower, basin or toilet does not drain properly.','<strong>Think ahead:</strong> Access, isolation valves and serviceability matter when future repairs are needed.'],
  },
  'Toilet Installations': {
    warningH2: 'When a Toilet Needs Correct Fitting or Replacement',
    warningCopy: 'A toilet installation needs more than placing a new pan in position. The waste connection, water feed, seal, level and fixing all affect how reliably it works.',
    cards: [['Loose Toilet Pan','Movement around the base can damage seals, create leaks or make the toilet uncomfortable to use.'],['Leaking Connector','Water around the back or base may come from the inlet, flush pipe, pan connector or cistern seal.'],['Poor Flush','Weak flushing can relate to the cistern, pan design, water level or waste connection.'],['Renovation Upgrade','New bathrooms often need the toilet position checked before tiles and final fittings are completed.']],
    approachH2: 'How H2O Plumbers Handles Toilet Installations',
    approachH3: 'Fit the pan, seal it and test it properly',
    approachBullets: ['<strong>Check connections:</strong> The water feed, flush mechanism, pan connector and waste position need to suit the chosen toilet.','<strong>Secure the fitting:</strong> A toilet should sit level and stable without putting strain on the waste connection.','<strong>Test the flush:</strong> Final testing should check leaks, filling, flushing and how the pan clears.'],
    trustH2: 'A Correct Toilet Installation Prevents Messy Callbacks',
    trustH3: 'Small fitting errors can cause big irritation',
    trustBullets: ['<strong>Good sealing matters:</strong> Poor seals can create smells, moisture and stains around the toilet.','<strong>The pan must suit the space:</strong> Clearances, wall distance and pipe positions affect whether the installation feels neat.','<strong>Parts should be serviceable:</strong> Future maintenance is easier when valves and cistern parts are accessible.'],
  },
  'French Drains': {
    warningH2: 'When Surface Water Needs Better Direction',
    warningCopy: 'French drains help manage unwanted ground or surface water where gardens, paving and building edges keep staying wet. The design depends on levels, soil and where water can safely go.',
    cards: [['Pooling Water','Standing water after rain can damage lawns, make paving slippery and keep soil wet around buildings.'],['Wet Foundations','Water collecting near walls may need better ground drainage and careful attention to discharge points.'],['Soggy Gardens','Low garden sections can hold water when soil drains slowly or surrounding paving pushes runoff into the wrong place.'],['Stormwater Runoff','Driveways and paved areas may need planned water movement before rain creates repeat trouble.']],
    approachH2: 'How H2O Plumbers Plans French Drain Work',
    approachH3: 'Move water where it can drain safely',
    approachBullets: ['<strong>Read the levels:</strong> The fall of the ground decides whether water can move naturally away from the problem area.','<strong>Choose the route:</strong> The trench, stone, pipe and outlet need to work together, not just disappear underground.','<strong>Protect the property:</strong> Drainage work should avoid sending water toward foundations, neighbours or areas that cannot handle it.'],
    trustH2: 'French Drains Need Local Ground Sense',
    trustH3: 'Drainage depends on more than digging a trench',
    trustBullets: ['<strong>Soil affects performance:</strong> Sandy, clay-heavy and compacted ground can all behave differently after rain.','<strong>Outlet planning matters:</strong> Water needs somewhere suitable to go or the drain simply moves the problem.','<strong>Maintenance should be considered:</strong> Leaves, silt and roots can affect outdoor drainage over time.'],
  },
  'Pipe Relining': {
    warningH2: 'When Damaged Pipes May Need Repair Without Full Excavation',
    warningCopy: 'Pipe relining can be considered where a drain line is damaged but still suitable for an internal repair. The pipe condition must be understood before anyone promises a relining solution.',
    cards: [['Cracked Drains','Cracks can let roots or ground movement affect the pipe, especially in older underground drainage lines.'],['Root Entry','Roots often find small gaps in drain joints and then catch waste until blockages return.'],['Repeat Failures','If the same underground line keeps blocking, the issue may be pipe condition rather than normal use.'],['Difficult Access','Relining may be useful where excavation would be disruptive, but only if the line is suitable.']],
    approachH2: 'How H2O Plumbers Looks at Pipe Relining Options',
    approachH3: 'Confirm the pipe condition first',
    approachBullets: ['<strong>Identify the issue:</strong> Relining should only be considered after the likely pipe damage or repeat blockage cause is understood.','<strong>Check suitability:</strong> Not every pipe can be relined, especially if it has collapsed, shifted badly or lost proper shape.','<strong>Explain alternatives:</strong> Customers should know when relining, excavation or another repair option makes more sense.'],
    trustH2: 'Pipe Relining Should Be Recommended Carefully',
    trustH3: 'A useful option when the line allows it',
    trustBullets: ['<strong>Avoid overpromising:</strong> Relining is not a magic answer for every damaged drain.','<strong>Reduce disruption:</strong> Where suitable, it can limit digging around paving, gardens or finished areas.','<strong>Focus on lasting flow:</strong> The goal is a drain that works reliably, not just a short-term clearing result.'],
  },
  'Burst Pipe Repair': {
    warningH2: 'What to Do When a Pipe Bursts or Starts Leaking Fast',
    warningCopy: 'A burst pipe needs quick water control before damage spreads through walls, floors or ceilings. Once the leak is contained, the repair must address the actual pipe failure.',
    cards: [['Active Water Leak','Water escaping quickly from a pipe, wall or ceiling should be isolated as soon as it is safe to do so.'],['Wet Walls','Sudden damp patches or bubbling paint can mean a pipe has failed behind the surface.'],['Ceiling Drips','Water dripping from above may come from a bathroom, geyser line or supply pipe running overhead.'],['Damaged Pipework','Corrosion, movement, pressure changes or accidental damage can all lead to a pipe failure.']],
    approachH2: 'How H2O Plumbers Handles Burst Pipe Repairs',
    approachH3: 'Stop the water, then repair the fault',
    approachBullets: ['<strong>Isolate first:</strong> The immediate priority is controlling the water so damage does not spread further.','<strong>Find the failure:</strong> The plumber checks where the pipe has failed and whether nearby pipework also looks compromised.','<strong>Repair cleanly:</strong> The repair should suit the pipe type, location and pressure demands of the property.'],
    trustH2: 'Burst Pipe Repairs Need Fast, Clear Decisions',
    trustH3: 'Water damage moves quickly',
    trustBullets: ['<strong>Reduce damage:</strong> Quick isolation protects cupboards, flooring, ceilings and electrical areas.','<strong>Use suitable materials:</strong> The repair method needs to match the existing pipe and water pressure.','<strong>Check nearby risks:</strong> One burst can reveal corrosion, movement or stress in the surrounding pipework.'],
  },
  'Commercial Plumbing': {
    warningH2: 'Plumbing Problems That Disrupt Business Premises',
    warningCopy: 'Commercial plumbing needs clear, practical handling because faults can affect staff, customers, tenants and daily operations. The work often needs to be planned around access, hygiene and timing.',
    cards: [['Staff Bathrooms','Toilet, basin and drainage faults can quickly affect staff comfort and customer-facing spaces.'],['Kitchen Areas','Grease, traps, sinks and hot water points need reliable plumbing in restaurants, offices and small businesses.'],['Tenant Callouts','Managed properties need clear fault notes so owners, tenants and managers understand the next step.'],['After-Hours Risk','A small leak after trading hours can become expensive if isolation and repair planning are poor.']],
    approachH2: 'How H2O Plumbers Supports Local Businesses',
    approachH3: 'Clear plumbing help with less disruption',
    approachBullets: ['<strong>Understand the site:</strong> Business plumbing often involves staff areas, public toilets, kitchens, tenants or restricted access points.','<strong>Plan around use:</strong> The timing and repair method should reduce unnecessary disruption where practical.','<strong>Communicate clearly:</strong> Managers need to know what failed, what was repaired and whether follow-up work is needed.'],
    trustH2: 'Commercial Plumbing Needs Practical Site Awareness',
    trustH3: 'Every business space works differently',
    trustBullets: ['<strong>Keep access sensible:</strong> Work should be planned around customers, staff, parking, keys and operating hours.','<strong>Think about hygiene:</strong> Bathrooms, kitchens and waste lines need clean, careful handling.','<strong>Record the issue:</strong> Clear notes help owners and managers make maintenance decisions later.'],
  },
  'Water Pressure Problems': {
    warningH2: 'When Water Pressure Feels Too Weak or Too Strong',
    warningCopy: 'Water pressure problems can affect showers, taps, geysers, irrigation and appliance connections. The cause may sit at one fixture, inside the property pipework or at the supply point.',
    cards: [['Weak Shower Flow','Poor shower pressure can come from a mixer, blocked strainer, pipe restriction, valve issue or wider supply problem.'],['Uneven Pressure','Pressure that changes between fixtures can help show whether the issue is local or affecting the whole property.'],['Noisy Pipes','Banging, humming or sudden movement may point to pressure changes, loose pipework or valve behaviour.'],['High Pressure Risk','Excess pressure can stress fittings, geyser valves, flexible connectors and older pipework.']],
    approachH2: 'How H2O Plumbers Checks Water Pressure Problems',
    approachH3: 'Measure the pressure before guessing',
    approachBullets: ['<strong>Compare fixtures:</strong> Checking several taps helps separate a single blocked outlet from a wider pressure issue.','<strong>Test the supply:</strong> A pressure reading can show whether the property is dealing with low supply or excess pressure.','<strong>Check control valves:</strong> Stop taps, pressure valves and strainers can all affect flow before pipe replacement is considered.'],
    trustH2: 'Pressure Problems Need Proper Testing',
    trustH3: 'The symptom is not always the source',
    trustBullets: ['<strong>Avoid unnecessary changes:</strong> Replacing fittings will not help if the real issue sits at a valve or supply point.','<strong>Protect plumbing parts:</strong> High pressure can shorten the life of connectors, geyser components and taps.','<strong>Explain the pattern:</strong> Customers should understand whether the problem affects one room, one fixture or the whole property.'],
  },
};

for (const [name, slug, short, keyphrase, b1, b2, icon] of extraServices) {
  const sp = specifics[name];
  services.push({
    name, slug, short, keyphrase, bubble: [b1, b2], imageSlug: slug.replace('-garden-route',''), icon,
    h1: `${name} in the Garden Route`,
    intro: `${name} needs practical plumbing judgement, not guesswork or rushed patching. H2O Plumbers helps homes and businesses across George, Mossel Bay, Knysna, Oudtshoorn and the wider Garden Route with clear, careful ${short.toLowerCase()} support.`,
    warningH2: sp.warningH2, warningCopy: sp.warningCopy, cards: sp.cards,
    approachH2: sp.approachH2, approachH3: sp.approachH3, approachBullets: sp.approachBullets,
    trustH2: sp.trustH2, trustH3: sp.trustH3, trustBullets: sp.trustBullets,
    stories: localStories(name, short), related: relatedFor(name),
    authorityH2: authorityHeading(name),
    authorityCopy: authorityCopy(name, short),
    faqs: faqFor(name, short),
  });
}

function localStories(name, short) {
  const lower = short.toLowerCase();
  return [
    [`${name} Planning Around Heather Park, George`, `A property around Heather Park can need ${lower} when a visible fault starts affecting daily use. The plumber would first check the exact symptom, look at nearby fittings and explain whether the work is a direct repair, a preparation step or part of a wider plumbing plan.`],
    [`${name} Support Near Diaz Beach, Mossel Bay`, `Homes and holiday properties near Diaz Beach often need plumbing work handled neatly because spaces are used by owners, guests and cleaners. A practical ${lower} visit focuses on access, water control and a clear handover so the property can return to normal use.`],
    [`${name} Work Close to Knysna Central`, `A business or rental near Knysna Central may need ${lower} completed without leaving the area feeling like a building site. The work should be planned around the room layout, existing services and what the customer needs to know before approving the next step.`],
    [`${name} Check in Oudtshoorn Residential Areas`, `In Oudtshoorn homes, plumbing materials, pressure and layout can vary from one property to the next. A sensible ${lower} callout looks at the immediate fault, checks the surrounding pipework where practical and explains whether further work is likely.`],
  ];
}

function relatedFor(name) {
  const map = {
    'Core Drilling': ['Bathroom Renovation','General Plumbing','Pipe Relining','Commercial Plumbing'],
    'Drain Hydro Jetting': ['Blocked Drains','Pipe Relining','French Drains','Commercial Plumbing'],
    'Bathroom Renovation': ['General Plumbing','Toilet Installations','Core Drilling','Leak Detection'],
    'Toilet Installations': ['General Plumbing','Bathroom Renovation','Blocked Drains','Leak Detection'],
    'French Drains': ['Blocked Drains','Drain Hydro Jetting','Pipe Relining','General Plumbing'],
    'Pipe Relining': ['Blocked Drains','Drain Hydro Jetting','Leak Detection','Core Drilling'],
    'Burst Pipe Repair': ['Leak Detection','General Plumbing','Water Pressure Problems','Bathroom Renovation'],
    'Commercial Plumbing': ['General Plumbing','Blocked Drains','Drain Hydro Jetting','Leak Detection'],
    'Water Pressure Problems': ['Leak Detection','Burst Pipe Repair','General Plumbing','Commercial Plumbing'],
  };
  return map[name] || ['General Plumbing','Leak Detection','Blocked Drains','Drain Hydro Jetting'];
}

function authorityHeading(name) {
  if (name === 'French Drains') return 'Stormwater, Groundwater and Responsible Drainage Planning';
  if (name === 'Commercial Plumbing') return 'Keeping Business Plumbing Practical and Accountable';
  if (name === 'Water Pressure Problems') return 'When Pressure Issues May Involve Supply Conditions';
  return `When ${name} Needs a Wider Plumbing Decision`;
}

function authorityCopy(name, short) {
  return `H2O Plumbers can assist with ${short.toLowerCase()} on private properties across the Garden Route. If the issue connects to municipal water, sewer or stormwater infrastructure, customers may need to report that part to the relevant authority. For regional municipal information, the <a href="https://www.gardenroute.gov.za/" target="_blank" rel="noopener">Garden Route District Municipality</a> is a useful public reference.`;
}

function faqFor(name, short) {
  const lower = short.toLowerCase();
  return [
    [`How do I know if I need ${lower}?`, `The best clue is the pattern of the problem. If the same fault keeps returning, affects more than one fixture or creates visible water, smells, pressure changes or access issues, it is worth asking H2O Plumbers to check it properly.`],
    [`Can this be handled without damaging finishes?`, `That depends on where the fault sits and how much access is available. The aim is always to inspect sensibly first, explain the likely repair route and avoid unnecessary damage where a cleaner approach is possible.`],
    [`Do homes and businesses need different plumbing planning?`, `Often, yes. Business premises may have heavier use, hygiene requirements, tenant communication or access limits. Homes usually focus more on disruption, finishes and daily routines. The plumbing work should suit the property type.`],
    [`What should I tell the plumber before booking?`, `Share the exact symptom, when it started, which rooms or fixtures are affected and whether anything has already been tried. Photos can also help the plumber understand access, visible fittings and urgency before arriving.`],
    [`Does H2O Plumbers cover ${lower} across the Garden Route?`, `H2O Plumbers works across the Garden Route, including George, Mossel Bay, Knysna, Oudtshoorn and nearby towns. Availability depends on the job type, timing and how urgent the plumbing issue is.`],
  ];
}

const mediaManifest = readJson(mediaManifestPath);
const sourcePage = readJson(sourcePagePath);
const sourceData = JSON.parse(sourcePage.meta._elementor_data);

function walk(el, fn) {
  fn(el);
  (el.elements || []).forEach(child => walk(child, fn));
}

function find(id, els) {
  for (const e of els) {
    if (e.id === id) return e;
    const f = find(id, e.elements || []);
    if (f) return f;
  }
}

function htmlP(text) { return `<p>${text}</p>`; }
function linkFor(name) {
  const s = services.find(x => x.name === name);
  return s ? `/services/${s.slug}/` : '/services/';
}

function imageObj(media, size = 'full') {
  return { id: media.id, url: media.url, alt: media.alt, source: 'library', size };
}

function setImage(el, media) {
  if (!el || !el.settings) return;
  el.settings.image = imageObj(media);
}

function setBackground(el, media) {
  if (!el || !el.settings) return;
  el.settings.background_image = imageObj(media);
  el.settings.background_video_fallback = imageObj(media);
  el.settings.background_video_link = '';
  el.settings.background_position = 'center center';
  el.settings.background_size = 'cover';
}

function applyService(data, s, media) {
  const page = JSON.parse(JSON.stringify(data));
  setBackground(find('8c893f2', page), media.background);
  setBackground(find('26c91ca', page), media.background);
  setBackground(find('a1fe463', page), media.background);
  const hero = find('cd5afd7', page); hero.settings.title = s.h1; hero.settings._title = `Service Hero H1 - ${s.name}`;
  find('a028392', page).settings.editor = htmlP(s.intro);
  find('3d49090', page).settings.icon_list = [{ text: s.bubble[0], _id: 'h1' }];
  find('d686603', page).settings.icon_list = [{ text: s.bubble[1], _id: 'h2' }];
  find('2390ad1', page).settings.title = s.warningH2;
  find('faacfd2', page).settings.editor = htmlP(s.warningCopy);
  ['05608d4','77587c1','b8496da','959054a'].forEach((id,i)=>{ const box=find(id,page); box.settings.title_text=s.cards[i][0]; box.settings.description_text=s.cards[i][1]; box.settings._title=`Service Icon Box - ${s.cards[i][0]}`; });
  find('aa059ce', page).settings.title = s.approachH2;
  find('ba594ed', page).settings.title = s.approachH3;
  find('1a6d842', page).settings.icon_list = s.approachBullets.map((text,i)=>({text,_id:`a${i+1}`}));
  setImage(find('63c3393', page), media.square);
  find('cd61791', page).settings.title = s.trustH2;
  find('7dce8ee', page).settings.title = s.trustH3;
  find('a73192f', page).settings.icon_list = s.trustBullets.map((text,i)=>({text,_id:`t${i+1}`}));
  setImage(find('9204026', page), media.square);
  find('89cee13', page).settings.title = 'LOCAL JOBS';
  find('e0d87c0', page).settings.title = `${s.name} Work Across Garden Route Properties`;
  find('2f37425', page).settings.editor = htmlP(`These local work examples show how ${s.short.toLowerCase()} can present differently from one Garden Route property to the next. Each situation needs a practical check before the correct repair route is chosen.`);
  ['b570634','050dd12','bcd0631','a5aadff'].forEach((id,i)=>{ const st=s.stories[i]; const e=find(id,page); e.settings.editor = `<h3>${st[0]}</h3><p>${st[1]}</p>`; e.settings._title = `${s.name} Local Story - ${st[0]}`; });
  find('3ca9b87', page).settings.title = `Related Plumbing Services for ${s.name}`;
  find('4e6cdc8', page).settings.editor = htmlP(`${s.name} can connect to other plumbing needs. These related pages help customers understand the next most relevant options and give the site a cleaner internal linking structure.`);
  ['660de7c','b0f4bea','f9504d0','9b3ce5a'].forEach((id,i)=>{ const rel=s.related[i]; const rs=services.find(x=>x.name===rel); const box=find(id,page); box.settings.title_text=rel; box.settings.description_text=relatedDescription(s.name, rel); box.settings._title=`Related Service - ${rel}`; if(rs) box.settings.link={url:linkFor(rel),is_external:'',nofollow:'',custom_attributes:''}; });
  find('cdc933f', page).settings.editor = `<p>Explore the full <a href="/services/">H2O Plumbers services</a>, check the <a href="/service-areas/">Garden Route service areas</a>, or return to the <a href="/">H2O Plumbers home page</a> for general plumbing help.</p>`;
  find('b10d8c4', page).settings.title = s.authorityH2;
  find('3eb8050', page).settings.editor = htmlP(s.authorityCopy);
  find('bfe2683', page).settings.title = `${s.name.toUpperCase()} FAQS`;
  find('3501291', page).settings.title = `${s.name} Questions People Ask Before Booking`;
  find('f0e1fa0', page).settings.editor = htmlP(`Useful answers for Garden Route customers who want to understand ${s.short.toLowerCase()} before they book a plumber.`);
  const acc = find('9b703bb', page);
  acc.settings.items = s.faqs.map((f,i)=>({ _id: i < 3 ? `f${i+1}` : ['7d684a7','899ef6f'][i-3], item_title: f[0] }));
  ['77c725d','52b33c5','4b3d608','8de3531','09c3709'].forEach((id,i)=>{ find(id,page).settings.editor=htmlP(s.faqs[i][1]); });
  walk({elements:page}, el => {
    if (el.settings?._title) el.settings._title = el.settings._title.replace(/Blocked Drain(s)?/gi, s.name);
  });
  return page;
}

function relatedDescription(current, rel) {
  const text = {
    'General Plumbing': 'Everyday taps, toilets, traps, valves and visible pipework that often connect to wider plumbing concerns.',
    'Leak Detection': 'Useful when damp, pressure changes or unexplained water use suggest a hidden plumbing fault.',
    'Blocked Drains': 'Practical help for slow drainage, bad smells, outside gullies and repeat blockages.',
    'Drain Hydro Jetting': 'A stronger cleaning option for suitable drains affected by grease, sludge, roots or recurring build-up.',
    'Pipe Relining': 'Considered when damaged drain lines may be suitable for repair without full excavation.',
    'Bathroom Renovation': 'Plumbing support for showers, basins, toilets and drainage during bathroom upgrades.',
    'Toilet Installations': 'Correct fitting, sealing and testing for toilet replacements and renovation layouts.',
    'Burst Pipe Repair': 'Fast water control and practical repair when a pipe has failed or started leaking badly.',
    'Water Pressure Problems': 'Checks for weak flow, pressure changes, noisy pipes and pressure valve concerns.',
    'Commercial Plumbing': 'Plumbing support for shops, offices, rentals, kitchens and other business premises.',
    'Core Drilling': 'Controlled openings for pipe routes, drain access and renovation plumbing points.',
    'French Drains': 'Outdoor drainage planning for pooling water, soggy ground and stormwater movement.',
  };
  return text[rel] || `Related plumbing support that can help when ${current.toLowerCase()} is part of a wider property issue.`;
}

function seoFor(s) {
  return {
    focus_keyphrase: s.keyphrase,
    seo_title: `${s.name} Garden Route | H2O Plumbers`,
    meta_description: `${s.name} across the Garden Route by H2O Plumbers. Practical help for homes and businesses in George, Mossel Bay, Knysna, Oudtshoorn and nearby towns.`
  };
}

async function main() {
  const me = await wp('/wp-json/wp/v2/users/me?context=edit');
  if (me.slug !== 'barry') throw new Error('Auth user is not barry');

  const uploaded = {};
  for (const s of services) {
    const m = mediaManifest[s.imageSlug];
    uploaded[s.imageSlug] = {
      square: await uploadMedia(m.square, `H2O Plumbers ${s.name} Garden Route service image`, `H2O Plumbers ${s.short.toLowerCase()} service work in the Garden Route`),
      background: await uploadMedia(m.background, `H2O Plumbers ${s.name} Garden Route background image`, `H2O Plumbers ${s.short.toLowerCase()} help for Garden Route homes and businesses`),
    };
  }
  fs.writeFileSync(path.join(workRoot, 'h2o-service-pages-uploaded-media.json'), JSON.stringify(uploaded,null,2));

  const existingPages = await wp('/wp-json/wp/v2/pages?per_page=100&context=edit');
  const bySlug = Object.fromEntries(existingPages.map(p => [p.slug, p]));
  const created = [];
  for (const s of services) {
    const media = uploaded[s.imageSlug];
    const elementor = JSON.stringify(applyService(sourceData, s, media));
    const payload = {
      title: `${s.name} Garden Route`,
      slug: s.slug,
      parent: 6217,
      status: 'publish',
      meta: {
        _elementor_edit_mode: 'builder',
        _elementor_template_type: 'wp-page',
        _elementor_data: elementor,
        _elementor_page_settings: sourcePage.meta._elementor_page_settings || {},
      },
    };
    let page;
    if (bySlug[s.slug]) {
      page = await wp(`/wp-json/wp/v2/pages/${bySlug[s.slug].id}`, { method: 'POST', body: JSON.stringify(payload) });
    } else {
      page = await wp('/wp-json/wp/v2/pages', { method: 'POST', body: JSON.stringify(payload) });
    }
    created.push({ id: page.id, slug: page.slug, title: page.title?.rendered || s.name, seo: seoFor(s) });
  }
  fs.writeFileSync(path.join(workRoot, 'h2o-service-pages-created.json'), JSON.stringify(created,null,2));

  const yoastItems = created.map(p => ({ id: p.id, ...p.seo }));
  await wp('/wp-json/yoast/v1/bulk_editor/update_search', { method: 'POST', body: JSON.stringify({ items: yoastItems }) });
  console.log(JSON.stringify({ uploaded: Object.keys(uploaded).length * 2, pages: created }, null, 2));
}

main().catch(err => { console.error(err.stack || err.message); process.exit(1); });
