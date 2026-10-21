---
title: Engineering handbook
description: How DeltaXY designs, builds, verifies, and operates products, and how to read the standards in this section.
status: Draft
version: '0.1'
owner: DeltaXY technical leadership (proposed)
decision: Pending approval
---

## Purpose

Give people and coding agents one reviewable standard for how DeltaXY designs, builds, verifies, and operates products. This is an approval draft, not a claim that existing products comply or that the proposed controls already exist.

A **standard** defines a required outcome. A **pattern** describes a reusable approach and its limits. A **project profile** records product-specific choices. A **specification** defines observable product behavior. Keep these meanings separate.

In these documents, MUST means mandatory **after the relevant standard is approved and adopted**. SHOULD means the preferred approach; departures require an explanation. MAY is optional. Every standard remains pending independently until the approval register records the decision authority's decision. Approval of one file does not approve another.

## Published standards

| Standard | Status |
| --- | --- |
| [Documentation and specification](standards/documentation/) | Draft — deferred for detailed review |

Further standards are published as they clear publication review. The approval register <span class="hb-unpublished">Not yet published</span> records the decision for each standard.

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

Existing customer commitments are not migrated or superseded by this handbook. Verify applicable current customer terms when adopting it.

## Approval and validation limits

Drafting, link checks, and consistency review do not constitute approval. No approvals are recorded: do not infer approval from continued discussion or agreement on technology choices. All standards remain non-binding drafts pending an explicit later decision.

Publishing a standard on this site makes it readable; it does not approve it, and handbook approval does not mean a project has implemented the controls. Project adoption and production approval remain separate.
