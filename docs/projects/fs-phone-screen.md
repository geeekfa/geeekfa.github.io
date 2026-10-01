# FS Phone Screen — research notes

Source: `/Users/geeekfa/Development/Projects/fs-phone-screen/.claude/CLAUDE.md`,
`agent/src/main.py`, and the resume project's
`docs/research/19-project-fs-phone-screen-fa.md`.

Not published anywhere — scratch notes for building the portfolio page.

## What it is

A "screen pop" for a Fard Systems call center. When a customer calls, the
phone system tells a small backend, the backend finds which support agent
should take the call, and that agent's desktop app automatically opens the
customer's record in the Blackstire CRM. The agent never has to search for
the caller by hand.

## Real flow (confirmed with Salman as a 4-stage pipeline)

1. **Sign in and connect** — the Windows tray app (`agent/`, CustomTkinter
   login window → pystray tray icon) logs the agent in against
   `POST /auth/login` (validates against SQL Server, returns a JWT), then
   opens a WebSocket to `/ws/{token}`. The server keys the open socket by
   the agent's email in an in-memory dict (`WebSocketManager.clients`) and
   stamps `tblUser.user_PhoneLoginTS` so the rest of the system knows
   they're online. If the connection drops, the agent retries every 5
   seconds and re-reads the token each time.
2. **A call comes in** — the phone system calls `POST /screen-pop` with
   `{agent_email, caller_phone}`. This endpoint is intentionally
   unauthenticated right now (noted as an open issue, not something to fix
   as a side effect).
3. **Server finds the right agent** — looks up that email in the live
   socket dict. If the agent isn't connected it returns
   `404 AGENT_NOT_CONNECTED`; otherwise it pushes the payload down that
   agent's own WebSocket.
4. **Screen pops** — the desktop app receives the message, builds the
   Blackstire CRM customer-lookup URL from the caller's phone number, and
   calls `webbrowser.open()`. The customer's page appears on the agent's
   screen with no action from them.

## Other real details worth keeping in the copy's back pocket

- Agent is a single-file Windows EXE, built and signed into both an Inno
  Setup `.exe` installer and a WiX `.msi` via GitHub Actions on every push
  to `main` that touches `agent/**`. This is the one project with a fully
  automated release pipeline for a desktop installer, per Salman's own
  notes — worth a tech-stack chip ("GitHub Actions") and maybe a line in a
  why-card, not a dedicated stage.
- Server is deployed to a Linux host behind nginx via a scp + systemd
  install script.
- Known real constraints (do NOT present as solved, and don't need to be
  on the page at all — listed here only so copy doesn't accidentally
  claim otherwise): `/screen-pop` is unauthenticated, tokens never expire,
  the connection registry is in-memory and single-process. None of this
  needs to show up in marketing copy; just avoid implying bulletproof
  security.

## Shape decision (confirmed with Salman)

`kind: 'pipeline'`, 4 stages as above. No real screenshots exist for this
project (it's a backend service plus a small Windows tray/login app, not
really screenshot-driven) — Salman confirmed placeholders only, no actual
screenshots will be added later. Icons for each stage are not pulled from
the app's own UI (it has no step-level icons) — picked sensible Material
Symbols names instead, called out to Salman rather than guessed silently:
`login`, `call`, `sync_alt`, `open_in_browser`.

## Tech tags used (already in app/data/projects.ts)

`Python, FastAPI, WebSocket, JWT, SQL Server, CustomTkinter, GitHub Actions`
