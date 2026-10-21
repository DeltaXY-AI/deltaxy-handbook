---
title: "Outcome roadmap template"
sidebar:
  label: "Outcome roadmap"
status: "Draft"
version: "0.1"
decision: "Deferred for detailed review"
---

Template version: 0.1 — DRAFT handbook, pending approval.

Use for a product's `docs/roadmap.md`. This records future intent and delivery evidence; it is not a promise that all listed work is funded or contracted.

## Document control

Record product owner, planning horizon, status, review date, and source of committed dates. Link the product brief and adopted project profile.

## 1. Current position

State what users can demonstrably do now, with release/demo evidence. List material unresolved limitations. Separate released capability from demo-only or proposed behavior.

## 2. Prioritisation principles

Explain how outcomes are ordered: contractual commitments, user value, risk reduction, dependencies, and capacity. Identify the person who resolves priority conflicts. Do not use effort or feature count as a substitute for value.

## 3. Outcome records

Create one record per useful outcome using these fields:

- **Outcome ID and name:** stable identifier and user-visible result.
- **Actor and benefit:** who can do what they cannot do today.
- **Scope / non-goals:** what this outcome includes and excludes.
- **Dependencies:** prerequisites, external approvals, and unknowns that block it.
- **Exit evidence:** demonstration, acceptance scenarios, evaluation criteria, and operational checks required for completion.
- **Owner:** accountable delivery owner and acceptance reviewer.
- **Status:** proposed, approved, in progress, blocked, delivered, or cancelled.
- **Timing:** committed date with authority/source, forecast with assumptions, or unscheduled. Do not silently convert a forecast into a commitment.
- **Links:** relevant OpenSpec changes, decisions, customer approval where required, and release evidence.

Do not populate fictional dates or targets to complete the template. Assign owners to missing decisions.

## 4. Near / next / later

Group outcomes by commitment and dependency rather than inventing precision. Keep the near-term set bounded. Later ideas are not permission to expand current implementation scope.

## 5. Delivery and revision history

Record material scope, priority, or date changes with reason and approver. Mark delivery only when exit evidence is accepted. Link current capability specifications instead of copying them into completed roadmap rows.

## Review checklist

- Is every item a useful outcome rather than "build backend" or "add AI"?
- Is the dependency order feasible?
- Does each outcome have an owner and observable exit evidence?
- Are confirmed commitments distinguishable from forecasts and ideas?
- Are blockers and changed expectations visible?

Related standard: [documentation](../../standards/documentation/).
