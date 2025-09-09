<script setup>
import { ref, reactive, onMounted } from 'vue';
import api from '@/utils/request';
import ProductForm from './components/ProductForm.vue';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';

const products = ref([]);

const token = localStorage.getItem('token');
api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const fetchProducts = async () => {
  try {
    const res = await api.get('/products');
    products.value = res;
  } catch (err) {
    console.error(err);
  }
};

const deleteProduct = async (id) => {
  try {
    await api.delete(`/products/${id}`);
    fetchProducts();
  } catch (err) {
    console.error(err);
  }
};

// --- Modal редактирования ---
const editDialog = ref(false);
const editingProduct = reactive({
  id: null,
  name: '',
  description: '',
  price: 0,
  image: '',
  stock: 0,
});

const openEditDialog = (product) => {
  Object.assign(editingProduct, product);
  editDialog.value = true;
};

const saveEdit = async () => {
  try {
    await api.put(`/products/${editingProduct.id}`, {
      name: editingProduct.name,
      description: editingProduct.description,
      price: editingProduct.price,
      image: editingProduct.image,
      stock: editingProduct.stock,
    });
    editDialog.value = false;
    fetchProducts();
  } catch (err) {
    console.error(err);
  }
};

const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

onMounted(fetchProducts);
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <h2 class="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
      <Button label="Logout" icon="pi pi-sign-out" class="p-button-danger" @click="logout" />
    </div>

    <!-- Add Product Form -->
    <div class="mb-8 flex">
      <ProductForm @product-added="fetchProducts" />
    </div>

    <!-- Products List -->
    <h3 class="mb-4 text-xl font-semibold">Products</h3>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
      <Card v-for="p in products" :key="p.id" class="rounded-lg shadow-lg">
        <!-- Заголовок -->
        <template #header>
          <img
            v-if="p.images.length"
            :src="'/shop-9' + p.images[0]"
            alt="product"
            class="mb-2 h-auto w-full rounded object-cover"
          />
        </template>

        <!-- Основное содержимое карточки -->
        <template #content>
          <div class="mb-3">
            <h4 class="text-lg font-bold text-gray-800">{{ p.name }}</h4>
            <p class="mb-2 text-gray-600">{{ p.description }}</p>
            <p class="text-sm text-gray-500">Stock: {{ p.stock }}</p>
            <p class="mb-1 font-semibold text-gray-800">$ {{ p.price }}</p>
          </div>
        </template>

        <!-- Футер карточки с кнопками -->
        <template #footer>
          <div class="flex gap-2">
            <Button
              label="Edit"
              icon="pi pi-pencil"
              class="p-button-warning w-full"
              @click="openEditDialog(p)"
            />
            <Button
              label="Delete"
              icon="pi pi-trash"
              class="p-button-danger w-full"
              @click="deleteProduct(p.id)"
            />
          </div>
        </template>
      </Card>
    </div>

    <!-- Edit Product Modal -->
    <Dialog header="Edit Product" v-model:visible="editDialog" modal class="w-full max-w-md">
      <div class="space-y-4">
        <InputText
          v-model="editingProduct.name"
          placeholder="Name"
          class="w-full rounded border p-2"
        />
        <Textarea
          v-model="editingProduct.description"
          placeholder="Description"
          class="w-full rounded border p-2"
        />
        <InputNumber
          v-model="editingProduct.price"
          placeholder="Price"
          class="w-full rounded border p-2"
        />
        <InputText
          v-model="editingProduct.image"
          placeholder="Image URL"
          class="w-full rounded border p-2"
        />
        <InputNumber
          v-model="editingProduct.stock"
          placeholder="Stock"
          class="w-full rounded border p-2"
        />
      </div>
      <template #footer>
        <div class="mt-4 flex justify-end gap-2">
          <Button
            label="Cancel"
            icon="pi pi-times"
            class="p-button-text"
            @click="editDialog = false"
          />
          <Button label="Save" icon="pi pi-check" class="p-button-success" @click="saveEdit" />
        </div>
      </template>
    </Dialog>
  </div>
</template>
