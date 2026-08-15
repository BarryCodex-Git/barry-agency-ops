const fs = require('fs');

const site = 'https://dev1.mynewwebsite.co.za';
const username = 'barry';
const password = process.env.BARRY_APP_PASS;
if (!password) throw new Error('Missing BARRY_APP_PASS');
const auth = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`;

const workRoot = 'C:/Users/USER/Documents/Codex/Barry/work';
const pages = JSON.parse(fs.readFileSync(`${workRoot}/h2o-service-pages-created.json`, 'utf8'));

const copy = {
  'general-plumbing-garden-route': {
    approach: 'Most everyday plumbing problems are easier to manage when the fault is checked before parts are changed. This section explains how H2O Plumbers approaches small repairs with clear fault finding, neat handling and practical advice for the property.',
    trust: 'General plumbing often happens inside rooms people use every day. The work should be tidy, explained clearly and handled with respect for kitchens, bathrooms, rental spaces and business areas that need to keep functioning.',
  },
  'leak-detection-garden-route': {
    approach: 'Hidden leaks need patient checks because water can travel away from the damaged pipe before it becomes visible. H2O Plumbers looks at the symptoms first, then narrows the likely source before repair access is discussed.',
    trust: 'A rushed leak repair can miss the real source and leave customers dealing with repeat damp. Careful leak detection gives a clearer reason for the repair, especially where walls, cupboards or floors are already showing moisture.',
  },
  'blocked-drains-garden-route': {
    approach: 'Drain clearing should match the type of blockage, the access point and the condition of the line. H2O Plumbers looks at the symptoms first so the work is aimed at the cause, not only the visible mess.',
    trust: 'Blocked drains can affect hygiene, smells and property use very quickly. A careful approach helps customers understand whether the issue was a simple obstruction, heavy build-up or a sign of a deeper drainage problem.',
  },
  'core-drilling-garden-route': {
    approach: 'Core drilling for plumbing works best when the route is planned before any surface is opened. The position, pipe size and surrounding finishes all matter, especially during renovations or commercial plumbing changes.',
    trust: 'A neat drilled opening makes the rest of the plumbing work easier to finish properly. Poor positioning can create awkward pipe runs, rough patching or extra repair work that should have been avoided.',
  },
  'drain-hydro-jetting-garden-route': {
    approach: 'Hydro jetting is useful when a drain needs a stronger clean, but it still needs judgement. H2O Plumbers checks whether the blockage pattern and pipe condition make high-pressure cleaning a sensible option.',
    trust: 'A powerful drain clean should not be used blindly. The customer should understand why jetting is recommended, what it can remove and when further inspection may still be needed after the line is cleared.',
  },
  'bathroom-renovation-garden-route': {
    approach: 'Bathroom renovation plumbing is easiest to get right before tiles, vanities and shower fittings are locked into place. H2O Plumbers focuses on pipe routes, waste fall and fixture positions early in the process.',
    trust: 'The plumbing behind a new bathroom has to support the finished room for years. Careful planning helps avoid poor drainage, awkward visible pipework and repairs that disturb new surfaces soon after completion.',
  },
  'toilet-installations-garden-route': {
    approach: 'A toilet installation needs the pan, cistern, water feed and waste connection to work together. H2O Plumbers checks the existing layout so the new fitting sits securely and flushes properly.',
    trust: 'Small toilet fitting errors can lead to leaks, smells or movement around the base. Proper installation protects the floor, keeps the seal reliable and makes future maintenance easier to handle.',
  },
  'french-drains-garden-route': {
    approach: 'French drain work starts with understanding where the water collects and where it can safely move. Levels, soil, trench route and outlet planning all affect whether the drainage will actually help.',
    trust: 'Outdoor drainage can create new problems if water is sent to the wrong place. A practical plan protects gardens, paving, walls and neighbouring areas while giving surface water a better route away.',
  },
  'pipe-relining-garden-route': {
    approach: 'Pipe relining should only be considered after the damaged line is understood. H2O Plumbers looks at repeat symptoms, access and likely pipe condition before discussing whether relining is a sensible repair option.',
    trust: 'Relining can reduce disruption where the pipe is suitable, but it is not the right answer for every damaged drain. Customers need clear advice before choosing between relining, excavation or another repair route.',
  },
  'burst-pipe-repair-garden-route': {
    approach: 'Burst pipe work starts with controlling water before it spreads through the property. Once the immediate leak is contained, H2O Plumbers checks the failed section and chooses a repair that suits the pipe.',
    trust: 'A burst pipe can damage cupboards, ceilings, walls and floors within a short time. Clear isolation, careful access and a proper repair help limit damage and reduce the chance of another failure nearby.',
  },
  'commercial-plumbing-garden-route': {
    approach: 'Commercial plumbing often needs to work around staff, customers, tenants and trading hours. H2O Plumbers looks at the site use first, then plans the repair so disruption is kept as practical as possible.',
    trust: 'Business plumbing problems can affect hygiene, access and daily operations. Clear communication matters because owners, managers and tenants often need to understand what failed and what should happen next.',
  },
  'water-pressure-problems-garden-route': {
    approach: 'Pressure problems should be measured and compared before parts are changed. H2O Plumbers checks whether the issue affects one fixture, one area or the wider property supply before advising on repairs.',
    trust: 'Weak or excessive pressure can point to different plumbing issues. Proper testing helps protect fittings, geyser components and pipework while giving the customer a clearer explanation of the pressure pattern.',
  },
  'service-page-template': {
    approach: 'This paragraph gives the visitor a short, practical bridge between the section heading and the checklist below. It must be rewritten for the exact service so the section never feels copied from another page.',
    trust: 'This paragraph explains why the service-specific detail matters to the customer. Keep it human, useful and relevant to the job type, then support it with three clear checklist points below.',
  },
};

const templateTargets = [{ id: 6573, slug: 'service-page-template' }];

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

function findParent(id, els, parent = null) {
  for (const e of els) {
    if (e.id === id) return parent;
    const f = findParent(id, e.elements || [], e);
    if (f) return f;
  }
  return null;
}

function find(id, els) {
  for (const e of els) {
    if (e.id === id) return e;
    const f = find(id, e.elements || []);
    if (f) return f;
  }
  return null;
}

function paragraphWidget(id, title, text) {
  return {
    id,
    elType: 'widget',
    settings: {
      editor: `<p>${text}</p>`,
      text_color: '#FFFFFF',
      typography_typography: 'custom',
      typography_font_family: 'Open Sans',
      typography_font_size: { unit: 'px', size: 17, sizes: [] },
      typography_font_size_mobile: { unit: 'px', size: 16, sizes: [] },
      typography_font_weight: '400',
      typography_line_height: { unit: 'em', size: 1.55, sizes: [] },
      _margin: { unit: 'px', top: '0', right: '0', bottom: '12', left: '0', isLinked: false },
      _title: title,
      _css_classes: 'barry-field service-h3-description',
      css_classes: 'barry-field service-h3-description',
    },
    elements: [],
    widgetType: 'text-editor',
  };
}

function insertAfter(parent, afterId, widgetId, title, text) {
  if (!parent?.elements) return false;
  const existing = parent.elements.find(e => e.id === widgetId || e.settings?._title === title);
  if (existing) {
    existing.settings.editor = `<p>${text}</p>`;
    existing.settings.text_color = '#FFFFFF';
    existing.settings._title = title;
    return true;
  }
  const idx = parent.elements.findIndex(e => e.id === afterId);
  if (idx < 0) return false;
  parent.elements.splice(idx + 1, 0, paragraphWidget(widgetId, title, text));
  return true;
}

function updateData(data, slug) {
  const c = copy[slug];
  if (!c) throw new Error(`Missing copy for ${slug}`);

  const approachH3Id = find('ba594ed', data) ? 'ba594ed' : '06300a9';
  const trustH3Id = find('7dce8ee', data) ? '7dce8ee' : '0cab69f';
  const approachParent = findParent(approachH3Id, data);
  const trustParent = findParent(trustH3Id, data);
  const ok1 = insertAfter(approachParent, approachH3Id, 'ap3desc', 'Service Approach H3 Description', c.approach);
  const ok2 = insertAfter(trustParent, trustH3Id, 'tr3desc', 'Service Trust H3 Description', c.trust);

  if (!ok1 || !ok2) {
    const approach = find('ba594ed', data);
    const trust = find('7dce8ee', data);
    throw new Error(`Could not place widgets for ${slug}. approach=${!!approach} trust=${!!trust}`);
  }
  return data;
}

async function updatePage(id, slug) {
  const page = await wp(`/wp-json/wp/v2/pages/${id}?context=edit`);
  const data = JSON.parse(page.meta._elementor_data);
  updateData(data, slug);
  await wp(`/wp-json/wp/v2/pages/${id}`, {
    method: 'POST',
    body: JSON.stringify({ meta: { _elementor_data: JSON.stringify(data) } }),
  });
  return { id, slug };
}

(async () => {
  const updated = [];
  for (const p of pages) updated.push(await updatePage(p.id, p.slug));
  for (const p of templateTargets) updated.push(await updatePage(p.id, p.slug));
  await wp('/wp-json/elementor/v1/cache', { method: 'DELETE' });
  fs.writeFileSync(`${workRoot}/h2o-service-h3-description-update-result.json`, JSON.stringify(updated, null, 2));
  console.log(JSON.stringify({ updated: updated.length, pages: updated }, null, 2));
})().catch(err => {
  console.error(err.stack || err.message);
  process.exit(1);
});
