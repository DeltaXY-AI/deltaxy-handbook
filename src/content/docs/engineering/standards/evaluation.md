---
title: "EVAL — AI evaluation and controlled improvement"
sidebar:
  label: "EVAL — AI evaluation and controlled improvement"
status: "Draft"
version: "0.1"
owner: "AI engineering lead, with the domain review owner"
decision: "Deferred for detailed review"
---

**Applicability:** AI extraction, reasoning, drafting, tool-use, and model/prompt/configuration changes that affect customer outcomes.

## Purpose and rationale

Improve AI behavior against evidence rather than favorable demonstrations or a single aggregate score.
Human-reviewed initial runs provide realistic examples, but can encode reviewer errors and source-selection bias.
A protected heldout set provides a more honest release assessment at the cost of curation and restricted feedback.
Quality, cost, and latency compete; the acceptable balance belongs to each use case and customer obligation.

## Confirmed baseline

- AI execution uses the Pi SDK and multiple direct model providers.
- Initial runs will be human-reviewed to build a golden dataset; automated evaluation and hill climbing are desired.
- Application and Pi telemetry are planned around OpenTelemetry; full content is intended to remain customer-hosted, with the backend unchosen.
- Customer deployments are dedicated and internal engagements isolated.
- No golden corpus size, split ratio, acceptance threshold, judge model, or evaluation platform is established here.
- A blind heldout split is a proposed safeguard, not a confirmed existing capability.

## Proposed rules

**MUST** below means mandatory only after approval and adoption for the applicable project.
Existing customer commitments prevail; unresolved conflicts block the affected release.
The client governance baseline retains human approval before downstream business-system updates.

| ID | Mandatory proposed rule | Verification method |
|---|---|---|
| EVAL-01 | Each use case MUST define intended outcomes, critical failure classes, evaluation slices, scoring rubric, and acceptance criteria before a candidate is assessed. The rubric MUST distinguish absent evidence, uncertainty, and an assessed adverse conclusion. | Domain-owner review of the versioned evaluation specification and representative examples. |
| EVAL-02 | Golden examples MUST originate from human-reviewed initial runs or explicitly authorized curated additions, with source provenance, customer/engagement scope, source version, reviewer, adjudication state, and reference-answer rationale. Raw model outputs MUST NOT become truth merely by being stored. | Trace sampled examples from source and run through review to the versioned label. |
| EVAL-03 | Corpus inclusion and reuse MUST follow customer permissions, access, retention, and deletion controls; customer-hosted telemetry MUST NOT imply permission to export, pool, or train on its content. | Review dataset lineage and authorization under the linked security, storage, and observability controls. |
| EVAL-04 | Corpora MUST be versioned and separated into development and blind heldout partitions before tuning, grouping source families, duplicates, revisions, and derived examples together. Customer/client and engagement boundaries MUST be respected; claims of cross-client generalization MUST use client-disjoint assessment where authorized. | Inspect split manifest, source-family/duplicate checks, scope boundaries, and the claimed generalization scope. |
| EVAL-05 | Hill climbing, prompt search, example selection, and iterative model/tool tuning MUST use development data only. Heldout examples and detailed labels MUST be unavailable to tuning agents and routine tuning workflows. Heldout exposure MUST trigger contamination review and replacement or reclassification before further independent claims. | Review optimizer inputs, access boundaries, candidate history, and heldout-access records. |
| EVAL-06 | Uncertain or disputed labels MUST be marked and adjudicated by a qualified human reviewer using source evidence; unresolved cases MUST remain visible with counts and impact. Model judges MAY assist triage/scoring but MUST NOT be the sole authority for reference truth or critical acceptance decisions. | Review disagreements, adjudication rationale, judge limitations, and unresolved-case reporting. |
| EVAL-07 | Evaluation runs MUST identify corpus/split/rubric versions, code revision, prompt/agent/tool configuration, provider/model identifier, controllable inference settings, and environment. Uncontrolled provider changes and stochastic variation MUST be recorded rather than hidden by a reproducibility claim. | Inspect the run manifest and retained result provenance. |
| EVAL-08 | Use-case thresholds MUST be declared before release-candidate assessment for quality, cost, latency, and critical failures, including metric definitions, sample sufficiency, slices, and handling of uncertainty. Threshold changes MUST have a rationale and reviewer approval, not be silently relaxed to pass a candidate. | Compare the predeclared acceptance specification to the signed result and any decision revisions. |
| EVAL-09 | A candidate MUST be compared with the approved baseline on the same authorized evaluation protocol, with per-slice quality, critical errors, cost accounting, latency conditions, sample counts, and variability reported. Aggregate gains MUST NOT hide a critical regression or an affected customer slice. | Review paired/baseline results, distributions or uncertainty notes, and failure examples. |
| EVAL-10 | Critical regressions and unmet mandatory customer criteria MUST block promotion until resolved and reassessed. A DeltaXY technical reviewer MUST approve the evaluation evidence and declared tradeoffs before production promotion; an optimizer score MUST NOT authorize release. | Signed evaluation decision linked to the release record and remediation evidence. |
| EVAL-11 | Material changes to prompts, models/providers, tools, agent profiles, retrieval, parsing, or reference data MUST receive impact-scoped reevaluation; changes narrowing the evaluation scope MUST be justified. | Change-impact mapping to selected scenarios, results, and reviewer rationale. |
| EVAL-12 | Newly observed production failure cases MUST enter a reviewed improvement intake, not automatically enter the golden corpus or overwrite heldout labels. Dataset corrections MUST be versioned, affected results reassessed, and relevant retention/deletion obligations preserved. | Review incident-to-example lineage, correction history, and superseded evaluation decisions. |

## Proposed evaluation lifecycle

1. Run an authorized initial sample within the customer's permitted environment.
2. Have domain reviewers inspect source evidence, correct outputs, and mark uncertainty or disagreement.
3. Build a provenance-bearing corpus with representative normal, boundary, and consequential failure cases.
4. Group related sources before the split; authorize development and blind heldout access separately.
5. Establish a baseline and improve only on the development partition.
6. Assess a selected candidate on the protected heldout protocol and disclose limitations.
7. Obtain the technical review decision and link it to [delivery evidence](../delivery/).
8. Feed subsequent failures into reviewed intake without turning the heldout set into a tuning set.

For a single-customer corpus, source-family separation is still necessary; client-disjoint generalization cannot be claimed.
A permitted multi-customer program needs explicit reuse authority as well as client-disjoint evaluation where that claim matters.
Repeated heldout score feedback can leak information even without labels; the profile should define limited access, assessment cadence, and refresh triggers.
If data is too sparse for a credible heldout result, report that limitation and retain the required review gate rather than invent confidence.

## Adoption and evidence checklist

- [ ] Identify the use-case owner, domain adjudicator, technical reviewer, and dataset custodian.
- [ ] Start with authorized initial runs and a small, inspectable reviewed corpus; document representativeness gaps.
- [ ] Record source lineage, grouping rules, scope permissions, and unresolved examples.
- [ ] Approve the split/access protocol before enabling automated hill climbing.
- [ ] Declare quality-cost-latency thresholds and critical failures per use case; do not invent universal pass scores.
- [ ] Retain baseline/candidate manifests, per-slice outcomes, review rationale, and production decision links.
- [ ] Plan incremental automation without describing an evaluation runner or judge service as already installed.
- [ ] Record approved transition scope, owners, and milestones; existing customer commitments remain unchanged.

## Ownership boundaries

- [AI execution](../ai-execution/) owns permitted agent/tool behavior and execution boundaries.
- [Identity and security](../identity-security/), [storage](../storage/), and [observability](../observability/) own data access, lifecycle, and telemetry extraction controls.
- [Testing](../testing/) owns deterministic application and orchestration tests.
- [Delivery](../delivery/) owns the production gate and independent release approval, not the evaluation methodology.

## Approval question and open choices

**Approve human-grounded golden corpora, protected heldout assessment, and development-only hill climbing?**

Open choices: split and sample-sufficiency protocol per use case; critical failure definitions; threshold values;
human adjudication roles; judge-assistance scope; heldout assessment/refresh policy; and approved evaluation tooling.
