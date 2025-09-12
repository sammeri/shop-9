<script setup>
import { ref, computed, onMounted } from 'vue';
import { useProducts } from '@/stores/useProductsStore';
import ProductItemCard from '@/components/product/ProductItemCard.vue';
import InfiniteScrollingPagination from './UI/InfiniteScrollingPagination.vue';

// refs
const cursor = ref(null);

// data
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
const loadMore = async () => {
  if (cursor.value === 'end') return;
  const nextCursor = await getData(cursor.value);
  cursor.value = nextCursor;
};

// hooks
onMounted(async () => {
  const initialCursor = await getData();
  cursor.value = initialCursor;

  syncWithLocalStorage('favorites');
  syncWithLocalStorage('cart');
});
</script>

<template>
  <div class="">
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <infinite-scrolling-pagination v-else :cursor="cursor" @loadMore="loadMore">
      <ProductItemCard v-for="product in productList" :key="product.id" :item="product" />
    </infinite-scrolling-pagination>
  </div>
</template>

<style lang="scss" scoped></style>
