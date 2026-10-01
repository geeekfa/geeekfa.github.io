export const whyPoints = [
  {
    icon: 'help_outline',
    color: 'var(--pf-infra)',
    title: 'The problem',
    text: 'Field reps visiting stores had no consistent way to record what happened. Notes lived in texts, memory, or scattered paper — nothing a manager could search or compare.'
  },
  {
    icon: 'schedule',
    color: 'var(--pf-mobile)',
    title: 'The honest fix costs too much',
    text: 'A fixed survey screen means every new question is a new app release — store review, rollout, waiting for everyone to update. Different departments also need completely different questions.'
  },
  {
    icon: 'bolt',
    color: 'var(--pf-ai)',
    title: 'What I built instead',
    text: 'A conversation engine where the entire question flow lives in the database. New questions, new branches, whole new categories ship without touching the app.'
  }
]

export interface Feature {
  id: string
  icon: string
  title: string
  text: string
}

export const btsNotesFeatures: Feature[] = [
  {
    id: 'data-driven',
    icon: 'dynamic_form',
    title: 'One app, every department',
    text: 'The questions a user sees come straight from the database, not the app\'s code. Adding a new question, or a whole new kind of visit, usually just means adding data — no app release.'
  },
  {
    id: 'answer-types',
    icon: 'checklist',
    title: 'Many kinds of answers, one engine',
    text: 'Text, numbers, yes/no, dates, photos, a signature pad, a voice recording or typed note, even a nearby-customer picker using live GPS — all built on the same question engine.'
  },
  {
    id: 'branching',
    icon: 'alt_route',
    title: 'Branching flows',
    text: 'Some questions change what comes next based on the answer, so one category can lead down completely different paths instead of a single fixed script.'
  },
  {
    id: 'review',
    icon: 'fact_check',
    title: 'Review before you send',
    text: 'The finished conversation shows up as a chat. Tap any bubble to reopen and fix that answer before the whole thing goes out.'
  },
  {
    id: 'resume',
    icon: 'history',
    title: 'Pick up where you left off',
    text: 'Close the app mid-conversation and it\'s saved as incomplete. Come back later and resume right where you stopped, instead of starting over.'
  },
  {
    id: 'offline-sync',
    icon: 'cloud_sync',
    title: 'Offline-first, simple sync',
    text: 'The app works with no connection at all — answers save to the phone first. A badge shows what\'s still waiting to go out, and a tap pushes it once you\'re back online.'
  },
  {
    id: 'etrack',
    icon: 'qr_code_scanner',
    title: 'eTrack: scan without looking at the screen',
    text: 'A built-in feature for logging incoming packages — continuous barcode scanning with color and sound feedback, then batch photo capture, so an operator never has to stop and stare at the phone.'
  },
  {
    id: 'cross-platform',
    icon: 'devices',
    title: 'Everywhere the reps are',
    text: 'iOS and Android are the real targets, but Windows, macOS, Linux and web builds all exist too.'
  }
]

export interface GalleryImage {
  id: string
  image: string
  caption?: string
}

// Captions keyed by filename (without extension) — Salman just drops screenshots into
// app/assets/images/bts-notes/ named 1, 2, 3... and every file there shows up automatically,
// in numeric filename order. Add a caption here when a screenshot needs explaining.
const galleryCaptions: Record<string, string> = {
  '1': 'The home screen — every tile is a category pulled from the database.',
  '2': 'Picking the customer for a visit — nearby stores ranked by live GPS distance.'
}

const galleryModules = import.meta.glob('~/assets/images/bts-notes/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default'
}) as Record<string, string>

export const btsNotesGallery: GalleryImage[] = Object.entries(galleryModules)
  .map(([path, image]) => {
    const id = path.split('/').pop()!.replace(/\.[^.]+$/, '')
    return { id, image, caption: galleryCaptions[id] }
  })
  .sort((a, b) => Number(a.id) - Number(b.id))

export const finaleLine = ['Field reps talk.', 'The database listens.']

export const heroImage = '/images/bts-notes/hero.svg'
