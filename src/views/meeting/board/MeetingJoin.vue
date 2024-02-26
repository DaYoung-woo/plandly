<template>
  <Lnb class="hidden lg:block" />
  <Gnb />
  <main class="meeting-main">
    <div style="max-width: 1024px; margin: 0 auto">
      <div>모임에 입장하기 위해서 가입이 필요합니다.</div>
    </div>
  </main>
</template>

<script setup lang="ts">
// 프레임
import Lnb from '@/components/frame/LnbFrame.vue'
import Gnb from '@/components/frame/GnbFrame.vue'
</script>

<style></style>
