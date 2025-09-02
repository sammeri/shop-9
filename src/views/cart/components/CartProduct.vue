<script setup>
import VLazyImage from 'v-lazy-image';
import { useFavorites } from '@/stores/favoritesProducts';
import { useCart } from '@/stores/cartProducts';
import { computed } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
  index: {
    type: Number,
    required: true,
  },
});

// data
const favoritesStore = useFavorites();
const cartStore = useCart();
// computed
const sum = computed(() => {
  let num = props.item.price * props.item.quantity;
  return num.toFixed(2);
});

// methods
const { toggleFavorite } = favoritesStore;
const { addQuantity, removeQuantity, removeProduct } = cartStore;
</script>

<template>
  <div class="z-50 flex">
    <div class="succsess-alert flex h-32 w-full cursor-default items-center bg-[#ffffff]">
      <div class="flex h-full gap-4 p-3">
        <div
          class="flex h-full w-28 shrink-0 justify-center bg-white/5 text-[#2b9875] backdrop-blur-xl"
        >
          <v-lazy-image class="w-auto object-contain" :src="item.image" alt="Product Image" />
        </div>
        <div class="flex flex-col justify-between">
          <p class="line-clamp-2 text-gray-500">{{ item.title }}</p>
          <div class="flex gap-2">
            <button
              class="top-0 right-0 z-10 flex cursor-pointer items-center p-2"
              type="button"
              @click.prevent="toggleFavorite(item)"
            >
              <vue-feather
                class="[&>svg]:ease [&>svg]:transition-all [&>svg]:duration-300"
                :class="[item.isFavorite ? '[&>svg]:fill-red-500' : '[&>svg]:fill-white']"
                :stroke-width="item.isFavorite ? '0' : '2'"
                type="heart"
              ></vue-feather>
            </button>

            <button
              @click.prevent="removeProduct(item)"
              class="flex cursor-pointer items-center p-1 text-gray-600 transition-colors ease-linear"
            >
              <vue-feather class="relative group-hover:left-1" type="trash-2"></vue-feather>
            </button>
          </div>
        </div>
      </div>

      <div class="ml-auto flex shrink-0 items-center gap-3 p-3">
        <div class="flex flex-col items-center">
          <span class="text-xl font-bold text-green-500">{{ sum }} $</span>
          <span class="text-sm text-gray-500">Lorem ipsum, dolor sit amet</span>
        </div>

        <div class="quantity-selector flex h-9 border-1 border-t-stone-800">
          <input
            type="number"
            class="quantity-input text-center outline-0"
            name="quantity"
            title="Количество"
            :value="item.quantity"
            min="1"
            max="10"
            step="1"
            disabled
          />
          <button
            @click="removeQuantity(index)"
            type="button"
            class="group -order-1 flex cursor-pointer items-center p-1 hover:bg-neutral-900 hover:text-white active:bg-red-700"
          >
            <vue-feather type="minus" stroke="currentColor"></vue-feather>
            <span class="visually-hidden hidden">Убавить</span>
          </button>
          <button
            @click="addQuantity(index)"
            type="button"
            class="group flex cursor-pointer items-center p-1 hover:bg-neutral-900 hover:text-white active:bg-emerald-600"
          >
            <vue-feather type="plus"></vue-feather>
            <span class="visually-hidden hidden">Добавить</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
