import { defineStore } from "pinia";
import { type Candidate } from "../models/candidate";
import axios from "axios";

export const useCandidateStore = defineStore("candidate", {
  state: () => ({
    candidates: [] as Candidate[],
  }),
  actions: {
    // Fetch candidates from API
    async fetchCandidates() {
      try {
        const response = await axios.get("http://localhost:3000/candidates");
        this.candidates = response.data;
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    },

    async createCandidate(
      // Take Candidate type except id
      newCandidate: Omit<Candidate, "id">
    ) {
      try {
        const response = await axios.post(
          "http://localhost:3000/candidates",
          newCandidate
        );
        this.candidates.push(response.data);
      } catch (error) {
        console.error("Error creating candidate:", error);
      }
    },

    async updateCandidate(id: string, updatedData: Partial<Candidate>) {
      try {
        const response = await axios.patch(
          `http://localhost:3000/candidates/${id}`,
          updatedData
        );
        const index = this.candidates.findIndex(
          (candidate) => candidate.id === id
        );
        if (index !== -1) {
          this.candidates[index] = response.data;
        }
      } catch (error) {
        console.error("Error updating candidate:", error);
      }
    },

    async deleteCandidate(id: string) {
      try {
        await axios.delete(`http://localhost:3000/candidates/${id}`);
        this.candidates = this.candidates.filter(
          (candidate) => candidate.id !== id
        );
      } catch (error) {
        console.error("Error deleting candidate:", error);
      }
    },
  },
});
