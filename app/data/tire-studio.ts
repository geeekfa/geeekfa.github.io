export interface StudioStep {
  id: string
  label: string
  image: string
  text: string
}

export interface StudioTab {
  id: string
  label: string
  icon: string
  summary: string
  steps: StudioStep[]
}

export const tireStudioTabs: StudioTab[] = [
  {
    id: 'prepare',
    label: 'Prepare',
    icon: 'hub',
    summary:
      'Reads the line\'s size list and groups sizes that would render identically, so the expensive steps later only pay for the sizes that actually look different.',
    steps: [
      {
        id: 'cluster',
        label: 'Cluster the size list',
        image: '/images/tire-studio/prepare-cluster.svg',
        text:
          'Clusters sizes in a scale-invariant space — two ratios derived from the tire\'s own radius — instead of raw millimetres, so the comparison holds regardless of tire size. A classic greedy set-cover algorithm then picks the fewest reference sizes needed to cover the whole list: a deliberately right-sized choice, not an over-engineered exact solver. Tolerances were calibrated against the real shipped library (25 brands, 392 sizes), cutting required renders roughly in half.'
      }
    ]
  },
  {
    id: 'front',
    label: 'Front',
    icon: 'crop_square',
    summary:
      'Standardizes one reference photo, repairs it in focused passes, then fans it out into the final front-view catalog image for every size.',
    steps: [
      {
        id: 'prepare',
        label: 'Prepare',
        image: '/images/tire-studio/front-prepare.svg',
        text:
          'Whitens the background and AI-upscales the raw photo in a single combined pass, then fits it onto a standard square canvas. Runs natively at 1024² — matched to the resolution the AI edit models sample at later, so nothing gets silently shrunk and re-grown and fine tread detail is never lost.'
      },
      {
        id: 'fit-tire',
        label: 'Fit Tire',
        image: '/images/tire-studio/front-fit-tire.svg',
        text:
          'Renders a 3D reference at the exact typed size and warps the photo onto its outline, so every master ends up on a standard, symmetric shape regardless of how the original photo was framed. A real shipped bug — wavy tread grooves — was traced to two unrelated corrections (a genuine size difference vs. the photo\'s slight lean) fighting inside one formula, and fixed by separating them into two independent steps.'
      },
      {
        id: 'clean',
        label: 'Clean',
        image: '/images/tire-studio/front-clean.svg',
        text:
          'An AI pass that erases dirt, dye lines and discoloration, repainting the tire a flat neutral grey — deliberately run before geometry repair, since tread damage is nearly invisible on a dirty tire.'
      },
      {
        id: 'retouch',
        label: 'Retouch',
        image: '/images/tire-studio/front-retouch.svg',
        text:
          'A second, separate AI pass focused purely on tread geometry — bent grooves, uneven depth, broken blocks — never texture. Splitting "fix the surface" and "fix the shape" into two single-verb passes replaced one combined prompt that gave the model contradictory instructions on the same pixels.'
      },
      {
        id: 'enhancement',
        label: 'Enhancement',
        image: '/images/tire-studio/front-enhancement.svg',
        text:
          'A manual, brush-painted spot-repair tool for the one-off damage automated passes didn\'t catch — paint the exact area, describe the fix, render, keep or discard, repeatable for as many rounds as needed. A brush hugs irregular damage tightly, where a simple shape mask would have damaged healthy rubber around it.'
      },
      {
        id: 'factory',
        label: 'Factory',
        image: '/images/tire-studio/front-factory.svg',
        text:
          'A final AI pass that evens out the rubber compound\'s finish without touching tread geometry — the paint-finish step after the body-work steps.'
      },
      {
        id: 'size-pack',
        label: 'Size Pack',
        image: '/images/tire-studio/front-size-pack.svg',
        text:
          'Fans the finished master out into one image per size, refitting each into its own correct outline, straightening any residual tilt first, and writes the final catalog files. On one real master, that straightening step alone cut a measured 48px drift down to 7.5px in the finished image.'
      }
    ]
  },
  {
    id: 'side',
    label: 'Side',
    icon: 'panorama_wide_angle',
    summary:
      'Rebuilds the sidewall\'s wheel-opening edge, restores its texture, and embosses each size\'s own text along a hand-drawn, geometry-aware arc.',
    steps: [
      {
        id: 'prepare',
        label: 'Prepare',
        image: '/images/tire-studio/side-prepare.svg',
        text:
          'Same whiten-and-upscale idea as Front, plus an optional rotation slider applied before anything else, so an angled photo can be squared up first. Runs natively at 2048² here — the bead-ring geometry and arc-text placement later in this tab are calibrated at that resolution.'
      },
      {
        id: 'retouch',
        label: 'Retouch',
        image: '/images/tire-studio/side-retouch.svg',
        text:
          'Sharpens and deepens the sidewall\'s moulded relief and texture bands — enhances only, erases nothing.'
      },
      {
        id: 'clean',
        label: 'Clean',
        image: '/images/tire-studio/side-clean.svg',
        text:
          'Erases unwanted text or markings the user draws an arc around, one region and one round at a time — sharing its underlying engine with Enhancement below rather than duplicating similar logic.'
      },
      {
        id: 'wipe-bead',
        label: 'Wipe Bead',
        image: '/images/tire-studio/side-wipe-bead.svg',
        text:
          'Detects the wheel-opening ring automatically, lets the user nudge its exact position, then paints that band pure white — clearing the way for a fresh one to be built.'
      },
      {
        id: 'add-bead',
        label: 'Add Bead',
        image: '/images/tire-studio/side-add-bead.svg',
        text:
          'Rebuilds the bead ring using a cached 3D-rendered reference. The expensive 3D render happens once and is cached; every user adjustment afterward is a cheap mathematical warp of that cached shape, so live tweaking stays instant instead of re-rendering.'
      },
      {
        id: 'enhancement',
        label: 'Enhancement',
        image: '/images/tire-studio/side-enhancement.svg',
        text:
          'The same brush-painted, multi-round repair tool as Front, reused here for general fixes — the one real difference is a temporary rotation so embossed lettering reads upright to the AI model, undone before saving.'
      },
      {
        id: 'factory',
        label: 'Factory',
        image: '/images/tire-studio/side-factory.svg',
        text:
          'Recolors the sidewall to matte charcoal with even lighting. A real, instructive bug lived here: the word "uniform" in one prompt made the AI model sand off genuine fine mould texture along with actual defects — fixed by splitting one ambiguous instruction into a precise colour rule and a separate rule explicitly protecting texture.'
      },
      {
        id: 'size-pack',
        label: 'Size Pack',
        image: '/images/tire-studio/side-size-pack.svg',
        text:
          'Fans the finished, unlabeled master out to every size via a mathematical radial remap, then runs one more AI sharpening pass per tile.'
      },
      {
        id: 'label-pack',
        label: 'Label Pack',
        image: '/images/tire-studio/side-label-pack.svg',
        text:
          'Embosses each size\'s own text along an arc the user draws once — stored as proportions of the tire\'s own geometry, so one drawing correctly maps onto a 13-inch wheel and a 17-inch wheel alike. Type size is fitted automatically to the band\'s thickness rather than manually set, so text can never overflow onto the tread by construction. If the placement geometry can\'t be measured precisely, the system refuses to render rather than guess — because a bad guess here would repeat across an entire batch of sizes at once.'
      }
    ]
  },
  {
    id: 'angle45',
    label: '45°',
    icon: 'crop_rotate',
    summary:
      'Generates the perspective 45° shot per size cluster, then embosses text onto two independent, non-circular curves — the hardest geometry in the pipeline.',
    steps: [
      {
        id: 'size-pack',
        label: 'Size Pack',
        image: '/images/tire-studio/angle45-size-pack.svg',
        text:
          'Generates one photorealistic 45° tile per size cluster — not per size — directly cashing in on Prepare\'s clustering to cut the most expensive step in the pipeline roughly 6-7×. Several interchangeable AI engines are supported; one occasionally mirror-flipped the whole tire, fixed by anchoring two visible guide lines from the 3D reference in the prompt so the model\'s sense of orientation follows them.'
      },
      {
        id: 'remove-lines',
        label: 'Remove boundary lines',
        image: '/images/tire-studio/angle45-remove-lines.svg',
        text:
          'A focused pass that erases the green/yellow guide lines Size Pack deliberately left in as landmarks — generation gets a clear anchor, cleanup happens once, separately, afterward.'
      },
      {
        id: 'enhancement',
        label: 'Enhancement',
        image: '/images/tire-studio/angle45-enhancement.svg',
        text:
          'The same paint-and-iterate repair tool used elsewhere, with a mask built against the tile\'s real perspective geometry rather than a simple circle — at 45° the tire\'s inner and outer edges are genuinely different, non-concentric curves.'
      },
      {
        id: 'label-pack',
        label: 'Label Pack',
        image: '/images/tire-studio/angle45-label-pack.svg',
        text:
          'The most technically involved step in the project: text is stamped onto two independent curves sampled point-by-point, after simpler models (matching ellipses, a single tilt angle) were tried and measurably rejected. Letter spacing by actual ink width instead of font metrics cut a real label\'s spacing error from 342% down to under 2%, and several rounds of a recurring "text lands in the wrong place" bug were eventually traced to one root cause and fixed by storing the exact drawn shape instead of compressing it into a lossy handful of numbers.'
      }
    ]
  },
  {
    id: 'publish',
    label: 'Publish',
    icon: 'send',
    summary: 'Watermarks and repackages the finished images into fixed export sizes — never touching the originals.',
    steps: [
      {
        id: 'watermark',
        label: 'Watermark',
        image: '/images/tire-studio/publish-watermark.svg',
        text:
          'Stamps copies of the finished images with a faint visible mark plus hidden embedded copyright metadata, once every angle for a size is complete — the originals are never touched.'
      },
      {
        id: 'export',
        label: 'Export',
        image: '/images/tire-studio/publish-export.svg',
        text:
          'Repackages into three fixed resolutions, any combination, in one combined job — a deliberate simplicity choice over an arbitrary resize picker nobody needed. Always builds from the watermarked copies, never the original output, so an unwatermarked image can never ship by accident.'
      }
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
