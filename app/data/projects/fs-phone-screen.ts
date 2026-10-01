import type { StudioTab } from './tire-studio'

export const whyPoints = [
  {
    icon: 'search_off',
    color: 'var(--pf-infra)',
    title: 'The problem',
    text: 'A customer calls in, and the agent has no idea who it is until they ask and type the phone number into the CRM by hand. A few seconds of dead air on every single call.'
  },
  {
    icon: 'schedule',
    color: 'var(--pf-mobile)',
    title: 'The traditional fix',
    text: 'The agent writes down the number, searches for it in the CRM, and opens the right record themselves. Works fine, but it is a few manual steps on every call, every time.'
  },
  {
    icon: 'bolt',
    color: 'var(--pf-ai)',
    title: 'What I built instead',
    text: 'The moment the phone rings, the customer\'s page is already open on the agent\'s screen. No typing, no searching, the agent just starts talking.'
  }
]

export const finaleLine = ['The phone rings.', 'The customer\'s page is already on screen.']

export const heroImage = '/images/fs-phone-screen/hero.svg'

export const introLine = 'A phone call turns into an open browser tab in about a second. Each stage hands off to the next.'

export const fsPhoneScreenTabs: StudioTab[] = [
  {
    id: 'connect',
    label: 'Sign in and connect',
    icon: 'login',
    accent: 'var(--pf-ai)',
    summary: 'A small Windows app sits in the system tray, signed in and listening, for as long as the agent is at their desk.',
    steps: [
      {
        id: 'login',
        label: 'Sign in',
        icon: 'login',
        text: 'The agent signs into a small desktop app once. It remembers them after that.'
      },
      {
        id: 'stay-online',
        label: 'Stay connected',
        icon: 'wifi_tethering',
        text: 'The app keeps a live connection open to the server in the background, so the server always knows which agents are online right now.'
      }
    ]
  },
  {
    id: 'call',
    label: 'A call comes in',
    icon: 'call',
    accent: 'var(--pf-backend)',
    summary: 'The phone system tells the backend who is calling and which agent should get it.',
    steps: [
      {
        id: 'notify',
        label: 'Phone system notifies the backend',
        icon: 'call',
        text: 'As soon as the call connects, the phone system sends the caller\'s number and the agent\'s email to the backend.'
      }
    ]
  },
  {
    id: 'route',
    label: 'Find the right agent',
    icon: 'sync_alt',
    accent: 'var(--pf-web)',
    summary: 'The backend checks which agent is online right now and sends the call details straight to their desktop app.',
    steps: [
      {
        id: 'lookup',
        label: 'Look up and signal',
        icon: 'sync_alt',
        text: 'The backend finds that agent\'s live connection and pushes the caller\'s number down to their desktop app.'
      }
    ]
  },
  {
    id: 'pop',
    label: 'Screen pops',
    icon: 'open_in_browser',
    accent: 'var(--pf-mobile)',
    summary: 'The agent\'s desktop app opens the customer\'s record automatically, no clicking required.',
    steps: [
      {
        id: 'open',
        label: 'Browser opens the customer\'s page',
        icon: 'open_in_browser',
        text: 'The desktop app builds the right CRM link from the caller\'s number and opens it in the browser, right as the call starts.'
      }
    ]
  }
]
