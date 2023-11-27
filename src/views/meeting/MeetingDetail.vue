<template>
  <div class="tab-area">
    <div class="tab-div">
      <span @click="changeTab(0)">타임라인</span>
      <span @click="changeTab(1)">게시판</span>
      <span @click="changeTab(2)">투표</span>
      <span @click="changeTab(3)">멤버</span>
      <span @click="changeTab(4)">앨범</span>
    </div>
    <div>
      <button class="w-12 h-12">공유</button>
      <button class="w-28 h-12" v-if="activeIdx === 0">게시글 생성</button>
      <button class="w-28 h-12" v-if="activeIdx === 1">새게시글 추가</button>
      <button class="w-28 h-12" v-if="activeIdx === 2">새멤버 추가</button>
    </div>
  </div>
  <hr class="tab-border" id="tab-border" />

  <div>
    <TiemlineTab v-if="activeIdx === 0" />
    <BoardTab v-if="activeIdx === 1" />
    <VoteTab v-if="activeIdx === 2" />
    <MemberTab v-if="activeIdx === 3" />
    <AlbumTab v-if="activeIdx === 4" />
  </div>
</template>

<script setup lang="ts">
import TiemlineTab from '@/components/meeting/tabs/TimelineTab.vue'
import MemberTab from '@/components/meeting/tabs/MemberTab.vue'
import AlbumTab from '@/components/meeting/tabs/AlbumTab.vue'
import VoteTab from '@/components/meeting/tabs/VoteTab.vue'
import BoardTab from '@/components/meeting/tabs/BoardTab.vue'
import { ref } from 'vue'

const activeIdx = ref(0)

const changeTab = (order: number) => {
  activeIdx.value = order
  // active 바 위치 변경
  const tabActive = document.querySelector('.tab-border') as HTMLElement
  tabActive.style.marginLeft = `${order * 80}px`

  // 모든 탭에서 active 삭제
  document.querySelectorAll(`.tab-div > span`).forEach((el) => {
    el.classList.remove('active')
  })

  // 현재 활성화시킬 탭에 active 클래스 추가
  const tabItem = document.querySelector(`.tab-div :nth-child(${order + 1})`) as HTMLElement
  tabItem.classList.add('active')
}
</script>

<style lang="scss">
.tab-area {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  align-items: flex-end;
  .tab-div {
    margin-top: 20px;
    height: 50px;
    display: flex;
    align-items: center;
    span {
      text-align: center;
      width: 80px;
      cursor: pointer;
    }
    span:hover {
      color: #d0d;
    }
    span.active {
      color: #d00;
    }
  }
}

.tab-border {
  width: 80px;
  margin-top: -1.3px;
  border: 1.2px solid #d00;
  transition: all 0.5s;
}
</style>
