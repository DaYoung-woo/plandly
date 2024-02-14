<template>
  <!-- 페이지 네비게이션 -->
  <router-link :to="`/meeting/${meetingNo}`" class="path_navi mt-12">
    <IconArrowLeft class="mr-1" />게시판
  </router-link>

  <!-- 작성자 정보 -->
  <div class="flex justify-between items-center mt-8 mb-4">
    <MemberProfile />
    <IconMore fill="#cdcdcd" />
  </div>
  <hr />

  <!-- 게시판 폼 -->
  <article class="mt-10 mb-6">
    <h3 class="mb-6">디자인 요소로 이런거 어때요?ㅎㅎ</h3>
    <span style="font-size: 14px">
      조사를 한번 해봤는데 카드를 배치하면 너무 예쁘더라구요ㅎㅎ<br />
      색깔도 이렇게 진한 색으로 하면 너무 좋을 것 같아요<br />
      제가 올려드린 자료 보시면<br />
      이렇게 요소가 있는데 버튼 모양을 베껴오면 좋을거같아요<br />
    </span>
  </article>
  <hr />

  <div class="comment-area">
    <div class="title">댓글 3</div>
    <div class="flex items-center mt-2">
      <input type="text" class="border" />
      <button class="green-outline-btn py-2 px-6 ml-2">추가</button>
    </div>

    <div class="comment">
      <div class="user">
        <p>우다영</p>
        <span>7시간 전</span>
      </div>
      <div>와! 자료가 너무 예뻐요!</div>
    </div>
    <hr />
    <div class="comment">
      <div class="user">
        <p>우다영</p>
        <span>7시간 전</span>
      </div>
      <div>와! 자료가 너무 예뻐요!</div>
    </div>
    <hr />
  </div>
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
