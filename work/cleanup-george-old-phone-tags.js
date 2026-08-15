const fs = require('fs');

const site = 'https://dev1.mynewwebsite.co.za';
const username = 'barry';
const password = process.env.BARRY_APP_PASS;
if (!password) throw new Error('Missing BARRY_APP_PASS');
const auth = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`;
const pageId = 6710;

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
  if (!res.ok) throw new Error(`${options.method || 'GET'} ${endpoint} failed ${res.status}: ${typeof body === 'string' ? body.slice(0, 500) : JSON.stringify(body).slice(0, 500)}`);
  return body;
}

function walk(el, fn) {
  fn(el);
  (el.elements || []).forEach(child => walk(child, fn));
}

function setButtonLink(widget, text, url) {
  if (!widget?.settings) return;
  if ('text' in widget.settings) widget.settings.text = text;
  if ('button_text' in widget.settings) widget.settings.button_text = text;
  if ('link' in widget.settings) widget.settings.link = { url, is_external: false, nofollow: false, custom_attributes: '' };
  if ('button_link' in widget.settings) widget.settings.button_link = { url, is_external: false, nofollow: false, custom_attributes: '' };
  if (widget.settings.__dynamic__) {
    delete widget.settings.__dynamic__.link;
    delete widget.settings.__dynamic__.button_link;
  }
}

async function main() {
  const page = await wp(`/wp-json/wp/v2/pages/${pageId}?context=edit`);
  const data = JSON.parse(page.meta._elementor_data);
  let cleaned = 0;
  data.forEach(section => walk(section, node => {
    const dynamic = JSON.stringify(node.settings?.__dynamic__ || {});
    if (node.widgetType === 'button' && /405-768-2626|405|768 2626/.test(dynamic)) {
      setButtonLink(node, '072 651 4447', 'tel:0726514447');
      cleaned++;
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
  fs.writeFileSync('C:/Users/USER/Documents/Codex/Barry/work/george-6710-cleaned-phone-tags.json', JSON.stringify(data, null, 2));
  console.log(JSON.stringify({ cleaned }, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
