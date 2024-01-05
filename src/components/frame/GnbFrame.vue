<template>
  <header class="flex items-center justify-between md:px-8 sm:px-4">
    <div class="logo" @click="router.push('/')">
      <img :src="logo" class="pt-3 pb-3" />
    </div>
    <div class="flex items-center">
      <button
        class="rounded-full bg-main text-white ml-3 md:px-6 md:py-2 text-sm"
        @click="showModal = true"
      >
        새 모임 만들기
      </button>
      <button class="rounded-full border border-gray ml-2 px-6 py-2 text-sm" @click="logout()">
        로그아웃
      </button>
    </div>
    <CreateModal v-if="showModal" @closeModal="closeModal" />
  </header>
</template>

<script setup lang="ts">
import CreateModal from '../meeting/CreateModal.vue'
import logo from '@/assets/img/logo.svg'
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
