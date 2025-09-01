import service from '@/utils/request';

export function getProducts() {
  return service({
    url: '/products',
    method: 'get',
  });
}

export function getProduct(id) {
  return service({
    url: `/products/${id}`,
    method: 'get',
  });
}
