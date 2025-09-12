<script setup>
import { ref, computed } from 'vue';
import VLazyImage from 'v-lazy-image';
import { useFavorites } from '@/stores/useFavoritesStore';
import { useCart } from '@/stores/useCartStore';
import { DEV_MODE, BASE_URL, RESPONSIVE_OPTIONS } from '@/utils/constants';

let leaveTimer = null;

// data
const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
});
const favoritesStore = useFavorites();
const cartStore = useCart();

// refs
const activeIndex = ref(0);

// computed
const images = computed(() => {
  if (!props.item || !props.item.images) return [];
  return props.item.images.map((img, index) => {
    const currentUrl = DEV_MODE && img ? img : img.replace('/public', '');
    return {
      image: currentUrl ? `${BASE_URL}${currentUrl}` : '',
      alt: `Product Image ${index + 1}`,
      log: 'img',
    };
  });
});

// methods
const { toggleFavorite } = favoritesStore;
const { addProduct } = cartStore;

function onContainerEnter() {
  if (leaveTimer) {
    clearTimeout(leaveTimer);
    leaveTimer = null;
  }
}

function onContainerLeave() {
  leaveTimer = setTimeout(() => {
    activeIndex.value = 0;
    leaveTimer = null;
  }, 100);
}
</script>

<template>
  <router-link
    :to="`/product/${item.id}`"
    class="group relative flex flex-col overflow-hidden bg-white duration-100 ease-in"
  >
    <div
      class="relative flex h-full flex-col justify-center border border-gray-200 duration-100 ease-in group-hover:border-white group-hover:bg-white"
    >
      <button
        @click.prevent="toggleFavorite(item)"
        class="absolute top-0 right-0 z-30 flex cursor-pointer p-2 pt-1 pr-1"
      >
        <vue-feather
          class="[&>svg]:ease cursor-pointer [&>svg]:transition-all [&>svg]:duration-300"
          :class="[item.isFavorite ? '[&>svg]:fill-red-500' : '[&>svg]:fill-white']"
          :stroke-width="item.isFavorite ? '0' : '2'"
          type="heart"
        ></vue-feather>
      </button>
      <div v-if="images.length > 0" class="h-auto min-h-80 grow overflow-hidden">
        <Galleria
          v-memo="[activeIndex]"
          v-model:activeIndex="activeIndex"
          unstyled
          :value="images"
          :responsiveOptions="RESPONSIVE_OPTIONS"
          :numVisible="5"
          :showThumbnails="false"
          :showIndicators="true"
          :changeItemOnIndicatorHover="true"
          :showIndicatorsOnItem="true"
          indicatorsPosition="top"
          :pt="{
            root: 'relative flex w-full',
            content: 'w-full',
            items: 'flex w-full  overflow-hidden items-center',
            itemscontainer: 'w-full',
            item: 'flex w-full h-90 max-h-90 justify-center items-center',
            indicatorlist: 'flex absolute h-full w-full top-0',
            indicator: 'relative z-20 flex-auto',
            thumbnail: 'absolute',
          }"
        >
          <template #item="slotProps">
            <v-lazy-image
              v-if="slotProps.item?.image"
              :class="slotProps.item.image === images[0].image ? 'first-item' : ''"
              class="relative z-20 h-full min-h-full w-full max-w-full object-contain"
              :src="slotProps.item.image"
              :alt="slotProps.item.alt"
            />
          </template>

          <template #indicator>
            <div
              class="absolute top-0 flex h-full w-full"
              @mouseenter="onContainerEnter"
              @mouseleave="onContainerLeave"
            ></div>
          </template>
        </Galleria>
      </div>
      <div class="absolute bottom-11 left-0 flex w-full flex-col justify-center">
        <button
          type="button"
          class="absolute bottom-0 z-30 w-full cursor-pointer bg-gray-400/80 p-2 text-white opacity-0 duration-200 group-hover:opacity-100 hover:bg-gray-400/90"
        >
          Быстрый просмотр
        </button>
      </div>

      <span :title="item.title" class="line-clamp-1 p-1 text-xl leading-6 text-clip">
        {{ item.title }}
      </span>
    </div>

    <div
      class="footer mt-auto flex justify-between border border-gray-200 p-1 duration-100 ease-in group-hover:border-white group-hover:bg-white"
    >
      <span class="text-xl font-bold text-green-500">{{ item.price }} $</span>
      <div class="flex items-center gap-2 text-gray-500 hover:text-black">
        <button @click.prevent="addProduct(item)" class="flex cursor-pointer">
          <vue-feather
            :class="item.quantity ? 'text-green-400' : ''"
            type="shopping-cart"
            fill="currentColor"
          ></vue-feather>
          <vue-feather
            :class="item.quantity ? 'text-green-400' : ''"
            :type="item.quantity ? 'check' : 'plus'"
            fill="none"
          ></vue-feather>
        </button>
      </div>
    </div>
  </router-link>
</template>
