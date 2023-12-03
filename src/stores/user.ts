import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type userInfo } from '@/types/Default'
//import api from "@/axios/api";

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({
      displayName: '',
      email: '',
      uid: '',
      accessToken: '',
      refreshToken: '',
      jwt: '',
      expiryTime: 0
    })

    const setUserLogout = () => {
      userInfo.value = {
        displayName: '',
        email: '',
        uid: '',
        accessToken: '',
        refreshToken: '',
        jwt: '',
        expiryTime: 0
      }
    }

    const loginType = ref('')

    const setTokenKaKao = (
      { accessToken, refreshToken, jwt, uid, email, displayName, expiryTime }: userInfo,
      type: string
    ) => {
      userInfo.value.accessToken = accessToken
      userInfo.value.refreshToken = refreshToken
      userInfo.value.jwt = jwt
      userInfo.value.uid = uid
      userInfo.value.email = email
      userInfo.value.displayName = displayName
      userInfo.value.expiryTime = expiryTime
      loginType.value = type
    }

    const setEmailAndDisplayName = (email: string, displayName: string) => {
      userInfo.value.email = email
      userInfo.value.displayName = displayName
    }

    const refreshToken = (tokens: Pick<userInfo, 'accessToken' | 'refreshToken'>) => {
      userInfo.value.accessToken = tokens.accessToken
      userInfo.value.refreshToken = tokens.refreshToken
    }

    return {
      userInfo,
      setUserLogout,
      setTokenKaKao,
      setEmailAndDisplayName,
      refreshToken
    }
  },
  {
    persist: true
  }
)
