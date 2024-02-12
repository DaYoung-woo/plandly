<template>
  <label>
    <div class="my-5 vote-option-box">
      <div class="img"></div>
      <div class="option-detail">
        <div>
          <p>1992 덮밥&짜글이 강남본점</p>
          항목에 대한 설명이 있다면 여기에
          <div class="flex items-center">
            <IconLocation class="mr-1" />
            <span>강남구 강남대로 84길 6 1층</span>
            <a href="#">구글 지도로 바로가기</a>
          </div>
        </div>

        <div class="checkbox-area">
          <input type="checkbox" />
        </div>
      </div>
    </div>
  </label>
</template>

<script setup lang="ts">
import IconLocation from '@/assets/img/common/icon_location.svg'
defineProps<{
  checkbox?: Boolean
}>()
</script>

<style lang="scss">
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
