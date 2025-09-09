<script setup>
import { ref, onMounted, computed } from 'vue';
import ProductItemCard from '@/components/product/ProductItemCard.vue';
import { useProducts } from '@/stores/useProductsStore';
import { useCategories } from '@/stores/useCategoriesStore';
import CategoryTabs from '@/components/CategoryTabs.vue';

// state
const activeCategory = ref('all');

// data
const productsStore = useProducts();
const categoriesStore = useCategories();

// computed
const pending = computed(() => productsStore.pending);
const products = computed(() => productsStore.products);
const allCategories = computed(() => categoriesStore.allCategories);
const isProducts = computed(() => productsStore.isProducts);
const isCategory = computed(() => categoriesStore.isCategory);

const productList = computed(() => {
  if (activeCategory.value === 'all') return products.value;
  return products.value.filter(
    (product) =>
      product.category === activeCategory.value || product.subcategory === activeCategory.value,
  );
});

// methods
const { getData } = productsStore;
const { getAllCategories } = categoriesStore;
const setActiveCategory = (selectedCategory) => {
  activeCategory.value = selectedCategory.slug;
};

//hooks
onMounted(async () => {
  try {
    await getAllCategories();
    await getData();

    // TODO: Разобрать этот спагетти
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
    <div class="my-3 flex w-full justify-between">
      <h1 class="text-2xl font-bold sm:text-3xl md:text-4xl">Каталог</h1>
      <CategoryTabs
        :items="allCategories"
        @onCategoryClick="setActiveCategory"
        v-if="isProducts && isCategory"
      />
    </div>
    <div class="mb-4 grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
      <ProductItemCard v-for="product in productList" :key="product.id" :item="product" />
    </div>
  </div>
</template>
