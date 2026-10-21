---
title: "Observability and AI telemetry"
sidebar:
  label: "Observability and AI telemetry"
status: "Draft"
version: "0.1"
owner: "Platform/operations lead, with security and AI-platform review"
decision: "Deferred for detailed review"
---

**Applicability:** Application and Pi execution telemetry, operational dashboards, diagnostic exports, and telemetry-derived datasets.

**Rule prefix:** OBS. “MUST” below becomes mandatory only after approval and adoption.

## Purpose and rationale

Explain what a system did, correlate failures across its boundaries, and support evidence-based AI improvement without turning diagnostics into uncontrolled data disclosure.
Portable instrumentation keeps backend selection customer-dependent; it does not eliminate exporter, access-control, or retention decisions.
Full-content traces can accelerate diagnosis but expose source documents, prompts, tool output, and personal/business data, so collection needs purpose, redaction, and restricted access.
Sampled diagnostic traces cannot substitute for the required record of business actions and approvals.

## Confirmed baseline

- OpenTelemetry is the chosen direction for application and Pi instrumentation; no backend is selected.
- Full-content telemetry is to remain in the customer-hosted environment.
- AI inference uses multiple direct model providers. Customer-hosted telemetry does not mean model inference happens inside the customer environment.
- Customer deployments are dedicated, with internal engagement isolation; access must account for both boundaries.
- Retention, deletion, and backups follow customer contracts; no universal telemetry retention period is confirmed.
- Human review of initial runs supplies golden-data candidates; automated evaluation and hill climbing are desired.

Existing client governance requires controlled evidence and avoiding secrets and unnecessary sensitive content in logs.
Existing customer commitments prevail. Conflicts between requested content capture and customer restrictions block the affected capture/release until resolved; this draft grants no new data-use permission.

## Proposed mandatory rules

| ID | Proposed rule | Verification method |
|---|---|---|
| OBS-01 | Application and Pi/model/tool execution MUST have OpenTelemetry-compatible instrumentation behind implementation adapters with a documented signal/schema contract. Business use cases MUST NOT depend on a selected vendor backend; actual Pi integration APIs MUST be verified against the chosen package's official documentation/source. | Review adapter boundaries and package references; demonstrate the agreed signal contract with the customer's configured exporter. |
| OBS-02 | Traces MUST correlate request/use case, run, job, model call, tool attempt/effect, approval reference, and final outcome where applicable. Propagation across workers and progress paths MUST preserve causal relationships while treating incoming trace metadata as untrusted and never as authorization. | Follow one run across request, asynchronous execution, tool effect, and reconnect; attempt to spoof scope through trace metadata. |
| OBS-03 | Structured events MUST carry stable, non-secret identifiers and declared fields for service/environment/version, operation, outcome, and correlation. Customer/engagement identifiers MUST be access-controlled; arbitrary user content MUST NOT enter names, attributes, error fields, or baggage outside approved content handling. | Inspect success/failure payloads, malformed-input cases, and forwarded context for sensitive data and undeclared fields. |
| OBS-04 | Metrics MUST use bounded, reviewed dimensions. Prompts, responses, documents, filenames, URLs containing sensitive data, credentials, customer/user identifiers, run IDs, and other unbounded content MUST NOT be metric labels. | Review metric schema and representative label sets; test user input cannot create new label values or expose content. |
| OBS-05 | A customer capture profile MUST define the minimum signals/content necessary for approved purposes, capture triggers, permitted data classes, access roles, destinations, and retention. Full-content capture MUST be explicitly permitted and remain within the approved customer-hosted environment; absent permission, metadata-only capture MUST be used. | Compare collection configuration and actual stored/exported payloads with the profile; confirm content capture is off when unapproved. |
| OBS-06 | Secrets and disallowed sensitive fields MUST be excluded or redacted before recording/export, including model/tool payloads, exceptions, URLs, headers, stack-related context, and SDK diagnostics. Instrumentation MUST avoid relying solely on downstream backend filtering. | Seed representative synthetic secrets and restricted fields across success/error paths; inspect emitted and retained signals for leakage. |
| OBS-07 | Collectors, exporters, dashboards, query APIs, downloadable diagnostics, and support access MUST enforce SEC customer/engagement permissions. Deployment isolation alone MUST NOT imply every user in that deployment may view all traces. | Attempt cross-engagement queries, trace-ID lookups, shared dashboard links, and exports with unauthorized accounts. |
| OBS-08 | Export destinations, credentials, network routes, buffers, and backend administration MUST be documented and approved per customer. Full-content signals MUST NOT route to developer consoles, external SaaS, or provider diagnostics outside the approved customer-hosted environment. Unapproved destinations MUST fail closed. | Review exporter configuration and network destinations; exercise rejected routing and inspect any local/disk queues. |
| OBS-09 | Sampling, batching, backpressure, buffer limits, and telemetry outages MUST have explicit bounded behavior. Diagnostic failures MUST not silently become unbounded memory/disk growth or change business authorization. Protected effects MUST still honor AI audit-persistence requirements when that separate record is unavailable. | Interrupt the exporter and apply load within agreed test limits; inspect resource bounds, dropped-signal visibility, and protected-effect behavior. |
| OBS-10 | Operational telemetry MUST distinguish failed, cancelled, recovered, awaiting-approval, and uncertain-effect outcomes; it MUST NOT mark a run successful only because an HTTP request or model response succeeded. Customer profiles MUST define actionable health/alert signals, owners, and response routes without invented universal thresholds. | Inject a model success followed by tool failure and an uncertain external effect; confirm the reported state and owner notification. |
| OBS-11 | Telemetry and its derivatives MUST use SEC retention/deletion/legal-hold/backup rules, including exports, queues, incident bundles, and datasets. Capture or deletion errors MUST be visible to the responsible owner; a backend's default retention MUST NOT override the customer profile. | Trace a sample through storage, export, hold, deletion, and backup treatment; compare configuration to approved periods. |
| OBS-12 | Telemetry-to-dataset extraction MUST be an explicit authorized operation with source permissions, purpose, reviewer, selected/redacted content, provenance, recipient scope, retention, and removal handling. Capture permission MUST NOT imply evaluation, model-training, cross-customer sharing, or provider-upload permission. | Review an extraction manifest and its authorization; deny an unauthorized consumer and trace a removed sample into derivative copies. |
| OBS-13 | Dashboard summaries and troubleshooting bundles MUST minimize content and preserve access controls. Human-readable errors MUST avoid sensitive payloads; authorized users may use controlled references to deeper diagnostics rather than receive unrestricted embedded traces. | Inspect UI errors, support bundles, alert messages, and notifications with both privileged and ordinary engagement users. |

## Signal and correlation guidance

Use traces to explain a bounded operation, metrics for aggregate operational trends, and structured events for diagnosable outcomes.
Record model/provider identifiers and usage/cost fields only where available and permitted; unknown values remain unknown rather than invented.
Where a fresh asynchronous trace is appropriate, an explicit link to the originating run/trace preserves causality without forcing a single indefinitely open span.
Do not propagate secrets, raw prompts, or full customer content in trace baggage or correlation headers.
Correlation identifiers aid lookup but never grant access to the linked resource.

The capture profile must distinguish operational metadata from full content and from immutable audit records.
Redaction can remove secrets even when a customer permits full-content troubleshooting; “full content” is not a mandate to retain every byte.
Restricted source references can be preferable to repeated prompt/document copies where they meet the diagnostic need.
Sampling may drop diagnostic spans; required business-action and approval records must use the [AI execution](../ai-execution/) audit path instead.

## Customer backend and capture decisions

Select the backend, deployment location, collector/export path, schema mapping, query controls, and support responsibilities for each customer.
Define sampling/capture conditions, storage capacity and limits, alert thresholds, and retention against actual operating needs and contract terms.
Do not assume a telemetry backend or vendor merely because OpenTelemetry has been chosen.
If a backend cannot enforce engagement-scoped access, introduce an enforceable access boundary or restrict that feature; do not expose unrestricted queries as a workaround.
Provider inference/data-disclosure approvals belong to [AI execution](../ai-execution/), separately from telemetry hosting.

## Related rule ownership

- [Identity and security](../identity-security/): identity, authorization, secrets, contract-led retention, backups, legal holds, and dataset permissions.
- [AI execution](../ai-execution/): run lifecycle, effect audit, provider approval, and execution recovery.
- [Evaluation](../evaluation/): human adjudication, golden datasets, proposed heldout split, hill climbing, and quality gates after authorized extraction.
- [Interfaces](../interfaces/): public error, progress, and event contracts.
- [Delivery](../delivery/): release approval, operational readiness, and incident/release evidence.

## Adoption and evidence checklist

- [ ] Customer capture profile approves purpose, classes, redaction, destinations, access, and retention.
- [ ] Application and Pi integration APIs/configuration have implementation references and signal-contract evidence.
- [ ] One end-to-end trace demonstrates request/run/job/tool/approval/outcome correlation without leaking content.
- [ ] Synthetic-secret checks cover normal, exception, SDK, exporter, notification, and support-export paths.
- [ ] Cross-engagement query and export denials are demonstrated, including direct trace-ID access.
- [ ] Exporter outage and buffer limits are evidenced; audit availability is evaluated separately.
- [ ] Dataset extraction has explicit authorization, reviewer/provenance records, and removal handling.

## Approval question and open choices

**Decision requested:** Approve customer-hosted, permissioned full-content diagnostics only where explicitly authorized, with metadata minimization, pre-export secret redaction, and separate approval for dataset use?

Open choices: backend per customer; supported Pi instrumentation integration; signal naming/schema; capture and sampling profiles; engagement-scoped query mechanism; telemetry destinations; retention and numeric resource/alert limits.
No backend, universal threshold, or unrestricted capture permission is established by this draft. Unresolved hosting/access/redaction choices block affected content capture rather than justify sending it to a convenient external service.
