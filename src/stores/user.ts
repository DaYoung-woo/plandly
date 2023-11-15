import { ref } from "vue";
import { defineStore } from "pinia";
import { type userInfo } from "@/types/Default";
import api from "@/axios/api";


export const useUserStore = defineStore("user", () => {
  const userInfo = ref({
    displayName: "",
    email: "",
    uid: "",
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
      }
    })
  };
  const setUserLogout = () => {
    userInfo.value = {
      displayName: "",
      email: "",
      uid: "",
    }
    accessToken.value = ''
    jwt.value = ''
  };

  const accessToken = ref("");
  const jwt = ref("");
  const loginType = ref("")
  const setToken = (newToken: string, type: string) => {
    accessToken.value = newToken;
    loginType.value = type
  };
  

  return {
    userInfo,
    accessToken,
    setUserInfo,
    setToken,
    setUserLogout,
    jwt
  };
},{
  persist: true,
});