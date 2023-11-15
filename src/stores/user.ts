import { ref } from "vue";
import { defineStore } from "pinia";
import { type userInfo, type tokenInfo } from "@/types/Default";
import api from "@/axios/api";


export const useUserStore = defineStore("user", () => {
  const userInfo = ref({
    displayName: "",
    email: "",
    uid: "",
    accessToken: "",
    refreshToken: "",
    jwt: ""
  });
  const setUserInfo = (newUserInfo: userInfo) => {
    api.login(newUserInfo).then(() => {
      userInfo.value = newUserInfo;
    })
    .catch(() => {
      userInfo.value = {
        displayName: "",
        email: "",
        uid: "",
        accessToken: "",
        refreshToken: "",
        jwt: ""
      }
    })
  };
  const setUserLogout = () => {
    userInfo.value = {
      displayName: "",
      email: "",
      uid: "",
      accessToken: "",
      refreshToken: "",
      jwt: ""
    }
  };

  const loginType = ref("")


  
  const setTokenKaKao = ({accessToken, refreshToken, jwt, uid}: tokenInfo, type: string) => {
    userInfo.value.accessToken = accessToken
    userInfo.value.refreshToken = refreshToken
    userInfo.value.jwt = jwt
    userInfo.value.uid = uid
    loginType.value = type
  };
  

  return {
    userInfo,
    setUserInfo,
    setUserLogout,
    setTokenKaKao
  };
},{
  persist: true,
});