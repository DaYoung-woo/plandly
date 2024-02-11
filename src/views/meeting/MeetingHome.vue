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
    <h1 class="pt-5">모임 타이틀</h1>
    <div class="desc pt-1">모임에 대한 간단한 설명</div>
  </div>

  <div class="meeting-calendar-area">
    <div class="flex items-center">
      <div class="meeting-date-box">
        <p>7일</p>
        <span>토요일</span>
      </div>

      <div class="meeting-date-text pl-2">
        <p>정기 모임 12회차</p>
        <span> <IconUser class="mr-1" />2/3명 </span>
      </div>
    </div>
    <button class="vfm-btn bg-slate-200 px-4 py-2 text-xs" @click="$emit('closeModal')">
      <IconMore class="rotate-90" />
    </button>
  </div>

  <div class="text-center">
    <BoardMain />
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
// 인간 아이콘
import IconUser from '@/assets/img/common/icon_user.svg'

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
  //loadMeetingInfo()
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

<style lang="scss">
.meeting-avartar {
  width: 100px;
  height: 100px;
  position: static;
  margin-top: -100px;
  background-color: #b9b9b9;
  border-radius: 20px;
}
.meeting-calendar-area {
  background-color: #f4f6f6;
  border-radius: 20px;
  display: flex;
  padding: 16px 20px;
  margin-top: 20px;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 24px;
    font-weight: 600;
  }
  span {
    font-weight: 300;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
  .meeting-date-box {
    margin-left: 10px;
    background-color: #076e49;
    color: #fff;
    text-align: center;
    padding: 16px;
    border-radius: 30px;
  }
}
</style>
