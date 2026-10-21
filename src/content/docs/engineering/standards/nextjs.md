---
title: "Next.js application standard"
sidebar:
  label: "Next.js application"
status: "Draft"
version: "0.1"
owner: "DeltaXY web technical lead"
decision: "Deferred for detailed review"
---

**Applicability:** Next.js applications, their server entry points, browser code, rendering, and caches within the adopted project scope.

**Interpretation:** MUST means mandatory only after approval and adoption. Existing customer commitments prevail; unresolved conflicts block the affected release.

## Purpose and rationale

Use Next.js as a web delivery adapter without coupling business policy to rendering or browser state.
Server execution can protect credentials and reduce browser work, but server placement alone does not establish authorization or prevent cached-data disclosure.
The tradeoff is explicit import, serialization, authorization, and cache decisions rather than relying on framework defaults as security guarantees.
Version-sensitive framework behavior must be checked against the version actually deployed; this draft does not claim a specific release's defaults.

## Confirmed baseline

- Next.js and TypeScript are selected.
- Use cases are intended to be UI agnostic.
- Shared UI uses shadcn/ui and Tailwind, with customer themes.
- Deployments are dedicated per customer, but internal client/engagement membership still matters.
- WebSockets are used; One application initially runs work in-process and other workloads can use workers.
- Hosting is customer dependent. No universal router mode, runtime target, cache behavior, or framework version is confirmed.

## Proposed rules

| ID | Mandatory proposed rule | Verification method |
|---|---|---|
| WEB-01 | Route handlers, Server Actions, and server rendering entry points MUST delegate business workflows to UI-agnostic use cases. Framework objects MUST be translated at the entry adapter. | Trace a changed operation and inspect the use-case imports and interface. |
| WEB-02 | Modules containing credentials, privileged storage access, provider SDK configuration, or trusted identity construction MUST be server-only and excluded from browser import graphs. Shared barrels MUST NOT re-export server-only implementations into client code. | Review import graphs and built browser artifacts for the affected entry points. |
| WEB-03 | Client execution MUST be introduced only for required browser behavior. Data passed from server code to browser code MUST be an explicit least-data representation without secrets or privileged internal fields. | Inspect client entry points, serialized props, rendered payloads, and browser-visible responses. |
| WEB-04 | Every server mutation and protected read MUST authenticate and authorize on the server for the requested operation and scope under SEC rules. Hidden controls, middleware, route reachability, and prior page authorization MUST NOT substitute for operation-level checks. | Exercise direct route/action calls and changed/expired membership scenarios without the UI. |
| WEB-05 | Server entry points MUST validate untrusted inputs using CODE rules and map outcomes using API rules. A server function invocation MUST NOT be treated as inherently trusted because it originated in the application UI. | Inspect validators and direct malformed/unauthorized invocation cases. |
| WEB-06 | Cookie-authenticated mutations MUST apply the project's approved request-origin/CSRF controls appropriate to the deployed router and transport. Mutating operations MUST NOT be exposed as side-effecting GET requests. | Inspect deployed request controls and cross-origin mutation scenarios, including Server Actions where used. |
| WEB-07 | Each cache of protected data MUST have a documented owner, scope, lifetime/invalidation trigger, and authorization model. Keys MUST include all dimensions that affect visibility or result, including customer and client/engagement and, where needed, actor/permission context. Unproven protected cache sharing MUST be disabled. | Review server, route, fetch, CDN, and browser cache inventories; inspect cross-scope and permission-change scenarios. |
| WEB-08 | Cache hits MUST NOT bypass current authorization. Membership/role changes, logout, customer/engagement switching, and protected mutations MUST invalidate or otherwise prevent reuse of stale privileged results. | Trace cache-hit authorization and browser-state disposal; test changed access without a full application restart. |
| WEB-09 | Request-independent work MUST use an explicit execution owner and operation contract; it MUST NOT depend on an unobserved promise surviving a request. In-process execution MUST disclose restart behavior and reconcile interrupted accepted work. | Review job acceptance/status persistence and process-restart scenarios against AI/API contracts. |
| WEB-10 | WebSocket serving and background execution MUST be compatible with the chosen host's connection and process-lifecycle constraints. Request, proxy, shutdown, and connection limits MUST be recorded in the customer deployment profile. | Inspect actual hosting configuration and deployment-specific lifecycle evidence. |
| WEB-11 | Server and browser code MUST distinguish pending, successful, failed, cancelled, and uncertain operation outcomes where applicable. Rendering or navigation failure MUST NOT falsely report that a server-side write was undone. | Review action result handling, lost-response cases, and refresh/reconnect reconciliation. |
| WEB-12 | The project MUST declare its Next.js/router/runtime choices and supported deployment behavior. Changes affecting server/client execution, caching, or serialized contracts MUST include compatibility and security impact review. | Inspect package/configuration records and the change-review evidence for framework upgrades. |

## Implementation guidance

### Imports and secrets

Keep privileged modules behind server-only entry paths supported by the project's toolchain.
Do not treat an environment-variable naming convention as the only protection against accidental exposure.
A browser-facing environment variable, rendered value, bundled constant, or serialized prop is public to that browser.
Shared schema and domain-value modules can be imported by both environments only when their transitive imports are safe there.

### Protected data and caching

A customer-specific host name is not sufficient isolation for multiple engagements inside that deployment.
Avoid caching protected responses until the visibility and invalidation model is explicit.
For example, an engagement identifier alone is insufficient if two roles see different fields in the same engagement.
A server cache miss followed by correct authorization does not demonstrate that the cache-hit path is safe.
Review framework caches and surrounding proxy/CDN caches together rather than assuming one setting controls every layer.

### Long-running work

An in-process supervisor can be an initial execution owner when its interruption/recovery contract is acceptable for the customer.
Moving to a worker is an execution choice, not permission to bypass the same use-case authorization and approval gates.
Return or expose the operation identifier used to reconcile progress and terminal outcomes under the interface standard.
The UI should reconnect to authoritative operation state, not infer completion from a closed connection.
This draft does not select a queue product or claim that the current application container provides secure agent isolation.

## Related standards

- [Architecture](../architecture/), [TypeScript](../typescript/), and [Interfaces](../interfaces/) own the inward-facing code and transport rules.
- [Identity and security](../identity-security/) owns authentication, authorization, identity, and scope isolation.
- [AI execution](../ai-execution/) owns execution lifecycle and tool effects.
- [UX](../ux/) and [Visual](../visual/) own interaction behavior and shared visual conventions.
- [Delivery](../delivery/) owns deployment and release approval; existing client deployment commitments remain unchanged.

## Adoption and evidence checklist

- [ ] Record framework/router/runtime and customer hosting choices without implying a universal default.
- [ ] Identify server-only modules, browser entry points, and serialized protected data.
- [ ] Inventory caches and document keys, permissions, invalidation, and browser state transitions.
- [ ] Attach direct-entry authorization, cross-scope cache, and accepted-job interruption evidence when exercised.
- [ ] Record deviations and unresolved customer conflicts before affected release approval.

## Approval question and open choices

**Approval requested:** Approve WEB-01–WEB-12 as the web adapter standard?

Open choices: project-specific router/runtime; protected cache policies; customer host suitability for WebSockets; which accepted in-process operations require persistence or worker extraction.
No framework version, hosting provider, or cache lifetime is approved by this draft.
