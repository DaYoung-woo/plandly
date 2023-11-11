<template>
    <div class="login" >
      <div class="logo-area">
        <img :src="logo" lt="planLogo" />
        <p>
          PLANDLY<br />
          시작하기
        </p>
      </div>
  
      <pre class="q-mb-lg">간단한 계정 연동으로 바로 시작해보세요!</pre>
  
      <div class="btn-area flex column q-mt-lg">
        <button
          color="dark"
          class="items-start google"
          @click="googleLogin"
        >
          <img :src="googloLogo" alt="googloLogo" />
          <span class="q-pr-xl">구글로 로그인</span>
        </button>


        <a id="kakao-login-btn" href="javascript:loginWithKakao()">
          <img src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" width="222"
            alt="카카오 로그인 버튼" />
        </a>
  
        <button
          color="indigo"
          class="q-pl-xs q-mt-sm items-start naver"
        >
          <img :src="naverLogo" alt="naverLogo"  />
          <span >네이버로 로그인</span>
        </button>
      </div>
  
      <pre class="text-body2 q-pt-lg">로그인에 문제가 있으신가요?</pre>
    </div>
  

  </template>
  
  <script setup lang="ts">
  import logo from "@/assets/img/logo.png";
  import googloLogo from "@/assets/img/google_login_logo.svg";
  import kakaoLogo from "@/assets/img/kakao_login_logo.svg";
  import naverLogo from "@/assets/img/naver_login_logo.svg";
  
  import { auth, provider } from "@/assets/js/firebase";
  import {
    getRedirectResult,
    signInWithPopup,
    signInWithRedirect,
  } from "firebase/auth";
  import { ref, onMounted } from "vue";
  import { GoogleAuthProvider, getAuth } from "firebase/auth";
  
  import { useUserStore } from "@/stores/user.js";
  const store = useUserStore();
  
  import { useRouter } from "vue-router";
  const router = useRouter();
  
  onMounted(() => {});
  
  const googleLogin = () => {
    signInWithRedirect(auth, provider)
  };
  const loading = ref(false);
  
  getRedirectResult(getAuth()).then((result) => {
    if (result) {
      const { displayName, email, uid, metadata } = result.user;
      const userInfo = {
        displayName: displayName ?? "",
        email: email ?? "",
        uid,
        createdAt: metadata.creationTime,
      };
      loading.value = true;
      store.setUserInfo(userInfo);
  
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      store.setToken(token ?? "" , "google");
  
      router.push('/');
    }
  });

  </script>
  
  <style lang="scss">
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    flex-direction: column;
    .logo-area {
      text-align: center;
      img {
        object-fit: none;
      }
      p {
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 35px;
        text-align: center;
        margin-bottom: 0px;
      }
    }
    pre {
      font-weight: 400;
      font-size: 15px;
      line-height: 22px;
      text-align: center;
      color: #a1a1a1;
      margin-top: 10px;
    }
    button.google {
      background-color: #4285f4 !important;
    }
    button.kakao {
      background-color: #fee500 !important;
    }
    button.naver {
      background-color: #03c75a !important;
    }
    button {
      color: #000000 !important;
    }
    .text-body2 {
      font-size: 13px;
    }
  }
  </style>