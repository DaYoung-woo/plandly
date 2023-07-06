<template>
  <FullCalendar :options="calendarOptions"></FullCalendar>
  <div id="calendar"></div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";

import { Calendar } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import type { DateClickArg } from "fullcalendar-scheduler/index.js";
let scheduleList: string[] = [];

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const calendarOptions = reactive({
  plugins: [interactionPlugin, dayGridPlugin],
  initialView: "dayGridMonth",
  weekends: false,
  dateClick: function (info: DateClickArg) {
    if (scheduleList.find((el) => el === info.dateStr)) {
      scheduleList = scheduleList.filter((el) => el !== info.dateStr);
      info.dayEl.style.backgroundColor = "transparent";
    } else {
      scheduleList.push(info.dateStr);
      info.dayEl.style.backgroundColor = "#eee";
    }
  },
});

let calendar: Calendar;

const msg = {
  uid: "kjxfVlDsT2QJyYhLKEucQmxntsX2",
};

onMounted(() => {
  // 켈린더
  let calendarEl: HTMLElement = document.getElementById("calendar")!;
  calendar = new Calendar(calendarEl, calendarOptions);
  calendar.render();

  // 소켓
  const socket = new SockJS("https://plandly-haeju-min.koyeb.app/ws"); // 소켓 서버 URL에 맞게 수정
  const stompClient = new Client({ webSocketFactory: () => socket });

  stompClient.onConnect(() => {
    console.log("test")
    stompClient.value.send("/calendar.view", {}, JSON.stringify(msg))
  });
});
</script>

<style>
.toastui-calendar-grid-selection {
  display: none;
}
.toastui-calendar-handle-y {
  display: none;
}
.toastui-calendar-weekday-event {
  background-color: #fff !important;
  border-left: none !important;
}
</style>
