import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/LoginView.vue";
import Calendar from "@/views/CalendarView.vue";
import Place from "@/views/PlaceView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/calendar",
      name: "calendar",
      component: () => Calendar,
    },
    {
      path: "/place",
      name: "place",
      component: () => Place,
    },
  ],
});

export default router;
