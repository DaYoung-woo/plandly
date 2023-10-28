<template>
    <h5 class="pt-10 text-2xl text-left">멤버</h5>
    <hr class="mt-1"/>

    <article class="grid grid-cols-2">
      <MemberProfile/>
      <MemberProfile/>
      <MemberProfile/>
    </article>
</template>
    
<script setup lang='ts'>
  import MemberProfile from '@/components/common/MemberProfile.vue';
</script>
    
<style>
    
</style>