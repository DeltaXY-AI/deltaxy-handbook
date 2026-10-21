// Automated accessibility scan of the built site (WCAG 2.2 AA rules in axe-core).
// Serves dist/ with `astro preview` and scans every page in light and dark themes, on desktop
// and a 390px-wide screen. Exits non-zero on any violation.
// Usage: node scripts/check-a11y.mjs   (requires a prior `pnpm build`)
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { preview } from 'astro';
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import { BASE } from '../site.config.mjs';

const PORT = 4329;
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const VIEWPORTS = [
	{ name: 'desktop', width: 1280, height: 900 },
	{ name: 'mobile', width: 390, height: 844 },
];
const THEMES = /** @type {const} */ (['light', 'dark']);

const distDir = path.resolve('dist');
const pages = (await readdir(distDir, { recursive: true }))
	.map((file) => file.split(path.sep).join('/'))
	.filter((file) => file.endsWith('.html'))
	.map((file) => BASE + file.replace(/(^|\/)index\.html$/, '$1'));

if (pages.length === 0) {
	console.error('check-a11y: no HTML files in dist/; run the build first.');
	process.exit(1);
}

const server = await preview({ server: { port: PORT, host: '127.0.0.1' }, logLevel: 'warn' });
const browser = await chromium.launch();
let violationCount = 0;

try {
	for (const theme of THEMES) {
		for (const viewport of VIEWPORTS) {
			const context = await browser.newContext({
				colorScheme: theme,
				viewport: { width: viewport.width, height: viewport.height },
			});
			const page = await context.newPage();
			for (const pagePath of pages) {
				// networkidle: Expressive Code makes overflowing code blocks focusable from a script.
				await page.goto(`http://127.0.0.1:${PORT}${pagePath}`, { waitUntil: 'networkidle' });
				const actualTheme = await page.evaluate(() => document.documentElement.dataset.theme);
				if (actualTheme !== theme) throw new Error(`${pagePath}: expected ${theme} theme, got ${actualTheme}`);

				const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze();
				for (const violation of violations) {
					violationCount += violation.nodes.length;
					console.error(`✗ ${pagePath} [${theme}, ${viewport.name}] ${violation.id}: ${violation.help}`);
					for (const node of violation.nodes) {
						console.error(`    ${node.target.join(' ')}\n      ${node.failureSummary?.replace(/\n/g, '\n      ')}`);
					}
				}
			}
			await context.close();
		}
	}
} finally {
	await browser.close();
	await server.stop();
}

const scans = pages.length * THEMES.length * VIEWPORTS.length;
if (violationCount > 0) {
	console.error(`check-a11y: ${violationCount} violation(s) across ${scans} scans.`);
	process.exit(1);
}
console.log(`check-a11y: ${pages.length} pages × ${THEMES.length} themes × ${VIEWPORTS.length} viewports, no violations.`);
