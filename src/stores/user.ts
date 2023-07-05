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
  const accessToken = ref("");
  const setUserInfo = (newUserInfo: userInfo) => {
    api.login(newUserInfo).then(() => {
      userInfo.value = newUserInfo;
    });
  };
  const setToken = (newToken: string) => {
    accessToken.value = newToken;
  };

  return {
    userInfo,
    accessToken,
    setUserInfo,
    setToken,
  };
});
