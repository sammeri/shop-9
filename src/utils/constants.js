export const DEV_MODE = import.meta.env.DEV;
export const BASE_URL = import.meta.env.BASE_URL.replace(/\/+$/, '');
export const RESPONSIVE_OPTIONS = [
  {
    breakpoint: '1024px',
    numVisible: 5,
  },
  {
    breakpoint: '768px',
    numVisible: 3,
  },
  {
    breakpoint: '560px',
    numVisible: 1,
  },
];
