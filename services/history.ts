import { axios } from '../utils/axios';

export const getHistory = async () => {
  return await axios.post('/product/generate-history').then((res: any) => res);
};
