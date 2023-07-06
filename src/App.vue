<template>
  <div id="app">
    <q-layout>
      <header v-if="route.name !== 'login'">
        <q-avatar color="red" text-color="white" rounded size="30px">J</q-avatar>
        <article>
          <p>iamwooda@naver.com</p>
          <span>iamwooda@naver.com</span>
        </article>
      </header>
      <q-page-container>
        <router-view />
      </q-page-container>
    <footer></footer>
    </q-layout>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style lang="scss">
  header {
    height: 54px;
    padding: 12px;
    display: flex;
    article{
      padding-top: 5px;
      padding-left:11px;
      p{
        color: #000;
        font-size: 11px;
        font-weight: 400;
        margin-bottom: 0;
        line-height: 5px;
      }
      span{
        color: #949494;
        font-size: 8px;
        font-weight: 400;
      }
    }
  }
</style>
