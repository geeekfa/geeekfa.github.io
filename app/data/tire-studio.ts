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
        image: '/images/tire-studio/prepare-cluster.png',
        text: 'Groups look-alike sizes so only the truly different ones get rendered.',
        detail:
          'Compares tires by their real proportions, not raw size numbers — so a 15-inch and a 20-inch tire that look the same shape get grouped together. It then picks the smallest set of sizes that covers the whole list. Tested against 25 real brands and 392 real sizes, this cuts the number of images that need to be generated almost in half.'
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
          'Cleans up the background to plain white and sharpens the raw photo, then fits it onto a standard square canvas. The size is matched exactly to what the next AI steps expect, so no tread detail gets blurred out by resizing back and forth later.'
      },
      {
        id: 'fit-tire',
        label: 'Fit Tire',
        icon: 'straighten',
        image: '/images/tire-studio/front-fit-tire.svg',
        text: 'Warps the photo onto a 3D-accurate outline for the exact size.',
        detail:
          'Builds a 3D model of the exact tire size the user typed, then reshapes the photo to match it — so every photo ends up on a standard, correct outline, no matter how it was taken. A real bug once made tread grooves look wavy; it turned out two different fixes were fighting each other, and splitting them into two separate steps solved it.'
      },
      {
        id: 'clean',
        label: 'Clean',
        icon: 'cleaning_services',
        image: '/images/tire-studio/front-clean.svg',
        text: 'Erases dirt and dye, flattens the tire to one neutral grey.',
        detail:
          'AI erases dirt, stains and discoloration, and repaints the tire a flat grey. This happens before any damage repair on purpose — it\'s hard to see broken tread on a dirty tire, for both the AI and a human checking the result.'
      },
      {
        id: 'retouch',
        label: 'Retouch',
        icon: 'healing',
        image: '/images/tire-studio/front-retouch.svg',
        text: 'Repairs bent grooves and broken tread blocks — geometry only.',
        detail:
          'A second AI pass fixes only the shape of the tread — bent lines, broken chunks — never the texture. Asking the AI to fix the surface and the shape at the same time gave confusing, mixed results, so those became two separate, simpler instructions.'
      },
      {
        id: 'enhancement',
        label: 'Enhancement',
        icon: 'brush',
        image: '/images/tire-studio/front-enhancement.svg',
        text: 'Hand-painted spot fixes for anything else that needs it.',
        detail:
          'A manual tool for fixing anything the automatic steps missed. You paint over the exact damaged spot, describe what it should look like, and the AI fixes just that area — keep the result or try again. Painting by hand means only the actual damage gets touched, not the healthy rubber around it.'
      },
      {
        id: 'factory',
        label: 'Factory',
        icon: 'factory',
        image: '/images/tire-studio/front-factory.svg',
        text: 'Evens out the rubber compound\'s final finish.',
        detail: 'One last AI pass that makes the rubber\'s finish look even and consistent, without touching the tread shape — like a final coat of paint after all the repairs.'
      },
      {
        id: 'size-pack',
        label: 'Size Pack',
        icon: 'grid_view',
        image: '/images/tire-studio/front-size-pack.svg',
        text: 'Fans the master into every size and writes the final images.',
        detail:
          'Takes the one finished photo and generates a correctly-shaped version for every size in the list, straightening out any small tilt first. On a real test photo, that straightening step cut the leftover misalignment by more than 80%.'
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
          'Same cleanup as Front\'s Prepare step, plus an option to rotate the photo first if it was taken at an angle. This runs at a higher resolution than Front, because later steps in this section need that extra detail to line things up precisely.'
      },
      {
        id: 'retouch',
        label: 'Retouch',
        icon: 'healing',
        image: '/images/tire-studio/side-retouch.svg',
        text: 'Sharpens and deepens the moulded relief and texture.',
        detail: 'AI sharpens and deepens the raised lettering and texture on the sidewall — it only enhances what\'s there, it doesn\'t remove anything.'
      },
      {
        id: 'clean',
        label: 'Clean',
        icon: 'cleaning_services',
        image: '/images/tire-studio/side-clean.svg',
        text: 'Erases unwanted text from a hand-drawn region.',
        detail:
          'You draw around any unwanted text or marking, and the AI erases it and fills in the surface naturally — one area at a time. This uses the exact same tool as the Enhancement step below, just for a different job.'
      },
      {
        id: 'wipe-bead',
        label: 'Wipe Bead',
        icon: 'donut_large',
        image: '/images/tire-studio/side-wipe-bead.svg',
        text: 'Detects and clears the wheel-opening ring.',
        detail: 'Automatically finds the ring around the wheel opening, lets you fine-tune its position, then clears it to plain white — making room to build a clean new one in the next step.'
      },
      {
        id: 'add-bead',
        label: 'Add Bead',
        icon: 'adjust',
        image: '/images/tire-studio/side-add-bead.svg',
        text: 'Rebuilds the ring from a cached 3D reference — instantly.',
        detail:
          'The slow 3D render of the ring only has to happen once and gets saved for reuse. After that, every adjustment you make is just a quick reshape of that saved image, so it updates instantly instead of re-rendering from scratch each time.'
      },
      {
        id: 'enhancement',
        label: 'Enhancement',
        icon: 'auto_fix_high',
        image: '/images/tire-studio/side-enhancement.svg',
        text: 'Hand-painted repairs for one-off damage.',
        detail:
          'The same paint-and-fix tool as Front\'s Enhancement step, reused here. The one difference: the image is temporarily rotated so raised lettering faces right-side up for the AI, then rotated back before saving.'
      },
      {
        id: 'factory',
        label: 'Factory',
        icon: 'factory',
        image: '/images/tire-studio/side-factory.svg',
        text: 'Recolors to matte charcoal with even lighting.',
        detail:
          'A real bug lived here: the instruction "make the surface uniform" accidentally told the AI to smooth away real, fine texture along with actual flaws. The fix was writing two separate, clearer instructions — one for color, one that explicitly protects the texture.'
      },
      {
        id: 'size-pack',
        label: 'Size Pack',
        icon: 'grid_view',
        image: '/images/tire-studio/side-size-pack.svg',
        text: 'Remaps the finished sidewall to every size.',
        detail: 'Generates the plain, unlabeled sidewall for every size using geometry (no AI needed for the reshaping itself), then runs one more sharpening pass on each image.'
      },
      {
        id: 'label-pack',
        label: 'Label Pack',
        icon: 'title',
        image: '/images/tire-studio/side-label-pack.svg',
        text: 'Embosses each size\'s own text along a hand-drawn arc.',
        detail:
          'You draw the text placement once, and it\'s saved as a proportion of the tire\'s shape — so the same drawing works correctly on a small wheel or a big one. Letter size adjusts automatically to always fit, so text can never spill over. And if anything about the placement looks unclear, the tool refuses to guess and shows a warning instead — one bad guess here would repeat across every size.'
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
          'This generates one image per group of similar sizes, not per size — reusing the grouping from the Prepare step to cut the most expensive part of the whole pipeline down to roughly a sixth of the work. One AI option occasionally flipped the tire like a mirror image; telling it to match two visible guide marks from the 3D reference fixed that.'
      },
      {
        id: 'remove-lines',
        label: 'Remove lines',
        icon: 'layers_clear',
        image: '/images/tire-studio/angle45-remove-lines.svg',
        text: 'Erases the AI\'s guide lines, left in on purpose.',
        detail: 'Erases the colored guide lines that the previous step left in on purpose — they help the AI get the angle right during generation, then get cleaned up afterward in their own separate step.'
      },
      {
        id: 'enhancement',
        label: 'Enhancement',
        icon: 'auto_fix_high',
        image: '/images/tire-studio/angle45-enhancement.svg',
        text: 'Hand-painted touch-ups on the real 45° geometry.',
        detail: 'The same paint-and-fix tool used elsewhere, adapted for this angle — from a 45° view the tire\'s inner and outer edges are two different, uneven curves rather than simple circles, so the paintable area follows the real shape.'
      },
      {
        id: 'label-pack',
        label: 'Label Pack',
        icon: 'text_fields',
        image: '/images/tire-studio/angle45-label-pack.svg',
        text: 'Stamps text onto two independent curves — the hardest geometry here.',
        detail:
          'Simpler approaches (like fitting an oval shape) were tried first and didn\'t hold up on real tests. Spacing letters by their actual visible width instead of the font\'s built-in spacing fixed badly uneven gaps between characters — from wildly inconsistent down to barely noticeable.'
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
        detail: 'Makes a copy of each finished image with a light visible watermark, plus hidden copyright info saved inside the file — this only happens once every angle for a size is ready, and the original files are never changed.'
      },
      {
        id: 'export',
        label: 'Export',
        icon: 'file_download',
        image: '/images/tire-studio/publish-export.svg',
        text: 'Packages the final sizes — never touching the originals.',
        detail:
          'Saves the final images in three fixed sizes, any combination you pick, in one go. It always works from the watermarked copies, never the originals — so an un-watermarked image can never accidentally go out the door.'
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
