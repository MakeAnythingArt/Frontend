import { axios } from '../utils/axios';

export const contact = async ({
  full_name,
  message,
  email,
}: {
  full_name: string;
  message: string;
  email: string;
}) => {
  return await axios.post(`/contact`, {
    full_name,
    message,
    email,
  });
};
