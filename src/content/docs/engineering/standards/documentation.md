---
title: Documentation and specification standard
description: One authoritative home per fact, four foundation records for every project, and evidence-based change review.
status: Draft
version: '0.1'
owner: Product owner and technical lead (proposed)
decision: Deferred for detailed review
---

**Applies to:** project foundations, specifications, design changes, and shared engineering guidance.

## Purpose and tradeoff

Make intent and decisions discoverable without creating competing sources of truth. Fixed questions help reviewers find omissions; they do not prove the answers are correct. Short, maintained documents are preferable to exhaustive descriptions that drift from implementation.

## Confirmed baseline

DeltaXY technical leadership requested a common handbook, product/architecture/roadmap contents, and standards that can be validated. The team uses AI-assisted development. OpenSpec is being evaluated; installation and version are project decisions, not assumed existing infrastructure.

## Proposed rules

| ID | Rule | Verification |
| --- | --- | --- |
| DOC-01 | A project MUST have a product brief, architecture record, roadmap, and project profile, or a reviewed not-applicable reason for a document. Each records owner, status, and review date. | Structural document check plus owner review; unknown sections are explicit, not fabricated. |
| DOC-02 | Product briefs MUST describe users, current problem, core journeys, scope/non-goals, success measurement, constraints, evidence, and unanswered questions. Separate confirmed requests from proposed interpretation. | Product owner checks the product template <span class="hb-unpublished">Not yet published</span>; customer/domain reviewer confirms consequential assumptions. |
| DOC-03 | Architecture records MUST describe system context, module responsibilities and interfaces, data ownership, trust boundaries, critical flows/failures, quality constraints, operations, and decision rationale. Mark unproven assumptions. | Technical reviewer walks representative success/failure scenarios through the architecture template <span class="hb-unpublished">Not yet published</span>; attach spike evidence for uncertain critical assumptions. |
| DOC-04 | Roadmap outcomes MUST state useful user behavior, dependencies, owner, status, exit evidence, and timing certainty. Planned work MUST NOT be described as delivered. | Compare roadmap status with accepted change/release evidence. |
| DOC-05 | Each mandatory standard MUST have a stable rule ID, applicability, observable requirement, owner role, and verification method. Exceptions MUST follow handbook governance. | Check metadata/rules and inspect the exception register. Rule IDs remain stable when wording is clarified; material changes are reviewed. |
| DOC-06 | A fact or contract MUST have one authoritative home. Reference executable API contracts, tokens, configuration and code rather than manually copying their changing contents into prose. | Reviewer checks duplicate definitions and reference validity. Significant rationale remains documented even if configuration is self-describing. |
| DOC-07 | Feature changes MUST record observable scenarios, applicable rule IDs, design decisions where needed, and verification evidence before acceptance. Unknown or untested outcomes MUST remain visible. | Review change evidence <span class="hb-unpublished">Not yet published</span>, exercise scenarios, and verify linked outputs. |
| DOC-08 | Changes to product behavior, contracts, architecture or operation MUST update affected authoritative documents in the same reviewed change, or document why no update is needed. | Reviewer checks the document-impact section against the actual change. A bulk "docs unchanged" claim is insufficient for changed contracts. |
| DOC-09 | Agent instructions MUST route by task to the exact pinned standards. Keep common pointers short; load specialist guidance when applicable. An agent's statement of compliance is not evidence. | Review representative UI/API/AI tasks to see that relevant rules reach the change artifacts and checks. |
| DOC-10 | Public/customer artifacts MUST exclude confidential cross-customer information, credentials, and unsupported claims. Internal handbook examples MUST use synthetic material. | Human disclosure review and secret checks appropriate to the changed artifacts. |
| DOC-11 | Significant decisions MUST record context, choice, alternatives, consequences, status, and what would cause reconsideration. Retain superseded rationale and link its replacement. | Technical review; use `docs/decisions/` when a decision cannot be explained clearly in the architecture record. Do not require a separate decision file for trivial choices. |

## Three levels of correctness

1. **Structure:** sections, owners, IDs, valid links. Automatable, but limited.
2. **Consistency:** documents agree with each other and executable contracts. Automation and agents can flag issues; reviewers resolve them.
3. **Reality:** stakeholders confirm the need, a real application walkthrough demonstrates behavior, and tests/evaluations exercise relevant cases. Neither formatting nor model confidence establishes this.

## Adoption and evidence

- Instantiate templates as actual project records. Template instructions are not approved product facts.
- Declare handbook and specification-tool versions in the project profile.
- Apply requirements to the next bounded change; do not retroactively invent specifications for unverified behavior.
- Keep review evidence as links to access-controlled artifacts. Do not paste client data into general documentation.
- In OpenSpec, carry applicable behavior into specifications and design. `verify` does not consume artifact-creation `rules`; config alone cannot make a requirement verified. See [official configuration semantics](https://openspec.dev/docs/project-config).

## Approval requested

Approve one authoritative home per fact, the four foundation records, and evidence-based change review. Confirm which role approves product scope in each project. Document generation and automatic structural validation do not replace that approval.
