import { ref } from "vue";
import { defineStore } from "pinia";
import { type userInfo, type tokenInfo } from "@/types/Default";
import api from "@/axios/api";


export const useUserStore = defineStore("user", () => {
  const tempUserInfo = ref({
    displayName: "",
    email: "",
    uid: "",
    accessToken: "",
    refreshToken: "",
    jwt: ""
  });
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
    tempUserInfo.value.accessToken = accessToken
    tempUserInfo.value.refreshToken = refreshToken
    tempUserInfo.value.jwt = jwt
    tempUserInfo.value.uid = uid
    loginType.value = type
  };
  

  return {
    tempUserInfo,
    userInfo,
    setUserInfo,
    setUserLogout,
    setTokenKaKao
  };
},{
  persist: true,
});