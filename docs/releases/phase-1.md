# Release record: Phase 1 (live handbook with one real standard)

| Field | Value |
| --- | --- |
| Date | 2026-10-21 |
| Production URL | https://deltaxy-ai.github.io/deltaxy-handbook/ |
| Repository | https://github.com/DeltaXY-AI/deltaxy-handbook (public) |
| Deployed commit | `085d019` (site content and configuration after the rollback drill) |
| Production workflow run | [Deploy 39563961386](https://github.com/DeltaXY-AI/deltaxy-handbook/actions/runs/39563961386) |
| Toolchain | Node.js 24, pnpm 11.6.0, Astro 7.4.1, Starlight 0.42.6 |

Later commits that change only `docs/` redeploy identical site output.

## Entry decisions

| Decision | Outcome |
| --- | --- |
| PRE.01 framework | Astro + Starlight accepted as the documentation-specific exception. |
| PRE.02 repository | `DeltaXY-AI/deltaxy-handbook`, public. The organization is on the Free plan, so GitHub Pages requires a public repository. Planning documents in `docs/` are therefore public too. |
| PRE.03 publication review | The handbook owner (DeltaXY technical leadership) directed that Phase 1 content be published as read-only and reviewed after publication. The redactions below were applied before import. |
| PRE.04 visual design | Style guide colors, self-hosted Geist Sans and Geist Mono, and the text wordmark accepted as proposed. |

## Published content

| Page | Route | Source |
| --- | --- | --- |
| Home | `/` | New |
| Engineering handbook (introduction) | `/engineering/` | Public-safe subset of the source `README.md` |
| Documentation and specification standard | `/engineering/standards/documentation/` | Source `standards/documentation.md` |

The rule IDs DOC-01 to DOC-11, their wording, the status (Draft), and the decision (Deferred for detailed review, from the source approval register) are preserved. Headings keep their anchors.

### Changes for public release

- Personal names are replaced by roles. The decision authority and requester are shown as "DeltaXY technical leadership".
- The rule that MUST becomes binding only after approval and adoption now appears in the page's draft notice instead of being repeated under "Proposed rules".
- Links to unpublished templates (product, architecture, change evidence) are shown as "Not yet published" text. The roadmap link in DOC-04 is plain text, as in the reviewed mock-up.
- "Applies to" moved from the metadata list to the first paragraph. The "Prepared" date is not shown.

None of these wording changes inherits approval. The standard is still a non-binding draft.

### Withheld content

These were not published. This record does not reproduce them.

| Source | Withheld material | Reason | Planned |
| --- | --- | --- | --- |
| `README.md` | "Confirmed direction versus proposed policy" section | Names a customer and customer-specific infrastructure | Not planned; needs a public-safe rewrite by the owner |
| `README.md` | Reference to an existing customer governance framework, including a link outside the handbook folder | Customer-specific; target is outside the handbook | Replaced by a generic sentence about existing customer commitments |
| `README.md` | "Read by task" table | Links to standards that are not yet published | Phase 3 |
| `README.md` | Adoption, OpenSpec integration, and the templates and patterns list | Depend on unpublished templates and the approval register | Phase 5 (adoption guidance) |
| `README.md` | Draft verification record | Internal process record | Not planned |
| `APPROVAL.md` | Approval register | Out of scope for Phase 1 | Phase 2 |

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| Pull-request checks: lockfile install, production build, link, anchor and output check, axe WCAG 2.2 AA scan (4 pages × light/dark × 1280px/390px) | Pass | [Checks 39563537906](https://github.com/DeltaXY-AI/deltaxy-handbook/actions/runs/39563537906), [Checks 39563823914](https://github.com/DeltaXY-AI/deltaxy-handbook/actions/runs/39563823914) |
| P1.14: link check fails on a broken link | Pass. PR #1 added a link to a missing route and a missing anchor. The check reported both, merging was blocked, and the PR was closed unmerged. | [Checks 39563373620](https://github.com/DeltaXY-AI/deltaxy-handbook/actions/runs/39563373620) |
| P1.07: a standard without `status` fails the build | Pass, locally and in CI. | [Deploy 39564122939](https://github.com/DeltaXY-AI/deltaxy-handbook/actions/runs/39564122939) |
| P1.16: built output contains no planning documents, environment files, Markdown sources, or workstation paths | Pass (`pnpm check:dist`, run on every pull request and deploy) | Same runs |
| Production deploys only from `main` | Pages source is GitHub Actions. The `github-pages` environment allows only `main`. The workflow has `contents: read`, `pages: write`, `id-token: write`. | Repository settings |
| `main` protection | Requires a pull request and the "Build, links, accessibility" check, also for admins. Linear history; no force pushes or deletions. | Repository settings |

### Phase 1 acceptance on the public URL

These were checked in a fresh Playwright Chromium session with no signed-in state, at 1440px and 390px, in light and dark themes: 41 of 41 checks passed.

| Acceptance check | Result |
| --- | --- |
| Home page and Documentation standard load over HTTPS, including by direct URL | Pass |
| Searching "authoritative home" finds and opens the Documentation standard | Pass |
| Draft badge, "Deferred for detailed review", and draft notice are shown | Pass |
| Layout has no horizontal overflow; the theme follows the system setting, and the toggle switches it on desktop and in the mobile menu; keyboard focus shows a 2px accent outline | Pass |
| The copied heading link `#proposed-rules` opens the section in a new page | Pass |

### Rollback drill (P1.18)

| Step | Commit | Workflow | Production result |
| --- | --- | --- | --- |
| Baseline | `337f9de` | [Deploy 39563261707](https://github.com/DeltaXY-AI/deltaxy-handbook/actions/runs/39563261707) | Initial site |
| Harmless visible change, PR #2 | `cb2e210` | [Deploy 39563676166](https://github.com/DeltaXY-AI/deltaxy-handbook/actions/runs/39563676166) | Home page showed the drill sentence |
| Reviewed revert, PR #3 | `085d019` | [Deploy 39563961386](https://github.com/DeltaXY-AI/deltaxy-handbook/actions/runs/39563961386) | Drill sentence gone; previous text served |
| Failing build: `drill/failing-build`, standard without `status`, deploy dispatched | `6ce4fac` | [Deploy 39564122939](https://github.com/DeltaXY-AI/deltaxy-handbook/actions/runs/39564122939) | Build failed and deploy was skipped. Production ETag `"6ad86d37-893a"` was unchanged before and after. The environment rule would also reject a non-`main` deployment. |

## Known limits

- The initial commit `337f9de` was pushed directly to `main` to bootstrap the repository, before branch protection and pull-request checks existed. Every later change went through a pull request.
- Pull requests need no approving review because there is one maintainer. Changes are reviewed by the author before merge.
