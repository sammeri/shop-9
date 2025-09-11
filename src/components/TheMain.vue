<script setup>
import { computed, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useFavorites } from '@/stores/useFavoritesStore';
import { useCart } from '@/stores/useCartStore';
import { useProducts } from '@/stores/useProductsStore';
import { useProduct } from '@/stores/useProductStore';
import { useCategories } from '@/stores/useCategoriesStore';

// data
const favoritesStore = useFavorites();
const cartsStore = useCart();
const productsStore = useProducts();
const productStore = useProduct();
const categoriesStore = useCategories();

// computed
const pending = computed(
  () =>
    productsStore.pending ||
    productStore.pending ||
    favoritesStore.pending ||
    cartsStore.pending ||
    categoriesStore.pending,
);

// methods
const { getDataFavorites } = favoritesStore;
const { getDataCart } = cartsStore;

onMounted(async () => {
  await getDataFavorites();
  await getDataCart();
});
</script>

<template>
  <main
    class="relative flex h-full min-h-full grow flex-col items-center overflow-clip bg-gray-100 font-[PT_Sans]"
  >
    <div v-show="!pending" style="height: 6px"></div>
    <ProgressBar
      v-show="pending"
      class="w-screen"
      mode="indeterminate"
      style="height: 6px"
    ></ProgressBar>
    <RouterView />
  </main>
</template>
