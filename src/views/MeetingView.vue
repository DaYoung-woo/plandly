<template>
  <Lnb class="hidden lg:block" />
  <Gnb />
  <main class="meeting-main">
    <div class="thumb"></div>
    <RouterView/>
  </main>
</template>
    
<script setup lang='ts'>
  import { RouterView } from 'vue-router'
  import Lnb from '@/components/frame/LnbFrame.vue'
import Gnb from '@/components/frame/GnbFrame.vue'
</script>
    
<style lang="scss">
  main.meeting-main{
    padding-top: 0px;
    .thumb{
      height: 200px;
      background-color: #ddd;
      margin-left: -90px;
      margin-right: -90px;
    }

  }
</style>