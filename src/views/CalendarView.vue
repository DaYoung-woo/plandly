<template>
  <FullCalendar :options='calendarOptions'></FullCalendar>
  <div id="calendar">calendar</div>
</template>
  
<script setup lang="ts">
import { reactive, onMounted } from 'vue';
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

onMounted(() => {
  let calendarEl: HTMLElement = document.getElementById('calendar')!;
  calendar = new Calendar(calendarEl, calendarOptions);
  calendar.render();
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