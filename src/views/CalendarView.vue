<template>
  <div id="calendar"></div>
</template>

<script setup lang="ts">
import { reactive, onMounted, onBeforeMount, ref } from "vue";

// 타입
type DateInfo = {
  calendarId: number, 
  event: string,
  eventDate: string,
  uid: string
}

// 캘린더
import { Calendar } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import type { DateClickArg } from "fullcalendar-scheduler/index.js";
let calendar: Calendar;
let scheduleList: string[] = [];
// 캘린더 옵션
const calendarOptions = {
  plugins: [interactionPlugin, dayGridPlugin],
  initialView: "dayGridMonth",
  weekends: true,
  dateClick: function (info: DateClickArg) {
    stompClient.publish({
      destination: "/calendar.send",
      body: JSON.stringify({
        uid: store.userInfo.uid,
        eventDate: info.dateStr,
        event: info.dateStr
      }),
    });
    if (scheduleList.find((el) => el === info.dateStr)) {
      scheduleList = scheduleList.filter((el) => el !== info.dateStr);
      calendar.getEventById(info.dateStr)?.remove()
    } else {
      scheduleList.push(info.dateStr);
      calendar.addEvent({
        id: info.dateStr,
        start: info.dateStr,
        display: 'background',
      })
      
    }
  },
};

// 소켓
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
let stompClient: Client;


let loadCount = 0;

const socket = new SockJS("https://plandly-haeju-min.koyeb.app/ws"); // 소켓 서버 URL에 맞게 수정
stompClient = new Client({ webSocketFactory: () => socket });
stompClient.activate();
stompClient.onConnect = () => {
  stompClient.publish({
    destination: "/calendar.view",
    body: JSON.stringify({
      uid: store.userInfo.uid,
    }),
  });
  stompClient.subscribe('/topic/myCalendar', function (data){
    const eventDateList: DateInfo[] = JSON.parse(data.body)
    if(loadCount === 0) {
      eventDateList.map(el => {
        calendar.addEvent({
          id: el.eventDate,
          start: el.eventDate,
          display: 'background',
        })
        scheduleList.push(el.eventDate)
      })
      loadCount++
    }
  });
}

import { useUserStore } from "@/stores/user.js";
const store = useUserStore();


onMounted(() => {
  // 캘린더 El
  let calendarEl: HTMLElement = document.getElementById("calendar")!;
  calendar = new Calendar(calendarEl, calendarOptions);
  calendar.render(); 
});

</script>

<style>
.fc .fc-col-header-cell-cushion {
  display: inline-block;
  padding: 8px;
}
</style>
