---
name: project-page
description: Build a new "/projects/<slug>" detail page for this portfolio, the same way the Tire Studio page was built — research the real project's code, confirm its structure with Salman stage by stage, write short ELI5 copy (not documentation), wire up a stage-carousel with real screenshots, and ship it live via git push. Use whenever Salman asks for a project page, names a project to write up, or invokes this skill directly. Takes a project name/slug as input — ask for one if not given.
---

# Project Page

Builds one portfolio project detail page, end to end, reproducing exactly the
process and output quality of the Tire Studio page
([app/pages/projects/[slug].vue](../../../app/pages/projects/%5Bslug%5D.vue)) —
without Salman having to re-explain any of the house rules below. Read this
whole file before starting; it is the only context you'll have.

**If anything is ambiguous, ask Salman — don't guess.** He said this
explicitly: a wrong guess here costs him a review cycle, a question doesn't.

## 0. Inputs

- **Project name or slug.** If not given, ask. Resolve it against
  [app/data/projects.ts](../../../app/data/projects.ts) — every candidate
  project already has an entry there (`slug`, `name`, `summary`, `skill`,
  `tags`). If the project isn't in that file yet, stop and ask Salman for the
  basics (one-line summary, skill category, tech tags) before continuing —
  don't invent them.

## 1. Setup — already done, just add to the registry

This used to be a one-time refactor; it's done (as of the BTS Notes page).
[slug].vue now reads content through a slug-keyed registry in
`contentRegistry` and supports **two content shapes**, picked per project:

- `kind: 'pipeline'` — Tire Studio's shape: `heroImage`, `whyPoints`,
  `introLine`, `tabs` (stage carousels), `finaleLine`.
- `kind: 'features'` — BTS Notes' shape: `heroImage`, `whyPoints`,
  `features` (icon + title + 1–2 sentence bullets), `gallery` (screenshots),
  `storeLinks` (optional — see §7), `finaleLine`.

For a new project: create `app/data/projects/<slug>.ts` exporting the shape
that fits (see §4 for how to decide which), add one entry to
`contentRegistry` in `[slug].vue` that dynamically imports it, and add the
project to [app/data/projects.ts](../../../app/data/projects.ts) if it
isn't there yet. Don't touch the shared types/layout unless the new
project genuinely needs a feature neither shape has — extend generically
(a new optional field, not a project-specific `if (slug === ...)` branch).

## 2. Research — read before you write

Goal: understand the real product deeply enough to write about it
accurately. None of this research is published — it becomes an internal
notes file, not page copy.

1. **Find the project's own codebase.** It lives under
   `/Users/geeekfa/Development/Projects/<something>` — the directory name
   doesn't always match the portfolio slug (e.g. slug `tire-studio` →
   directory `tirestudio`). If you don't already know it, ask Salman rather
   than guessing at a path.
2. **Read its `.claude/CLAUDE.md`** (project guide) and
   **`.claude/skills/*/SKILL.md`** files first — these are the ground-truth
   "what this does and why" docs the project's own team (Salman +
   Claude Code) maintains. This is where the real technical substance comes
   from: measured bugs, rejected alternatives, locked design decisions,
   actual algorithm choices.
2b. **Check for a sibling backend/API project.** Several of Salman's
   products are frontend-plus-backend pairs living in separate repos (e.g.
   BTS Notes' Flutter app + a separate `conversation-api` FastAPI backend).
   If the frontend talks to a custom API, ask Salman where that backend
   lives, read its `requirements.txt`/`package.json`/`.claude/CLAUDE.md`
   too, and fold its real tech stack into the page's tags — don't let the
   tech stack only reflect the client you happened to start reading.
3. **Cross-check against the resume project's research doc**, if one
   exists: `/Users/geeekfa/Development/Projects/resume/docs/research/`
   (filenames like `NN-project-<name>-fa.md`). That file is a good
   high-level primer (the one-paragraph pitch, the "why deployed/not
   deployed" framing, scale numbers) but is not a substitute for reading the
   actual code — it's intentionally light on implementation detail.
4. **Never fabricate a technical detail, a number, or a "why" for a
   decision.** If the code and docs don't say why something was built a
   certain way, don't invent a plausible-sounding reason — leave it out or
   ask.
5. Write everything you find into
   `docs/projects/<slug>.md` (create it) as you go — as much detail as is
   useful, organized by the product's own real sections/tabs. This file is
   never published (only `.output/public` ships to GitHub Pages) — it's
   scratch space for you and a record Salman can skim, not a draft of the
   page copy. Verbose and technical is fine and expected here.

## 3. Confirm the real structure with Salman, section by section

**Do not assume you've understood the product's structure from the docs
alone — confirm it interactively, one section at a time**, the way Tire
Studio's Prepare/Front/Side/45°/Publish tabs were each confirmed before
their sub-steps were written up. Pattern that worked:

1. State the top-level sections/tabs you believe the product has (pull this
   from the product's own UI — actual tab/page names in its frontend code,
   not a guess from the docs prose).
2. For each section, **before** writing any detail: state how many
   sub-steps you think it has and ask "is this right?" Wait for
   confirmation or a correction. Salman caught real mistakes this way every
   single time in the Tire Studio pass (miscounted stages, wrong grouping) —
   treat this checkpoint as load-bearing, not a formality.
3. Only once a section's structure is confirmed, go deep on that section's
   real mechanics (read the actual source files for it) and add it to the
   research notes file.
4. Repeat per section until every section of the product is confirmed and
   researched.

## 4. Scope the page — and pick the right shape

Mirror Tire Studio's choice: the page covers **one coherent pipeline/flow**
through the product (the thing that's actually demo-worthy), not every
screen or admin feature the software has. If the product has side features
(uploads, user management, settings, etc.) that aren't part of the core
demo-worthy flow, leave them out entirely — at most one closing sentence
("and handles X, Y behind the scenes"), never their own section. If it's
unclear what the "core flow" even is for this product, ask Salman.

**Don't assume `kind: 'pipeline'` by default.** Tire Studio is a literal
pipeline (five ordered stages transforming an input into an output) — that
shape fits it naturally. Most products are not pipelines; BTS Notes is a
bag of unrelated features used by many departments, so Salman explicitly
asked for `kind: 'features'` instead (bullet list + screenshot gallery, no
forced stage ordering). Before writing anything, ask Salman which shape
fits, or state your read of it and confirm — same as confirming section
structure in §3. Don't force a non-sequential product into a fake
5-stage pipeline just to reuse the carousel component.

## 5. Write the copy — the hard-won rules

These rules exist because Salman corrected each of them at least once while
building Tire Studio. Apply all of them from the start this time.

- **English only**, simple everyday words. No jargon a non-engineer would
  stumble on ("scale-invariant space", "greedy set-cover", "radial remap" —
  all real examples that got rewritten). If a technical term is the only
  accurate word, explain the *effect* instead of naming the *technique*.
- **One short line per step. Purpose, not mechanism.** A step's caption
  answers "what is this step *for*" in one sentence (max one and a half),
  never "how it works." There is no longer a separate "detail"/"more"
  paragraph per step — that was tried, Salman cut it entirely ("we're not
  teaching anyone how our software works"). Don't reintroduce one.
- **"Why this exists" is 3 short colored cards** (problem → cost of the
  traditional/manual fix → what you built instead), each 2–3 sentences,
  punchy, ad-copy tone — not engineering prose. This is the only place the
  page argues the *business* case; keep it there, don't repeat it
  elsewhere. **The middle card's title is always "The traditional fix"**
  (shared verbatim across every project, Salman's call — short and reusable
  beats a bespoke title per project). Only the body text changes per
  project.
- **Write like an ordinary person, not an AI.** Before showing any page
  copy, read it back and ask: would someone with plain, everyday English
  actually write this sentence? Concretely: **no em dashes anywhere** — one
  slipped through on both Tire Studio and BTS Notes and Salman caught it
  immediately both times, calling it an obvious AI tell. Use periods or
  commas, or just split into two sentences. Also avoid overly smooth,
  symmetrical "ad copy" rhythm when a plainer sentence would do. This
  applies to every piece of user-facing text on the page: hero summary,
  why-cards, feature bullets, captions, the closing line — all of it.
- **No stats/numbers section as a closer.** Tried once, rejected: real
  timelines are messy (a project worked on, on and off, over a year reads
  as "8 weeks" in a commit-count stat, which is misleading) and Salman does
  not want to imply effort/duration claims he can't stand behind. Don't
  add one unless Salman explicitly asks for this specific project.
- **The closing line is a short pull-quote, not a summary list.** One or
  two short sentences, plain punctuation (**no em dash** — Salman flagged
  this specifically as reading as AI-written), confident and human, ideally
  echoing the opening pitch. Follow it with one CTA button
  ("Back to all projects" at minimum; add a second button only once a real
  destination exists — e.g. don't link "Resume" until
  [docs/TODO.md](../../../docs/TODO.md)'s resume-link item is done).
- **Never invent a reason, a bug story, or a number.** Every "a real bug
  here was…" / "measured X% improvement" claim on the Tire Studio page came
  straight out of the project's own code comments or skill docs. If the
  research phase didn't turn up a genuine war-story for a given step, the
  step just gets its one-line purpose and nothing else — a plain step is
  fine, a fabricated anecdote is not.
- **Do a dedicated honesty pass after writing all the copy, not just while
  writing it.** On the BTS Notes page this caught two real mistakes after
  everything already "read fine": an invented department name ("warranty")
  that didn't exist in any screenshot, code, or doc — a plausible-sounding
  but fabricated example slipped in while writing a list; and a feature
  bullet that overclaimed automatic background sync when the real behavior
  is a manual tap on a badge. The fix: after a full draft, go back through
  every concrete claim (names, numbers, "automatically", specific nouns)
  and re-verify each one against the actual code/screenshots rather than
  trusting that it "sounds right." Do this as its own pass, separate from
  the simplify-the-prose pass — they catch different kinds of errors.

## 6. Build the page

Reuse, don't reinvent — the patterns below are already built and working:

- **Structure**: hero → "Why this exists" (3 cards) → "How it works" intro
  line → one stacked `<section>` per top-level stage (not tabs — each stage
  is its own section with a coloured left accent rail,
  `.pf-stage { border-inline-start: 3px solid var(--c) }`) → Tech stack →
  closing pull-quote + CTA. Copy this section order exactly; it was
  iterated into this shape through several rounds of feedback (tabs were
  tried and explicitly rejected — "recruiter has no patience to click
  through tabs").
- **Stage accent colors**: cycle through the site's existing 5 skill-color
  tokens in order — `var(--pf-ai)`, `var(--pf-backend)`, `var(--pf-web)`,
  `var(--pf-mobile)`, `var(--pf-infra)` (defined in
  [app/assets/css/theme.scss](../../../app/assets/css/theme.scss)). If a
  product has more than 5 stages, it's fine to repeat colors — don't invent
  new ones.
- **Per-stage sub-steps**: render with the existing
  [StudioStepCarousel.vue](../../../app/components/StudioStepCarousel.vue)
  component unchanged — it already handles: real screenshots shown
  uncropped (`fit="contain"`), prev/next arrows with a dark backdrop so
  they stay visible in both themes, step-navigation dots placed **in the
  gap below the image** (never overlaid on top of it — a real screenshot
  can be light or dark and dots-on-image become unreadable either way), the
  active dot showing that step's own icon, and a graceful no-image fallback
  (plain icon + label + text list) for steps that don't have a screenshot
  yet. Don't modify this component for a new project unless you hit a case
  it genuinely can't handle — then extend it generically, not with a
  project-specific branch.
- **Icons**: never invent a Material icon name. Go find the actual icon
  string the product's own frontend uses for that step/feature (grep its
  Vue components for `icon:`), the same way Tire Studio's icons were pulled
  from its real `steps` arrays. If the product has no step-level icons in
  its own UI, pick a sensible Material Symbols name and say so to Salman
  rather than silently guessing.
- **Tech stack chips**: reuse `tagHueOf` from
  [app/data/tags.ts](../../../app/data/tags.ts) for color, and only add a
  link (via [app/data/tech-links.ts](../../../app/data/tech-links.ts)) for
  a technology you have a confident, stable official URL for. Leave others
  unlinked rather than guessing a URL — this repo's global rule against
  fabricating URLs applies here too.
- Every custom (non-Quasar) CSS rule gets a `/* why-no-Quasar: ... */`
  comment, per this repo's house rule — check
  [nuxt4-quasar skill](../../../../../.claude/skills/nuxt4-quasar) if
  you haven't read it this session.

## 7. Images

- **Placeholders first, so the page builds immediately.** Generate a
  simple labeled SVG placeholder per image slot (dark rect + centered text
  naming the slot) so Salman can see the real layout before any real
  screenshot exists.
- **For a `pipeline` page**: placeholders go at
  `public/images/<slug>/<step-id>.svg`, one per step `id` you're about to
  write into the data file. Tell Salman the exact file list and naming
  convention up front — one message with every expected filename — so he
  can drop in real images incrementally without asking you each time. When
  he pastes a file path in chat, swap that one step's `image` field from
  the placeholder extension to the real one (`.png`/`.jpg`, whatever he
  actually saved) and delete nothing he didn't ask you to delete. A step
  can legitimately have no image (ask rather than stalling) —
  `StudioStep.image` is optional and the carousel falls back gracefully.
- **For a `features` page's gallery, use numbered auto-discovery instead
  of named slots** (built for BTS Notes, reuse as-is): images live in
  `public/images/<slug>/` named `1.png`, `2.png`, `3.png`... with no fixed
  mapping to a specific feature. A generator function in `nuxt.config.ts`
  (`generateBtsNotesGalleryManifest` — copy the pattern, parameterize by
  slug for a new project rather than hardcoding another one inline) scans
  that folder on every dev-server start and before each build/generate, and
  writes the numerically-sorted filename list to
  `app/data/.generated/<slug>-gallery.json`, which the project's data
  module imports and maps into `GalleryImage[]`. Salman just drops
  `N.png` files into the folder named in whatever order he captured them;
  nothing else needs to change. **Why not `import.meta.glob` on
  `public/`:** Vite doesn't include the `public/` folder in its module
  graph (it's copied as-is), so glob imports can't see files there — this
  is why the manifest-generator approach exists instead. Add an optional
  caption per screenshot in a `galleryCaptions` lookup (keyed by filename
  without extension) once you've actually looked at that screenshot —
  never caption one sight unseen.
- **Hero image**: ask Salman whether he wants to build it himself (he has
  done this in Photoshop before — if asked, tell him canvas size
  `1920×1080` / 16:9, transparent background works well since the hero
  panel itself is dark) or wants an AI image generator prompt from you. If
  he wants a prompt, default to the same style as Tire Studio's and BTS
  Notes' heroes — a flat vector "INPUT → OUTPUT" (or equivalent
  before/after) diagram on the site's dark navy background, using that
  project's own skill-accent color (`--pf-mobile`, `--pf-ai`, etc. from
  [theme.scss](../../../app/assets/css/theme.scss)) for highlights — unless
  the product's actual pitch calls for a different visual metaphor. Give a
  fully-detailed prompt (background color, layout, labels, style, what to
  avoid) rather than a vague one-liner; he pastes it into whatever image
  tool he's using and brings back the result. Either way, the hero `q-img`
  uses `fit="contain"` so it's never cropped regardless of the image's own
  aspect ratio. Placeholder in the meantime: a labeled SVG at
  `public/images/<slug>/hero.svg`, referenced via each project's own
  `heroImage` export (not a hardcoded `.png` extension in `[slug].vue`) so
  swapping to the real file later is a one-line change in that project's
  data module.
- Never resize, re-crop, or otherwise "fix" an image Salman provides —
  the carousel, gallery, and hero are all built to handle whatever he
  gives them via `fit="contain"`.

## 7b. Proof it's real (optional, ask first)

If the product is publicly downloadable (App Store, Google Play, a public
URL) even though it's gated behind a login, ask Salman whether he wants
those links on the page — it's a strong, free signal to a recruiter that
this shipped and is in real use, not a demo. **Never guess or construct the
URL yourself**; ask Salman to paste the exact link. Label the section
something that can't be misread as "download and use this" (a real past
mistake: "Get the app" reads like an invitation, even though the app needs
company credentials — "Live on the app stores" was the fix). This is
already wired up generically on `FeatureListContent.storeLinks` in
`[slug].vue` — add a `storeLinks` export to the new project's data module
with real URLs, don't rebuild the UI for it.

## 8. Verify, then ship — every meaningful change, not just at the end

This project ships continuously, not in one big reveal:

1. After each real content/layout change, preview it
   (`preview_start` with name `portfolio`, or reuse the running dev
   server) and actually look at it — scroll the whole page.
2. Check both themes (the light/dark toggle in the header) for anything
   that assumes a dark background (white arrows, white text) — this has
   broken before (carousel arrows invisible in light mode).
3. Check mobile width (375px) for horizontal scroll or awkward wrapping.
3b. Before the final ship, do the honesty pass and the human-sounding-copy
   pass from §5 as their own explicit step, not folded into "writing the
   copy" — both caught real mistakes after the page already looked
   finished on BTS Notes.
4. `git add` the specific files you changed (never a blanket `-A` without
   checking `git status` first), commit with a clear message explaining
   *why*, and `git push` — immediately, not batched at the end of the
   session. GitHub Actions auto-deploys on push to `main`; there's no
   separate deploy step.
5. Update [docs/TODO.md](../../../docs/TODO.md) and
   `docs/projects/<slug>.md` as you go, same as for Tire Studio.

## 9. Also true, inherited from the project's own CLAUDE.md

- Quasar-first for every UI need (component → utility class → raw
  HTML/CSS, in that order).
- Mobile-first; verify at 380px.
- Colors only via `--pf-*` tokens, defined for both themes.
- No Persian anywhere in user-facing site text.
- Proprietary caution: most of Salman's real projects are client work for
  Fard Systems/Blackstire/AGM. Screenshots, descriptions, and diagrams in
  Salman's own words are fine for the public repo; dumping real source
  code, internal `.claude/skills` docs verbatim, or real customer/business
  data into this public repo is not — ask Salman before including anything
  that feels like it crosses that line.
