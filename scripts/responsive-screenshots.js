import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const VIEWPORTS = [
  { width: 320, height: 642 },
  { width: 375, height: 642 },
  { width: 390, height: 844 },
  { width: 425, height: 642 },
  { width: 430, height: 932 },
  { width: 768, height: 642 },
  { width: 768, height: 1024 },
  { width: 1024, height: 1366 },
  { width: 1280, height: 720 },
  { width: 1440, height: 900 }
];

const LOCAL_URL = 'http://localhost:5173/concept-g.html';
const OUTPUT_DIR = path.join(process.cwd(), 'screenshots', 'responsive');

async function run() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  for (const vp of VIEWPORTS) {
    await page.setViewportSize(vp);
    console.log(`Navigating to ${LOCAL_URL} at ${vp.width}x${vp.height}...`);
    await page.goto(LOCAL_URL, { waitUntil: 'networkidle' });
    
    // Wait an extra second for animations (like the hero phones floating into place)
    await page.waitForTimeout(1000);

    const name = `hero-${vp.width}x${vp.height}`;
    
    // Top screenshot
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: path.join(OUTPUT_DIR, `${name}-top.png`) });
    
    // Bottom of hero (if height < 900)
    if (vp.height < 900) {
      await page.evaluate(() => window.scrollTo(0, 400));
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${name}-scroll.png`) });
    }
    
    console.log(`Saved screenshots for ${vp.width}x${vp.height}`);
  }

  await browser.close();
  console.log('Done!');
}

run().catch(console.error);
