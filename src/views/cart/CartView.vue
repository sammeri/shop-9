<script setup>
import { computed } from 'vue';
import CartProduct from '@/views/cart/components/CartProduct.vue';
import { useCart } from '@/stores/useCartStore';
// import { useFavorites } from '@/stores/favoritesProducts'
import Button from 'primevue/button';

// data
const cartStore = useCart();
// computed
const productsCart = computed(() => cartStore.productsCart);
const pending = computed(() => cartStore.pending);
const counter = computed(() => cartStore.counter);
const productTextArr = ['товар', 'товара', 'товаров'];
const total = computed(() => {
  let sum = 0;
  productsCart.value.map((item) => {
    sum = sum + item.quantity * item.price;
  });

  return sum.toFixed(1);
});
// methods
const { addAllCart, removeAllCart } = cartStore;

const num_word = (value, words) => {
  value = Math.abs(value) % 100;
  const num = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num == 1) return words[0];
  return words[2];
};
</script>

<template>
  <div class="container flex min-h-full grow flex-col items-center">
    <div class="my-3 flex w-full justify-between text-2xl">
      <h1 class="font-bold sm:text-3xl md:text-4xl">Корзина</h1>
      <div class="relative flex gap-3 border-1 border-red-600 p-1">
        <span class="absolute -top-3 bg-gray-100 text-sm font-bold text-red-600">debug</span>
        <button
          type="button"
          class="flex cursor-pointer items-center gap-1 text-amber-400 hover:text-amber-300"
          @click="addAllCart()"
        >
          <vue-feather
            class="relative"
            stroke="currentColor"
            type="arrow-up-circle"
            size="16px"
          ></vue-feather>
          <span class="text-sm">Добавить всё</span>
        </button>
        <button
          type="button"
          class="flex cursor-pointer items-center gap-1 text-red-400 hover:text-red-300"
          @click="removeAllCart()"
        >
          <vue-feather
            class="relative"
            stroke="currentColor"
            type="x-circle"
            size="16px"
          ></vue-feather>
          <span class="text-sm">Удалить всё</span>
        </button>
      </div>
    </div>
    <div
      v-if="!pending && productsCart.length"
      class="grid-rows-auto mb-4 grid w-full grid-cols-6 gap-3"
    >
      <div class="col-start-1 col-end-5 flex flex-col gap-3">
        <CartProduct
          v-for="(product, index) in productsCart"
          :key="product.id"
          :item="product"
          :index="index"
        />
      </div>
      <div class="col-start-5 col-end-7 row-span-full min-h-100">
        <div class="sticky top-28 z-10 flex min-h-60 w-full flex-col gap-6 bg-white p-3">
          <button
            type="button"
            class="group relative inline-flex w-full cursor-pointer justify-center overflow-hidden bg-green-500 px-8 py-4 text-center text-base font-bold text-white uppercase outline-offset-4 transition-all duration-300 ease-in-out hover:bg-green-400 focus:outline-0 focus:outline-white active:outline-0"
          >
            <span class="relative z-20">Оформить заказ</span>
            <span
              class="absolute top-0 left-[-75%] z-10 h-full w-[20%] rotate-12 border-b-green-600 bg-green-300 blur-lg transition-all duration-800 ease-in-out group-hover:left-[125%]"
            ></span>
          </button>
          <div class="flex w-full items-center justify-between">
            <h3 class="text-2xl font-bold">Ваша корзина</h3>
            <span class="text-lg"> {{ counter }} • {{ num_word(counter, productTextArr) }}</span>
          </div>
          <div class="flex w-full justify-between text-lg">
            <span>Товары ({{ counter }})</span>
            <span>{{ total }} $</span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="mt-6 flex w-full grow flex-col items-center justify-center gap-5"
      v-if="!pending && !productsCart.length"
    >
      <vue-feather stroke="black" type="shopping-cart" size="8rem"></vue-feather>
      <span class="flex flex-col items-center text-2xl">
        Корзина пуста
        <p class="text-lg text-gray-500">Перейдите в каталог для поиска товаров</p>
      </span>
      <Button severity="contrast" style="padding: 0" variant="outlined" class="group relative">
        <router-link to="/">
          <div class="inline-flex items-center gap-2 p-2">
            <vue-feather
              class="relative group-hover:left-1"
              stroke="black"
              type="arrow-right"
            ></vue-feather>
            В каталог
          </div>
        </router-link>
      </Button>
    </div>
  </div>
</template>
