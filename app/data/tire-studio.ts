export interface StudioStep {
  id: string
  label: string
  icon: string
  image: string
  text: string
}

export interface StudioTab {
  id: string
  label: string
  icon: string
  accent: string
  summary: string
  steps: StudioStep[]
}

export const tireStudioTabs: StudioTab[] = [
  {
    id: 'prepare',
    label: 'Prepare',
    icon: 'table_chart',
    accent: 'var(--pf-ai)',
    summary: 'Groups similar sizes together so we don\'t waste time generating near-identical images.',
    steps: [
      {
        id: 'cluster',
        label: 'Cluster sizes',
        icon: 'table_chart',
        image: '/images/tire-studio/prepare-cluster.png',
        text: 'Groups look-alike sizes so only the truly different ones get rendered — cutting the work almost in half.'
      }
    ]
  },
  {
    id: 'front',
    label: 'Front',
    icon: 'crop_square',
    accent: 'var(--pf-backend)',
    summary: 'Takes one straight-on photo and turns it into a clean, correct front-view image for every size.',
    steps: [
      {
        id: 'prepare',
        label: 'Prepare',
        icon: 'wash',
        image: '/images/tire-studio/front-prepare.png',
        text: 'Cleans up the raw photo and gets it ready for editing.'
      },
      {
        id: 'fit-tire',
        label: 'Fit Tire',
        icon: 'straighten',
        image: '/images/tire-studio/front-fit-tire.png',
        text: 'Makes sure the tire\'s shape is accurate for its exact size.'
      },
      {
        id: 'clean',
        label: 'Clean',
        icon: 'cleaning_services',
        image: '/images/tire-studio/front-clean.png',
        text: 'Removes dirt and stains so damage is easier to spot and fix.'
      },
      {
        id: 'retouch',
        label: 'Retouch',
        icon: 'healing',
        image: '/images/tire-studio/front-retouch.png',
        text: 'Repairs bent or broken tread.'
      },
      {
        id: 'factory',
        label: 'Factory',
        icon: 'factory',
        image: '/images/tire-studio/front-factory.png',
        text: 'Gives the rubber an even, polished finish.'
      },
      {
        id: 'size-pack',
        label: 'Size Pack',
        icon: 'grid_view',
        image: '/images/tire-studio/front-size-pack.png',
        text: 'Produces the final, correctly-shaped photo for every size.'
      }
    ]
  },
  {
    id: 'side',
    label: 'Side',
    icon: 'panorama_wide_angle',
    accent: 'var(--pf-web)',
    summary: 'Takes one sidewall photo and turns it into a labeled sidewall image for every size.',
    steps: [
      {
        id: 'prepare',
        label: 'Prepare',
        icon: 'wash',
        image: '/images/tire-studio/side-prepare.png',
        text: 'Cleans up and straightens the raw sidewall photo.'
      },
      {
        id: 'retouch',
        label: 'Retouch',
        icon: 'healing',
        image: '/images/tire-studio/side-retouch.png',
        text: 'Sharpens the sidewall\'s texture and lettering.'
      },
      {
        id: 'clean',
        label: 'Clean',
        icon: 'cleaning_services',
        image: '/images/tire-studio/side-clean.png',
        text: 'Removes unwanted text or markings.'
      },
      {
        id: 'wipe-bead',
        label: 'Wipe Bead',
        icon: 'donut_large',
        image: '/images/tire-studio/side-wipe-bead.png',
        text: 'Clears the wheel-opening ring so a clean one can be built.'
      },
      {
        id: 'add-bead',
        label: 'Add Bead',
        icon: 'adjust',
        image: '/images/tire-studio/side-add-bead.png',
        text: 'Builds a clean wheel-opening ring, instantly.'
      },
      {
        id: 'enhancement',
        label: 'Enhancement',
        icon: 'auto_fix_high',
        image: '/images/tire-studio/side-enhancement.png',
        text: 'Manually fixes any damage automatic repairs missed.'
      },
      {
        id: 'factory',
        label: 'Factory',
        icon: 'factory',
        image: '/images/tire-studio/side-factory.png',
        text: 'Gives the sidewall an even, finished look.'
      },
      {
        id: 'size-pack',
        label: 'Size Pack',
        icon: 'grid_view',
        image: '/images/tire-studio/side-size-pack.png',
        text: 'Creates the plain sidewall image for every size.'
      },
      {
        id: 'label-pack',
        label: 'Label Pack',
        icon: 'title',
        image: '/images/tire-studio/side-label-pack.png',
        text: 'Adds each size\'s own text, perfectly placed — for every size, automatically.'
      }
    ]
  },
  {
    id: 'angle45',
    label: '45°',
    icon: 'crop_rotate',
    accent: 'var(--pf-mobile)',
    summary: 'Generates the angled catalog shot and labels it — the hardest view to get right.',
    steps: [
      {
        id: 'size-pack',
        label: 'Size Pack',
        icon: 'grid_view',
        image: '/images/tire-studio/angle45-size-pack.png',
        text: 'Generates the angled photo efficiently, one per group of similar sizes.'
      },
      {
        id: 'remove-lines',
        label: 'Remove lines',
        icon: 'layers_clear',
        image: '/images/tire-studio/angle45-remove-lines.png',
        text: 'Cleans up leftover guide marks from generation.'
      },
      {
        id: 'enhancement',
        label: 'Enhancement',
        icon: 'auto_fix_high',
        image: '/images/tire-studio/angle45-enhancement.png',
        text: 'Manually fixes anything still wrong.'
      },
      {
        id: 'label-pack',
        label: 'Label Pack',
        icon: 'text_fields',
        image: '/images/tire-studio/angle45-label-pack.png',
        text: 'Adds accurate size text to the hardest angle to label.'
      }
    ]
  },
  {
    id: 'publish',
    label: 'Publish',
    icon: 'send',
    accent: 'var(--pf-infra)',
    summary: 'Protects and delivers the finished catalog images.',
    steps: [
      {
        id: 'watermark',
        label: 'Watermark',
        icon: 'water_drop',
        image: '/images/tire-studio/publish-watermark.png',
        text: 'Protects the images before they go out.'
      },
      {
        id: 'export',
        label: 'Export',
        icon: 'file_download',
        image: '/images/tire-studio/publish-export.png',
        text: 'Delivers the final files in the sizes needed.'
      }
    ]
  }
]

export const tireStudioPatterns = [
  'Cost-consciousness is architectural — clustering exists specifically to make the most expensive step run far less often.',
  'Every non-trivial numeric decision is backed by a real measurement on real production data.',
  'Subtle bugs get traced to their root cause and fixed structurally — not patched at the symptom.',
  'Once a mistake can propagate across a whole batch of output, the system refuses and says why, rather than guessing.',
  'Multi-purpose AI instructions get split into single-purpose passes once a combined one confuses the model.'
]
