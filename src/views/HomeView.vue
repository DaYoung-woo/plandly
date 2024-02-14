<template>
  <Lnb class="hidden lg:block" />
  <Gnb />
  <main>
    <div style="max-width: 840px; margin: 0 auto">
      <div class="calendar-padding" v-if="showLoading">
        <PageLoading width="45px" />
      </div>
      <div id="calendar"></div>
      <h2 class="pt-10">나의 모임</h2>

      <div
        class="meeting-list pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        <div
          class="meeting-item"
          @click="router.push(`meeting/${item.mId}`)"
          v-for="item in meetings"
          :key="item.mId"
        >
          <div class="thumb">
            <img :src="`${item.mainPicture}`" v-if="item.mainPicture" />
          </div>
          <div class="desc">
            <p>{{ item.name }}</p>
            <span>{{ item.updateDate.split(' ')[0] }}</span>
            <span>멤버 수</span>
            <span>총 게시글</span>
          </div>
        </div>
      </div>
      <div class="no-data-box mt-2 py-12" v-if="!meetings.length">
        생성된 모임이 없습니다. 모임을 생성해보세요!
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
// 프레임
import Lnb from '@/components/frame/LnbFrame.vue'
import Gnb from '@/components/frame/GnbFrame.vue'

// 달력 로딩
import PageLoading from '@/components/common/PageLoading.vue'

// 캘린더 설정
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { DateClickArg } from 'fullcalendar-scheduler/index.js'

// 변수 설정
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.js'

// 소켓
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
let stompClient: Client

const store = useUserStore()
const router = useRouter()

let calendar: Calendar
let scheduleList: string[] = []
let showLoading = ref(true)

const apiUrl = import.meta.env.VITE_APP_API_URL

let currentMonth = ref(new Date().getMonth() + 1)
let myCalendarList: myDateInfo[] = reactive([])
const meetings: meeting[] = reactive([])
const socket = new SockJS(`${apiUrl}/ws`) // 소켓 서버 URL에 맞게 수정
stompClient = new Client({ webSocketFactory: () => socket })

const calendarOptions = reactive({
  plugins: [interactionPlugin, dayGridPlugin],
  initialView: 'dayGridMonth',
  weekends: true,
  fixedWeekCount: false,
  contentHeight: 850,
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
  dateClick: function (info: DateClickArg) {
    if (myCalendarList.find((el) => el.myDate === info.dateStr)) {
      info.dayEl.children[0].style.backgroundColor = '#fff'
      scheduleList = scheduleList.filter((el) => el !== info.dateStr)
      deleteDate(info.dateStr)
    } else {
      scheduleList.push(info.dateStr)
      info.dayEl.children[0].style.backgroundColor = '#D5E6E2'
      addDate(info.dateStr)
    }
  },
  customButtons: {
    prev: {
      click: function () {
        calendar.prev()
        const month = calendar.getDate().getMonth() + 1
        if (month === 0) changeMonth(12)
        else changeMonth(month)
      }
    },
    next: {
      click: function () {
        calendar.next()
        const month = calendar.getDate().getMonth() + 2
        if (month === 0) changeMonth(12)
        changeMonth(month)
      }
    }
  },
  datesSet: function () {
    myCalendarList.forEach((el: myDateInfo) => {
      const td = document.querySelector(`td[data-date="${el.myDate}"]`) as HTMLElement
      if (td) {
        td.children[0].style.backgroundColor = '#D5E6E2'
        td.children[0].style.color = '#00785B'
      }
    })
  }
})

const addDate = (dateStr: string) => {
  stompClient.publish({
    destination: '/calendar.send',
    body: JSON.stringify({
      uId: store.userInfo.uid,
      myDate: dateStr,
      currentMonth: currentMonth.value
    })
  })
}

const deleteDate = (dateStr: string) => {
  stompClient.publish({
    destination: '/calendar.delete',
    body: JSON.stringify({
      uId: store.userInfo.uid,
      currentMonth: currentMonth.value,
      cId: myCalendarList.filter((el) => el.myDate === dateStr)[0].cId
    })
  })

  Object.assign(
    myCalendarList,
    myCalendarList.filter((el) => el.myDate !== dateStr)
  )
}

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
        myCalendarList.forEach((el: myDateInfo) => {
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
      console.log(list)
      if (!list) return
    })

    stompClient.subscribe('/topic/myCalendar/failed', function (data) {
      console.log(data)
    })

    stompClient.subscribe(`/topic/myMeeting/${store.userInfo.uid}`, function ({ body }) {
      const list = JSON.parse(body)
      if (!list) return
      list.forEach((el: meetingDateInfo) => {
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
    showLoading.value = false
  }
}

const changeMonth = (month: number): void => {
  currentMonth.value = month
  console.log(month)
  stompClient.publish({
    destination: '/myCalendar.view',
    body: JSON.stringify({
      uId: store.userInfo.uid, // 사용자 아이디
      currentMonth: month // 현재 월
    })
  })
}

onMounted(() => {
  // 켈린더
  stompClient.activate()
  wsSubscribe()
})
</script>

<style lang="scss">
.calendar-padding {
  min-height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
