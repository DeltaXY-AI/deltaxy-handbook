---
title: "Pattern: a use case behind adapters"
sidebar:
  label: "a use case behind adapters"
status: "Draft"
version: "0.1"
owner: "Technical lead"
decision: "Deferred for detailed review"
---

**Use when:** the same business capability is invoked from UI, HTTP, WebSocket, a job, or an agent tool

## Intent

Keep business behavior stable while transports and external services vary. The pattern implements the [architecture standard](../../standards/architecture/); it does not mandate an interface or class for every function.

## Shape

1. An inbound adapter authenticates the caller and validates the transport input. Caller identity comes from trusted authentication, not a client-supplied user ID.
2. It calls an application use case with validated input and an explicit actor/scope.
3. The use case enforces resource-level authorization, business invariants and state transitions. Domain logic owns the rules that make the operation valid.
4. The use case invokes a port only for a meaningful external capability, such as versioned record storage or job execution.
5. An outbound adapter implements that port using SQL, files, Pi, or another selected service. A composition root supplies dependencies.
6. The inbound adapter maps the outcome to its transport without inventing different business behavior.

## Concrete design example

A reviewer accepts a finding. The application operation receives the finding ID, expected version, decision, reason where required, and trusted actor context.

It checks engagement access, approval authority, the finding's current version, and permitted transition. Storage records the accepted decision with actor and version information. A version conflict is an explicit outcome; the interface does not claim success while silently replacing another reviewer's decision.

A Next.js server action and an HTTP handler can call the same operation. A Pi tool can call it only if its capability profile permits that action; model text cannot confer authority. A review-only agent is not granted this action merely because it can describe it.

## Evidence to collect

- Exercise the application interface without rendering a page.
- Verify denied engagement access and stale-version decisions fail without an unauthorised write.
- Verify the authorised transition persists the expected decision and audit evidence.
- Where two storage adapters are supported, run the same relevant behavioral contract against both.
- Check import boundaries to keep transport/framework dependencies outside the domain.

## Limits and alternatives

A pure computation does not need a port. A single local helper does not need a repository abstraction. Ports should hide complexity or a real external dependency, not forward every method unchanged.

Do not make a universal repository interface that erases required concurrency or transaction semantics. A file adapter and SQL adapter must expose the same promised behavior, or the product must acknowledge their different supported capabilities.

## Approval requested

Approve application-owned business behavior and concrete adapter seams, not a mandatory folder layout or class count. This is a design reference, not a runnable implementation.
