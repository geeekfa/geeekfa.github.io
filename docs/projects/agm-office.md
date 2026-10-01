# AGM Office — research notes (internal, not published)

Source: `/Users/geeekfa/Development/Nuxt/AGM-Office` (`.claude/CLAUDE.md`, `.claude/skills/*`,
`store/navbar.js`, `components/project/*`). No screenshots exist for this project — Salman
confirmed we don't have any and the page should describe features generically instead.

## What it is

Internal project-management / accounting system for a promotional-products company (clients,
vendors, projects, orders, approvals, accounting, credit cards, scheduling). Oldest and most
long-running of Salman's projects — 3+ years active, ~64k lines, 143 commits (per resume
research doc `20-project-agm-office-fa.md`).

**Authorship**: Salman built the **Nuxt 2 / Vue 2 frontend only**. The PHP backend
(`/API` endpoints, SQL Server access) was built and is maintained by a different developer —
do not credit Salman with the PHP/backend work in tags or copy. Salman's frontend talks to
that backend through generic Query/Insert/Update endpoints.

## Stack (frontend, verified)

- Nuxt 2, Vue 2.7 (Options API), BootstrapVue 2, SCSS (Dart Sass)
- `@nuxtjs/auth-next` (bearer token, 8h session), axios + proxy
- Vuex (namespaced: authentication, permission, navbar, inbox)
- Ships as a static build (`yarn generate`), deployed via FTP
- Talks to Monday.com's API and Bright Sites (an e-commerce platform) for order sync

## Core structure (from store/navbar.js + components/project/*)

- **Projects**: Advanced Search, Add New Project, Notes/Time Search, Status Dashboard,
  Status Audit, Portal Orders, Sync Bright Stores, Order Item Types, Reconcile Invoices.
  A project record has tabs: Project Info, Status, Orders, Documents, Delivery, Proofs,
  Assignments, Accounting, CC Permission, Notes, Logs.
- **Employees**: search / list / add.
- **Credit Card**: tracking module (tblCC, tblCCLedger, tblCCVendor, tblCCPermission).
- **Clients / Master Clients / Vendors / Shipping companies**: CRM-style entity pages.
- **Calendar / scheduling**.
- **Permissions**: page-level ACL (`tblPermission` keyed by `permissionPageID`), a route
  with no permission row is forbidden by default.

## Project status system (the most technically interesting part — from
`project-status-rules` skill doc)

- Status changes are **append-only**: every change inserts a new `tblProjectStatus` row,
  never edits one. The "current" status is just the newest row. This gives a full,
  tamper-resistant history — important for accounting since money is involved.
- Several places can change status automatically (uploading a vendor order document,
  adding a tracking number) but always ask the user first before doing so.
- **Accounting lock**: once a project reaches an Accounting-stage status, the "new status"
  button is hidden for everyone except users with a specific billing-complete permission.
  This prevents an already-invoiced project from silently being moved backwards.
  Salman found and fixed a real bug here: the lock originally checked for one exact status
  code instead of the whole Accounting sub-tree, so some already-billed projects could
  still be moved back to "Shipped" by mistake.
- **Bulk Order split**: a project flagged as part of a bulk order gets a different,
  narrower set of accounting statuses available depending on the user's role, so a bulk
  order can't be billed the same way as a normal one by accident.
- Every status save also writes an audit log row (who, when, old/new value).

## Dropped from the page

Salman's `.claude/CLAUDE.md` for this project has a hard rule: no AI tool may ever run
INSERT/UPDATE/DELETE directly against production, only write the SQL for him to run by
hand. This was in an early draft of the page as a "feature" but Salman cut it on review —
it's a rule he gave his own AI tooling, not something the software itself does, so it
doesn't belong next to real product strengths. Keep this instinct for future pages too.

## Corrections made on a second honesty pass

- **Permissions**: first draft said denied pages are "just not shown" — wrong.
  `middleware/routerGuard.js` shows the nav is NOT filtered by permission
  (`components/general/FsNavbar.vue` only checks a static `hidden` flag); access is
  actually gated per-route, redirecting to `/forbidden` via `permission/hasAccess`.
  Corrected to describe the redirect/blocked-page behavior.
- **Monday.com sync**: first draft said orders "get pulled in" from Monday.com — wrong
  direction. `plugins/fsMonday.js` only looks up a Monday.com board item by project ID
  and writes AGM's status to it (push, not pull). Corrected; kept the Bright
  Stores/Portal Orders claim (verified via `sp_createProjectsBrightStores`,
  `pages/project/po.vue`) since that one really does turn store orders into projects.

## What NOT to say

- Don't claim Salman wrote the PHP backend or raw SQL schema — frontend only.
- Don't name real clients, vendors, or companies (Bright Stores customer names appeared in
  raw SQL in the repo README — never reproduce those).
- No real screenshots exist — do not fabricate or imply a screenshot gallery.
- Don't reproduce any token/credential values seen in the repo README (Monday.com API
  token, Bright Sites API token) — not even redacted, just never mention them.

## Page shape decided with Salman

`kind: 'features'`, no gallery, no store links (internal tool, not public).
Sections confirmed with Salman:
1. Project tracking & status history
2. Accounting lock & billing safeguards
3. Approvals & permissions
4. Vendors, clients, credit cards
5. Scheduling & Monday.com / Bright Stores sync
