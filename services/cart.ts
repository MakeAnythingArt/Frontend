import { axios } from '../utils/axios';

export const getCart = async () => {
  return await axios.get('/cart/get').then((res: any) => res?.data);
};

export const addToCart = async ({ data }: any) => {
  return await axios.post('/cart/add-item', data).then((res: any) => res);
};

export const checkout = async ({ data }: any) => {
  return await axios
    .post('/place-order/checkout', data)
    .then((res: any) => res.data);
};

export const bookmarkProduct = async ({ data }: any) => {
  return await axios.post('/product/bookmark', data).then((res: any) => res);
};

export const removeBookmarkProduct = async ({ data }: any) => {
  return await axios
    .post('/product/bookmark/remove', data)
    .then((res: any) => res);
};

export const emptyCart = async () => {
  return await axios.post('/cart/empty').then((res: any) => res);
};
