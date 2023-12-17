<template>
  <vue-final-modal
    v-model="showModal"
    v-bind="$attrs"
    classes="flex justify-center items-center "
    content-class="relative mx-4 bg-white meeting-create-modal"
    :click-to-close="false"
  >
    <span class="mr-8 text-xl font-bold">
      <img :src="iconClose" alt="iconClose" class="mb-12 w-3 h-3" />
      <slot name="title">새 모임 만들기</slot>
    </span>

    <div class="mt-10 pb-10">
      <form>
        <h5 class="mb-2">모임 제목</h5>
        <input
          type="text"
          v-model="name"
          placeholder="모임명을 지어주세요."
          class="border border-slate-300 w-full px-4 py-3"
        />
        <p class="text-right">{{ name.length }}/24</p>

        <h5 class="pt-5 pb-1">모임 설명</h5>
        <textarea
          v-model="description"
          class="border border-slate-300 w-full px-4 py-3"
          placeholder="모임의 목적과 활동을 소개해주세요. 언제든 변경할 수 있습니다."
        />
        <p class="text-right">{{ description.length }}/24</p>

        <h5 class="pt-5 mb-2">모임 비밀번호 설정</h5>
        <input
          type="password"
          v-model="password"
          placeholder="비밀번호가 필요 없는 모임이라면 비워주세요."
          class="border border-slate-300 w-full px-4 py-3"
        />

        <h5 class="pt-9 pb-1">대표 프로필 이미지</h5>
        <span class="img-desc">모임을 대표할 수 있는 사진을 등록해주세요.</span>
        <div class="flex mt-3">
          <label for="upload-image">
            <div class="border border-slate-300 profile-area">
              <img :src="previewImage" />
            </div>
          </label>
          <input
            type="file"
            hidden
            id="upload-image"
            accept=".jpg, .jpeg, .png, .svg, image/*;capture=camera"
            @change="getFile($event.target.files)"
          />
        </div>
      </form>
    </div>

    <div class="flex justify-right items-right text-right w-full">
      <button class="vfm-btn" @click="submitForm" type="button">저장하기</button>
    </div>
  </vue-final-modal>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import api from '@/axios/api'
import { useUserStore } from '@/stores/user.js'
import iconClose from '@/assets/img/common/icon_close.svg'
const showModal = ref(true)
const title = ref('')
const name = ref('')
const description = ref('')
const password = ref('')
const previewImage = ref()
const fileList: File[] = reactive([])
const store = useUserStore()

const getFile = (files: File[]) => {
  Object.assign(fileList, files)
  const reader = new FileReader()
  const file = files[0]
  reader.onload = (e) => {
    previewImage.value = e.target?.result
  }
  reader.readAsDataURL(file)
}

const submitForm = () => {
  const data = new FormData()

  data.append('uid', store.userInfo.uid)
  data.append('name', name.value)
  data.append('description', description.value)
  data.append('mainPicture', fileList[0] as File)
  api.createMeeting(data).then((res) => {
    console.log(res)
  })
}
</script>

<style lang="scss">
.meeting-create-modal {
  width: 100%;
  max-width: 572px;
  border-radius: 10px;
  border: 1px solid #949494;
  padding: 30px 33px;
  .profile-area {
    width: 92px;
    height: 92px;
  }

  input {
    font-size: 15px;
    padding: 5px 10px;
  }

  h5 {
    color: #000;
    font-family: Noto Sans KR;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  input,
  textarea {
    border-radius: 5px;
    border: 1px solid #b1b1b1;

    font-family: Noto Sans KR;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  input {
    height: 48px;
  }
  textarea {
    height: 120px;
  }
  p {
    color: #b1b1b1;
    text-align: right;
    font-family: Noto Sans KR;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .img-desc {
    color: #606060;
    font-family: Noto Sans KR;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}
</style>
