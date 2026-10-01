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
      → closing line), per Salman's direction. One real screenshot (home
      screen category grid) in the gallery; hero is still a placeholder, see
      `docs/projects/bts-notes.md`.

## Backlog

- [ ] BTS Notes: real hero image, and more gallery screenshots as Salman
      sends them (`app/data/projects/bts-notes.ts` → `btsNotesGallery`)
- [ ] Wire up a real Resume link (nav "Resume" + homepage hero button both
      currently point at "/")
- [ ] Wire up the "About" nav link, or decide the site doesn't need one
- [ ] Decide: buy a custom domain later? (currently no)

## Ideas / raised by Salman, not yet scoped
