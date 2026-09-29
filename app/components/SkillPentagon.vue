<script setup lang="ts">
import { skills, skillColor } from '~/data/skills'

const cx = 50
const cy = 53
const R = 34

const point = (i: number, radius: number) => {
  const a = ((-90 + 72 * i) * Math.PI) / 180
  return { x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a) }
}

const polygon = (radius: number) =>
  skills.map((_, i) => point(i, radius)).map((p) => `${p.x},${p.y}`).join(' ')

const vertices = skills.map((s, i) => ({ ...s, ...point(i, R) }))
</script>

<template>
  <div class="pf-penta">
    <svg viewBox="0 0 100 100" class="pf-penta__svg" aria-hidden="true">
      <polygon :points="polygon(R)" class="pf-penta__outer" />
      <polygon :points="polygon(R * 0.55)" class="pf-penta__inner" />
      <line v-for="v in vertices" :key="v.key" :x1="cx" :y1="cy" :x2="v.x" :y2="v.y" class="pf-penta__spoke" />
    </svg>

    <div
      v-for="v in vertices"
      :key="v.key"
      class="pf-penta__node column items-center"
      :style="{ left: `${v.x}%`, top: `${v.y}%`, '--c': skillColor(v.key) }"
    >
      <div class="pf-hex pf-hex--tint pf-hex--outlined pf-penta__hex">
        <q-icon :name="v.icon" class="pf-penta__icon" />
      </div>
      <span class="pf-penta__label text-weight-medium">{{ v.label }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* why-no-Quasar: radial pentagon diagram; nodes are positioned on computed SVG vertices */
.pf-penta {
  position: relative;
  width: 100%;
  --hex-w: clamp(44px, 12vw, 58px);
  --hex-h: calc(var(--hex-w) * 1.1);
  max-width: 460px;
  aspect-ratio: 1;
  margin-inline: auto;

  &__hex {
    width: var(--hex-w);
    height: var(--hex-h);
  }

  &__icon {
    font-size: calc(var(--hex-w) * 0.5);
  }

  &__svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;

    polygon,
    line {
      fill: none;
      vector-effect: non-scaling-stroke;
    }
  }

  &__outer {
    stroke: var(--pf-muted);
    stroke-opacity: 0.35;
    stroke-width: 1.5;
  }

  &__inner {
    stroke: var(--pf-muted);
    stroke-opacity: 0.2;
    stroke-dasharray: 3 4;
  }

  &__spoke {
    stroke: var(--pf-muted);
    stroke-opacity: 0.15;
  }

  &__node {
    position: absolute;
    transform: translate(-50%, calc(var(--hex-h) / -2));
    gap: 6px;
  }

  &__label {
    font-size: 15px;
    white-space: nowrap;
    padding: 2px 8px;
    border-radius: var(--pf-radius-control);
    background: var(--pf-glass-bg);
  }
}
</style>
