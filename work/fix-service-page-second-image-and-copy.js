const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const site = 'https://dev1.mynewwebsite.co.za';
const username = 'barry';
const password = process.env.BARRY_APP_PASS;
if (!password) throw new Error('Missing BARRY_APP_PASS');
const auth = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`;

const workRoot = 'C:/Users/USER/Documents/Codex/Barry/work';
const imgRoot = 'C:/Users/USER/Documents/Codex/Barry/clients/H2O Plumbers/assets/AI Images';
const altOut = path.join(imgRoot, 'service-pages-webp', 'alternate');
fs.mkdirSync(altOut, { recursive: true });

const pages = JSON.parse(fs.readFileSync(`${workRoot}/h2o-service-pages-created.json`, 'utf8'));

const serviceMap = {
  'general-plumbing-garden-route': {
    name: 'General Plumbing', key: 'general-plumbing', eyebrow: 'PRACTICAL SUPPORT',
    altSource: path.join(imgRoot, 'h2o-plumbers-general-plumbing-garden-route-ai-01.jpg'),
  },
  'leak-detection-garden-route': {
    name: 'Leak Detection', key: 'leak-detection', eyebrow: 'LEAK CONTROL',
    altSource: path.join(imgRoot, 'h2o-plumbers-leak-detection-george-ai-01.jpg'),
  },
  'blocked-drains-garden-route': {
    name: 'Blocked Drains', key: 'blocked-drains', eyebrow: 'DRAIN CARE',
    altSource: path.join(imgRoot, 'h2o-plumbers-blocked-drains-garden-route-ai-01.jpg'),
  },
  'core-drilling-garden-route': {
    name: 'Core Drilling', key: 'core-drilling', eyebrow: 'ACCURATE ACCESS',
    altSource: path.join(imgRoot, 'h2o-plumbers-core-drilling-george-ai-01.jpg'),
  },
  'drain-hydro-jetting-garden-route': {
    name: 'Drain Hydro Jetting', key: 'drain-hydro-jetting', eyebrow: 'DEEPER CLEANING',
    altSource: path.join(imgRoot, 'h2o-plumbers-drain-hydro-jetting-garden-route-ai-01.jpg'),
  },
  'bathroom-renovation-garden-route': {
    name: 'Bathroom Renovation', key: 'bathroom-renovation', eyebrow: 'RENOVATION DETAIL',
    altSource: 'C:/Users/USER/.codex/generated_images/019ec538-822b-76e2-8a57-2e683ff59d2f/call_o14kiVJMPQY5FPDVqbZ6GaWZ.png',
  },
  'toilet-installations-garden-route': {
    name: 'Toilet Installations', key: 'toilet-installations', eyebrow: 'PROPER FITTING',
    altSource: 'C:/Users/USER/.codex/generated_images/019ec538-822b-76e2-8a57-2e683ff59d2f/call_EijfmNaWCFzen5Tp7YknGCKu.png',
  },
  'french-drains-garden-route': {
    name: 'French Drains', key: 'french-drains', eyebrow: 'DRAINAGE PLANNING',
    altSource: 'C:/Users/USER/.codex/generated_images/019ec538-822b-76e2-8a57-2e683ff59d2f/call_JjSw1UX8tMpXdagrtX4vuruO.png',
  },
  'pipe-relining-garden-route': {
    name: 'Pipe Relining', key: 'pipe-relining', eyebrow: 'PIPE CONDITION',
    altSource: 'C:/Users/USER/.codex/generated_images/019ec538-822b-76e2-8a57-2e683ff59d2f/call_8ezmK7C6ci5uVusoGvS1Fyst.png',
  },
  'burst-pipe-repair-garden-route': {
    name: 'Burst Pipe Repair', key: 'burst-pipe-repair', eyebrow: 'DAMAGE CONTROL',
    altSource: 'C:/Users/USER/.codex/generated_images/019ec538-822b-76e2-8a57-2e683ff59d2f/call_fFvA7YRdDETfit151HYMlLBw.png',
  },
  'commercial-plumbing-garden-route': {
    name: 'Commercial Plumbing', key: 'commercial-plumbing', eyebrow: 'BUSINESS SUPPORT',
    altSource: 'C:/Users/USER/.codex/generated_images/019ec538-822b-76e2-8a57-2e683ff59d2f/call_Q0QbPfuovgNy7FAx3DLdIODp.png',
  },
  'water-pressure-problems-garden-route': {
    name: 'Water Pressure Problems', key: 'water-pressure-problems', eyebrow: 'PRESSURE CONTROL',
    altSource: 'C:/Users/USER/.codex/generated_images/019ec538-822b-76e2-8a57-2e683ff59d2f/call_igM5R3QCtLGiIP9ahHWOm7P2.png',
  },
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

async function uploadMedia(file, title, alt) {
  const res = await fetch(`${site}/wp-json/wp/v2/media`, {
    method: 'POST',
    headers: {
      Authorization: auth,
      'Content-Type': 'image/webp',
      'Content-Disposition': `attachment; filename="${path.basename(file)}"`,
    },
    body: fs.readFileSync(file),
  });
  const text = await res.text();
  let media;
  try { media = JSON.parse(text); } catch { media = text; }
  if (!res.ok) throw new Error(`media upload failed ${res.status}: ${typeof media === 'string' ? media.slice(0, 300) : JSON.stringify(media).slice(0, 300)}`);
  await wp(`/wp-json/wp/v2/media/${media.id}`, {
    method: 'POST',
    body: JSON.stringify({ title, alt_text: alt, caption: alt }),
  });
  return { id: media.id, url: media.source_url, alt };
}

function find(id, els) {
  for (const e of els) {
    if (e.id === id) return e;
    const f = find(id, e.elements || []);
    if (f) return f;
  }
  return null;
}

function mediaObj(m) {
  return { id: m.id, url: m.url, alt: m.alt, source: 'library', size: 'full' };
}

function convertAlternate(slug, source) {
  const output = path.join(altOut, `h2o-plumbers-${serviceMap[slug].key}-garden-route-service-alternate-square.webp`);
  const py = 'C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe';
  const code = `
from PIL import Image
im=Image.open(r'''${source}''').convert('RGB')
w,h=im.size
side=min(w,h)
left=(w-side)//2
top=(h-side)//2
im=im.crop((left,top,left+side,top+side)).resize((1000,1000), Image.LANCZOS)
im.save(r'''${output}''','WEBP',quality=82,method=6)
`;
  const result = spawnSync(py, ['-c', code], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(result.stderr || result.stdout || `Failed image conversion for ${slug}`);
  return output;
}

async function updatePage(id, slug, altMedia) {
  const page = await wp(`/wp-json/wp/v2/pages/${id}?context=edit`);
  const data = JSON.parse(page.meta._elementor_data);
  const info = serviceMap[slug];

  for (const descId of ['ap3desc', 'tr3desc']) {
    const desc = find(descId, data);
    if (desc?.settings) {
      desc.settings.text_color = '#000000';
      desc.settings.__globals__ = { ...(desc.settings.__globals__ || {}), text_color: 'globals/colors?id=text' };
    }
  }

  const eyebrow = find('9d6770f', data);
  if (eyebrow?.settings) eyebrow.settings.title = info.eyebrow;

  const secondImage = find('9204026', data);
  if (secondImage?.settings) {
    secondImage.settings.image = mediaObj(altMedia);
    secondImage.settings._title = `Service Secondary Image - ${info.name}`;
  }

  await wp(`/wp-json/wp/v2/pages/${id}`, {
    method: 'POST',
    body: JSON.stringify({ meta: { _elementor_data: JSON.stringify(data) } }),
  });
}

async function updateTemplate() {
  const page = await wp('/wp-json/wp/v2/pages/6573?context=edit');
  const data = JSON.parse(page.meta._elementor_data);
  for (const descId of ['ap3desc', 'tr3desc']) {
    const desc = find(descId, data);
    if (desc?.settings) {
      desc.settings.text_color = '#000000';
      desc.settings.__globals__ = { ...(desc.settings.__globals__ || {}), text_color: 'globals/colors?id=text' };
    }
  }
  const eyebrow = find('8b2d19f', data);
  if (eyebrow?.settings) eyebrow.settings.title = 'SERVICE FOCUS';
  await wp('/wp-json/wp/v2/pages/6573', {
    method: 'POST',
    body: JSON.stringify({ meta: { _elementor_data: JSON.stringify(data) } }),
  });
}

(async () => {
  const uploaded = {};
  for (const [slug, info] of Object.entries(serviceMap)) {
    const file = convertAlternate(slug, info.altSource);
    uploaded[slug] = await uploadMedia(
      file,
      `H2O Plumbers ${info.name} Garden Route alternate service image`,
      `H2O Plumbers ${info.name.toLowerCase()} work in the Garden Route`
    );
  }
  for (const p of pages) await updatePage(p.id, p.slug, uploaded[p.slug]);
  await updateTemplate();
  await wp('/wp-json/elementor/v1/cache', { method: 'DELETE' });
  fs.writeFileSync(`${workRoot}/h2o-service-second-image-and-copy-fix.json`, JSON.stringify(uploaded, null, 2));
  console.log(JSON.stringify({ updatedPages: pages.length, uploadedAlternates: Object.keys(uploaded).length }, null, 2));
})().catch(err => {
  console.error(err.stack || err.message);
  process.exit(1);
});
