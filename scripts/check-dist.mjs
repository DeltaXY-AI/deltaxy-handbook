// Checks the built site in dist/ before it is published:
//  1. Every internal link, asset reference, and #fragment resolves under the configured base path.
//  2. The output contains only intended public files: no Markdown sources, environment files,
//     or workstation paths.
// Usage: node scripts/check-dist.mjs [distDir]
import { readdir, readFile } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';
import { BASE, SITE } from '../site.config.mjs';

const distDir = path.resolve(process.argv[2] ?? 'dist');
const errors = [];

/** @returns {Promise<string[]>} paths relative to distDir, using forward slashes */
async function listFiles(dir) {
	const entries = await readdir(dir, { recursive: true, withFileTypes: true });
	return entries
		.filter((entry) => entry.isFile())
		.map((entry) => path.relative(distDir, path.join(entry.parentPath, entry.name)).split(path.sep).join('/'));
}

const files = await listFiles(distDir);
const htmlFiles = files.filter((file) => file.endsWith('.html'));

// --- 2. Unintended public output -------------------------------------------------------------
const TEXT_EXTENSIONS = /\.(html|js|mjs|css|json|xml|txt|svg|webmanifest)$/;
const WORKSTATION_PATH = /\b[A-Z]:[\\/]+(?:source|code|Users)\b|\/home\/runner\//i;

for (const file of files) {
	const name = path.posix.basename(file);
	if (/^\.env/.test(name)) errors.push(`${file}: environment file in output`);
	if (/\.mdx?$/.test(name)) errors.push(`${file}: Markdown source in output`);
	if (TEXT_EXTENSIONS.test(name)) {
		const text = await readFile(path.join(distDir, file), 'utf8');
		const match = text.match(WORKSTATION_PATH);
		if (match) errors.push(`${file}: contains workstation path "${match[0]}"`);
	}
}

// --- 1. Links, assets, and anchors -----------------------------------------------------------
/** Element ids per HTML file, parsed lazily. */
const idCache = new Map();
async function idsOf(file) {
	if (!idCache.has(file)) {
		const root = parse(await readFile(path.join(distDir, file), 'utf8'));
		const ids = new Set();
		for (const el of root.querySelectorAll('[id], a[name]')) {
			ids.add(el.getAttribute('id') ?? el.getAttribute('name'));
		}
		idCache.set(file, ids);
	}
	return idCache.get(file);
}

/** Map a URL pathname under BASE to a file in dist, or undefined if it does not exist. */
function fileFor(pathname) {
	const relative = decodeURIComponent(pathname.slice(BASE.length));
	const candidates = relative === '' || relative.endsWith('/')
		? [`${relative}index.html`]
		: [relative, `${relative}/index.html`];
	return candidates.find((candidate) => {
		const full = path.join(distDir, candidate);
		return existsSync(full) && statSync(full).isFile();
	});
}

const origin = new URL(SITE).origin;
const SKIPPED_SCHEMES = /^(mailto:|tel:|data:|javascript:|blob:)/i;

for (const file of htmlFiles) {
	const pageUrl = new URL(`${BASE}${file.replace(/(^|\/)index\.html$/, '$1')}`, origin);
	const root = parse(await readFile(path.join(distDir, file), 'utf8'));

	for (const el of root.querySelectorAll('[href], [src]')) {
		// Starlight gives the 404 page a /404/ canonical URL that is never served.
		if (file === '404.html' && el.getAttribute('rel') === 'canonical') continue;
		for (const attr of ['href', 'src']) {
			const raw = el.getAttribute(attr);
			if (raw === undefined || raw === '' || SKIPPED_SCHEMES.test(raw)) continue;
			const url = new URL(raw, pageUrl);
			if (url.origin !== origin) continue; // external link

			const where = `${file}: ${el.tagName.toLowerCase()} ${attr}="${raw}"`;
			if (!url.pathname.startsWith(BASE)) {
				errors.push(`${where} is outside the base path ${BASE}`);
				continue;
			}
			const target = fileFor(url.pathname);
			if (!target) {
				errors.push(`${where} does not resolve to a built file`);
				continue;
			}
			const fragment = decodeURIComponent(url.hash.slice(1));
			if (fragment && target.endsWith('.html') && !(await idsOf(target)).has(fragment)) {
				errors.push(`${where} points to a missing anchor #${fragment}`);
			}
		}
	}
}

if (htmlFiles.length === 0) errors.push('No HTML files found; run the build first.');

if (errors.length > 0) {
	console.error(`check-dist: ${errors.length} problem(s) in ${distDir}`);
	for (const error of errors) console.error(`  - ${error}`);
	process.exit(1);
}
console.log(`check-dist: ${htmlFiles.length} pages, ${files.length} files; links, anchors, and output contents OK.`);
