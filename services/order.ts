import { axios } from '../utils/axios';

export const getUserOrders = async ({ pagination }: any) => {
  return await axios
    .get('/place-order/get', pagination)
    .then((response: any) => response.data);
};
