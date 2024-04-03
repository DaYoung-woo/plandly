<template>
  <!-- 페이지 네비게이션 -->
  <router-link :to="`/meeting/${meetingNo}`" class="path_navi mt-10">
    <IconArrowLeft class="mr-1" />투표
  </router-link>

  

  <!-- 게시판 폼 -->
  <form class="basic__form" action="" >
    <h2>새 투표 작성하기</h2>

    <p class="mt-2">투표명</p>
    <input type="text" placeholder="투표명 작성" class="basic__form_underline-input"/>

    <textarea
      type="text"
      class="basic__form_underline-input"
      placeholder="어떤 투표인지 설명해주세요"
    />

    <p>선택지 입력</p>
    <div class="flex-items-center">
      <input type="checkbox" id="text" /> <label for="text">텍스트</label>
      <input type="checkbox" id="date" /> <label for="date">날짜</label>
      <input type="checkbox" id="location" /><label for="location">장소</label>
    </div>

    <div class="mt-4">
      <input type="text" class="mt-2 vote_option_input" placeholder="항목 입력" v-for="item in voteOptions" :value="item"/>
      <button class="button__outline-full">
        + 항목 추가
      </button>
    </div>

    <div class="mt-10">
      <p class="mb-3">투표 추가 설정</p>
      <article v-for="item in voteTypes" :key="item.name">
        <input type="checkbox" :id="item.name" v-model="item.value"/>
        <label :for="item.name" class="bold">{{ item.title }}</label>
        <span v-if="item.value === item.descShowValue">{{ item.desc }}</span>
        <div v-if="item.name === 'autoFinish' && item.value">
          test
        </div>
      </article>
    </div>

    <button class="button__outline-full primary">
      + 항목 추가
    </button>
  </form>
</template>

<script setup lang="ts">
// < 아이콘
import IconArrowLeft from '@/assets/img/common/icon_arrow_left.svg'
import { ref } from 'vue';

// 라우터
import { useRoute } from 'vue-router'
const route = useRoute()

// param
const meetingNo = route.params.meetingNo as string

// 투표 선택지
const voteOptions = ref(['', ''])

// 투표 방식
const voteTypes = ref([{
  name: 'autoFinish',
  title: '자동 종료',
  desc: '전원이 투표하면 투표를 종료합니다.',
  value: false,
  descShowValue: false,
}, {
  name: 'anonym',
  title: '익명 투표',
  desc: '누가 투표했는지 공개하지 않습니다.',
  value: false,
  descShowValue: true,
}, {
  name: 'multi',
  title: '복수 선택',
  desc: '여러 개의 항목을 고를 수 있습니다.',
  value: false,
  descShowValue: true,
}, {
  name: 'selection',
  title: '선택항목 추가 허용',
  desc: '작성자가 아니라도 선택항목을 추가할 수 있습니다.',
  value: false,
  descShowValue: true,
}])

// 투표 마감일
const date = new Date();
console.log(date.getDate)
//const deadline = ref('')
</script>
