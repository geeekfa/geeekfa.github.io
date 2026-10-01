export const whyPoints = [
  {
    icon: 'help_outline',
    color: 'var(--pf-infra)',
    title: 'The problem',
    text: 'Most apps that "use AI" are really just calling someone else\'s server, usually ChatGPT or Gemini. Every question, every bit of data, leaves your network and goes to another company.'
  },
  {
    icon: 'schedule',
    color: 'var(--pf-mobile)',
    title: 'The traditional fix',
    text: 'Relying only on those outside services means paying per request, living with their limits, and trusting a company you don\'t control with whatever you send them.'
  },
  {
    icon: 'bolt',
    color: 'var(--pf-web)',
    title: 'What I built instead',
    text: 'A private AI server, set up from scratch on its own Linux machine with a dedicated GPU. Any app can ask it questions the exact same way it would ask ChatGPT, except nothing ever leaves the network.'
  }
]

export interface Feature {
  id: string
  icon: string
  title: string
  text: string
}

export const llmServerFeatures: Feature[] = [
  {
    id: 'own-model',
    icon: 'memory',
    title: 'Runs its own AI model, no outside company involved',
    text: 'I downloaded open-source language models like Qwen, Gemma, and DeepSeek and got them running entirely on one server. No calls out to ChatGPT, Gemini, or anyone else.'
  },
  {
    id: 'same-api',
    icon: 'api',
    title: 'Speaks the same language apps already use',
    text: 'The server answers questions in the exact same format ChatGPT does. So any app that already knows how to talk to ChatGPT can talk to this instead, without changing a line of its own code.'
  },
  {
    id: 'docker-packed',
    icon: 'inventory_2',
    title: 'The whole thing starts or stops with one command',
    text: 'I packed the model, the server, and everything it needs into Docker. That means the whole setup can be started, stopped, or moved to a different machine without reinstalling anything by hand.'
  },
  {
    id: 'gpu-tuning',
    icon: 'tune',
    title: 'Tuned to fit the hardware it runs on',
    text: 'The model is large and the GPU memory is not, so I tuned exactly how much of it runs on the graphics card to get fast answers without the server crashing.'
  },
  {
    id: 'reverse-proxy',
    icon: 'security',
    title: 'Sits behind its own doorman',
    text: 'A reverse proxy sits in front of the server, so it only answers requests it trusts instead of being wide open to anything on the network.'
  },
  {
    id: 'speech-to-text',
    icon: 'mic',
    title: 'Understands speech too, not just typed text',
    text: 'I added whisper.cpp, an open-source speech-to-text model, running locally right next to the language model. So the same server can turn someone talking into text and then answer it, all without sending audio anywhere else.'
  }
]

export const finaleLine = [
  'One server, one model, no outside company in between.',
  'If I can stand this one up, I can stand up any of them.'
]

export const heroImage = '/images/llm-server/hero.svg'
