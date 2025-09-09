<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/utils/request';
import AutoComplete from 'primevue/autocomplete';
import Password from 'primevue/password';

const router = useRouter();

const email = ref('');
const password = ref('');
const error = ref('');

// Для автокомплита
const emailSuggestions = ref([]);

const searchEmail = (event) => {
  const popularEmails = ['admin@example.com'];
  emailSuggestions.value = popularEmails.filter((e) =>
    e.toLowerCase().includes(event.query.toLowerCase()),
  );
};

const handleLogin = async () => {
  try {
    error.value = '';
    const response = await api.post('/auth/login', {
      email: email.value,
      password: password.value,
    });

    localStorage.setItem('token', response.access_token);

    // Перенаправление на админку
    router.push('/admin');
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<template>
  <div class="mx-auto mt-20 max-w-sm rounded-lg p-6 shadow-lg">
    <h2 class="mb-4 text-center text-2xl font-bold">Admin Login</h2>
    <form @submit.prevent="handleLogin" class="space-y-4">
      <!-- Email с AutoComplete -->
      <AutoComplete
        v-model="email"
        :suggestions="emailSuggestions"
        @complete="searchEmail"
        placeholder="Email"
        class="w-full border border-gray-300 p-2"
      />

      <!-- Password с InputText -->
      <Password
        v-model="password"
        placeholder="Password"
        toggleMask
        class="w-full rounded border border-gray-300 p-2"
      />

      <button
        type="submit"
        class="w-full cursor-pointer rounded bg-gray-700 p-2 text-white hover:bg-gray-800"
      >
        Login
      </button>
    </form>

    <p v-if="error" class="mt-2 text-center text-red-400">{{ error }}</p>
  </div>
</template>
