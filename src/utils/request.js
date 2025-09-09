import axios from 'axios';

const BASE_API = import.meta.env.VITE_BASE_API;

console.log(import.meta.env.VITE_BASE_API);

const service = axios.create({
  baseURL: BASE_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* Настройка всех запросов */
service.interceptors.request.use(
  (config) => {
    const conf = config;

    // Добавляем JWT, если есть
    const token = localStorage.getItem('token');
    if (token) {
      conf.headers.Authorization = `Bearer ${token}`;
    }

    return conf;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  },
);

/* Настройка всех ответов */
service.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('Response error:', error);

    if (error.response) {
      // Сервер вернул код ошибки
      const status = error.response.status;

      if (status === 401) {
        return Promise.reject(new Error('Unauthorized. Токен невалиден или истёк.'));
      }
      if (status === 403) {
        return Promise.reject(new Error('Forbidden. Нет доступа.'));
      }
      if (status === 404) {
        return Promise.reject(new Error('404 - Ресурс не найден.'));
      }
      return Promise.reject(new Error(error.response.data?.message || 'Ошибка сервера'));
    }

    // Нет ответа от сервера (сеть)
    return Promise.reject(new Error('Нет ответа от сервера'));
  },
);

export default service;
