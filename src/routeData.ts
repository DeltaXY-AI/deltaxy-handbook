import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

/** Pages under this prefix are standards and must declare their approval metadata. */
const STANDARDS_PREFIX = 'engineering/standards/';
const REQUIRED_STANDARD_FIELDS = ['status', 'version', 'owner', 'decision'] as const;

/** Fails the build when a standard omits its status or other required metadata. */
export const onRequest = defineRouteMiddleware((context) => {
	const { entry } = context.locals.starlightRoute;
	if (!entry.id.startsWith(STANDARDS_PREFIX)) return;

	const missing = REQUIRED_STANDARD_FIELDS.filter((field) => !entry.data[field]);
	if (missing.length > 0) {
		throw new Error(
			`Standard "${entry.id}" is missing required frontmatter: ${missing.join(', ')}.`,
		);
	}
});
