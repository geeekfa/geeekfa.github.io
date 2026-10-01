# BTS AI — research notes (internal, not published)

Source: `/Users/geeekfa/Development/Projects/btsai` (`.claude/CLAUDE.md` + skills), cross-checked
against `/Users/geeekfa/Development/Projects/resume/docs/research/07-project-bts-ai-fa.md`.

## What it is

Internal AI platform for Black's Tire (Blackstire). Stack: Nuxt 4 portal (Quasar) + FastAPI
backend + Postgres/pgvector + Celery worker. Never deployed publicly — internal tool, gated by
company login (MSSQL credential check → JWT). No app-store links.

## Scope chosen for the page (confirmed with Salman — "features" shape, 3 areas)

1. **Visit Notes Analyst** — conversational analytics chat (`/chatbot/tsm`, module type
   `artifact_agent`, agent id `visit_notes_analyst`).
2. **Document Central** — RAG chatbot over ~260 internal company PDFs (`/chatbot/document-central`,
   agent id `document_central`).
3. **TSM Dashboard** — manager-facing overview page, no chat (`/dashboard/tsm`).

Admin panel (scheduling + decision log) and the Storage upload page were explicitly left out —
Salman picked "just the two chatbots + TSM" when asked which features to cover.

## 1. Visit Notes Analyst — real mechanics

- **Non-negotiable architecture**: the model (`openai/gpt-5.4-mini`, JSON mode) ONLY plans —
  picks one of a fixed set of typed tools + args. It never writes raw SQL and never sees/emits
  raw data rows. The backend compiles the tool call to parameterized SQL against a column
  whitelist, enforces scope from the caller's JWT, and returns real rows. The frontend renders
  the result through one `AnswerRenderer` that switches on block type.
- **Tools**: `count_by_finding`, `top_customers_by_finding`, `timeline`, `list_notes`,
  `group_by_count`, `search_notes` (pgvector cosine similarity over note embeddings),
  `analyze_intent` (two-stage semantic recall → model-verify, for complaint/sentiment questions
  where a topic tag like "price_sensitivity" isn't the same as an actual complaint).
- **Session scope**: first turn always collects date range + customer + contributor filters
  (`SessionFiltersControl` in the composer) before answering (unless the question already implies
  a time range, e.g. "last week").
- **Multi-turn memory**: aggregate rows (counts, labels — never raw note text) are echoed into
  conversation history so follow-ups like "who's the 3rd customer in that list?" resolve without
  re-running a tool. Raw note bodies never enter the LLM context.
- **Snapshot, not live**: every answer is a frozen snapshot with absolute dates. Refresh is
  explicit and shows a delta badge (+N new / −M removed) — chosen deliberately so numbers never
  silently change on reopen.
- **Output types (block types)**: markdown, metric, table, notes panel, chart (ApexCharts only),
  error, citations, flowchart (Mermaid) — 8 types total, picked per question.
- **Guardrails**: injection guard on every message (own small model pass before the real answer),
  scope enforced server-side from JWT (model can never widen what a user sees), Pydantic
  validation on every tool call.
- **Scale**: ~18,169 completed visit notes, ~4,700 customers, ~44 contributors (dev snapshot,
  changes over time — don't hard-quote this on the page as a permanent stat).

## 2. Document Central — real mechanics

- OpenAI `gpt-5.4-mini` + built-in `file_search` tool over an OpenAI vector store holding ~260
  company PDFs (policies, SOPs, product sheets, incentive programs, warranty guides).
- Citations: PDF chips shown on the answer, downloadable (`CitationsBlock`, icons `menu_book` /
  `picture_as_pdf`). Source page numbers aren't available — OpenAI file_search limitation.
- Procedure detection: if the answer has ≥3 numbered steps + branching language, a second LLM
  pass converts it to Mermaid `flowchart TD` syntax, rendered client-side (`FlowchartBlock.vue`,
  icon `account_tree`). Markdown answer + flowchart both shown.
- Built from real QA: 214 real user sessions were analyzed (89% rated excellent/good already);
  the system prompt was rewritten to specifically fix 5 measured failure patterns — brand bleed
  (answering about the wrong tire brand when two appear in the same doc), fabricating an answer
  instead of saying "not found", guessing on ambiguous short queries instead of asking, missing
  out-of-scope detection, and truncating multi-tier program details.

## 3. TSM Dashboard — real mechanics

- No chat — a manager-facing page at `/dashboard/tsm`. Filters bar (date/customer/contributor,
  same `VniQuery` shape the Analyst chat's session filters use) + two always-open list sections:
  **Notes** (volume trend, findings breakdown) and **Customers** (coverage, per-customer
  drill-down). Both sections render fully stacked, no tabs, no KPI tiles (an earlier KPI-grid +
  drill-down-page design was replaced with this simpler always-open layout).
- Reads only pre-extracted structured data from `visit_note_evaluations` — never re-runs the
  extraction LLM live.

## Cross-cutting (worth one line each, not a full feature)

- **Background pipeline**: a Celery worker periodically pulls raw visit notes from the legacy
  MSSQL system, has an LLM turn them into structured JSON, writes to Postgres, and embeds the
  main theme for semantic search — this is what both the Analyst and the Dashboard read from.
- **Security model**: MSSQL is read-only everywhere (no INSERT/UPDATE/DELETE/ALTER ever hits it);
  all writes go to Postgres. Page-level permissions come from a real stored procedure
  (`sp_GetUserSecurityMatrix`) per logged-in user.

## Real icons pulled from the app's own code (do not invent others)

- Visit Notes Analyst chat empty-state: `zoom_out_map` (same icon as the TSM dashboard page in
  the page catalog — `api/src/modules/page_access.py`)
- Document Central chat empty-state / catalog icon: `folder_shared`
- Chatbot group icon: `smart_toy`; Dashboard group icon: `dashboard`
- Citations: `menu_book`, `picture_as_pdf`; Flowchart block: `account_tree`
- Scope chips (date/customer/contributor): `date_range`, `business`, `person`
- Admin page icon (not used on this page, for reference only): `admin_panel_settings`

## Proprietary caution

Internal tool for Blackstire — no screenshots with real customer data, visit-note contents, or
company document contents should be published. Hero image = an AI-generated diagram, not a
screenshot. Gallery screenshots (once Salman provides them) must be checked for any visible real
customer names / note text before publishing.
