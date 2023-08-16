<template>
  <main>
    <h6>나의 캘린더</h6>
    <div class="calendar-padding">
      <div id="calendar" ></div>
    </div>
    
  </main>
</template>

<script setup lang="ts">
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { onMounted } from "vue";

let calendar: Calendar;
// 캘린더 옵션
const calendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  weekends: true,
  editable: true,
  selectable: true,
  handleWindowResize:true,
  windowResize: function() {
    calendar.updateSize()
  }
};

onMounted(() => {
  // 캘린더 El
  let calendarEl: HTMLElement = document.getElementById("calendar")!;
  calendar = new Calendar(calendarEl, calendarOptions);
  calendar.render(); 
})

</script>


<style>
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

</style>