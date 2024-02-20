import { type userInfo, type meeingInfo } from '@/types/Default'
import instance from '@/axios/Axios'

export const login = (param: userInfo) => {
  return instance.post('/login', param)
}
export const kakaoLogin = (code: string) => {
  return instance.get(`/api/auth/ssoKakao?code=${code}`)
}
export const setEmail = (param: object) => {
  return instance.post(`/api/auth/update/userInfo`, param)
}
export const createMeeting = (param: FormData) => {
  return instance.post(`/api/create/meeting`, param, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
//토큰 갱신 API
//https://www.notion.so/API-8346fc26cffa49eea7af0ab2926e69f9
export const tokenRefresh = (param: Pick<userInfo, 'accessToken' | 'refreshToken'>) => {
  return instance.post(`/api/auth/refresh`, param)
}

type meetingParam = {
  mid: string
  uid: string
}

// 모임 홈 화면 - 모임 정보 조회 API
export const getMeetingInfo = (param: meetingParam) => {
  return instance.post(`/api/meeting/userDate`, param)
}
