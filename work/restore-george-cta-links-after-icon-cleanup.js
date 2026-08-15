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
  if (!res.ok) throw new Error(`${options.method || 'GET'} ${endpoint} failed ${res.status}: ${typeof body === 'string' ? body.slice(0, 400) : JSON.stringify(body).slice(0, 400)}`);
  return body;
}

function walk(el, fn) {
  fn(el);
  (el.elements || []).forEach(child => walk(child, fn));
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

function setButtonLink(node) {
  const text = node.settings?.text || node.settings?.button_text || '';
  if (/WhatsApp Us/i.test(text)) {
    node.settings.link = { url: 'https://wa.me/27726514447', is_external: false, nofollow: false, custom_attributes: '' };
    if (node.settings.__dynamic__) delete node.settings.__dynamic__.link;
    return 1;
  }
  if (/072 651 4447/i.test(text)) {
    node.settings.link = { url: 'tel:0726514447', is_external: false, nofollow: false, custom_attributes: '' };
    if (node.settings.__dynamic__) delete node.settings.__dynamic__.link;
    return 1;
  }
  return 0;
}

async function main() {
  const page = await wp('/wp-json/wp/v2/pages/6710?context=edit');
  const data = JSON.parse(page.meta._elementor_data);
  let changes = 0;
  data.forEach(section => {
    if (!/LOCAL SERVICE|OUR APPROACH/i.test(sectionText(section))) return;
    walk(section, node => {
      if (node.widgetType === 'button') changes += setButtonLink(node);
    });
  });
  await wp('/wp-json/wp/v2/pages/6710', {
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
  console.log(JSON.stringify({ changes }, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
