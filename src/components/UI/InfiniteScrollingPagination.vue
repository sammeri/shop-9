<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

// refs
const scrollWrap = ref(null);

// data
const emit = defineEmits(['loadMore']);
const props = defineProps({
  cursor: String,
});

// methods
const handleScroll = () => {
  let element = scrollWrap.value;
  if (props.cursor && element.getBoundingClientRect().y <= -20) {
    emit('loadMore');
  }
};

// hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="list-wrap" ref="scrollWrap">
    <slot></slot>
  </div>
</template>
