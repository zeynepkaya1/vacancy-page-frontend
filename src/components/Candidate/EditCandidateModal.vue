<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h2 class="modal-title">Edit Profile</h2>
      <form @submit.prevent="handleSubmit" class="form">
        <!-- First Name -->
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input
            v-model="formData.firstName"
            id="firstName"
            type="text"
            class="form-input"
            placeholder="Enter firstName"
          />
        </div>

        <!-- Last Name -->
        <div class="form-group mt-3">
          <label for="lastName">Last Name</label>
          <input
            v-model="formData.lastName"
            id="lastName"
            type="text"
            class="form-input"
            placeholder="Enter lastName"
          />
        </div>

        <!-- Title -->
        <div class="form-group mt-3">
          <label for="title">Title</label>
          <input
            v-model="formData.title"
            id="title"
            type="text"
            class="form-input"
            placeholder="Enter title"
          />
        </div>

        <!-- Email -->
        <div class="form-group mt-3">
          <label for="email">Email</label>
          <input
            v-model="formData.email"
            id="email"
            type="text"
            class="form-input"
            placeholder="Enter email"
          />
        </div>

        <!-- Phone -->
        <div class="form-group mt-3">
          <label for="phone">Phone</label>
          <input
            v-model="formData.phone"
            id="phone"
            type="text"
            class="form-input"
            placeholder="Enter phone"
          />
        </div>

        <!-- Date of Birth -->
        <div class="form-group mt-3">
          <label for="dateOfBirth">Date of Birth</label>
          <input
            v-model="formData.dateOfBirth"
            id="dateOfBirth"
            type="date"
            class="form-input"
          />
        </div>

        <!-- Sex -->
        <div class="form-group mt-3">
          <label>Sex</label>
          <div class="flex flex-row gap-4">
            <label>
              <input
                v-model="formData.sex"
                type="radio"
                value="male"
                class="form-radio"
              />
              Male
            </label>
            <label>
              <input
                v-model="formData.sex"
                type="radio"
                value="female"
                class="form-radio"
              />
              Female
            </label>
            <label>
              <input
                v-model="formData.sex"
                type="radio"
                value="other"
                class="form-radio"
              />
              Other
            </label>
          </div>
        </div>

        <!-- Years of Experience -->
        <div class="form-group mt-3">
          <label for="yearsOfExp">Years of Experience</label>
          <input
            v-model="formData.yearsOfExp"
            id="yearsOfExp"
            type="number"
            class="form-input"
            placeholder="Enter years of experience"
            min="0"
          />
        </div>

        <!-- Buttons: Update and Delete -->
        <div class="flex flex-row justify-between space-x-4 mt-4">
          <button type="submit" class="submit-btn">Update</button>
          <button type="button" class="delete-btn" @click="deleteCandidate">
            Delete
          </button>
        </div>
      </form>

      <!-- Close Button -->
      <button @click="close" class="close-btn">Close</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCandidateStore } from "../../stores/candidateStore";

// Define props that passed here
const props = defineProps({
  candidate: Object,
});

// Send events to parent
const emit = defineEmits(["close", "submit"]);

// Holds editted form data (reactive)
const formData = ref({
  firstName: props.candidate.firstName,
  lastName: props.candidate.lastName,
  email: props.candidate.email,
  phone: props.candidate.phone,
  dateOfBirth: props.candidate.dateOfBirth,
  sex: props.candidate.sex,
  title: props.candidate.title,
  yearsOfExp: props.candidate.yearsOfExp,
  id: props.candidate.id,
});

const candidateStore = useCandidateStore();

// Close modal
const close = () => {
  emit("close");
};

// Submit the form to update the candidate
const handleSubmit = () => {
  emit("submit", { id: formData.value.id, updatedData: formData.value });
};

// Delete the candidate
const deleteCandidate = async () => {
  await candidateStore.deleteCandidate(props.candidate.id);
  emit("close"); // Close the modal after deletion
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modal-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-input {
  padding: 12px;
  border: 2px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
}

textarea.form-input {
  min-height: 100px;
}

.submit-btn {
  padding: 12px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  flex-grow: 1;
}

.submit-btn:hover {
  background-color: #218838;
}

.delete-btn {
  padding: 12px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  flex-grow: 1;
}

.delete-btn:hover {
  background-color: #d32f2f;
}

.close-btn {
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  align-self: center;
}

.close-btn:hover {
  background-color: #d32f2f;
}

.form-group.flex {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
</style>
