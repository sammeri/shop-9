<script setup>
import { computed, onMounted } from 'vue';
import { useProducts } from '@/stores/useProductsStore';
import ProductItemCard from '@/components/product/ProductItemCard.vue';

//data
const props = defineProps({
  category: {
    type: String,
    default: 'all',
  },
});

const productsStore = useProducts();

// computed
const errorMessage = computed(() => productsStore.errorMessage);
const products = computed(() => productsStore.products);
const productList = computed(() => {
  if (props.category === 'all') return products.value;
  return products.value.filter(
    (product) => product.category === props.category || product.subcategory === props.category,
  );
});

// methods
const { getData, syncWithLocalStorage } = productsStore;

// hooks
onMounted(async () => {
  await getData();
  syncWithLocalStorage('favorites');
  syncWithLocalStorage('cart');
});
</script>

<template>
  <div class="mb-4 grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <ProductItemCard v-else v-for="product in productList" :key="product.id" :item="product" />
  </div>
</template>

<style lang="scss" scoped></style>
