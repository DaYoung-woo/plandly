import type { DateClickArg } from 'fullcalendar-scheduler/index.js'

// 캘린더 제목
export function titleFormat (date: { date: { year: number; month: number } }) {
  return `${date.date.year}.${
    String(date.date.month + 1).length === 1 ? `0${date.date.month + 1}` : date.date.month + 1
  }`
}

// 캘린더 상단 요일 표시
export function dayHeaderFormat (date: { date: { day: number } }) {
  switch (date.date.day) {
    case 4:
      return 'SUN'
    case 5:
      return 'MON'
    case 6:
      return 'TUE'
    case 7:
      return 'WED'
    case 8:
      return 'THU'
    case 9:
      return 'FRI'
    case 10:
      return 'SAT'
    default:
      return date.date.day
  }
}

