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
      <q-page-container class="mt-10">
        <router-view />
      </q-page-container>
    <footer v-if="route.name !== 'login'">
      <q-btn
        square
        unelevated
        v-for="item in imgArr"
        style="width: 25%"
        @click="router.push(item.link)"
      >
        <img :src="item.img" alt="googloLogo"/>    
      </q-btn>
    </footer>
    </q-layout>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

import menu_icon1 from "@/assets/img/menu_icon1.svg";
import menu_icon2 from "@/assets/img/menu_icon2.svg";
import menu_icon3 from "@/assets/img/menu_icon3.svg";
import menu_icon4 from "@/assets/img/menu_icon4.svg";

const imgArr = [{
  img: menu_icon1,
  link: '/main'
}, {
  img: menu_icon2,
  link: '/calendar'
}, {
  img: menu_icon3,
  link: '/calendar'
}, {
  img: menu_icon4,
  link: '/calendar'
}]


</script>

<style lang="scss">
  header {
    height: 54px;
    padding: 12px;
    display: flex;
    position: fixed;
    background-color: #fff;
    width: 100%;
    z-index: 1;
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
  footer{
    height: 50px;
    background-color: #F8F8F8;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 1;
    display: flex;
  }
</style>
