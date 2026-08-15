const site = 'https://dev1.mynewwebsite.co.za';
const username = 'barry';
const password = process.env.BARRY_APP_PASS;
if (!password) throw new Error('Missing BARRY_APP_PASS');
const auth = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`;
const pageId = 6710;
const replacement = {
  id: 6711,
  url: 'https://dev1.mynewwebsite.co.za/wp-content/uploads/2026/07/h2o-plumbers-plumber-george-location-hub-background-2.webp',
};

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
  const page = await wp(`/wp-json/wp/v2/pages/${pageId}?context=edit`);
  const data = JSON.parse(page.meta._elementor_data);
  let replaced = 0;
  data.forEach(section => walk(section, node => {
    if (!node.settings) return;
    for (const [key, value] of Object.entries(node.settings)) {
      if (typeof value === 'string' && /\.jpg/i.test(value)) {
        node.settings[key] = value.replace(/https?:[^"\\]+\.jpg/gi, replacement.url);
        replaced++;
      } else if (value && typeof value === 'object') {
        const json = JSON.stringify(value);
        if (/\.jpg/i.test(json)) {
          node.settings[key] = JSON.parse(json.replace(/https?:[^"\\]+\.jpg/gi, replacement.url));
          replaced++;
        }
      }
    }
  }));
  await wp(`/wp-json/wp/v2/pages/${pageId}`, {
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
  await wp('/wp-json/elementor/v1/cache', { method: 'DELETE' });
  console.log(JSON.stringify({ replaced }, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
