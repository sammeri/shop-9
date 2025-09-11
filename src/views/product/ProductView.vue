<script setup>
import { ref } from 'vue';
import VLazyImage from 'v-lazy-image';
import Fieldset from 'primevue/fieldset';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProduct } from '@/stores/useProductStore';
import { useFavorites } from '@/stores/useFavoritesStore';
import QuantitySelector from './components/QuantitySelector.vue';
import { DEV_MODE, BASE_URL } from '@/utils/constants';

// data
const productStore = useProduct();
const favoritesStore = useFavorites();
const route = useRoute();
const activeIndex = ref(0);
const displayBasic = ref(false);

// computed
const product = computed(() => productStore.product);

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
    <div v-if="product" class="p-t my-10 flex w-full justify-between gap-20">
      <div v-if="images.length > 0" class="w-4/10">
        <Galleria
          v-model:activeIndex="activeIndex"
          :value="images"
          :responsiveOptions="responsiveOptions"
          :numVisible="5"
          :thumbnailsPosition="'right'"
          verticalThumbnailViewPortHeight="100%"
          unstyled
          :pt="{
            root: 'relative pt-[106.6%] flex  w-full border-none',
            content: 'absolute flex gap-2  justify-start left-0 top-0 h-full w-full',
            itemscontainer: 'h-full grow',
            items: 'h-full',
            item: 'h-full',
            thumbnails: 'h-full',
            thumbnail: 'cursor-pointer',
            thumbnailcontent: 'relative h-full overflow-hidden ',
            thumbnailsviewport: 'h-full w-20 ',
            thumbnailitems: 'flex flex-col gap-2',
            thumbnailprevbutton:
              'cursor-pointer absolute top-0 w-full text-white/45 bg-gray-600/45 z-30 hover:bg-gray-600/95 hover:text-white/95',
            thumbnailnextbutton:
              'cursor-pointer absolute bottom-0 w-full text-white/45 bg-gray-600/45 z-30 hover:bg-gray-600/95 hover:text-white/95',
          }"
        >
          <template #item="slotProps">
            <button class="h-full w-full cursor-pointer" @click="displayBasic = true">
              <v-lazy-image
                v-if="slotProps.item?.image"
                class="max-h-full w-full object-cover"
                :src="slotProps.item.image"
                :alt="slotProps.item.alt"
              />
            </button>
          </template>

          <template #thumbnail="slotProps">
            <v-lazy-image
              v-if="slotProps.item?.image"
              class="w-auto object-contain"
              :src="slotProps.item.image"
              :alt="slotProps.item.alt"
            />
          </template>
        </Galleria>
      </div>
      <div v-else>
        <p>Изображений нет :(</p>
      </div>
      <div class="flex w-6/10 flex-col gap-3 bg-gray-50 p-2">
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
    <Teleport to="body">
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
          mask: 'fixed top-0 left-0 w-full h-full bg-black',
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
    </Teleport>
  </div>
</template>

<style lang="scss" scoped></style>
