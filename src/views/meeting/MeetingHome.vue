<template>
  <div class="flex text-right justify-items-end justify-end mt-8">
    <!-- 공유하기 버튼 -->
    <button class="vfm-btn bg-slate-200 text-xs mr-2" @click="$emit('closeModal')">
      <IconShare />
    </button>

    <!-- 더보기 아이콘 -->
    <button class="vfm-btn bg-slate-200 text-xs ml-2" @click="$emit('closeModal')">
      <IconMore />
    </button>
  </div>

  <div class="meeting-avartar"></div>

  <div>
    <h1 class="pt-5">모임 타이틀</h1>
    <div class="desc pt-1">모임에 대한 간단한 설명</div>
  </div>
  
  <!-- 다음 모임 정보 -->
  <div class="meeting-calendar-area" v-if="!calendarOpen">
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

    <!-- 캘린더 더보기 버튼 -->
    <button class="vfm-btn bg-slate-200 px-4 py-2 text-xs" @click="changeCalendarOpen(true)">
      <IconMore class="rotate-90" />
    </button>
  </div>

  <!-- 캘린더 영역 -->
  <div v-else>
    <div id="calendar" class="mt-10" ></div>
    <IconArrowLeft/>
  </div>
  

  <div class="text-center">
    <!-- 게시판 -->
    <BoardMain :boardList="[]"/>
    <!-- 투표 -->
    <VoteMain :voteList="[]"/>
    <!-- 타임라인 -->
    <TimelineMain v-if="false"/>
    <!-- 멤버 -->
    <MemberMain :memberList="[]"/>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
// api
import { getMeetingInfo } from '@/axios/api'
// 게시판
import BoardMain from '@/components/meeting/home/BoardMain.vue'
// 투표
import VoteMain from '@/components/meeting/home/VoteMain.vue'
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
  // < 아이콘
import IconArrowLeft from "@/assets/img/common/icon_arrow_left.svg"

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
  stompClient.activate()
 
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

// 캘린더 보여주기 여부
let calendarOpen = ref(false)
const changeCalendarOpen = (state: boolean) => {
  calendarOpen.value = state
  wsSubscribe()
}

// 캘린더 설정
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { DateClickArg } from 'fullcalendar-scheduler/index.js'
let calendar: Calendar
let scheduleList: string[] = []
let currentMonth = ref(new Date().getMonth() + 1)
let myCalendarList: myDateInfo[] = reactive([])
const meetings: meeting[] = reactive([])

// 소캣 설정
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
const apiUrl = import.meta.env.VITE_APP_API_URL
let stompClient: Client
const socket = new SockJS(`${apiUrl}/ws`) // 소켓 서버 URL에 맞게 수정
stompClient = new Client({ webSocketFactory: () => socket })

// 캘린더의 현재 달 변경
const changeMonth = (month: number): void => {
  stompClient.publish({
    destination: '/myCalendar.view',
    body: JSON.stringify({
      uId: store.userInfo.uid, // 사용자 아이디
      currentMonth: month // 현재 월
    })
  })
}

// 캘린더 옵션
const calendarOptions = reactive({
  plugins: [interactionPlugin, dayGridPlugin],
  initialView: 'dayGridMonth',
  weekends: true,
  contentHeight: 850,
  fixedWeekCount: false,
  //titleFormat: {year: "numeric", month: 'numeric'},
  titleFormat: function (date) {
    return `${date.date.year}.${
      String(date.date.month + 1).length === 1 ? `0${date.date.month + 1}` : date.date.month + 1
    }`
  },
  dayHeaderFormat: function (date) {
    switch (date.date.day) {
      case 4:
        return 'SUN'
      case 5:
        return 'MON'
      case 6:
        return 'TUE'
      case 7:
        return 'WED'
      case 8:
        return 'THU'
      case 9:
        return 'FRI'
      case 10:
        return 'SAT'
      default:
        return date.date.day
    }
  },
  buttonText: { today: 'Today' },
  customButtons: {
    prev: {
      click: function () {
        calendar.prev()
        const month = calendar.getDate().getMonth()
        if (month === 0) changeMonth(12)
        else changeMonth(month)
      }
    },
    next: {
      click: function () {
        calendar.next()
        const month = calendar.getDate().getMonth() + 2
        changeMonth(month)
      }
    }
  }
})

// 소켓 구독
const wsSubscribe = () => {
  stompClient.onConnect = () => {
    stompClient.publish({
      destination: '/myCalendar.view',
      body: JSON.stringify({
        uId: store.userInfo.uid, // 사용자 아이디
        currentMonth: currentMonth.value // 현재 월
      })
    })

    stompClient.subscribe(`/topic/myCalendar/${store.userInfo.uid}`, function ({ body }) {
      if (JSON.parse(body)) {
        Object.assign(myCalendarList, JSON.parse(body))
        console.log(myCalendarList)
        JSON.parse(body).forEach((el: myDateInfo) => {
          const td = document.querySelector(`td[data-date="${el.myDate}"]`) as HTMLElement
          if (td) {
            td.children[0].style.backgroundColor = '#D5E6E2'
            td.children[0].style.color = '#00785B'
          }
        })
      }
    })

    stompClient.subscribe(`/topic/myMeeting/list/${store.userInfo.uid}`, function ({ body }) {
      const list = JSON.parse(body)
      Object.assign(meetings, list)
      if (!list) return
    })

    stompClient.subscribe('/topic/myCalendar/failed', function (data) {
      console.log(data)
    })

    stompClient.subscribe(`/topic/myMeeting/${store.userInfo.uid}`, function ({ body }) {
      const list = JSON.parse(body)
      if (!list) return
      list.forEach((el: meetingDetail) => {
        calendar.addEvent({
          title: el.name,
          start: el.dates[0],
          end: el.dates[el.dates.length - 1],
          id: `${el.mId}`
        })
      })
      calendar.render()
    })

    let calendarEl: HTMLElement = document.getElementById('calendar')!
    calendar = new Calendar(calendarEl, calendarOptions)
    calendar.render()
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

.fc-dayGridMonth-view {
  background-color: #ffffff;
  border-radius: 15px;
}

</style>
