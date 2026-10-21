---
title: "AI integration and execution safety"
sidebar:
  label: "AI integration and execution safety"
status: "Draft"
version: "0.1"
owner: "AI platform lead, with security and engagement-owner review"
decision: "Deferred for detailed review"
---

**Applicability:** Model calls, agent runs, tools, generated code/shell, and customer-facing AI workflows.

**Rule prefix:** AI. “MUST” below becomes mandatory only after approval and adoption.

## Purpose and rationale

Make AI execution replaceable, observable, recoverable, and bounded by permissions outside the model.
An initially in-process runtime avoids premature worker infrastructure, but does not justify losing work when a request disconnects or replaying uncertain external effects after restart.
Tool usefulness and generated-code flexibility increase the need for explicit execution boundaries; a prompt is not a security boundary.

## Confirmed baseline

- Pi SDK is the chosen AI integration, with multiple direct model providers; no specific SDK API or version is asserted here.
- One application initially executes in process; other workloads use workers, with migration to workers as needed.
- WebSockets provide progress communication. Business use cases remain UI-agnostic and hexagonal.
- Agent profiles cover read/draft work, reversible writes, and generated code/shell capabilities.
- Generated code currently runs inside the application container. **This is a current risk, not approved secure isolation.**
- OpenTelemetry is intended for application and Pi instrumentation; the telemetry backend is not selected.
- Automated evaluation and hill climbing are desired, not proof of an existing production gate.

Existing client governance requires human review/approval before downstream business updates and exports.
Existing customer commitments prevail; unresolved conflicts block the affected release. Neither a general agent profile nor this proposal waives those commitments.

## Proposed mandatory rules

| ID | Proposed rule | Verification method |
|---|---|---|
| AI-01 | Pi/provider-specific types and SDK calls MUST remain behind application-owned interfaces for model execution, tool invocation, progress, and cancellation. Implementers MUST verify actual supported SDK APIs against the selected package's official documentation/source instead of inventing signatures or assuming feature parity. | Review dependency boundaries and record package/version/source references with adapter contract-test evidence. |
| AI-02 | Each run MUST record a stable run ID, customer/engagement scope, initiating and executing identities, use-case/input version, agent/prompt/tool versions, selected provider/model configuration, and applicable approval references. Sensitive payload handling MUST follow SEC/OBS rather than copying all input into metadata. | Follow a representative run from request through model/tool calls and final result using its recorded configuration. |
| AI-03 | The execution lifecycle MUST be independent of an HTTP request or WebSocket connection. Accepted work MUST have a durable acceptance/state record and explicit relevant lifecycle states, including uncertainty/recovery when applicable; disconnect alone MUST NOT silently discard accepted work or authorize continuation beyond policy. | Disconnect and reconnect during an in-process run; recover status/result without duplicate execution or lost acceptance. |
| AI-04 | Restart, cancellation, timeout, and worker handoff MUST have explicit checkpoint/ownership and recovery behavior. Recovery MUST distinguish safe re-execution from an uncertain external effect; it MUST stop for reconciliation where the outcome cannot be established. | Interrupt before and after a tool effect, restart, and inspect recovery decisions; test competing executors cannot both claim an active run. |
| AI-05 | An agent profile MUST declare allowed tools, read/write scope, approval requirements, provider access, generated-code capability, and bounded runtime/resource/cost limits. Denied or unspecified capabilities MUST fail closed outside the model. | Exercise an undeclared tool, cross-engagement resource, and exceeded limit; inspect enforcement rather than prompt instructions alone. |
| AI-06 | Tools MUST validate typed inputs and outputs, recheck SEC authorization immediately before protected effects, and treat instructions in documents/tool results/model output as untrusted data. Tools MUST NOT expose arbitrary host access merely because the model requests it. | Use malformed inputs and prompt-injection cases that attempt scope escalation, secret access, or tool substitution. |
| AI-07 | External business actions MUST NOT run automatically by default. A customer-specific policy MUST explicitly permit an action and define required approval; approval MUST bind the exact action/input version and scope. Client human-approval commitments remain mandatory and cannot be replaced with confidence thresholds. | Attempt an unapproved write/export; mutate approved input and verify rejection; inspect approver and execution binding. |
| AI-08 | Effectful tool calls MUST use stable logical-operation IDs and durable effect records, with target idempotency support where available. Retries MUST reconcile already-applied/uncertain outcomes and record attempts separately; no design or evidence MUST claim exactly-once execution without proving its full boundary. | Simulate timeout after target success and concurrent retry; demonstrate deduplication or a recovery-required stop without an uncontrolled second effect. |
| AI-09 | Every protected tool attempt/effect and approval MUST produce an immutable, access-controlled audit event linking actor, scope, run, operation, input/result references, outcome, and time. Persistence failure MUST block a new protected effect; crash recovery MUST reconcile intent and result records. Immutability MUST be append-only for the approved retention period, not an excuse to ignore SEC deletion/legal-hold rules. | Attempt audit modification, deny audit storage, and interrupt between effect and outcome recording; inspect preservation and reconciliation. |
| AI-10 | A tool advertised as reversible MUST define its compensating action, permissions, scope, limitations, and evidence. Reversal MUST be separately authorized and audited; irreversible actions MUST be labeled and gated rather than described as reversible. | Execute and reverse a representative effect; test reversal failure and changed target state without erasing the original audit history. |
| AI-11 | Production generated code/shell MUST execute in a separate restricted sandbox/container/VM chosen after a documented threat model, not inside the application runtime container. Docker packaging alone MUST NOT be treated as proof of isolation. Until the chosen boundary is implemented and evidenced, the affected production capability MUST remain disabled. | Review boundary/threat model and adversarial escape/access evidence; verify production rejects code execution when the boundary is unavailable. |
| AI-12 | That execution boundary MUST use narrowly scoped inputs/outputs, no inherited application/provider credentials, no privileged host/container-management access, constrained mounts, default-denied network with explicit approved exceptions, and enforced CPU/memory/process/time/output/storage limits. Cleanup and failure handling MUST prevent later runs accessing prior-run material. | Attempt host/metadata-service/credential access, forbidden egress, resource exhaustion, and cross-run file reads; record enforced limits. |
| AI-13 | Each provider/model route, including fallback, MUST have customer-approved processing purposes, data classes, location/transfer terms, retention/training terms, credential ownership, and limits. Provider switching MUST NOT silently change these approvals. Customer-hosted telemetry MUST NOT be represented as proof that inference data stays with the customer. | Trace actual request destinations and data disclosures against the provider approval matrix; disable an unapproved fallback. |
| AI-14 | Changes to prompts, models, tools, profiles, SDKs, or execution policies MUST follow the evaluation and delivery standards. Automated hill climbing MUST NOT promote its own winner to production or widen permissions. | Inspect change evidence, evaluation results, required human approval, and the released configuration. |

## Execution design guidance

In-process is a scheduling/deployment choice, not permission to tie accepted work to a browser connection.
A durable acceptance record can support restart detection without asserting that every model stream can resume mid-token.
A recorded incomplete run may legitimately require operator reconciliation; silently declaring success or restarting every effect is not acceptable.
Where the external system lacks idempotency or reliable lookup, serialize the operation where feasible and stop ambiguous retries for an authorized decision.
Compensation is a new effect, not a guarantee that external observers never saw the original action.

The migration seam is the same use-case contract and durable lifecycle across an in-process executor and a worker adapter.
The trigger for moving a workload to workers is an explicit assessment of isolation, duration, concurrency, recovery, and deployment needs, not an invented universal threshold.
Durable record consistency and locking mechanics belong to [storage](../storage/); interface/event contracts belong to [interfaces](../interfaces/).

## Related rule ownership

- [Architecture](../architecture/): ports, adapters, and UI-independent use cases.
- [Identity and security](../identity-security/): permission model, credentials, data lifecycle, and dataset-use authorization.
- [Observability](../observability/): trace correlation, content minimization/redaction, telemetry access, and export.
- [Evaluation](../evaluation/): golden data, proposed heldout safeguards, evaluation methodology, and hill-climb acceptance.
- [Delivery](../delivery/): production approval and release evidence, including the DeltaXY technical reviewer without replacing customer approval.

## Adoption and evidence checklist

- [ ] Approved customer profile identifies agent capabilities, model providers, disclosures, and approval boundaries.
- [ ] SDK package/version and supported adapter APIs verified against official sources for the implementation.
- [ ] Durable run acceptance, reconnect, cancellation, restart, and uncertain-effect recovery demonstrated.
- [ ] Permission failures, prompt injection, retry deduplication, audit failure, and reversal scenarios recorded.
- [ ] Generated-code production capability is disabled or has an evidenced, separately restricted execution boundary.
- [ ] Sandbox network, credentials, resource limits, and cleanup behavior are recorded without claiming Docker alone is sufficient.
- [ ] Prompt/model/tool/profile change evidence links evaluation, human decision, and deployed version.

## Approval question and open choices

**Decision requested:** Approve these execution boundaries, including no default automatic external actions and disabling production generated code until the proposed separate restricted boundary is evidenced?

Open choices: selected Pi package/version and capabilities; durable run store/ownership mechanism; worker migration criteria per workload; sandbox technology and threat model; model/provider approval matrix; numeric limits; audit storage and compensation support.
Current application-container execution remains an explicitly unresolved risk, not a secure baseline. These open implementation choices must be settled for affected capabilities before production adoption.
