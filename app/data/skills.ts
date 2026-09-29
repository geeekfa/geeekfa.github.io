export type SkillKey = 'ai' | 'backend' | 'mobile' | 'web' | 'infra'

export interface Skill {
  key: SkillKey
  label: string
  icon: string
}

export const skills: Skill[] = [
  { key: 'ai', label: 'AI / LLM', icon: 'auto_awesome' },
  { key: 'backend', label: 'Backend', icon: 'dns' },
  { key: 'mobile', label: 'Mobile', icon: 'smartphone' },
  { key: 'web', label: 'Web', icon: 'web' },
  { key: 'infra', label: 'Infrastructure', icon: 'cloud' }
]

export const skillColor = (key: SkillKey) => `var(--pf-${key})`

export const skillByKey = (key: SkillKey) => skills.find((s) => s.key === key)!
