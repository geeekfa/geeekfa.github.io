import type { StudioTab } from './tire-studio'

export const whyPoints = [
  {
    icon: 'visibility_off',
    color: 'var(--pf-infra)',
    title: 'The problem',
    text: 'A sales team makes hundreds of calls a week, but nobody has time to listen to them. So nobody really knows if a call went well, if the agent brought up the right things, or if a customer walked away unhappy.'
  },
  {
    icon: 'schedule',
    color: 'var(--pf-mobile)',
    title: 'The traditional fix',
    text: 'A manager can sit down and listen to a handful of calls by hand, maybe once in a while. That covers a tiny slice of the calls and takes hours for just a few.'
  },
  {
    icon: 'bolt',
    color: 'var(--pf-ai)',
    title: 'What I built instead',
    text: 'Every recorded call gets turned into text, split up by who said what, and then scored against the company\'s own training checklist. What used to be a few spot-checked calls is now every call, automatically.'
  }
]

export const finaleLine = ['Drop in a call.', 'Get back who said what, and how it went.']

export const heroImage = '/images/callscribe/hero.svg'

export const introLine = 'A recorded call goes in, a scored, readable transcript comes out. Each stage builds on the last.'

export const callscribeTabs: StudioTab[] = [
  {
    id: 'input',
    label: 'Get the call',
    icon: 'call',
    accent: 'var(--pf-ai)',
    summary: 'A call can come in two ways: a file someone uploads, or an ID that pulls the recording straight from the phone system.',
    steps: [
      {
        id: 'upload',
        label: 'Upload a file',
        icon: 'upload_file',
        text: 'Someone drops in a recorded call file directly.'
      },
      {
        id: 'phone-event',
        label: 'Phone event ID',
        icon: 'dialpad',
        text: 'Or just paste in the call\'s ID and the system finds and downloads the recording on its own.'
      }
    ]
  },
  {
    id: 'transcribe',
    label: 'Transcribe',
    icon: 'graphic_eq',
    accent: 'var(--pf-backend)',
    summary: 'Turns the audio into text using a speech model that runs on our own hardware, not a cloud service.',
    steps: [
      {
        id: 'whisper',
        label: 'Speech to text',
        icon: 'graphic_eq',
        image: '/images/callscribe/transcribe.png',
        text: 'Runs the call through a local speech-to-text model so every word gets written down, no audio ever leaves our machines.'
      }
    ]
  },
  {
    id: 'speakers',
    label: 'Tell speakers apart',
    icon: 'forum',
    accent: 'var(--pf-web)',
    summary: 'Figures out which lines belong to which person on the call.',
    steps: [
      {
        id: 'voting',
        label: 'Separate the voices',
        icon: 'forum',
        text: 'Each side of the call is checked on its own to vote on who\'s talking, then that vote is used to label the one real transcript. Getting this right took a few rounds of trial and error, because an early version kept gluing separate sentences together into one.'
      }
    ]
  },
  {
    id: 'roles',
    label: 'Label roles',
    icon: 'badge',
    accent: 'var(--pf-mobile)',
    summary: 'Works out who on the call is our agent and who is the customer, or if it wasn\'t even a real conversation.',
    steps: [
      {
        id: 'label',
        label: 'Assign a role',
        icon: 'badge',
        image: '/images/callscribe/roles.png',
        text: 'Marks each speaker as the agent, the customer, an automated phone menu, or a voicemail, so the transcript reads like a real conversation instead of "Speaker 1 / Speaker 2".'
      }
    ]
  },
  {
    id: 'quality',
    label: 'Score the call',
    icon: 'grading',
    accent: 'var(--pf-infra)',
    summary: 'Reads the finished transcript and grades how the agent actually handled the call.',
    steps: [
      {
        id: 'review',
        label: 'Grade the call',
        icon: 'grading',
        image: '/images/callscribe/quality.png',
        text: 'Checks the type of call, rates things like product knowledge and professionalism, and compares it against the company\'s own sales checklist, the same one used to train the sales team.'
      }
    ]
  },
  {
    id: 'review',
    label: 'Review the results',
    icon: 'tab',
    accent: 'var(--pf-ai)',
    summary: 'The finished result is a web page anyone can read, not a raw file someone has to dig through.',
    steps: [
      {
        id: 'results',
        label: 'Results page',
        icon: 'tab',
        text: 'Shows the speakers, the roles, the quality score and the video all in one place, with tabs to flip between them.'
      }
    ]
  }
]
