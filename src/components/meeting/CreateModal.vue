<template>
  <vue-final-modal
    v-model="showModal"
    v-bind="$attrs"
    classes="flex justify-center items-center "
    content-class="relative mx-4 p-8 bg-white meeting-create-modal"
    :click-to-close="false"
  >
    <span class="mr-8 text-xl font-bold">
      <slot name="title">새 모임 만들기</slot>
    </span>

    <div class="pb-10">
      <form>
        <h5 class="pt-5 pb-1">모임 제목</h5>
        <input type="text" :v-model="name" class="border border-slate-300 w-full" />

        <h5 class="pt-5 pb-1">모임 설명</h5>
        <textarea :v-model="description" class="border border-slate-300 w-full" />

        <h5 class="pt-5 pb-1">대표 프로필 이미지</h5>
        <div class="flex">
          <div class="border border-slate-300 profile-area"></div>
          <div class="ml-4">
            <input
              type="file"
              hidden
              id="upload-image"
              accept=".jpg, .jpeg, .png, .svg, image/*;capture=camera"
              @change="getFile($event.target.files)"
            />
            <label for="upload-image">
              <div class="bg-slate-100 px-10 py-2 text-sm text-center w-36">파일 선택</div>
            </label>
            <div class="pt-5" style="font-size: 10px">
              JPG, GIF, PNG <br />
              <span>권장 사이즈 500*500. 자동으로 리사이징됩니다.</span>
            </div>
          </div>
        </div>

        <h5 class="pt-5 pb-1">모임 비밀번호 설정</h5>
        <input
          type="text"
          :value="title"
          class="border border-slate-300 w-full"
          placeholder="필요하지 않을 시 비워두세요."
        />
      </form>
    </div>

    <div class="flex-shrink-0 flex justify-center items-center pt-10 mt-10">
      <button class="vfm-btn" @click="submitForm" type="button">저장하기</button>
    </div>
    <div class="flex-shrink-0 flex justify-center items-center pt-10 mt-10">
      <button class="vfm-btn" @click="$emit('closeModal')">닫기</button>
    </div>
  </vue-final-modal>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import api from '@/axios/api'
import { useUserStore } from '@/stores/user.js'
const showModal = ref(true)
const title = ref('')
const name = ref('')
const description = ref('')
const fileList: File[] = reactive([])
const store = useUserStore()

const getFile = (files: File[]) => {
  Object.assign(fileList, files)
}

const submitForm = () => {
  const data = new FormData()
  data.append('uid', store.userInfo.uid)
  data.append('name', name.value)
  data.append('description', description.value)
  data.append('mainPicture', fileList[0] as File, fileList[0]?.name)
  api.createMeeting(data).then((res) => {
    console.log(res)
  })
}
</script>

<style lang="scss">
.meeting-create-modal {
  width: 533px;
  .profile-area {
    width: 92px;
    height: 92px;
  }

  input {
    font-size: 15px;
    padding: 5px 10px;
  }
}
</style>
