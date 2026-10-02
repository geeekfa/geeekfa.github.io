# B2B Ordering Bot — research notes (internal, not published)

Source: `/Users/geeekfa/Development/Python/blackstirebot` (src/)

## What it is

Telegram bot `@blackstirebot` for Black's Tire's B2B customers. Built with
`pyTelegramBotAPI` (synchronous long polling), talks directly to MS SQL
Server via `pyodbc` through stored procedures — no FastAPI or separate API
layer, despite Salman's first description. Confirmed with him; tags stay as
they already were in `projects.ts` (Python, Telegram Bot API, SQL Server,
Stored procedures).

## Real flow (from code)

1. **Registration** (`handlers/registration.py`) — multi-step form via
   `ForceReply`/inline nav buttons: customer #, company name, first/last
   name, role (picked from an inline keyboard populated from
   `tblAppLookup`), business phone, cell phone, email. Validates US phone
   format and email format. On finish, calls
   `sp_TelegramBotRegistration` stored proc. Account status: pending (0),
   approved (1), denied (9) — `main_keyboard()` shows a different menu per
   status.

2. **Inline search** (`handlers/search.py`) — "🔍 Search Tires" button
   drops a `switch_inline_query_current_chat` button that pre-fills
   `@blackstirebot #size_filter:`. Typing digits triggers
   `handle_inline_size_filter`, which calls
   `sp_TelegramBotSizeList` for live size suggestions (up to 10) as the
   customer types. Picking a suggested size inserts
   `#size:<code>`, triggering `handle_inline_tires`, which calls
   `sp_TelegramBotInventoryBySize` with pagination (`page_count=10`,
   Telegram's own `offset`/`next_offset` inline-mode pagination). Each
   result shows price, product code, local qty, company qty, warranty, and
   an "🛒 Add" button (or "🛒 (n)" if already in cart, using
   `Cart().qty_map()`).

3. **Add to cart** (`handlers/cart.py`) — tapping the add button sends a
   `ForceReply` prompt for quantity in a DM, validates it's a positive
   integer, deletes any existing cart row for that product
   (`sp_TelegramBotCartDelete`) and re-adds with the new qty
   (`sp_TelegramBotCartAdd`). Updates the inline result's own button in
   place to show the new count via `edit_message_reply_markup` on
   `inline_message_id`.

4. **Cart view** (`handlers/cart_view.py`) — "🛒 Cart" button (label shows
   count once non-empty) calls `sp_TelegramBotCartDisplay`, lists each
   item with price × qty = subtotal, and a grand total. Has a "✅ Submit
   Order" button wired to a callback, but the handler is a stub
   (`# TODO: implement submit order`) — confirms the handover doc:
   **paused at the client's own request before checkout**, not abandoned
   mid-build.

Also: `/aboutus` and `/myprofile` commands (`handlers/info.py`), a
Blackstirebot-branded hero image asset already in `src/assets/`.

## Deploy

systemd service on a Linux box, no Docker (`_deploy/`).

## What's on the page

`kind: 'features'`, no gallery (no screenshots exist for a Telegram bot —
nothing to capture), no store links section (private, approval-gated, not
something to point a recruiter at downloading). Four feature cards:
registration + approval, inline search, add-to-cart, cart + total. Closing
line references the "no phone call needed" angle rather than claiming the
checkout flow is complete.

Icons (`assignment_ind`, `manage_search`, `add_shopping_cart`,
`receipt_long`) are my own picks — the bot's own UI uses Telegram emoji,
not Material icon names, so there was nothing to pull from the source.

Hero: placeholder SVG at `public/images/telegram-bot/hero.svg`. Still
needs a real hero image from Salman (AI-generated flat vector diagram,
`--pf-backend` accent, or his own Photoshop version) — not done yet.
