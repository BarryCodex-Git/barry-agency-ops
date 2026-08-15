const site = 'https://dev1.mynewwebsite.co.za';
const username = 'barry';
const password = process.env.BARRY_APP_PASS;
if (!password) throw new Error('Missing BARRY_APP_PASS');
const auth = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`;
const id = 6732;

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

function walk(el, fn) {
  fn(el);
  (el.elements || []).forEach(child => walk(child, fn));
}

async function main() {
  const page = await wp(`/wp-json/wp/v2/pages/${id}?context=edit`);
  const raw = page.meta._elementor_data;
  const data = JSON.parse(raw);
  const headings = [];
  const iconLinks = [];
  const buttons = [];
  walk({ elements: data }, node => {
    if (node.widgetType === 'heading') headings.push(node.settings?.title || node.settings?.ekit_title || '');
    if (node.widgetType === 'icon-box') iconLinks.push(node.settings?.link?.url || '');
    if (node.widgetType === 'button') buttons.push({ text: node.settings?.text || node.settings?.button_text || '', url: node.settings?.link?.url || node.settings?.button_link?.url || '' });
  });
  const result = {
    id: page.id,
    link: page.link,
    parent: page.parent,
    status: page.status,
    title: page.title.raw,
    correctH1: raw.includes('Professional Plumber In Heather Park'),
    hasRecentWork: raw.includes('Recent Plumbing Work Completed in Heather Park'),
    hasHeatherParkServices: raw.includes('Plumbing Services Available in Heather Park'),
    hasServicePlaceholders: raw.includes('#blocked-drains-heather-park-spoke') && raw.includes('#general-plumbing-heather-park-spoke'),
    oldGardenRouteServiceLinks: /\/services\/[^"#]+garden-route/.test(raw),
    jpgReferences: (raw.match(/\.jpg/gi) || []).length,
    supportImages: (raw.match(/heather-park-(hero|support-square|square)\.webp/g) || []).length,
    oldScenarioWords: /scenario|hypothetical|not fake|representative example/i.test(raw),
    badPhone: /405-768|768 2626|\(405\)/.test(raw),
    ctaButtonsMissingLinks: buttons.filter(b => /WhatsApp Us|072 651 4447/.test(b.text) && !b.url),
    headings: headings.slice(0, 18),
  };
  console.log(JSON.stringify(result, null, 2));
  if (!result.correctH1 || !result.hasRecentWork || !result.hasHeatherParkServices || result.oldGardenRouteServiceLinks || result.jpgReferences || result.badPhone || result.ctaButtonsMissingLinks.length) process.exitCode = 1;
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
