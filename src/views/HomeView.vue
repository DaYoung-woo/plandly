<template>
  <main>
    <h6>나의 캘린더</h6>
    <div class="calendar-padding">
      <div id="calendar" ></div>
      <div>loading</div>
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

let loadCount = ref(false);

 
const socket = new SockJS("https://plandly-haeju-min.koyeb.app/ws"); // 소켓 서버 URL에 맞게 수정
stompClient = new Client({ webSocketFactory: () => socket });


const calendarOptions = reactive({
  plugins: [interactionPlugin, dayGridPlugin],
  initialView: "dayGridMonth",
  weekends: false,
  dateClick: function (info: DateClickArg) {
    stompClient.publish({
      destination: "/calendar.send",
      body: JSON.stringify({
        uid:"c7e1141059a19b218209bc5af7a81a720e39b500",
        currentMonth: 10,
        myDate: info.dateStr
      }),
    });
    if (scheduleList.find((el) => el === info.dateStr)) {
      scheduleList = scheduleList.filter((el) => el !== info.dateStr);
      info.dayEl.style.backgroundColor = "transparent";
    } else {
      scheduleList.push(info.dateStr);
      info.dayEl.style.backgroundColor = "#eee";
    }
    var msg = {
    "uId": "c7e1141059a19b218209bc5af7a81a720e39b500", // 사용자 아이디
    "currentMonth" : "10" // 현재 월
}

    stompClient.publish({
      destination: "/myCalendar.view",
      body: JSON.stringify(msg)
    })
  },
  
});

const wsSubscribe = () => {
  stompClient.onConnect = () => {
    stompClient.subscribe(`/topic/myCalendar/c7e1141059a19b218209bc5af7a81a720e39b500`, function ({body}){
      console.log(JSON.parse(body))
    });
  }
}


onMounted(() => {
  // 켈린더
  let calendarEl: HTMLElement = document.getElementById("calendar")!;
  calendar = new Calendar(calendarEl, calendarOptions);
  
  stompClient.activate();
  wsSubscribe();
  calendar.render();

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
</style>