<template>
  <div class="mt-20 mx-4 flex items-center justify-between">
    <h2>투표</h2>
    <IconMore />
  </div>
  <div class="mt-5 p-5 border vote-box">
    <div class="flex justify-between">
      <h4 class="text-xl text-left">투표 타이틀</h4>
      <span class="font-green-info">7시간 남음</span>
    </div>

    <VoteOption />
    <VoteOption class="mt-5" />
    <VoteOption class="mt-5" />
  </div>
</template>

<script setup lang="ts">
// 더보기 아이콘
import IconMore from '@/assets/img/common/icon_more.svg'
import VoteOption from '@/components/meeting/VoteOption.vue'
</script>
