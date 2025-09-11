<script setup>
import { ref, onMounted, computed } from 'vue';
import { useProducts } from '@/stores/useProductsStore';
import { useCategories } from '@/stores/useCategoriesStore';
import CategoryTabs from './CategoryTabs.vue';
import ProductsList from './ProductsList.vue';

// state
const activeCategory = ref('all');

// data
const productsStore = useProducts();
const categoriesStore = useCategories();

// computed
const allCategories = computed(() => categoriesStore.allCategories);
const isCategory = computed(() => categoriesStore.isCategory);
const isProducts = computed(() => productsStore.isProducts);

// methods

const { getAllCategories } = categoriesStore;
const setActiveCategory = (selectedCategory) => {
  activeCategory.value = selectedCategory.slug;
};

//hooks
onMounted(async () => {
  try {
    await getAllCategories();
  } catch (error) {
    console.error('Ошибка загрузки данных:', error.message);
  }
});
</script>

<template>
  <div class="container flex min-h-full flex-col items-center">
    <div class="my-3 flex w-full justify-between">
      <h1 class="text-2xl font-bold sm:text-3xl md:text-4xl">Каталог</h1>
      <CategoryTabs
        :items="allCategories"
        @onCategoryClick="setActiveCategory"
        v-if="isProducts && isCategory"
      />
    </div>
    <ProductsList :category="activeCategory" />
  </div>
</template>
