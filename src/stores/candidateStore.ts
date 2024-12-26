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
  },
});
