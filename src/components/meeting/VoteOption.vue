<template>
  <label>
    <div class="mt-2 mb-5 option-box">
      <div class="flex items-center justify-between">
        <div class="bg-slate-200 w-20 h-20 flex items-center justify-center text-sm">이미지</div>
        <div class="meeting-home-detail">
          <p>1992 덮밥&짜글이 강남본점</p>
          항목에 대한 설명이 있다면 여기에
          <div class="location">
            <span class="flex">
              <img :src="iconLocation" alt="iconLocation" />
              강남구 강남대로 84길 6 1층
            </span>
            <a href="#">구글 지도로 바로가기</a>
          </div>
        </div>
      </div>
      <div class="checkbox-area" v-if="checkbox">
        <input type="radio" class="checked:bg-blue-500" />
      </div>
      <div class="count-area" v-else>3/5</div>
    </div>
  </label>
</template>

<script setup lang="ts">
import iconLocation from '@/assets/img/common/icon_location.svg'
defineProps<{
  checkbox?: Boolean
}>()
</script>

<style lang="scss">
.vote-box {
  padding: 20px;
  .option-box {
    display: flex;
    height: 70px;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 4px;
    .checkbox-area {
      width: 30px;
    }
  }
}
.meeting-home-detail {
  padding: 5px;
  text-align: left;
  font-size: 8px;
  padding-left: 10px;
  p {
    font-size: 14px;
    line-height: normal;
  }
  .location {
    margin-top: 5px;
    display: flex;
    align-items: center;
    span {
      background-color: #eee;
      margin-right: 5px;
      img {
        margin-right: 2px;
      }
    }
    a {
      background-color: #eee;
    }
  }
}
</style>
