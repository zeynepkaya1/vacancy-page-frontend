<template>
  <div class="px-80">
    <!-- Create Candidate Button -->
    <div class="flex flex-row-reverse mb-4">
      <div>
        <!-- Navigate to Create Candidate -->
        <router-link to="/create-candidate">
          <button class="btn bg-orange-700">Create Profile</button>
        </router-link>
      </div>
    </div>

    <!-- Display Candidates as Cards -->
    <div class="grid grid-cols-1 gap-6">
      <div
        v-for="candidate in candidates"
        :key="candidate.id"
        class="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all relative"
      >
        <h3 class="text-3xl font-semibold">
          {{ candidate.firstName + " " + candidate.lastName }}
        </h3>
        <p class="text-xl mt-2 text-gray-800">{{ candidate.title }}</p>

        <!-- Other Fields -->
        <div class="mt-4 grid grid-cols-3 gap-4 text-lg text-gray-500">
          <div>
            <p><strong>email:</strong> {{ candidate.email }}</p>
            <p><strong>phone:</strong> {{ candidate.phone }}</p>
          </div>
          <div>
            <p>
              <strong>Date of Birth:</strong>
              {{ formatDate(candidate.dateOfBirth) }}
            </p>
            <p><strong>Sex:</strong> {{ candidate.sex }}</p>
          </div>
          <div>
            <p>
              <strong>Years of Experience:</strong> {{ candidate.yearsOfExp }}
            </p>
          </div>
        </div>

        <!-- Edit Button -->
        <button
          @click="openEditModal(candidate)"
          class="btn bg-blue-600 text-white absolute top-2 right-2 px-3 py-2"
        >
          Edit
        </button>

        <!-- Find Vacancies Button -->
        <button
          @click="findVacanciesForCandidate(candidate)"
          class="btn bg-green-600 text-white absolute top-2 right-20 px-3 py-2"
        >
          Find Jobs for You
        </button>
      </div>
    </div>

    <!-- Edit Candidate Modal -->
    <EditCandidateModal
      v-if="isEditModalOpen"
      :candidate="selectedCandidate"
      @close="closeEditModal"
      @submit="updateCandidate"
    />

    <!-- Find Vacancies Modal -->
    <FindVacanciesModal
      v-if="isVacanciesModalOpen"
      :vacancies="vacancies"
      @close="closeVacanciesModal"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCandidateStore } from "../../stores/candidateStore";
import { useVacancyStore } from "../../stores/vacancyStore";
import EditCandidateModal from "./EditCandidateModal.vue";
import FindVacanciesModal from "./FindVacanciesModal.vue";

// Modal state
const isEditModalOpen = ref(false); // Modal visibility state
const isVacanciesModalOpen = ref(false);
const selectedCandidate = ref(null); // The candidate selected for editing
const vacancies = ref([]);

// Pinia store
const candidateStore = useCandidateStore();
const vacancyStore = useVacancyStore();

// Bind the store's candidates to a computed property
const candidates = computed(() => candidateStore.candidates);

// Fetch candidates and vacancies from the Pinia store
const fetchCandidates = async () => {
  await candidateStore.fetchCandidates();
};
const fetchVacancies = async () => {
  await vacancyStore.fetchVacancies();
};

// Format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

// Fetch candidates and vacancies on component mount
onMounted(() => {
  fetchCandidates();
  fetchVacancies();
});

// Open edit modal and populate with the selected candidate data
const openEditModal = (candidate) => {
  selectedCandidate.value = { ...candidate }; // Create a copy to avoid mutating the original data
  isEditModalOpen.value = true;
};

// Close the modal
const closeEditModal = () => {
  isEditModalOpen.value = false;
};

// Submit the update candidate form
const updateCandidate = ({ id, updatedData }) => {
  candidateStore.updateCandidate(id, updatedData);
  closeEditModal(); // Close the modal after submission
};

// Open Find Vacancies modal and fetch matched vacancies
const findVacanciesForCandidate = async (candidate) => {
  const response = await vacancyStore.findVacanciesForCandidate(candidate.id);
  vacancies.value = response;
  isVacanciesModalOpen.value = true;
};

// Close the Find Vacancies modal
const closeVacanciesModal = () => {
  isVacanciesModalOpen.value = false;
};
</script>
