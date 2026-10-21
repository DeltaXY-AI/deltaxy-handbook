---
title: "Handbook approval register"
sidebar:
  label: "Approval status"
status: "Draft"
version: "0.1"
decision: "Deferred for detailed review"
---

**Decision authority for shared policy:** DeltaXY technical leadership

## How to review

Each file explains its purpose, tradeoffs, rule IDs, and required evidence. Read the explanation here first, then the linked standard. Respond with **approve**, **revise**, or **defer**, naming the standard and requested change. Approval can be individual or by an explicitly named group. An unanswered approval request remains pending.

Confirmed tool choices are recorded facts, not blanket approval of every proposed MUST. Handbook approval also does not mean a project has implemented the controls. Project adoption and production approval remain separate.

## Individual standards

| Standard | What you would approve | Why / main tradeoff | Decision |
| --- | --- | --- | --- |
| [Architecture](../standards/architecture/) | Concrete hexagonal dependency rules, UI-independent use cases, explicit external seams and composition | Makes adapters replaceable and testing direct; avoids an interface for every helper | Deferred for detailed review |
| [TypeScript and coding](../standards/typescript/) | Naming, typing, validation, error/async behavior, dependencies and maintainability rules | Reduces inconsistent generated code; some rules need human judgment rather than lint | Deferred for detailed review |
| [Next.js](../standards/nextjs/) | Framework adapter placement, server/client security, scoped caching, hosting lifecycle constraints | Keeps Next.js convenient without putting business logic or long-running ownership in request handlers | Deferred for detailed review |
| [Interfaces](../standards/interfaces/) | HTTP/WebSocket contracts, errors, compatibility, reconnect and permission behavior | Stable behavior across callers; does not force every product to expose a public API | Deferred for detailed review |
| [Storage](../standards/storage/) | SQL/file behavioral guarantees, conflict handling, migrations, partial-failure recovery | Flexible schemas remain allowed; files must not silently lose correctness guarantees | Deferred for detailed review |
| [UX](../standards/ux/) | User journeys, interaction states, accessibility, consequential-action clarity | Tests usability-related behavior; human walkthroughs still necessary | Deferred for detailed review |
| [Visual system](../standards/visual/) | Shared shadcn/Tailwind components and tokens, customer themes, consistent copy | Brand variation without duplicating the application; controlled exceptions for new patterns | Deferred for detailed review |
| [Identity and security](../standards/identity-security/) | Entra/Better Auth profiles plus authorization, engagement isolation, secrets and customer data controls | Authentication alone is insufficient; real security evidence adds work | Deferred for detailed review |
| [AI execution](../standards/ai-execution/) | Pi capability profiles, scoped tools, job lifecycle and generated-code isolation | Preserves in-process simplicity while making side effects and unsafe execution explicit | Deferred for detailed review |
| [Testing](../standards/testing/) | Behavior-focused automated checks plus real application smoke evidence | More repeatable than manual-only testing; avoids meaningless coverage targets | Deferred for detailed review |
| [AI evaluation](../standards/evaluation/) | Human-reviewed corpus, leakage-aware heldout assessment, bounded optimisation and reviewed promotion | Improves claims and regression detection; slows uncontrolled prompt/model promotion | Deferred for detailed review |
| [Observability](../standards/observability/) | Portable OpenTelemetry, application/AI correlation, customer-content controls and cost visibility | Supports diagnosis but full-content traces create another sensitive data store | Deferred for detailed review |
| [Delivery](../standards/delivery/) | Reviewed reproducible releases, CI evidence, customer overlays, rollback and technical promotion approval | GitHub defaults do not override a client's existing approved processes | Deferred for detailed review |
| [Documentation](../standards/documentation/) | Defined product/architecture/roadmap/profile contents, one authoritative home, traceable evidence | Prevents documentation drift without treating formatting as proof | Deferred for detailed review |

## Approval groups for convenience

These groups are review shortcuts, not additional policies:

1. **Code and architecture:** Architecture, TypeScript, Next.js, Interfaces, Storage.
2. **Experience:** UX, Visual system.
3. **Security and AI operations:** Identity and security, AI execution, Observability.
4. **Proof and governance:** Testing, AI evaluation, Delivery, Documentation; associated templates and patterns.

No group is approved. All four groups have an explicit deferral recorded below. If a later group approval includes a named exception, record it in the affected row rather than marking everything approved.

## High-impact proposed changes to current practice

### Generated code isolation

Current fact: generated code/shell can run inside the application container. Proposed change: an approved separate restricted execution environment before production use of that capability. Merely packaging the application in Docker does not protect its credentials and client data from generated code.

Decision needed: approve the isolation requirement. The technology is a project decision after a threat review, not a preselected vendor.

### Testing and held-out evaluation

Current fact: verification is mostly manual; human review of initial runs will build the golden corpus. Proposed change: declared automated behavioral gates, browser smoke evidence, a leakage-aware development/held-out split, and technical approval before AI behavior changes reach production.

Decision needed: approve the evidence requirements. Exact test tools, dataset sizes and thresholds must be justified per product, not fabricated here.

### Full-content telemetry

Confirmed choice: full content in the customer environment. Proposed conditions: filter secrets, restrict access and exports, follow contractual retention/deletion, and keep inference-provider data paths separate. No unapproved cross-customer dataset reuse.

Decision needed: approve those conditions. Observability backend selection is still open.

### Existing customer commitments

Current recorded client framework includes approved Azure/DevOps processes and security review obligations. Proposed rule: use project-specific overlays and resolve conflicts; do not silently replace these with GitHub Actions or generic policy.

Decision needed: approve this precedence rule. Verify current contracts during product adoption; this handbook is not a legal determination.

## Open implementation choices, not hidden defaults

- Observability backend and supported exporter profiles.
- Generated-code sandbox implementation and escape/permission tests.
- File-record write ownership, atomicity, conflict detection and recovery per product.
- Runtime versions, formatting/lint/test tools, API contract approach, CI thresholds per product.
- Customer-specific provider approvals, inference processing locations, retention and recovery objectives.
- Named role holders and check commands in each project profile.

An open choice is not permission to omit the relevant required behavior. An affected capability must satisfy the adopted rules or have a valid authorised exception before release.

## Decision history

| Date | Version and scope | Decision | Source / revisions requested |
| --- | --- | --- | --- |
| 2026-10-20 | v0.1 — Code and architecture: five standards | Deferred for detailed review | The decision authority selected “Defer for detailed review” in the approval questions; no specific revision requested. |
| 2026-10-20 | v0.1 — Experience: two standards | Deferred for detailed review | The decision authority selected “Defer for detailed review”; no specific revision requested. |
| 2026-10-20 | v0.1 — Security and AI operations: three standards | Deferred for detailed review | The decision authority selected “Defer for detailed review”; no specific revision requested. |
| 2026-10-20 | v0.1 — Proof and governance: four standards, templates and patterns | Deferred for detailed review | The decision authority selected “Defer for detailed review”; no specific revision requested. |

No approvals recorded. Do not infer approval from continued discussion or agreement on technology choices. All standards remain non-binding drafts pending an explicit later decision.

## Review outcome

Drafting and document checks establish only that the handbook is reviewable. They do not demonstrate application compliance, installed CI enforcement, security certification, or production readiness.
