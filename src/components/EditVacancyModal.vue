<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h2 class="modal-title">Edit Vacancy</h2>
      <form @submit.prevent="handleSubmit" class="form">
        <!-- Title -->
        <div class="form-group">
          <label for="title">Title</label>
          <input
            v-model="formData.title"
            id="title"
            type="text"
            class="form-input"
            placeholder="Enter title"
          />
        </div>

        <!-- Company -->
        <div class="form-group">
          <label for="company">Company</label>
          <input
            v-model="formData.company"
            id="company"
            type="text"
            class="form-input"
            placeholder="Enter company"
          />
        </div>

        <!-- Description -->
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            v-model="formData.description"
            id="description"
            class="form-input"
            placeholder="Enter description"
          ></textarea>
        </div>

        <!-- Start Date -->
        <div class="form-group">
          <label for="startDate">Start Date</label>
          <input
            v-model="formData.startDate"
            id="startDate"
            type="date"
            class="form-input"
          />
        </div>

        <!-- End Date -->
        <div class="form-group">
          <label for="endDate">End Date</label>
          <input
            v-model="formData.endDate"
            id="endDate"
            type="date"
            class="form-input"
          />
        </div>

        <!-- Buttons: Update and Delete -->
        <div class="flex flex-row justify-between space-x-4 mt-4">
          <button type="submit" class="submit-btn">Update</button>
          <button type="button" class="delete-btn" @click="deleteVacancy">
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
import { useVacancyStore } from "../stores/vacancyStore";

// Define props that passed here
const props = defineProps({
  vacancy: Object,
});

// Send events to parent
const emit = defineEmits(["close", "submit"]);

// Holds editted form data (reactive)
const formData = ref({
  title: props.vacancy.title,
  company: props.vacancy.company,
  description: props.vacancy.description,
  startDate: props.vacancy.startDate,
  endDate: props.vacancy.endDate,
  uuid: props.vacancy.uuid,
});

const vacancyStore = useVacancyStore();

// Close modal
const close = () => {
  emit("close");
};

// Submit the form to update the vacancy
const handleSubmit = () => {
  emit("submit", { uuid: formData.value.uuid, updatedData: formData.value });
};

// Delete the vacancy
const deleteVacancy = async () => {
  await vacancyStore.deleteVacancy(props.vacancy.uuid);
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
