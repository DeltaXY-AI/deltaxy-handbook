---
title: "REL — CI/CD, release approval, and recovery"
sidebar:
  label: "REL — CI/CD, release approval, and recovery"
status: "Draft"
version: "0.1"
owner: "Engineering / release lead; DeltaXY technical reviewer approves production promotion"
decision: "Deferred for detailed review"
---

**Applicability:** Application, container, configuration, database, prompt/model, and infrastructure changes entering customer environments.

## Purpose and rationale

Make releases repeatable, reviewable, and recoverable without assuming all customers share one hosting platform.
Immutable artifacts and traceable evidence reduce ambiguity about what was approved and deployed.
Independent review adds friction but limits self-approved production changes and exposes incomplete recovery plans.
A shared release contract is preferable to forcing customer-specific access, infrastructure, and approval obligations into one pipeline product.

## Confirmed baseline

- GitHub Actions is the new default direction; it does not replace existing customer-approved delivery arrangements.
- One client uses approved Azure DevOps/repositories, Azure Pipelines or agreed Azure deployment processes, segregated environments, and SAST/DAST obligations.
- Docker is the packaging baseline; hosting depends on the customer and deployments are dedicated per customer.
- A DeltaXY technical reviewer provides production approval.
- Testing is currently mostly manual; desired automation must be introduced rather than assumed to exist.
- Retention, deletion, and backups follow customer contracts; no universal hosting platform or recovery target is established here.

## Proposed rules

**MUST** below means mandatory only after approval and adoption for the applicable project.
Existing customer commitments prevail; unresolved conflicts block the affected release.
The client governance baseline is not migrated or weakened by adoption of this handbook.

| ID | Mandatory proposed rule | Verification method |
|---|---|---|
| REL-01 | Each project MUST record its approved repository, CI/CD platform, deployment targets, environments, customer release obligations, and decision owners. New projects MUST use GitHub Actions as the proposed default unless the approved customer profile selects otherwise; Clients MUST retain their approved arrangements unless separately authorized to change. | Review the customer profile against contracts and customer-approved governance. |
| REL-02 | Material changes MUST be linked to a requirement/defect/change record and reviewed by a technically qualified person other than the author before production promotion. A DeltaXY technical reviewer MUST approve the production release; required customer approvals MUST also be present. | Inspect change review, actor identities, release approval, and customer signoffs. |
| REL-03 | CI/deployment identities MUST be scoped to the specific workflow, environment, and authorized customer under the identity/security standard; untrusted change-validation jobs MUST NOT receive production deployment authority. | Review pipeline identity bindings, trigger permissions, and environment access evidence under SEC controls. |
| REL-04 | Release artifacts MUST be built from an identified revision, recorded by immutable image digest, and linked to build inputs and provenance. Promotion MUST select the approved digest rather than a mutable tag or an unreviewed rebuild. | Trace source revision through build record, digest, approval, and deployed artifact reference. |
| REL-05 | Each pipeline MUST implement the approved change gates: relevant static checks, behavioral tests, security review evidence, AI evaluation where affected, and any required UAT. Missing gates or infrastructure MUST remain visible adoption/release gaps, not synthetic passing results. | Inspect gate configuration and actual release-linked outcomes against the profile. |
| REL-06 | Dependency/container vulnerability findings and required SAST/DAST results MUST be reviewed before release, with blocking decisions and exceptions governed by the security standard and customer obligations. An available scan without a reviewed disposition MUST NOT be treated as clearance. | Link findings to remediation or authorized, scoped exception records and security review. |
| REL-07 | Deployment configuration and secret references MUST be environment/customer-scoped and reviewed with the release. Environment segregation and approval boundaries MUST match the customer profile; promoting an image MUST NOT silently promote customer data or secrets. | Review configuration diff, target identity, environment mappings, and deployment plan. |
| REL-08 | Schema and data migrations MUST identify compatibility, sequencing, required backup/recovery evidence, partial-failure handling, and data effects before promotion. Destructive or non-reversible steps MUST have an explicitly reviewed recovery/forward-fix strategy. | Review migration rehearsal or approved representative evidence and recovery decision against storage obligations. |
| REL-09 | Every release MUST have an actionable rollback or approved recovery plan naming the target artifact/configuration, responsible operator, trigger conditions, data compatibility limits, and verification steps. Application rollback MUST NOT be assumed to reverse database changes or external business writes. | Review and exercise the plan at the risk-appropriate boundary; record limitations and recovery evidence. |
| REL-10 | Production promotion MUST record approval, target customer/environment, artifact digest, configuration and migration versions, operator/automation identity, and deployment result. Unauthorized substitution after approval MUST require renewed review. | Inspect the release record and compare approved versus deployed references. |
| REL-11 | Post-deployment checks MUST verify service health and representative critical behavior without unapproved consequential writes, assess relevant telemetry, and record proceed/rollback/recovery decisions against predeclared criteria. | Inspect smoke-check outcomes, observation evidence, and release-owner decision. |
| REL-12 | Emergency releases MUST use a documented customer-compatible expedited process with explicit authority, retained evidence, and any required subsequent review; urgency MUST NOT silently bypass mandatory customer approvals or security controls. | Review the emergency authorization, expedited gates, remaining obligations, and follow-through record. |
| REL-13 | CI dependencies and third-party actions MUST use reviewed, reproducible references, with updates handled as changes. Dependency installation MUST honor the lockfile, and untrusted PR code MUST NOT execute with release credentials or write-capable production authority. | Inspect workflow/action references, locked install commands, trigger contexts, and untrusted-change permission tests. |

## Platform-neutral release contract

The same evidence contract applies whether the implementation uses GitHub Actions, Azure Pipelines, or another expressly approved customer process.
A migration of repository or CI/CD platform is itself a reviewed change, not an incidental interpretation of “default.”

| Release stage | Required evidence under the adopted rules |
|---|---|
| Plan | Change scope, affected customer obligations, risk, migration and recovery strategy |
| Build | Source revision, build inputs, immutable image digest, provenance |
| Assess | Relevant test/evaluation results, security disposition, UAT where required, known gaps |
| Approve | Independent technical review, DeltaXY production approval, required customer authorization |
| Deploy | Customer/environment identity, selected digest/configuration, migration execution outcome |
| Observe | Smoke checks, telemetry assessment, proceed/rollback decision, incident linkage if needed |

Approval of AI evaluation is evidence for a release, not permission for an agent to deploy itself.
Business approval of a downstream update is a separate control and remains required where applicable.
Internal engagement isolation remains necessary even inside a dedicated customer deployment.

## Adoption and evidence checklist

- [ ] Confirm the actual platform and customer obligations before selecting or changing a pipeline.
- [ ] Inventory current release steps, manual gates, identities, and artifact traceability.
- [ ] Establish a reliable image-digest and release-evidence chain before adding deployment automation.
- [ ] Introduce repeatable build/test gates incrementally; retain auditable manual checks during approved transition.
- [ ] Confirm qualified independent review and the production approver, including emergency coverage.
- [ ] Review migration compatibility and recovery instructions before a consequential data change.
- [ ] Retain required evidence in the approved customer location for the contract-defined period.
- [ ] Record transition gaps with owner, scope, expiry, and mitigation; do not waive existing commitments.

No particular registry, runner topology, deployment orchestrator, vulnerability tool, or retention period is mandated here.
Customer profiles select those implementation details and record any additional release obligations.
Recovery objectives and backup mechanisms come from the contract and storage plan, not an invented common metric.

## Ownership boundaries

- [Testing](../testing/) owns behavioral test design; [evaluation](../evaluation/) owns AI-quality acceptance methodology.
- [Identity and security](../identity-security/) owns permissions, secrets, vulnerability policy, and security exceptions.
- [Storage](../storage/) owns consistency and migration mechanics; [identity and security](../identity-security/) owns contractual data lifecycle and backup/recovery policy.
- [Observability](../observability/) owns telemetry and operational signal contracts.
- [Documentation](../documentation/) owns durable project decisions and evidence documentation structure.

## Approval question and open choices

**Approve this release contract, with GitHub Actions as the new-project default and existing customer delivery commitments preserved?**

Open choices: project-specific required gates and branch/environment protections; production-reviewer delegation;
registry and runner selection; evidence retention/location; recovery acceptance criteria; and the authorized emergency-release process.
