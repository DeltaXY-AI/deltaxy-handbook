---
title: "Pattern: improve AI behavior without self-approving it"
sidebar:
  label: "improve AI behavior without self-approving it"
status: "Draft"
version: "0.1"
owner: "AI lead and domain reviewer"
decision: "Deferred for detailed review"
---

**Use when:** changing prompts, models, tools, retrieval, matching criteria, or execution policies

## Intent

Turn the decision authority's initial-run/human-review approach into an evidence-producing improvement loop. Automated optimisation proposes candidates; it does not define correctness or authorise production promotion.

## Shape

1. Collect authorised representative runs with input, model/prompt/configuration versions, outputs, and failure evidence. Separate collection permission from permission to reuse or share records.
2. Human domain reviewers label expected behavior, acceptable variation, ambiguous cases, and critical failures. Resolve disagreements or retain uncertainty rather than force a false ground truth.
3. Partition examples by leakage risk, such as source document family or engagement, into development and held-out sets. Near duplicates must not straddle the split merely because their filenames differ.
4. Use development cases to propose and score changes. Keep the evaluation objective, constraints, and cost limits explicit.
5. A reviewer-controlled gate evaluates the chosen candidate on held-out cases and application/security checks. Repeatedly exposing held-out answers to the optimisation loop consumes that holdout; refresh or isolate it appropriately.
6. Compare quality, critical regressions, latency, and cost with the accepted baseline. A higher mean score does not excuse a critical safety or permission failure.
7. The DeltaXY technical reviewer approves or rejects promotion using the evidence and relevant domain review. Version the promoted configuration and retain a recoverable baseline.

## Evidence to collect

- Dataset provenance, review state, permitted usage, split method, scorer and dataset versions.
- Candidate and baseline output comparison, including failures and uncertain cases.
- Declared acceptance thresholds and their rationale, set before examining held-out results.
- Actual checks of important application paths and permission boundaries.
- Approval identity, promoted version, rollback target, and post-release observation.

## Limits

An LLM judge can assist scoring, but cannot alone establish domain truth. Human review can also be wrong; calibration and adjudication matter. A tiny golden dataset supports only limited claims, not a universal accuracy percentage.

Customer-hosted full-content traces are not automatically a cross-customer training or evaluation corpus. Retention/deletion rules also apply to copied examples and derived artifacts.

Related: [evaluation](../../standards/evaluation/), [identity and security](../../standards/identity-security/), [observability](../../standards/observability/), [delivery](../../standards/delivery/).

## Approval requested

Approve separating candidate generation from held-out assessment and human promotion. Exact thresholds, review roles and data usage rights remain project-specific. This pattern does not select an optimisation library or claim that the loop is installed.
