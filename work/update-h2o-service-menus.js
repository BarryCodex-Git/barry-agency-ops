const site = 'https://dev1.mynewwebsite.co.za';
const username = 'barry';
const password = process.env.BARRY_APP_PASS;
if (!password) throw new Error('Missing BARRY_APP_PASS');
const auth = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`;

const services = [
  ['General Plumbing','/services/general-plumbing-garden-route/'],
  ['Leak Detection','/services/leak-detection-garden-route/'],
  ['Blocked Drains','/services/blocked-drains-garden-route/'],
  ['Core Drilling','/services/core-drilling-garden-route/'],
  ['Drain Hydro Jetting','/services/drain-hydro-jetting-garden-route/'],
  ['Bathroom Renovation','/services/bathroom-renovation-garden-route/'],
  ['Toilet Installations','/services/toilet-installations-garden-route/'],
  ['French Drains','/services/french-drains-garden-route/'],
  ['Pipe Relining','/services/pipe-relining-garden-route/'],
  ['Burst Pipe Repair','/services/burst-pipe-repair-garden-route/'],
  ['Commercial Plumbing','/services/commercial-plumbing-garden-route/'],
  ['Water Pressure Problems','/services/water-pressure-problems-garden-route/'],
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

function titleOf(item) { return item.title?.raw || item.title?.rendered || ''; }

async function upsert(menuId, parentId) {
  const items = await wp(`/wp-json/wp/v2/menu-items?menus=${menuId}&per_page=100&context=edit`);
  const existing = new Map(items.filter(i => titleOf(i)).map(i => [titleOf(i), i]));
  let count = 0;
  for (const [title, url] of services) {
    const found = existing.get(title);
    const payload = { title, url, menus: menuId, parent: parentId || 0, status: 'publish' };
    if (found) await wp(`/wp-json/wp/v2/menu-items/${found.id}`, { method: 'POST', body: JSON.stringify(payload) });
    else await wp('/wp-json/wp/v2/menu-items', { method: 'POST', body: JSON.stringify({ ...payload, type: 'custom' }) });
    count++;
  }
  return count;
}

async function main() {
  const mainCount = await upsert(13, 6481);
  const footerCount = await upsert(9, 0);
  console.log(JSON.stringify({ mainMenuServices: mainCount, servicesMenuItems: footerCount }, null, 2));
}

main().catch(err => { console.error(err.stack || err.message); process.exit(1); });
