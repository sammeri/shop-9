import service from '@/utils/request';

export function getCategories() {
  return service({
    url: `/categories`,
    method: 'get',
  });
}

export function getCategory(name) {
  return service({
    url: `/categories?name=${name}`,
    method: 'get',
  });
}
