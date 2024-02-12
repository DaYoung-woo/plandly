<template>
  <div class="mt-20 mx-4 flex items-center justify-between">
    <h2>투표</h2>
    <IconMore />
  </div>

  <div class="no-data-box mt-5" v-if="!voteList.length">
    생성된 투표가 없습니다. 투표를 생성해보세요!
  </div>
  <div class="mt-5 vote-box active" v-else>
    <div class="flex justify-between">
      <h4 class="text-xl text-left">투표 타이틀</h4>
      <span class="font-green-info">7시간 남음</span>
    </div>

    <VoteOption />
    <VoteOption class="mt-5" />
    <VoteOption class="mt-5" />

    <div class="vote-submit-area">
      투표하기
    </div>
  </div>
</template>

<script setup lang="ts">
// 더보기 아이콘
import IconMore from '@/assets/img/common/icon_more.svg'
// 투표 옵션 컴포넌트
import VoteOption from '@/components/meeting/VoteOption.vue'

// props
defineProps<{
  voteList: Array<boolean>
}>()
</script>
