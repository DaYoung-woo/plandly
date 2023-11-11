import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import meetingView from '@/views/MeetingView.vue'
import MeetingHome from '@/views/meeting/MeetingHome.vue'
import MeetingDetail from '@/views/meeting/MeetingDetail.vue'
import LoginView from '@/views/LoginView.vue'
import { useUserStore } from "@/stores/user.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: "/login",
      name: "login",
      component:  () => LoginView,
    },
    { 
      path: '/meeting', 
      name: 'meeting', 
      component: meetingView,
      children: [
        { path: '', component: MeetingHome, name:'MeetingHome' },
        { path: 'detail', component: MeetingDetail, name:'MeetingDetail' },
      ],
      meta: { requiresAuth: true }
    }
  ]
})


router.beforeEach((to) => {
  // ✅ This will work make sure the correct store is used for the
  // current running app
  const store = useUserStore();
  console.log(store.accessToken)
  console.log(store.userInfo.email)
  if (to.meta.requiresAuth && !store.accessToken && store.userInfo.email === '') return '/login'
})
export default router
