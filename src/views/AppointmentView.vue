<template>
  <header>
    <img :src="travelSample" alt="travelSample" class="cover_img"/>
    
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
        <div class="title">
          <h1>일본 이자카야 여행 민지랑💓</h1>
          <img :src="iconBurger" alt="iconBurger" class="icon_burger"/>
        </div>
        
        <h6 class="q-pt-md">일본에서 민지랑 2박3일동안 이자카야 찾아다니기</h6>
      </div>
    </div>
  </header>
  <div class="calendar-area">
        <div class="calendar-header"> {{ dayjs(selectionDate).format("YYYY.MM") }}</div>
        <div class="calendar-summary">
          <div class="calendar-tile">
            <div class="day">SUN</div>
            <div>24</div>
          </div>
          <div class="calendar-tile">MON</div>
          <div class="calendar-tile">TUE</div>
          <div class="calendar-tile">WED</div>
          <div class="calendar-tile">THU</div>
          <div class="calendar-tile">FRI</div>
          <div class="calendar-tile">SAT</div>
        </div>
      </div>
  <router-view />
</template>

<script lang="ts" setup>
import travelSample from "@/assets/img/travel_sample.svg"; 
import iconBurger from '@/assets/img/icon_burger.svg';
import { useDate } from 'vue3-dayjs-plugin/useDate';
import {onMounted, ref} from 'vue';

const open = ref(false);
const dayjs = useDate();
const selectionDate = new Date()

onMounted(() => {
  console.log(dayjs().get('d'))
})
</script>

<style lang="scss" scoped>
header{
  height: 213px;
  .cover_img {
    width: 100%;
    height: 75px;
    object-fit: cover;
    border-radius: initial;
  }
  .title{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .icon_burger{
    height: 18px;
    //filter: invert(0%) sepia(3%) saturate(0%) hue-rotate(314deg) brightness(96%) contrast(100%);
    //filter: invert(0%) sepia(99%) saturate(7429%) hue-rotate(319deg) brightness(83%) contrast(102%);
    filter: invert(0%) sepia(18%) saturate(7496%) hue-rotate(266deg) brightness(101%) contrast(97%);
  }
  .appointment_area{
    height: 161px;
    border-bottom: 0.5px solid #8E8E8E;  
    margin-top: -6px;
    .user-area{
      height: 60px;
      margin: -40px 24px 0px;
      perspective: 600px;
      overflow: hidden;
      .user-avartar{
        //overflow-x: scroll;
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
    h1{
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
    h6{
      padding-top: 4px;
      font-size: 14px;
    }
  }
}
.scroll{
  display: flex;
  overflow-x: scroll;
}
.calendar-area{
  width: 100%;
  text-align: center;
  padding-top: 23px;
  margin: 0 auto;
  .calendar-summary{
    width: 100%;
    display: flex;
    font-size: 14px;
    padding-top: 12px;
    .calendar-tile{
      width: 14.2%;
      .day{
        font-size: 8px;
      }
      .number{
        font-size: 14px;
      }
    }
    .calendar-tile:first-child{
      .day{
        color:red;
      }
      
    }
    .calendar-tile:last-child{
      .day{
        color: #0035F0;
      }
      
    }
  }
}
</style>