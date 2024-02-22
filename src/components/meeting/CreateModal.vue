<template>
  <vue-final-modal
    v-model="showModal"
    v-bind="$attrs"
    classes="flex justify-center items-center "
    content-class="relative mx-4 bg-white meeting-create-modal"
    :click-to-close="false"
  >
    <span class="mr-8 text-xl font-bold">
      <IconClose class="mb-12 w-3 h-3" @click="showModal = false" />
      <slot name="title">새 모임 만들기</slot>
    </span>

    <div class="mt-10 pb-10">
      <form>
        <h2 class="mb-2">모임 제목</h2>
        <input
          type="text"
          v-model="name"
          placeholder="모임명을 지어주세요."
          class="border border-slate-300 w-full px-4 py-3"
        />
        <p class="text-right">{{ name.length }}/24</p>

        <h2 class="pt-5 pb-1">모임 설명</h2>
        <textarea
          v-model="description"
          class="border border-slate-300 w-full px-4 py-3"
          placeholder="모임의 목적과 활동을 소개해주세요. 언제든 변경할 수 있습니다."
        />
        <p class="text-right">{{ description.length }}/24</p>

        <h2 class="pt-5 mb-2">모임 비밀번호 설정</h2>
        <input
          type="password"
          v-model="password"
          placeholder="비밀번호가 필요 없는 모임이라면 비워주세요."
          class="border border-slate-300 w-full px-4 py-3"
        />

        <h2 class="pt-9 pb-1">대표 프로필 이미지</h2>
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
            @change="getFile($event)"
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
import { ref } from 'vue'
// api
import { createMeeting } from '@/axios/api'
// 스토어
import { useUserStore } from '@/stores/user.js'
// 라우터
import { useRouter } from 'vue-router'
// 닫기 아이콘
import IconClose from '@/assets/img/common/icon_close.svg'

// 미리보기 이미지
const previewImage = ref()
// 이미지
const image = ref<File | null>(null)
// 이미지 설정 이벤트
const getFile = (e: Event) => {
  const files = (e.target as HTMLInputElement).files

  if (files) {
    const file = files[0]
    const reader = new FileReader()
    reader.onload = (event) => {
      const result = (event.target as FileReader)?.result as string
      if (result) previewImage.value = result
    }
    reader.readAsDataURL(file)

    // Add the file to the fileList
    image.value = file
  }
}

// 스토어
const store = useUserStore()
// 라우터
const router = useRouter()
// 모달 표시 유무
const showModal = ref(true)
// 모임명
const name = ref('')
// 모임 설명
const description = ref('')
// 모임 비밀번호
const password = ref('')
// 모임 저장 버튼 클릭 이벤트
const submitForm = () => {
  const data = new FormData()

  data.append('uid', store.userInfo.uid)
  data.append('name', name.value)
  data.append('description', description.value)
  data.append('mainPicture', image.value as File) // Access value of ref

  createMeeting(data).then(({ data }) => {
    if (data.code === 0) {
      alert('생성되었습니다.')
      router.push(`/meeting/${data.mid}`)
    } else alert('서버오류')

    showModal.value = false
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
  overflow-y: scroll;
  margin: 80px;
  height: 90vh;
  max-height: 930px;
  .profile-area {
    width: 92px;
    height: 92px;
  }

  input {
    font-size: 15px;
    padding: 5px 10px;
  }

  h2 {
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
