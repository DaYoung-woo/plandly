<template>
  <div :class="`${isBlack && 'modal-back'} h-full`">
    <div class="flex items-center h-full w-full justify-center flex-col">
      <div class="droplet_spinner">
        <div class="droplet"></div>
        <div class="droplet"></div>
        <div class="droplet"></div>
      </div>
      <img :src="logoIcon" alt="logoIcon" :style="width ? `width: ${width}`: ''"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import logoIcon from '@/assets/img/logo_icon.svg?url'

defineProps<{
  isBlack?: Boolean
  width?: String
}>()
</script>

<style>
.modal-back {
  height: 100vh;
}
.droplet_spinner {
  display: flex;
  justify-content: center;
}
.droplet_spinner .droplet {
  width: 12px;
  height: 12px;
  margin: 0 5px;
  background-color: #fcc644;
  border-radius: 50%;
  transform-origin: center bottom;
  animation: bounce 1.2s cubic-bezier(0.3, 0.01, 0.4, 1) infinite;
}
.droplet_spinner .droplet:nth-child(1) {
  animation-delay: -0.4s;
}
.droplet_spinner .droplet:nth-child(2) {
  animation-delay: -0.2s;
}
.droplet_spinner .droplet:nth-child(3) {
  animation-delay: 0s;
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(-20px);
  }
  50% {
    transform: translateY(-35px);
  }
}
</style>
