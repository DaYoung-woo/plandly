<template>
  <nav class="lnb">
    <article>
      <div class="profile-img bg-main">
        <span>{{ store.userInfo.displayName.substring(0, 1) }}</span>
      </div>
      <div class="profile-desc">
        <span>{{ store.userInfo.email }}</span>
        <p>{{ store.userInfo.displayName }}</p>
      </div>
    </article>

    <ul>
      <li>메뉴</li>
      <li><iconSetting/>계정 설정</li>
      <li><iconFriends />친구 리스트</li>
    </ul>

    <ul>
      <li>모임 관리</li>
      <li><iconMeeting />모임 설정</li>
      <li><iconMember />멤버 관리</li>
      <li><iconShare />모임 공유</li>
    </ul>

    <ul>
      <li>내 모임리스트 <iconPlus/> </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import iconFriends from '@/assets/img/lnb/icon_friends.svg'
import iconSetting from '@/assets/img/lnb/icon_setting.svg'
import iconMeeting from '@/assets/img/lnb/icon_meeting.svg'
import iconMember from '@/assets/img/lnb/icon_member.svg'
import iconShare from '@/assets/img/lnb/icon_share.svg'
import iconPlus from '@/assets/img/common/icon_plus.svg';
import { useUserStore } from '@/stores/user.js'
const store = useUserStore()
</script>

<style lang="scss">
.lnb {
  ul {
    padding: 30px 20px;
    width: 100%;
    li:first-child {
      color: #000;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      padding: 12px 0px;
    }
    li {
      svg {
        margin-right: 20px;
      }
      padding: 18px 24px;
      display: flex;
      color: #000;
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
    hr {
      margin: 5px -20px;
    }
  }
  article {
    display: flex;
    margin-top: 40px;
    .profile-img {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 9999px;
      width: 48px;
      height: 48px;
      margin-left: 20px;
      margin-right: 16px;
      color: #fff;
    }
    .profile-desc {
      span {
        color: #606060;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
      p {
        color: #000;
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
    }
  }
}
</style>
