<template>
    <h5 class="pt-10 text-2xl text-left">투표</h5>
    <div class="mt-5 p-5 border vote-box">
      <div class="flex justify-between">
        <h4 class="text-xl text-left">투표 타이틀</h4>
        <button class="border px-2 py-1">수정</button>
      </div>

      <VoteOption />
      <VoteOption class="mt-5"/>
      <VoteOption class="mt-5"/>
    </div>

    <div class="mt-5 p-5 border vote-box">
      <div class="flex justify-between">
        <h4 class="text-xl text-left">투표 타이틀</h4>
        <button class="border px-2 py-1">수정</button>
      </div>

      <VoteOption />
    </div>
</template>
    
<script setup lang='ts'>
  import VoteOption from '@/components/meeting/VoteOption.vue';
</script>
    
