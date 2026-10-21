---
title: "DeltaXY Engineering Handbook"
status: "Draft"
version: "0.1"
owner: "DeltaXY technical leadership"
decision: "Pending approval"
---

**Scope:** reusable product-engineering standards; not customer-facing contractual terms

## Purpose

Give people and coding agents one reviewable standard for how DeltaXY designs, builds, verifies, and operates products. This is an approval draft, not a claim that existing products comply or that the proposed controls already exist.

A **standard** defines a required outcome. A **pattern** describes a reusable approach and its limits. A **project profile** records product-specific choices. A **specification** defines observable product behavior. Keep these meanings separate.

In these documents, MUST means mandatory **after the relevant standard is approved and adopted**. SHOULD means the preferred approach; departures require an explanation. MAY is optional. Every standard below remains pending independently until the approval register records the decision authority's decision. Approval of one file does not approve another.

## Confirmed direction versus proposed policy

The baseline comes from the decision authority's answers in the handbook discussion on 2026-10-20:

- TypeScript, Next.js, hexagonal architecture, UI-agnostic application capabilities, Docker.
- Customer-dependent hosting; dedicated customer deployments with internal client/engagement access controls.
- SQL Server plus emerging file-backed records; Azure Blob and Azure Files currently used. File-record consistency is not yet standardised.
- In-process execution initially where appropriate, separate execution in some applications, WebSockets for live interaction.
- Pi SDK for AI, multiple direct model providers, per-agent permissions.
- Entra ID for one client; Better Auth otherwise. Roles, engagement membership, separate approval authority, service/agent identities.
- shadcn/ui and Tailwind, shared components with customer themes.
- OpenTelemetry planned for application and Pi execution; full-content traces in the customer environment; backend unchosen.
- Initial agent runs reviewed by humans to build a golden dataset. Automated evaluations, hill climbing, and browser checks are desired; current verification is mostly manual.
- Data lifecycle determined by customer contracts. GitHub and GitHub Actions as the shared default. DeltaXY technical reviewer approves production changes.

The precise rules, automated gates, review mechanics, held-out evaluations, and sandbox controls in this handbook are **proposals**. They are not implied customer commitments.

## Read by task

| Work | Read before planning or editing |
| --- | --- |
| Any feature or substantive change | Product profile and product brief; [architecture](standards/architecture/), [TypeScript](standards/typescript/), [testing](standards/testing/), [documentation](standards/documentation/) |
| Next.js routes, rendering, caching, server actions | [Next.js](standards/nextjs/) |
| UI behavior or layout | [UX](standards/ux/), [visual system](standards/visual/) |
| HTTP, WebSockets, or public interfaces | [interfaces](standards/interfaces/) |
| Database, files, uploads, migrations | [storage](standards/storage/), [identity and security](standards/identity-security/) |
| Authentication, permissions, data exposure | [identity and security](standards/identity-security/) |
| AI tools, execution, prompts, providers | [AI execution](standards/ai-execution/), [evaluation](standards/evaluation/) |
| Logs, metrics, traces | [observability](standards/observability/) |
| CI, dependencies, deployment, production change | [delivery](standards/delivery/) |

Use the relevant paths rather than loading the entire handbook into every agent session. A tool's generated instructions do not replace these standards.

## What belongs where

| Authoritative location | Owns | Does not own |
| --- | --- | --- |
| This handbook | Shared engineering rules and approval state | Customer-specific endpoints, secrets, project requirements |
| Product `docs/product.md` | Purpose, users, outcomes, scope, evidence | Detailed per-feature test scenarios |
| Product `docs/architecture.md` | Current accepted design and significant constraints | Every source filename or API field |
| Product `docs/roadmap.md` | Future outcomes and sequencing | Claims that planned features already exist |
| Product `docs/project-profile.md` | Adopted handbook version, tool choices, obligations, exceptions, checks | Copies of shared rules |
| Product `openspec/specs/` | Maintained observable capability requirements | Future roadmap commitments |
| Product `openspec/changes/` | Proposed requirement changes, design, tasks, verification evidence | Unreviewed changes to shared policy |
| Executable contracts and configuration | Actual API schemas, tokens, static rules, test definitions | Product rationale |

Each fact or rule has one authoritative home. Link to it instead of copying it. Architecture snapshots describe current design; pending changes remain explicitly proposed until accepted.

## Ownership and precedence

1. Applicable law, signed customer obligations, and approved customer security requirements constrain each deployment. A handbook approval cannot waive them.
2. The adopted handbook release sets the common baseline. Customer overlays add requirements; they do not silently weaken that baseline.
3. Record a proposed departure as an exception with rule ID, scope, rationale, risk, compensating control, approver, and review/expiry trigger. No agent self-approves exceptions.
4. If requirements conflict, stop the affected action and obtain an authorised resolution. Do not silently choose the easier or merely newer document.

The existing client governance framework records client-approved development environments, Azure/DevOps source and release processes, security scans, and human approval before downstream updates. The new GitHub default does not migrate or supersede those commitments. Verify applicable current customer terms when adopting this handbook.

## Adoption

1. The decision authority reviews [approval register](approval/), approving, revising, or deferring standards individually. Preserve decisions and their scope.
2. Publish an approved version through a reviewed commit/tag in a central standards repository. This folder is currently the Business-context draft; no central remote repository has been created.
3. Each product pins a release or commit and makes its exact content available to people, agents, and CI through a versioned checkout or dependency. A link to a moving branch alone is not a pin.
4. Complete the [project profile](templates/project-profile/). Record applicability, existing customer controls, and migration gaps before claiming adoption.
5. Implement the agreed checks and inspect their output. An intended check is not an installed check. Map rule IDs to evidence or approved exceptions.
6. For existing products, scope remediation and release gates explicitly. Do not label them compliant from documentation alone. Address unsafe access or execution before enabling the affected capability.
7. Review handbook upgrades in a separate adoption change. Do not silently update policy underneath in-flight feature work.

## OpenSpec integration

- Put concise context and task-triggered links to the pinned handbook and project documents in `openspec/config.yaml`.
- During proposal creation, identify applicable standards and derive concrete behavior/acceptance criteria. During design, document compliance and any unresolved exception. During task creation, include verification work.
- Standards cannot be satisfied solely by a checkbox saying "read the handbook". Include rule-specific evidence in the review record.
- Enable and use verification before archiving. OpenSpec's current project-config documentation says artifact `rules` do not reach `verify`; it checks the artifacts as written. Represent relevant requirements in the reviewed artifacts, not only in configuration.
- External CI and release approval remain authoritative gates. OpenSpec artifact completion and agent-generated reports do not automatically approve deployment.
- These are integration requirements, not a claim that an OpenSpec configuration or CI enforcement has been installed here.

Official references: [project configuration](https://openspec.dev/docs/project-config), [setup and optional verification](https://openspec.dev/docs/setup), [specification lifecycle](https://openspec.dev/docs/quickstart). Documentation consulted 2026-10-20; pin the actual tooling version per product.

## Templates and patterns

- Foundation: [product](templates/product/), [architecture](templates/architecture/), [roadmap](templates/roadmap/), [project profile](templates/project-profile/).
- Review: [change review and evidence](templates/change-review/).
- Recurring design: [use case and adapters](patterns/use-case-and-adapters/), [background work and progress](patterns/background-work-and-progress/), [AI improvement and approval](patterns/ai-improvement-and-approval/).

Patterns are design references, not runnable packages or claims of deployed implementations. Project-specific executable examples should be verified in their own repositories.

## Approval and validation limits

[approval register](approval/) explains each standard, its tradeoff, and the requested decision. Drafting, link checks, and consistency review do not constitute the decision authority's approval. No application code, CI configuration, dependencies, authentication, or deployment has been changed by creating this handbook.

## Draft verification record

On 2026-10-20, a local structural/navigation check inspected 24 Markdown files: 14 standards, five templates, three patterns, and two entry/review documents. It found 178 unique sequential rule IDs, checked 152 local links, and exercised document availability for UI, API/storage, AI execution, and new-product adoption routes. No structural issues were reported. The review also reconciled the new GitHub default with the existing client governance and separated planned OpenTelemetry from deployed capability.

This checks document structure and references, not policy effectiveness or application compliance. No product tests, browser acceptance run, sandbox test, CI installation, or security certification was performed. Handbook approval remains pending in the approval register.
