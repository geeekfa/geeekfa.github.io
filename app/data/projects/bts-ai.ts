import galleryManifest from '~/data/.generated/bts-ai-gallery.json'

export const whyPoints = [
  {
    icon: 'help_outline',
    color: 'var(--pf-infra)',
    title: 'The problem',
    text: "Managers at the company had real questions about customer visits. Who's raising problems, which customers are slipping, what a rep said last week. Getting an answer meant asking someone to pull a report, or digging through spreadsheets themselves."
  },
  {
    icon: 'schedule',
    color: 'var(--pf-backend)',
    title: 'The traditional fix',
    text: "Someone would have to know SQL, write the query by hand, and export it to a spreadsheet. That took time, and it only answered the one question that was asked. A follow-up question meant starting over."
  },
  {
    icon: 'bolt',
    color: 'var(--pf-ai)',
    title: 'What I built instead',
    text: 'A chat where managers just type the question. An AI agent figures out which safe, pre-built lookup answers it, the database runs it, and the answer comes back as a table, a chart, or a number, whatever fits best.'
  }
]

export interface Feature {
  id: string
  icon: string
  title: string
  text: string
}

export const btsAiFeatures: Feature[] = [
  {
    id: 'ask-plain-english',
    icon: 'zoom_out_map',
    title: 'Ask in plain English',
    text: 'Type a question about customer visit notes, like "which customers raised the most problems last month", and get a real answer pulled straight from the data.'
  },
  {
    id: 'no-guessing',
    icon: 'verified',
    title: 'Never makes up a number',
    text: "The AI only picks from a fixed list of safe, pre-built lookups. It never writes its own database query and never sees the raw numbers until they come back correct. If it can't answer safely, it says so."
  },
  {
    id: 'remembers-context',
    icon: 'history',
    title: 'Remembers what you just asked',
    text: 'Ask a follow-up like "who\'s third on that list?" and it knows what "that list" means, without you repeating the whole question.'
  },
  {
    id: 'document-central',
    icon: 'folder_shared',
    title: "Chat with the company's own documents",
    text: 'A separate assistant answers questions about internal policies, procedures, and incentive programs, and attaches the actual PDF it found the answer in.'
  },
  {
    id: 'flowcharts',
    icon: 'account_tree',
    title: 'Turns steps into a picture',
    text: "When an answer is really a multi-step procedure, like how to file a warranty claim, it draws it as a flowchart instead of a wall of text."
  },
  {
    id: 'tsm-dashboard',
    icon: 'dashboard',
    title: 'One page for the full picture',
    text: 'A dashboard for sales managers shows visit volume and customer coverage at a glance, with filters for date, customer, and rep, no chatting required.'
  }
]

export interface GalleryImage {
  id: string
  image: string
  caption?: string
}

// Salman drops screenshots into public/images/bts-ai/ named 1, 2, 3... (see the manifest
// generator in nuxt.config.ts). Add a caption here once a screenshot has actually been reviewed
// for any visible customer data (internal tool, real company data, needs a privacy check first).
const galleryCaptions: Record<string, string> = {
  '1': 'Document Central answering a pricing question, with the tier table and the source PDF attached.',
  '2': 'A warranty claim procedure, turned into a flowchart instead of a block of steps.',
  '3': 'Visit Notes Analyst answering "which customers complained about pricing last week?"',
  '4': "A manager's view of note volume by sales rep, on the TSM dashboard.",
  '5': 'How often customers get a visit, from the TSM dashboard.'
}

const galleryFiles = galleryManifest as string[]

export const btsAiGallery: GalleryImage[] = galleryFiles.map((filename) => {
  const id = filename.replace(/\.[^.]+$/, '')
  return { id, image: `/images/bts-ai/${filename}`, caption: galleryCaptions[id] }
})

export const storeLinks: { label: string; url: string; icon: string }[] = []

export const finaleLine = ['Ask a question like you would ask a person.', 'Get back an answer you can actually trust.']

export const heroImage = '/images/bts-ai/hero.png'
