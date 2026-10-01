import galleryManifest from '~/data/.generated/bts-notes-gallery.json'

export const whyPoints = [
  {
    icon: 'help_outline',
    color: 'var(--pf-infra)',
    title: 'The problem',
    text: 'Every team at the company had their own way of tracking their work. Sales, HR, regional managers, warranty, you name it. Mostly paper forms, texts, or just memory. Nobody could search it, compare it, or even trust it was true.'
  },
  {
    icon: 'schedule',
    color: 'var(--pf-mobile)',
    title: 'The honest fix costs too much',
    text: 'It all used to run on paper. Most of it got lost or just ignored. Even the forms that survived still had to be typed into a computer by hand before anyone could actually look at them. That took hours, sometimes days, just to answer one simple question.'
  },
  {
    icon: 'bolt',
    color: 'var(--pf-ai)',
    title: 'What I built instead',
    text: 'One app for every team, but each one gets its own questions. Nothing is hardcoded, it all comes from a database. And since the answers are already organized the moment they\'re typed, they can go straight into AI analysis and reports instead of sitting in a drawer.'
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
    text: 'Sales, HR, regional managers, warranty, you name it. Each team gets its own questions and flow, powered by the same app. No new release needed to change what\'s asked.'
  },
  {
    id: 'answer-types',
    icon: 'checklist',
    title: 'Whatever the moment calls for',
    text: 'Type, talk, snap a photo, sign your name, or just tap yes or no. The app adapts to the question instead of forcing everything into one text box.'
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
    text: 'Everything shows up as a simple chat you can scroll back through. Tap any answer to fix it before you submit.'
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
    text: 'No internet, no problem. Everything saves on the phone and quietly syncs the moment you\'re back online.'
  },
  {
    id: 'etrack',
    icon: 'qr_code_scanner',
    title: 'Scan a package without breaking stride',
    text: 'A built-in mode for incoming packages. Scan the barcode, hear a tone, keep moving. No screen-watching required.'
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
  '1': 'The home screen. Every tile is a category pulled from the database.',
  '2': 'Picking the customer for a visit. Nearby stores ranked by live GPS distance.'
}

const galleryFiles = galleryManifest as string[]

export const btsNotesGallery: GalleryImage[] = galleryFiles.map((filename) => {
  const id = filename.replace(/\.[^.]+$/, '')
  return { id, image: `/images/bts-notes/${filename}`, caption: galleryCaptions[id] }
})

export const finaleLine = ['Every department talks.', 'One app listens.']

export const heroImage = '/images/bts-notes/hero.svg'
