---
title: "Change review and verification record template"
sidebar:
  label: "Change review and verification record"
status: "Draft"
version: "0.1"
decision: "Deferred for detailed review"
---

Template version: 0.1 — DRAFT handbook, pending approval.

Use this structure in the existing PR/change record; a separate file is optional. Complete it with observed evidence. It is not a checklist whose empty or auto-checked boxes prove completion.

## Change identity

Record change/issue, product, author, reviewer, adopted handbook version, applicable customer profile, and specification/design links. Identify whether the change affects code, prompts, models, datasets, evaluation logic, configuration, or infrastructure.

## Intended behavior and scope

State the user-visible outcome, non-goals, important compatibility constraints, and acceptance scenarios. Identify unresolved questions that block implementation or release.

## Standards applicability

For each relevant rule ID, record why it applies, how it is implemented, verification evidence, and any approved exception. A reference to a whole standard without the affected requirements is not sufficient for a high-risk change.

## Observed verification

For each check record:

- Scenario or invariant being checked.
- Exact command or manual procedure, environment and relevant versions.
- Observed result and evidence link; label not-run checks explicitly.
- Limits of the evidence, including synthetic versus real inputs.
- Failure disposition and reviewer acceptance.

For UI changes, include actual browser interaction. For AI behavior, include development and held-out evaluation results with dataset/scorer versions and critical regressions. For storage/security changes, include relevant failure and denied-access cases. A green model assessment is not a substitute for an executable check where one is practical.

## Risks, contracts, and operations

Record data access/exposure, customer obligations, dependencies, API or schema compatibility, migration, provider effects, deployment/rollback, and observability impacts where applicable. Name the owner of residual risk.

## Documentation impact

List authoritative documents/contracts updated and any intentionally unchanged documents with a specific reason. Confirm roadmap status matches actual acceptance, not just merged code.

## Approvals

Record product/domain approval where needed, technical review, any security/customer approvals, and production promotion authority. Keep requirement approval distinct from code approval and from release approval. Do not generate approval identities or timestamps on someone's behalf.

## Post-release observation

Record actual deployment smoke results, operational signals, and rollback or forward-recovery decision if needed. Distinguish pre-release evidence from observations made after deployment.

Related: [testing](../../standards/testing/), [evaluation](../../standards/evaluation/), [delivery](../../standards/delivery/).
