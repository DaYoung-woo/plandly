import { createRouter, createWebHistory } from 'vue-router'
import api from '@/axios/api'

import HomeView from '@/views/HomeView.vue'
import meetingView from '@/views/MeetingView.vue'
import MeetingHome from '@/views/meeting/MeetingHome.vue'
import MeetingDetail from '@/views/meeting/MeetingDetail.vue'
import LoginView from '@/views/LoginView.vue'
import KakaoLogin from '@/views/KakaoLogin.vue'
import { useUserStore } from '@/stores/user.js'
import loginSettingView from '@/views/LoginSettingView.vue'
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
      path: '/meeting',
      name: 'meeting',
      component: meetingView,
      children: [
        { path: '', component: MeetingHome, name: 'MeetingHome' },
        { path: 'detail', component: MeetingDetail, name: 'MeetingDetail' }
      ],
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to) => {
  // ✅ This will work make sure the correct store is used for the
  // current running app
  const store = useUserStore()
  if (to.meta.requiresAuth) {
    if (!!store.userInfo.accessToken && to.path === '/login') return '/home'
    if (!store.userInfo.accessToken) return '/login'
    if (!store.userInfo.email || !store.userInfo.displayName) return '/login_setting'
  }
})

type queryObj = {
  code?: string | undefined
}
export default router
