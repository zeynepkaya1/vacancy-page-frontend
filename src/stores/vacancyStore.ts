import { defineStore } from "pinia";
import { ref } from "vue";
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

    async createVacancy(
      // Take Vacancy type except uuid, createdAt, updatedAt
      newVacancy: Omit<Vacancy, "uuid" | "createdAt" | "updatedAt">
    ) {
      try {
        const response = await axios.post(
          "http://localhost:3000/vacancies",
          newVacancy
        );
        this.vacancies.push(response.data);
      } catch (error) {
        console.error("Error creating vacancy:", error);
      }
    },
  },
});
