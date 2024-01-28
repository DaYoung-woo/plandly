<template>
  <Lnb class="hidden lg:block" />
  <Gnb />
  <main>
    <div style="max-width: 840px; margin: 0 auto">
     
      <div class="calendar-padding">
        <div id="calendar"></div>
      </div>
      <h6 class="pt-10">나의 모임</h6>

      <div
        class="meeting-list pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        <div
          class="meeting-item"
          @click="router.push('meeting')"
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
    </div>
  </main>
</template>

<script setup lang="ts">
import Lnb from '@/components/frame/LnbFrame.vue'
import Gnb from '@/components/frame/GnbFrame.vue'

import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.js'
import type { DateClickArg } from 'fullcalendar-scheduler/index.js'

// 소켓
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
let stompClient: Client

const store = useUserStore()
const router = useRouter()

let calendar: Calendar
let scheduleList: string[] = []

const apiUrl = import.meta.env.VITE_APP_API_URL
// 타입
type DateInfo = {
  calendarId: number
  event: string
  eventDate: string
  uid: string
}

type meetingInfo = {
  name: string
  mid: number
}

type myDateInfo = {
  cId: string
  myDate: string
}

interface meeting extends meetingInfo {
  updateDate: string
  mainPicture: string
}

interface meetingDetail extends meetingInfo {
  dates: string[]
}

let loadCount = ref(false)
let currentMonth = ref(new Date().getMonth() + 1)
let myCalendarList: myDateInfo[] = reactive([])
const meetings: meeting[] = reactive([])
const socket = new SockJS('https://plandly-haeju-min.koyeb.app/ws') // 소켓 서버 URL에 맞게 수정
stompClient = new Client({ webSocketFactory: () => socket })

const calendarOptions = reactive({
  plugins: [interactionPlugin, dayGridPlugin],
  initialView: 'dayGridMonth',
  weekends: true,
  contentHeight: 850,
  //titleFormat: {year: "numeric", month: 'numeric'},
  titleFormat: function(date) {
    return `${date.date.year}.${String(date.date.month + 1).length === 1 ? `0${date.date.month + 1}` : date.date.month + 1}`
  },
  dayHeaderFormat:function(date) {
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
  buttonText: {today: 'Today'},
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
        JSON.parse(body).forEach((el: myDateInfo) => {
          console.log(el)
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
          id: `${el.mid}`,
        })
      })
      calendar.render()
    })

    let calendarEl: HTMLElement = document.getElementById('calendar')!
    calendar = new Calendar(calendarEl, calendarOptions)
    calendar.render()
  }
}

onMounted(() => {
  // 켈린더

  stompClient.activate()
  wsSubscribe()
})
</script>

<style lang="scss">
main {
  padding: 30px 0px;
  font-family: 'Noto Sans KR', sans-serif;
}
@media (min-width: 500px) {
  main {
    padding: 40px 40px;
  }
}

@media (min-width: 800px) {
  main {
    padding: 60px 90px;
  }
}

.meeting-list {
  .meeting-item {
    background-color: #ddd;
    min-height: 214px;
    padding: 10px;
    .thumb {
      height: 60%;
    }
    .desc {
      background-color: #fff;
      height: 40%;
      padding: 10px;
      p {
        background-color: #ddd;
        width: 100%;
        margin-bottom: 10px;
        font-size: 12px;
      }
      span {
        background-color: #ddd;
        margin-right: 5px;
        font-size: 10px;
      }
    }
  }
}
.calendar-padding {
  min-height: 520px;
}

// .fc-theme-standard td, .fc-theme-standard th {
//   border: none;
//   border-radius: 30px;
// }

// .fc-theme-standard .fc-scrollgrid {
//   border: none;
//   border-radius: 30px;
// }


// .fc-daygrid-day-frame{
//   min-height: 125px;
//   height: 125px;
// }

@media (min-width: 735px) {

  .fc-theme-standard td, .fc-theme-standard th {
    border: none;
    border-radius: 30px;
  }

  .fc-theme-standard .fc-scrollgrid {
    border: none;
    border-radius: 30px;
  }
  
  td.fc-day  {
    padding: 2px;
    .fc-daygrid-day-frame{
      border-radius: 20px;
    }
  }

  .fc .fc-daygrid-day-top {
    flex-direction: row;  
    margin: 8px 0px 0px 12px;
    font-size: 14px;
  }
  
}

.fc .fc-toolbar-title{
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.fc .fc-button, .fc .fc-button-primary:disabled {
  background-color: #fff;
  color: #00785B;
  border-radius: 25.5px;
  border: 1px solid #00785B;
  opacity: 1;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 11px 17px
}

.fc .fc-button:hover,  .fc .fc-button-primary:disabled:hover {
  background-color: #00785B;
  color: #fff;
  border-color: #00785B;
}

.fc .fc-button:active,  .fc .fc-button-primary:disabled:active {
  background-color: #000;
  color: #fff;
}

.fc-icon.fc-icon-chevron-left::before{
  width: 15px;
}

.fc .fc-col-header-cell-cushion{
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 10px;
  margin-bottom: 6px;
}

.fc-dayGridMonth-view{
  background-color: #F4F6F6;
  border-radius: 15px;
}

.fc-daygrid-day-frame {
  background: #fff;
}
.fc-day-other .fc-daygrid-day-frame {
  background: #F4F6F6;
}
.fc-col-header-cell.fc-day-sun .fc-col-header-cell-cushion{
  color: #EA0000;
}
.fc-day-sun .fc-daygrid-day-number{
  color: #EA0000;
}
.fc-col-header-cell.fc-day-sat .fc-col-header-cell-cushion{
  color: #0035F0
}

.fc .fc-button .fc-icon{
  font-size: 15px;
}

.fc .fc-daygrid-day.fc-day-today{
  background-color: transparent;
  color: #00785B;
  .fc-daygrid-day-top{
    a{
      background-color: #00785B;
      border-radius: 100px;
      width: 31px;
      height: 31px;
      text-align: center;
      color: #fff;
    } 
  }
}


</style>
