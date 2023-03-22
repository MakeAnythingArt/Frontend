import Axios from 'axios';

const baseurl: string =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.makeanything.art/v1';

const Token = async () => {
  try {
    const authData: any = await localStorage.getItem('make-anything-user');
    const parsedData = JSON.parse(authData);
    return parsedData.token;
  } catch (err) {}
};

export const axios = Axios.create({
  baseURL: baseurl,
});

axios.interceptors.request.use(async function (config: any) {
  config.headers = {
    'x-app-type': 3,
    'x-client-id': 'test_client_device_id',
    'x-access-token': await Token(),
  };
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('make-anything-user');
      const authData: any = localStorage.getItem('make-anything-user');
      const parsedAuthData = JSON.parse(authData);
      localStorage.removeItem('make-anything-user');

      if (error?.response?.data?.message !== 'Invalid credentials!') {
        window.location.replace(
          '/login/' + parsedAuthData?.OrganizationData?.name,
        );
      }
    }
    throw error;
  },
);
