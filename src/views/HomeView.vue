<template>
  <Lnb class="hidden lg:block" />
  <Gnb />
  <main>
    <div class="home-main">
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
          @click="router.push(`meeting/${item.mid}`)"
          v-for="item in meetings"
          :key="item.mid"
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

//소켓 api url
const apiUrl = import.meta.env.VITE_APP_API_URL
// 소켓
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
let stompClient: Client
const socket = new SockJS(`${apiUrl}/ws`) // 소켓 서버 URL에 맞게 수정
stompClient = new Client({ webSocketFactory: () => socket })

// api
import { meetingList } from '@/axios/api'

const store = useUserStore()
const router = useRouter()

// 캘린더 로드 대기 화면 show 여부
let showLoading = ref(true)

// 캘린더
let calendar: Calendar

// 내 일정 리스트
let myCalendarList: myDateInfo[] = reactive([])
// 현재 월
let currentMonth = ref(new Date().getMonth())
// 현재 년도
let currentYear = ref(new Date().getFullYear())

// 캘린더 옵션
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
      deleteDate(info.dateStr)
    } else {
      info.dayEl.children[0].style.backgroundColor = '#D5E6E2'
      addDate(info.dateStr)
    }
  },
  customButtons: {
    prev: {
      click: function () {
        calendar.prev()
        if (currentMonth.value === 1) {
          changeDate(12, currentYear.value - 1)
        } else changeDate(currentMonth.value - 1, currentYear.value)
      }
    },
    next: {
      click: function () {
        calendar.next()
        if (currentMonth.value === 12) changeDate(1, currentYear.value + 1)
        else changeDate(currentYear.value + 1, currentYear.value)
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
      cid: myCalendarList.filter((el) => el.myDate === dateStr)[0].cid
    })
  })

  Object.assign(
    myCalendarList,
    myCalendarList.filter((el) => el.myDate !== dateStr)
  )
}

//  나의 모임 리스트
const meetings: meeting[] = reactive([])

// 소켓 연결
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

    stompClient.subscribe(`/topic/myMeeting/${store.userInfo.uid}`, function ({ body }) {
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

    let calendarEl: HTMLElement = document.getElementById('calendar')!
    calendar = new Calendar(calendarEl, calendarOptions)
    calendar.render()
    showLoading.value = false
  }
}

const changeDate = (month: number, year: number): void => {
  currentMonth.value = month
  stompClient.publish({
    destination: '/myCalendar.view',
    body: JSON.stringify({
      uId: store.userInfo.uid, // 사용자 아이디
      currentMonth: month, // 현재 월
      currenYear: year // 현재 년도
    })
  })
}

// 미팅 리스트
const startNo = ref(1)
const getMeetingList = async() => {
  try{
    const {data} = await meetingList(store.userInfo.uid, startNo.value, 10)
    Object.assign(meetings, data.info)
  } catch(e) {
    alert(e)
  }
}

onMounted(() => {
  // 켈린더
  stompClient.activate()
  wsSubscribe()
  getMeetingList()
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
