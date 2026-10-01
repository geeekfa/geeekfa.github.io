# CallScribe — research notes

Scratch notes for the portfolio page build. Not published (only `.output/public`
ships). Source repo: `/Users/geeekfa/Development/Projects/callscribe`.

## What it is

A pipeline that turns recorded sales calls into scored, readable transcripts.
Built for Blackstire/Fard Systems' inside-sales team. Companion/sibling system
to the Portal (the company's main internal app) — reads a little from its
MSSQL database, writes back to exactly one column.

Stack: FastAPI (api/) + Nuxt 3/Quasar (portal/), whisper.cpp running locally
on a Mac M4 Pro / server RHEL9+L4 GPU, OpenAI for the LLM stages, SQLite for
CallScribe's own state (jobs, viewer feedback), SQL Server (Portal DB) for
the one narrow write-back.

## Pipeline stages (confirmed with Salman, 6 stages)

### 1. Get the call
Two entry paths, same downstream pipeline (`worker.process_job`):
- Upload a file directly (`POST /transcribe`)
- Give a `phone_event_id` — looked up in the read-only Portal MSSQL
  (`tblPhoneEvent`, `SELECT`-only, fixed query, never widened), recording
  downloaded from a public URL (`.../AudioFiles/{call_uuid}.mp3`, no VPN/token
  needed — VPN actually breaks it).
- A third form, `POST /transcribe/call/{call_uuid}`, is idempotent — serves an
  already-done call without recompute (`source: job|stored|fresh`). Didn't put
  this on the page; it's an implementation detail of the "get the call" step,
  not a user-facing stage.

### 2. Transcribe
whisper.cpp, `large-v3` model, local only (no cloud). Stereo files use
whisper-cli's `-di` for per-channel info; mono labels everything "Speaker 1".
Real benchmark: Core ML/ANE was tested and found **1.86x slower** than
Metal-only for this model size on the M4 Pro (opposite of Apple's own ">3x
faster" marketing) — fully reverted, not left as a flag. Didn't put this
story on the page itself (it's a hardware/tooling aside, not part of the
"how a call becomes a score" flow) but it's a strong interview anecdote.

### 3. Tell speakers apart (speaker attribution)
The real engineering story. Early versions tried transcribing each channel
separately — compacted, muted, attenuated, raw — all four failed for
different reasons (welding distant utterances together, deleting 22% of real
speech on overlap, bad word recall on noisy channels). The shipped design:
the **mixed** audio is transcribed once and owns the real transcript (text,
timing, segment boundaries). Each channel is transcribed *only to vote* on
who said which segment, aligned onto the mix transcript. Voting can only
write one field (`speaker`) — chosen specifically because a structurally
narrow write can't cause the failures the four rejected designs caused.
87% of words get a clean single-channel vote match.

Page copy keeps this high-level ("an early version kept gluing sentences
together") rather than naming WIN_SHARE/MIN_VOTES thresholds or the rejected
approaches — too technical for a recruiter, per the writing rules.

### 4. Label roles
LLM assigns each transcript segment one of: `agent`, `customer`, `voicemail`,
`ivr`, `unknown`. Real edge case worth remembering (not on the page, in case
Salman wants it in interview prep): on an internal call (both parties are
employees), both sides are labeled `agent` — never invented a `customer`.
A real regression (`phoneEvent_ID 114008`) where the model was told
"outbound + employee name" and invented a customer; fixed by keying off
`call.agent_channel`, not `agent_name` alone.

### 5. Score the call (quality review)
Third LLM stage, never modifies the transcript. Produces:
- `call_category` (customer_service / agent_to_agent / personal_call /
  ivr_blocked / voicemail / no_agent_speech / other)
- 5 rating dimensions (responsiveness, product knowledge, retention effort,
  professionalism/tone, IVR persistence) — only the applicable ones per call
- an 11-topic sales checklist (covered/missed/not-applicable) — the actual
  topic names (program position, account health, equipment discovery, etc.)
  come from the client's real sales training material and specific brand/
  program names (Wheelpros, Bartec, Falken Jeep giveaway, BTS dealer
  programs) — **kept these off the public page**, proprietary client detail,
  described generically as "the company's own sales checklist" instead.
- `business_share` (0-100, descriptive only, never affects rating)
- overall rating + 1-2 sentence summary

Page copy collapses all of this into one step per Salman's call (asked
explicitly, he said one summarized step rather than 4 sub-steps).

### 6. Review & share
Portal `JobResultsView.vue` — tabs for Speakers / Roles / Quality / Video
(operator mode) or a trimmed viewer mode (no Speakers tab, inline player
instead of Video tab) for the shareable-link page. Shared link auth rides in
the URL fragment (`#key=...`, never sent to a server), mirrored into
sessionStorage so a refresh keeps working, stripped from the URL immediately.
Viewers can leave feedback (stored in CallScribe's own SQLite, never the
Portal DB) and request a re-analysis.

## Decisions made while building the page

- Shape: `kind: 'pipeline'` (StudioStepCarousel), 6 stages, matches the file
  `app/data/projects/callscribe.ts`.
- Stage 1 (get the call) has 2 real sub-steps (upload / phone event ID).
  Stage 6 (review & share) has 2 (results page / share a link). All other
  stages are a single summarized step, including stage 5 per Salman's
  explicit choice.
- Icons pulled from the portal's own UI: `call`, `upload_file`, `dialpad`
  (phone-event input — portal itself uses `call`, picked `dialpad` to
  differentiate from the stage header's own `call` icon), `graphic_eq`
  (transcribe — matches portal's own icon for this), `forum` (speakers tab),
  `badge` (roles tab), `grading` (quality tab), `tab`/`link`/`share` for the
  review stage (not literal portal icons, portal doesn't have step-level
  icons for this stage).
- No stats/numbers closer, no em dashes, honesty pass done — no invented
  department names, no fabricated bug stories; the two real stories used
  (speaker-voting rework, Core ML revert) are both logged in the project's
  own `docs/experiments.md` and `docs/speaker-attribution.md`.
- Images: all placeholders (`public/images/callscribe/*.svg`) for now.
  Salman said some stages have a screenshot and some don't — no gallery,
  per-step `image` field stays optional and the carousel falls back
  gracefully. He mentioned one screenshot that's shared between stages 3
  and 4 but fits stage 4 (roles) better — will drop it in when he sends it.

## Source files read

- `.claude/CLAUDE.md`, `.claude/skills/callscribe-stack/SKILL.md`
- `docs/speaker-attribution.md`, `docs/speaker-roles.md`,
  `docs/conversation-quality.md`, `docs/quality-call-checklist.md`
- `docs/experiments.md` (grep for "core ml")
- `portal/app/pages/index.vue`, `portal/app/components/JobResultsView.vue`
- Resume project: `docs/research/10-project-callscribe-fa.md`
