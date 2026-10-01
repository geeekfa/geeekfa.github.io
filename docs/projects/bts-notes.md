# BTS Notes — research notes

Not published. Scratch notes for writing the `/projects/bts-notes` page copy.

Codebase: `/Users/geeekfa/Development/Flutter/bts_notes` (Flutter, cross-platform).
Backend: `/Users/geeekfa/Development/Python/conversation-api` (FastAPI, consumed almost
exclusively by this app). AI analysis of the collected notes (OpenAI agents, `ai_analyze.py`,
`openai_agents/visit/`) is explicitly **out of scope** for this page — that's the job of the
separate BTS AI project; this app's job is only to collect the data.

## Page shape (per Salman, differs from Tire Studio)

Hero → Why this exists (3 cards, same format as Tire Studio) → a bullet-point feature list
(icon + title + 1-2 sentence description each, no stage carousels) → a screenshot gallery →
Tech stack → closing pull-quote + CTA.

## Why this exists (3 cards) — revised per Salman's feedback (2026-09-30)

First draft scoped "the problem" to field reps only — Salman corrected this: it's every
department (confirmed by the real category screenshot: Commercial Sales, Territory Sales
Managers, HR Notes, Regional Managers, e-Tickets, SEMA/Vegas Notes, Garage Vision...), it used
to run on paper forms specifically (not just "texts and memory"), and "what I built instead"
was missing the AI-analysis/reporting payoff (confirmed in scope by Salman earlier — the
*mobile app's* job is still only collection, but this card can honestly say the structured
data is what makes downstream AI analysis/reporting possible).

1. **The problem** — every department tracked their work however they could: paper forms,
  texts, or memory. None of it could be searched, compared, or trusted.
2. **The honest fix costs too much** — it all used to run on paper. Most got lost, ignored,
  or never looked at twice, and even surviving forms needed manual re-entry before anyone
  could study them.
3. **What I built instead** — one engine, every department gets its own question flow from a
  database instead of hardcoded screens, and because every answer is structured from the
  start it feeds straight into AI-powered analysis and reporting (BTS AI, the next project)
  instead of a filing cabinet.

Source: `.claude/CLAUDE.md` architecture section (`AIQuestionOperationType`, `operationToRoute`),
`app_router.dart`, and screenshot 1 (home screen category grid) for the department list.

## The 8 feature bullets

1. **One app, every department** — questions come from the database (`tblAIQuestion`),
  not the app's code. New question types are added via `AIQuestionOperationType` +
  `app_router.dart` wiring (engineering), but new *questions themselves* are pure data —
  no release needed. `RADIOGROUP`'s per-option behaviour is 100% data-driven, documented in
  `.claude/CLAUDE.md`.
2. **Many kinds of answers, one engine** — text, number, yes/no, date/time, photos
  (camera/gallery via `QFile`), a signature pad (`syncfusion_flutter_signaturepad`,
  `question_with_whiteboard.dart`), a voice recording or typed note
  (`question_with_recording_or_text.dart`, `record` package), nearby-customer picker using
  live GPS (`question_with_customer.dart`, `geolocator`), employee/user pickers, grouped
  forms and conditional radio groups.
3. **Branching flows** — a `FLOW_SELECTOR` question lets the picked option jump the
  conversation to a different question entirely (`flow_selector_model.dart`:
  `optionID` → `aiQuestionID`), so one category's conversation isn't one fixed script.
4. **Review before you send** — the finished conversation renders as a chat view; tapping
  any bubble reopens that question in edit mode (`InputMode.editFromConfirmationPage`,
  `bubble_right.dart`) before the whole thing is submitted.
5. **Pick up where you left off** — closing the app mid-conversation saves it as
  "incomplete" (`conversation_incomplete_repository.dart`); reopening the category finds it
  and offers to resume (`IncompleteScreen`), via long-press on a chat bubble or its own list.
6. **Offline-first, simple sync** — the whole app works with no connection: answers save to
  a local `sqflite` DB first. Syncing (`SyncService.syncAll`) backs up the local DB file,
  wipes it, re-pulls every reference table fresh from the server, then restores the
  conversations/answers from the backup on top — simple and reliable over clever conflict
  resolution. A badge on the sync button shows how many conversations are still waiting to
  go out; tapping it pushes them. (This is a manual tap, not a background auto-upload —
  don't overclaim automation.)
7. **eTrack: scan without looking at the screen** — a self-contained feature (own doc:
  `.claude/skills/etrack/SKILL.md`) for logging incoming packages. Continuous barcode
  scanning with carrier validation (FedEx/UPS, checksum, no false positives from retail
  barcodes), color+beep feedback instead of a blocking dialog, then continuous multi-shot
  photo capture and upload — built so an operator never has to stop and look at the phone.
2026 UX rewrite replaced the original dialog-based flow; see that skill file for the full
  story (including the real `639277200747` false-accept bug and the fix).
8. **Everywhere the reps are** — iOS and Android are the real targets; Windows, macOS,
  Linux and web builds also exist (desktop installer via Inno Setup / WiX for Windows).

## Screenshots

Page shape: no per-bullet images (just icon + title + 1-2 sentences), one shared gallery
section below the bullets instead. Salman drops screenshots straight into
`public/images/bts-notes/` named `1.png`, `2.png`, `3.png`... — `nuxt.config.ts` scans that
folder (on every dev-server start and before each build/generate) and writes the sorted file
list to `app/data/.generated/bts-notes-gallery.json`, which `bts-notes.ts` reads to build
`btsNotesGallery`. No code change needed per screenshot; add a line to `galleryCaptions` in
`bts-notes.ts` (keyed by filename without extension) only when a shot needs explaining.

- `public/images/bts-notes/1.png` — real: home screen, category grid.
- `public/images/bts-notes/2.png` — real: nearby-customer picker (GPS-ranked list).
- `public/images/bts-notes/hero.svg` — placeholder, needs a real hero image or diagram.

## Honesty checks

- No AI-analysis display in-app (commented out in `question_with_textfield_4_ai.dart`) —
  confirmed with Salman: by design, analysis is a different project's job.
- Sync is user-triggered (tap), not automatic-on-reconnect — don't say "automatically
  uploads."
- ~23,400 lines of Dart (from resume research doc `17-project-bts-notes-fa.md`), supports
  iOS/Android primarily.
