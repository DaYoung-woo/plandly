import { type userInfo, type meeingInfo, type meetingParam } from '@/types/Default'
import instance from '@/axios/Axios'
import type { createVoteType } from '@/types/Vote'

export const login = (param: userInfo) => {
  return instance.post('/login', param)
}

// 카카오 로그인 API
export const kakaoLogin = (code: string) => {
  return instance.get(`/api/auth/ssoKakao?code=${code}`)
}

// 이메일 설정 API
export const setEmail = (param: object) => {
  return instance.post(`/api/auth/update/userInfo`, param)
}

// 모임 생성 API
export const createMeeting = (param: FormData) => {
  return instance.post(`/api/create/meeting`, param, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

//토큰 갱신 API
export const tokenRefresh = (param: Pick<userInfo, 'accessToken' | 'refreshToken'>) => {
  return instance.post(`/api/auth/refresh`, param)
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

// 새모임 생성
export const createVote = (param: createVoteType) => {
  return instance.post(`/api/add/vote`, param)
}

// 투표 항목 등록 
export const createVoteOption = (param: createVoteType) => {
  return instance.post(`/api/add/vote`, param)
}

// 캘린더 내 일정 조회
export const getMyCalendar = (param: myCalendarParam) => {
  return instance.post(`/api/myCalendar`, param)
}