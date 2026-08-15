const site = 'https://dev1.mynewwebsite.co.za';
const username = 'barry';
const password = process.env.BARRY_APP_PASS;
if (!password) throw new Error('Missing BARRY_APP_PASS');
const auth = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`;

const intros = {
  6077: 'Blocked drains can look different from one property to the next. These recent jobs show how H2O Plumbers helps with slow drains, overflows, bad smells and repeat blockages across local Garden Route areas.',
  6654: 'From leaking taps to running toilets, small plumbing faults can interrupt a normal day quickly. These recent jobs show how H2O Plumbers handles everyday repairs for homes, rentals and businesses across the Garden Route.',
  6655: 'Hidden leaks are often noticed through damp marks, moving meters, pressure changes or mould smells. These recent jobs show how H2O Plumbers traces leak clues before opening walls or replacing parts.',
  6656: 'Core drilling needs careful measuring before an opening is made. These recent jobs show how H2O Plumbers creates neat access for pipe routes, waste lines and plumbing alterations around local properties.',
  6657: 'Some drains need more than a basic clear. These recent jobs show how H2O Plumbers checks access, pipe condition and blockage type before using hydro jetting where it is suitable.',
  6658: 'Bathroom plumbing is easiest to get right before tiles, vanities and shower screens are fitted. These recent jobs show how H2O Plumbers plans pipework, wastes and fixture positions during renovations.',
  6659: 'A toilet installation should sit firmly, flush properly and seal cleanly at the base. These recent jobs show how H2O Plumbers fits and tests toilets in homes, rentals and guest properties.',
  6660: 'Poor drainage can leave gardens, paving and outside walls wet for too long. These recent jobs show how H2O Plumbers plans French drains around local ground levels, runoff and safe water movement.',
  6661: 'Pipe relining decisions depend on the actual condition of the damaged line. These recent jobs show how H2O Plumbers checks access, pipe shape and repair suitability before recommending the right option.',
  6662: 'A burst pipe needs quick water control and a repair that suits the pipe position. These recent jobs show how H2O Plumbers stops leaks, repairs damaged sections and tests the line afterwards.',
  6663: 'Business plumbing faults can affect staff, customers, guests and daily operations. These recent jobs show how H2O Plumbers handles practical repairs for offices, shops, kitchens and guest properties.',
  6664: 'Water pressure problems can affect showers, taps, geysers and appliances in different ways. These recent jobs show how H2O Plumbers checks pressure behaviour before recommending repairs or adjustments.',
  6710: 'Homes, rentals, guesthouses and businesses around George can all need different plumbing support. These recent jobs show how H2O Plumbers handles local repairs, drainage issues, leaks and pressure concerns.',
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

function setText(widget, value) {
  if (!widget?.settings) return;
  if ('editor' in widget.settings) widget.settings.editor = value;
  if ('text' in widget.settings) widget.settings.text = value;
}

async function update(id, intro) {
  const page = await wp(`/wp-json/wp/v2/pages/${id}?context=edit`);
  const data = JSON.parse(page.meta._elementor_data);
  const section = data.find(sec => /RECENT WORK/i.test(sectionText(sec)));
  if (!section) throw new Error(`Recent work section not found on ${id}`);
  const textEditors = [];
  walk(section, node => {
    if (node.widgetType === 'text-editor') textEditors.push(node);
  });
  if (!textEditors[0]) throw new Error(`Recent work intro not found on ${id}`);
  setText(textEditors[0], intro);
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
  return { id, title: page.title?.raw || page.title?.rendered || '' };
}

async function main() {
  const updated = [];
  for (const [id, intro] of Object.entries(intros)) updated.push(await update(id, intro));
  await wp('/wp-json/elementor/v1/cache', { method: 'DELETE' });
  console.log(JSON.stringify({ updated }, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
