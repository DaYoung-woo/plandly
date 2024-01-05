import axios from 'axios'
import { useUserStore } from '@/stores/user.js'
import { useRouter } from 'vue-router'
import { tokenRefresh } from '@/axios/api'
const instance = axios.create({
  baseURL: 'https://plandly-haeju-min.koyeb.app'
})

instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (config.headers) {
      const { accessToken } = userStore.userInfo
      if (!accessToken && !config.url?.includes('/api/auth/ssoKakao')) {
        window.location.href = '/login'
        return config
      }
      config.headers['Authorization'] = !!accessToken ? `Bearer ${accessToken}` : ''
    }
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

// api 통신간 토큰 만료시 토큰 갱신 로직
let isRefreshing = false
let pengingQueue = []

const processQueue = (error, token = null) => {
  pengingQueue.forEach((prom) => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  pengingQueue = []
}

instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        if (error.response.status === 401 && isRefreshing) {
          const userStore = useUserStore()
          userStore.setUserLogout()
          const router = useRouter()
          router.push('login')
        }
        return new Promise((resolve, reject) => {
          pengingQueue.push({ resolve, reject })
        })
          .then(() => {
            return axios(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }
      originalRequest._retry = true
      isRefreshing = true
      return new Promise(function (resolve, reject) {
        const userStore = useUserStore()

        const { accessToken, refreshToken } = userStore.userInfo
        const param = { accessToken, refreshToken }
        tokenRefresh(param)
          .then(({ data }) => {
            userStore.refreshToken(data)
            originalRequest.headers.Authorization = `Bearer ${userStore.userInfo.accessToken}`
            processQueue(null, `Bearer ${userStore.userInfo.accessToken}`)
            resolve(axios(originalRequest))
          })
          .catch((e) => {
            // 오류가 생긴경우8*87-
            alert(e.response)
            const userStore = useUserStore()
            userStore.setUserLogout()
            const router = useRouter()
            router.push('login')
            processQueue(e, null)
            reject(e)
          })
          .finally(() => {
            isRefreshing = false
          })
      })
    }
    return Promise.reject(error)
  }
)

export default instance
