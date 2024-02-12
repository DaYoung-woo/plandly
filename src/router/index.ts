import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import MeetingView from '@/views/MeetingView.vue'
import SimpleFrame from '@/views/SimpleFrame.vue'
import MeetingHome from '@/views/meeting/MeetingHome.vue'
import MeetingDetail from '@/views/meeting/MeetingDetail.vue'
import MeetingBoardDetail from '@/views/meeting/board/DetailForm.vue'
import MeetingBoardCreate from '@/views/meeting/board/CreateForm.vue'
import LoginView from '@/views/LoginView.vue'
import loginSettingView from '@/views/LoginSettingView.vue'
import KakaoLogin from '@/views/KakaoLogin.vue'
import { useUserStore } from '@/stores/user.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/sso',
      name: 'KakaoLogin',
      component: KakaoLogin,
      meta: { requiresAuth: false }
    },
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
        { path: 'detail', component: MeetingDetail, name: 'MeetingDetail' },
      ],
      meta: { requiresAuth: false }
    },
    {
      path: '/meeting/:meetingNo/board/:boardNo',
      name: 'board',
      component: SimpleFrame,
      meta: { requiresAuth: false },
      children: [
        { path: '', component: MeetingBoardCreate, name: 'MeetingBoardCreate' },
        { path: 'detail', component: MeetingBoardDetail, name: 'MeetingBoardDetail' },
      ],
    },
    // {
    //   path: '/meeting/:meetingNo/board/:boardNo/view',
    //   name: 'board',
    //   component: MeetingBoardDetail,
    //   meta: { requiresAuth: false }
    // }
  ]
})

router.beforeEach((to) => {
  // ✅ This will work make sure the correct store is used for the
  // current running app
  const store = useUserStore()

 
  if (to.meta.requiresAuth) {
    if (!!store.userInfo.accessToken && to.path === '/login') return '/home'
    if (!store.userInfo.accessToken && to.params.meetingNo) return `/login?state=${to.params.meetingNo}`
    if (!store.userInfo.accessToken) return '/login'
    if (!store.userInfo.email || !store.userInfo.displayName) return '/login_setting'
  }
})

type queryObj = {
  code?: string | undefined
}
export default router
