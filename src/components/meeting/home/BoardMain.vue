<template>
  <div class="mt-20 mx-4 flex items-center justify-between">
    <h2>게시판</h2>
    <IconMore />
  </div>
  <div class="mt-5 p-5 board-box">
    <div class="board-area">
      <div>
        <h4>공지 타이틀</h4>
        <span> 조사를 한번 해봤는데 카드를 배치하면 너무 예쁘더라구요ㅎㅎ </span>
      </div>
      <div class="img"></div>
    </div>
    <div class="user-area">
      <div class="user-info">
        <div class="profile"></div>
        <div class="text ml-1">
          <div>이준아</div>
          <span>16시간 전</span>
        </div>
      </div>
      <button class="chat-btn mt-2"><IconChat /> <span>0</span></button>
    </div>
  </div>
</template>

<script setup lang="ts">
// 더보기 아이콘
import IconMore from '@/assets/img/common/icon_more.svg'
// 채팅 아이콘
import IconChat from '@/assets/img/common/icon_chat.svg'
</script>
