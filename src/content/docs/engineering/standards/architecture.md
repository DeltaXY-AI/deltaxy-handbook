---
title: "Architecture standard"
sidebar:
  label: "Architecture"
status: "Draft"
version: "0.1"
owner: "DeltaXY technical lead / architecture reviewer"
decision: "Deferred for detailed review"
---

**Applicability:** New and materially changed application modules, integrations, and execution paths; adoption scope recorded per customer profile.

**Interpretation:** MUST means mandatory only after approval and adoption. Existing customer commitments prevail; unresolved conflicts block the affected release.

## Purpose and rationale

Keep business behavior usable independently of a particular screen, framework, storage engine, or execution host.
A deep module exposes a small interface while hiding substantial implementation detail; this reduces what callers must coordinate.
Hexagonal architecture places replaceable adapters around use cases rather than letting framework or SDK details define business behavior.
The tradeoff is deliberate wiring and mapping code. An interface for every function creates ceremony without useful isolation and is not the goal.

## Confirmed baseline

- TypeScript and Next.js are the application direction.
- The architectural direction is hexagonal, with UI-agnostic use cases.
- Docker is used; hosting depends on the customer.
- Customer deployments are dedicated, with internal client/engagement isolation still required.
- One application initially executes work in-process; other workloads use workers, and work can move to workers as needed.
- Pi SDK and multiple direct model providers are used for AI integration.
- These are confirmed decisions, not evidence that every existing module already conforms.

## Proposed rules

The rows below propose the required architecture contract, not a prescribed directory tree or dependency-injection framework.

| ID | Mandatory proposed rule | Verification method |
|---|---|---|
| ARC-01 | Domain policy and use-case modules MUST NOT import Next.js, React, HTTP request/response types, database drivers, cloud SDKs, or provider SDKs. Adapters depend inward; domain policy does not depend on adapters. | Review import paths and the dependency graph for a representative vertical slice. |
| ARC-02 | Use cases MUST expose business inputs, explicit trusted execution context, and business outcomes independently of UI rendering and transport. They MUST NOT read ambient cookies or infer authority from UI state. | Invoke the same use case through a non-UI test adapter; inspect its interface and context construction. |
| ARC-03 | Ports MUST be limited to meaningful I/O or independently varying capabilities. Pure local helpers MUST remain direct calls unless an actual variation or testability need justifies a seam. | Review each new port's caller, implementation, and concrete reason to vary; reject empty pass-through layers. |
| ARC-04 | Port interfaces MUST express domain needs and failure/concurrency semantics, not leak SDK objects or generic vendor query builders inward. | Inspect port types and failure cases; trace one adapter's SDK-to-domain mapping. |
| ARC-05 | A named composition root for each entry host MUST construct adapters and inject dependencies. Use cases MUST NOT instantiate infrastructure clients or resolve hidden global services. | Locate web and worker wiring; inspect constructors and factories used by a sample use case. |
| ARC-06 | Shared business policy MUST have one owner. HTTP routes, Server Actions, workers, and AI tools MUST call that policy rather than reimplementing authorization-sensitive workflows. | Compare entry points for the same operation and identify the single policy implementation. |
| ARC-07 | Execution context MUST carry the authenticated actor or service identity and validated customer/client/engagement scope needed by the operation. Adapters MUST preserve that scope across storage, jobs, and model calls. | Trace context creation and propagation; inspect cross-scope denial scenarios. |
| ARC-08 | A use case that can run in a worker MUST have serializable invocation data and explicit cancellation/status semantics, without requiring an active browser request. Worker extraction MUST preserve business outcomes and approval requirements. | Review invocation schema and equivalence scenarios for in-process and worker entry points. |
| ARC-09 | Modules MUST expose a deliberate public interface; callers MUST NOT import another module's private storage, UI state, or implementation internals. Cycles MUST be removed rather than hidden with re-exports. | Review public imports and dependency-cycle findings for changed modules. |
| ARC-10 | Customer variation MUST be expressed through a documented customer profile, configuration, or a justified adapter, not scattered customer-name conditionals in business policy. | Trace one customer difference to its profile and owning module. |
| ARC-11 | Material choices that change dependency direction, persistence authority, execution host, or external compatibility MUST record the decision, alternatives, consequences, and accountable reviewer. | Inspect the change's decision record and affected contract links. |
| ARC-12 | Business policy tests MUST exercise the public use-case interface; adapter integration tests MUST cover real infrastructure semantics that a fake cannot establish. | Review the test mapping without treating fake-adapter success as infrastructure evidence. |

## Reference dependency shape

```text
UI / HTTP / WebSocket / worker / AI-tool entry adapter
                         |
                         v
             use-case interface + domain policy
                         |
                         v
                owned outbound port
                         ^
                         |
         SQL / files / model-provider adapter

composition root constructs and connects the concrete adapters
```

The upward arrow means the concrete adapter implements the inward-owned port; it is not a reverse import into business policy.
A use case may be a function with explicit dependencies. Classes and a dependency-injection container are optional.
Domain values may cross seams; raw vendor objects may not become the module's public contract by accident.

## Customer profile and related standards

Record the deployment owner, hosting constraints, active execution hosts, integration endpoints, and approved variation points.
A dedicated deployment does not remove the need for internal client/engagement isolation.
An agent or worker identity does not inherit a human user's approval authority merely because it invokes the same use case.

- [TypeScript](../typescript/) owns type, async, and error implementation rules.
- [Next.js](../nextjs/) owns framework entry points and caching.
- [Interfaces](../interfaces/) owns transport contracts and external compatibility.
- [Storage](../storage/) owns persistence consistency and recovery mechanics.
- Existing client governance continues to govern client-specific commitments, including human approval for downstream writes.

## Adoption and evidence checklist

- [ ] Record adopted scope, accountable owner, customer profile, and existing deviations.
- [ ] Map one end-to-end operation from entry adapter through use case to persistence or provider adapter.
- [ ] Identify composition roots, public interfaces, and the reason for each new outbound port.
- [ ] Attach dependency-review and policy/adapter test evidence; label planned evidence as not yet executed.
- [ ] Record unresolved customer conflicts and prevent the affected release until resolved.

## Approval question and open choices

**Approval requested:** Approve ARC-01–ARC-12 as the adopted architecture standard, with repository-specific implementation plans?

Open choices: initial adoption scope for legacy modules; ownership of cross-module domain policy; which existing long-running use cases need worker extraction first.
No folder naming scheme, DI framework, queue product, or universal worker cutover is approved by this draft.
