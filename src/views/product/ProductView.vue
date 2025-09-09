<script setup>
import { ref } from 'vue';
import VLazyImage from 'v-lazy-image';
import Fieldset from 'primevue/fieldset';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProduct } from '@/stores/useProductStore';
import { useFavorites } from '@/stores/useFavoritesStore';
import QuantitySelector from './components/QuantitySelector.vue';

const DEV_MODE = import.meta.env.DEV;
const BASE_URL = import.meta.env.BASE_URL.replace(/\/+$/, '');

// data
const productStore = useProduct();
const favoritesStore = useFavorites();
const route = useRoute();
const activeIndex = ref(0);
const displayBasic = ref(false);
// computed
const product = computed(() => productStore.product);
const pending = computed(() => productStore.pending);
const images = computed(() => {
  if (!product.value || !product.value.images) return [];
  return product.value.images.map((img, index) => {
    const currentUrl = DEV_MODE && img ? img : img.replace('/public', '');
    return {
      image: currentUrl ? `${BASE_URL}${currentUrl}` : '',
      alt: `Product Image ${index + 1}`,
      log: 'img',
    };
  });
});

const responsiveOptions = [
  {
    breakpoint: '1024px',
    numVisible: 5,
  },
  {
    breakpoint: '768px',
    numVisible: 3,
  },
  {
    breakpoint: '560px',
    numVisible: 1,
  },
];

// methods
const { getDataProduct } = productStore;
const { toggleFavorite } = favoritesStore;

const changeValue = (item) => {
  item.isFavorite = !item.isFavorite;
  toggleFavorite(item);
};

// hooks
onMounted(async () => {
  await getDataProduct(route.params.id);
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  if (favorites.find((el) => el.id === product.value.id)) {
    product.value.isFavorite = true;
  }
});
</script>

<template>
  <div class="container mb-7 flex min-h-full flex-col items-center justify-center">
    <ProgressBar
      v-if="pending"
      class="w-screen"
      mode="indeterminate"
      style="height: 6px"
    ></ProgressBar>

    <div v-else class="my-10 flex w-full justify-between gap-20">
      <!-- <v-lazy-image :src="product.image" alt="Product Image" /> -->
      <div v-if="images.length > 0" class="grow">
        <Galleria
          v-model:activeIndex="activeIndex"
          :value="images"
          :responsiveOptions="responsiveOptions"
          :numVisible="5"
          :thumbnailsPosition="'right'"
        >
          <template #item="slotProps">
            <button class="cursor-pointer" @click="displayBasic = true">
              <v-lazy-image
                v-if="slotProps.item?.image"
                class="h-full w-full object-contain"
                :src="slotProps.item.image"
                :alt="slotProps.item.alt"
              />
            </button>
          </template>

          <template #thumbnail="slotProps">
            <v-lazy-image
              v-if="slotProps.item?.image"
              class="h-20 w-auto object-contain"
              :src="slotProps.item.image"
              :alt="slotProps.item.alt"
            />
          </template>
        </Galleria>
      </div>
      <div v-else>
        <p>Изображений нет :(</p>
      </div>
      <div class="flex w-1/2 flex-col gap-3 bg-gray-50 p-2">
        <div class="flex items-center justify-between">
          <h1 class="text-4xl font-bold">{{ product.title }}</h1>
          <vue-feather
            @click.prevent="changeValue(product)"
            :fill="product.isFavorite ? 'red' : 'none'"
            :stroke-width="product.isFavorite ? '0' : '2'"
            class="shrink-0 cursor-pointer self-baseline pt-1 pr-1"
            type="heart"
            size="32px"
          />
        </div>

        <span class="flex items-center gap-3 text-xl">
          <vue-feather type="star" stroke="black" fill="yellow"></vue-feather>
          {{ product.rating?.rate }} • {{ product.rating?.count }} reviews
        </span>

        <div class="mt-auto flex flex-col gap-2">
          <div class="flex gap-2 self-end">
            <strong class="bg-green-200 p-2 text-3xl font-bold text-green-500">
              {{ product.price }} $
            </strong>
            <QuantitySelector :product="product" />
          </div>

          <Fieldset>
            <template #legend>
              <span class="font-bold">Описание</span>
            </template>
            <p class="m-0 text-xl">{{ product.description }}</p>
          </Fieldset>
        </div>
      </div>
    </div>
    <Galleria
      v-model:activeIndex="activeIndex"
      v-model:visible="displayBasic"
      :value="images"
      :responsiveOptions="responsiveOptions"
      :numVisible="5"
      :circular="true"
      :fullScreen="true"
      :showItemNavigators="true"
      :maskClass="'bg-black'"
      unstyled
      :pt="{
        mask: 'bg-black',
      }"
    >
      <template #item="slotProps">
        <v-lazy-image
          v-if="slotProps.item?.image"
          class="h-full max-h-dvh w-full object-contain"
          :src="slotProps.item.image"
          :alt="slotProps.item.alt"
        />
      </template>
      <template #thumbnail="slotProps">
        <v-lazy-image
          v-if="slotProps.item?.image"
          class="h-20 w-auto object-contain"
          :src="slotProps.item.image"
          :alt="slotProps.item.alt"
        />
      </template>
    </Galleria>
  </div>
</template>

<style lang="scss" scoped></style>
