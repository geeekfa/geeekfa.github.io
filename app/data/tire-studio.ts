export interface StudioTab {
  id: string
  label: string
  icon: string
  image: string
  summary: string
  highlights: string[]
}

export const tireStudioTabs: StudioTab[] = [
  {
    id: 'prepare',
    label: 'Prepare',
    icon: 'hub',
    image: '/images/tire-studio/prepare.svg',
    summary:
      'Reads the line\'s size list and groups sizes that would render identically, so the expensive steps later only pay for the sizes that actually look different.',
    highlights: [
      'Clusters sizes in a scale-invariant space (two ratios derived from the tire\'s own radius) instead of raw millimetres — so the comparison holds regardless of tire size.',
      'Picks the fewest reference sizes needed to cover the whole list with a classic greedy set-cover algorithm — a deliberately right-sized choice, not an over-engineered exact solver.',
      'Tolerances were calibrated against the real shipped library (25 brands, 392 sizes), cutting required renders roughly in half.'
    ]
  },
  {
    id: 'front',
    label: 'Front',
    icon: 'crop_square',
    image: '/images/tire-studio/front.svg',
    summary:
      'Standardizes one reference photo, repairs it in focused passes, then fans it out into the final front-view catalog image for every size.',
    highlights: [
      'A real shipped bug — wavy tread grooves — was traced to two unrelated corrections (size difference vs. photo lean) fighting in one formula, then fixed by separating them.',
      'Splits repair into single-purpose AI passes (Clean → Retouch → Factory) instead of one prompt trying to do everything at once.',
      'A measured, two-step correction cut a real photo\'s pixel drift from 48px down to 7.5px in the finished image.'
    ]
  },
  {
    id: 'side',
    label: 'Side',
    icon: 'panorama_wide_angle',
    image: '/images/tire-studio/side.svg',
    summary:
      'Rebuilds the sidewall\'s wheel-opening edge, restores its texture, and embosses each size\'s own text along a hand-drawn, geometry-aware arc.',
    highlights: [
      'The expensive 3D reference ring is rendered once and cached, then cheaply warped to fit — so live adjustment stays instant.',
      'One ambiguous word in an AI prompt ("uniform") once erased real sidewall texture along with actual defects — found and fixed with a more precise prompt.',
      'If the text-placement geometry can\'t be measured precisely, the system refuses to render rather than silently guessing — because a bad guess would repeat across an entire size range.'
    ]
  },
  {
    id: 'angle45',
    label: '45°',
    icon: 'crop_rotate',
    image: '/images/tire-studio/angle45.svg',
    summary:
      'Generates the perspective 45° shot per size cluster, then embosses text onto two independent, non-circular curves — the hardest geometry in the pipeline.',
    highlights: [
      'Renders once per size cluster instead of once per size — directly cashing in on Prepare\'s clustering to cut the most expensive step ~6-7×.',
      'One AI engine occasionally mirror-flipped the whole tire; anchoring two visible landmark lines in the prompt fixed it.',
      'Letter spacing by actual ink width (not font metrics) cut spacing error from 342% down to under 2% on a real label.'
    ]
  },
  {
    id: 'publish',
    label: 'Publish',
    icon: 'send',
    image: '/images/tire-studio/publish.svg',
    summary:
      'Watermarks and repackages the finished images into fixed export sizes — never touching the originals.',
    highlights: [
      'Every export is built from a separate watermarked copy, never the original — a wrong export can never corrupt the source catalog image.',
      'Three fixed resolutions instead of an arbitrary picker — a deliberate simplicity choice over unused flexibility.'
    ]
  }
]

export const tireStudioPatterns = [
  'Cost-consciousness is architectural, not bolted on — clustering exists specifically to make the most expensive step run far less often.',
  'Every non-trivial numeric decision is backed by a real measurement on real production data, not a guess.',
  'Subtle bugs get traced to their root geometric or linguistic cause, then fixed structurally — not patched at the symptom.',
  'Once a mistake can propagate across a whole batch of output, the system is designed to refuse and say why, rather than guess.',
  'Multi-purpose AI instructions are consistently split into single-purpose passes once a combined one is shown to confuse the model.'
]
