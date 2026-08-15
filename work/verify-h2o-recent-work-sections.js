const site = 'https://dev1.mynewwebsite.co.za';
const username = 'barry';
const password = process.env.BARRY_APP_PASS;
if (!password) throw new Error('Missing BARRY_APP_PASS');
const auth = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`;
const ids = [6077,6654,6655,6656,6657,6658,6659,6660,6661,6662,6663,6664,6710];

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

function walk(el, fn) {
  fn(el);
  (el.elements || []).forEach(child => walk(child, fn));
}

function collect(section, type) {
  const out = [];
  walk(section, node => {
    if (node.widgetType === type) out.push(node);
  });
  return out;
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

async function main() {
  const results = [];
  for (const id of ids) {
    const page = await wp(`/wp-json/wp/v2/pages/${id}?context=edit`);
    const data = JSON.parse(page.meta._elementor_data);
    const section = data.find(sec => /RECENT WORK/i.test(sectionText(sec)));
    const text = section ? sectionText(section) : '';
    const headings = section ? collect(section, 'heading').map(h => h.settings?.title || h.settings?.ekit_title || '') : [];
    const editors = section ? collect(section, 'text-editor').map(t => t.settings?.editor || t.settings?.text || '') : [];
    results.push({
      id,
      title: page.title?.raw || page.title?.rendered || '',
      found: !!section,
      eyebrow: headings[0] || '',
      h2: headings[1] || '',
      storyBlocks: Math.max(0, editors.length - 1),
      oldScenarioWording: /scenario|not fake|hypothetical|representative example/i.test(text),
      internalFacingIntro: /SEO|crawler|LLM|examples help show|local relevance|search/i.test(editors[0] || ''),
      hasCompletedLanguage: /completed|repaired|cleared|checked|installed|traced|replaced/i.test(text),
    });
  }
  console.log(JSON.stringify(results, null, 2));
  if (results.some(r => !r.found || r.oldScenarioWording || r.internalFacingIntro || r.storyBlocks < 4 || !r.hasCompletedLanguage)) process.exitCode = 1;
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
