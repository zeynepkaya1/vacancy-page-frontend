<template>
  <nav class="bg-teal-900 text-white p-6 w-full">
    <div class="flex justify-between items-center px-12">
      <!-- Left side - Vacancies link -->
      <router-link to="/" class="text-xl font-semibold">Vacancies</router-link>

      <!-- Right side - Candidates link -->
      <router-link to="/candidates" class="text-lg">Candidates</router-link>
    </div>
  </nav>
</template>

<style scoped>
nav {
  color: white;
  padding: 1rem;
}

nav .flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav a {
  color: white;
  text-decoration: none;
}

nav a:hover {
  color: #3498db;
}
</style>
