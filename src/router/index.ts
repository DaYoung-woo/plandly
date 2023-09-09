import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import meetingView from '@/views/MeetingView.vue'
import MeetingHome from '@/views/meeting/MeetingHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    { 
      path: '/meeting', 
      name: 'meeting', 
      component: meetingView,
      children: [
        { path: '', component: MeetingHome, name:'MeetingHome' },
      ]
    }
  ]
})

export default router
