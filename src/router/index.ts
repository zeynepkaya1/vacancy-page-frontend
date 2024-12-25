import { createRouter, createWebHistory } from "vue-router";
import VacancyList from "../components/VacancyList.vue";
import CreateVacancy from "../components/CreateVacancyForm.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: VacancyList,
  },
  {
    path: "/create-vacancy",
    name: "create-vacancy",
    component: CreateVacancy,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
