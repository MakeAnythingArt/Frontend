import { axios } from '../utils/axios';

export const uploadFile = async ({ data }: any) => {
  const formData = new FormData();
  let tempData: any = {};

  if (data.full_name) {
    formData.append('full_name', data?.full_name);
    tempData = {
      full_name: data.full_name,
    };
  } else {
    formData.append('files', data.file);
    const fileData = await axios
      .post('/file/upload', formData)
      .then((response: any) => response.data);
    tempData[data.key_name] = fileData[0].url;
  }

  return await axios
    .post('/user-profile/update', tempData)
    .then((response: any) => {
      return { ...response.data, key_name: data.key_name };
    });
};
