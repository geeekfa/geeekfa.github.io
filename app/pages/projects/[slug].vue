<script setup lang="ts">
import { projects } from '~/data/projects'
import { skillByKey, skillColor } from '~/data/skills'
import { tagHueOf } from '~/data/tags'
import { tireStudioTabs, tireStudioPatterns } from '~/data/tire-studio'
import { techLinks } from '~/data/tech-links'

const route = useRoute()
const project = computed(() => projects.find((p) => p.slug === route.params.slug))
const skill = computed(() => (project.value ? skillByKey(project.value.skill) : undefined))

const whyPoints = [
  {
    icon: 'visibility_off',
    color: 'var(--pf-infra)',
    title: 'The problem',
    text: 'Most tire shops and wholesalers have no good photos of what they sell — some have none at all. A shopper online has no real idea what the tire looks like before buying it.'
  },
  {
    icon: 'schedule',
    color: 'var(--pf-mobile)',
    title: 'The honest fix costs too much',
    text: 'Photographing every size in a real studio, done right, takes months and a serious budget — a line can have dozens of sizes, and catalog-grade photos need real studio work, not a snapshot.'
  },
  {
    icon: 'bolt',
    color: 'var(--pf-ai)',
    title: 'What I built instead',
    text: 'Feed it just two reference photos of one tire model — front and sidewall — and it generates studio-quality catalog images for every size in that line automatically. Months of studio work, down to hours.'
  }
]
</script>

<template>
  <q-page v-if="project">
    <section class="pf-container q-pt-lg">
      <q-btn flat no-caps class="pf-btn q-mb-md" icon="arrow_back" label="All projects" to="/#projects" />

      <div class="pf-hero pf-dark-panel" :style="{ '--c': skillColor(project.skill) }">
        <q-img src="/images/tire-studio/hero.svg" class="pf-hero__img" :ratio="16 / 9" fit="contain" />
        <div class="pf-hero__body column q-gutter-y-sm">
          <div class="row items-center q-gutter-x-sm">
            <div class="pf-hex pf-hex--tint">
              <q-icon :name="skill?.icon" size="20px" />
            </div>
            <div class="text-overline pf-muted">{{ skill?.label }}</div>
          </div>
          <h1 class="pf-hero__title q-my-none">{{ project.name }}</h1>
          <p class="pf-hero__summary q-mb-none">{{ project.summary }}</p>
          <div class="pf-tags pf-tags--lg">
            <q-chip v-for="t in project.tags" :key="t" class="pf-tag pf-tag--lg" :style="{ '--h': tagHueOf(t) }" :label="t" />
          </div>
        </div>
      </div>
    </section>

    <section class="pf-container q-py-xl">
      <div class="pf-why">
        <div v-for="w in whyPoints" :key="w.title" class="pf-why__card" :style="{ '--c': w.color }">
          <q-icon :name="w.icon" size="26px" class="pf-why__icon" />
          <div class="pf-why__title">{{ w.title }}</div>
          <p class="pf-reading pf-why__text q-mb-none">{{ w.text }}</p>
        </div>
      </div>
    </section>

    <section class="pf-container q-pb-md">
      <div class="text-h5 text-weight-bold q-mb-sm">How it works</div>
      <p class="pf-reading pf-muted q-mb-xl" style="max-width: 74ch">
        Two reference photos in, a full catalog out — five stages, each doing one job.
      </p>
    </section>

    <section v-for="t in tireStudioTabs" :key="t.id" class="pf-container q-pb-xl">
      <div class="pf-stage" :style="{ '--c': t.accent }">
        <div class="pf-stage__head row items-center q-gutter-x-sm q-mb-xs">
          <div class="pf-hex pf-hex--tint">
            <q-icon :name="t.icon" size="20px" />
          </div>
          <div class="pf-stage__label">{{ t.label }}</div>
        </div>
        <p class="pf-reading pf-muted pf-stage__summary q-mb-lg">{{ t.summary }}</p>
        <StudioStepCarousel :steps="t.steps" :accent="t.accent" />
      </div>
    </section>

    <section class="pf-container q-py-xl">
      <div class="text-h5 text-weight-bold q-mb-md">What this shows</div>
      <q-list class="pf-highlight-list" style="max-width: 78ch">
        <q-item v-for="(p, i) in tireStudioPatterns" :key="i" class="q-px-none">
          <q-item-section avatar top>
            <q-icon name="check_circle" color="positive" size="18px" />
          </q-item-section>
          <q-item-section class="pf-reading">{{ p }}</q-item-section>
        </q-item>
      </q-list>
    </section>

    <section class="pf-container q-pb-xl">
      <div class="text-h5 text-weight-bold q-mb-md">Tech stack</div>
      <div class="pf-tags">
        <q-chip
          v-for="t in project.tags"
          :key="t"
          :clickable="!!techLinks[t]"
          dense
          class="pf-tag"
          :style="{ '--h': tagHueOf(t) }"
          :label="t"
          :icon-right="techLinks[t] ? 'open_in_new' : undefined"
          @click="techLinks[t] && navigateTo(techLinks[t], { external: true, open: { target: '_blank' } })"
        />
      </div>
    </section>
  </q-page>

  <q-page v-else class="flex flex-center">
    <div class="text-center">
      <div class="text-h6 q-mb-md">Project not found</div>
      <q-btn unelevated no-caps class="pf-btn pf-btn--solid" label="Back to projects" to="/#projects" />
    </div>
  </q-page>
</template>

<style scoped lang="scss">
.pf-hero {
  border-radius: var(--pf-radius-card);
  overflow: hidden;
  padding: 0;

  &__img {
    max-height: 360px;
  }

  &__body {
    padding: 32px 40px 40px;

    @media (max-width: 599px) {
      padding: 24px 20px 28px;
    }
  }

  &__title {
    font-family: var(--pf-display);
    font-size: clamp(28px, 3.6vw, 42px);
    font-weight: 600;
  }

  &__summary {
    font-family: var(--pf-reading);
    font-size: 18px;
    line-height: 1.6;
    max-width: 72ch;
    color: var(--pf-text);
  }
}

/* why-no-Quasar: chip font-size only scales via a size class, not a prop */
.pf-tags--lg .pf-tag--lg {
  font-size: 13px;
  padding: 5px 14px;
}

/* why-no-Quasar: 3-card "why" grid with a coloured top accent per card */
.pf-why {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 899px) {
    grid-template-columns: 1fr;
  }

  &__card {
    position: relative;
    background: var(--pf-surface);
    border: 1px solid var(--pf-line);
    border-radius: var(--pf-radius-card);
    box-shadow: var(--pf-shadow);
    padding: 24px 22px;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: var(--c);
    }
  }

  &__icon {
    color: var(--c);
    margin-bottom: 10px;
  }

  &__title {
    font-family: var(--pf-display);
    font-weight: 700;
    font-size: 17px;
    margin-bottom: 8px;
  }

  &__text {
    font-size: 15px;
    line-height: 1.6;
    color: var(--pf-text);
  }
}

/* why-no-Quasar: each pipeline stage gets a coloured left rail to read as its own section */
.pf-stage {
  border-inline-start: 3px solid var(--c);
  padding-inline-start: 24px;

  @media (max-width: 599px) {
    padding-inline-start: 14px;
  }

  &__label {
    font-family: var(--pf-display);
    font-weight: 700;
    font-size: 22px;
    color: var(--c);
  }

  &__summary {
    max-width: 68ch;
  }
}

.pf-highlight-list {
  .q-item {
    min-height: unset;
    padding-top: 6px;
    padding-bottom: 6px;
  }
}
</style>
