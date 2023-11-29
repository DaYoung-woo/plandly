import axios from 'axios'
import { type userInfo, type meeingInfo } from '@/types/Default'
import { useUserStore } from '@/stores/user.js'

const instance = axios.create({
  baseURL: 'https://plandly-haeju-min.koyeb.app'
})

instance.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if (config.headers) {
    const { accessToken } = userStore.userInfo
    config.headers['Authorization'] = !!accessToken ? `Bearer ${accessToken}` : ''
  }
  return config
})

export default {
  login: (param: userInfo) => {
    return instance.post('/login', param)
  },
  kakaoLogin: (code: string) => {
    return instance.get(`/api/auth/ssoKakao?code=${code}`)
  },
  setEmail: (param: object) => {
    return instance.post(`/api/auth/update/userInfo`, param)
  },
  createMeeting: (param: FormData) => {
    return instance.post(`/api/create/meeting`, param, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
