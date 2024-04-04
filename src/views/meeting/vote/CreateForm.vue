<template>
  <!-- 페이지 네비게이션 -->
  <router-link :to="`/meeting/${meetingNo}`" class="path_navi mt-10">
    <IconArrowLeft class="mr-1" />투표
  </router-link>

  

  <!-- 게시판 폼 -->
  <form class="basic-form" action="" >
    <h2>새 투표 작성하기</h2>

    <p class="mt-5">투표명</p>
    <input type="text" placeholder="투표명 작성" v-model="formData.name"/>

    <textarea
      type="text"
      class="mt-2"
      placeholder="어떤 투표인지 설명해주세요"
      v-model="formData.description"
    />

    <p>선택지 입력</p>
    <div class="flex-items-center">
      <input type="radio" id="text" value="text" name="optionType"/> <label for="text">텍스트</label>
      <input type="radio" id="date" value="date" name="optionType"/> <label for="date">날짜</label>
      <input type="radio" id="location" value="location" name="optionType"/><label for="location">장소</label>
    </div>

    <div class="mt-4">
      <input 
        type="text" 
        class="mt-2 vote_option_input" 
        placeholder="항목 입력" 
        v-for="item in voteOptions" 
        v-model="item.text"
      />
      <button class="button__outline-full" @click="addVoteOption" type="button">
        + 항목 추가
      </button>
    </div>

    <div class="mt-10">
      <p class="mb-3">투표 추가 설정</p>
      <article v-for="item in voteTypes" :key="item.name">
        <input type="checkbox" :id="item.name" v-model="item.value"/>
        <label :for="item.name" class="bold">{{ item.title }}</label>
        <span v-if="item.value === item.descShowValue">{{ item.desc }}</span>
        <div v-if="item.name === 'autoFinish' && item.value" class="basic-form__vote-end-date">
          {{ getBasicDateFormat(voteEndDate) }}
          <IconCalendar height="20" width="18" class="ml-1"/>
        </div>
      </article>
    </div>

    <button class="button__outline-full primary" type="button" @click="submitVoteForm">
      작성 완료
    </button>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
// < 아이콘
import IconArrowLeft from '@/assets/img/common/icon_arrow_left.svg'
// 캘린더 아이콘
import IconCalendar from '@/assets/img/common/icon_calendar.svg'
// composable
import {getBasicDateFormat} from '@/composables/date'
// 라우터
import { useRoute } from 'vue-router'
const route = useRoute()
// 스토어
import { useUserStore } from '@/stores/user.js'
const store = useUserStore()

// param
const meetingNo = route.params.meetingNo as string

// 투표 선택지
const voteOptions = reactive([{text: ''}, {text: ''}])

// 투표 방식
const voteTypes = reactive([{
  name: 'autoFinish',
  title: '자동 종료',
  desc: '전원이 투표하면 투표를 종료합니다.',
  value: false,
  descShowValue: false,
}, {
  name: 'anonymousYn',
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
const voteEndDate = ref(new Date());

// 투표 form 값
const formData = reactive({
  name: '',
  description: '',
  uId: store.userInfo.uid,
  deadLine: '',
  anonymousYn: 0,
  multiChoiceYn: 0,
  addItemYn: 0,
  locationFlag: 0
})

// 선택지 추가
const addVoteOption = () => {
  voteOptions.push({text: ''})
}

// 투표 생성
const submitVoteForm = () => {
  // 투표명이 빈 값인지 체크
  if(!formData.name) {
    alert("투표명을 입력해주세요."); 
    return;
  }

  // 후보지에 빈 값이 있나 체크
  const checkOptionNull = voteOptions.find(el => !el.text)
  if(checkOptionNull) {
    alert("선택지에 빈 값이 존재합니다.")
    return;
  }

  // 자동 종료 세팅
  if(voteTypes.find(el => el.name === 'autoFinish')?.value) formData.deadLine = String(voteEndDate.value)
  
  // 익명 투표 세팅
  formData.anonymousYn = voteTypes.find(el => el.name === 'anonymousYn')?.value === true ? 1 : 0

  // 복수 선택 세팅
  formData.multiChoiceYn = voteTypes.find(el => el.name === 'multiChoiceYn')?.value === true ? 1 : 0
}

</script>
