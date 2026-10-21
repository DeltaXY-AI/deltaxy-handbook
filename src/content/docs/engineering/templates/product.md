---
title: "Product brief template"
sidebar:
  label: "Product brief"
status: "Draft"
version: "0.1"
decision: "Deferred for detailed review"
---

Template version: 0.1 — DRAFT handbook, pending approval.

Use this structure for a product's `docs/product.md`. Replace the guidance with project evidence; do not treat the template as a completed product brief. Mark unresolved material facts as unknown and assign an owner. Do not manufacture answers to fill sections.

## Document control

Record product name, accountable product owner, status (draft/reviewed/superseded), last review date, and approval reference. Identify who can approve customer-facing scope.

## 1. Mission and intended outcome

Write one paragraph: for which user, what useful outcome, and why the product should exist. Describe the problem before naming AI or frameworks.

Acceptance: a stakeholder can distinguish this product from adjacent products and services.

## 2. Users and responsibilities

List each human and machine actor, its goals, and decisions it may make. Distinguish buyer, operator, reviewer, administrator, client, and service identity where relevant. Link the permission model rather than copying every permission.

Acceptance: every consequential action has an accountable actor; "the AI approves" is not an undefined shortcut.

## 3. Current problem and evidence

Describe the current workflow, its inputs/outputs, friction, and existing tools. Link approved interviews, observations, contracts, or measured examples. Label each major claim confirmed, proposed, assumed, or unknown. Identify conflicting evidence.

Acceptance: the problem is grounded in source evidence; sensitive material remains access-controlled.

## 4. Core journeys

For each priority journey, state trigger, actor, input, main decisions, useful output, important failure or recovery case, and handoff. Keep a few end-to-end journeys, not a screen inventory.

Acceptance: a domain reviewer can follow the journey without knowing the implementation.

## 5. Scope and non-goals

State supported outcomes, explicit exclusions, human responsibilities, and external systems that remain authoritative. Separate contractual commitments from proposed future capabilities. Link detailed OpenSpec requirements instead of duplicating them.

Acceptance: a developer can reject an attractive but out-of-scope request using this section.

## 6. Success measures

For each measure, state outcome, unit, dataset/population, measurement method, baseline if known, proposed/approved threshold, and decision owner. Record unknown baselines honestly. Include quality and failure measures, not only throughput.

Acceptance: another reviewer could reproduce the measurement. An AI output count is not an accuracy figure.

## 7. Constraints and material risks

Record deployment constraints, customer obligations, data handling, domain limits, performance/cost constraints, dependency risks, and prohibited uses. Link the project profile and shared standards. Explain which are confirmed versus negotiable.

Acceptance: the technical team can identify constraints that could invalidate a design.

## 8. Open decisions and validation plan

For each unknown: question, impact, evidence needed, owner, and decision deadline/trigger. Record how user research or a working demonstration will resolve it. Avoid a catch-all "TBD" with no owner.

Acceptance: unresolved high-impact assumptions are visible before implementation approval.

## 9. Acceptance of this brief

Record stakeholder review evidence and remaining reservations. Approval confirms direction and scope; it does not establish technical correctness or commit every roadmap item.

## Review checklist

- Can intended users confirm the problem and expected outcome?
- Are proposed interpretations separated from their actual requests?
- Are scope, exclusions, success measures, and responsibilities checkable?
- Are unknowns assigned instead of silently filled by an agent?
- Are feature specifications and architecture linked rather than duplicated?

Related standard: [documentation](../../standards/documentation/).
