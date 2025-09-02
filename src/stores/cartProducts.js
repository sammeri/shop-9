import { computed, ref } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { useProducts } from './products';

export const useCart = defineStore('cart', () => {
  const productsStore = useProducts();
  const { getData } = productsStore;
  const pending = ref(true);
  const productsCart = ref([]);
  const counter = computed(() => {
    let total = 0;

    productsCart.value.map((item) => {
      total = total + item.quantity;
    });

    return total;
  });
  const checkFavorites = (productsArr) => {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      try {
        const items = JSON.parse(favorites);
        productsArr.forEach((p) => {
          p.isFavorite = !!items.find((el) => el.id === p.id);
        });
      } catch (error) {
        console.error('Ошибка парсинга избранных товаров(favorites):', error);
      }
    }
  };

  const getDataCart = async () => {
    pending.value = true;

    setTimeout(() => {
      if (localStorage.getItem('cart')) {
        productsCart.value = JSON.parse(localStorage.getItem('cart'));
        checkFavorites(productsCart.value);
      } else {
        productsCart.value = [];
      }

      pending.value = false;
    }, 1500);
  };

  const addProduct = (item) => {
    if (productsCart.value.find((el) => el.id === item.id)) {
      const index = productsCart.value.findIndex((p) => p.id === item.id);

      if (productsCart.value[index].quantity) {
        productsCart.value[index].quantity < 10
          ? productsCart.value[index].quantity++
          : productsCart.value[index].quantity;
      }
    } else {
      item.quantity = 1;
      productsCart.value.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(productsCart.value));
  };

  const removeProduct = (item) => {
    const index = productsCart.value.findIndex((p) => p.id === item.id);
    removeQuantity(index);
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

  const addAllCart = async () => {
    const data = await getData();

    data.forEach((item) => {
      addProduct(item);
    });

    checkFavorites(productsCart.value);
  };

  const removeAllCart = () => {
    productsCart.value = [];
    localStorage.setItem('cart', JSON.stringify(productsCart.value));
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
    addAllCart,
    removeAllCart,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCart, import.meta.hot));
}
