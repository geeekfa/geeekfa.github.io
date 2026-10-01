import type { SkillKey } from './skills'

export interface Project {
  slug: string
  name: string
  summary: string
  skill: SkillKey
  tags: string[]
}

// First draft, from the three resumes, the research notes and each repo's dependency files. To be refined with Salman.
// Ordered so that neighbouring projects have different skill colours.
export const projects: Project[] = [
  {
    slug: 'tire-studio',
    name: 'Tire Studio',
    summary:
      'A Photoshop-like internal tool that turns raw warehouse tire photos into catalog-ready product images, combining Blender rendering with AI image generation.',
    skill: 'ai',
    tags: [
      'Python',
      'ComfyUI',
      'FLUX.2 Klein',
      'FireRed Image Edit',
      'Qwen Image Edit',
      'Nano Banana',
      'OpenCV',
      'Blender',
      'Nuxt.js',
      'Quasar'
    ]
  },
  {
    slug: 'bts-notes',
    name: 'BTS Notes',
    summary:
      'One Flutter app every department uses to record their work: sales, HR, warranty, and more. Each team gets its own questions, built from a database instead of hardcoded screens.',
    skill: 'mobile',
    tags: ['Flutter', 'Dart', 'iOS', 'Android', 'sqflite', 'Offline sync', 'Barcode scanning']
  },
  {
    slug: 'bts-ai',
    name: 'BTS AI',
    summary:
      'Chat-based analytics for managers. They ask plain-English questions about field-visit data instead of digging through spreadsheets, and search company policies the same way.',
    skill: 'ai',
    tags: ['Python', 'FastAPI', 'OpenAI', 'LLM agents', 'RAG', 'pgvector', 'PostgreSQL', 'Celery', 'Redis', 'Nuxt.js']
  },
  {
    slug: 'agm-office',
    name: 'AGM Office',
    summary:
      'Project-management tool for a promotional products company, covering cost tracking, approval and billing, with role-based access.',
    skill: 'web',
    tags: ['Nuxt.js', 'Vue', 'PHP', 'SQL Server', 'Monday.com API']
  },
  {
    slug: 'callscribe',
    name: 'CallScribe',
    summary:
      'A daily pipeline that transcribes customer-service calls, tells speakers apart, fixes industry terms like tire sizes, and scores each call against the training checklist.',
    skill: 'ai',
    tags: ['Python', 'FastAPI', 'whisper.cpp', 'Speaker diarization', 'OpenAI', 'SSE', 'SQL Server', 'Nuxt.js']
  },
  {
    slug: 'fs-phone-screen',
    name: 'FS Phone Screen',
    summary:
      "Shows the caller's CRM record on an agent's screen the moment a call comes in, pushed from the backend to a small Windows app.",
    skill: 'backend',
    tags: ['Python', 'FastAPI', 'WebSocket', 'JWT', 'SQL Server', 'CustomTkinter', 'GitHub Actions']
  },
  {
    slug: 'fs-tire-inventory',
    name: 'FS Tire Inventory',
    summary:
      'Counts tires and reads their labels from a phone video of a warehouse shelf. Two OCR engines cross-check each other, and unsure readings go to a person.',
    skill: 'ai',
    tags: ['Python', 'FastAPI', 'YOLO', 'PyTorch', 'OpenCV', 'PaddleOCR-VL', 'Qwen3-VL', 'SAM 3']
  },
  {
    slug: 'llm-server',
    name: 'LLM Server',
    summary:
      'A self-hosted 27B-parameter language model on a dedicated GPU, served through a private OpenAI-compatible API behind a reverse proxy.',
    skill: 'infra',
    tags: ['llama.cpp', 'Qwen3', 'GPU tuning', 'Docker Compose', 'Nginx']
  },
  {
    slug: 'telegram-bot',
    name: 'B2B Ordering Bot',
    summary:
      'Telegram bot that lets approved business customers search tire stock and add items to a cart right from any chat, using inline mode.',
    skill: 'backend',
    tags: ['Python', 'Telegram Bot API', 'SQL Server', 'Stored procedures']
  }
]
