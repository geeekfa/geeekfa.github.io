import galleryManifest from '~/data/.generated/bts-notes-gallery.json'

export const whyPoints = [
  {
    icon: 'help_outline',
    color: 'var(--pf-infra)',
    title: 'The problem',
    text: 'Every department — field sales, HR, regional managers, warranty, and more — tracked their work however they could: paper forms, text messages, or just memory. None of it could be searched, compared, or trusted.'
  },
  {
    icon: 'schedule',
    color: 'var(--pf-mobile)',
    title: 'The honest fix costs too much',
    text: 'All of it used to run on paper forms. Most got lost, ignored, or never looked at twice. And the forms that did survive still had to be retyped into a computer by hand before anyone could study them — hours or days of work, every time, just to ask one question of the data.'
  },
  {
    icon: 'bolt',
    color: 'var(--pf-ai)',
    title: 'What I built instead',
    text: 'One app, one engine — every department gets its own questions and flow, chosen from a database instead of hardcoded into the app. And because every answer is structured data from the moment it\'s typed, it feeds straight into AI-powered analysis and reporting instead of a filing cabinet.'
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
    text: 'Sales, HR, regional managers, warranty — each team gets its own questions and flow, powered by the same app. No new release needed to change what\'s asked.'
  },
  {
    id: 'answer-types',
    icon: 'checklist',
    title: 'Whatever the moment calls for',
    text: 'Type, talk, snap a photo, sign your name, or just tap yes or no — the app adapts to the question instead of forcing everything into one text box.'
  },
  {
    id: 'branching',
    icon: 'alt_route',
    title: 'Smart enough to skip ahead',
    text: 'The next question depends on the last answer, so nobody wastes time on questions that don\'t apply to them.'
  },
  {
    id: 'review',
    icon: 'fact_check',
    title: 'Catch mistakes before they\'re sent',
    text: 'Everything shows up as a simple chat you can scroll back through — tap any answer to fix it before submitting.'
  },
  {
    id: 'resume',
    icon: 'history',
    title: 'Pick up right where you left off',
    text: 'Get pulled away mid-form? Come back later and it\'s still waiting, exactly where you stopped.'
  },
  {
    id: 'offline-sync',
    icon: 'cloud_sync',
    title: 'Works with zero signal',
    text: 'No internet, no problem — everything saves on the phone and quietly syncs the moment you\'re back online.'
  },
  {
    id: 'etrack',
    icon: 'qr_code_scanner',
    title: 'Scan a package without breaking stride',
    text: 'A built-in mode for incoming packages: scan the barcode, hear a tone, keep moving — no screen-watching required.'
  },
  {
    id: 'cross-platform',
    icon: 'devices',
    title: 'iPhone, Android, and beyond',
    text: 'Built for the phones people actually carry, with Windows, Mac, Linux and web versions too.'
  }
]

export interface GalleryImage {
  id: string
  image: string
  caption?: string
}

// Captions keyed by filename (without extension) — Salman just drops screenshots into
// public/images/bts-notes/ named 1, 2, 3... and every file there shows up automatically, in
// numeric filename order (see the manifest generator in nuxt.config.ts). Add a caption here
// when a screenshot needs explaining.
const galleryCaptions: Record<string, string> = {
  '1': 'The home screen — every tile is a category pulled from the database.',
  '2': 'Picking the customer for a visit — nearby stores ranked by live GPS distance.'
}

const galleryFiles = galleryManifest as string[]

export const btsNotesGallery: GalleryImage[] = galleryFiles.map((filename) => {
  const id = filename.replace(/\.[^.]+$/, '')
  return { id, image: `/images/bts-notes/${filename}`, caption: galleryCaptions[id] }
})

export const finaleLine = ['Every department talks.', 'One app listens.']

export const heroImage = '/images/bts-notes/hero.svg'
