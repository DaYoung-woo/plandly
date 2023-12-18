<template>
  <div>test</div>
</template>

<script setup lang="ts">
import api from '@/axios/api'

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()

import { useUserStore } from '@/stores/user.js'
const store = useUserStore()
import { onMounted } from 'vue'
onMounted(() => {
  if (!route.query.code) return
  kakaoLogin()
})
const router = useRouter()

const kakaoLogin = () => {
  const { code } = route.query
  api
    .kakaoLogin(String(code))
    .then(({ data }) => {
      store.setTokenKaKao(data, 'kakao')
      const { email, displayName } = data

      if (!email || !displayName) router.push('login_setting')
      else return router.push('home')
    })
    .catch((e) => {
      alert(e)
    })
}
</script>

<style></style>
