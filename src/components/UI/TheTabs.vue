<script setup>
// data
defineProps({
  items: Array,
  isActiveTab: {
    type: String,
    default: 'all',
    required: true,
  },
  isSubcategoryTab: {
    type: String,
    required: true,
  },
});

// emits
defineEmits(['setActiveTab']);
</script>

<template>
  <ul class="menuList flex items-center">
    <li
      v-auto-animate
      v-for="item in items"
      :key="item"
      @click="$emit('setActiveTab', item, $event)"
      class="menuList__item"
      :class="[
        {
          menuList__item_active: isActiveTab === item.slug,
          menuList__item_sub: item.subcategories && item.subcategories.length > 0,
        },
      ]"
    >
      <span class="menuList__name">{{ item.name.toUpperCase() }}</span>
      <ul
        class="menuList__subcategories flex gap-2"
        v-if="isActiveTab === item.slug && item.subcategories"
      >
        <li
          v-for="subcategory in item.subcategories"
          :key="subcategory"
          class="menuList__subcategory"
          :class="{ menuList__subcategory_active: isSubcategoryTab === subcategory.name }"
        >
          {{ subcategory.name.toUpperCase() }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<style scoped>
.menuList {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  list-style: none;
  gap: 15px;
  overflow: hidden;
}

.menuList__item {
  padding: 10px 14px;
  background-color: #fcf7eb;
  cursor: pointer;
}

.menuList__item_active {
  background-color: #ffc43f;
}

@media screen and (min-width: 1024px) {
  .menuList {
    gap: 25px;
  }

  .menuList__item {
    font-weight: 400;
    font-size: 1rem;
    color: #858585;
    line-height: 22px;
    position: relative;
    padding: 0;
    background-color: transparent;
    padding: 0;
    border: none;
  }

  .menuList__item:hover {
    color: #222222;
  }

  .menuList__item_active {
    position: relative;
    background-color: transparent;
    position: relative;
    font-weight: 600;
    color: #222222;
    cursor: default;
  }

  .menuList__subcategories {
    font-size: 1rem;
  }

  .menuList__item_active.menuList__item_sub {
    font-size: 0.7rem;
  }

  .menuList__item_active.menuList__item_sub .menuList__name {
    position: absolute;
    top: -16px;
  }

  .menuList__subcategory {
    color: #858585;
    font-size: 1rem;
    font-weight: 400;
    cursor: pointer;
  }

  .menuList__subcategory_active {
    font-weight: 600;
    color: #222222;
    cursor: default;
  }

  .menuList__subcategory:hover {
    color: #222222;
  }
}
</style>
