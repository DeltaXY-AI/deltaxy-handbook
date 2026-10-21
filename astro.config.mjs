// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { satteri } from '@astrojs/markdown-satteri';
import { tables } from './src/plugins/tables.mjs';
import { BASE, SITE } from './site.config.mjs';

export default defineConfig({
	site: SITE,
	base: BASE,
	trailingSlash: 'always',
	markdown: {
		processor: satteri({ hastPlugins: [tables] }),
	},
	integrations: [
		starlight({
			title: 'DeltaXY Handbook',
			description:
				'The public DeltaXY Handbook: engineering standards for people and coding agents.',
			customCss: [
				'@fontsource-variable/geist/wght.css',
				'@fontsource-variable/geist-mono/wght.css',
				'./src/styles/theme.css',
			],
			components: {
				SiteTitle: './src/components/SiteTitle.astro',
				ThemeSelect: './src/components/ThemeSelect.astro',
				PageTitle: './src/components/PageTitle.astro',
				Search: './src/components/Search.astro',
			},
			routeMiddleware: './src/routeData.ts',
			expressiveCode: {
				themes: ['github-dark-default', 'github-light-default'],
				styleOverrides: {
					borderRadius: '8px',
					borderColor: 'var(--hb-border)',
					codeBackground: 'var(--hb-bg-subtle)',
					codeFontFamily: 'var(--sl-font-mono)',
					codeFontSize: '14px',
					codeLineHeight: '1.6',
					uiFontFamily: 'var(--sl-font)',
					frames: {
						editorTabBarBackground: 'var(--hb-bg-subtle)',
						editorActiveTabBackground: 'var(--hb-bg-subtle)',
						editorActiveTabIndicatorTopColor: 'transparent',
						editorActiveTabIndicatorBottomColor: 'var(--hb-border-strong)',
						editorTabBarBorderBottomColor: 'var(--hb-border)',
						terminalTitlebarBackground: 'var(--hb-bg-subtle)',
						terminalTitlebarBorderBottomColor: 'var(--hb-border)',
						terminalBackground: 'var(--hb-bg-subtle)',
						frameBoxShadowCssValue: 'none',
					},
				},
			},
			sidebar: [
				{ label: 'Introduction', slug: 'engineering' },
				{
					label: 'Standards',
					items: [{ label: 'Documentation', slug: 'engineering/standards/documentation' }],
				},
			],
		}),
	],
});
