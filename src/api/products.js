import service from '@/utils/request';

export async function getProducts({ page = 1, limit = 15 } = {}) {
  const res = await service({
    url: '/products',
    method: 'get',
    params: { page: page, limit: limit },
  });
  return res.items;
}

export function getProduct(id) {
  return service({
    url: `/products/${id}`,
    method: 'get',
  });
}
