export const whyPoints = [
  {
    icon: 'help_outline',
    color: 'var(--pf-infra)',
    title: 'The problem',
    text: 'A promotional products company had every part of its workflow split across spreadsheets, emails, and people\'s memory. Project status, who approved what, which vendor got paid, it all lived in someone\'s head or a random file.'
  },
  {
    icon: 'schedule',
    color: 'var(--pf-mobile)',
    title: 'The traditional fix',
    text: 'Chasing someone down to ask "where is this order at" or "did this get billed yet" was normal. Mistakes like billing the same project twice, or forgetting a step, were easy to make and hard to catch.'
  },
  {
    icon: 'bolt',
    color: 'var(--pf-web)',
    title: 'What I built instead',
    text: 'One system that every department opens every day. Every project has one real status, every change is logged, and the accounting side has rules built in so nothing gets billed wrong or billed twice.'
  }
]

export interface Feature {
  id: string
  icon: string
  title: string
  text: string
}

export const agmOfficeFeatures: Feature[] = [
  {
    id: 'status-history',
    icon: 'history',
    title: 'A project\'s status is never edited, only added to',
    text: 'Every status change writes a brand new entry instead of overwriting the last one. That means there\'s always a full, honest timeline of exactly what happened to a project and when, which matters a lot once money is involved.'
  },
  {
    id: 'accounting-lock',
    icon: 'lock',
    title: 'Billed projects can\'t quietly slip backwards',
    text: 'Once a project reaches the accounting stage, most people can no longer change its status at all, only a couple of trusted roles can. I actually found and fixed a real bug here, where the lock only checked one specific status code instead of the whole accounting group, which meant some already billed projects could slip back to an earlier stage by mistake.'
  },
  {
    id: 'bulk-orders',
    icon: 'call_split',
    title: 'Bulk orders get billed differently, on purpose',
    text: 'A project that\'s part of a bulk order needs a different billing path than a normal one. The system only offers the correct options for that project type, so nobody can accidentally bill a bulk order the regular way.'
  },
  {
    id: 'permissions',
    icon: 'admin_panel_settings',
    title: 'Every page and every action has a permission behind it',
    text: 'Nothing is visible by accident. Each page is tied to a permission, and if someone doesn\'t have access to it, the system just doesn\'t show it to them rather than letting them in and hoping they don\'t touch anything.'
  },
  {
    id: 'audit-log',
    icon: 'fact_check',
    title: 'Every important change leaves a trail',
    text: 'Status changes, field edits, who did it and when, all get written to a log automatically. If something looks wrong later, there\'s always a record to check instead of relying on someone\'s memory.'
  },
  {
    id: 'clients-vendors',
    icon: 'groups',
    title: 'One place for clients, vendors, and credit cards',
    text: 'Client and vendor contact info, notes, shipping details, and which credit card paid for what all live in the same system instead of scattered across emails and spreadsheets.'
  },
  {
    id: 'scheduling',
    icon: 'calendar_month',
    title: 'A shared calendar for the whole team',
    text: 'Deadlines, reminders, and follow-ups show up on one calendar everyone can see, instead of living in one person\'s head or inbox.'
  },
  {
    id: 'order-sync',
    icon: 'sync',
    title: 'Orders come in automatically, not by hand',
    text: 'Orders placed through the company\'s online stores and through Monday.com get pulled in and turned into real projects automatically, instead of someone retyping every order by hand.'
  },
  {
    id: 'safety-rule',
    icon: 'security',
    title: 'A rule I wrote for myself, not just the code',
    text: 'This database holds real client billing data, so I set a hard rule for any AI coding assistant working on this project: it can write SQL, but it is never allowed to run a change directly against production. Any update has to be handed to me so I run it myself.'
  }
]

export const finaleLine = [
  'The oldest project I still actively maintain.',
  'Three years in, and it still runs the whole company\'s workflow.'
]

export const heroImage = '/images/agm-office/hero.svg'
