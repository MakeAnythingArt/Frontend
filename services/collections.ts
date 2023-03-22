import { axios } from '../utils/axios';

export const getFeaturedCollections = async () => {
  return await axios
    .get('/product/featured-collections')
    .then((res: any) => res);
};

export const getFeaturedCollectionsByID = async ({ collection_id }: any) => {
  return await axios
    .get('/product/collection', {
      params: {
        collection_id,
      },
    })
    .then((res: any) => res);
};
