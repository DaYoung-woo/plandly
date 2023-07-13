<template>
  <header>
    <img :src="travelSample" alt="travelSample" class="cover_img"/>
    <img :src="iconBurger" alt="iconBurger" class="icon_burger"/>
    <div class="appointment_area">
      <div class="user-area">
        <div :class="`user-avartar ${open ? 'scroll' : ''}`">
          <q-avatar round size="58px" :class="`first ${open ? 'remove-transition' : ''}`">J</q-avatar>
          <q-avatar circle size="58px" :class="`second ${open ? 'remove-transition' : ''}`"></q-avatar>
          <q-avatar circle size="58px" :class="`third ${open ? 'remove-transition' : ''}`"></q-avatar>
          <q-avatar circle size="58px" color="green" :class="`${open ? 'remove-transition' : 'hidden'}`"></q-avatar>
          <q-avatar circle size="58px" color="red" :class="`${open ? 'remove-transition' : 'hidden'}`"></q-avatar>
          <q-avatar circle size="58px" :class="`plus-avartar ${open ? 'remove-transition' : ''}`" text-color="white" @click="open = !open">+</q-avatar>
        </div>
        
      </div>

      <div class="info-area">
        <h1 class="q-pt-sm">일본 이자카야 여행 민지랑💓</h1>
        <h6 class="q-pt-md">일본에서 민지랑 2박3일동안 이자카야 찾아다니기</h6>
      </div>
      
      <div class="calendar-area">
      <q-date
        v-model="date"
        multiple 
        class="date"
      />
    </div>
    </div>
  </header>
  <router-view />
</template>

<script lang="ts" setup>
import travelSample from "@/assets/img/travel_sample.svg"; 
import iconBurger from '@/assets/img/icon_burger.svg';
import {reactive, ref} from 'vue';

const open = ref(false)
const date = reactive([])
</script>

<style lang="scss" scoped>
header{
  height: 305px;
  .cover_img {
    width: 100%;
    height: 75px;
    object-fit: cover;
    border-radius: initial;
  }
  .icon_burger{
    position: fixed;
    top: 25px;
    right: 20px;
  }
  .appointment_area{
    height: 230px;
    border-radius: 0px 0px 22px 22px;
    border: 0.5px solid #8E8E8E;  
    margin-top: -6px;
    .user-area{
      height: 60px;
      margin: -26px 24px 0px;
      perspective: 600px;
      overflow: hidden;
      .user-avartar{
        overflow-x: scroll;
        .first{
          z-index: 3;
          background-color: #FFB0B0;
          transition: 0.3s;
        }
        .second{
          z-index: 2;
          transform: scale(0.7) translate(-50px, 8px);
          background-color: #B5DEB7;
          transition: 0.3s;
        }
        .third{
          transform: scale(0.65) translate(-120px, 10px);
          background-color: #DEB5D0;
          transition: 0.3s;
        }
      }
      .plus-avartar{
        background-color: #DEB5D0;
        transform: scale(0.65) translate(-140px, 12px);
        transition: 0.3s;
      }
      .remove-transition{
        transform: none !important;
        transition: 0.5s;
        margin-right: 10px;
      }
    }
  }
  .info-area{
    padding: 0px 20px;
  }
}
.scroll{
  display: flex;
  overflow: scroll;
}
</style>

<style lang="scss">
.calendar-area{
    .q-date{
      width: 100%;
      box-shadow: none;
      .q-date__header  {
        display: none !important;
      }
    }
  }</style>