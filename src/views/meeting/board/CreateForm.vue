<template>
  <!-- 페이지 네비게이션 -->
  <router-link :to="`/meeting/${meetingNo}`" class="path_navi mt-10">
    <IconArrowLeft class="mr-1" />게시판
  </router-link>

  <!-- 작성자 정보 -->
  <div class="flex justify-between items-center mt-8 mb-4">
    <MemberProfile />
    <IconMore fill="#cdcdcd" />
  </div>
  <hr />

  <!-- 게시판 폼 -->
  <form action=""></form>
</template>

<script setup lang="ts">
// 멤버프로필 컴포넌트
import MemberProfile from '@/components/common/MemberProfile.vue'

// < 아이콘
import IconArrowLeft from '@/assets/img/common/icon_arrow_left.svg'
// 더보기 아이콘
import IconMore from '@/assets/img/common/icon_more.svg'

// 라우터
import { useRoute } from 'vue-router'
const route = useRoute()

// param
const meetingNo = route.params.meetingNo as string
</script>
