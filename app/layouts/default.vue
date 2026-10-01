<script setup lang="ts">
import { useQuasar } from 'quasar'

const $q = useQuasar()
const drawer = ref(false)

const links = [
  { label: 'About', to: '/about' },
  { label: 'Resume', href: '/resume.pdf' }
]
</script>

<template>
  <q-layout view="hHh lpR fff">
    <q-header class="pf-header pf-glass">
      <q-toolbar class="pf-container pf-toolbar">
        <NuxtLink to="/" class="pf-hex pf-logo" aria-label="Salman Majidi, home">SM</NuxtLink>
        <q-space />
        <div class="gt-sm row items-center q-gutter-x-xs">
          <q-btn
            v-for="l in links"
            :key="l.label"
            flat
            no-caps
            class="pf-btn"
            :label="l.label"
            :to="l.to"
            :href="l.href"
            :target="l.href ? '_blank' : undefined"
          />
        </div>
        <q-btn
          flat
          round
          dense
          class="q-ml-sm"
          :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
          aria-label="Toggle theme"
          @click="$q.dark.toggle()"
        />
        <q-btn flat round dense class="lt-md q-ml-xs" icon="menu" aria-label="Open menu" @click="drawer = true" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" side="right" overlay behavior="mobile" class="pf-glass">
      <q-list padding>
        <q-item
          v-for="l in links"
          :key="l.label"
          clickable
          :to="l.to"
          :href="l.href"
          :target="l.href ? '_blank' : undefined"
          @click="drawer = false"
        >
          <q-item-section>{{ l.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <slot />
    </q-page-container>

    <q-footer class="pf-footer">
      <div class="pf-container row items-center justify-between q-py-lg text-caption pf-muted">
        <span>© 2026 Salman Majidi · Atlanta, GA</span>
        <span class="pf-mono">built with Nuxt + Quasar</span>
      </div>
    </q-footer>
  </q-layout>
</template>

<style scoped lang="scss">
/* why-no-Quasar: glass header needs transparent background over the hero gradient */
.pf-header {
  color: var(--pf-text);
  border-width: 0;
  border-radius: 0;
  box-shadow: var(--pf-header-shadow);
}

.pf-footer {
  background: transparent;
  border-top: 1px solid var(--pf-line);
}

/* why-no-Quasar: hexagon monogram built on the shared .pf-hex shape */
.pf-logo {
  width: 36px;
  height: 40px;
  background: var(--pf-text);
  color: var(--pf-bg);
  font-family: var(--pf-display);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-decoration: none;
}

.pf-toolbar {
  min-height: var(--pf-header-h);
}
</style>
