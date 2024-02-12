<template>
  <Lnb class="hidden lg:block" />
  <Gnb />
  <main>
    <div class="path_navi">
      <IconArrowLeft class="mr-1"/>게시판
    </div>

    <div class="writer">

    </div>
  </main>
</template>
  
<script setup lang='ts'>
  // 프레임
  import Lnb from '@/components/frame/LnbFrame.vue'
  import Gnb from '@/components/frame/GnbFrame.vue'

  // < 아이콘
  import IconArrowLeft from "@/assets/img/common/icon_arrow_left.svg"
</script>
  
<style>
  .path_navi{
    display: flex;
    align-items: center;
    color: #999999;
    font-size: 14px;
  }
  .writer{
    display: flex;
  }
</style>