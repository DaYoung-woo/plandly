<template>
  <div class="pt-10 text-center">
    <h5 class="text-2xl text-left">투표</h5>
    <div class="mt-5 p-5 border vote-box">
      <div class="flex justify-between">
        <h4 class="text-xl text-left">투표 타이틀</h4>
        <button class="border px-2 py-1">수정</button>
      </div>

      <VoteOption />
      <VoteOption />
      <VoteOption />
    </div>

    <div class="mt-5 p-5 border vote-box">
      <div class="flex justify-between">
        <h4 class="text-xl text-left">투표 타이틀</h4>
        <button class="border px-2 py-1">수정</button>
      </div>

      <VoteOption />
    </div>

    <button class="border px-5 py-2 mt-5">투표 더보기</button>
  </div> 
</template>
    
<script setup lang='ts'>
  import VoteOption from './VoteOption.vue';
</script>
    
