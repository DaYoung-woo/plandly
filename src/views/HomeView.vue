<template>
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
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

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