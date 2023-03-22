import { axios } from '../utils/axios';

export const generateImage = async ({ data }: any) => {
  return await axios
    .post('/product/generate', data)
    .then((res: any) => res?.data);
};

export const createProduct = async ({ data }: any) => {
  return await axios
    .post('/product/create', data)
    .then((res: any) => res?.data);
};

export const deleteProduct = async ({ data }: any) => {
  return await axios
    .post('/cart/remove-item', data)
    .then((res: any) => res?.data);
};

export const generateImageById = async ({ image_id }: any) => {
  return await axios
    .get('/product/generate/detail', {
      params: {
        image_id,
      },
    })
    .then((res: any) => res);
};
