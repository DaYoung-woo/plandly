<template>
  <PageLoading width="60px" />
</template>

<script setup lang="ts">
import PageLoading from '@/components/common/PageLoading.vue'
import { kakaoLogin } from '@/axios/api'

// 라우터
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

//스토어
import { useUserStore } from '@/stores/user.js'
const store = useUserStore()

// mount
import { onMounted } from 'vue'
onMounted(() => {
  if (!route.query.code) return
  loginWithKakao()
})

// param
const state = route.query.state as string

// 토큰 세팅
const loginWithKakao = () => {
  const { code } = route.query
  kakaoLogin(String(code))
    .then(({ data }) => {
      // 카카오토큰 관련 정보 세팅
      const { email, displayName } = data
      store.setTokenKaKao(data, 'kakao')

      if (!email || !displayName) router.push(`login_setting?state=${state}`)
      else {
        if (state) router.push(`meeting/${state}`)
        else router.push('home')
      }
    })
    .catch((e) => {
      alert(e)
    })
}
</script>
