export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/admin/LoginView.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/AdminDashboard.vue'),
  },
];
