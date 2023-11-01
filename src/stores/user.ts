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
    });
  };

  const accessToken = ref("");
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
  };
},{
  persist: true,
});