import { axios } from '../utils/axios';

export const getCommunity = async () => {
  return await axios.post('/product/community').then((res: any) => res);
};
