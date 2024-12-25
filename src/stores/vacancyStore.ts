import { defineStore } from "pinia";
import { type Vacancy } from "../models/vacancy";
import axios from "axios";

export const useVacancyStore = defineStore("vacancy", {
  state: () => ({
    vacancies: [] as Vacancy[],
  }),
  actions: {
    // Fetch vacancies from API
    async fetchVacancies() {
      try {
        const response = await axios.get("http://localhost:3000/vacancies");
        this.vacancies = response.data;
      } catch (error) {
        console.error("Error fetching vacancies:", error);
      }
    },
  },
});
