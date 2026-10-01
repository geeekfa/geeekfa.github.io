import type { StudioTab } from './tire-studio'

export const whyPoints = [
  {
    icon: 'visibility_off',
    color: 'var(--pf-infra)',
    title: 'The problem',
    text: 'Counting tires on a warehouse shelf by hand is slow, and the shelf changes every day. By the time someone finishes counting, the numbers are already a little out of date.'
  },
  {
    icon: 'schedule',
    color: 'var(--pf-mobile)',
    title: 'The traditional fix',
    text: 'Someone walks the warehouse with a clipboard, counting tires and copying down every brand, size, and model by hand. It takes a while, and it is easy to miscount or misread a label.'
  },
  {
    icon: 'bolt',
    color: 'var(--pf-ai)',
    title: 'What I built instead',
    text: 'Walk down the shelf with your phone recording. The video turns into a full count with brand, size, and model for each tire, done on your own machine with nothing sent to the cloud.'
  }
]

export const finaleLine = ['Point your phone at the shelf.', 'Get a count you can trust.']

export const heroImage = '/images/fs-tire-inventory/hero.svg'

export const introLine =
  'A video of a shelf goes in, and a tire count with labels comes out. Five stages, and every one of them is allowed to say "not sure" instead of guessing.'

export const fsTireInventoryTabs: StudioTab[] = [
  {
    id: 'panorama',
    label: 'Panorama',
    icon: 'panorama_wide_angle',
    accent: 'var(--pf-ai)',
    summary: 'Turns the shaky phone video into one wide, steady picture of the whole shelf.',
    steps: [
      {
        id: 'stitch',
        label: 'Stitch',
        icon: 'panorama_wide_angle',
        image: '/images/fs-tire-inventory/panorama.jpg',
        text: 'Stitches the video into one wide picture of the shelf, so nothing gets missed or counted twice.'
      }
    ]
  },
  {
    id: 'counting',
    label: 'Counting',
    icon: 'numbers',
    accent: 'var(--pf-backend)',
    summary: 'Counts every tire on the shelf and double-checks itself before trusting the number.',
    steps: [
      {
        id: 'detect',
        label: 'Detect & confirm',
        icon: 'numbers',
        image: '/images/fs-tire-inventory/counting.jpg',
        text: 'Counts the tires, then checks that count against how the camera moved. If the two disagree, it asks a person instead of guessing.'
      }
    ]
  },
  {
    id: 'crop',
    label: 'Crop & Locate',
    icon: 'content_cut',
    accent: 'var(--pf-web)',
    summary: 'Cuts out a close-up of each tire and finds exactly where its label is.',
    steps: [
      {
        id: 'crop-label',
        label: 'Crop & locate',
        icon: 'content_cut',
        image: '/images/fs-tire-inventory/crop-label.jpg',
        text: 'Cuts out a close-up of each tire and finds exactly where its label sits on it.'
      }
    ]
  },
  {
    id: 'reading',
    label: 'Label Reading',
    icon: 'document_scanner',
    accent: 'var(--pf-mobile)',
    summary: 'Reads each label with two separate engines and only trusts an answer both of them agree on.',
    steps: [
      {
        id: 'read',
        label: 'Read & cross-check',
        icon: 'document_scanner',
        image: '/images/fs-tire-inventory/label-reading.jpg',
        text: 'Reads the brand, size, and model off each label with two separate engines, and only trusts a value when both agree.'
      }
    ]
  },
  {
    id: 'report',
    label: 'Report',
    icon: 'fact_check',
    accent: 'var(--pf-infra)',
    summary: 'Groups the tires into a clean inventory list and flags anything it is not sure about.',
    steps: [
      {
        id: 'group',
        label: 'Group & flag',
        icon: 'fact_check',
        image: '/images/fs-tire-inventory/report.jpg',
        text: 'Groups tires by brand, size, and model into the final count, and flags anything it is not sure about for a person to check.'
      }
    ]
  }
]
