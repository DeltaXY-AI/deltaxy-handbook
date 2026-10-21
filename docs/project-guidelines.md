# Project Guidelines

## Initial direction

Build a public, read-first DeltaXY Company Handbook, starting with Engineering. Give people and coding agents one place to read and link to the standards.

Use **Astro + Starlight** for the documentation site. Keep the initial implementation static: no application authentication, database, separate backend, or custom content-management system.

This is the initial delivery scope, not the complete collaboration vision in [product.md](product.md). Contextual questions, rich-text proposals, and an application-managed approval workflow are deferred. Readers do not need Markdown or GitHub knowledge; maintainers initially edit Markdown through Git.

## Technology choices

| Area | Recommendation |
| --- | --- |
| Documentation framework | Astro 7 + Starlight |
| Content | Markdown by default; MDX only when a page needs a component |
| Markdown processing | Astro's default Sätteri processor. Build-time Markdown steps are Sätteri hast plugins in `src/plugins/`, not remark/rehype plugins. |
| Reading experience | Starlight navigation, page outlines, and search, styled per the [style guide](styleguide.md); avoid a custom documentation shell |
| Source control | Git repository with reviewed changes |
| Build | Static production output; Node.js 24 (`.node-version`) and pnpm 11.6.0 (`devEngines` in `package.json`); `pnpm-lock.yaml` committed |
| Hosting | GitHub Pages, deployed through GitHub Actions |

The source handbook README lists Next.js as a confirmed engineering direction. Astro + Starlight was accepted as a documentation-specific exception, not a change to the standards for other products. Do not maintain a second implementation.

### Commands

| Command | Purpose |
| --- | --- |
| `pnpm install --frozen-lockfile` | Install exactly the locked dependencies |
| `pnpm dev` | Local preview with live reload (search works only in a production build) |
| `pnpm build` | Production build into `dist/` |
| `pnpm preview` | Serve `dist/` under the production base path |
| `pnpm check:dist` | Fail on broken internal links, anchors, or assets, and on unintended output (Markdown sources, `.env` files, workstation paths) |
| `pnpm check:a11y` | axe WCAG 2.2 AA scan of every built page in light and dark themes, at desktop and 390px widths; needs `pnpm exec playwright install chromium` once |

## Handbook source and navigation

The existing handbook is at `C:/source/business/operations/governance/engineering-handbook`.

| Existing content | Website section |
| --- | --- |
| `README.md` | Engineering introduction |
| `standards/` | Engineering standards |
| `patterns/` | Implementation patterns |
| `templates/` | Project document templates |
| `APPROVAL.md` | Approval status |

For the initial migration, bring the publication-reviewed content into this repository under `src/content/docs/engineering/`. Make that the authoritative home for the published handbook at cutover; do not keep two independently edited copies. The source folder has not been moved or changed by this document.

Preserve rule identifiers, meaningful headings, and approval state. Starlight pages require title frontmatter and use that title as the page heading; adapt the existing top-level headings accordingly. Rewrite Markdown file links to website routes and check heading anchors. Use relative links between pages so they keep working if the base path changes. Keep project planning documents in `docs/`, outside the published content tree.

Standards live under `src/content/docs/engineering/standards/` and must declare `status`, `version`, `owner`, and `decision` frontmatter; the build fails otherwise (`src/routeData.ts`). Write a reference to unpublished guidance as plain text followed by `<span class="hb-unpublished">Not yet published</span>`, never as a link.

CI must build from repository content, not depend on a workstation's `C:/source` path.

## Publication and approval

- Review content for public release before importing it. The existing README includes customer/internal context and a link outside the handbook folder. Do not publish those details or neighboring business documents automatically. Record withheld material in the release record without reproducing it.
- Name roles, not people, on public pages (for example, "DeltaXY technical leadership" as decision authority).
- Preserve visible draft and approved status. The existing handbook is marked as a draft, with approval tracked per standard. Public availability does not mean a standard is approved or adopted.
- Keep approval records associated with the exact reviewed content revision. A repository merge or successful deployment is not, by itself, policy approval.
- Do not invent approval records or label existing products compliant.
- Publish only the intended documentation and assets. Never copy `.env` files, credentials, or internal business files into the static output. Anything shipped to the browser is public.

## Deployment

### Proposed production flow

```mermaid
flowchart LR
    A[Edit handbook in Git] --> B[Pull request and build checks]
    B --> C[Human review]
    C --> D[Merge to main]
    D --> E[GitHub Actions builds static site]
    E --> F[GitHub Pages]
    F --> G[Public readers and agents]
```

Node.js runs during the build; the deployed site serves generated HTML, CSS, JavaScript, and search assets. No application server, container, or database is needed.

### One-time setup

1. Scaffold Astro + Starlight in this repository and import the reviewed handbook content.
2. Commit the dependency lockfile and set the Node.js version consistently for local development and CI.
3. Configure Astro's `site` for the GitHub Pages origin. For a project site hosted under a repository path, set `base` to that path so links and assets resolve correctly.
4. Add a GitHub Actions workflow that installs from the lockfile, builds, runs `pnpm check:dist`, and publishes `dist/` with GitHub's `upload-pages-artifact` and `deploy-pages` actions. Explicit steps replace Astro's `withastro/action` so the output check runs before upload. Give the deployment workflow `contents: read`, `pages: write`, and `id-token: write` permissions.
5. In the repository's Pages settings, select GitHub Actions as the publishing source. Verify Pages availability for the repository's visibility and account plan; a public website does not require making the source repository public.
6. Run checks for pull requests, but deploy production only from the reviewed default branch. Restrict production deployment to that branch.
7. Start with the generated GitHub Pages URL. Add a custom domain and DNS configuration when a domain is selected; update `site` and remove the repository-path `base` when serving at the domain root. Enforce HTTPS.

The repository is `DeltaXY-AI/deltaxy-handbook` (public; the organization's Free plan requires a public repository for Pages). Production URL: https://deltaxy-ai.github.io/deltaxy-handbook/. No custom domain is selected. `main` requires a pull request and the "Build, links, accessibility" check, including for admins; the `github-pages` environment accepts deployments only from `main`.

### Checks before publishing

- Build the production site successfully using the committed lockfile.
- Serve the production output locally and exercise navigation, search, code blocks, and mobile layout.
- Check internal links, heading anchors, template access, and the configured base path.
- Confirm draft/approval labels and review the generated output for unintended public content.
- After deployment, open the actual public URL without a signed-in session and verify a standard page, search, and direct page links.

### Updating and rolling back

Content changes follow the same review and deployment flow as site changes. A failed build must not replace the deployed site. For rollback, revert the problematic change through a reviewed commit and redeploy the previous content and configuration. Preserve approval history rather than rewriting it.

## Current implementation status

Phase 1 is live: the site, workflows (`.github/workflows/checks.yml`, `deploy.yml`), and hosting are in place. The home page, Engineering introduction, and Documentation standard are published. See the [Phase 1 release record](releases/phase-1.md). Other source content is not yet migrated, and no custom domain is configured.

## References

- [Starlight content authoring](https://starlight.astro.build/guides/authoring-content/): Markdown, frontmatter, and heading conventions.
- [Astro deployment to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/): deployment actions, permissions, Pages settings, site/base configuration, and custom domains.
