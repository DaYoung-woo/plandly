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
    
    <!-- 텍스트/날짜/장소 선택 라디오 -->
    <p>선택지 입력</p>
    <div class="flex-items-center">
      <input type="radio" id="text" value="text" name="optionType" v-model="optionType"/> <label for="text">텍스트</label>
      <input type="radio" id="date" value="date" name="optionType"/> <label for="date">날짜</label>
      <input type="radio" id="location" value="location" name="optionType"/><label for="location">장소</label>
    </div>

    <!-- 선택지 입력 -->
    <div class="mt-4">
      <div 
        v-for="(item, idx) in voteOptions" 
        :class="`vote-form__option ${item.active && 'active'}`" 
        @click="addActiveClass(item)" 
        @focusout="removeActiveClass(item)"
      >
        <img :src="item.previewImage"  v-if="item.previewImage" class="vote-form__option__preview-image"/>
        <input 
          type="text" 
          placeholder="선택지 입력" 
          v-model="item.text"
        />
        <div class="vote-form__option__gallery-icon">
          <label :for="`upload-image-${idx}`">
            <IconGallery />
          </label>
          <input
            type="file"
            hidden
            :id="`upload-image-${idx}`"
            accept=".jpg, .jpeg, .png, .svg, image/*;capture=camera"
            @change="getFile($event, item)"
          />
        </div>
      </div>
      <button class="button__outline-full" @click="addVoteOption" type="button">
        + 선택지 추가
      </button>
    </div>

    <!-- 투표 추가 설정 -->
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
// 갤러리 아이콘
import IconGallery from '@/assets/img/vote/icon_picture.svg'
// composable
import {getBasicDateFormat} from '@/composables/date'
// api
import { addVoteOptions, createVote } from '@/axios/api'
// 라우터
import { useRoute } from 'vue-router'
const route = useRoute()
// 스토어
import { useUserStore } from '@/stores/user.js'
import type { createVoteType, voteOptionType } from '@/types/Vote';
const store = useUserStore()

// param
const meetingNo = route.params.meetingNo as string

// 투표 선택지 타입
const optionType = ref('text')

// 투표 선택지
const voteOptions: voteOptionType[] = reactive([{text: '', active: false}, {text: '', active: false}])

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
const voteEndDate = ref(Date());

// 투표 form 값
const formData: createVoteType = reactive({
  name: '',
  description: '',
  uid: store.userInfo.uid,
  mid: '',
  deadLine: null,
  anonymousYn: 0,
  // multiChoiceYn: 0,
  addItemYn: 0,
  locationFlag: 0
})

// 선택지 추가
const addVoteOption = () => {
  voteOptions.push({text: '', active: false})
}

// 이미지 설정 이벤트
const getFile = (e: Event, item: voteOptionType) => {
  const files = (e.target as HTMLInputElement).files

  if (files) {
    const file = files[0]
    const reader = new FileReader()
    reader.onload = (event) => {
      const result = (event.target as FileReader)?.result as string
      if (result) item.previewImage = result
    }
    reader.readAsDataURL(file)

    // Add the file to the fileList
    item.image = file
  }
}


// 선택지 active 클래스 추가
const addActiveClass = (item: voteOptionType) => {
  item.active = true
}

// 선택지 active 클래스 삭제
const removeActiveClass = (item: voteOptionType) => {
  item.active = false
}

// 투표 생성
const submitVoteForm = async() => {
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
  if(voteTypes.find(el => el.name === 'autoFinish')?.value) formData.deadLine = voteEndDate.value 
  
  // 익명 투표 세팅
  formData.anonymousYn = voteTypes.find(el => el.name === 'anonymousYn')?.value === true ? 1 : 0

  // 복수 선택 세팅
  //formData.multiChoiceYn = voteTypes.find(el => el.name === 'multiChoiceYn')?.value === true ? 1 : 0

  // mid 세팅
  formData.mid = meetingNo

  // 투표 생성 api 호출
  try{
    const { data } = await createVote(formData)
    const vid = data.info
    if(vid) createVoteOptions(vid)
  } catch(e) {
    alert(e)
  }
}

// 투표 선택지 생성
const createVoteOptions = async(vid: number) => {
  try { 
    const formData = new FormData();

    voteOptions.forEach(el => {
      if(!el.image) return;
      formData.append("image", el.image, el.image.name);
    })

    const reqBody = voteOptions.map(el => ({fileName: el.image?.name || '', name: el.text}))
    formData.append(
      "reqBody",
      new Blob([JSON.stringify(reqBody)], {type: "application/json"})
    );

    const res = addVoteOptions(vid, formData)
    console.log(res)

  } catch(e) {
    alert(e)
  }
}


</script>
