import { axios } from '../utils/axios';

export const getCountries = async () => {
  return await axios
    .get('address/countries')
    .then((response: any) => response.data);
};

export const getCities = async ({ data }: any) => {
  return await axios
    .get('/address/cities', {
      params: {
        country: data.country,
      },
    })
    .then((response: any) => response.data);
};
