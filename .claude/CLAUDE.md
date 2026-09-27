# Portfolio Website Project

## Who this is for
Salman — a programmer (Backend, Frontend, Mobile, AI/LLM, Infrastructure) based in Atlanta, GA, recently left/lost a job, currently building resume/LinkedIn materials and now a personal portfolio website to link from his resume and LinkedIn.

## What this project is
A personal portfolio website, hosted for free on GitHub Pages at:
```
https://geeekfa.github.io
```
GitHub username: `geeekfa`. Repo: `https://github.com/geeekfa/geeekfa.github.io` (must keep this exact name — GitHub Pages serves `<username>.github.io` repos at the root domain).

## What it's for
Salman wants a homepage that lists his real projects as cards, where clicking a card goes to a dedicated project page with a nice design, screenshots, and a written explanation of what he built, how, and why — something polished ("شکیل"), presentable, and visual (screenshots/before-after images), not just a wall of text like a resume. The end goal: link this site from his resume and LinkedIn so recruiters/interviewers can see his work in more depth than a resume allows.

## Current status (as of 2026-09-27)
- Repo created and cloned locally to `/Users/geeekfa/Development/Projects/portfolio`.
- Scaffolded with **Nuxt 4** + **Quasar 2** (manually wired via `@quasar/vite-plugin`, not the `nuxt-quasar-ui` module — that module wasn't used, integration is done by hand in `nuxt.config.ts` + `app/plugins/quasar.ts`).
- Package manager: **pnpm** (v12). `pnpm-workspace.yaml` has `allowBuilds` entries for `esbuild` and `@parcel/watcher` — required or `pnpm install` fails with `ERR_PNPM_IGNORED_BUILDS`. Keep this file committed and up to date if new native deps get added.
- `ssr: false` in `nuxt.config.ts` (SPA mode) — deliberate choice to avoid an SSR build bug where Quasar's auto-imported components got double-declared during `nuxt generate`'s server build step (`_component_q_page` redeclared error). SPA + prerendering via `nuxt generate` still produces a fully static site, which is all GitHub Pages needs.
- A single "Hello World" page (`app/app.vue`) was deployed successfully as a first smoke test, confirmed working in local generate + browser render before this file was written.
- GitHub Actions workflow (`.github/workflows/deploy.yml`) is set up: on every push to `main`, it installs deps with pnpm, runs `pnpm generate`, adds a `.nojekyll` file (needed so GitHub Pages doesn't try to run Jekyll on the Nuxt output), and deploys `.output/public` via `actions/deploy-pages@v4`.
- **Action item for Salman (one-time, manual, not done via git)**: in the repo's GitHub settings → Pages → Source, select **"GitHub Actions"** (not "Deploy from a branch") — otherwise the workflow's deploy step has nothing to attach to.

## Decisions already made (don't re-litigate without asking)
- Stack: Nuxt 4 + Quasar 2 + pnpm — chosen because Salman already works with this exact stack professionally (see his other Nuxt/Quasar projects), so he can maintain/extend it comfortably.
- Hosting: GitHub Pages, free, at `geeekfa.github.io`, no custom domain purchased (optional future step, not needed now).
- Deploy: automatic via GitHub Actions on push to `main` — no manual `generate`+push step required going forward.
- Site structure: a homepage with project cards, each linking to its own dedicated project page (not a single long-scroll page). Multi-page is expected and is exactly what GitHub Pages supports (e.g. `geeekfa.github.io/tire-studio`).

## Important context carried over from the resume-building conversation (do not lose this)
This project's sibling repo, `/Users/geeekfa/Development/Projects/resume`, has extensive, code-verified documentation of Salman's real projects — this is the actual source material for what should go on the portfolio. Key entry points there:
- `/Users/geeekfa/Development/Projects/resume/docs/00-NEXT-STEPS.md` — overall resume-project status and roadmap.
- `/Users/geeekfa/Development/Projects/resume/docs/research/` — deep per-project write-ups (files `07`–`20`), skills inventory, STAR stories, interview prep.
- `/Users/geeekfa/Development/Projects/resume/docs/resume/` — the 3 finished resumes (AI, Full-Stack, Mobile) as `.docx`/`.pdf`.
- `/Users/geeekfa/Development/Projects/resume/.claude/CLAUDE.md` — the master project file with full details on every project (BTS Notes, BTS AI, Tire Studio, CallScribe, FS Tire Inventory, AGM Office, Fard Flow, etc.), including which ones are real, deployed, and demoable.

**Resume and LinkedIn are both finished and up to date as of 2026-09-27** — do not treat these as pending work.

### Candidate projects for the portfolio (from that research), roughly in order of how demo-worthy they are:
1. **Tire Studio** — most visual (image generation pipeline for tire catalog photos), most demo-worthy, but it's an internal tool built for a client (Fard Systems/Blackstire) and was never deployed publicly itself (its sibling **Tire Gallery** is the deployed delivery app). Screenshots/before-after images are the way to show this, not a live link.
2. **BTS Notes** — real, substantial Flutter app for Black's Tire, actively used in production. Good mobile-engineering story (offline-first, DB-driven dynamic forms, eTrack barcode scanning).
3. **BTS AI** — web AI analytics/chat platform, strong AI/LLM engineering story (agentic tool-use, RAG, Celery+Redis, Postgres+pgvector).
4. **CallScribe** — call transcription/diarization/AI-scoring pipeline, strong "real production incident" stories (speaker-attribution saga, Core ML benchmark revert).
5. **FS Tire Inventory** — computer-vision tire counting from video, has a genuine open business/legal tradeoff story (AGPL licensing risk).
Other completed projects (Blackstirebot, FS Phone Screen, Atlantic Gems, Fard Systems TV, AGM Office, Fard Flow, llm-server) are lower priority for a first version but available if wanted later.

**Important constraint**: almost all of the above are proprietary client work for Fard Systems/Blackstire and AGM. Do **not** put their actual source code, internal screenshots with real customer/business data, or proprietary business logic details into this public repo without Salman's explicit go-ahead per project. Screenshots, descriptions, and architecture diagrams in Salman's own words are fine; copying `.claude/skills` docs verbatim or dumping real code is not, especially given the unresolved handover situation with his former business partner (see `handover-fard-systems` skill in the resume project for context — do not raise this topic unprompted, just be aware it's a reason to be conservative about what gets published here).

## Working style Salman prefers (carried over from the resume project)
- Persian for conversation, simple everyday language, short answers, no preamble.
- English only for code, UI text, and any docs/comments in this repo.
- Give honest opinions, flag uncertainty instead of guessing confidently.
- Salman gets overwhelmed easily — go one step at a time, confirm before big structural decisions (e.g. before deciding final visual design, before writing final project copy).
- Don't fabricate project details — always check the resume project's research docs (or ask Salman) rather than inventing claims.

## Not decided yet — ask Salman before proceeding
- Visual design/theme (colors, layout style, dark/light mode).
- Which projects make the first version of the site, and in what order.
- Whether to write project-page copy directly here or draft it first in the resume project's docs.
- Whether a custom domain will be purchased later.
