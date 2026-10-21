---
title: "Storage and data consistency standard"
sidebar:
  label: "Storage and data consistency"
status: "Draft"
version: "0.1"
owner: "DeltaXY data/platform technical lead"
decision: "Deferred for detailed review"
---

**Applicability:** SQL, file-backed records, object/blob storage, shared files, and persistence migrations in the adopted project scope.

**Interpretation:** MUST means mandatory only after approval and adoption. Existing customer commitments prevail; unresolved conflicts block the affected release.

## Purpose and rationale

Make the authoritative record, visibility of a write, and recovery after partial failure explicit.
A convenient storage SDK does not supply an application consistency model, and a successful write to one resource does not establish an atomic update across several resources.
SQL transactions and versioned object writes can each be appropriate when their actual guarantees fit the operation.
The tradeoff is explicit concurrency/recovery design instead of a superficially uniform abstraction that hides important differences.

## Confirmed baseline

- SQL Server is used alongside emerging file-backed records.
- Azure Blob and Azure Files are used.
- The current cross-store consistency model is undefined; this draft must not imply one already exists.
- Deployments are dedicated by customer, with internal client/engagement isolation still required.
- Retention, deletion, and backups are driven by customer contracts.
- No universal file-record format, transaction isolation level, backup schedule, or recovery objective is confirmed.

## Proposed rules

| ID | Mandatory proposed rule | Verification method |
|---|---|---|
| DATA-01 | Each record type MUST name its authoritative store, schema version, ownership/scope fields, writer, read visibility, and required consistency. Replicas, caches, indexes, and derived artifacts MUST be identified as non-authoritative unless deliberately designated otherwise. | Inspect the record inventory and trace conflicting-copy resolution. |
| DATA-02 | Storage access MUST preserve validated customer/client/engagement scope under SEC rules. SQL predicates, object/file resolution, and list operations MUST enforce scope; storage keys MUST NOT be trusted as proof of authorization. | Review query/path construction and cross-scope read/write/list cases. |
| DATA-03 | SQL changes that must succeed together MUST use an explicit transaction with suitable isolation and constraints. Lost-update and duplicate-write risks MUST have a documented concurrency strategy rather than relying on application read-then-write timing. | Inspect transaction boundaries, constraints, and concurrent-writer scenarios. |
| DATA-04 | Mutable file/object records MUST use store-supported conditional writes, a verified lock protocol, or a proven serialized-writer arrangement. A read followed by unconditional overwrite MUST NOT be represented as conflict-safe. | Inspect ETag/version/lock handling and simultaneous-writer evidence on the selected storage backend. |
| DATA-05 | Every write path MUST state its atomicity unit and failure behavior. Filesystem rename/replace/locking assumptions MUST be validated for the actual filesystem/protocol; they MUST NOT be attributed to Azure Blob or another object store without a corresponding supported operation. | Review backend capability references and deployment-specific interruption/concurrency evidence. |
| DATA-06 | Multi-resource or multi-store writes MUST define commit authority, intermediate visibility, duplicate handling, and recovery. They MUST NOT claim a distributed atomic transaction unless an actual supported mechanism establishes one. | Trace failures after each step and identify authoritative recovery state. |
| DATA-07 | Recovery MUST distinguish completed, pending, conflicted, and uncertain effects and provide an owned reconciliation path. Retried recovery MUST be idempotent or explicitly detect prior effects; orphaned artifacts MUST have a contract-compatible cleanup policy. | Review crash-point scenarios, reconciliation tooling/runbook, and repeated recovery attempts. |
| DATA-08 | File-backed records MUST have explicit schemas and schema versions, runtime validation, encoding rules, and corruption handling. Invalid or partial records MUST NOT be silently replaced with empty/default business data. | Inspect invalid/truncated/unsupported-version cases and operator-visible error handling. |
| DATA-09 | Paths, object names, and uploaded file metadata MUST be treated as untrusted inputs. Resolution MUST prevent traversal and unintended resource access, including applicable symlink/share behaviors; secrets and unnecessary personal data MUST NOT be embedded in names. | Inspect path/key construction and traversal/collision cases for the deployed backend. |
| DATA-10 | Migrations MUST define supported source/target versions, concurrent reader/writer compatibility, interruption behavior, validation, and rollback or forward-recovery strategy before execution. Irreversible changes MUST be identified explicitly. | Review migration plan, representative rehearsal evidence, and recovery decision points. |
| DATA-11 | Migration and recovery plans MUST reference the customer's SEC-owned backup/restore and retention/deletion controls. A backup MUST NOT be treated as usable recovery evidence without an applicable restore validation; cross-store recovery MUST reconcile references to the chosen recovery point. | Inspect linked restore evidence and a restored record-to-artifact consistency check. |
| DATA-12 | Schema migrations, backup/restore operations, repair tools, and reconciliation writers MUST enforce approved identity, scope, and audit controls; direct administrative access MUST NOT silently bypass approval-sensitive business effects. | Review tool permissions, operator steps, and retained change evidence. |
| DATA-13 | Storage adapters MUST expose the conflicts, missing/corrupt records, conditional-write failures, and relevant consistency behavior needed by callers. They MUST NOT hide these distinctions behind unconditional success or a misleading generic CRUD contract. | Inspect adapter outcomes and their use-case/API mappings. |

## Consistency design notes

### Choosing an authoritative record

A useful record inventory names the business entity, its store, its scoped identifier, schema version, and concurrency token.
For each mutation, state what the caller can rely on immediately after success and what other readers may still observe.
A stored document and an SQL row referencing it are separate resources unless the implementation proves otherwise.
Assigning both copies equal authority without a conflict rule is not a consistency strategy.

### SQL and conditional writes

Use SQL transactions for the records that can actually participate in that transaction.
Choose constraints, optimistic versions, locks, or serialization according to the operation; this draft does not mandate one isolation level for all work.
For blob/object stores, use their actual version/precondition mechanism where available and handle a failed precondition as a conflict.
For local or shared files, verify replace, lock, flush, and visibility semantics on the deployed storage/protocol rather than extrapolating from a developer machine.
A process-local mutex alone does not protect against another process, worker, deployment instance, or administrative writer.

### Partial-write recovery

One candidate pattern is to write an immutable artifact, verify it, then commit an authoritative reference with a version precondition.
That is an example to assess—not a confirmed design, a distributed transaction, or proof that an orphan can be deleted immediately.
A different ordering may fit a different workflow if intermediate visibility and recovery are explicit.
Record enough durable intent or state to reconcile an interrupted operation without guessing whether a business effect happened.
Cleanup must respect legal holds, retention, and other references before removing an apparently abandoned artifact.

### Migration and restore

A rollback plan must account for writes made after deployment; restoring an old backup can discard legitimate newer work.
Where reversal is unsafe, define a forward-repair path and the approval/operational constraints for using it.
Schema version is not the same as a concurrency revision: one describes record shape; the other detects intervening changes.
Do not invent a common retention period, backup cadence, or recovery target for every customer.

## Related standards

- [Identity and security](../identity-security/) owns retention, deletion, legal holds, backup/recovery policy, permissions, and data access.
- [Architecture](../architecture/) owns port placement; persistence details stay in adapters.
- [TypeScript](../typescript/) owns runtime validation and resource cleanup.
- [Interfaces](../interfaces/) owns observable conflicts, idempotency, and operation-status contracts.
- [AI execution](../ai-execution/) owns recovery of tool/business effects beyond storage writes.
- [Delivery](../delivery/) owns release controls for migration rollout.

## Adoption and evidence checklist

- [ ] Inventory record types, authoritative stores, schema versions, writers, and scoped keys.
- [ ] Document atomicity, concurrency, partial-write recovery, and reader visibility per mutation.
- [ ] Record backend-specific capability assumptions and attach actual concurrency/interruption evidence when available.
- [ ] Link customer lifecycle obligations, migration plans, restore evidence, and reconciliation ownership.
- [ ] Block affected releases when required consistency or customer contract conflicts remain unresolved.

## Approval question and open choices

**Approval requested:** Approve DATA-01–DATA-13 and require explicit consistency designs before adopting new file-backed record workflows?

Open choices: authoritative store per record type; file-record format and schema evolution; optimistic versus serialized writers; cross-store commit/recovery pattern; customer-specific restore objectives.
No filesystem guarantee for blobs, current cross-store atomicity, or successfully exercised recovery is claimed by this draft.
