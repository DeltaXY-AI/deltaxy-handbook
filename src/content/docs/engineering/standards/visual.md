---
title: "VIS — Visual design and shared presentation"
sidebar:
  label: "VIS — Visual design and shared presentation"
status: "Draft"
version: "0.1"
owner: "Design-system / frontend lead"
decision: "Deferred for detailed review"
---

**Applicability:** Shared web components, customer themes, product screens, and user-facing copy.

## Purpose and rationale

Provide a coherent visual language without erasing customer identity or forcing all workflows into one layout.
Shared components and semantic tokens reduce repeated decisions and make accessibility fixes reusable.
They also create a wider change impact: a shared fix must be assessed across adopting products and themes.
Customer-specific composition is legitimate; untracked component forks and arbitrary styling are expensive to maintain.

## Confirmed baseline

- The shared UI approach is shadcn/ui with Tailwind and customer-specific themes.
- Next.js is the web framework; use cases remain independent of the presentation layer.
- No particular logo, palette, typography family, token values, or customer brand guide is established here.
- The baseline does not imply that a component inventory, token package, or visual regression tool already exists.

## Proposed rules

**MUST** below means mandatory only after approval and adoption for the applicable project.
Existing customer commitments prevail; unresolved conflicts block the affected release.
The client governance baseline is not replaced by this standard.

| ID | Mandatory proposed rule | Verification method |
|---|---|---|
| VIS-01 | Each product MUST record its approved customer brand inputs, theme owner, supported modes, and permitted deviations; unconfirmed brand assets or colors MUST remain proposals rather than be represented as customer-approved. | Review theme decisions against customer-supplied or expressly accepted inputs. |
| VIS-02 | Shared presentation MUST use semantic tokens for color, typography, spacing, shape, elevation, and motion where those concepts apply. Repeated values MUST enter the shared token vocabulary rather than proliferate as screen-local overrides. | Review representative components and token usage; identify intentional one-off exceptions. |
| VIS-03 | Customer themes MUST map the shared semantic token contract without changing business meaning, permissions, or approval behavior; theme-specific assets MUST be scoped to the intended customer. | Render the same state fixtures under each supported theme and inspect scope selection. |
| VIS-04 | Teams MUST prefer existing shared components and extend them where appropriate before creating duplicates; product-specific variants MUST have an explicit rationale, owner, and supported usage. | Review component inventory and change rationale for new or forked variants. |
| VIS-05 | Each shared component MUST document supported states and interaction responsibilities, including disabled, focus, validation, and loading states where relevant. Locally maintained shadcn-derived code MUST have an identified maintenance owner. | Inspect component examples and ownership records; connect interactions to UX acceptance. |
| VIS-06 | Text, controls, focus indicators, and meaningful graphics MUST meet the adopted UX accessibility target in every supported theme/mode; color alone MUST NOT convey status or required action. | Contrast checks using actual foreground/background pairs plus manual state review. |
| VIS-07 | Layouts MUST handle agreed viewport sizes, text expansion, long customer content, and zoom/reflow without hiding critical evidence or actions; essential information MUST NOT depend on hover alone. | Exercise responsive examples and representative long, empty, and localized content. |
| VIS-08 | User-facing copy MUST use a maintained product vocabulary, clear action labels, and consistent date/number/time-zone conventions from the customer profile. Draft, approved, and completed MUST remain distinct terms. | Review workflow copy against the vocabulary and customer locale decisions. |
| VIS-09 | Motion and decorative effects MUST preserve readability, focus visibility, and reduced-motion preferences; they MUST NOT delay access to an urgent action or be the only status cue. | Reduced-motion and keyboard review of affected components. |
| VIS-10 | Shared token or component changes MUST include representative before/after evidence across affected themes and states, and identify adopting products that require updates. | Review screenshots or equivalent rendered evidence and adoption impact list. |
| VIS-11 | Visual evidence MUST use approved synthetic or authorized data; screenshots and component examples MUST follow the data-handling controls referenced below. | Review fixture provenance and evidence access classification. |

## Proposed presentation contract

A theme supplies values; a component implements presentation and interaction; a use case decides business behavior.
Do not move policy into color variants or change action semantics based on a logo/theme choice.

| Semantic area | Example intent, not prescribed values |
|---|---|
| Surface and content | Page, raised panel, primary text, muted text |
| Action | Primary action, secondary action, unavailable action, focus |
| Feedback | Information, warning, error, success, unreviewed suggestion |
| Typography and layout | Heading hierarchy, body, labels, evidence text, spacing scale |
| Motion and emphasis | Progress feedback, transitions, reduced-motion behavior |

A customer profile can select a dense reviewer workspace or a simpler guided workflow.
Neither choice permits illegible evidence, inaccessible controls, or misleading state presentation.
Component reuse does not require every product screen to be visually identical.

## Adoption and evidence checklist

- [ ] Inventory current components, duplicate patterns, and customer-specific styles.
- [ ] Confirm the theme owner and obtain actual customer brand inputs or record them as unresolved.
- [ ] Introduce semantic tokens around a small set of frequently reused components first.
- [ ] Capture examples covering supported themes, modes, error states, and long content.
- [ ] Review contrast and focus behavior against the [UX standard](../ux/), including customer overrides.
- [ ] Attach before/after evidence to shared changes and identify downstream adopters.
- [ ] Record approved transition gaps with owner, scope, expiry, and mitigation.

Existing products may migrate component by component under an approved adoption plan.
A broad redesign is not a prerequisite for fixing an accessibility or state-clarity defect.
No screenshot service, component explorer, or visual test runner is mandated or claimed to be installed.

## Ownership boundaries

- [UX](../ux/) owns interaction states, accessibility target, approval usability, and evidence semantics.
- [Testing](../testing/) owns behavioral and visual-regression execution evidence; visual comparison alone is not functional acceptance.
- [Identity and security](../identity-security/) and [storage](../storage/) own authorized handling of customer data and assets.
- [Documentation](../documentation/) owns durable decisions and customer-profile records.

## Approval question and open choices

**Approve semantic-token and shared-component governance with customer-specific, explicitly accepted themes?**

Open choices: initial token vocabulary and component inventory; theme approval authority;
font and asset licensing requirements per customer; supported light/dark modes; and the preferred visual-review workflow.
No branding values or universal mode requirements are approved by this draft.
