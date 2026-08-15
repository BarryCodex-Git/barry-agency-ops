const fs = require('fs');
const path = require('path');

const site = 'https://dev1.mynewwebsite.co.za';
const username = 'barry';
const password = process.env.BARRY_APP_PASS;
if (!password) throw new Error('Missing BARRY_APP_PASS');
const auth = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`;
const workRoot = 'C:/Users/USER/Documents/Codex/Barry/work';

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

const services = [
  ['General Plumbing','general-plumbing','/services/general-plumbing-garden-route/','Everyday taps, toilets, traps, valves and visible pipe repairs for homes, rentals and business properties across the Garden Route.'],
  ['Leak Detection','leak-detection','/services/leak-detection-garden-route/','Practical checks for hidden leaks, damp patches, pressure drops and unexplained water use before damage spreads.'],
  ['Blocked Drains','blocked-drains','/services/blocked-drains-garden-route/','Help for slow drains, bad smells, overflowing gullies and repeat blockages that need proper clearing.'],
  ['Core Drilling','core-drilling','/services/core-drilling-garden-route/','Clean access openings for plumbing pipe routes, drainage changes, renovations and commercial service work.'],
  ['Drain Hydro Jetting','drain-hydro-jetting','/services/drain-hydro-jetting-garden-route/','High-pressure drain cleaning for suitable lines affected by stubborn grease, sludge, roots or recurring build-up.'],
  ['Bathroom Renovation','bathroom-renovation','/services/bathroom-renovation-garden-route/','Plumbing support for showers, basins, toilets and drainage before new bathroom finishes go in.'],
  ['Toilet Installations','toilet-installations','/services/toilet-installations-garden-route/','Secure toilet fitting, water connection, sealing and testing for replacements and renovation layouts.'],
  ['French Drains','french-drains','/services/french-drains-garden-route/','Outdoor drainage planning for pooling water, soggy ground and stormwater movement around properties.'],
  ['Pipe Relining','pipe-relining','/services/pipe-relining-garden-route/','A repair option for suitable damaged drain lines where full excavation may not be the best first choice.'],
  ['Burst Pipe Repair','burst-pipe-repair','/services/burst-pipe-repair-garden-route/','Fast water control and practical pipe repair when a burst or active leak needs urgent attention.'],
  ['Commercial Plumbing','commercial-plumbing','/services/commercial-plumbing-garden-route/','Plumbing help for offices, shops, rental properties, kitchens and business bathrooms that need clear communication.'],
  ['Water Pressure Problems','water-pressure-problems','/services/water-pressure-problems-garden-route/','Checks for weak flow, changing pressure, noisy pipes and pressure valve issues in homes and businesses.'],
];

const ids = [
  ['76a6001','0d7fdcc','2b5782a','628c228'],
  ['ef1b9bd','a97eb9f','fa787d7','ca08deb'],
  ['4dc0823','16b393a','1b0fce8','651e4c3'],
  ['e4135fd','28e3e7a','e72db25','eb092d5'],
  ['35a0be0','18b4101','b1f4573','02dd18c'],
  ['f792308','d02fa3b','26dffda','199c939'],
  ['a710002','a710003','a710004','a710005'],
  ['a720002','a720003','a720004','a720005'],
  ['a730002','a730003','a730004','a730005'],
  ['a740002','a740003','a740004','a740005'],
];

function clone(obj) { return JSON.parse(JSON.stringify(obj)); }
function find(id, els) {
  for (const e of els) {
    if (e.id === id) return e;
    const f = find(id, e.elements || []);
    if (f) return f;
  }
}
function newId(seed, n) { return (seed + String(n)).slice(0,7); }
function imageObj(media, name) {
  return { id: media.id, url: media.url, alt: `H2O Plumbers ${name.toLowerCase()} service in the Garden Route`, source: 'library', size: 'full' };
}

async function main() {
  const page = await wp('/wp-json/wp/v2/pages/6217?context=edit');
  const data = JSON.parse(page.meta._elementor_data);
  const media = JSON.parse(fs.readFileSync(path.join(workRoot, 'h2o-service-pages-uploaded-media.json'), 'utf8'));
  const grid = find('677d82d', data);
  if (!grid) throw new Error('Services hub card grid not found');
  while (grid.elements.length < 12) {
    const base = clone(grid.elements[grid.elements.length - 1]);
    const idx = grid.elements.length + 1;
    const prefix = idx === 11 ? 'a750' : 'a760';
    const oldIds = [];
    (function collect(e){ oldIds.push(e.id); (e.elements||[]).forEach(collect); })(base);
    oldIds.forEach((old, i) => {
      const replace = (e) => { if (e.id === old) e.id = `${prefix}${String(i+1).padStart(3,'0')}`.slice(0,7); (e.elements||[]).forEach(replace); };
      replace(base);
    });
    grid.elements.push(base);
    ids.push([`${prefix}002`.slice(0,7),`${prefix}003`.slice(0,7),`${prefix}004`.slice(0,7),`${prefix}005`.slice(0,7)]);
  }
  for (let i=0; i<services.length; i++) {
    const [name, imageSlug, url, desc] = services[i];
    const [imageId, titleId, copyId, buttonId] = ids[i];
    const img = find(imageId, data);
    if (img) {
      img.settings.image = imageObj(media[imageSlug].square, name);
      img.settings.link = { url, is_external: '', nofollow: '', custom_attributes: '' };
      img.settings._title = `Services Hub Card ${String(i+1).padStart(2,'0')} Image`;
    }
    const title = find(titleId, data);
    if (title) { title.settings.title = name; title.settings._title = `Services Hub Card ${String(i+1).padStart(2,'0')} Title`; }
    const copyEl = find(copyId, data);
    if (copyEl) { copyEl.settings.editor = `<p>${desc}</p>`; copyEl.settings._title = `Services Hub Card ${String(i+1).padStart(2,'0')} Copy`; }
    const btn = find(buttonId, data);
    if (btn) { btn.settings.link = { url, is_external: '', nofollow: '', custom_attributes: '' }; btn.settings._title = `Services Hub Card ${String(i+1).padStart(2,'0')} CTA`; }
  }
  await wp('/wp-json/wp/v2/pages/6217', {
    method: 'POST',
    body: JSON.stringify({ meta: { _elementor_data: JSON.stringify(data) } }),
  });
  console.log(JSON.stringify({ updated: 'services hub', cards: services.length }, null, 2));
}

main().catch(err => { console.error(err.stack || err.message); process.exit(1); });
