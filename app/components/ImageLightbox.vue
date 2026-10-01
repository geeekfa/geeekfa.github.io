<script setup lang="ts">
defineProps<{ src: string; caption?: string }>()
const open = defineModel<boolean>({ default: false })
</script>

<template>
  <q-dialog v-model="open" maximized transition-show="fade" transition-hide="fade">
    <div class="pf-lightbox" @click="open = false">
      <q-btn round flat icon="close" color="white" class="pf-lightbox__close" @click.stop="open = false" />
      <q-img :src="src" fit="contain" class="pf-lightbox__img" @click.stop />
      <div v-if="caption" class="pf-lightbox__caption">{{ caption }}</div>
    </div>
  </q-dialog>
</template>

<style scoped lang="scss">
/* why-no-Quasar: a full-viewport dark scrim for a zoomed screenshot; q-dialog's own
   maximized mode has no built-in scrim/caption layout */
.pf-lightbox {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  cursor: zoom-out;

  &__close {
    position: absolute;
    top: 16px;
    right: 16px;
  }

  &__img {
    max-width: 100%;
    max-height: calc(100vh - 140px);
    cursor: default;
  }

  &__caption {
    color: #fff;
    opacity: 0.8;
    font-size: 14px;
    margin-top: 16px;
    max-width: 70ch;
    text-align: center;
  }
}
</style>
