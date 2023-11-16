<template>
  <div class="login" >
    <div class="logo-area pb-16">
      <img :src="logo" lt="planLogo" />
      <p>
        PLANDLY<br />
        시작하기
      </p>
    </div>

    <div class="logo-area">
      이메일을 설정해주세요<br/>
      <input type="text" name="email" class="border border-slate-300 w-72 mb-5" v-model="email"/>
      <br/>
      닉네임을 설정해주세요<br/>
      <input type="text" name="displayName" class="border border-slate-300 w-72 mb-5" v-model="displayName"/>
      <br/>
      <button
        color="indigo"
        class="bg-green-100 p-2 text-sm w-72"
        @click="setEmail"
        :disabled="!email || !displayName"
        >
          <span>기본정보 설정하기</span>
      </button>
    </div>
  </div>
</template>
    
<script setup lang='ts'>
  import logo from "@/assets/img/logo.png";
  import { ref } from "vue";
  import api from '@/axios/api'
  import { useUserStore } from "@/stores/user.js";
  import { useRouter } from "vue-router";

  const store = useUserStore();
  const router = useRouter();


  const email = ref('')
  const displayName = ref('')

  const setEmail = () => {
    const param = {
      email: email.value,
      displayName: displayName.value,
      uid: store.tempUserInfo.uid
    }
    api.setEmail(param)
    .then(({data}) => {
      if(data.code === 0) router.push('/')
    })
    .catch((e) => {
      if(e.response.status === 400){
        if(e.response.data.code === 2) alert("이미 사용되고 있는 email입니다.")
        else alert("Server Error")
      } else {
        alert("Server Error")
      }
    })
  }
</script>
    
<style>
    
</style>