import dayjs from 'dayjs'

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

// 캘린더 제목
export function titleFormat (date: { date: { year: number; month: number } }) {
  return `${date.date.year}.${
    String(date.date.month + 1).length === 1 ? `0${date.date.month + 1}` : date.date.month + 1
  }`
}
// 게시글 올린 시간 비교
export function calculateDate(date: Date) {
  if (dayjs(date).diff(dayjs(), "year") < 0) {
    return `${dayjs(date).diff(dayjs(), "year") * -1}년 전`;
  } else if (dayjs(date).diff(dayjs(), "month") < 0) {
    return `${dayjs(date).diff(dayjs(), "month") * -1}달 전`;
  } else if (dayjs(date).diff(dayjs(), "day") < 0) {
    return `${dayjs(date).diff(dayjs(), "day") * -1}일 전`;
  } else if (dayjs(date).diff(dayjs(), "hour") < 0) {
    return `${dayjs(date).diff(dayjs(), "hour") * -1}시간 전`;
  } else if (dayjs(date).diff(dayjs(), "minute") < 0) {
    return `${dayjs(date).diff(dayjs(), "minute") * -1}분 전`;
  } else if (dayjs(date).diff(dayjs(), "second") < 0) {
    return `${dayjs(date).diff(dayjs(), "second") * -1}초 전`;
  }
}

//date 기본 format
export function getBasicDateFormat(voteEndDate: Date | string) {
  return dayjs(voteEndDate).format("YYYY년 MM월 DD일 HH:mm")
}

