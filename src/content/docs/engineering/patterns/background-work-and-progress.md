---
title: "Pattern: background work and live progress"
sidebar:
  label: "background work and live progress"
status: "Draft"
version: "0.1"
owner: "Technical lead and operations owner"
decision: "Deferred for detailed review"
---

**Use when:** work may outlive a request, a browser connection, or an execution process

## Intent

Allow in-process execution initially without coupling business work to an open browser or making the first worker migration a business-logic rewrite. A separate queue is not mandatory merely because this pattern applies.

## Shape

1. The application authorises a start request and records a run with immutable input/configuration references and a deduplication identity where duplicate starts are possible.
2. An execution adapter claims eligible work. The ownership mechanism prevents two executors from assuming exclusive ownership simultaneously.
3. Work records progress and recoverable checkpoints appropriate to its side effects. Secrets are references, not embedded run payloads.
4. WebSocket events announce progress with stable run identity and ordering/version information. They are notifications, not the authoritative record.
5. On reconnect, the client reauthorises and fetches current state. It does not assume it received every prior event.
6. On interruption, the system reconciles actual outputs before retrying. Safe repetition, deduplicated effects, or explicit failure are valid choices; silently duplicating an external action is not.
7. Cancellation records a request. Only the executor can confirm when work actually stops. Previously completed effects remain visible.

## State model to adapt

A simple run may move `queued -> running -> succeeded | failed | cancelled`. Cancellation can be requested while queued/running without falsely showing completed cancellation. A long-running approval workflow may add a waiting state. Define the needed states and transitions in the product specification; do not copy states that have no behavior.

The runtime must distinguish an active executor from an abandoned run. Use ownership/leases or equivalent supported semantics, with a documented recovery process. Persistent status alone does not restart a dead process.

## Evidence to collect

- Close and reopen the browser during a run; observe accurate current status and retained engagement isolation.
- Stop the execution process mid-run; restart it and observe the specified recovery or explicit failure.
- Attempt duplicate starts and conflicting claims; verify the agreed behavior.
- Interrupt after an external effect but before recording success; reconcile without duplicating the effect.
- Request cancellation at relevant stages and inspect which effects completed.

## Limits and decisions

For short, safely repeatable work, an in-process executor with explicit failure recovery can be sufficient. If a customer requires automatic resumability, availability, or horizontal scaling, implement the required durable scheduling and recovery rather than calling an in-memory task durable.

Different hosting profiles may require a worker earlier. Next.js packaging does not guarantee that detached work survives the hosting platform's process/request lifecycle.

Related: [AI execution](../../standards/ai-execution/), [interfaces](../../standards/interfaces/), [storage](../../standards/storage/).

## Approval requested

Approve request-independent run semantics and reconnect/recovery evidence while leaving the queue/runtime implementation product-specific. This is a design reference, not deployed infrastructure.
