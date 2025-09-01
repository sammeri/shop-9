<script setup>
import { computed } from 'vue';
import CartProduct from '@/views/cart/components/CartProduct.vue';
import { useCart } from '@/stores/cartProducts';
// import { useFavorites } from '@/stores/favoritesProducts'
import Button from 'primevue/button';

// data
const cartStore = useCart();
// computed
const productsCart = computed(() => cartStore.productsCart);
const pending = computed(() => cartStore.pending);
const counter = computed(() => cartStore.counter);
const total = computed(() => {
  let sum = 0;
  productsCart.value.map((item) => {
    sum = sum + item.quantity * item.price;
  });

  return sum.toFixed(1);
});
// methods
function num_word(value, words) {
  value = Math.abs(value) % 100;
  const num = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num == 1) return words[0];
  return words[2];
}
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
    <h1 class="my-3 mr-auto text-2xl font-bold sm:text-3xl md:text-4xl">Корзина</h1>
    <div v-if="!pending && productsCart.length" class="mb-4 grid w-full grid-cols-6 gap-3">
      <div class="col-start-1 col-end-5 grid gap-3">
        <CartProduct
          v-for="(product, index) in productsCart"
          :key="product.id"
          :item="product"
          :index="index"
        />
      </div>
      <div class="col-start-5 col-end-7 flex flex-col items-start gap-6 bg-white p-3">
        <button
          type="button"
          class="font-barlow group relative inline-flex w-full cursor-pointer justify-center overflow-hidden bg-green-500 px-8 py-4 text-center text-base font-bold text-white uppercase outline-offset-4 transition-all duration-300 ease-in-out hover:bg-green-400 focus:outline-0 focus:outline-white active:outline-0"
        >
          <span class="relative z-20">Оформить заказ</span>
          <span
            class="absolute top-0 left-[-75%] z-10 h-full w-[20%] rotate-12 border-b-green-600 bg-green-300 blur-lg transition-all duration-800 ease-in-out group-hover:left-[125%]"
          ></span>
        </button>
        <div class="flex w-full items-center justify-between">
          <h3 class="text-2xl font-bold">Ваша корзина</h3>
          <span class="text-lg">
            {{ counter }} • {{ num_word(counter, ['товар', 'товара', 'товаров']) }}</span
          >
        </div>
        <div class="flex w-full justify-between text-lg">
          <span>Товары ({{ counter }})</span>
          <span>{{ total }} $</span>
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
      <Button severity="contrast" variant="outlined" class="group relative">
        <router-link class="flex items-center gap-2" to="/">
          <vue-feather
            class="relative group-hover:left-1"
            stroke="black"
            type="arrow-right"
          ></vue-feather>
          В каталог
        </router-link>
      </Button>
    </div>
  </div>
</template>
