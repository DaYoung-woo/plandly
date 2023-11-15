import axios from "axios";
import { type userInfo } from "@/types/Default";

const instance = axios.create({
  baseURL: "https://plandly-haeju-min.koyeb.app",
});


export default {
  login: (param: userInfo) => {
    return instance.post("/login", param);
  },
  kakaoLogin: (code: string) => {
    return instance.get(`/api/auth/ssoKakao?code=${code}`)
  },
  setEmail: (param: object) => {
    return instance.post(`/api/auth/update/userInfo`, param)
  }
};