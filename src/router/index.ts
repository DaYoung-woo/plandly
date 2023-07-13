import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/LoginView.vue";
import Main from "@/views/MainView.vue";
import AppointmentList from '@/views/main/AppointmentListView.vue';
import Calendar from "@/views/main/CalendarView.vue";
import Appointment from '@/views/AppointmentView.vue';
import VoteList from '@/views/appointment/VoteListView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component:  () =>Login,
    },
    {
      path: "/",
      component: () => Main,
      children: [
        { path: '', name: 'appointment_list', component: () =>  AppointmentList },
        { path: '/calendar', name: 'calendar', component: () => Calendar },
      ]
    },
    {
      path: "/appointment/:id",
      name: 'appointment-parent',
      component: () => Appointment,
      children: [
        { path: '', name: 'vote_list', component:() =>  VoteList },
        //{ path: '/vote_list', name: 'vote_list', component:() => VoteList },
      ]
    },
  ],
});

export default router;
