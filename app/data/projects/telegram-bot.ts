export const whyPoints = [
  {
    icon: 'help_outline',
    color: 'var(--pf-infra)',
    title: 'The problem',
    text: 'B2B customers had no quick way to check tire stock or pricing on their own. Every question meant a phone call to the store.'
  },
  {
    icon: 'schedule',
    color: 'var(--pf-mobile)',
    title: 'The traditional fix',
    text: 'Calling in and waiting for someone to look up the size by hand, often more than once a day for the same customer.'
  },
  {
    icon: 'bolt',
    color: 'var(--pf-backend)',
    title: 'What I built instead',
    text: 'A Telegram bot that approved customers can search from any chat. Type a size, see live stock and pricing, add it to a cart, no phone call needed.'
  }
]

export interface Feature {
  id: string
  icon: string
  title: string
  text: string
}

export const telegramBotFeatures: Feature[] = [
  {
    id: 'registration',
    icon: 'assignment_ind',
    title: 'Registration with admin approval',
    text: 'A new customer fills out a short form right inside the chat. Their account sits as pending until someone on staff approves it, so only real B2B accounts get access.'
  },
  {
    id: 'inline-search',
    icon: 'manage_search',
    title: 'Search tire stock from any chat',
    text: 'Using Telegram\'s inline mode, a customer can type the bot\'s name and a tire size from any conversation, not just the bot\'s own chat, and see live results from the company\'s real inventory.'
  },
  {
    id: 'add-to-cart',
    icon: 'add_shopping_cart',
    title: 'Add to cart with one tap',
    text: 'Each result has its own button. Tap it, enter a quantity, and the button updates in place to show how many are in the cart, right on that same search result.'
  },
  {
    id: 'cart-total',
    icon: 'receipt_long',
    title: 'Cart with a running total',
    text: 'A dedicated cart view lists everything added so far with live pricing and a total, so the customer can review before going further.'
  }
]

export const finaleLine = [
  'Checking stock used to mean a phone call.',
  'Now it is just a message in a chat you already have open.'
]

export const heroImage = '/images/telegram-bot/hero.svg'
