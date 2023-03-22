import { axios } from '../utils/axios';

export const getFavourites = async () => {
  return await axios.post('/product/user-favorites').then((res: any) => res);
};

export const unFavouriteImage = async ({ image_id }: { image_id: string }) => {
  return await axios
    .post('/product/remove-favorite', {
      image_id,
    })
    .then((res: any) => res);
};

export const favouriteImage = async ({ image_id }: { image_id: string }) => {
  return await axios
    .post('/product/add-favorite', {
      image_id,
    })
    .then((res: any) => res);
};
