import { chromium, devices } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const targetUrl = process.argv.slice(2).find((arg) => arg !== '--');

if (!targetUrl) {
  console.error('Usage: npm run qa:visual -- https://example.com/page/');
  process.exit(1);
}

const viewports = [
  { name: 'desktop', width: 1440, height: 1200 },
  { name: 'tablet', ...devices['iPad (gen 7)'].viewport },
  { name: 'mobile', ...devices['iPhone 13'].viewport }
];

const safeName = targetUrl
  .replace(/^https?:\/\//, '')
  .replace(/[^a-z0-9]+/gi, '-')
  .replace(/^-|-$/g, '')
  .toLowerCase()
  .slice(0, 80);

const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const outDir = path.resolve('outputs', 'playwright-qa', `${stamp}-${safeName || 'page'}`);

await fs.mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const results = [];

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1
    });
    const page = await context.newPage();
    const response = await page.goto(targetUrl, {
      waitUntil: 'networkidle',
      timeout: 60000
    });

    await page.screenshot({
      path: path.join(outDir, `${viewport.name}.png`),
      fullPage: true
    });

    const visibleText = await page.locator('body').innerText({ timeout: 10000 }).catch(() => '');
    const issues = await page.evaluate(() => {
      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = document.documentElement.clientHeight;
      const elements = Array.from(document.querySelectorAll('body *'));
      const overflow = [];
      const clipped = [];

      for (const element of elements) {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        if (!rect.width || !rect.height || style.visibility === 'hidden' || style.display === 'none') continue;

        if (rect.right > viewportWidth + 2 || rect.left < -2) {
          overflow.push({
            tag: element.tagName.toLowerCase(),
            text: (element.textContent || '').trim().slice(0, 80),
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            viewportWidth
          });
        }

        if ((style.overflow === 'hidden' || style.overflowX === 'hidden' || style.overflowY === 'hidden') && element.scrollHeight > element.clientHeight + 4) {
          clipped.push({
            tag: element.tagName.toLowerCase(),
            text: (element.textContent || '').trim().slice(0, 80)
          });
        }
      }

      return {
        title: document.title,
        viewportWidth,
        viewportHeight,
        horizontalOverflow: overflow.slice(0, 20),
        clippedTextCandidates: clipped.slice(0, 20)
      };
    });

    results.push({
      viewport: viewport.name,
      status: response?.status() ?? null,
      title: issues.title,
      textLength: visibleText.length,
      screenshot: `${viewport.name}.png`,
      issues
    });

    await context.close();
  }
} finally {
  await browser.close();
}

await fs.writeFile(
  path.join(outDir, 'summary.json'),
  JSON.stringify({ url: targetUrl, createdAt: new Date().toISOString(), results }, null, 2)
);

console.log(`Visual QA saved to ${outDir}`);
for (const result of results) {
  const overflowCount = result.issues.horizontalOverflow.length;
  const clippedCount = result.issues.clippedTextCandidates.length;
  console.log(`${result.viewport}: HTTP ${result.status}; overflow ${overflowCount}; clipped candidates ${clippedCount}; screenshot ${result.screenshot}`);
}
