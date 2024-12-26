import { createRouter, createWebHistory } from "vue-router";
import VacancyList from "../components/Vacancy/VacancyList.vue";
import CreateVacancy from "../components//Vacancy/CreateVacancyForm.vue";
import CandidateList from "../components/Candidate/CandidateList.vue";
import CreateCandidate from "../components/Candidate/CreateCandidateForm.vue";

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
  {
    path: "/candidates",
    name: "Candidates",
    component: CandidateList,
  },
  {
    path: "/create-candidate",
    name: "create-candidate",
    component: CreateCandidate,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
