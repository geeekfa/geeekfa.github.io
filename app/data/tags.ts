import { projects } from './projects'

// Evenly spaced hues; the chip CSS turns each into a soft pastel for both themes.
const hues = [0, 28, 48, 85, 140, 168, 192, 212, 236, 262, 288, 322]

const hueDistance = (a: number, b: number) => {
  const d = Math.abs(a - b) % 360
  return Math.min(d, 360 - d)
}

// Each technology keeps one hue across the whole site, chosen so that it sits
// as far as possible from the chips next to it on every card.
const tagHue = new Map<string, number>()
const usage = new Map<number, number>()

for (const project of projects) {
  project.tags.forEach((tag, i) => {
    if (tagHue.has(tag)) return
    const neighbours = [project.tags[i - 1], project.tags[i + 1], project.tags[i - 2]]
      .map((t) => (t ? tagHue.get(t) : undefined))
      .filter((h): h is number => h !== undefined)

    const score = (h: number) =>
      (neighbours.length ? Math.min(...neighbours.map((n) => hueDistance(h, n))) : 180) - (usage.get(h) ?? 0) * 12

    const best = hues.reduce((a, b) => (score(b) > score(a) ? b : a))
    tagHue.set(tag, best)
    usage.set(best, (usage.get(best) ?? 0) + 1)
  })
}

export const tagHueOf = (tag: string) => tagHue.get(tag) ?? 212
