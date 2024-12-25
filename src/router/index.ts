import { createRouter, createWebHistory } from "vue-router";
import VacancyList from "../components/VacancyList.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: VacancyList,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
