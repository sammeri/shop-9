<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCart } from '@/stores/useCartStore';

// data
const props = defineProps({
  product: { type: Object, required: true },
});

const cartStore = useCart();
const router = useRouter();

const quantity = computed(() => {
  const item = cartStore.productsCart.find((p) => p.id === props.product.id);
  return item ? item.quantity : 0;
});

// computed
const inCart = computed(() => quantity.value > 0);

// mothods
const add = () => {
  if (!inCart.value) {
    cartStore.addProduct(props.product);
  } else {
    router.push('/cart');
  }
};

const increase = () => cartStore.addQuantityByID(props.product.id);
const decrease = () => {
  cartStore.removeQuantityByID(props.product.id);
};
</script>

<template>
  <div class="flex gap-2">
    <button
      @click="add"
      type="button"
      :class="[
        'flex cursor-pointer items-center gap-1 p-2 text-white hover:bg-green-500',
        inCart ? 'bg-green-600' : 'bg-indigo-400',
      ]"
    >
      <vue-feather :type="inCart ? 'check' : 'plus'" />
      <div class="flex flex-col leading-4">
        <span class="font-bold">{{ inCart ? 'В корзине' : 'Добавить в корзину' }}</span>
        <span v-show="inCart" class="text-sm">Перейти</span>
      </div>
    </button>

    <div
      v-if="quantity > 0"
      class="quantity-selector flex h-full items-center border border-stone-800"
    >
      <button
        @click="decrease"
        class="flex h-full items-center justify-center p-1 hover:bg-red-600 hover:text-white"
      >
        <vue-feather type="minus" />
      </button>

      <input
        type="number"
        class="quantity-input h-full w-12 text-center outline-0"
        :value="quantity"
        min="1"
        max="10"
        step="1"
        disabled
      />

      <button
        @click="increase"
        class="flex h-full items-center justify-center p-1 hover:bg-emerald-600 hover:text-white"
      >
        <vue-feather type="plus" />
      </button>
    </div>
  </div>
</template>
