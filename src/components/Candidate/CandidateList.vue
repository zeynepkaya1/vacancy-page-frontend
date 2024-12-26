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

        <!-- Date Fields -->
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCandidateStore } from "../../stores/candidateStore";

// Pinia store
const candidateStore = useCandidateStore();

// Bind the store's candidates to a computed property
const candidates = computed(() => candidateStore.candidates);

// Fetch candidates from the Pinia store
const fetchCandidates = async () => {
  await candidateStore.fetchCandidates();
};

// Format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

// Fetch candidates on component mount
onMounted(fetchCandidates);
</script>
