<script setup lang="ts">
import { projects } from '~/data/projects'
import { skillByKey, skillColor } from '~/data/skills'
import { tagHueOf } from '~/data/tags'
import { techLinks } from '~/data/tech-links'
import type { StudioTab } from '~/data/projects/tire-studio'

interface ProjectContent {
  tabs: StudioTab[]
  whyPoints: { icon: string; color: string; title: string; text: string }[]
  finaleLine: string[]
}

const contentRegistry: Record<string, () => Promise<ProjectContent>> = {
  'tire-studio': async () => {
    const m = await import('~/data/projects/tire-studio')
    return { tabs: m.tireStudioTabs, whyPoints: m.whyPoints, finaleLine: m.finaleLine }
  },
  'bts-notes': async () => {
    const m = await import('~/data/projects/bts-notes')
    return { tabs: m.btsNotesTabs, whyPoints: m.whyPoints, finaleLine: m.finaleLine }
  }
}

const route = useRoute()
const project = computed(() => projects.find((p) => p.slug === route.params.slug))
const skill = computed(() => (project.value ? skillByKey(project.value.skill) : undefined))

const content = ref<ProjectContent>()
watchEffect(async () => {
  const slug = route.params.slug as string
  const loader = contentRegistry[slug]
  content.value = loader ? await loader() : undefined
})

const tabs = computed(() => content.value?.tabs ?? [])
const whyPoints = computed(() => content.value?.whyPoints ?? [])
const finaleLine = computed(() => content.value?.finaleLine ?? [])
const found = computed(() => !!project.value && !!content.value)
</script>

<template>
  <q-page v-if="found">
    <section class="pf-container q-pt-lg">
      <q-btn flat no-caps class="pf-btn q-mb-md" icon="arrow_back" label="All projects" to="/#projects" />

      <div class="pf-hero pf-dark-panel" :style="{ '--c': skillColor(project.skill) }">
        <q-img :src="`/images/${project.slug}/hero.png`" class="pf-hero__img" :ratio="16 / 9" fit="contain" />
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

    <section v-for="t in tabs" :key="t.id" class="pf-container q-pb-xl">
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

    <section class="pf-container q-pb-xl">
      <div class="pf-finale">
        <div class="pf-finale__dots" aria-hidden="true">
          <span v-for="t in tabs" :key="t.id" class="pf-finale__dot" :style="{ '--c': t.accent }" />
        </div>
        <p class="pf-finale__quote">
          <template v-for="(line, i) in finaleLine" :key="i">
            {{ line }}<br v-if="i < finaleLine.length - 1" />
          </template>
        </p>
        <q-btn
          unelevated
          no-caps
          class="pf-btn pf-btn--solid"
          label="Back to all projects"
          icon-right="arrow_forward"
          to="/#projects"
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

/* why-no-Quasar: a quiet, centered closing moment — a decorative row of the
   same 5 stage colours used throughout the page, then one pull-quote line */
.pf-finale {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px 16px 8px;

  &__dots {
    display: flex;
    gap: 10px;
    margin-bottom: 28px;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--c);
  }

  &__quote {
    font-family: var(--pf-display);
    font-weight: 600;
    font-size: clamp(22px, 3.4vw, 34px);
    line-height: 1.45;
    letter-spacing: -0.01em;
    max-width: 22ch;
    margin: 0 0 32px;
    color: var(--pf-text);
  }
}
</style>
