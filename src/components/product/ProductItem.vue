<script setup>
import VLazyImage from 'v-lazy-image';
import { useFavorites } from '@/stores/favoritesProducts';
import { useCart } from '@/stores/cartProducts';

defineProps({
  item: {
    type: Object,
    default: null,
  },
});

// data
const favoritesStore = useFavorites();
const cartStore = useCart();
// methods
const { toggleFavorite } = favoritesStore;
const { addProduct } = cartStore;
</script>

<template>
  <router-link
    :to="`/product/${item.id}`"
    class="group relative flex flex-col gap-0.5 duration-100 ease-in"
  >
    <div
      class="relative flex h-full flex-col justify-center gap-3 border border-gray-200 p-1 duration-100 ease-in group-hover:border-white group-hover:bg-white"
    >
      <vue-feather
        @click.prevent="toggleFavorite(item)"
        class="[&>svg]:ease absolute top-0 right-0 z-10 cursor-pointer p-2 pt-1 pr-1 [&>svg]:transition-all [&>svg]:duration-300"
        :class="[item.isFavorite ? '[&>svg]:fill-red-500' : '[&>svg]:fill-white']"
        :stroke-width="item.isFavorite ? '0' : '2'"
        type="heart"
      ></vue-feather>

      <div class="relative flex flex-col justify-center">
        <v-lazy-image
          src-placeholder="https://placehold.co/600x400"
          class="h-60 w-auto object-contain"
          :src="item.image"
          alt="Product Image"
        />
        <button
          type="button"
          class="absolute bottom-0 w-full cursor-pointer bg-gray-400/80 p-2 text-white opacity-0 duration-200 group-hover:opacity-100 hover:bg-gray-400/90"
        >
          Быстрый просмотр
        </button>
      </div>

      <span :title="item.title" class="line-clamp-1 text-xl leading-6 text-clip">{{
        item.title
      }}</span>
    </div>

    <div
      class="footer mt-auto flex justify-between border border-gray-200 p-1 duration-100 ease-in group-hover:border-white group-hover:bg-white"
    >
      <span class="text-xl font-bold text-green-500">{{ item.price }} $</span>
      <div class="flex items-center gap-2 text-gray-500 hover:text-black">
        <button @click.prevent="addProduct(item)" class="flex cursor-pointer">
          <vue-feather class="" type="shopping-cart" fill="currentColor"></vue-feather>
          <vue-feather class="" type="plus" fill="currentColor"></vue-feather>
        </button>
      </div>
    </div>
  </router-link>
</template>
