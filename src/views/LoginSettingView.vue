<template>
  <div class="login">
    <div class="login-logo-area">
      <IconLogo />
      <p>시작하기</p>
    </div>

    <div class="login-setting w-full">
      <p>이메일을 입력해주세요</p>
      <input
        type="text"
        name="email"
        class="border border-slate-300 w-full py-1 px-3 mt-1 rounded-md h-12 mb-8"
        placeholder="이메일 입력"
        v-model="email"
      />

      <p>닉네임을 입력해주세요</p>
      <input
        type="text"
        name="email"
        class="border border-slate-300 w-full py-1 px-3 mt-1 rounded-md h-12 mb-8"
        placeholder="닉네임 입력"
        v-model="displayName"
      />

      <button class="p-2 text-sm w-full h-12" @click="saveEmail" :disabled="!email || !displayName">
        <span>기본정보 설정하기</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconLogo from '@/assets/img/common/logo.svg'
import { ref } from 'vue'
import { setEmail } from '@/axios/api'
import { useUserStore } from '@/stores/user.js'
import { useRoute, useRouter } from 'vue-router'

// 스토어
const store = useUserStore()
// 라우터
const router = useRouter()
const route = useRoute()

// 이메일
const email = ref('')
// 닉네임
const displayName = ref('')

// param
const state = route.query.state as string

const saveEmail = () => {
  const param = {
    email: email.value,
    displayName: displayName.value,
    uid: store.userInfo.uid
  }

  setEmail(param)
    .then(({ data }) => {
      if (data.code === 0) {
        store.setTokenKaKao(data, 'kakao')
        store.setEmailAndDisplayName(email.value, displayName.value)
        if (state) router.push(`meeting/${state}`)
        else router.push('home')
      }
    })
    .catch((e) => {
      if (e.response.status === 400) {
        if (e.response.data.code === 2) alert('이미 사용되고 있는 email입니다.')
        else alert('에러가 발생했습니다.')
      } else {
        alert('에러가 발생했습니다.')
      }
    })
}
</script>

<style lang="scss" scoped>
.login-setting {
  p {
    font-family: Noto Sans;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  input {
    font-family: Noto Sans;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  button {
    border-radius: 5px;
    background: #00785b;
    color: #fff;
  }
}
</style>
