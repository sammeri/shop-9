<script setup>
import VLazyImage from 'v-lazy-image';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProduct } from '@/stores/product';
import { useFavorites } from '@/stores/favoritesProducts';

// data
const productStore = useProduct();
const favoritesStore = useFavorites();
const route = useRoute();
// computed
const product = computed(() => productStore.product);
const pending = computed(() => productStore.pending);
// methods
const { getData } = productStore;
const { toggleFavorite } = favoritesStore;

const changeValue = (item) => {
  if (item.isFavorite) {
    item.isFavorite = false;
  }

  toggleFavorite(item);
};
//hooks
onMounted(async () => {
  await getData(route.params.id);

  if (localStorage.getItem('favorites')) {
    const items = JSON.parse(localStorage.getItem('favorites'));

    if (items.find((el) => el.id === product.value.id)) {
      product.value.isFavorite = true;
    }
  }
});
</script>

<template>
  <div class="container mb-7 flex min-h-full flex-col items-center justify-center">
    <!-- <h1 class="my-3 mr-auto text-4xl font-bold">Карточка товара</h1> -->
    <ProgressBar
      v-if="pending"
      class="w-screen"
      mode="indeterminate"
      style="height: 6px"
    ></ProgressBar>
    <div class="my-10 flex w-full justify-between gap-3">
      <v-lazy-image class="" :src="product.image" alt="Product Image" />

      <div class="flex w-1/2 flex-col gap-3">
        <h1 class="text-4xl font-bold">{{ product.title }}</h1>
        <span class="flex items-center gap-3 text-xl">
          <vue-feather type="star" stroke="black" fill="yellow"></vue-feather>
          {{ product.rating?.rate }} • {{ product.rating?.count }} reviews
        </span>
        <h3>{{ product.description }}</h3>

        <div class="flex justify-between">
          <span>{{ product.price }} $</span>
          <div>
            <vue-feather
              @click.prevent="changeValue(product)"
              :fill="product.isFavorite ? 'red' : 'none'"
              class="cursor-pointer"
              type="heart"
            >
            </vue-feather>
            <vue-feather class="cursor-pointer" type="shopping-cart"></vue-feather>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
