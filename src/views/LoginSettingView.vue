<template>
  <div class="login" >
    <div class="logo-area">
      이메일을 설정해주세요
      <input type="text" name="email" class="border border-slate-300 w-full" :value="email"/>

      닉네임을 설정해주세요
      <input type="text" name="email" class="border border-slate-300 w-full" :value="displayName"/>
      
      <button
        color="indigo"
        class="items-start naver"
        @click="setEmail"
        >
          <span>기본정보 설정하기</span>
      </button>);
    </div>
  </div>
</template>
    
<script setup lang='ts'>
  import {ref} from 'vue'
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
      uid: store.userInfo.uid,
      displayName: displayName.value
    }
    api.setEmail(param)
    .then(({data}) => {
      console.log(data)
      if(data.code === 0) router.push('/')
    })
  }
</script>
    
<style>
    
</style>