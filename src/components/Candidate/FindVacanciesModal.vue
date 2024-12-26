<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h3 class="text-3xl font-semibold mb-4">Matched Jobs</h3>
      <div v-if="vacancies.length > 0">
        <ul>
          <li
            v-for="vacancy in vacancies"
            :key="vacancy.uuid"
            class="mb-3 border-b border-gray-300 pb-3"
          >
            <h4 class="font-semibold text-xl">{{ vacancy.title }}</h4>
            <p class="text-lg text-gray-800">{{ vacancy.company }}</p>
            <p class="text-lg text-gray-600">{{ vacancy.description }}</p>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Seems like there is no suitable job for you right now.</p>
      </div>
      <button
        @click="$emit('close')"
        class="btn bg-red-600 text-white mt-4 w-full"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script setup>
// Define props that passed here
defineProps({
  vacancies: Array,
});

defineEmits(["close"]);
</script>
