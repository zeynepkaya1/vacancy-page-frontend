<template>
  <div class="px-80">
    <!-- Sort and Create Vacancy Buttons -->
    <div class="flex justify-between mb-4">
      <div>
        <!-- Sort by Title -->
        <button @click="sortVacancies('title')" class="btn bg-teal-800">
          Sort by Title
          <span v-if="sortField === 'title' && sortOrder === 'asc'">🔼</span>
          <span v-if="sortField === 'title' && sortOrder === 'desc'">🔽</span>
        </button>

        <!-- Sort by Created At -->
        <button @click="sortVacancies('createdAt')" class="btn bg-teal-800">
          Sort by Created At
          <span v-if="sortField === 'createdAt' && sortOrder === 'asc'"
            >🔼</span
          >
          <span v-if="sortField === 'createdAt' && sortOrder === 'desc'"
            >🔽</span
          >
        </button>
      </div>
      <div>
        <!-- Navigate to Create Vacancy -->
        <router-link to="/create-vacancy">
          <button class="btn bg-orange-700">Create Vacancy</button>
        </router-link>
      </div>
    </div>

    <!-- Display Vacancies as Cards -->
    <div class="grid grid-cols-1 gap-6">
      <div
        v-for="vacancy in sortedVacancies"
        :key="vacancy.uuid"
        class="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all relative"
      >
        <h3 class="text-3xl font-semibold">{{ vacancy.title }}</h3>
        <p class="text-xl text-gray-600">{{ vacancy.company }}</p>
        <p class="text-xl mt-2 text-gray-800">{{ vacancy.description }}</p>

        <!-- Date Fields -->
        <div class="mt-4 grid grid-cols-2 gap-4 text-lg text-gray-500">
          <div>
            <p>
              <strong>Start Date:</strong> {{ formatDate(vacancy.startDate) }}
            </p>
            <p><strong>End Date:</strong> {{ formatDate(vacancy.endDate) }}</p>
          </div>
          <div>
            <p>
              <strong>Created At:</strong> {{ formatDate(vacancy.createdAt) }}
            </p>
            <p>
              <strong>Updated At:</strong> {{ formatDate(vacancy.updatedAt) }}
            </p>
          </div>
        </div>

        <!-- Edit Button -->
        <button
          @click="openEditModal(vacancy)"
          class="btn bg-blue-600 text-white absolute top-2 right-2 px-3 py-2"
        >
          Edit
        </button>
      </div>
    </div>

    <!-- Edit Vacancy Modal -->
    <EditVacancyModal
      v-if="isEditModalOpen"
      :vacancy="selectedVacancy"
      @close="closeEditModal"
      @submit="updateVacancy"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useVacancyStore } from "../stores/vacancyStore";
import EditVacancyModal from "./EditVacancyModal.vue";

// Sorting state
const sortField = ref(null);
const sortOrder = ref("asc"); // 'asc' or 'desc'

// Modal state
const isEditModalOpen = ref(false); // Modal visibility state
const selectedVacancy = ref(null); // The vacnacy selected for editing

// Pinia store
const vacancyStore = useVacancyStore();

// Computed property for sorted vacancies
const sortedVacancies = computed(() => {
  let sorted = [...vacancyStore.vacancies];
  if (sortField.value) {
    sorted.sort((a, b) => {
      const valA = a[sortField.value];
      const valB = b[sortField.value];
      if (valA < valB) return sortOrder.value === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder.value === "asc" ? 1 : -1;
      return 0;
    });
  }
  return sorted;
});

// Fetch vacancies from the Pinia store
const fetchVacancies = async () => {
  await vacancyStore.fetchVacancies();
};

// Take vacancies sort field and toggle asc/desc
const sortVacancies = (field) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortOrder.value = "asc";
  }
};

// Format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

// Fetch vacancies on component mount
onMounted(fetchVacancies);

// Open edit modal and populate with the selected vacancy data
const openEditModal = (vacancy) => {
  selectedVacancy.value = { ...vacancy }; // Create a copy to avoid mutating the original data
  isEditModalOpen.value = true;
};

// Close the modal
const closeEditModal = () => {
  isEditModalOpen.value = false;
};

// Submit the update vacancy form
const updateVacancy = ({ uuid, updatedData }) => {
  vacancyStore.updateVacancy(uuid, updatedData);
  closeEditModal(); // Close the modal after submission
};
</script>
