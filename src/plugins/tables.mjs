/**
 * Sätteri hast plugin for Markdown tables:
 *  - Wraps every table in a keyboard-focusable, labelled region that scrolls horizontally on
 *    narrow screens instead of overflowing the page.
 *  - Marks rule tables (header row starting with an `ID` column) with the `hb-rules` class so
 *    they can be styled for scanning.
 *
 * @type {import('@astrojs/markdown-satteri').SatteriProcessorOptions['hastPlugins'][number]}
 */
export const tables = {
	name: 'hb-tables',
	element: {
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
};
