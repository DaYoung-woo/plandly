<template>
  <div class="login">
    <div class="login-logo-area">
      <Logo />
      <p>시작하기</p>
      <pre>플랜들리. 모임을 더 편하게 관리하세요.</pre>
    </div>

    <div class="btn-area w-full">
      <a
        href="https://kauth.kakao.com/oauth/authorize?client_id=40fd2744b02c2e3bb1e4a8ab990e6c3e&redirect_uri=plandly.netlify.app/sso&response_type=code&state=0000"
        class="flex items-center w-full kakao h-12 rounded-md px-3"
      >
        <img :src="kakaoLogo" alt="KakaoLogo"/>
        <div class="button-font">카카오로 시작하기</div>
      </a>

      <a
        href="https://kauth.kakao.com/oauth/authorize?client_id=40fd2744b02c2e3bb1e4a8ab990e6c3e&redirect_uri=plandly.netlify.app/sso&response_type=code"
        class="flex items-center w-full google h-12 rounded-md px-3 mt-5"
      >
        <img :src="googleLogo" alt="GoogleLogo"/>
        <div class="button-font">구글로 시작하기</div>
      </a>

      <a
        href="https://kauth.kakao.com/oauth/authorize?client_id=40fd2744b02c2e3bb1e4a8ab990e6c3e&redirect_uri=plandly.netlify.app/sso&response_type=code"
        class="flex items-center w-full naver h-12 rounded-md px-3 mt-5"
      >
        <img :src="naverLogo" alt="NaverLogo"/>
        <div class="button-font">네이버로 시작하기</div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/assets/img/common/logo.svg'
import kakaoLogo from '@/assets/img/login/kakao_logo.svg?url'
import googleLogo from '@/assets/img/login/google_logo.svg?url'
import naverLogo from '@/assets/img/login/naver_logo.svg?url'
</script>

<style lang="scss" scoped>
.btn-area {
  .button-font {
    width: 100%;
    padding-right: 31px;
    text-align: center;
  }
  a {
    border-radius: 5px;
  }
  .kakao {
    background-color: #fee500;
  }
  .google {
    background-color: #4285f4;
    color: #eee;
  }
  .naver {
    background-color: #03c75a;
  }
}
</style>
