export interface StudioStep {
  id: string
  label: string
  icon: string
  image: string
  text: string
  detail: string
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
    summary: 'Groups sizes that would render identically, so later steps only pay for sizes that actually look different.',
    steps: [
      {
        id: 'cluster',
        label: 'Cluster sizes',
        icon: 'table_chart',
        image: '/images/tire-studio/prepare-cluster.svg',
        text: 'Groups look-alike sizes so only the truly different ones get rendered.',
        detail:
          'Clusters sizes in a scale-invariant space — two ratios derived from the tire\'s own radius — instead of raw millimetres. A greedy set-cover algorithm then picks the fewest reference sizes needed to cover the whole list. Tolerances were calibrated against the real shipped library (25 brands, 392 sizes), cutting required renders roughly in half.'
      }
    ]
  },
  {
    id: 'front',
    label: 'Front',
    icon: 'crop_square',
    accent: 'var(--pf-backend)',
    summary: 'Standardizes one reference photo, repairs it in focused passes, then fans it out into every size.',
    steps: [
      {
        id: 'prepare',
        label: 'Prepare',
        icon: 'wash',
        image: '/images/tire-studio/front-prepare.svg',
        text: 'Whitens and upscales the raw photo onto a standard frame.',
        detail:
          'Whitens the background and AI-upscales the raw photo in a single combined pass, then fits it onto a standard square canvas at 1024² — matched to the resolution the AI edit models sample at later, so fine tread detail is never silently lost to a resize mismatch.'
      },
      {
        id: 'fit-tire',
        label: 'Fit Tire',
        icon: 'straighten',
        image: '/images/tire-studio/front-fit-tire.svg',
        text: 'Warps the photo onto a 3D-accurate outline for the exact size.',
        detail:
          'Renders a 3D reference at the exact typed size and warps the photo onto its outline. A real shipped bug — wavy tread grooves — was traced to two unrelated corrections (a genuine size difference vs. the photo\'s lean) fighting inside one formula, fixed by separating them into two independent steps.'
      },
      {
        id: 'clean',
        label: 'Clean',
        icon: 'cleaning_services',
        image: '/images/tire-studio/front-clean.svg',
        text: 'Erases dirt and dye, flattens the tire to one neutral grey.',
        detail:
          'An AI pass that erases dirt, dye lines and discoloration, repainting the tire a flat neutral grey — deliberately run before geometry repair, since tread damage is nearly invisible on a dirty tire.'
      },
      {
        id: 'retouch',
        label: 'Retouch',
        icon: 'healing',
        image: '/images/tire-studio/front-retouch.svg',
        text: 'Repairs bent grooves and broken tread blocks — geometry only.',
        detail:
          'A second, separate AI pass focused purely on tread geometry, never texture. Splitting "fix the surface" and "fix the shape" into two single-verb passes replaced one combined prompt that gave the model contradictory instructions on the same pixels.'
      },
      {
        id: 'enhancement',
        label: 'Enhancement',
        icon: 'brush',
        image: '/images/tire-studio/front-enhancement.svg',
        text: 'Hand-painted spot fixes for anything else that needs it.',
        detail:
          'A manual, brush-painted spot-repair tool for one-off damage the automated passes didn\'t catch — paint the exact area, describe the fix, render, keep or discard. A brush hugs irregular damage tightly, where a simple shape mask would have damaged healthy rubber around it.'
      },
      {
        id: 'factory',
        label: 'Factory',
        icon: 'factory',
        image: '/images/tire-studio/front-factory.svg',
        text: 'Evens out the rubber compound\'s final finish.',
        detail: 'A final AI pass that evens out the rubber compound\'s finish without touching tread geometry — the paint-finish step after the body-work steps.'
      },
      {
        id: 'size-pack',
        label: 'Size Pack',
        icon: 'grid_view',
        image: '/images/tire-studio/front-size-pack.svg',
        text: 'Fans the master into every size and writes the final images.',
        detail:
          'Fans the finished master out into one image per size, refitting each into its own correct outline and straightening any residual tilt first. On one real master, that straightening step cut a measured 48px drift down to 7.5px in the finished image.'
      }
    ]
  },
  {
    id: 'side',
    label: 'Side',
    icon: 'panorama_wide_angle',
    accent: 'var(--pf-web)',
    summary: 'Rebuilds the wheel-opening edge, restores texture, and embosses each size\'s own text.',
    steps: [
      {
        id: 'prepare',
        label: 'Prepare',
        icon: 'wash',
        image: '/images/tire-studio/side-prepare.svg',
        text: 'Straightens and standardizes the raw sidewall photo.',
        detail:
          'Same whiten-and-upscale idea as Front, plus an optional rotation slider applied before anything else. Runs natively at 2048² — the bead-ring geometry and arc-text placement later in this tab are calibrated at that resolution.'
      },
      {
        id: 'retouch',
        label: 'Retouch',
        icon: 'healing',
        image: '/images/tire-studio/side-retouch.svg',
        text: 'Sharpens and deepens the moulded relief and texture.',
        detail: 'Sharpens and deepens the sidewall\'s moulded relief and texture bands — enhances only, erases nothing.'
      },
      {
        id: 'clean',
        label: 'Clean',
        icon: 'cleaning_services',
        image: '/images/tire-studio/side-clean.svg',
        text: 'Erases unwanted text from a hand-drawn region.',
        detail:
          'Erases unwanted text or markings the user draws an arc around, one region at a time — sharing its underlying engine with Enhancement below rather than duplicating similar logic.'
      },
      {
        id: 'wipe-bead',
        label: 'Wipe Bead',
        icon: 'donut_large',
        image: '/images/tire-studio/side-wipe-bead.svg',
        text: 'Detects and clears the wheel-opening ring.',
        detail: 'Detects the wheel-opening ring automatically, lets the user nudge its exact position, then paints that band pure white — clearing the way for a fresh one to be built.'
      },
      {
        id: 'add-bead',
        label: 'Add Bead',
        icon: 'adjust',
        image: '/images/tire-studio/side-add-bead.svg',
        text: 'Rebuilds the ring from a cached 3D reference — instantly.',
        detail:
          'The expensive 3D render happens once and is cached; every user adjustment afterward is a cheap mathematical warp of that cached shape, so live tweaking stays instant instead of re-rendering.'
      },
      {
        id: 'enhancement',
        label: 'Enhancement',
        icon: 'auto_fix_high',
        image: '/images/tire-studio/side-enhancement.svg',
        text: 'Hand-painted repairs for one-off damage.',
        detail:
          'The same brush-painted, multi-round repair tool as Front, reused here — the one real difference is a temporary rotation so embossed lettering reads upright to the AI model, undone before saving.'
      },
      {
        id: 'factory',
        label: 'Factory',
        icon: 'factory',
        image: '/images/tire-studio/side-factory.svg',
        text: 'Recolors to matte charcoal with even lighting.',
        detail:
          'A real, instructive bug lived here: the word "uniform" in one prompt made the AI sand off genuine fine mould texture along with actual defects — fixed by splitting one ambiguous instruction into a precise colour rule and a separate rule explicitly protecting texture.'
      },
      {
        id: 'size-pack',
        label: 'Size Pack',
        icon: 'grid_view',
        image: '/images/tire-studio/side-size-pack.svg',
        text: 'Remaps the finished sidewall to every size.',
        detail: 'Fans the finished, unlabeled master out to every size via a mathematical radial remap, then runs one more AI sharpening pass per tile.'
      },
      {
        id: 'label-pack',
        label: 'Label Pack',
        icon: 'title',
        image: '/images/tire-studio/side-label-pack.svg',
        text: 'Embosses each size\'s own text along a hand-drawn arc.',
        detail:
          'The arc is stored as proportions of the tire\'s own geometry, so one drawing correctly maps onto a 13-inch wheel and a 17-inch wheel alike. Type size is fitted automatically to the band\'s thickness, so text can never overflow by construction. If the geometry can\'t be measured precisely, the system refuses to render rather than guess — a bad guess here would repeat across an entire batch of sizes.'
      }
    ]
  },
  {
    id: 'angle45',
    label: '45°',
    icon: 'crop_rotate',
    accent: 'var(--pf-mobile)',
    summary: 'Generates the perspective shot per size cluster, then embosses text onto the hardest geometry in the pipeline.',
    steps: [
      {
        id: 'size-pack',
        label: 'Size Pack',
        icon: 'grid_view',
        image: '/images/tire-studio/angle45-size-pack.svg',
        text: 'Generates one photorealistic shot per size cluster.',
        detail:
          'Renders once per size cluster, not per size — directly cashing in on Prepare\'s clustering to cut the most expensive step roughly 6-7×. One AI engine occasionally mirror-flipped the whole tire, fixed by anchoring two visible guide lines from the 3D reference in the prompt.'
      },
      {
        id: 'remove-lines',
        label: 'Remove lines',
        icon: 'layers_clear',
        image: '/images/tire-studio/angle45-remove-lines.svg',
        text: 'Erases the AI\'s guide lines, left in on purpose.',
        detail: 'A focused pass that erases the green/yellow guide lines Size Pack deliberately left in as landmarks — generation gets a clear anchor, cleanup happens once, separately, afterward.'
      },
      {
        id: 'enhancement',
        label: 'Enhancement',
        icon: 'auto_fix_high',
        image: '/images/tire-studio/angle45-enhancement.svg',
        text: 'Hand-painted touch-ups on the real 45° geometry.',
        detail: 'The same paint-and-iterate repair tool used elsewhere, with a mask built against the tile\'s real perspective geometry — at 45° the tire\'s edges are genuinely different, non-concentric curves.'
      },
      {
        id: 'label-pack',
        label: 'Label Pack',
        icon: 'text_fields',
        image: '/images/tire-studio/angle45-label-pack.svg',
        text: 'Stamps text onto two independent curves — the hardest geometry here.',
        detail:
          'Simpler models (matching ellipses, a single tilt angle) were tried and measurably rejected. Letter spacing by actual ink width instead of font metrics cut a real label\'s spacing error from 342% down to under 2%.'
      }
    ]
  },
  {
    id: 'publish',
    label: 'Publish',
    icon: 'send',
    accent: 'var(--pf-infra)',
    summary: 'Watermarks and repackages the finished images into fixed export sizes — never touching the originals.',
    steps: [
      {
        id: 'watermark',
        label: 'Watermark',
        icon: 'water_drop',
        image: '/images/tire-studio/publish-watermark.svg',
        text: 'Stamps a copy with visible + hidden ownership marks.',
        detail: 'Stamps copies of the finished images with a faint visible mark plus hidden embedded copyright metadata, once every angle for a size is complete — the originals are never touched.'
      },
      {
        id: 'export',
        label: 'Export',
        icon: 'file_download',
        image: '/images/tire-studio/publish-export.svg',
        text: 'Packages the final sizes — never touching the originals.',
        detail:
          'Repackages into three fixed resolutions, any combination, in one combined job. Always builds from the watermarked copies, never the original output, so an unwatermarked image can never ship by accident.'
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
