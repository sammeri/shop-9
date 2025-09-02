<script setup>
import { onMounted, computed } from 'vue';
import ProductItem from '@/components/product/ProductItem.vue';
import { useProducts } from '@/stores/products';

// data
const productsStore = useProducts();
// computed
const products = computed(() => productsStore.products);
const pending = computed(() => productsStore.pending);
// methods
const { getData } = productsStore;
//hooks
onMounted(async () => {
  try {
    await getData();
    const favorites = localStorage.getItem('favorites');
    const carts = localStorage.getItem('cart');
    if (favorites || carts) {
      if (favorites) {
        try {
          const items = JSON.parse(favorites);
          products.value.forEach((p) => {
            p.isFavorite = !!items.find((el) => el.id === p.id);
          });
        } catch (error) {
          console.error('Ошибка парсинга избранных товаров(favorites):', error);
        }
      }
      try {
        const items = JSON.parse(carts);
        products.value.forEach((p) => {
          const itemQuantity = items.find((el) => el.id === p.id);
          if (itemQuantity) {
            p.quantity = itemQuantity.quantity;
          }
        });
      } catch (error) {
        console.error('Ошибка парсинга товаров корзины(cart):', error);
      }
    }
  } catch (error) {
    console.error('Ошибка загрузки данных:', error);
  }
});
</script>
<template>
  <div class="container flex min-h-full flex-col items-center">
    <div v-show="!pending" style="height: 6px"></div>
    <ProgressBar
      v-show="pending"
      class="w-screen"
      mode="indeterminate"
      style="height: 6px"
    ></ProgressBar>
    <h1 class="my-3 mr-auto text-2xl font-bold sm:text-3xl md:text-4xl">Каталог</h1>
    <div class="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
      <ProductItem v-for="product in products" :key="product.id" :item="product" />
    </div>
  </div>
</template>
