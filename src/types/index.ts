type DateInfo = {
  calendarId: number
  event: string
  eventDate: string
  uid: string
}

type myDateInfo = {
  cId: string
  myDate: string
}

interface meeting {
  name: string
  mId: number
  updateDate: string
  mainPicture: string
}

interface meetingDateInfo {
  name: string
  mId: number
  dates: string[]
}

interface meetingDetail {
  name: string
  description: string
  updateDate: Date
  createAuth: number
  adminAuth: number
  editAuth: number
  dateList: Date[]
  uid: number
  mid: number
}

interface CustomError extends Error {
  response?: {
    data: any
    status: number
    headers: string
  }
}
