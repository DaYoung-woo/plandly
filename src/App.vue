<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style lang="scss">
header {
  width: 100vw;
  height: 54px;
  border-bottom: 1px solid #cacaca;
  font-size: 16px;
}
nav {
  width: 295px;
  height: calc(100vh - 54px);
  border-right: 1px solid #cacaca;
  position: fixed;
  top: 54px;
  left: 0;
}
main {
  height: calc(100vh - 54px);
  width: 100vw;
  overflow-y: scroll;
}

@media (min-width: 1024px) {
  main {
    width: calc(100vw - 295px);
    position: fixed;
    top: 54px;
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
