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

const current = computed(() => props.steps.find((s) => s.id === slide.value))
</script>

<template>
  <div class="pf-carousel" :style="{ '--c': accent }">
    <q-carousel
      v-model="slide"
      animated
      swipeable
      infinite
      :arrows="steps.length > 1"
      transition-prev="fade"
      transition-next="fade"
      height="380px"
      class="pf-carousel__frame rounded-borders"
      control-color="white"
    >
      <q-carousel-slide v-for="s in steps" :key="s.id" :name="s.id" class="q-pa-none">
        <q-img :src="s.image" class="fit" :ratio="16 / 9" fit="contain" />
      </q-carousel-slide>
    </q-carousel>

    <div class="pf-carousel__caption">
      <q-icon :name="current?.icon" size="22px" class="pf-carousel__icon" />
      <span class="pf-carousel__step-label">{{ current?.label }}</span>
      <span class="pf-carousel__text">{{ current?.text }}</span>
    </div>

    <div v-if="steps.length > 1" class="pf-carousel__strip">
      <button
        v-for="s in steps"
        :key="s.id"
        type="button"
        class="pf-carousel__step"
        :class="{ 'pf-carousel__step--active': s.id === slide }"
        @click="slide = s.id"
      >
        <q-icon :name="s.icon" size="20px" />
        <span>{{ s.label }}</span>
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
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    column-gap: 10px;
    row-gap: 4px;
    margin-top: 16px;
  }

  &__icon {
    color: var(--c);
    align-self: center;
  }

  &__step-label {
    font-family: var(--pf-display);
    font-weight: 700;
    font-size: 17px;
    color: var(--c);
  }

  &__text {
    font-family: var(--pf-reading);
    font-size: 17px;
    line-height: 1.5;
    color: var(--pf-text);
  }

  &__strip {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 18px;
  }

  &__step {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: var(--pf-font);
    font-size: 12px;
    font-weight: 600;
    padding: 7px 12px;
    border-radius: var(--pf-radius-control);
    border: 1px solid var(--pf-line);
    background: var(--pf-surface);
    color: var(--pf-muted);
    cursor: pointer;
    transition: all 0.15s;

    :deep(.q-icon) {
      color: inherit;
    }

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
