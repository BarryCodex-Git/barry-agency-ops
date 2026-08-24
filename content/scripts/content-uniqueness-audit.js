const fs = require("fs");

const base = (process.argv[2] || "").replace(/\/$/, "");
if (!base) {
  console.error("Usage: node content/scripts/content-uniqueness-audit.js https://example.com [output.json]");
  process.exit(1);
}
const output = process.argv[3] || "content-uniqueness-audit.json";

function decodeEntities(value) {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#039;|&rsquo;|&lsquo;/gi, "'")
    .replace(/&rdquo;|&ldquo;/gi, '"')
    .replace(/&mdash;|&#8212;/gi, " - ")
    .replace(/&ndash;|&#8211;/gi, " - ");
}

function cleanText(value) {
  return decodeEntities(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripChrome(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<header[\s\S]*?<\/header>/gi, " ")
    .replace(/<footer[\s\S]*?<\/footer>/gi, " ")
    .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
    .replace(/<form[\s\S]*?<\/form>/gi, " ");
}

function extractAll(html, tag) {
  const rx = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
  const out = [];
  let match;
  while ((match = rx.exec(html))) {
    const text = cleanText(match[1]);
    if (text && !/^(skip to content|contact us|whatsapp us|call us now)$/i.test(text)) out.push(text);
  }
  return out;
}

function firstWords(text, count = 7) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .slice(0, count)
    .join(" ");
}

function ngrams(text, n = 4) {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);
  const grams = [];
  for (let i = 0; i <= words.length - n; i++) {
    const gram = words.slice(i, i + n).join(" ");
    if (!/^(the|and|with|for|that|this|from|where|when|into)\b/.test(gram)) grams.push(gram);
  }
  return grams;
}

async function get(url) {
  const res = await fetch(url, { headers: { "user-agent": "Barry content uniqueness audit" } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

async function sitemapUrls() {
  const root = await get(`${base}/wp-sitemap.xml`).catch(() => get(`${base}/sitemap_index.xml`));
  const sitemapLocs = [...root.matchAll(/<loc>(.*?)<\/loc>/gi)].map((m) => m[1]);
  const urls = new Set();
  for (const loc of sitemapLocs) {
    if (!/(page|post)-sitemap\.xml$|wp-sitemap-(posts|pages|post)-/.test(loc)) continue;
    const xml = await get(loc);
    for (const match of xml.matchAll(/<loc>(.*?)<\/loc>/gi)) {
      const url = match[1].replace(/\/$/, "");
      if (url.startsWith(base) && !/\/wp-content\/|\/author\/|\/category\/|\/tag\/|\/feed\/|\/attachment\//.test(url)) {
        urls.add(`${url}/`);
      }
    }
  }
  urls.add(`${base}/`);
  return [...urls].sort();
}

function addMap(map, key, page) {
  if (!key || key.length < 16) return;
  if (!map.has(key)) map.set(key, new Set());
  map.get(key).add(page);
}

function repeated(map, minPages, limit) {
  return [...map.entries()]
    .map(([text, pageSet]) => ({ text, pages: [...pageSet], count: pageSet.size }))
    .filter((item) => item.count >= minPages)
    .sort((a, b) => b.count - a.count || b.text.length - a.text.length)
    .slice(0, limit);
}

async function main() {
  const urls = await sitemapUrls();
  const pages = [];
  const openings = new Map();
  const exactLines = new Map();
  const phrases = new Map();

  for (const url of urls) {
    const html = stripChrome(await get(url));
    const title = cleanText((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [null, ""])[1]);
    const h1 = extractAll(html, "h1");
    const h2 = extractAll(html, "h2");
    const h3 = extractAll(html, "h3");
    const paragraphs = extractAll(html, "p").filter((text) => text.length > 25);
    const listItems = extractAll(html, "li").filter((text) => text.length > 20);
    const bodyText = [...h1, ...h2, ...h3, ...paragraphs, ...listItems].join("\n");
    const page = {
      url,
      title,
      h1,
      h2,
      h3,
      wordCount: bodyText.split(/\s+/).filter(Boolean).length,
      paragraphOpenings: paragraphs.map((text) => firstWords(text, 7)).filter(Boolean),
    };
    pages.push(page);
    page.paragraphOpenings.forEach((opening) => addMap(openings, opening, url));
    [...h1, ...h2, ...h3, ...paragraphs, ...listItems].forEach((line) => addMap(exactLines, line.toLowerCase(), url));
    ngrams(bodyText, 4).forEach((phrase) => addMap(phrases, phrase, url));
  }

  const result = {
    auditedAt: new Date().toISOString(),
    base,
    pageCount: pages.length,
    pages,
    repeatedParagraphOpenings: repeated(openings, 3, 75),
    repeatedExactLines: repeated(exactLines, 3, 75),
    repeatedPhrases: repeated(phrases, 5, 100),
  };
  fs.writeFileSync(output, JSON.stringify(result, null, 2));
  console.log(`Audited ${pages.length} pages. Saved ${output}`);
  console.log("\nTop repeated paragraph openings:");
  result.repeatedParagraphOpenings.slice(0, 15).forEach((item) => console.log(`- ${item.count} pages: ${item.text}`));
  console.log("\nTop repeated exact lines:");
  result.repeatedExactLines.slice(0, 15).forEach((item) => console.log(`- ${item.count} pages: ${item.text.slice(0, 140)}`));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
