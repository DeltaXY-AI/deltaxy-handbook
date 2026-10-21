---
title: "TypeScript coding standard"
sidebar:
  label: "TypeScript coding"
status: "Draft"
version: "0.1"
owner: "DeltaXY technical lead / code reviewer"
decision: "Deferred for detailed review"
---

**Applicability:** Application, integration, worker, script, and test TypeScript within each project's adopted scope.

**Interpretation:** MUST means mandatory only after approval and adoption. Existing customer commitments prevail; unresolved conflicts block the affected release.

## Purpose and rationale

Make invalid states and unsafe assumptions visible without obscuring straightforward code.
Static types help callers use an interface correctly, but cannot prove that HTTP, storage, configuration, or model output matches that interface at runtime.
The standard therefore combines strict typing inside a module with explicit validation at untrusted entry points.
The tradeoff is some mapping and validation code in exchange for fewer implicit assumptions and more actionable failures.

## Confirmed baseline

- TypeScript is the selected implementation language.
- Next.js is used for the web application; use cases are intended to be UI agnostic.
- Integrations include storage, AI providers, and asynchronous/background execution.
- Current testing is mostly manual; comprehensive automated coverage is a desired direction, not a confirmed present capability.
- No TypeScript version, validation library, formatter, linter, or repository-wide strictness compliance is confirmed by this draft.

## Proposed rules

| ID | Mandatory proposed rule | Verification method |
|---|---|---|
| CODE-01 | Adopted TypeScript projects MUST enable `strict`; executable source MUST be included in the appropriate typecheck. Suppressions MUST be local, justified, owned, and reviewed rather than weakening the project globally. | Inspect effective compiler configuration, included files, and recorded suppression rationale. |
| CODE-02 | Untrusted external values MUST enter as `unknown` or an equivalently untrusted representation and be runtime-validated before becoming trusted domain input. Validation MUST check relevant shape, bounds, and business invariants; a cast is not validation. | Trace representative HTTP, stored-record, environment, and model-output inputs; inspect malformed-input cases. |
| CODE-03 | `any`, type assertions, non-null assertions, and compiler suppression directives MUST be limited to an explicit interoperability or proven invariant need, with nearby reasoning. Double casts and test-only assertions MUST NOT manufacture impossible domain values. | Review each introduced escape hatch and the evidence establishing its invariant. |
| CODE-04 | Module interfaces MUST make required/optional values, failure cases, and meaningful state distinctions explicit. Missing, empty, zero, and false MUST NOT be conflated unless the contract says they are equivalent. | Inspect exported types and edge-case tests; review truthiness-based defaults. |
| CODE-05 | Names MUST describe domain meaning and observable action. Exported operations MUST use descriptive verbs, types use descriptive nouns, and identifiers/units MUST be unambiguous at seams. Existing local naming conventions MUST be preserved unless an intentional migration is approved. | Review names against their actual effects and domain terminology; inspect ambiguous ID/time/size parameters. |
| CODE-06 | Every promise MUST have an owner that awaits it, returns it, or registers it with managed execution and error handling. Unobserved fire-and-forget work MUST NOT carry a business commitment. | Inspect promise ownership and rejected-promise paths, including event callbacks. |
| CODE-07 | I/O operations MUST propagate supported cancellation and use a documented bounded deadline where waiting can otherwise be unbounded. Cancellation MUST remain distinguishable from ordinary failure and MUST NOT be reported as rollback of an already committed effect. | Inspect signal/deadline propagation and cancellation-before/during/after-commit scenarios. |
| CODE-08 | Resource ownership MUST be explicit; acquired handles, streams, subscriptions, timers, locks, and transactions MUST be released on success, failure, and cancellation using `finally` or an equivalent lifecycle mechanism. | Review acquisition/release pairs and exceptional paths. |
| CODE-09 | Expected failures MUST use one documented local result/error convention with stable categories. Unexpected failures MUST preserve diagnostic cause, remain failures, and be mapped to safe external responses at the transport adapter. | Inspect expected/unexpected error examples and adapter mappings; confirm no catch-and-success fallback. |
| CODE-10 | Retries MUST occur only at an identified owner under the operation's idempotency and deadline contract; nested layers MUST NOT silently multiply retries. | Trace retry ownership and duplicate-effect behavior through a complete call chain. |
| CODE-11 | Shared abstractions MUST solve demonstrated repetition or a real variation seam. Speculative generic frameworks, pass-through wrappers, and duplicate compatibility aliases MUST NOT be added as preparation for an unspecified future need. | Identify current callers and simplification gained; review removed obsolete call sites. |
| CODE-12 | Concurrent work and memory use MUST be bounded by the operation's documented workload assumptions. Avoidable repeated parsing, copying, reads, and full buffering MUST be removed when a simpler bounded path exists. | Inspect workload limits and streaming/batching choices; request measurements where scale claims drive design. |
| CODE-13 | Mutations of shared inputs MUST be explicit in the interface; otherwise operations MUST treat caller-owned inputs as immutable. Cross-request mutable state MUST NOT carry actor or engagement context. | Inspect mutation sites, shared module state, and concurrent-request isolation scenarios. |
| CODE-14 | Comments and documentation MUST explain non-obvious intent, invariants, or constraints rather than restate syntax. Dead code, stale comments and obsolete internal callers MUST be removed with the change; required external compatibility follows API rules. | Review changed code and comments against current behavior and the consumer migration plan. |
| CODE-15 | Each repository MUST have one agreed formatting/lint configuration and executable checks for its adopted scope. Mechanical style MUST be enforced by tools rather than competing prose preferences; broad unrelated restyling MUST remain separate from behavior changes. | Inspect checked-in configuration and actual formatting/lint results for changed scope. |
| CODE-16 | New dependencies MUST have a justified purpose, maintenance/license/security review, and an identified owner. Dependency manifests and lockfiles MUST agree; version changes MUST be deliberate and validated rather than silently introduced during deployment. | Inspect dependency rationale, license/security disposition, locked install configuration, and affected behavior checks. |

## Implementation guidance

### Trust transitions

Parse once at the trust transition and pass the validated representation inward.
Do not repeatedly validate the same trusted value in every pure helper; do validate again when provenance or persistence schema can change.
A generated client type is useful static information, not runtime evidence that a remote peer behaved correctly.
Stored JSON and model-generated structured output remain untrusted until validated against the applicable record/output schema.
Authorization is a separate decision from structural validation; a well-shaped engagement identifier is not proof of access.

### Errors and async work

Choose either typed result values or categorized errors for expected failures within a module; document its interface rather than enforcing a universal result wrapper.
Treat not-found, conflict, invalid-input, cancellation, and unavailable-dependency outcomes deliberately where applicable.
An external error response must not expose stack traces, credentials, prompts, or raw upstream response bodies.
Logging and error reporting should have an identified owner so a propagated failure is not recorded repeatedly as independent incidents.
A detached promise is not a durable job. Request-independent work follows the execution and transport contracts below.

### Scope of tooling choices

This draft does not prescribe semicolons, a preferred validation library, a test-data library, or a particular TypeScript release.
Use the repository's established tooling until a reviewed change deliberately replaces it.
Apply strictness migrations in explicitly recorded adoption slices; do not describe untouched legacy code as compliant.

## Related standards

- [Architecture](../architecture/) owns dependency direction and minimal ports.
- [Interfaces](../interfaces/) owns public error contracts, idempotency, and compatibility.
- [Identity and security](../identity-security/) owns authorization and secret-handling policy.
- [AI execution](../ai-execution/) owns managed execution, effects, and recovery policy.
- [Observability](../observability/) owns safe diagnostic content and correlation.
- [Testing](../testing/) owns the verification strategy and retained test evidence.

## Adoption and evidence checklist

- [ ] Record compiler configuration, adopted source scope, reviewer, and existing exceptions.
- [ ] Inventory untrusted inputs and identify their runtime validators.
- [ ] Document local error convention, promise/resource owners, retry owners, and deadline sources.
- [ ] Attach typecheck/review and relevant failure-path evidence when performed; do not label planned checks as passing.
- [ ] Record customer constraints and block unresolved conflicts for affected releases.

## Approval question and open choices

**Approval requested:** Approve CODE-01–CODE-16, including explicit strictness adoption plans for existing repositories?

Open choices: first migration slice; existing suppression debt; repository error convention; whether additional compiler flags or a common validation library merit separate approval.
