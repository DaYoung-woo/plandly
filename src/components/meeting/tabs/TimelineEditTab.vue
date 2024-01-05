<template>
  <div>
    <p class="pt-5 font-bold text-lg">새 게시글 생성</p>

    <div class="pt-8">
      <label class="text-sm font-bold">게시글 제목</label>
      <input type="text" class="border border-slate-300 w-full mt-1" />
    </div>
    <div class="pt-5">
      <label class="text-sm font-bold">내용</label>
      <textarea class="border border-slate-300 w-full mt-1 h-80" />
    </div>

    <div class="py-5">
      <label class="text-sm font-bold">이미지 첨부</label>
      <div class="flex pt-1">
        <input type="text" class="border border-slate-300 w-10/12 mr-2" placeholder="이미지" />
        <button class="border border-slate-300 text-sm w-2/12">이미지 불러오기</button>
      </div>
    </div>

    <button class="border border-slate-300 text-sm w-2/12 py-2">게시글 생성</button>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
