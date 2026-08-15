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

function walk(el, fn) {
  fn(el);
  (el.elements || []).forEach(child => walk(child, fn));
}

function cleanString(value) {
  if (typeof value !== 'string') return value;
  return value
    .replace(/tel:[^"'\\<>\s]+/gi, 'tel:0726514447')
    .replace(/\(?704\)?[\s-]*741[\s-]*1332/gi, '072 651 4447')
    .replace(/\(?405\)?[\s-]*768[\s-]*2626/gi, '072 651 4447');
}

async function main() {
  const item = await wp('/wp-json/wp/v2/elementor_library/3660?context=edit');
  const data = JSON.parse(item.meta._elementor_data);
  let changes = 0;
  data.forEach(section => walk(section, node => {
    if (!node.settings) return;
    for (const [key, value] of Object.entries(node.settings)) {
      if (typeof value === 'string') {
        const next = cleanString(value);
        if (next !== value) {
          node.settings[key] = next;
          changes++;
        }
      } else if (value && typeof value === 'object') {
        const json = JSON.stringify(value);
        const nextJson = cleanString(json);
        if (nextJson !== json) {
          try {
            node.settings[key] = JSON.parse(nextJson);
            changes++;
          } catch {}
        }
      }
    }
  }));
  await wp('/wp-json/wp/v2/elementor_library/3660', {
    method: 'POST',
    body: JSON.stringify({
      meta: {
        _elementor_edit_mode: 'builder',
        _elementor_data: JSON.stringify(data),
        _elementor_page_settings: item.meta._elementor_page_settings || {},
        ...(item.meta._elementor_template_type ? { _elementor_template_type: item.meta._elementor_template_type } : {}),
      },
    }),
  });
  await wp('/wp-json/elementor/v1/cache', { method: 'DELETE' });
  console.log(JSON.stringify({ id: 3660, changes }, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
