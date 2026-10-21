# Release record: full content import

| Field | Value |
| --- | --- |
| Date | 2026-10-21 |
| Decision | Handbook owner: publish all source content now; replace client and personal names; keep the site out of search engines |
| Source | `C:/source/business/operations/governance/engineering-handbook` (24 Markdown files, imported once; this repository is now the editable copy) |

## Published

| Source | Route |
| --- | --- |
| `README.md` | `/engineering/` |
| `APPROVAL.md` | `/engineering/approval/` |
| `standards/*.md` (14) | `/engineering/standards/<name>/` |
| `patterns/*.md` (3) | `/engineering/patterns/<name>/` |
| `templates/*.md` (5) | `/engineering/templates/<name>/` |

Every page is shown as Draft. Standards and patterns show "Deferred for detailed review", matching the approval register, and the introduction shows "Pending approval". Rule IDs and headings are unchanged.

## Changes from the source

- The named client is replaced with generic client wording ("a client", "one client", "client governance"), as are the client framework and internal application names.
- The personal approver's name is replaced with "the decision authority" or "DeltaXY technical leadership". "**Satish:**" approval prompts became "**Decision requested:**".
- Links to files outside the handbook folder became plain text. Links between handbook files became site links.
- Each file's metadata list became page frontmatter (status, version, owner). Other metadata lines (applicability, interpretation, use when, scope) stay as bold lead-ins at the top of the page.

## Search engines

Every page carries `<meta name="robots" content="noindex, nofollow">`. The repository and site remain public; anyone with the link can read them.
