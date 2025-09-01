import { computed, ref } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';

export const useCart = defineStore('cart', () => {
  const pending = ref(true);
  const productsCart = ref([]);
  const counter = computed(() => {
    let total = 0;

    productsCart.value.map((item) => {
      total = total + item.quantity;
    });

    return total;
  });

  const getDataCart = async () => {
    pending.value = true;

    setTimeout(() => {
      if (localStorage.getItem('cart')) {
        productsCart.value = JSON.parse(localStorage.getItem('cart'));
      } else {
        productsCart.value = [];
      }

      pending.value = false;
    }, 1500);
  };

  const addProduct = (item) => {
    if (productsCart.value.find((el) => el.id === item.id)) {
      // item.isFavorite = false
      const index = productsCart.value.findIndex((p) => p.id === item.id);
      productsCart.value[index].quantity++;
    } else {
      item.quantity = 1;
      productsCart.value.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(productsCart.value));
  };

  const removeProduct = (item) => {
    const index = productsCart.value.findIndex((p) => p.id === item.id);
    productsCart.value.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(productsCart.value));
  };

  const addQuantity = (index) => {
    if (productsCart.value[index].quantity !== 10) {
      productsCart.value[index].quantity++;
    }
  };

  const removeQuantity = (index) => {
    if (productsCart.value[index].quantity !== 1) {
      productsCart.value[index].quantity--;
    }
  };

  return {
    pending,
    productsCart,
    counter,
    getDataCart,
    addProduct,
    removeProduct,
    addQuantity,
    removeQuantity,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCart, import.meta.hot));
}
