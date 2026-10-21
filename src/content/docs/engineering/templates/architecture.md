---
title: "Architecture record template"
sidebar:
  label: "Architecture record"
status: "Draft"
version: "0.1"
decision: "Deferred for detailed review"
---

Template version: 0.1 — DRAFT handbook, pending approval.

Use for a product's `docs/architecture.md`. Describe the accepted design and clearly label proposed or unproven elements. The document is not an inventory generated from source files.

## Document control

Record technical owner, review status/date, handbook version, design scope, and links to significant decisions. Identify the code/release state the architecture describes.

## 1. Drivers and constraints

Link product outcomes. State the architectural consequences of security, correctness, data, hosting, performance, operability, and cost constraints. Distinguish measured facts from targets and assumptions.

## 2. System context

Show people, the product, external systems, providers, and trust boundaries. Explain which system owns each authoritative fact. A diagram must clarify real relationships; do not draw decorative boxes for every utility.

## 3. Modules and dependency rules

For each major module, identify responsibility, owned data, public interface, dependencies, and prohibited imports. Identify application use cases, ports where needed, inbound/outbound adapters, and composition roots. Explain why a port exists; do not create one merely to wrap every function.

Acceptance: a use case can be understood without Next.js or a particular database; automated import checks can encode important dependency directions.

## 4. Data ownership and lifecycle

Describe records and documents, stable identifiers, versioning, validation, concurrency, atomicity, migrations, retention, deletion, legal holds if applicable, backup, and recovery. Link authoritative schemas/contracts and contract-specific policies.

For file-backed data, explain write conflicts and partial updates explicitly. Do not equate flexible schemas with absent invariants.

## 5. Interfaces and identity

List human/machine entry points, authentication mechanisms, authorization enforcement, transport contracts, service identities, and external compatibility obligations. Reference API definitions rather than reproducing them.

## 6. Critical execution flows

Walk at least one principal success path and material failure paths. Cover request handling, background execution, progress, reconnect, cancellation, retry safety, and approval where applicable. Show the owner of durable run state.

For AI: identify tools, provider/model selection, inference data paths, result evidence, permission checks, and generated-code isolation. Logging location is not inference location.

## 7. Quality constraints and evidence

State measurable targets and their owners for reliability, latency, throughput, memory, cost and recovery where relevant. Include known operating scale. Avoid arbitrary targets without an accepted user/operational need. Link measurements or spikes supporting uncertain choices.

## 8. Deployment and operation

Record supported deployment profiles, separation of environments, process/worker ownership, secrets, networking, telemetry, alert ownership, backups, restoration, release and rollback. Link concrete project configuration and runbooks rather than embedding secrets or duplicating command lists.

## 9. Decisions, alternatives, and evolution

For consequential choices: context, selected design, credible alternatives, rationale, consequences, and reconsideration trigger. Link longer records under `docs/decisions/`. State what can vary per customer and what remains invariant.

## 10. Unknowns and architecture validation

Assign owners and evidence requirements to unresolved risks. Test representative scenarios against the design: denied access, concurrent update, interrupted execution, unavailable provider, stale approval, and recovery where relevant. Not every scenario applies to every product; explain exclusions.

## Review checklist

- Does every core journey have an execution path and owner?
- Are state ownership, access checks, and failure recovery explicit?
- Can important dependency rules be checked automatically?
- Have critical unproven assumptions been exercised rather than merely diagrammed?
- Is the current architecture distinguished from planned changes?

Related standards: [architecture](../../standards/architecture/), [documentation](../../standards/documentation/).
