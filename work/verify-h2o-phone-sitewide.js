const site = 'https://dev1.mynewwebsite.co.za';
const username = 'barry';
const password = process.env.BARRY_APP_PASS;
if (!password) throw new Error('Missing BARRY_APP_PASS');
const auth = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`;

async function wp(endpoint, options = {}) {
  const res = await fetch(`${site}${endpoint}`, {
    ...options,
    headers: { Authorization: auth, 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  const text = await res.text();
  let body = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  if (!res.ok) throw new Error(`${options.method || 'GET'} ${endpoint} failed ${res.status}: ${typeof body === 'string' ? body.slice(0, 300) : JSON.stringify(body).slice(0, 300)}`);
  return body;
}

async function fetchAll(endpoint) {
  const out = [];
  for (let page = 1; page <= 20; page++) {
    const batch = await wp(`${endpoint}${endpoint.includes('?') ? '&' : '?'}per_page=100&page=${page}&context=edit`);
    if (!Array.isArray(batch) || !batch.length) break;
    out.push(...batch);
    if (batch.length < 100) break;
  }
  return out;
}

function walk(el, fn) {
  fn(el);
  (el.elements || []).forEach(child => walk(child, fn));
}

function scanPost(post, type) {
  const raw = post.meta?._elementor_data || '';
  const issues = [];
  if (/\(?405\)?[\s-]*768[\s-]*2626|405-768-2626|4057682626|\(?704\)?[\s-]*741[\s-]*1332/.test(raw)) issues.push('old-phone-found');
  let telBad = 0;
  let telGood = 0;
  let displayGood = 0;
  try {
    const data = JSON.parse(raw);
    data.forEach(section => walk(section, node => {
      const settings = node.settings || {};
      for (const value of Object.values(settings)) {
        const text = typeof value === 'string' ? value : JSON.stringify(value || '');
        if (/tel:0726514447/.test(text)) telGood++;
        if (/tel:(?!0726514447)/.test(text)) telBad++;
        if (/072 651 4447/.test(text)) displayGood++;
      }
    }));
  } catch {}
  if (telBad) issues.push(`bad-tel-targets:${telBad}`);
  return {
    id: post.id,
    type,
    title: post.title?.raw || post.title?.rendered || '',
    telGood,
    displayGood,
    issues,
  };
}

async function main() {
  const collections = [
    ['pages', '/wp-json/wp/v2/pages'],
    ['posts', '/wp-json/wp/v2/posts'],
    ['elementor_library', '/wp-json/wp/v2/elementor_library'],
  ];
  const scanned = [];
  for (const [type, endpoint] of collections) {
    let items = [];
    try { items = await fetchAll(endpoint); } catch (err) {
      scanned.push({ type, skipped: true, reason: err.message.slice(0, 160) });
      continue;
    }
    for (const item of items) {
      if (item.meta?._elementor_data) scanned.push(scanPost(item, type));
    }
  }
  const issueItems = scanned.filter(item => item.issues?.length);
  const totals = scanned.reduce((acc, item) => {
    acc.telGood += item.telGood || 0;
    acc.displayGood += item.displayGood || 0;
    return acc;
  }, { telGood: 0, displayGood: 0 });
  console.log(JSON.stringify({ scanned: scanned.length, issueItems, totals }, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
