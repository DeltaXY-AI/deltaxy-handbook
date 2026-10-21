# Style Guide

## Purpose

Define the reading experience for the public DeltaXY Handbook: calm, precise, and fast to scan. The direction draws on the documentation patterns of Vercel and Linear without copying their brands.

This guide applies to the Astro + Starlight site described in [project-guidelines.md](project-guidelines.md). [Example screen](examples/standard-page.html) shows the design applied to a standard page.

**Status:** proposed. No DeltaXY brand palette, logo, or typography has been established. Colors, fonts, and the text wordmark below are proposals until accepted by the handbook owner. This applies the source handbook's draft visual standard (VIS-01).

## Design direction

| Borrow | From | Handbook use |
| --- | --- | --- |
| Neutral monochrome surfaces, hairline borders, minimal shadow | Vercel | Content carries the page; color is reserved for meaning |
| Three-column layout: section navigation, reading column, “On this page” | Both | Starlight's native layout, restyled |
| Compact 13–14px navigation and metadata; tight heading tracking | Linear | Dense navigation without crowding the reading column |
| Underlined, text-colored links | Vercel | Links remain obvious without a loud accent |
| “Copy page” action in the page header | Both | Engineers and coding agents can take the exact Markdown of a page |
| Search field with keyboard shortcut in the header | Vercel | Starlight's Pagefind search, restyled |

Do not reuse Vercel or Linear logos, icons, illustrations, product imagery, or exact page compositions. Avoid marketing treatments on handbook pages: hero banners, gradients, decorative illustrations, and oversized calls to action.

## Principles

1. **Reading first.** A standard page is a document, not a landing page. The rules appear within the first screen.
2. **Status is never ambiguous.** Draft, approved, and superseded are distinct, labelled in text, and visible before the rules. Color is never the only cue.
3. **One accent, used sparingly.** The accent marks focus, the current location, and primary actions. Links use text color with an underline.
4. **Stable references.** Rule IDs, headings, and URLs are designed to be linked and quoted.
5. **No custom shell.** Customize through Starlight CSS properties, Expressive Code configuration, and a small number of component overrides.

## Layout

| Region | Desktop (≥ 72rem) | Tablet (50–72rem) | Mobile (< 50rem) |
| --- | --- | --- | --- |
| Header | 64px; wordmark, section link, search, theme toggle | Same | 56px; wordmark, search icon, menu button |
| Sidebar | 17rem, page background, right hairline | 17rem | Menu overlay |
| Reading column | 45rem maximum | Fills remaining width | Full width, 1rem padding |
| “On this page” | 14rem right column, sticky | Collapsible bar above content | Collapsible bar above content |

These breakpoints are Starlight's own (`50em` and `72rem`). Keep them rather than introducing a second responsive system.

## Color tokens

Semantic tokens follow the visual standard's presentation contract (VIS-02). Both themes are supported; the site follows the reader's system setting and offers a manual toggle.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--hb-bg` | `#ffffff` | `#0a0a0a` | Page, sidebar, header |
| `--hb-bg-subtle` | `#fafafa` | `#111111` | Code blocks, callouts, table headers |
| `--hb-bg-hover` | `#f2f2f2` | `#1c1c1c` | Navigation hover and current item |
| `--hb-border` | `#ebebeb` | `#262626` | Hairlines, table rows, panels |
| `--hb-border-strong` | `#d4d4d4` | `#3d3d3d` | Inputs, buttons, link underline |
| `--hb-text` | `#171717` | `#ededed` | Headings and body text |
| `--hb-text-muted` | `#5c5c5c` | `#a1a1a1` | Descriptions, metadata, navigation |
| `--hb-accent` | `#0059d1` | `#52a8ff` | Focus ring, current navigation marker, primary button |
| `--hb-draft-text` / `--hb-draft-bg` | `#8a4b00` / `#fff4e0` | `#ffb84d` / `#2b1d07` | Draft status |
| `--hb-approved-text` / `--hb-approved-bg` | `#0f6b3a` / `#e8f8ee` | `#5ee08f` / `#0c2416` | Approved status |
| `--hb-superseded-text` / `--hb-superseded-bg` | `#5c5c5c` / `#f2f2f2` | `#a1a1a1` / `#1c1c1c` | Superseded status |

Every foreground/background pair above must meet WCAG 2.2 AA contrast (4.5:1 for text). This is the source UX standard's proposed accessibility target (UX-05). Verify actual rendered pairs again after implementation.

### Starlight mapping

Implement the tokens in `src/styles/theme.css`, registered through Starlight's `customCss` option. Map them onto Starlight's properties so built-in components inherit them:

```css
:root {
  --sl-color-black: var(--hb-bg);            /* page background */
  --sl-color-white: var(--hb-text);          /* headings */
  --sl-color-text: var(--hb-text);
  --sl-color-gray-2: var(--hb-text);
  --sl-color-gray-3: var(--hb-text-muted);
  --sl-color-gray-5: var(--hb-border);
  --sl-color-gray-6: var(--hb-bg-subtle);
  --sl-color-bg-nav: var(--hb-bg);
  --sl-color-bg-sidebar: var(--hb-bg);
  --sl-color-hairline: var(--hb-border);
  --sl-color-hairline-light: var(--hb-border);
  --sl-color-accent: var(--hb-accent);
  --sl-color-text-accent: var(--hb-text);
}
```

Starlight inverts its gray scale between dark and light themes. Define the `--hb-*` values under `:root` (dark) and `:root[data-theme='light']` (light) and keep the mapping unchanged.

## Typography

| Role | Size / line height | Weight | Tracking |
| --- | --- | --- | --- |
| Page title (desktop) | 40px / 1.1 | 600 | -0.035em |
| Page title (mobile) | 32px / 1.15 | 600 | -0.03em |
| Lead description | 18px / 1.6 | 400, muted | 0 |
| H2 | 24px / 1.3 | 600 | -0.02em |
| H3 | 18px / 1.4 | 600 | -0.01em |
| Body | 16px / 1.7 | 400 | 0 |
| Navigation, table text | 14px / 1.5 | 400; 500 when current | 0 |
| Metadata, labels | 13px / 1.4 | 500 | 0 |
| Code | 14px / 1.6 (13px inline) | 400 | 0 |

**Proposed fonts:** Geist Sans and Geist Mono, released by Vercel under the SIL Open Font License. Self-host the font files with the site so pages do not depend on a third-party font service. Set `--sl-font` and `--sl-font-mono`; keep Starlight's system font stacks as fallbacks. Inter is an acceptable alternative if Geist is too closely associated with Vercel's identity.

- Use sentence case for headings and navigation labels.
- Keep the 45rem reading column; do not widen it to fit tables.
- Use numerals and ISO dates (`2026-10-20`), matching the source handbook.

## Components

### Header

- Text wordmark: **DeltaXY Handbook** at 15px, weight 600. Do not create a logo until brand assets exist.
- Section link: **Engineering**. Add other sections only when they have content.
- Search trigger: bordered field labelled “Search handbook” with a `Ctrl K` / `⌘ K` hint, opening Starlight's search dialog.
- Theme toggle: icon button with an accessible name.

### Sidebar

- Group labels at 12px, weight 500, muted, sentence case.
- Items at 14px, muted; hover uses `--hb-bg-hover`.
- Current page: text color, weight 500, `--hb-bg-hover` background, and `aria-current="page"` (Starlight provides this).
- Reflect only published pages. Never add placeholders for unpublished standards.

### Page header

Implemented as a `PageTitle` component override reading the page's data:

1. Breadcrumb: `Engineering / Standards`, 13px muted.
2. Title.
3. Lead description from `description` frontmatter.
4. Metadata row: status badge, version, owner role, decision summary.
5. Actions: **Copy page** (exact page Markdown) and **View Markdown**. Both use the published content; never maintain a second copy.

Status, decision, version, and owner start as required frontmatter (roadmap Phase 1). From Phase 2, status and decision come from the structured approval register, so the badge, metadata row, approval record, and Approval status page share one source; version and owner stay in frontmatter. The build fails when a standard has no status. Copy page and View Markdown arrive with the generated Markdown output in Phase 4.

### Status badges

| Status | Label | Meaning |
| --- | --- | --- |
| Draft | `Draft` with a hollow-circle icon | Not binding. Shown with the recorded decision, such as “Deferred for detailed review”. |
| Approved | `Approved` with a check icon | Approved for the exact published revision. Shown with approver and date. |
| Superseded | `Superseded` with an arrow icon | Replaced; links to the replacement. |

Badges are 22px tall, 12px text, weight 500, 6px radius, with a 1px border in the status color at reduced opacity. Do not show product adoption or compliance status on the handbook; that belongs to each product's project profile.

### Draft notice

Every draft standard begins with a single notice below the page header:

> **Draft — not binding.** MUST becomes binding only after approval and adoption.

Use the subtle background, a 1px border, and the draft icon. Do not repeat the notice inside sections.

### Rules table

The source standards use `ID | Rule | Verification` tables. Keep them as Markdown tables; style them for scanning:

- Rule ID column: monospace 13px, no wrapping, weight 500.
- Header row: 12px, weight 500, muted, `--hb-bg-subtle` background.
- Rows: hairline separators, no zebra striping, top-aligned cells.
- Verification column: muted text.
- Wrap tables in a bordered, 8px-radius container that scrolls horizontally on narrow screens rather than overflowing the page.
- Make each rule ID linkable (`#doc-05`) through a small build-time Markdown processing step, so readers and agents can cite one rule.

### Callouts

Map Starlight asides to restrained bordered panels: `--hb-bg-subtle` background, 1px border, 8px radius, icon plus bold lead word. Use `note` for context and `caution` for draft or adoption limits. Reserve `danger` for security or data-loss consequences.

### Links and references

- Body links: text color, 1px underline in `--hb-border-strong`, 3px offset. Hover changes the underline to the text color.
- References to unpublished guidance: plain text followed by a `Not yet published` label. Never link to a missing page.
- External links open in the same tab.

### Code blocks

Use Starlight's Expressive Code: `--hb-bg-subtle` background, 1px border, 8px radius, file or terminal title bar, and copy button. Configure neutral light and dark syntax themes that work with the tokens above.

### Approval record

End each standard with an **Approval record** panel showing:

- Current decision and date.
- Decision authority.
- Exact reviewed revision (commit or version), when approved.
- Link to the approval register.

When no approval exists, state **No approval recorded**. Never leave the panel blank or imply approval.

### Footer navigation

Starlight's previous/next links styled as bordered cards with a muted direction label and text-colored page title. Show “Last updated” from Git history and the deployed revision.

## Interaction and accessibility

- Proposed target: WCAG 2.2 AA (UX-05).
- Focus: 2px `--hb-accent` outline with 2px offset on every interactive element. Never remove outlines without replacement.
- Pointer targets at least 24×24px; header controls 32×32px.
- Keep Starlight's skip link, landmarks, and keyboard search shortcut.
- Pages reflow at 320px width and 200% zoom without losing status, rules, or actions.
- Motion: 120–150ms color and background transitions only; none when the reader prefers reduced motion.
- Shadows only for overlays such as search and the mobile menu.

## Writing

- Lead with what the page governs, then the rules. The lead description is one sentence.
- Use MUST, SHOULD, and MAY in capitals only in their normative sense.
- Keep rule IDs stable when wording is clarified.
- Use the status vocabulary exactly: Draft, Approved, Superseded. Do not say “published” when you mean “approved”.
- Use synthetic examples. Never include customer names, credentials, or internal paths in public pages.
- Prefer short paragraphs and tables over long bullet lists. Avoid emoji.

## Example screen

[`examples/standard-page.html`](examples/standard-page.html) is a static mock-up of the Documentation standard page in light and dark themes, showing the target state after roadmap Phase 4: complete standards catalogue, approval record, and Markdown actions. Templates remain unpublished until Phase 5. It demonstrates layout, tokens, typography, status, rules table, and approval record. It is not the production site: search, copy, and navigation are not wired up, and the excerpted content is still subject to publication review.

Open it directly in a browser. It loads Geist from Google Fonts for convenience; the production site self-hosts its fonts.
