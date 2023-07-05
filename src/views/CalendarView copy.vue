<template>
  <div class="calendar">
    <div id="calendar" style="height: 600px;"></div>
    <q-date
        v-model="date"
        color="orange"
        text-color="black"
        dark
        bordered
      />
  </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css'; 

const socket = ref(null);
const receivedMessage = ref('');
const date = ref('');

const options = {
  defaultView: 'month',

  month: {}
};

let calendar: Calendar;
onMounted(() => {

  calendar = new Calendar('#calendar', options);
  calendar.on('selectDateTime', (event) => {
    if(calendar)
  calendar.createEvents([
    {
      id: '1',
      calendarId: '1',
      title: 'soldout',
      category: 'allday',
      dueDateClass: 'test',
      start: event.start,
      end: event.end, 
    },
  ])
});

  
  // WebSocket 엔드포인트 URL
  const endpoint = 'ws://192.168.0.59:8888/ws';

  // // WebSocket 인스턴스 생성
  socket.value = new WebSocket(endpoint);

  // WebSocket 이벤트 핸들러 설정
  socket.value.onopen = () => {
    console.log('WebSocket 연결 성공');
    socket.value.send('ㅓ')
  };

  socket.value.onmessage = (event) => {
    receivedMessage.value = event.data;
  };

  socket.value.onclose = () => {
    console.log('WebSocket 연결 종료');
  };

  
});
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