<script setup>
import TheTabs from './UI/TheTabs.vue';
import { ref } from 'vue';

// emits
const emit = defineEmits(['onCategoryClick']);

// data
defineProps({
  items: {
    type: Array,
    required: true,
  },
});

// refs
let isActiveTab = ref('all');
let isSubcategoryTab = ref('');

// methods
const setActiveTab = (item, event) => {
  const text = event.target.innerText.toLowerCase();

  if (item.name === text && isActiveTab.value !== item.slug) {
    isActiveTab.value = item.slug;
    isSubcategoryTab.value = '';
    emit('onCategoryClick', item);
  }

  if (isActiveTab.value !== 'all' && item.subcategories?.find((c) => c.name === text)) {
    const subcategory = item.subcategories.find((c) => {
      if (c.name === text) {
        return c.slug;
      }
    });
    isSubcategoryTab.value = text;
    isActiveTab.value = item.slug;
    emit('onCategoryClick', subcategory);
  }
};
</script>

<template>
  <TheTabs
    @setActiveTab="setActiveTab"
    :is-active-tab="isActiveTab"
    :is-subcategory-tab="isSubcategoryTab"
    :items="items"
  />
</template>
