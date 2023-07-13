<template>
  <div class="main-view">
    <h1>나의 여행리스트</h1>

    <q-card flat bordered class="travel-card" @click="router.push({path: 'appointment/1'})">
      <img :src="travelSample" alt="travelSample"  />
      <div class="travel-info">
        <q-avatar color="blue" text-color="white" size="25px">J</q-avatar>
        <article >
          <p>JUNA의 여행 시작하기!</p>
          <span><img :src="iconLocation" alt="travelSample" style="height:7px; width: 5px; margin-right: 2px;" />도쿄 나리타 항공 · 50분 전에 수정됨</span>
        </article>
      </div>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import travelSample from "@/assets/img/travel_sample.svg"; 
import iconLocation from "@/assets/img/icon_location.svg";
import { onMounted } from 'vue';
import { useUserStore } from "@/stores/user.js";
const store = useUserStore();
  
import { useRouter } from "vue-router";
const router = useRouter();

onMounted(() => {
  if(!store.accessToken || !store.userInfo ) router.push({name: "login"});
})
</script>

<style lang="scss">
    .main-view{
        padding:12px;
        h1{
            font-weight: 700;
            font-size: 18px;
            line-height: normal;
        }
        .travel-card{
            height: 237px;
            padding: 0;
            img{
                width: 100%;
                height: 190px;
                object-fit: cover;
                border-radius: initial;
            }
            .travel-info{
                display: flex;
                padding: 10px;
                article{
                    padding-top: 3px;
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
        }
        
    }
</style>
