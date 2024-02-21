<template>
  <div class="mt-20 mx-4 flex items-center justify-between">
    <h2>게시판</h2>
    <IconMore class="rotate-180" @click="moveVoteList"/>
  </div>

  <!-- 게시글이 없는 경우 -->
  <div class="no-data-box mt-5 py-12" v-if="!boardList.length">
    생성된 게시글이 없습니다. 게시글을 생성해보세요!
    <router-link :to="`/meeting/${meetingNo}/board/0`">
      <button class="rounded-full bg-main text-white ml-3 px-6 py-2 text-sm mt-4">게시글 추가</button>
    </router-link>
  </div>

  <!-- 게시글이 있는 경우 -->
  <div class="mt-5 p-5 board-box" v-else>
    <div class="board-area">
      <div>
        <h4>공지 타이틀</h4>
        <span> 조사를 한번 해봤는데 카드를 배치하면 너무 예쁘더라구요ㅎㅎ </span>
      </div>
      <div class="img"></div>
    </div>
    <div class="user-area">
      <div class="user-info">
        <div class="profile"></div>
        <div class="text ml-1">
          <p>이준아</p>
          <span>16시간 전</span>
        </div>
      </div>
      <button class="chat-btn mt-2"><IconChat /> <span>0</span></button>
    </div>
  </div>
</template>

<script setup lang="ts">
// 더보기 아이콘
import IconMore from '@/assets/img/common/icon_arrow_left.svg'
// 채팅 아이콘
import IconChat from '@/assets/img/common/icon_chat.svg'

// 라우터
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

// param
const meetingNo = route.params.meetingNo as string


// props
const props = defineProps<{
  boardList: Array<boolean>
  mid: String
}>()

// 게시판 상세 이동
const moveVoteList = () => {
  router.push(`/meeting/${props.mid}/detail?state=vote`)
}
</script>
