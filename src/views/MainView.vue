<template>
  <div class="main-view">
    <h1>나의 여행리스트</h1>

    <q-card flat bordered class="travel-card">
        <img :src="travelSample" alt="travelSample"  />
        <div class="travel-info">
            <q-avatar color="blue" text-color="white" size="25px">J</q-avatar>
                <article>
                <p>iamwooda@naver.com</p>
                <span>iamwooda@naver.com</span>
            </article>
        </div>

    </q-card>
  </div>
</template>

<script setup lang="ts">
import travelSample from "@/assets/img/travel_sample.svg";
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
