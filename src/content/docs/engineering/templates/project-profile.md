---
title: "Project adoption profile template"
sidebar:
  label: "Project adoption profile"
status: "Draft"
version: "0.1"
decision: "Deferred for detailed review"
---

Template version: 0.1 — DRAFT handbook, pending approval.

Complete this record per product/deployment profile. Prompts below are fields to answer, not existing implementation claims. Record unknown choices with owners and resolution triggers. Keep secrets and client content out of this record.

## 1. Identity and accountability

Record product, customer/deployment profile, product owner, technical owner, operational owner, security contact, domain/evaluation reviewer, and production approver. Roles may be held by the same person where permitted, but required approval separation must remain explicit.

## 2. Standards adoption

- Central handbook location and immutable release/commit.
- Adoption approval reference and date.
- Tooling that makes the pinned content available locally and to CI/agents.
- Applicable standards and not-applicable rationale.
- Current implementation gaps and migration/release plan; proposed checks versus installed checks.
- Customer overlays and conflict resolution record.

## 3. Stack and architecture choices

| Area | Record |
| --- | --- |
| Language/runtime/framework | Supported TypeScript, runtime and Next.js versions; source configuration location |
| UI | Shared component/token release, customer theme, accessibility target and supported devices |
| Architecture | Module dependency rules, composition roots, import-boundary check |
| Interfaces | UI-independent entry points, HTTP/API style, WebSocket contract, compatibility consumers |
| Storage | SQL and/or file roles, provider, access library, migration mechanism, write/concurrency/recovery model |
| Execution | In-process/worker ownership, durable state, queue if any, cancellation/recovery responsibilities |
| AI | Pi SDK version, provider/model allowlist, tool capability profiles, execution sandbox |

Avoid copying a dependency lockfile into this document. Reference it and explain material choices.

## 4. Customer and security profile

Record deployment isolation and engagement isolation, identity provider, role/permission mapping, approval separation, service identities, secrets mechanism, network boundaries, upload/export controls, and generated-code isolation approval.

Record permitted data processing locations and provider retention/training terms. Customer-hosted telemetry and external model inference are separate entries. State whether customer consent/contract permits any reuse of records in golden datasets; default to no cross-customer reuse without authorisation.

## 5. Data lifecycle and recovery

For documents, records, caches, traces, audit events, model transcripts, exports, and evaluation datasets: policy source, retention, access, deletion, legal-hold handling where relevant, backup/recovery ownership and restoration evidence. Record agreed recovery objectives rather than inventing common targets.

## 6. Observability and operations

Record OpenTelemetry backend/export path, application/run correlation, permitted content, secret filtering, trace permissions, retention, sampling, cost limits, alerts, operational contact, and incident procedure. A backend not selected is an open decision, not a working capability.

## 7. Verification and release gates

List actual commands/workflows and evidence locations for typecheck, lint, build, dependency boundaries, unit/integration/contract tests, browser checks, accessibility, security scans, AI evaluations, and deployment smoke checks as applicable.

For each: owner, when it runs, pass/fail criterion, blocking status, and installed/planned status. State who can authorise a narrowly scoped exception. A rule with a planned check is not automatically verified.

Record CI platform, customer-approved repository/release process, environment separation, release approver, deployment identity, immutable artifact reference, rollback/forward-recovery plan, and confirmation of current customer obligations. Client projects must reconcile existing approved Azure/DevOps governance rather than silently inheriting the GitHub default.

## 8. Exception register

For each departure record rule ID, affected scope, reason, risk, compensating controls, approving authority, approval evidence, and expiry/review trigger. Record pending exceptions as pending. No agent can approve its own exception or waive a contract.

## 9. Open decisions and approvals

Assign each unresolved choice an owner and decision trigger. Record the product's adoption decision separately from handbook approval. Production approval requires the actual evidence and customer controls, not merely a completed profile.

Related: [handbook governance](../../), [change review](../change-review/).
