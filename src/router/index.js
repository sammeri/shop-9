import { createRouter, createWebHistory } from 'vue-router';

import home from './routes/home';
import cart from './routes/cart';
import favorites from './routes/favorites';
import product from './routes/product';
import admin from './routes/admin';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...home,
    ...cart,
    ...favorites,
    ...product,
    ...admin,
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('../views/notFound/NotFoundView.vue'),
    },
  ],
});

export default router;
