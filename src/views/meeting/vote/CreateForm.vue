<template>
  <!-- 페이지 네비게이션 -->
  <router-link :to="`/meeting/${meetingNo}`" class="path_navi mt-10">
    <IconArrowLeft class="mr-1" />투표
  </router-link>

  <!-- 작성자 정보 -->
  <div class="mt-8 mb-4">
    <h2>새 투표 작성하기</h2>
  </div>

  <!-- 게시판 폼 -->
  <form action="">
    <input
      type="text"
      class="w-full outline-none p-2 mb-8"
      placeholder="어떤 투표인지 설명해주세요"
      style="border-bottom: 1px solid #ddd"
    />

    <label class="form-label mb-3">투표명</label>
    <input type="text" class="form-inputs w-full" placeholder="투표명 작성" />

    <label class="form-label mb-3 mt-12">선택지 입력</label>
    <div class="flex">
      <input type="checkbox" id="text" /> <label for="text">텍스트</label>
      <input type="checkbox" id="date" /> <label for="date">날짜</label>
      <input type="checkbox" id="location" /><label for="location">장소</label>
    </div>
  </form>
</template>

<script setup lang="ts">
// < 아이콘
import IconArrowLeft from '@/assets/img/common/icon_arrow_left.svg'

// 라우터
import { useRoute } from 'vue-router'
const route = useRoute()

// param
const meetingNo = route.params.meetingNo as string
</script>
