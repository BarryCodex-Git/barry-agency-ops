const site = 'https://dev1.mynewwebsite.co.za';
const username = 'barry';
const password = process.env.BARRY_APP_PASS;
if (!password) throw new Error('Missing BARRY_APP_PASS');
const auth = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`;

const correctDisplay = '072 651 4447';
const correctTel = 'tel:0726514447';
const correctRaw = '0726514447';

const oldPhonePatterns = [
  /\(?405\)?[\s-]*768[\s-]*2626/gi,
  /405-768-2626/gi,
  /4057682626/gi,
  /072[\s-]*651[\s-]*4447/g,
];

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

async function fetchAll(endpoint) {
  const out = [];
  for (let page = 1; page <= 20; page++) {
    const batch = await wp(`${endpoint}${endpoint.includes('?') ? '&' : '?'}per_page=100&page=${page}&context=edit`);
    if (!Array.isArray(batch) || batch.length === 0) break;
    out.push(...batch);
    if (batch.length < 100) break;
  }
  return out;
}

function replacePhoneString(value) {
  if (typeof value !== 'string') return value;
  let out = value;
  out = out.replace(/tel:\+?1?[\s-]*\(?405\)?[\s-]*768[\s-]*2626/gi, correctTel);
  out = out.replace(/tel:\+?27?[\s-]*72[\s-]*651[\s-]*4447/gi, correctTel);
  out = out.replace(/wa\.me\/1?4057682626/gi, 'wa.me/27726514447');
  out = out.replace(/wa\.me\/270726514447/gi, 'wa.me/27726514447');
  for (const pattern of oldPhonePatterns) out = out.replace(pattern, correctDisplay);
  out = out.replace(/tel:072\s*651\s*4447/gi, correctTel);
  return out;
}

function walk(el, fn) {
  fn(el);
  (el.elements || []).forEach(child => walk(child, fn));
}

function cleanDynamic(settings) {
  if (!settings?.__dynamic__) return 0;
  let changes = 0;
  for (const [key, value] of Object.entries(settings.__dynamic__)) {
    if (typeof value !== 'string') continue;
    let next = replacePhoneString(value);
    next = next.replace(/%22405-768-2626%22/gi, `%22${correctRaw}%22`);
    next = next.replace(/%22072\s*651\s*4447%22/gi, `%22${correctRaw}%22`);
    if (next !== value) {
      settings.__dynamic__[key] = next;
      changes++;
    }
  }
  return changes;
}

function fixButton(node) {
  let changes = 0;
  const settings = node.settings || {};
  const textKeys = ['text', 'button_text'];
  const linkKeys = ['link', 'button_link'];

  for (const key of textKeys) {
    if (typeof settings[key] === 'string' && /405|768\s*2626|072\s*651\s*4447|0726514447/.test(settings[key])) {
      if (settings[key] !== correctDisplay) {
        settings[key] = correctDisplay;
        changes++;
      }
    }
  }

  for (const key of linkKeys) {
    const link = settings[key];
    if (link?.url && /tel:|405|768\s*2626|072\s*651\s*4447|0726514447/.test(link.url)) {
      if (link.url !== correctTel) {
        settings[key] = { ...link, url: correctTel, is_external: false, nofollow: false, custom_attributes: link.custom_attributes || '' };
        changes++;
      }
      if (settings.__dynamic__?.[key]) {
        delete settings.__dynamic__[key];
        changes++;
      }
    }
  }
  return changes;
}

function fixElementorData(data) {
  let changes = 0;
  for (const section of data) {
    walk(section, node => {
      if (!node.settings) return;
      if (node.widgetType === 'button') changes += fixButton(node);
      changes += cleanDynamic(node.settings);
      for (const [key, value] of Object.entries(node.settings)) {
        if (typeof value === 'string') {
          const next = replacePhoneString(value);
          if (next !== value) {
            node.settings[key] = next;
            changes++;
          }
        } else if (value && typeof value === 'object') {
          const json = JSON.stringify(value);
          const nextJson = replacePhoneString(json);
          if (nextJson !== json) {
            try {
              node.settings[key] = JSON.parse(nextJson);
              changes++;
            } catch {
              // Leave non-JSON-safe Elementor internals untouched.
            }
          }
        }
      }
    });
  }
  return changes;
}

async function updatePost(post, type) {
  const raw = post.meta?._elementor_data;
  if (!raw) return null;
  let data;
  try { data = JSON.parse(raw); } catch { return null; }
  const changes = fixElementorData(data);
  if (!changes) return null;
  await wp(`/wp-json/wp/v2/${type}/${post.id}`, {
    method: 'POST',
    body: JSON.stringify({
      meta: {
        _elementor_edit_mode: 'builder',
        _elementor_data: JSON.stringify(data),
        _elementor_page_settings: post.meta._elementor_page_settings || {},
        ...(post.meta._elementor_template_type ? { _elementor_template_type: post.meta._elementor_template_type } : {}),
      },
    }),
  });
  return { id: post.id, type, title: post.title?.raw || post.title?.rendered || '', changes };
}

async function main() {
  const collections = [
    ['pages', '/wp-json/wp/v2/pages'],
    ['posts', '/wp-json/wp/v2/posts'],
    ['elementor_library', '/wp-json/wp/v2/elementor_library'],
  ];
  const updated = [];
  for (const [type, endpoint] of collections) {
    let items = [];
    try { items = await fetchAll(endpoint); } catch (err) {
      updated.push({ type, skipped: true, reason: err.message.slice(0, 180) });
      continue;
    }
    for (const item of items) {
      const result = await updatePost(item, type);
      if (result) updated.push(result);
    }
  }
  await wp('/wp-json/elementor/v1/cache', { method: 'DELETE' });
  console.log(JSON.stringify({ updated }, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
