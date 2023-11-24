<template>
  <Lnb class="hidden lg:block" />
  <Gnb />
  <main>
    <h6>나의 캘린더</h6>
    <div class="calendar-padding">
      <div id="calendar" ></div>
    </div>
    <h6 class="pt-10">나의 모임</h6>
    <div class="meeting-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
   
      <div class="meeting-item" @click="router.push('meeting')">
        <div class="thumb"></div>
        <div class="desc">
          <p>제목</p>
          <span>최근 업데이트 날짜</span>
          <span>멤버 수</span>
          <span>총 게시글</span>
        </div>
      </div>
        <div class="meeting-item" @click="router.push('meeting')">
          <div class="thumb"></div>
          <div class="desc">
            <p>제목</p>
            <span>최근 업데이트 날짜</span>
            <span>멤버 수</span>
            <span>총 게시글</span>
          </div>
        </div>
        <div class="meeting-item" @click="router.push('meeting')">
          <div class="thumb"></div>
          <div class="desc">
            <p>제목</p>
            <span>최근 업데이트 날짜</span>
            <span>멤버 수</span>
            <span>총 게시글</span>
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

import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.js";
import type { DateClickArg } from "fullcalendar-scheduler/index.js";

// 소켓
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
let stompClient: Client;

const store = useUserStore();
const router = useRouter();

let calendar: Calendar;
let scheduleList: string[] = [];

// 타입
type DateInfo = {
  calendarId: number, 
  event: string,
  eventDate: string,
  uid: string
}

type meetingInfo = {
  name: string,
  mid:number,
}

type myDateInfo = {
  cId: string,
  myDate: string,
}

interface meetingList extends meetingInfo {
  updateDate: string
}

interface meetingDetail extends meetingInfo {
  dates: string[]
}


let loadCount = ref(false);

 
const socket = new SockJS("https://plandly-haeju-min.koyeb.app/ws"); // 소켓 서버 URL에 맞게 수정
stompClient = new Client({ webSocketFactory: () => socket });

const calendarOptions = reactive({
  plugins: [interactionPlugin, dayGridPlugin],
  initialView: "dayGridMonth",
  weekends: true,
  dateClick: function (info: DateClickArg) {
    if (scheduleList.find((el) => el === info.dateStr)) {
      scheduleList = scheduleList.filter((el) => el !== info.dateStr);
      info.dayEl.style.backgroundColor = "transparent";
    } else {
      scheduleList.push(info.dateStr);
      info.dayEl.style.backgroundColor = "#eee";
    }
    clickDate(info.dateStr)
  },
  
});

const clickDate = (dateStr: string) => {
  stompClient.publish({
    destination: "/calendar.send",
    body: JSON.stringify({
      uid: "2814129549",
      currentMonth: new Date().getMonth() + 1,
      myDate: dateStr
    }),
  });
}


const wsSubscribe = () => {
  stompClient.onConnect = () => {


    var msg = {
      "uId": "2814129549", // 사용자 아이디
      "currentMonth" : new Date().getMonth() + 1 // 현재 월
    }

    stompClient.publish({
      destination: "/myCalendar.view",
      body: JSON.stringify(msg)
    })

    stompClient.subscribe(`/topic/myCalendar/2814129549`, function ({body}){
      if(JSON.parse(body)) {
        JSON.parse(body).forEach((el: myDateInfo) => {
          const td = document.querySelector(`td[data-date="${el.myDate}"]`)
          if(td) td.style.backgroundColor = "#eee";
        })
      }
    }); 

    stompClient.subscribe(`/topic/myMeeting/list/2814129549`, function ({body}){
      const list = JSON.parse(body)
      if(!list) return;
    }); 

    stompClient.subscribe(`/topic/myMeeting/2814129549`, function ({body}){
      const list = JSON.parse(body)
      if(!list) return;
      list.forEach((el: meetingDetail ) => {
        calendar.addEvent({
          title: el.name,
          start: el.dates[0],
          end: el.dates[el.dates.length-1],
          id:`${el.mid}`,
          color: 'yellow',   // an option!
          textColor: 'black' // an option!
        })
      })
      calendar.render()
    }); 


    let calendarEl: HTMLElement = document.getElementById("calendar")!;
    calendar = new Calendar(calendarEl, calendarOptions);
    calendar.render();
  }
}


onMounted(() => {
  // 켈린더

  stompClient.activate();
  wsSubscribe();
  
});

</script>


<style lang="scss">
 main{
    padding: 30px 0px;
  }
  @media (min-width: 500px){
  main{
    padding: 40px 40px;
  }
}

@media (min-width: 800px){
  main{
    padding: 60px 90px;
  }
}

.meeting-list{
  .meeting-item{
    background-color: #ddd;
    min-height: 214px;
    padding: 10px;
    .thumb{
      height: 60%;
    }
    .desc{
      background-color: #fff;
      height: 40%;
      padding: 10px;
      p{
        background-color: #ddd;
        width: 100%;
        margin-bottom: 10px;
        font-size: 12px;
      }
      span{
        background-color: #ddd;
        margin-right: 5px;
        font-size: 10px;
      }
    }
  }
}
.calendar-padding{
  min-height: 520px;
}
</style>