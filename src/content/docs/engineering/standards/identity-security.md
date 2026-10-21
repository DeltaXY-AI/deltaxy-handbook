---
title: "Identity, authorization, and data security"
sidebar:
  label: "Identity, authorization, and data security"
status: "Draft"
version: "0.1"
owner: "Security lead, accountable with the customer engagement owner"
decision: "Deferred for detailed review"
---

**Applicability:** Application services, agents, integrations, administration, and customer data throughout its lifecycle.

**Rule prefix:** SEC. “MUST” below becomes mandatory only after approval and adoption.

## Purpose and rationale

Authenticate identities without confusing successful sign-in with permission to act.
Protect both customer boundaries and engagements inside each dedicated deployment.
Central enforcement reduces gaps between UI, background processing, and support tools, but requires explicit resource ownership and negative tests.
Retention and recoverability are contract decisions, not universal duration targets; keeping everything indefinitely is not a safe default.

## Confirmed baseline

- One client uses Entra ID; other deployments use Better Auth. These are authentication choices, not a complete authorization design.
- Customer deployments are dedicated, with internal engagement isolation required.
- Authorization needs role permissions, client/engagement membership, separate approval permissions, and service/agent identities.
- Storage includes SQL Server, emerging file-backed records, Azure Blob, and Azure Files; consistency details remain undefined.
- Retention, deletion, and backups follow customer contracts; no universal periods or recovery targets are confirmed.
- Existing client governance governs its approved Azure DevOps/Pipelines, environment segregation, SAST/DAST, and human approval before downstream writes.

Existing customer commitments prevail. Unresolved conflicts block the affected release; a handbook default does not silently migrate client to a different platform or approval process.

## Proposed mandatory rules

| ID | Proposed rule | Verification method |
|---|---|---|
| SEC-01 | Server entry points MUST authenticate supported user/service identities and deny authorization by default. Every protected operation MUST check permission, customer/client boundary, engagement membership, resource ownership, and relevant workflow state; client-supplied IDs or hidden UI controls are not authority. | Negative tests cover anonymous, wrong-role, wrong-customer, wrong-engagement, and forged-resource requests. |
| SEC-02 | Isolation MUST cover reads and writes, search/list results, downloads, exports, signed links, cached results, jobs, WebSocket subscriptions/events, traces, and support tools. A service MUST resolve scope from trusted identity and resource records, not accept a requested scope without checking it. | Exercise the same resource across two customers and two engagements through each exposed access path. |
| SEC-03 | Membership and approval permission MUST be independently evaluated. Approval MUST bind approver, action, resource/version, and scope; changed content invalidates that approval. Background execution MUST revalidate authority before a protected effect, and revocation MUST stop subsequent protected access. | Revoke access or edit content after queueing/approval; confirm later execution, downloads, and streaming delivery are denied. |
| SEC-04 | Service and agent identities MUST have named ownership, purpose, environment, scope, expiry/review conditions, and least-privilege grants. Delegated execution MUST preserve the initiating actor and may not gain authority merely by switching to a service identity. | Review identity/grant inventory; test a job cannot exceed its approved delegated scope. |
| SEC-05 | Credentials MUST stay outside source, prompts, generated code, normal logs, and datasets. Approved secret handling MUST restrict readers and environment access, support rotation/revocation, and avoid sending credentials to models. | Review secret configuration and scan representative source, build artifacts, prompts, and telemetry; demonstrate revocation. |
| SEC-06 | Session, token, cookie, and transport settings MUST follow the chosen provider's supported security configuration and customer profile, including issuer/audience checks where applicable, logout/revocation behavior, request-origin/CSRF protection where applicable, and protected transport. | Review provider configuration against its current official documentation; test invalid/expired sessions and cross-origin state-changing requests. |
| SEC-07 | Untrusted documents, retrieved text, model output, filenames, and tool results MUST remain data, not authority to widen permissions or disable checks. Tool authorization MUST execute outside model instructions; prompt wording alone is not an access control. | Adversarial inputs request secret disclosure, cross-engagement access, and unauthorized tool execution; verify rejection. |
| SEC-08 | Each customer profile MUST identify data classes, permitted processing/storage locations, approved access roles, encryption/key responsibilities, third-party disclosures, and development/test data permissions. Unsupported or unresolved requirements MUST block affected processing. | Review profile against the contract and actual data-flow/access inventory, including model providers. |
| SEC-09 | Retention/deletion rules MUST cover primary records, source files, attachments, exports, caches, audit/trace content, derived datasets, and backups. Each class MUST identify retention trigger, disposal method, responsible owner, and evidence; legal holds MUST suspend applicable deletion with authorized release of the hold. | Trace a sample record and its copies through disposal and hold/release scenarios; record any contract-approved delayed backup expiry. |
| SEC-10 | Backup and recovery arrangements MUST specify contract-approved recovery objectives, scope, protection, ownership, restore permissions, and recovery evidence. Verified recovery MUST demonstrate usable data and required consistency, not merely a successful backup job. | Restore representative records/files and required relationships in an authorized isolated environment; record achieved recovery and unresolved gaps. |
| SEC-11 | Restore procedures MUST preserve or reapply deletion, access revocation, and legal-hold state before restored data becomes available. Disposal of immutable backups MUST follow documented contractual treatment rather than claim immediate selective erasure when unsupported. | Recover a sample with previously deleted/revoked/held records and demonstrate the intended visibility and lifecycle result. |
| SEC-12 | Shared datasets MUST have explicit source permissions, purpose, customer/engagement scope, recipients, retention, and withdrawal/deletion handling. Production access or telemetry access MUST NOT imply permission for cross-customer reuse, evaluation, training, or provider upload. | Review dataset manifest and grants; deny an unauthorized customer/engagement consumer and trace removal of an approved sample. |
| SEC-13 | Security findings and incidents MUST have an owner, containment decision, evidence, and customer-required notification/approval handling. Required customer security scans and segregation controls MUST remain release gates; this proposal cannot waive them. | Inspect release/incident records and the applicable customer governance requirements. |
| SEC-14 | Upload and remote-fetch surfaces MUST enforce supported content types, actual content validation, resource/decompression limits, safe path handling, and the customer-required quarantine/scanning policy. Remote fetches MUST restrict destinations and redirects against the approved network policy, including internal and metadata services. | Exercise misleading extensions, oversized/compressed inputs, traversal, unsafe redirects and disallowed network destinations in an isolated environment. |
| SEC-15 | Database operations MUST use parameterized values and allowlisted dynamic identifiers where needed. Untrusted content MUST be safely encoded or sanitized for its rendering context and MUST NOT enter executable templates, shell commands, or query syntax unchecked. Generated-code capability follows AI sandbox controls, not an exemption from this rule. | Review database, rendering and process-invocation seams; exercise representative injection cases without production data or effects. |

## Implementation boundaries

Authentication adapters establish a trustworthy identity; application authorization decides whether that identity may perform a use case.
Authorization failures should not expose the existence or content of another engagement's resources.
A download or export needs the same protection as its underlying source, including access to stored output after the job completes.
Long-lived WebSocket connections need authorization on subscriptions and protected deliveries, with a defined revocation mechanism rather than relying indefinitely on connection-time checks.
A customer-wide administrator is an explicit privileged role, not an implicit bypass for every service account.
Storage transaction and consistency mechanics belong to [storage](../storage/), not a second authorization implementation; [interfaces](../interfaces/) owns HTTP/WebSocket contracts and [delivery](../delivery/) owns release gates.

[AI execution](../ai-execution/) owns tool effects, approvals at execution, and sandbox controls; it consumes this permission model.
[Observability](../observability/) owns telemetry capture and redaction; SEC owns the underlying access, retention, and data-use permission decisions.

## Customer profile decisions required

- Identity provider configuration and account provisioning/deprovisioning ownership.
- Role/action matrix, engagement boundaries, privileged support access, and any required segregation of duties.
- Contractual data locations, encryption/key custody, disclosure permissions, retention schedules, legal holds, and deletion exceptions.
- Recovery objectives, backup locations, restore authority, and evidence frequency agreed for that customer.
- Dataset reuse permissions and incident notification obligations; no obligations are inferred merely from this draft.

## Adoption and evidence checklist

- [ ] Customer profile reconciled with signed commitments and existing governance.
- [ ] Resource ownership and role/membership/approval matrix recorded, including service identities.
- [ ] Negative authorization evidence covers every exposed transport and stored derivative.
- [ ] Credentials, session controls, and privileged access reviewed with named owners.
- [ ] Lifecycle inventory covers datasets, audit records, legal holds, backup expiry, and restored copies.
- [ ] Recovery evidence demonstrates usable, appropriately scoped data; gaps have owners and release impact.
- [ ] Security evidence and approval are stored where the customer permits, without embedding secrets.

## Approval question and open choices

**Decision requested:** Approve SEC as the proposed baseline for customer-specific adoption, including deny-by-default authorization and contract-led lifecycle controls?

Open choices: authorization library/enforcement structure; role catalogue and support-access process; secret/key tooling; customer-specific retention and recovery objectives; restore/delete reconciliation mechanism; required independent approval duties.
None of these tooling or duration choices is confirmed by this draft. Missing contract terms or unresolved isolation/recovery controls block the affected adoption or release rather than being filled with invented defaults.
