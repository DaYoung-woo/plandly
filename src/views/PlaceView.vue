<template>
  <div>
    <q-input
      filled
      v-model="name"
      label="Your name *"
      lazy-rules
      style="width: 50%; padding-top: 20px; text-align: center; margin: 0 auto"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
let name = ref("");
</script>
<style lang=""></style>
