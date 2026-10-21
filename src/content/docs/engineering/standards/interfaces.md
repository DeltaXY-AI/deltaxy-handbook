---
title: "HTTP, WebSocket, and integration interface standard"
sidebar:
  label: "HTTP, WebSocket, and integration interface"
status: "Draft"
version: "0.1"
owner: "DeltaXY integration technical lead"
decision: "Deferred for detailed review"
---

**Applicability:** Browser/server interfaces, HTTP integrations, WebSocket messages, and published operation contracts in the adopted project scope.

**Interpretation:** MUST means mandatory only after approval and adoption. Existing customer commitments prevail; unresolved conflicts block the affected release.

## Purpose and rationale

Make independently executing callers and servers agree on meaning, not merely JSON shape.
A useful interface specifies authorization, failures, duplicates, cancellation, compatibility, and recovery when a connection is lost.
Explicit contracts cost design effort but prevent UI assumptions or provider defaults from silently becoming business guarantees.
This standard is neutral between REST, RPC, generated clients, and other HTTP styles; the customer integration contract takes precedence over stylistic preference.

## Confirmed baseline

- Applications use HTTP-facing web interfaces and WebSockets.
- Execution can be in-process or in workers, so progress can outlive a page request.
- Customer deployments are dedicated, with internal client/engagement isolation required.
- Auth uses Entra ID for one client and Better Auth otherwise; roles, membership, approval, and service/agent identities are distinct concerns.
- No common wire envelope, replay store, delivery guarantee, public API version scheme, or external compatibility window is confirmed.

## Proposed rules

| ID | Mandatory proposed rule | Verification method |
|---|---|---|
| API-01 | Each published operation/message MUST document input/output schemas, required identity and scope, side effects, failure categories, and relevant limits. Runtime validation MUST follow CODE rules; generated types alone MUST NOT count as validation. | Inspect the contract and representative accepted/rejected payload cases. |
| API-02 | Every protected request and subscription MUST apply SEC authorization rules for its operation and scope. Subscription selectors and client-supplied customer/engagement identifiers MUST NOT grant authority. | Inspect direct unauthorized calls and cross-engagement subscription cases. |
| API-03 | HTTP interfaces MUST use consistent documented status/error semantics for invalid input, authentication, authorization, not-found, conflict, unavailable dependency, and unexpected failure as applicable. Errors MUST expose safe stable categories and a diagnostic correlation reference, not internal exception contents. | Review response mappings and representative error responses against the documented contract. |
| API-04 | Retriable side-effecting operations MUST define duplicate detection/idempotency scope, key lifetime, payload-mismatch behavior, and recovery after uncertain completion. Callers MUST NOT retry an unsafe write automatically merely because its response was lost. | Inspect duplicate requests, mismatched reuse, concurrent duplicates, and post-commit connection-loss scenarios. |
| API-05 | An accepted long-running operation MUST have an authoritative operation identifier, retrievable scoped status, and defined terminal outcomes. Acceptance MUST distinguish queued/running work from completed business effects and state what survives process restart. | Review acceptance/status contracts and interrupted accepted-work evidence. |
| API-06 | Operation status MUST define valid state transitions, cancellation meaning, and a monotonic revision or equivalent ordering mechanism. Terminal outcomes MUST NOT regress because delayed progress arrives. Wire-schema version and status revision MUST be distinct concepts. | Inspect transition definitions and out-of-order/duplicate status handling. |
| API-07 | WebSocket contracts MUST define handshake authentication, allowed origins where browser credentials are used, subscription authorization, message schemas, and treatment of malformed/unsupported messages. Sensitive credentials MUST NOT be placed in observable URLs. | Review handshake configuration and invalid-auth/origin/message scenarios. |
| API-08 | Persistent connections MUST define auth expiry, revoked access, scope changes, renewal/reconnect behavior, and how delivery is stopped when authority is no longer valid. An authenticated handshake MUST NOT grant indefinite access. | Inspect expired-session and removed-membership behavior during an active subscription. |
| API-09 | Reconnect contracts MUST define resume cursors and replay availability, or explicitly require an authoritative snapshot when replay is unavailable. Clients MUST reconcile duplicates, gaps, and out-of-order events rather than treating reconnect as proof nothing was missed. | Review disconnect/reconnect scenarios with missed, duplicated, and expired-cursor events. |
| API-10 | WebSocket and streamed interfaces MUST declare delivery/order guarantees, message/connection limits, heartbeat/liveness handling, and backpressure behavior. Notification loss MUST NOT erase the authoritative operation result. | Inspect configured limits and slow-client/disconnect handling against the declared guarantees. |
| API-11 | Externally consumed interfaces MUST have an identified compatibility owner, version/change policy, consumer inventory, and agreed transition process. Breaking changes MUST NOT silently replace an existing customer contract; compatibility adapters need an explicit retirement plan. | Review consumer impact and customer-agreed migration evidence before rollout. |
| API-12 | HTTP and WebSocket views of the same operation MUST agree on identity, scope, status meaning, and terminal results. WebSocket progress MUST be treated as a projection unless the contract explicitly establishes it as authoritative. | Compare snapshot and event scenarios for the same operation, including completed work after reconnect. |
| API-13 | List/page/stream contracts MUST define ordering, cursor lifetime or pagination semantics, and visibility filtering before pagination. Sensitive resource existence MUST be disclosed only as permitted by the customer's security contract. | Inspect cross-scope pagination and stale/invalid-cursor cases. |

## Contract design notes

### Operation progress

A contract may distinguish accepted, running, waiting-for-approval, succeeded, failed, and cancelled states where those states actually exist.
These names are illustrative, not an approved mandatory wire vocabulary.
Cancellation is a request until the execution owner confirms its effect; already committed writes require their documented reconciliation or compensation path.
An uncertain result must remain uncertain until authoritative state resolves it, not be converted into a false success or a safe-to-retry failure.
Status revision orders updates to an operation. Schema version tells a consumer how to interpret the payload.

### Reconnect and authentication

Choose replay or snapshot reconciliation based on the actual customer need and available storage; do not promise replay without retaining the events needed to provide it.
If replay expires, return an explicit resynchronization outcome and fetch current state.
Renewal must revalidate authority; changing the displayed engagement requires terminating or replacing subscriptions whose scope no longer applies.
A client may reconnect after a transport failure, but business-write retries remain governed by the idempotency contract.
Backoff intervals, heartbeat timings, and retention windows belong in the customer/project profile rather than being invented as universal defaults.

### Compatibility

Compatibility covers field meaning, enum values, nullability, status codes, authorization, ordering, and side effects—not only renamed fields.
Even an additive field or enum value can break a strict consumer; verify the actual consumer contract.
Internal callers should migrate together when feasible, avoiding permanent aliases. External consumers may require a staged, explicitly agreed transition.
A new version number is not approval to break a customer integration without the agreed notice and migration process.

## Related standards

- [Architecture](../architecture/) owns use-case interfaces; this document owns their transport projection.
- [TypeScript](../typescript/) owns runtime input validation and code-level error conventions.
- [Identity and security](../identity-security/) owns authentication, authorization, and scope policy.
- [AI execution](../ai-execution/) owns execution effects, interruption, and approval behavior.
- [Storage](../storage/) owns durable consistency supporting idempotency and authoritative status.
- [Observability](../observability/) owns correlation and safe diagnostic content.

## Adoption and evidence checklist

- [ ] Inventory consumers and record customer-specific protocol and compatibility requirements.
- [ ] Publish schemas, error categories, operation states/revisions, and authentication lifecycle.
- [ ] Select and document replay versus snapshot recovery and idempotency guarantees.
- [ ] Attach duplicate-write, reconnect, out-of-order, and expired-auth evidence when exercised.
- [ ] Resolve customer contract conflicts before affected release approval.

## Approval question and open choices

**Approval requested:** Approve API-01–API-13 without mandating REST, RPC, or a universal wire envelope?

Open choices: replay versus snapshot per stream; status revision representation; idempotency retention per operation; external version policy and customer-agreed compatibility windows.
These are proposed safeguards, not claims about current runtime guarantees.
