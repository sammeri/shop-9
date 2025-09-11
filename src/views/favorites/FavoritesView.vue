<script setup>
import { computed } from 'vue';
import ProductItem from '@/components/product/ProductItemCard.vue';
import { useFavorites } from '@/stores/useFavoritesStore';
import Button from 'primevue/button';

// data
const favoritesStore = useFavorites();
// computed
const productsF = computed(() => favoritesStore.productsF);
const pending = computed(() => favoritesStore.pending);
</script>

<template>
  <div class="container flex min-h-full w-full grow flex-col items-center">
    <h1 class="my-3 mr-auto text-2xl font-bold sm:text-3xl md:text-4xl">Избранное</h1>
    <div
      v-if="!pending && productsF.length"
      class="mb-4 grid w-full grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5"
    >
      <ProductItem v-for="product in productsF" :key="product.id" :item="product" />
    </div>
    <div
      class="mt-6 flex w-full grow flex-col items-center justify-center gap-5"
      v-if="!pending && !productsF.length"
    >
      <vue-feather stroke="black" type="inbox" size="8rem"></vue-feather>
      <span class="flex flex-col items-center text-2xl">
        В избранном пока пусто
        <p class="text-lg text-gray-500">
          Добавляйте сюда всё, что понравилось. Так не придётся долго искать, когда захотите
          посмотреть или купить.
        </p>
      </span>
      <Button severity="contrast" style="padding: 0" variant="outlined" class="group relative">
        <router-link to="/">
          <div class="inline-flex items-center gap-2 p-2">
            <vue-feather
              class="relative group-hover:left-1"
              stroke="black"
              type="arrow-right"
            ></vue-feather>
            В каталог
          </div>
        </router-link>
      </Button>
    </div>
  </div>
</template>
