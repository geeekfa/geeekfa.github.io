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

## Backlog

- [ ] BTS AI: real hero image (ask Salman: build it himself or get an AI
      image prompt, same "INPUT → OUTPUT" dark-background style as the other
      two heroes, using `--pf-ai` accent).
- [ ] BTS AI: real screenshots for the gallery once Salman has some that are
      safe to publish (no real customer names/notes visible).

- [ ] Wire up a real Resume link (nav "Resume" + homepage hero button both
      currently point at "/")
- [ ] Wire up the "About" nav link, or decide the site doesn't need one
- [ ] Decide: buy a custom domain later? (currently no)

## Ideas / raised by Salman, not yet scoped
