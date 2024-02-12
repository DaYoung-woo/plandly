<template>
  <Lnb class="hidden lg:block" />
  <Gnb />
  <main class="meeting-main">
    <div style="max-width: 1024px; margin: 0 auto">
      <div class="thumb" />
      <RouterView />
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Lnb from '@/components/frame/LnbFrame.vue'
import Gnb from '@/components/frame/GnbFrame.vue'
</script>

<style lang="scss">
main.meeting-main {
  padding-top: 0px;
  .thumb {
    height: 200px;
    background-color: #ddd;
    margin-left: -90px;
    margin-right: -90px;
  }
}
</style>
