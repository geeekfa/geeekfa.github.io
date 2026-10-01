# LLM Server — research notes

Source: `/Users/geeekfa/Development/Projects/llm-server`

## What it actually is

A Docker Compose–only setup that runs `llama-server` (from llama.cpp) on a
dedicated RHEL 9 box with an NVIDIA L4 GPU (23GB VRAM), exposing an
OpenAI-compatible API (`/v1/chat/completions`, `/v1/models`, streaming,
vision via `mmproj`). Model files are never baked into the Docker image —
they live on the host at `/opt/llm/models` and are bind-mounted read-only.

Target model at time of writing: a ~21GB GGUF quantized model plus a
vision mmproj file. All tunables (model paths, context size, GPU layers,
cache type, port, API key) live in `.env`, nothing hardcoded in
`docker-compose.yml`.

GPU memory is tight against the model size once KV cache and compute
buffers are added, so `N_GPU_LAYERS` is explicitly documented as "reduce
on CUDA OOM," never assumed to be a full offload — this is the real
substance behind the "tuned to fit the hardware" bullet on the page.

`docker compose down` is required to leave no LLM process running and
free the GPU completely — this is a stated constraint in the project's own
CLAUDE.md, not something I'm inferring.

## What the page does NOT mention, on purpose

- **No specific model name.** Salman doesn't remember exactly which model
  was running when this was last tested, and explicitly wants the page to
  demonstrate the general capability (stand up any open local model),
  not pin itself to one. The project README/CLAUDE.md names a specific
  Qwen3 variant; intentionally left off the public page.
- **"Hermes Agent."** The project's docs describe this server as the LLM
  backend for a separate agent called "Hermes Agent," running on a
  different Mac. Salman asked to cut that entirely from the page, so the
  page frames it generically ("any app" can talk to it) instead.
- **Nginx.** Salman's original ask mentioned Nginx as something worth
  naming. It's listed as a project tag and folded into the "sits behind
  its own doorman" bullet (reverse proxy), but I did not find an actual
  Nginx config file in this small repo (just Dockerfile, docker-compose.yml,
  README, .env) — so the bullet describes the general role of a reverse
  proxy rather than a verified detail from this repo's own config. Worth
  a quick double check with Salman if he wants it more specific.

## Shape decision

`features` shape, no gallery, no store links, no pipeline stages — this
project has no UI of its own to screenshot (it's an inference server) and
Salman explicitly said no screenshots for this section, keep it short and
non-technical. Hero is a placeholder SVG; no real hero planned unless
Salman asks for one later.
