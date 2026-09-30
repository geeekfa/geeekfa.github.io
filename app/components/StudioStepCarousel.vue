<script setup lang="ts">
import type { StudioStep } from '~/data/tire-studio'

const props = defineProps<{ steps: StudioStep[]; accent: string }>()

const slide = ref(props.steps[0]?.id)
watch(
  () => props.steps,
  (steps) => {
    slide.value = steps[0]?.id
  }
)
</script>

<template>
  <div class="pf-carousel">
    <q-carousel
      v-model="slide"
      animated
      swipeable
      infinite
      :arrows="steps.length > 1"
      transition-prev="fade"
      transition-next="fade"
      height="420px"
      class="pf-carousel__frame rounded-borders"
      control-color="white"
      :style="{ '--c': accent }"
    >
      <q-carousel-slide v-for="s in steps" :key="s.id" :name="s.id" class="q-pa-none">
        <q-img :src="s.image" class="fit" :ratio="16 / 9" />
      </q-carousel-slide>
    </q-carousel>

    <div class="pf-carousel__caption" :style="{ '--c': accent }">
      <div class="pf-carousel__step-label">{{ steps.find((s) => s.id === slide)?.label }}</div>
      <p class="pf-reading pf-carousel__text q-mb-none">{{ steps.find((s) => s.id === slide)?.text }}</p>
    </div>

    <div v-if="steps.length > 1" class="pf-carousel__dots">
      <button
        v-for="s in steps"
        :key="s.id"
        type="button"
        class="pf-carousel__dot"
        :class="{ 'pf-carousel__dot--active': s.id === slide }"
        :style="{ '--c': accent }"
        :aria-label="s.label"
        @click="slide = s.id"
      >
        {{ s.label }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pf-carousel {
  &__frame {
    background: var(--pf-surface-2);
  }

  &__caption {
    padding: 20px 4px 4px;
  }

  &__step-label {
    font-family: var(--pf-display);
    font-weight: 700;
    font-size: 18px;
    color: var(--c);
    margin-bottom: 6px;
  }

  &__text {
    font-size: 16px;
    line-height: 1.7;
    color: var(--pf-text);
    max-width: 68ch;
  }

  &__dots {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 16px;
  }

  &__dot {
    font-family: var(--pf-font);
    font-size: 12px;
    font-weight: 600;
    padding: 6px 12px;
    border-radius: var(--pf-radius-control);
    border: 1px solid var(--pf-line);
    background: var(--pf-surface);
    color: var(--pf-muted);
    cursor: pointer;
    transition: all 0.15s;

    &:hover {
      border-color: var(--c);
      color: var(--pf-text);
    }

    &--active {
      background: var(--c);
      border-color: var(--c);
      color: var(--pf-on-accent);
    }
  }
}
</style>
