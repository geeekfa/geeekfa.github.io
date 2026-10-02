# Portfolio TODO

Running notes and loose ideas, not yet built. Not part of the deployed site
(only `.output/public` gets published to GitHub Pages).

## Done

- [x] Tire Studio project detail page — hero diagram, why-it-exists, all 5
      pipeline stages with real screenshots, tech stack, closing line.
- [x] Generalized the project detail page (`[slug].vue`) to support a second
      project via a slug-keyed content registry, instead of hardcoding Tire
      Studio.
- [x] BTS Notes project detail page — different shape from Tire Studio (hero
      → why-it-exists → 8 feature bullets → screenshot gallery → tech stack
      → closing line), per Salman's direction. Done end to end: real hero
      image (AI-generated paperwork-to-app diagram), all 8 real screenshots
      with captions, backend tech stack added (FastAPI/Python/OpenAI/MySQL/
      SQL Server/Redis from the conversation-api project), App Store/Google
      Play links, copy reviewed twice for accuracy and for AI-sounding
      phrasing (em dashes, invented details). See `docs/projects/bts-notes.md`.
- [x] Shared the "The traditional fix" why-card title across both Tire
      Studio and BTS Notes for consistency (was "The honest fix costs too
      much", copy-pasted and not tailored to BTS Notes).
- [x] Added a human-sounding-copy rule to memory: no em dashes, no AI-sounding
      phrasing, in any page copy — check before shipping.
- [x] BTS AI project detail page — features shape, 3 areas (Visit Notes
      Analyst, Document Central, TSM Dashboard). Generalized the gallery
      manifest generator in `nuxt.config.ts` to take a slug instead of being
      hardcoded to BTS Notes. Hero is a placeholder SVG until Salman makes or
      generates a real one; gallery is empty until he drops screenshots into
      `public/images/bts-ai/` (needs a privacy check first, internal tool
      with real customer data). See `docs/projects/bts-ai.md`.
- [x] AGM Office project detail page — features shape, no gallery or store
      links (internal tool, no screenshots available and Salman wants to
      keep it that way). 9 feature bullets covering project status history,
      the accounting lock (with the real bug Salman found and fixed), bulk
      order billing split, permissions, audit logging, clients/vendors/
      credit cards, scheduling, Portal Orders, and Monday.com board sync.
      Tags credit Salman for the Nuxt/Vue frontend only, not the PHP
      backend (built by someone else). Hero is a placeholder SVG. Cut an
      "AI can't write to prod DB" bullet on a second honesty pass — that's
      a rule Salman gave his AI tooling, not a feature of the software.
      Also corrected the permissions bullet (denial redirects to a blocked
      page, not silent hiding) and the Monday.com bullet (pushes status out
      to a board item, doesn't pull orders in). See
      `docs/projects/agm-office.md`.
- [x] CallScribe project detail page — pipeline shape, 7 stages (get the
      call, transcribe, fix industry terms, tell speakers apart, label
      roles, score the call, review the results), confirmed stage-by-stage
      with Salman first. "Fix industry terms" was added after a full-page
      review caught it was missing even though the homepage summary
      mentioned it. Quality checklist topic names and sales-program details
      kept out of the copy (proprietary client business detail, not needed
      to tell the story). Real hero image and screenshots for transcribe/
      roles/quality all in. See
      `docs/projects/callscribe.md`.
- [x] FS Phone Screen project detail page — pipeline shape, 4 stages (sign
      in and connect, a call comes in, find the right agent, screen pops),
      confirmed with Salman first. No real screenshots exist for this
      project (small backend + a Windows tray app) and Salman confirmed
      none are coming, so it ships with a placeholder hero SVG and
      text-only steps (no step images at all). Icons picked by hand since
      the app itself has no step-level icons to pull from. See
      `docs/projects/fs-phone-screen.md`.
- [x] FS Tire Inventory project detail page — pipeline shape, 5 stages
      (panorama stitching, counting with dual-witness confirmation, crop +
      label locating, label reading with two cross-checking OCR engines,
      grouping into the final report), confirmed with Salman first. No app
      UI exists for this project (backend-only prototype, Flutter capture
      app explicitly out of scope), so the "screenshots" are real panorama
      images from the project's own test videos instead of app screens, per
      Salman's choice. Icons picked by hand since there's no frontend to
      pull step icons from. Hero is a placeholder SVG. See
      `docs/projects/fs-tire-inventory.md`.
- [x] LLM Server project detail page — features shape, no gallery and no
      images at all besides a placeholder hero (text-only project, Salman's
      choice: he wants it on the site to show he can stand up a self-hosted
      AI server, not to show off a specific product). 5 short feature
      bullets (own model, OpenAI-compatible API, Docker packaging, GPU
      tuning, Nginx reverse proxy). No specific model name anywhere in the
      copy, per Salman's explicit request. The project's own docs mentioned
      a "Hermes Agent" client that talks to this server; left out entirely,
      also per Salman's request.
- [x] Wired up the real Resume link (nav + homepage hero button now point at
      `/Resume.pdf`, file is in `public/`) and built out an "About" page,
      wired into the nav. Both were stale backlog items pointing at "/"
      before this.
- [x] B2B Ordering Bot project detail page — features shape, no gallery (no
      screenshots exist for a Telegram bot) and no store links (private,
      approval-gated, not something to send a recruiter to download). 4
      feature bullets: registration with admin approval, inline tire
      search from any chat, add-to-cart with live qty on the button, cart
      with a running total. Salman originally described it as talking to a
      FastAPI backend; the real code (`pyTelegramBotAPI` + direct `pyodbc`
      calls to SQL Server stored procedures) doesn't match that, confirmed
      with him and kept the existing accurate tags. Checkout/order
      submission is a stub in the real code — closing line avoids implying
      it's complete, matches the handover doc's framing that the client
      paused this before that step, not that it was abandoned. Real hero
      image swapped in afterward (phone chat → warehouse shelf, Telegram
      icon). See `docs/projects/telegram-bot.md`.
- [x] BTS AI: real hero image and 5 real gallery screenshots in place
      (`public/images/bts-ai/hero.png`, `1.png`–`5.png`).

## Backlog

(none open — custom domain was the only other item and Salman decided
against it, GitHub Pages is professional enough as-is)

- [ ] Decide: buy a custom domain later? (currently no)

## Ideas / raised by Salman, not yet scoped
