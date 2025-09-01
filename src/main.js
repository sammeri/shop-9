import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
/* UI Библиотека + стандартный пресет Aura */
import PrimeVue from 'primevue/config';
// import Material from '@primeuix/themes/material'
import Nora from '@primeuix/themes/nora';
import { definePreset } from '@primeuix/themes';

/* Иконки */
import VueFeather from 'vue-feather';

const MyPreset = definePreset(Nora, {
  semantic: {
    primary: {
      50: '{stone.50}',
      100: '{stone.100}',
      200: '{stone.200}',
      300: '{stone.300}',
      400: '{stone.400}',
      500: '{stone.500}',
      600: '{stone.600}',
      700: '{stone.700}',
      800: '{stone.800}',
      900: '{stone.900}',
      950: '{stone.950}',
    },
  },
});

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: false,
    },
  },
});

app.component(VueFeather.name, VueFeather);

app.mount('#app');
