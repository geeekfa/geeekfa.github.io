<script setup lang="ts">
import { projects } from '~/data/projects'
</script>

<template>
  <q-page>
    <section class="pf-container q-pt-lg">
      <div class="pf-hero pf-dark-panel">
        <div class="pf-hero__glow" aria-hidden="true" />
        <div class="row items-center q-col-gutter-xl pf-hero__content">
          <div class="col-12 col-md-6 column q-gutter-y-lg">
            <div>
              <h1 class="pf-hero__name q-my-none">Salman Majidi</h1>
              <div class="pf-hero__role">Full-Stack &amp; AI Engineer</div>
              <div class="pf-hero__location pf-glass pf-mono q-mt-md">
                <q-icon name="place" size="16px" />
                <span>Atlanta, Georgia</span>
              </div>
            </div>

            <p class="pf-hero__lede q-mb-none">
              10+ years building software that business teams use every day. Backend, web, mobile, and the AI inside
              them.
            </p>

            <div class="row q-gutter-sm q-pt-sm">
              <q-btn unelevated no-caps class="pf-btn pf-btn--solid" label="Resume" icon="description" />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <SkillPentagon />
          </div>
        </div>
      </div>
    </section>

    <section id="projects" class="pf-container q-py-xl">
      <div class="text-h5 text-weight-bold q-mb-lg">Projects</div>
      <div class="column q-gutter-y-lg">
        <ProjectCard v-for="p in projects" :key="p.slug" :project="p" />
      </div>
    </section>
  </q-page>
</template>

<style scoped lang="scss">
#projects {
  scroll-margin-top: var(--pf-header-h);
}

/* why-no-Quasar: dark rounded hero panel with a soft light spot behind the pentagon */
.pf-hero {
  position: relative;
  overflow: hidden;
  border-radius: var(--pf-radius-card);
  padding: 56px;

  @media (max-width: 599px) {
    padding: 28px 20px;
  }

  &__glow {
    position: absolute;
    right: -10%;
    top: -20%;
    width: 60%;
    height: 140%;
    background: radial-gradient(closest-side, rgba(255, 255, 255, 0.07), transparent);
  }

  &__content {
    position: relative;
  }

  &__name {
    font-family: var(--pf-display);
    font-size: clamp(30px, 4vw, 46px);
    line-height: 1.1;
    font-weight: 600;
    letter-spacing: 0.04em;
  }

  &__role {
    margin-top: 8px;
    font-size: clamp(18px, 2.2vw, 22px);
    font-weight: 500;
    color: var(--pf-muted);
  }

  &__location {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: var(--pf-radius-control);
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--pf-text);
  }

  &__lede {
    font-size: clamp(18px, 1.8vw, 21px);
    line-height: 1.55;
    font-weight: 500;
    max-width: 40ch;
    color: var(--pf-text);
  }
}
</style>
