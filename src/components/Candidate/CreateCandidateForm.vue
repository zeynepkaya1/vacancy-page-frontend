<template>
  <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
    <h2 class="text-2xl font-semibold mb-4">Create Profile</h2>
    <form @submit.prevent="handleSubmit">
      <!-- First Name -->
      <div class="mb-4">
        <label for="firstName" class="block text-base font-medium text-gray-700"
          >First Name*</label
        >
        <input
          v-model="formData.firstName"
          type="text"
          id="firstName"
          class="w-full px-4 py-2 mt-1 text-base border rounded-lg"
          :class="{ 'border-red-500': errors.firstName }"
        />
        <span v-if="errors.firstName" class="text-sm text-red-500">{{
          errors.firstName
        }}</span>
      </div>

      <!-- Last Name -->
      <div class="mb-4">
        <label for="lastName" class="block text-base font-medium text-gray-700"
          >Last Name*</label
        >
        <input
          v-model="formData.lastName"
          type="text"
          id="lastName"
          class="w-full px-4 py-2 mt-1 text-base border rounded-lg"
          :class="{ 'border-red-500': errors.lastName }"
        />
        <span v-if="errors.lastName" class="text-sm text-red-500">{{
          errors.lastName
        }}</span>
      </div>

      <!-- Title -->
      <div class="mb-4">
        <label for="title" class="block text-base font-medium text-gray-700"
          >Title*</label
        >
        <input
          v-model="formData.title"
          type="text"
          id="title"
          class="w-full px-4 py-2 mt-1 text-base border rounded-lg"
          :class="{ 'border-red-500': errors.title }"
        />
        <span v-if="errors.title" class="text-sm text-red-500">{{
          errors.title
        }}</span>
      </div>

      <!-- Email -->
      <div class="mb-4">
        <label for="email" class="block text-base font-medium text-gray-700"
          >Email*</label
        >
        <input
          v-model="formData.email"
          type="email"
          id="email"
          class="w-full px-4 py-2 mt-1 text-base border rounded-lg"
          :class="{ 'border-red-500': errors.email }"
        />
        <span v-if="errors.email" class="text-sm text-red-500">{{
          errors.email
        }}</span>
      </div>

      <!-- Phone -->
      <div class="mb-4">
        <label for="phone" class="block text-base font-medium text-gray-700"
          >Phone</label
        >
        <input
          v-model="formData.phone"
          type="text"
          id="phone"
          class="w-full px-4 py-2 mt-1 text-base border rounded-lg"
          :class="{ 'border-red-500': errors.phone }"
        />
        <span v-if="errors.phone" class="text-sm text-red-500">
          {{ errors.phone }}
        </span>
      </div>

      <!-- Date of Birth -->
      <div class="mb-4">
        <label
          for="dateOfBirth"
          class="block text-base font-medium text-gray-700"
          >Date of Birth</label
        >
        <input
          v-model="formData.dateOfBirth"
          type="date"
          id="dateOfBirth"
          class="w-full px-4 py-2 mt-1 text-base border rounded-lg"
        />
      </div>

      <!-- Sex -->
      <div class="mb-4">
        <label class="block text-base font-medium text-gray-700">Sex</label>
        <div class="flex items-center space-x-4 mt-1">
          <label class="inline-flex items-center">
            <input
              v-model="formData.sex"
              type="radio"
              value="male"
              class="form-radio text-teal-800"
            />
            <span class="ml-2">Male</span>
          </label>
          <label class="inline-flex items-center">
            <input
              v-model="formData.sex"
              type="radio"
              value="female"
              class="form-radio text-teal-800"
            />
            <span class="ml-2">Female</span>
          </label>
          <label class="inline-flex items-center">
            <input
              v-model="formData.sex"
              type="radio"
              value="other"
              class="form-radio text-teal-800"
            />
            <span class="ml-2">Other</span>
          </label>
        </div>
      </div>

      <!-- Years of Experience -->
      <div class="mb-4">
        <label
          for="yearsOfExp"
          class="block text-base font-medium text-gray-700"
          >Years of Experience</label
        >
        <input
          v-model="formData.yearsOfExp"
          type="number"
          id="yearsOfExp"
          class="w-full px-4 py-2 mt-1 text-base border rounded-lg"
          :class="{ 'border-red-500': errors.yearsOfExp }"
        />
        <span v-if="errors.yearsOfExp" class="text-sm text-red-500">{{
          errors.yearsOfExp
        }}</span>
      </div>

      <!-- Info -->
      <div class="mb-4">
        <p class="italic text-gray-500">* fields are required.</p>
      </div>

      <!-- Submit -->
      <div class="flex justify-end">
        <button
          type="submit"
          class="px-6 py-2 bg-teal-800 text-white text-base rounded-lg hover:bg-teal-900"
        >
          Create Profile
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { z } from "zod";
import { useRouter } from "vue-router";
import { useCandidateStore } from "../../stores/candidateStore";

// Reactive form data and errors
const formData = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  sex: "",
  title: "",
  yearsOfExp: 0,
});
const errors = ref({});

// Zod schema
const createCandidateSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  title: z.string().min(1, "Title is required"),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  phone: z
    .string()
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, "Phone number must be valid")
    .optional(),
  dateOfBirth: z.string().optional(),
  sex: z.string().optional(),
  yearsOfExp: z.number().optional(),
});

// Access store and router
const candidateStore = useCandidateStore();
const router = useRouter();

// Form submit handler
const handleSubmit = async () => {
  try {
    // Reset errors
    errors.value = {};

    // Validate form data
    createCandidateSchema.parse(formData.value);

    // Submit data
    await candidateStore.createCandidate(formData.value);

    alert("Candidate created successfully!");
    router.push("/candidates");
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Populate errors
      err.errors.forEach((e) => {
        errors.value[e.path[0]] = e.message;
      });
    } else {
      console.error("Error creating candidate:", err);
    }
  }
};
</script>
