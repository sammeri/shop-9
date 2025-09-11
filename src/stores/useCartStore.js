import { computed, ref, watch } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { useProducts } from './useProductsStore';

export const useCart = defineStore('cart', () => {
  const productsStore = useProducts();
  const { getData } = productsStore;
  const pending = ref(false);
  const productsCart = ref([]);
  const counter = computed(() => {
    let total = 0;
    productsCart.value.map((item) => {
      total = total + item.quantity;
    });

    return total;
  });

  // восстановление из localStorage
  const saved = localStorage.getItem('cart');
  if (saved) {
    productsCart.value = JSON.parse(saved);
  }

  watch(
    productsCart,
    (newCart) => {
      localStorage.setItem('cart', JSON.stringify(newCart));
    },
    { deep: true },
  );

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
    // item массив
    if (Array.isArray(item)) {
      item.forEach((product) => addProduct(product));
      return;
    }
    // item объект
    const existing = productsCart.value.find((p) => p.id === item.id);
    if (existing) {
      if (existing.quantity < 10) {
        existing.quantity++;
      }
    } else {
      item.quantity = 1;
      productsCart.value.push({ ...item, quantity: 1 });
    }
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

  const addQuantityByID = (id) => {
    const item = productsCart.value.find((el) => el.id === id);
    if (item) {
      item.quantity = Math.min(item.quantity + 1, 10);
    }
  };

  const removeQuantityByID = (id) => {
    const index = productsCart.value.findIndex((el) => el.id === id);
    if (index === -1) return;

    if (productsCart.value[index].quantity > 1) {
      productsCart.value[index].quantity--;
    } else {
      productsCart.value.splice(index, 1);
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
    addQuantityByID,
    removeQuantityByID,
    addAllCart,
    removeAllCart,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCart, import.meta.hot));
}
