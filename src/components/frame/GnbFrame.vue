<template>
  <header class="flex items-center justify-between p-4">
    <div class="logo" @click="router.push('/')">PLANDLY</div>
    <div class="flex items-center">
      <div class="inline-block h-10 w-10 rounded-full bg-slate-100 text-xs text-center pt-3">
        사용자
      </div>
      <button class="rounded-full bg-slate-100 ml-3 p-2 text-sm" @click="showModal = true">
        새 모임 만들기
      </button>
      <button class="bg-slate-100 ml-3 p-2 text-sm" @click="logout()">로그아웃</button>
    </div>
    <CreateModal v-if="showModal" @closeModal="closeModal" />
  </header>
</template>

<script setup lang="ts">
import CreateModal from '../meeting/CreateModal.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.js'

const showModal = ref(false)
const closeModal = () => {
  showModal.value = false
}

const router = useRouter()
const store = useUserStore()

const logout = () => {
  store.setUserLogout()
  router.push('login')
}
</script>
<style>
.logo {
  cursor: pointer;
}
</style>
