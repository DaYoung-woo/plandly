import { ref } from 'vue'
import { defineStore } from 'pinia'
import dayjs from 'dayjs'

export const useCalendarStore = defineStore('calendar', () => {
    // 현재 월
    let currentMonth = ref(Number(dayjs().format("MM")))
    // 현재 년도
    let currentYear = ref(dayjs().year())

    return {
      currentMonth,
      currentYear,
    }
})