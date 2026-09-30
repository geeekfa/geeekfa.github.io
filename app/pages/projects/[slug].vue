<script setup lang="ts">
import { projects } from '~/data/projects'
import { skillByKey, skillColor } from '~/data/skills'
import { tireStudioTabs, tireStudioPatterns } from '~/data/tire-studio'
import { techLinks } from '~/data/tech-links'

const route = useRoute()
const project = computed(() => projects.find((p) => p.slug === route.params.slug))
const skill = computed(() => (project.value ? skillByKey(project.value.skill) : undefined))

const tab = ref(tireStudioTabs[0]?.id)
</script>

<template>
  <q-page v-if="project">
    <section class="pf-container q-pt-lg">
      <q-btn flat no-caps class="pf-btn q-mb-md" icon="arrow_back" label="All projects" to="/#projects" />

      <div class="pf-hero pf-dark-panel" :style="{ '--c': skillColor(project.skill) }">
        <q-img src="/images/tire-studio/hero.svg" class="pf-hero__img" :ratio="16 / 9" />
        <div class="pf-hero__body column q-gutter-y-sm">
          <div class="row items-center q-gutter-x-sm">
            <div class="pf-hex pf-hex--tint">
              <q-icon :name="skill?.icon" size="20px" />
            </div>
            <div class="text-overline pf-muted">{{ skill?.label }}</div>
          </div>
          <h1 class="pf-hero__title q-my-none">{{ project.name }}</h1>
          <p class="pf-hero__summary q-mb-none">{{ project.summary }}</p>
          <div class="pf-tags">
            <q-chip v-for="t in project.tags" :key="t" dense class="pf-tag" :label="t" />
          </div>
        </div>
      </div>
    </section>

    <section class="pf-container q-py-xl">
      <div class="text-h5 text-weight-bold q-mb-md">Why this exists</div>
      <div class="pf-reading pf-muted column q-gutter-y-md q-mb-xl" style="max-width: 74ch">
        <p class="q-my-none">
          Most tire shops and wholesalers don't have good photos of what they sell — sometimes no photo at all.
          A customer browsing online has no real idea what the tire looks like before they buy it.
        </p>
        <p class="q-my-none">
          The honest fix — photograph every single size, in a real studio, with proper lighting and retouching —
          would take months or years and cost a fortune. A tire line can have dozens of sizes, and a real
          production-quality photo needs real studio work, not a quick snapshot.
        </p>
        <p class="q-my-none">
          So instead of photographing every size, this tool needs only <strong>two</strong> reference photos of
          one tire model — front and sidewall — and generates studio-quality catalog images for every size in
          that line automatically: front, sidewall, and a 45° angle shot. What used to be impossible to afford
          becomes a few hours of work.
        </p>
      </div>

      <div class="text-h5 text-weight-bold q-mb-md">How it works</div>
      <p class="pf-reading pf-muted q-mb-xl" style="max-width: 74ch">
        A Photoshop-like internal tool that turns two reference photos — one straight-on, one of the sidewall
        — into correct, standardized catalog images for every size in that tire model's line: front, sidewall
        and 45° angle, instead of photographing every single size by hand.
      </p>

      <q-tabs v-model="tab" class="pf-tabs" active-color="primary" indicator-color="primary" dense no-caps align="left">
        <q-tab v-for="t in tireStudioTabs" :key="t.id" :name="t.id" :icon="t.icon" :label="t.label" />
      </q-tabs>
      <q-separator class="q-mb-lg" />

      <q-tab-panels v-model="tab" animated class="pf-panels">
        <q-tab-panel v-for="t in tireStudioTabs" :key="t.id" :name="t.id" class="q-pa-none">
          <p class="pf-reading pf-muted q-mb-lg" style="max-width: 74ch">{{ t.summary }}</p>
          <StudioStepCarousel :steps="t.steps" :accent="skillColor(project.skill)" />
        </q-tab-panel>
      </q-tab-panels>
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

.pf-tabs {
  color: var(--pf-muted);
}

.pf-highlight-list {
  .q-item {
    min-height: unset;
    padding-top: 6px;
    padding-bottom: 6px;
  }
}
</style>
