<template>
  <FullCalendar :options='calendarOptions'></FullCalendar>
  <div id="calendar">calendar</div>
</template>
  
<script setup lang="ts">
import { getCurrentInstance, onMounted } from 'vue';


import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import type { DateClickArg } from 'fullcalendar-scheduler/index.js';

let scheduleList: string[] = [];

const calendarOptions = {
  plugins: [interactionPlugin, dayGridPlugin],
  initialView: 'dayGridMonth',
  weekends: false,
  dateClick: function(info: DateClickArg) {
    if(scheduleList.find(el => el === info.dateStr)){
      scheduleList = scheduleList.filter(el => el !== info.dateStr)
      info.dayEl.style.backgroundColor = 'transparent';
    } else {
      scheduleList.push(info.dateStr)
      info.dayEl.style.backgroundColor = '#eee';
    }
  }
}

let calendar: Calendar;


//import { Client } from '@stomp/stompjs';
//import * as SockJS from 'sockjs-client';
onMounted(() => {
  let calendarEl: HTMLElement = document.getElementById('calendar')!;
  calendar = new Calendar(calendarEl, calendarOptions);
  calendar.render();

  // const client = new Client({
  //   brokerURL: 'ws://plandly-haeju-min.koyeb.app/ws',
  //   onConnect: () => {
  //     client.subscribe('/calendar.view', message =>
  //       console.log(message)
  //     );
  //   },
  // });

  //client.activate();

  var sock = new SockJS('https://plandly-haeju-min.koyeb.app/wsTest');
  sock.onopen = function() {
      console.log('open');
      sock.send('test');
  };

  sock.onmessage = function (e){
    console.log(e.data)
  } 


    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    proxy.$socket.onmessage = (res: {
      data: string;
    }) => {
      console.log(data);
    }
})




</script>

<style>
.toastui-calendar-grid-selection{
display: none;
}
.toastui-calendar-handle-y{
display: none;
}
.toastui-calendar-weekday-event{
background-color: #fff !important;
border-left: none !important;
}
</style>