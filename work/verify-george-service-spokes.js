const fs = require('fs');
const path = require('path');

const site = 'https://dev1.mynewwebsite.co.za';
const username = 'barry';
const password = process.env.BARRY_APP_PASS;
if (!password) throw new Error('Missing BARRY_APP_PASS');
const auth = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`;
const georgeHubId = 6710;
const created = JSON.parse(fs.readFileSync(path.join('C:/Users/USER/Documents/Codex/Barry/work', 'george-service-spokes-created.json'), 'utf8'));

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

function collectText(data) {
  let out = '';
  walk({ elements: data }, (node) => {
    if (!node.settings) return;
    for (const value of Object.values(node.settings)) {
      if (typeof value === 'string') out += ` ${value}`;
    }
  });
  return out;
}

function iconBoxes(section) {
  const out = [];
  walk(section, (node) => { if (node.widgetType === 'icon-box') out.push(node); });
  return out;
}

async function main() {
  const report = [];
  for (const item of created) {
    const page = await wp(`/wp-json/wp/v2/pages/${item.id}?context=edit`);
    const data = JSON.parse(page.meta._elementor_data);
    const text = collectText(data);
    const publicRes = await fetch(`${site}${item.link}`);
    const badGardenRoute = /Garden Route/.test(text);
    const georgeFocus = text.includes('George');
    const relatedLinks = iconBoxes(data[5]).map((box) => box.settings?.link?.url || '').filter(Boolean);
    report.push({
      name: item.name,
      id: item.id,
      status: page.status,
      parent: page.parent,
      publicStatus: publicRes.status,
      hasGeorge: georgeFocus,
      hasGardenRouteText: badGardenRoute,
      relatedLinksAreGeorge: relatedLinks.every((url) => url.startsWith('/service-areas/george/')),
      relatedLinkCount: relatedLinks.length,
    });
  }

  const hub = await wp(`/wp-json/wp/v2/pages/${georgeHubId}?context=edit`);
  const hubData = JSON.parse(hub.meta._elementor_data);
  const hubServiceLinks = iconBoxes(hubData[5]).map((box) => ({ title: box.settings?.title_text, url: box.settings?.link?.url || '' }));
  const hubLinksValid = created.every((item) => hubServiceLinks.some((link) => link.url === item.link));

  console.log(JSON.stringify({ pages: report, hubLinksValid, hubServiceLinks }, null, 2));
  const failures = report.filter((item) => item.parent !== georgeHubId || item.publicStatus !== 200 || !item.hasGeorge || !item.relatedLinksAreGeorge || item.relatedLinkCount < 4);
  if (failures.length || !hubLinksValid) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err.stack || err.message);
  process.exit(1);
});
