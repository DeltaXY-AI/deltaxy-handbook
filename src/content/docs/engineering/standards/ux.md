---
title: "UX — Interaction and accessibility"
sidebar:
  label: "UX — Interaction and accessibility"
status: "Draft"
version: "0.1"
owner: "Product / UX lead, with the engineering lead"
decision: "Deferred for detailed review"
---

**Applicability:** Customer-facing and internal workflow interfaces, including AI-assisted review and administration.

## Purpose and rationale

Make the next action, its consequences, and the evidence behind a decision understandable.
A polished happy path is insufficient when work runs asynchronously or changes business records.
Explicit states and keyboard support add design effort but reduce operational mistakes and rework.
Human review must be a usable decision process, not a ceremonial confirmation button.

## Confirmed baseline

- Next.js interfaces use shared shadcn/ui and Tailwind components with customer themes.
- Use cases are UI-agnostic; roles, client/engagement membership, and approval permissions are distinct.
- WebSockets support live updates; execution can be in-process or worker-based.
- client workflows require human approval before downstream business-system updates.
- These decisions do not establish an accessibility certification or prove any existing screen conforms.

## Proposed rules

**MUST** below means mandatory only after approval and adoption for the applicable project.
Existing customer commitments prevail; unresolved conflicts block the affected release.
The client governance baseline remains binding for its engagements.

| ID | Mandatory proposed rule | Verification method |
|---|---|---|
| UX-01 | Each material journey MUST define entry conditions, authorized actors, success, and recovery paths, including customer-specific terminology and approval steps. | Review a journey/state map against the customer profile and acceptance examples. |
| UX-02 | Each data or action surface MUST distinguish loading, empty, partial, stale/disconnected, success, validation failure, permission denial, and service failure where applicable; omissions MUST have a recorded reason. | Exercise the state inventory using controlled fixtures and failure injection. |
| UX-03 | Long-running actions MUST show accepted/running/completed/failed status, preserve a durable work reference where available, and explain supported cancellation or recovery. A disconnected screen MUST NOT imply the operation failed or safely permit a duplicate write. | Disconnect/reconnect and retry scenarios, including refresh while work continues. |
| UX-04 | Interactive journeys MUST support keyboard operation, visible focus, logical focus order, escape from overlays, and appropriate focus restoration after navigation or dismissal. | Keyboard-only checks of each critical journey and shared overlay component. |
| UX-05 | The proposed accessibility target MUST be WCAG 2.2 Level AA for the agreed web scope, with labels, semantic structure, error association, status announcements, and supported zoom/reflow assessed. Any unmet criterion MUST be recorded as a gap, not described as conformity. | Automated findings plus manual keyboard, zoom/reflow, and assistive-technology evidence against scoped criteria. |
| UX-06 | Decision screens MUST distinguish “not assessed,” “no supporting evidence found,” “conflicting evidence,” and “assessed noncompliant” where relevant. Missing or weak evidence MUST NOT automatically become a compliance conclusion. | Review representative missing, conflicting, and adverse-evidence cases with a domain reviewer. |
| UX-07 | AI suggestions MUST be distinguishable from human-confirmed values and show available source references, uncertainty, and material edits. Numeric confidence MUST NOT be presented as a probability unless its meaning is validated and documented. | Inspect reviewed examples and follow citations back to the relevant source/version. |
| UX-08 | Approval interactions MUST identify the exact proposed change, destination, affected scope, and approver action; changed underlying data MUST require re-review rather than silently reuse a stale approval. | Test changed-input and concurrent-edit paths with the application authorization contract. |
| UX-09 | Destructive or consequential actions MUST explain consequences and available recovery before commitment; confirmations MUST be proportionate, specific, and not used as a substitute for authorization. | Review action-risk inventory and exercise confirmation/recovery paths. |
| UX-10 | Errors MUST state what happened, whether a change took effect when known, and a safe next step; unknown outcomes MUST be explicit rather than described as successful or failed. | Exercise validation, timeout, and ambiguous downstream-result examples. |
| UX-11 | Each customer profile MUST state supported browsers/devices, languages, accessibility scope, and the critical journeys used for acceptance; assumptions MUST be surfaced before acceptance. | Product and customer representative review of the profile and acceptance evidence. |

## State and decision examples

| Situation | Intended user meaning | Avoid |
|---|---|---|
| Search returned no relevant clause | No supporting evidence found in the searched scope | “Contract is noncompliant” without assessment |
| Model proposed a date | Draft suggestion awaiting review | Rendering it as an approved source fact |
| Write request timed out | Outcome not yet established; reconcile before retry | “Failed” with an unconditional retry button |
| Reviewer lost engagement access | Action unavailable under current permissions | Treating hidden controls as the permission boundary |
| Live connection interrupted | Updates may be stale; reconnecting or recovery available | Presenting old progress as current without a warning |

## Adoption and evidence checklist

- [ ] Inventory critical journeys and identify the highest-consequence decisions first.
- [ ] Add state coverage to one existing journey before expanding across the product.
- [ ] Record the supported environment and accessibility scope in the customer profile.
- [ ] Pair automated accessibility checks with manual keyboard and representative assistive-technology review.
- [ ] Retain journey examples, accessibility findings, known gaps, owners, and agreed adoption milestones.
- [ ] Link acceptance evidence to the relevant release and customer obligation.
- [ ] Record any approved transition gap with scope, owner, expiry, and mitigation; do not waive an existing commitment.

Existing products can adopt journey by journey with an explicitly approved transition plan.
New or materially changed journeys should be the first adoption boundary; this is not blanket grandfathering.
A target, scan, or checklist alone is not certification or a claim of complete conformance.

## Ownership boundaries

- [Visual standard](../visual/) owns tokens, themes, and presentation consistency.
- [Testing standard](../testing/) owns automated behavioral regression evidence.
- [Evaluation standard](../evaluation/) owns AI quality assessment and adjudication.
- [Security standard](../identity-security/) owns authorization enforcement and security controls; UI visibility is not enforcement.
- [Delivery standard](../delivery/) owns production approval and release evidence, distinct from business-action approval.

## Approval question and open choices

**Approve this interaction standard and the proposed WCAG 2.2 AA target for an explicitly scoped adoption plan?**

Open choices: supported assistive-technology/browser matrix; customer-specific accessibility obligations;
critical-journey priority; who signs off usability evidence; and the transition dates for existing screens.
The decision authority's approval of this draft does not assert that current products already meet the target.
