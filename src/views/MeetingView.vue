<template>
  <Lnb class="hidden lg:block" />
  <Gnb />
  <main>
    <div class="home-meeting-bg" />
    <div class="home-main pt-12">
      <RouterView />
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Lnb from '@/components/frame/LnbFrame.vue'
import Gnb from '@/components/frame/GnbFrame.vue'
</script>
