// 타입
type DateInfo = {
  calendarId: number
  event: string
  eventDate: string
  uid: string
}

type meetingInfo = {
  name: string
  mId: number
}

type myDateInfo = {
  cId: string
  myDate: string
}

interface meeting extends meetingInfo {
  updateDate: string
  mainPicture: string
}

interface meetingDetail extends meetingInfo {
  dates: string[]
}
