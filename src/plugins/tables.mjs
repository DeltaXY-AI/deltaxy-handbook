/**
 * Sätteri hast plugin for Markdown content:
 *  - Wraps every table in a keyboard-focusable, labelled region that scrolls horizontally on
 *    narrow screens instead of overflowing the page.
 *  - Marks rule tables (header row starting with an `ID` column) with the `hb-rules` class so
 *    they can be styled for scanning.
 *  - Gives read-only task-list checkboxes (`- [ ] item`) the item text as their accessible name.
 *
 * @type {import('@astrojs/markdown-satteri').SatteriProcessorOptions['hastPlugins'][number]}
 */
export const tables = {
	name: 'hb-tables',
	element: [
		{
			filter: ['input'],
			visit(input, ctx) {
				if (input.properties.type !== 'checkbox') return;
				const item = ctx.parent(input);
				const label = item ? ctx.textContent(item).trim() : '';
				if (label) ctx.setProperty(input, 'ariaLabel', label);
			},
		},
		{
			filter: ['table'],
			visit(table, ctx) {
				const thead = table.children.find((child) => child.tagName === 'thead');
				const row = thead?.children.find((child) => child.tagName === 'tr');
				const headers = (row?.children ?? []).filter((child) => child.tagName === 'th');
				const headerText = headers.map((header) => ctx.textContent(header).trim());

				if (headerText[0] === 'ID') {
					ctx.setProperty(table, 'className', [...(table.properties.className ?? []), 'hb-rules']);
				}

				ctx.wrapNode(table, {
					type: 'element',
					tagName: 'div',
					properties: {
						className: ['hb-table-wrap'],
						role: 'region',
						tabIndex: 0,
						ariaLabel: `Table: ${headerText.join(', ')}`,
					},
					children: [],
				});
			},
		},
	],
};
