<template>
  <div class="flex text-right justify-items-end justify-end mt-2">
    <button class="vfm-btn bg-slate-200 px-4 py-2 text-xs" @click="$emit('closeModal')">공유<br/>버튼</button>
    <button class="vfm-btn bg-slate-200 px-4 py-2 text-xs ml-2" @click="$emit('closeModal')">모임 전용 <br/> 메뉴</button>
  </div>

  <div>
    <h6 class="pt-5">모임 타이틀</h6>
    <div class="desc pt-1"> 모임에 대한 간단한 설명</div>
  </div>

  <div class="border mt-5 flex p-5 items-center justify-between">
    <div class="flex items-center">
      <div class="inline-block h-12 w-12 rounded-full ring-2 ring-slate-200 bg-slate-200 "/>
      <span class="text-xl pl-5">다음 모임: 5월 7일 - 5월 9일</span>
    </div>
    <button class="vfm-btn bg-slate-200 px-4 py-2 text-xs" @click="$emit('closeModal')">달력<br/>열기</button>
  </div>

  <div class="text-center">
    <BoardMain />
    <button class="border px-5 py-2 mt-5" @click="router.push('meeting/detail')">게시글 더보기</button>
    <VoteMain />
    <button class="border px-5 py-2 mt-5" @click="router.push('meeting/detail')">투표 더보기</button>
    <TimelineMain />
    <button class="border px-5 py-2 mt-5" @click="router.push('meeting/detail')">타임라인 더보기</button>
    <MemberMain />
    <button class="border px-5 py-2 mt-5" @click="router.push('meeting/detail')">멤버 모두 보기</button>
  </div>
 

</template>
    
<script setup lang='ts'>
  import BoardMain from '@/components/meeting/home/BoardMain.vue';
  import VoteMain from '@/components/meeting/home/MeetingMain.vue'
  import TimelineMain from '@/components/meeting/home/TimelineMain.vue';
  import MemberMain from '@/components/meeting/home/MemberMain.vue';

  import { useRouter } from "vue-router";
  const router = useRouter();

</script>
    
<style>    
.meeting-avartar{
  width: 100px;
  height: 100px;
  position: absolute;
  top: 150px;
  background-color: #ccc;
}</style>