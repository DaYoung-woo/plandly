<template>
  <div class="mt-20 mx-4 flex items-center justify-between mb-3">
    <h2>멤버</h2>
    <IconMore class="rotate-180"/>
  </div>
  <hr />

  <div class="no-data-box mt-5 py-12" v-if="!memberList.length">
    멤버가 없습니다. 멤버를 초대해보세요!
    <button class="rounded-full bg-main text-white ml-3 px-6 py-2 text-sm mt-4">멤버 초대</button>
  </div>
  <article class="grid grid-cols-2 pt-4" v-else>
    <MemberProfile class="pt-4 px-4"/>
    <MemberProfile class="pt-4 px-4"/>
    <MemberProfile class="pt-4 px-4"/>
  </article>
</template>

<script setup lang="ts">
// 멤버 프로필
import MemberProfile from '@/components/common/MemberProfile.vue'
// 더보기 아이콘
import IconMore from '@/assets/img/common/icon_arrow_left.svg'

// props
defineProps<{
  memberList: Array<boolean>
}>()
</script>

<style></style>
