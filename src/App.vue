<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useFavorites } from '@/stores/useFavoritesStore';
import { useCart } from '@/stores/useCartStore';
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';

// data
const favoritesStore = useFavorites();
const cartsStore = useCart();

// methods
const { getDataFavorites } = favoritesStore;
const { getDataCart } = cartsStore;

// hooks
onMounted(async () => {
  await getDataFavorites();
  await getDataCart();
});
</script>

<template>
  <TheHeader />
  <main
    class="relative flex h-full min-h-full grow flex-col items-center overflow-clip bg-gray-100 font-[PT_Sans]"
  >
    <RouterView />
  </main>
  <TheFooter />
</template>
