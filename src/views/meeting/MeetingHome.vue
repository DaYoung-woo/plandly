<template>
  <div class="flex text-right justify-items-end justify-end mt-8">
    <button class="vfm-btn bg-slate-200 text-xs mr-2" @click="$emit('closeModal')">
      <IconShare />
    </button>

    <button class="vfm-btn bg-slate-200 text-xs ml-2" @click="$emit('closeModal')">
      <IconMore />
    </button>
  </div>

  <div class="meeting-avartar"></div>

  <div>
    <h6 class="pt-5">모임 타이틀</h6>
    <div class="desc pt-1">모임에 대한 간단한 설명</div>
  </div>

  <div class="border mt-5 flex p-5 items-center justify-between">
    <div class="flex items-center">
      <div class="inline-block h-12 w-12 rounded-full ring-2 ring-slate-200 bg-slate-200" />
      <span class="text-xl pl-5">다음 모임: 5월 7일 - 5월 9일</span>
    </div>
    <button class="vfm-btn bg-slate-200 px-4 py-2 text-xs" @click="$emit('closeModal')">
      달력<br />열기
    </button>
  </div>

  <div class="text-center">
    <BoardMain />
    <button class="border px-5 py-2 mt-5" @click="router.push('meeting/detail')">
      게시글 더보기
    </button>
    <VoteMain />
    <button class="border px-5 py-2 mt-5" @click="router.push('meeting/detail')">
      투표 더보기
    </button>
    <TimelineMain />
    <button class="border px-5 py-2 mt-5" @click="router.push('meeting/detail')">
      타임라인 더보기
    </button>
    <MemberMain />
    <button class="border px-5 py-2 mt-5" @click="router.push('meeting/detail')">
      멤버 모두 보기
    </button>
  </div>
</template>

<script setup lang="ts">
// api
import { getMeetingInfo } from '@/axios/api'
// 게시판
import BoardMain from '@/components/meeting/home/BoardMain.vue'
// 투표
import VoteMain from '@/components/meeting/home/MeetingMain.vue'
// 타임라인
import TimelineMain from '@/components/meeting/home/TimelineMain.vue'
// 멤버
import MemberMain from '@/components/meeting/home/MemberMain.vue'

// 공유 아이콘
import IconShare from '@/assets/img/common/icon_share.svg'
// 더보기 아이콘
import IconMore from '@/assets/img/common/icon_more.svg'

// 라우터
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

// 스토어
import { useUserStore } from '@/stores/user.js'
const store = useUserStore()

// param
const mId = route.params.mId as string

// 마운트
import { onMounted } from 'vue'
onMounted(() => {
  loadMeetingInfo()
})

// 모임 홈 정보 조회
const loadMeetingInfo = async () => {
  try {
    const param = {
      mId,
      uId: store.userInfo.uid
    }
    const res = getMeetingInfo(param)
    console.log(res)
  } catch (e) {
    console.log(e)
  }
}
</script>

<style>
.meeting-avartar {
  width: 100px;
  height: 100px;
  position: static;
  margin-top: -100px;
  background-color: #b9b9b9;
  border-radius: 20px;
}
</style>
