const site = 'https://dev1.mynewwebsite.co.za';
const username = 'barry';
const password = process.env.BARRY_APP_PASS;
if (!password) throw new Error('Missing BARRY_APP_PASS');
const auth = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`;

const pageIds = [6077, 6654, 6655, 6656, 6657, 6658, 6659, 6660, 6661, 6662, 6663, 6664, 6710];
const informationalSectionLabels = [
  /PROBLEMS WE SOLVE/i,
  /GEORGE PLUMBING/i,
  /Plumbing Problems H2O Plumbers Helps With/i,
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

function isInformationalSection(section) {
  const text = sectionText(section);
  return informationalSectionLabels.some(re => re.test(text));
}

function clearLinkValue(value) {
  if (!value || typeof value !== 'object') return value;
  if (!Object.prototype.hasOwnProperty.call(value, 'url')) return value;
  return { ...value, url: '', is_external: false, nofollow: false, custom_attributes: '' };
}

function removeLinksFromSection(section) {
  let changes = 0;
  walk(section, node => {
    if (!node.settings) return;
    for (const key of [
      'link',
      'button_link',
      'title_link',
      'selected_icon_link',
      'icon_link',
      'box_link',
      'wrapper_link',
      '__dynamic__',
    ]) {
      if (!Object.prototype.hasOwnProperty.call(node.settings, key)) continue;
      if (key === '__dynamic__') {
        const before = JSON.stringify(node.settings.__dynamic__ || {});
        for (const dynamicKey of ['link', 'button_link', 'title_link', 'selected_icon_link', 'icon_link', 'box_link', 'wrapper_link']) {
          if (node.settings.__dynamic__?.[dynamicKey]) delete node.settings.__dynamic__[dynamicKey];
        }
        if (JSON.stringify(node.settings.__dynamic__ || {}) !== before) changes++;
        continue;
      }
      const before = JSON.stringify(node.settings[key]);
      node.settings[key] = clearLinkValue(node.settings[key]);
      if (JSON.stringify(node.settings[key]) !== before) changes++;
    }
    // Elementor containers can use custom attributes to make cards clickable.
    if (typeof node.settings.custom_attributes === 'string' && /href=|onclick=|location\.href/i.test(node.settings.custom_attributes)) {
      node.settings.custom_attributes = '';
      changes++;
    }
  });
  return changes;
}

async function updatePage(id) {
  const page = await wp(`/wp-json/wp/v2/pages/${id}?context=edit`);
  const data = JSON.parse(page.meta._elementor_data);
  let changes = 0;
  const touchedSections = [];
  data.forEach((section, index) => {
    if (!isInformationalSection(section)) return;
    const sectionChanges = removeLinksFromSection(section);
    if (sectionChanges) {
      changes += sectionChanges;
      touchedSections.push(index);
    }
  });
  if (!changes) return { id, title: page.title?.raw || page.title?.rendered || '', changes: 0, touchedSections };
  await wp(`/wp-json/wp/v2/pages/${id}`, {
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
  return { id, title: page.title?.raw || page.title?.rendered || '', changes, touchedSections };
}

async function main() {
  const updated = [];
  for (const id of pageIds) updated.push(await updatePage(id));
  await wp('/wp-json/elementor/v1/cache', { method: 'DELETE' });
  console.log(JSON.stringify({ updated }, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
