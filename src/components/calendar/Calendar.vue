<template>
    <div class="calendar-padding" v-if="showLoading">
      <PageLoading width="45px" />
    </div>
    <div id="calendar"></div>
</template>
  
<script setup lang='ts'>
  import { onMounted, reactive, ref } from 'vue';
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/stores/user.js'
  import { useCalendarStore } from '@/stores/calendar.js'
 

  // 캘린더 설정
  import { Calendar } from '@fullcalendar/core'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import interactionPlugin from '@fullcalendar/interaction'
  import type { DateClickArg } from 'fullcalendar-scheduler/index.js'

  // 캘린더 컴포저블
  import {titleFormat, dayHeaderFormat} from '@/composables/calendar'

  // 소켓
  import { Client } from '@stomp/stompjs'
  import SockJS from 'sockjs-client'
  
  // 달력 로딩
  import PageLoading from '@/components/common/PageLoading.vue'
import { addCalendar, deleteCalendar } from '@/axios/api';

  // 스토어
  const userStore = useUserStore()
  const calendarStore = useCalendarStore()
  // 라우터
  const router = useRouter()  

  // 캘린더 로드 대기 화면 show 여부
  let showLoading = ref(true)
  // 캘린더
  let calendar: Calendar

  //소켓 api url
  const apiUrl = import.meta.env.VITE_APP_API_URL
  // 소켓 설정
  let stompClient: Client
  const socket = new SockJS(`${apiUrl}/ws`) // 소켓 서버 URL에 맞게 수정
  stompClient = new Client({ webSocketFactory: () => socket })

  // 내 일정 리스트
  let myCalendarList: myDateInfo[] = reactive([])
  // 현재 월
  let currentMonth = ref(new Date().getMonth())
  // 현재 년도
  let currentYear = ref(new Date().getFullYear())

  // 현재 월 변경
  const changeMonth = (month: number, year: number): void => {
    currentMonth.value = month
    stompClient.publish({
      destination: '/myCalendar.view',
      body: JSON.stringify({
        uId: userStore.userInfo.uid, // 사용자 아이디
        currentMonth: month, // 현재 월
        currenYear: year // 현재 년도
      })
    })
  }

  // 캘린더 옵션
  const calendarOptions = reactive({
    plugins: [interactionPlugin, dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    fixedWeekCount: false,
    contentHeight: 850,
    titleFormat,
    dayHeaderFormat,
    buttonText: { today: 'Today' },
    dateClick: function (info: DateClickArg) {
      if (myCalendarList.find((el) => el.myDate === info.dateStr)) {
        info.dayEl.children[0].style.backgroundColor = '#fff'
        deleteDate(info.dateStr)
      } else {
        info.dayEl.children[0].style.backgroundColor = '#D5E6E2'
        addDate(info.dateStr)
      }
    },
    customButtons: {
      // 이전 달 달력 보기 버튼
      prev: {
        click: function () {
          calendar.prev()
          if (currentMonth.value === 1) {
            changeMonth(12, currentYear.value - 1)
          } else changeMonth(currentMonth.value - 1, currentYear.value)
        }
      },
      // 다음 달 달력 보기 버튼
      next: {
        click: function () {
          calendar.next()
          if (currentMonth.value === 12) changeMonth(1, currentYear.value + 1)
          else changeMonth(currentYear.value + 1, currentYear.value)
        }
      }
    },
    datesSet: function () {
      myCalendarList.forEach((el: myDateInfo) => {
        const td = document.querySelector(`td[data-date="${el.myDate}"]`) as HTMLElement
        if (td) {
          td.children[0].style.backgroundColor = '#D5E6E2'
          td.children[0].style.color = '#076E49'
        }
      })
    }
  })

  // 일정 추가
  const addDate = async(dateStr: string) => {
    const param = {
      uid: userStore.userInfo.uid,
      myDate: dateStr,
      currentMonth: calendarStore.currentMonth,
      currentYear: calendarStore.currentYear,
    }

    try{
      const res = addCalendar(param)
      console.log(res)
    }catch(e) {
      alert(e)
    }
  }

  // 일정 삭제
  const deleteDate = async(dateStr: string) => {
    const param = {
      uid: userStore.userInfo.uid,
      currentMonth: calendarStore.currentMonth,
      currentYear: calendarStore.currentYear,
      cid: myCalendarList.filter((el) => el.myDate === dateStr)[0].cid
    }
    try {
      deleteCalendar(param)
      Object.assign(
        myCalendarList,
        myCalendarList.filter((el) => el.myDate !== dateStr)
      )
    }catch(e) {
      alert("오류가 발생했습니다.")
    }
  }

  // 소켓 연결
const wsSubscribe = () => {
  stompClient.onConnect = () => {
    stompClient.publish({
      destination: '/myCalendar.view',
      body: JSON.stringify({
        uId: userStore.userInfo.uid, // 사용자 아이디
        currentMonth: calendarStore.currentMonth, // 현재 월
      })
    })

    stompClient.subscribe(`/topic/myCalendar/${userStore.userInfo.uid}`, function ({ body }) {
      console.log(JSON.parse(body))
      if (JSON.parse(body)) {
        Object.assign(myCalendarList, JSON.parse(body))
        myCalendarList.forEach((el: myDateInfo) => {
          const td = document.querySelector(`td[data-date="${el.myDate}"]`) as HTMLElement
          if (td) {
            td.children[0].style.backgroundColor = '#D5E6E2'
            td.children[0].style.color = '#076E49'
          }
        })
      }
    })

    stompClient.subscribe('/topic/myCalendar/failed', function (data) {
      console.log(data)
    })

    stompClient.subscribe(`/topic/myMeeting/${userStore.userInfo.uid}`, function ({ body }) {
      const list = JSON.parse(body)
      if (!list) return
      list.forEach((el: meetingDateInfo) => {
        calendar.addEvent({
          title: el.name,
          start: el.dates[0],
          end: el.dates[el.dates.length - 1],
          id: `${el.mid}`
        })
      })
      calendar.render()
    })

    const calendarEl: HTMLElement = document.getElementById('calendar')!
    calendar = new Calendar(calendarEl, calendarOptions)
    calendar.render()
    showLoading.value = false
  }
}

onMounted(() => {
  // 켈린더
  stompClient.activate()
  wsSubscribe()
})



</script>
  
<style>
  
</style>