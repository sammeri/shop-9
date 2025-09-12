<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const emit = defineEmits(['loadMore']);
const props = defineProps({
  // допускаем и number (page), и string ('end')
  cursor: [String, Number],
  // внешний флаг загрузки (по желанию) — напр. productsStore.pending
  disabled: {
    type: Boolean,
    default: false,
  },
  // можно настроить чувствительность (например '200px' или '10%')
  rootMargin: {
    type: String,
    default: '5%',
  },
});

const sentinel = ref(null);
let observer = null;
let isObserving = false; // локальный флаг, чтобы не дублировать observe/unobserve

function createObserver() {
  if (!sentinel.value) return;
  // если уже создан — не создаём новый
  if (observer) return;

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      // Когда элемент входит в область видимости
      if (entry.isIntersecting) {
        // защитные проверки: если данных больше нет или внешняя загрузка идёт — ничего не делаем
        if (props.cursor === 'end' || props.disabled) return;

        if (observer && sentinel.value) {
          observer.unobserve(sentinel.value);
          isObserving = false;
        }

        emit('loadMore');
      }
    },
    {
      root: null, // viewport
      rootMargin: props.rootMargin, // загружаем заранее (параметр можно менять)
      threshold: 0, // триггер при любой видимости (0) — можно поставить >0 для других эффектов
    },
  );

  observer.observe(sentinel.value);
  isObserving = true;
}

onMounted(() => {
  createObserver();
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
});

// когда cursor или disabled меняются — если загрузка закончилась и есть ещё данные — снова начинаем наблюдать
watch(
  () => [props.cursor, props.disabled],
  ([cursor, disabled]) => {
    // если у нас есть observer и sentinel — и мы пока не наблюдаем — запускаем наблюдение
    if (!observer && sentinel.value) {
      createObserver();
      return;
    }

    if (observer && sentinel.value && !isObserving && cursor !== 'end' && !disabled) {
      observer.observe(sentinel.value);
      isObserving = true;
    }
  },
);
</script>

<template>
  <div class="mb-4 grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
    <slot></slot>
    <div ref="sentinel" aria-hidden="true" style="height: 1px; width: 100%"></div>
  </div>
</template>
