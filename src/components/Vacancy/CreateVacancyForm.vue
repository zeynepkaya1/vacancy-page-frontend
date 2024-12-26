<template>
  <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
    <h2 class="text-3xl font-semibold mb-6">Create Vacancy</h2>
    <form @submit.prevent="handleSubmit">
      <!-- Title -->
      <div class="mb-6">
        <label for="title" class="block text-lg font-medium text-gray-700"
          >Title</label
        >
        <input
          v-model="formData.title"
          type="text"
          id="title"
          class="w-full px-6 py-3 mt-2 text-lg border rounded-lg"
          :class="{ 'border-red-500': errors.title }"
        />
        <span v-if="errors.title" class="text-sm text-red-500">{{
          errors.title
        }}</span>
      </div>

      <!-- Company -->
      <div class="mb-6">
        <label for="company" class="block text-lg font-medium text-gray-700"
          >Company</label
        >
        <input
          v-model="formData.company"
          type="text"
          id="company"
          class="w-full px-6 py-3 mt-2 text-lg border rounded-lg"
          :class="{ 'border-red-500': errors.company }"
        />
        <span v-if="errors.company" class="text-sm text-red-500">{{
          errors.company
        }}</span>
      </div>

      <!-- Description -->
      <div class="mb-6">
        <label for="description" class="block text-lg font-medium text-gray-700"
          >Description</label
        >
        <textarea
          v-model="formData.description"
          id="description"
          class="w-full px-6 py-3 mt-2 text-lg border rounded-lg"
          :class="{ 'border-red-500': errors.description }"
        ></textarea>
        <span v-if="errors.description" class="text-sm text-red-500">{{
          errors.description
        }}</span>
      </div>

      <!-- Start Date -->
      <div class="mb-6">
        <label for="startDate" class="block text-lg font-medium text-gray-700"
          >Start Date</label
        >
        <input
          v-model="formData.startDate"
          type="date"
          id="startDate"
          class="w-full px-6 py-3 mt-2 text-lg border rounded-lg"
          :class="{ 'border-red-500': errors.startDate }"
        />
        <span v-if="errors.startDate" class="text-sm text-red-500">{{
          errors.startDate
        }}</span>
      </div>

      <!-- End Date -->
      <div class="mb-6">
        <label for="endDate" class="block text-lg font-medium text-gray-700"
          >End Date</label
        >
        <input
          v-model="formData.endDate"
          type="date"
          id="endDate"
          class="w-full px-6 py-3 mt-2 text-lg border rounded-lg"
          :class="{ 'border-red-500': errors.endDate }"
        />
        <span v-if="errors.endDate" class="text-sm text-red-500">{{
          errors.endDate
        }}</span>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end">
        <button
          type="submit"
          class="btn px-8 py-3 bg-teal-800 text-white text-lg rounded-lg"
        >
          Create Vacancy
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { z } from "zod";
import { useRouter } from "vue-router";
import { useVacancyStore } from "../../stores/vacancyStore";

// Form data and error state
const formData = ref({
  title: "",
  company: "",
  description: "",
  startDate: "",
  endDate: "",
});
const errors = ref({
  title: "",
  company: "",
  description: "",
  startDate: "",
  endDate: "",
});

// Zod schema for validation
const createVacancySchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  description: z.string().min(1, "Description is required"),
  startDate: z
    .string()
    .min(1, "Start Date is required")
    .refine((date) => !isNaN(Date.parse(date)), "Invalid date format"),
  endDate: z
    .string()
    .min(1, "End Date is required")
    .refine((date) => !isNaN(Date.parse(date)), "Invalid date format"),
});

// Access the store
const vacancyStore = useVacancyStore();

// Initialize the router
const router = useRouter();

// Form submit handler
const handleSubmit = async () => {
  try {
    // Validate the form data
    createVacancySchema.parse(formData.value);

    // Reset errors before submitting
    errors.value = {};

    // Use store's createVacancy method to submit data
    await vacancyStore.createVacancy(formData.value);

    // Success alert
    alert("Vacancy created successfully!");

    // Redirect to vacancies list page
    router.push("/");
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Handle Zod validation errors
      err.errors.forEach((e) => {
        errors.value[e.path[0]] = e.message;
      });
    } else {
      console.error("Error creating vacancy:", err);
    }
  }
};
</script>
