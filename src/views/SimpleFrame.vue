<template>
  <Lnb class="hidden lg:block" />
  <Gnb />
  <main class="meeting-main">
    <div style="max-width: 1024px; margin: 0 auto">
      <RouterView />
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Lnb from '@/components/frame/LnbFrame.vue'
import Gnb from '@/components/frame/GnbFrame.vue'
</script>
