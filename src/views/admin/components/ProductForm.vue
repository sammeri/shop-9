<script setup>
import { ref } from 'vue';
import api from '@/utils/request';

const name = ref('');
const description = ref('');
const price = ref(0);
const image = ref('');
const stock = ref(0);

const addProduct = async () => {
  try {
    await api.post('/products', {
      name: name.value,
      description: description.value,
      price: price.value,
      image: image.value,
      stock: stock.value,
    });

    // Очистка формы
    name.value = '';
    description.value = '';
    price.value = 0;
    image.value = '';
    stock.value = 0;

    alert('Product added successfully!');
  } catch (err) {
    console.error(err);
    alert('Error adding product');
  }
};
</script>

<template>
  <div class="mt-10 w-full rounded-xl bg-white p-6 shadow-md">
    <h3 class="mb-6 text-xl font-bold text-gray-800">Add Product</h3>
    <form @submit.prevent="addProduct" class="space-y-4">
      <input
        v-model="name"
        placeholder="Name"
        class="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-gray-400 focus:outline-none"
        required
      />

      <input
        v-model="description"
        placeholder="Description"
        class="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-gray-400 focus:outline-none"
        required
      />

      <input
        v-model.number="price"
        type="number"
        placeholder="Price"
        class="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-gray-400 focus:outline-none"
        required
        min="0"
      />

      <input
        v-model="image"
        placeholder="Image URL"
        class="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-gray-400 focus:outline-none"
      />

      <input
        v-model.number="stock"
        type="number"
        placeholder="Stock"
        class="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-gray-400 focus:outline-none"
        required
        min="0"
      />

      <button
        type="submit"
        class="w-full rounded-lg bg-gray-700 p-3 font-semibold text-white transition-colors hover:bg-gray-800"
      >
        Add Product
      </button>
    </form>
  </div>
</template>
