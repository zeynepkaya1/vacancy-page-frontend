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

    async updateVacancy(uuid: string, updatedData: Partial<Vacancy>) {
      try {
        const response = await axios.patch(
          `http://localhost:3000/vacancies/${uuid}`,
          updatedData
        );
        const index = this.vacancies.findIndex(
          (vacancy) => vacancy.uuid === uuid
        );
        if (index !== -1) {
          this.vacancies[index] = response.data;
        }
      } catch (error) {
        console.error("Error updating vacancy:", error);
      }
    },

    async deleteVacancy(uuid: string) {
      try {
        await axios.delete(`http://localhost:3000/vacancies/${uuid}`);
        this.vacancies = this.vacancies.filter(
          (vacancy) => vacancy.uuid !== uuid
        );
      } catch (error) {
        console.error("Error deleting vacancy:", error);
      }
    },

    async findVacanciesForCandidate(id: string) {
      try {
        const response = await axios.get(
          `http://localhost:3000/vacancies/match/${id}`
        );
        return response.data; // Return the list of matched vacancies
      } catch (error) {
        console.error("Error finding vacancies for candidate:", error);
        return []; // Return an empty array if there was an error
      }
    },
  },
});
