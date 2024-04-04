type DateInfo = {
  calendarId: number
  event: string
  eventDate: string
  uid: string
}

type myDateInfo = {
  cid: string
  myDate: string
}

interface apiResponse {
  code: number
  message: string
}
interface meeting {
  name: string
  mid: number
  updateDate: string
  mainPicture: string
}

interface meetingDateInfo {
  name: string
  mid: number
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

interface meetingAuth extends apiResponse {
  password: 'Y' | 'N'
}

interface meetingInviteParam {
  uid: string
  state: string
  password?: string
}
