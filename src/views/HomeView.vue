<template>
  <Lnb class="hidden lg:block" />
  <Gnb />
  <main>
    <div class="home-main">
      <Calendar />
      <h2 class="pt-10">나의 모임</h2>

      <div
        class="meeting-list pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        <div
          class="meeting-list__box"
          @click="router.push(`meeting/${item.mid}`)"
          v-for="(item, idx) in meetings"
          :key="item.mid"
        >
          <div class="meeting-list__box__thumb">
            <img :src="`${item.mainPicture}`" v-if="item.mainPicture" />
          </div>
          <div class="meeting-list__box__content">
            <div class="meeting-list__box__content-detail">
              <p>{{ item.name }}</p>
              <span>{{ calculateDate(item.updateDate.split(' ')[0]) }}</span>
              <span> · </span>
              <span>멤버</span>
            </div>
             <!-- 더보기 아이콘 -->
             <div class="meeting-list__box__icon-more">
              <button class="bg-slate-200 text-xs ml-2" @click.stop="changeOpen(idx)">
                <IconMore />
              </button>
              <div class="meeting-list__box__content-setting" v-if="item.open"  @click="changeOpen(idx)">
                <button @click.stop="deleteMeeting" type="button">탈퇴</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="no-data-box mt-2 py-12" v-if="!meetings.length">
        생성된 모임이 없습니다. 모임을 생성해보세요!
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.js'
import { useCalendarStore } from '@/stores/calendar.js'
import {calculateDate} from '@/composables/date'

// 캘린더
import Calendar from '@/components/calendar/Calendar.vue'

// 프레임
import Lnb from '@/components/frame/LnbFrame.vue'
import Gnb from '@/components/frame/GnbFrame.vue'

// 더보기 아이콘
import IconMore from '@/assets/img/common/icon_more.svg'

// api
import { getMyCalendar, meetingList } from '@/axios/api'

// 스토어 라우터 설정
const userStore = useUserStore()
const calendarStore = useCalendarStore()
const router = useRouter()

//  나의 모임 리스트
const meetings: meeting[] = reactive([])
const startNo = ref(1)
const getMeetingList = async() => {
  try{
    const {data} = await meetingList(userStore.userInfo.uid, startNo.value, 10)
    data.info.forEach(el => el.open = false)
    Object.assign(meetings, data.info)
  } catch(e) {
    alert(e)
  }
}

// 내 일정 조회 요청 api
const loadMyCalendar = async() => {
  try {
    const param: myCalendarParam = {
      uid: userStore.userInfo.uid, 
      currentMonth: calendarStore.currentMonth,
      currentYear: calendarStore.currentYear
    }
    await getMyCalendar(param)
  }catch(e) {
    alert(e)
  }
}

// 모임 더보기 버튼 클릭
const changeOpen = (idx:number) => {
  meetings[idx].open = !meetings[idx].open
}

// 모임 삭제
const deleteMeeting = () => {}

onMounted(() => {
  getMeetingList()
  loadMyCalendar()
})


</script>

<style lang="scss">
.calendar-padding {
  min-height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
