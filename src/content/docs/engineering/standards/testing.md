---
title: "TEST — Behavioral testing and regression evidence"
sidebar:
  label: "TEST — Behavioral testing and regression evidence"
status: "Draft"
version: "0.1"
owner: "Engineering / quality lead"
decision: "Deferred for detailed review"
---

**Applicability:** Application logic, adapters, persistence, browser workflows, and deterministic AI orchestration behavior.

## Purpose and rationale

Demonstrate that changed behavior works and consequential existing behavior remains intact.
Fast deterministic tests support frequent changes; integration and browser tests catch failures that isolated tests cannot.
A balanced suite tests the real boundaries without replacing every dependency with a permissive mock.
Manual review remains valuable for usability and exploratory work, but is not a scalable substitute for regression coverage.

## Confirmed baseline

- Current testing is mostly manual; automated evaluation, hill climbing, and browser tests are desired.
- TypeScript, Next.js, hexagonal use cases, Docker, and customer-specific deployments shape test boundaries.
- Persistence includes SQL Server and emerging file-backed records, with Azure Blob and Azure Files in the landscape.
- Execution can be in-process or worker-based; WebSockets expose progress.
- No specific test runner, browser automation tool, coverage percentage, or installed suite is established here.

## Proposed rules

**MUST** below means mandatory only after approval and adoption for the applicable project.
Existing customer commitments prevail; unresolved conflicts block the affected release.
The client governance baseline retains its testing, UAT, and security-scan obligations.

| ID | Mandatory proposed rule | Verification method |
|---|---|---|
| TEST-01 | Each material behavior change MUST have acceptance examples, a risk-based test plan, and traceable results; untested acceptance criteria MUST be explicit release gaps rather than silently omitted. | Match requirement/change, test cases, results, and approved adoption scope. |
| TEST-02 | Use-case unit tests MUST exercise externally meaningful outcomes and error paths with controlled clocks, identifiers, and dependency outcomes where necessary; assertions MUST NOT merely reproduce implementation details. | Inspect representative tests and deterministic rerun evidence from the adopted pipeline. |
| TEST-03 | Integration tests MUST exercise relevant real adapter behavior, including persistence and transaction/concurrency semantics, against an isolated supported implementation. Fakes MUST NOT be the sole proof of SQL, file, or cloud-storage behavior. | Review integration environment, fixtures, adapter calls, and results for changed boundaries. |
| TEST-04 | Boundary contract tests MUST cover request/response shapes, validation, compatibility, and meaningful failure behavior for APIs, events, tools, and external providers. Stubs MUST be versioned and checked against the supported real contract. | Link contract examples and compatibility evidence to the interface revision. |
| TEST-05 | Critical journeys MUST have browser-level regression coverage through the real UI and application boundary, including role-specific actions, approvals, errors, and refresh/reconnect where relevant. Mocked downstream systems MUST be identified and covered separately at their boundary. | Review browser scenarios, environment manifest, and captured failures/results. |
| TEST-06 | Tests MUST cover relevant denial and failure cases: wrong client/engagement, insufficient approval rights, invalid input, duplicate requests, interrupted work, stale approval, and unavailable dependencies. | Map changed risks and security acceptance criteria to executable cases or approved manual evidence. |
| TEST-07 | Automated suites MUST isolate data and execution, avoid order dependence, and control nondeterminism; arbitrary sleeps MUST NOT replace observable completion conditions. | Inspect fixture lifecycle, wait conditions, parallel isolation, and flake records. |
| TEST-08 | Test fixtures MUST follow customer data authorization and retention controls. Synthetic or explicitly authorized representative cases MUST preserve the behavior under test without moving customer data into unapproved environments. | Review fixture provenance, scope, and handling under the linked security/storage standards. |
| TEST-09 | Live-model quality evaluation MUST be separate from deterministic application tests. Scripted model responses MAY test orchestration, but MUST NOT be reported as evidence of real model quality. | Inspect suite categories and link model-quality claims to EVAL evidence. |
| TEST-10 | A reproduced defect MUST gain a regression case at the lowest effective boundary, with additional integration/browser coverage when the failure crosses that boundary. | Review defect-to-test traceability and the failure condition exercised. |
| TEST-11 | Flaky, skipped, or quarantined tests MUST have an owner, reason, affected risk, and resolution deadline; a quarantined required scenario MUST retain explicit alternative evidence or remain a release gap. | Review quarantine register and release evidence; no silent pass conversion. |
| TEST-12 | Test results MUST identify the revision, relevant configuration, environment, scenarios, outcomes, and remaining gaps. Passing totals or coverage percentages alone MUST NOT constitute acceptance. | Inspect release-linked result records and the risk/acceptance mapping. |

## Choosing the effective boundary

| Layer | Primary question | Do not substitute |
|---|---|---|
| Unit / use case | Does business behavior hold for controlled inputs and failures? | Mock-call counts for actual business outcomes |
| Integration | Does the real adapter honor required persistence or service behavior? | In-memory state for SQL transaction evidence |
| Contract | Can participants exchange compatible data and interpret errors? | A stale fixture for provider compatibility |
| Browser | Can a user complete the actual critical journey? | Component screenshots for authorization or workflow correctness |
| AI evaluation | Does the chosen AI configuration meet use-case quality criteria? | A scripted completion for a model-quality result |

Tests should use declared consistency guarantees rather than assume that SQL and files share atomicity.
Where those guarantees remain undefined, resolve the contract before claiming corresponding correctness.
The [storage standard](../storage/) owns that contract; tests demonstrate it.

## Adoption and evidence checklist

- [ ] Inventory manual acceptance steps and the most consequential historical defects.
- [ ] Start with deterministic use-case tests and one critical browser journey.
- [ ] Add real-adapter integration coverage for each changed high-risk persistence/integration boundary.
- [ ] Establish approved fixture sources, isolated environments, and repeatable setup/cleanup.
- [ ] Record a capability gap when automation infrastructure is not yet available; do not describe it as installed.
- [ ] Keep manual evidence reproducible: actor, environment, steps, expected/actual result, and revision.
- [ ] Expand automation by risk under an approved transition plan with owners and milestones.
- [ ] Preserve release-blocking customer obligations throughout incremental adoption.

There is no universal coverage percentage in this draft.
Projects can propose measured coverage goals, but must explain the risk they address and their limitations.
A small trustworthy suite is preferable to a large suite that routinely ignores failures.

## Ownership boundaries

- [Evaluation](../evaluation/) owns corpus design, statistical quality evidence, and AI acceptance thresholds.
- [UX](../ux/) and [visual design](../visual/) own interaction and presentation acceptance criteria.
- [Identity and security](../identity-security/) owns security controls and scan requirements, not this test taxonomy.
- [Delivery](../delivery/) owns CI gates, release decisions, and production verification.

## Approval question and open choices

**Approve risk-based, layered automated testing with explicit manual evidence during a controlled transition?**

Open choices: test and browser runners; supported integration environments; initial critical-journey inventory;
flake-resolution expectations; adoption milestones; and any project-specific coverage goals supported by a risk rationale.
