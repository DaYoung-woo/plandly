<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style lang="scss">
header {
  width: 100vw;
  height: 48px;
  border-bottom: 1px solid #9f9f9f;
  //position: fixed;
  //top: 0;
  //left:0;
  font-size: 16px;
}
nav {
  width: 295px;
  height: calc(100vh - 48px);
  border-right: 1px solid #9f9f9f;
  position: fixed;
  top: 48px;
  left: 0;
}
main {
  height: calc(100vh - 48px);
  width: 100vw;
  overflow-y: scroll;
}

@media (min-width: 1024px) {
  main {
    width: calc(100vw - 295px);
    position: fixed;
    top: 48px;
    left: 295px;
  }
}

h6 {
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
</style>
