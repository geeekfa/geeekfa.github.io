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
      :navigation="steps.length > 1"
      transition-prev="fade"
      transition-next="fade"
      height="380px"
      class="pf-carousel__frame rounded-borders"
      control-color="white"
    >
      <q-carousel-slide v-for="s in steps" :key="s.id" :name="s.id" class="q-pa-none">
        <q-img :src="s.image" class="fit" :ratio="16 / 9" fit="contain" />
      </q-carousel-slide>

      <template #navigation-icon="{ index, active, onClick }">
        <q-btn
          round
          unelevated
          dense
          :size="active ? 'md' : 'sm'"
          :icon="active ? steps[index].icon : undefined"
          class="pf-carousel__dot"
          :class="{ 'pf-carousel__dot--active': active }"
          @click="onClick"
        />
      </template>
    </q-carousel>

    <div class="pf-carousel__caption">
      <q-icon :name="current?.icon" size="22px" class="pf-carousel__icon" />
      <span class="pf-carousel__step-label">{{ current?.label }}</span>
      <span class="pf-carousel__text">{{ current?.text }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pf-carousel {
  &__frame {
    background: var(--pf-surface-2);
  }

  /* why-no-Quasar: prev/next arrows are always white (control-color), which
     disappears on the light theme's pale frame — a dark backdrop keeps them
     visible in both themes regardless of what's under them */
  :deep(.q-carousel__arrow .q-btn) {
    background: rgba(0, 0, 0, 0.45);
  }

  /* why-no-Quasar: q-btn has no "outlined circle vs filled circle with icon" variant built in */
  &__dot {
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.5);
    color: transparent;

    &--active {
      background: var(--c);
      border-color: var(--c);
      color: var(--pf-on-accent);
    }
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
}
</style>
