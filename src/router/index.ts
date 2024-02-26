import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import MeetingView from '@/views/MeetingView.vue'
import SimpleFrame from '@/views/SimpleFrame.vue'
import MeetingHome from '@/views/meeting/MeetingHome.vue'
import MeetingJoin from '@/views/meeting/board/MeetingJoin.vue'
import MeetingDetail from '@/views/meeting/MeetingDetail.vue'
import MeetingBoardDetail from '@/views/meeting/board/DetailForm.vue'
import MeetingBoardCreate from '@/views/meeting/board/CreateForm.vue'
import MeetingVoteCreate from '@/views/meeting/vote/CreateForm.vue'

import LoginView from '@/views/LoginView.vue'
import loginSettingView from '@/views/LoginSettingView.vue'
import KakaoLogin from '@/views/KakaoLogin.vue'
import { useUserStore } from '@/stores/user.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 홈 화면
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    // 홈 화면 리다이렉트
    {
      path: '/',
      redirect: '/home'
    },
    // 로그인 화면
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false }
    },
    // kakao auth
    {
      path: '/sso',
      name: 'KakaoLogin',
      component: KakaoLogin,
      meta: { requiresAuth: false }
    },
    // 닉네임 세팅 화면
    {
      path: '/login_setting',
      name: 'login_setting',
      component: loginSettingView,
      meta: { requiresAuth: false }
    },
    {
      path: '/meeting/:meetingNo',
      name: 'meeting',
      component: MeetingView,
      children: [
        { path: '', component: MeetingHome, name: 'MeetingHome' },
        { path: 'detail', component: MeetingDetail, name: 'MeetingDetail' }
      ],
      meta: { requiresAuth: true }
    },
    {
      path: '/meeting/:meetingNo/join',
      name: 'meetingJoin',
      component: MeetingJoin,
      meta: { requiresAuth: true }
    },
    {
      path: '/meeting/:meetingNo/board',
      name: 'board',
      component: SimpleFrame,
      meta: { requiresAuth: true },
      children: [
        { path: '', component: MeetingBoardCreate, name: 'MeetingBoardCreate' },
        { path: ':boardNo', component: MeetingBoardDetail, name: 'MeetingBoardDetail' }
      ]
    },
    {
      path: '/meeting/:meetingNo/vote',
      name: 'vote',
      component: SimpleFrame,
      meta: { requiresAuth: true },
      children: [{ path: '', component: MeetingVoteCreate, name: 'MeetingVoteCreate' }]
    }
  ]
})

router.beforeEach((to) => {
  // 스토어
  const store = useUserStore()

  // 로그인 권한이 필요한 경우
  if (to.meta.requiresAuth) {
    // 로그인 안한 경우
    if (!store.userInfo.accessToken) return '/login'

    // 로그인되어 있고 이메일/닉네임을 세팅 안 한 경우
    if (!store.userInfo.email || !store.userInfo.displayName) return '/login_setting'

    // 로그인된 유저가 로그인 화면 진입할 경우
    if (!!store.userInfo.accessToken && to.path === '/login') return '/home'

    // 로그인 안한 유저가 미팅관련 화면에 진입할 경우
    if (!store.userInfo.accessToken && to.params.meetingNo) {
      return `/login?state=${to.params.meetingNo}`
    }
  }
})

type queryObj = {
  code?: string | undefined
}
export default router
