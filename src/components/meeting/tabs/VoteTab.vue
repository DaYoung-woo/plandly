<template>
  <div>
    
    <div class="mt-5 p-5 border vote-box">
      <h5 class="font-bold pb-3">투표타이틀</h5>
      <VoteOption :checkbox="true" class="mt-2 mb-2"/>
      <VoteOption :checkbox="true"/>
      <VoteOption :checkbox="true"/>
      <VoteOption :checkbox="true"/>
      <div class="board-item"> 
        <div class="detail">
          <div class="inline-block h-8 w-8 rounded-full ring-2 ring-slate-200 bg-slate-200 flex items-center text-center mr-2">작성자</div>
          <span class="bg-slate-200 flex items-center px-2 mr-2">작성자 닉네임</span>
          <span class="bg-slate-200 flex items-center px-2 mr-2">7시간 전</span>
          <span class="bg-slate-200 flex items-center px-2">댓글 20개</span>
        </div>
      </div>
    </div>
   
    <div class="mt-5 p-5 border vote-box">
      <h5 class="font-bold pb-3">투표타이틀</h5>
      <VoteOption :checkbox="true" class="mt-2 mb-2"/>
      <VoteOption :checkbox="true"/>
      <div class="board-item"> 
        <div class="detail">
          <div class="inline-block h-8 w-8 rounded-full ring-2 ring-slate-200 bg-slate-200 flex items-center text-center mr-2">작성자</div>
          <span class="bg-slate-200 flex items-center px-2 mr-2">작성자 닉네임</span>
          <span class="bg-slate-200 flex items-center px-2 mr-2">7시간 전</span>
          <span class="bg-slate-200 flex items-center px-2">댓글 20개</span>
        </div>
      </div>
    </div>

    <div class="mt-5 p-5 border vote-box">
      <h5 class="font-bold pb-3">투표타이틀</h5>
      <VoteOption :checkbox="false" class="mt-2 mb-2"/>
      <VoteOption :checkbox="false"/>
      <VoteOption :checkbox="false"/>
      <div class="board-item"> 
        <div class="detail">
          <div class="inline-block h-8 w-8 rounded-full ring-2 ring-slate-200 bg-slate-200 flex items-center text-center mr-2">작성자</div>
          <span class="bg-slate-200 flex items-center px-2 mr-2">작성자 닉네임</span>
          <span class="bg-slate-200 flex items-center px-2 mr-2">7시간 전</span>
          <span class="bg-slate-200 flex items-center px-2">댓글 20개</span>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script setup lang='ts'>
    import VoteOption from '@/components/meeting/VoteOption.vue';
</script>
    
<style>
    
</style>