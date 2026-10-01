# FS Tire Inventory — research notes (internal, not published)

Source: `/Users/geeekfa/Development/Projects/fs-tire-inventory`

## What it is

Local-first prototype: a phone video panning across a warehouse tire shelf becomes a
structured inventory report (count + manufacturer/model/size/type per tire). All
processing runs on Salman's own machine, nothing goes to the cloud. Backend only
(FastAPI) — the Flutter mobile capture app is explicitly out of scope for now, so
there is no mobile UI to screenshot.

Status per `.claude/CLAUDE.md` / `docs/project-context.md`: CV pipeline roadmap
(Steps 0-13) is built and measured. Everything past that (persistence, auth, a
second feature, Flutter) is still unimplemented prep-phase stuff — do not imply
those exist.

## Real numbers (measured, Step 13, 2026-08-01, 3-video local corpus only)

| Video | Ground truth | Counted | Error | Time (2 runs) |
|---|---:|---:|---:|---:|
| vid_1.mp4 | 22 | 22 | 0 | 136s / 134s |
| vid_2.mp4 | 27 | 27 | 0 | 185s / 184s |
| vid_3.mp4 | 24 | 24 | 0 | 185s / 186s |

0 count error across 73 tires total. ~60s video takes ~2-3 minutes end to end on
the dev machine (M4 Pro). These are local-corpus numbers, not a general accuracy
claim — don't present as "production accuracy."

~3500 lines of core code (per resume research doc, unverified against current repo,
treat as approximate).

## Pipeline stages (candidate — confirm with Salman before writing)

1. **Video in -> one panorama per video.** Decode video, estimate motion, stitch a
   seamless `panorama.v2` (one continuous image of the whole shelf) instead of
   working frame by frame. Two JPEG-quality variants exist on disk
   (`test-data/panoramas/full/`, `.../readable/`) — quality-92 encoding is
   deliberate, the detector was trained on quality-92 pixels (raw pixels measurably
   change the count: 26 vs ground-truth 24 on vid_3).
2. **Counting — detector + dual witness.** A YOLO model Salman fine-tuned himself
   (small dataset, 26 samples, deliberately a small model so it generalizes instead
   of memorizing) finds tires in the panorama. Two independent witnesses
   (camera-dwell time + tire-width geometry) must agree with the detector or the
   count is flagged `needs_review` instead of trusted blindly. Counting never
   depends on whether a label is readable — unlabeled tires still count.
3. **Per-tire crop + label segmentation.** Each counted tire gets its own crop from
   a source video frame (never the panorama). Where the label itself sits on the
   tire is then segmented out via SAM3, which runs only through Salman's remote
   ComfyUI server (no local SAM3 path).
4. **Label reading — two engines cross-checking.** Two independent, boxless OCR/VLM
   engines read each crop: PaddleOCR-VL-1.6 running locally via MLX, and QwenVL via
   the remote ComfyUI server. They agree -> high confidence; disagree ->
   `needs_review`. Classic PaddleOCR, Ollama, and an in-process VLM were all tried
   and removed — don't reintroduce as "alternatives considered" unless asked,
   keep it simple.
5. **Normalize + aggregate into the report.** Fields (manufacturer/model/size/code)
   get normalized, tires are grouped by manufacturer+model+size, and the final
   `inventory-report.v1` lists total/confident/needs-review counts plus a review
   queue for anything uncertain. Nothing is silently promoted from "maybe" to
   "fact."

## Real "why this exists" material

- Problem: counting tires on a shelf by hand is slow and error-prone, and the
  shelf keeps changing.
- The STAR-worthy decisions (both real, from `.claude/CLAUDE.md` + decisions docs):
  - **Ollama banned in production** — one actual production server crash from
    using it, documented as a rule afterward, not a style preference.
  - **Open licensing risk, not hidden**: the YOLO detector (`ultralytics`) is
    AGPL-3.0. Running it in a network service can trigger AGPL's network clause.
    A permissively-licensed replacement was tried and measurably failed (4/73
    count error vs. 0, ~3.4x slower) and was reverted. This is flagged as an open
    business decision, not resolved — don't imply it's solved.
- Architecture: API never imports OpenCV/ultralytics/MLX directly — it depends on
  a `VideoAnalyzer` port/contract, so the vision engine can be swapped later
  without touching the API layer.

## Visuals available (no app UI exists — backend only)

- Real panorama images per video/sweep:
  `test-data/panoramas/full/vid_{1,2,3}-sweep*.jpg` and
  `.../readable/vid_{1,2,3}-sweep*.jpg` — actual shelf photos stitched into one
  wide image. These are the only genuine "screenshot"-equivalent artifacts (no
  app screens, since there's no UI).
- Have not yet found rendered outputs with detection boxes / per-tire crops /
  OCR overlays drawn — need to check `research/` scripts/workflows or ask Salman
  if such visualizations exist or need generating.

## Resolved with Salman (2026-10-01)

1. The 5-stage breakdown is correct as listed above.
2. Visuals: real panorama images from `test-data/panoramas/readable/` (no
   annotated/boxed images exist, and none were generated — plain real
   panoramas only).
3. Shape: `kind: 'pipeline'`, same as Tire Studio.

Images used (one per stage, copied into `public/images/fs-tire-inventory/`):
panorama.jpg (vid_1-sweep1), counting.jpg (vid_2-sweep2), crop-label.jpg
(vid_1-sweep2), label-reading.jpg (vid_3-sweep1), report.jpg (vid_2-sweep1).
Hero is a placeholder SVG — ask Salman later whether he wants to build one or
get an AI prompt (same dark-background `--pf-ai` style as other heroes).
