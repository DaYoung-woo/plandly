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

// 모임 가입 여부 체크 API
export const meetingInvitingCheck = (mid: string, uid: string) => {
  return instance.get(`/api/auth/meeting/invite/${mid}/${uid}`)
}

// 모임 가입 API
export const meetingInviting = (param: meetingInviteParam) => {
  return instance.post(`/api/inviteMeeting`, param)
}

// 내 모임 목록 조회 API
export const meetingList = (uid: string, startNo: number, pageSize: number) => {
  return instance.get(`/api/myMeeting/list/${uid}?startNo=${startNo}&pageSize=${pageSize}`)
}
