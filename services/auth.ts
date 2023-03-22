import axios from 'axios';
import { sha256 } from 'js-sha256';

const hash_password = (data: any, ext_data: any) => {
  return sha256(`${sha256(data)}${ext_data}`);
};

const startRegister = (
  email: string,
  password: string,
  full_name: string,
  verify_code: string,
) => {
  return axios
    .post(
      'https://api.makeanything.art/v1/auth/register',
      {
        email,
        password,
        full_name,
        verify_code,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'vi',
          'x-client-type': 'ios',
          'x-client-ver': '15',
          'x-app-type': '3',
          'x-app-ver': '1',
          'x-access-token': '',
        },
      },
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const startLogin = (email: string, password: string) => {
  return axios
    .post(
      'https://api.makeanything.art/v1/auth/login-password',
      {
        email: email,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'vi',
          'x-client-type': 'ios',
          'x-client-ver': '15',
          'x-app-type': '3',
          'x-app-ver': '1',
          'x-access-token': '',
        },
      },
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const startValidateUser: any = (
  email: string,
  password: string,
  action: string,
  full_name?: string,
) => {
  return axios
    .post(
      'https://api.makeanything.art/v1/auth/validate-user',
      {
        email,
        action: action,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'vi',
          'x-client-type': 'ios',
          'x-client-ver': '15',
          'x-app-type': '3',
          'x-app-ver': '1',
          'x-access-token': '',
        },
      },
    )
    .then((res) => {
      const data = res.data;
      if (data.code === 400) {
        return 'Invalid credientials!';
      }

      const password_salt = data.password_salt;
      const verify_code = data.verify_code;
      if (action === 'login') {
        var hashedPassword = hash_password(
          hash_password(password, password_salt),
          verify_code,
        );
        return startLogin(email, hashedPassword);
      } else if (action === 'register') {
        var hashedPassword = hash_password(password, password_salt);

        if (full_name) {
          return startRegister(email, hashedPassword, full_name, verify_code);
        }
      }
    });
};

const startMergeSocialAccount = ({
  social_token,
  verify_code,
  social_type,
}: {
  social_token: string;
  verify_code: string;
  social_type: string;
}) => {
  return axios
    .post(
      'https://api.makeanything.art/v1/auth/merge-social',
      {
        social_token,
        verify_code,
        social_type,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'vi',
          'x-client-type': 'ios',
          'x-client-ver': '15',
          'x-app-type': '3',
          'x-app-ver': '1',
          'x-access-token': '',
        },
      },
    )
    .then((res) => res.data)
    .catch((err) => err);
};

export const startLoginWithSocial = async (
  socialToken: string,
  socialType: string,
) => {
  const socialData = await axios.post(
    'https://api.makeanything.art/v1/auth/login-social',
    {
      social_token: socialToken,
      social_type: socialType,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'vi',
        'x-client-type': 'ios',
        'x-client-ver': '15',
        'x-app-type': '3',
        'x-app-ver': '1',
        'x-access-token': '',
      },
    },
  );

  if (socialData.data?.token) {
    return socialData.data;
  }

  const social_token = '' + socialData.data?.social_token;
  const verify_code = '' + socialData.data?.verify_code;
  if (social_token && verify_code && socialData?.data?.error_message) {
    return startMergeSocialAccount({
      social_token,
      verify_code,
      social_type: socialType,
    });
  }

  // fetch('https://api.makeanything.art/v1/auth/login-social', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     social_token: socialToken,
  //     social_type: socialType,
  //   }),
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accept-Language': 'vi',
  //     'x-client-type': 'ios',
  //     'x-client-ver': '15',
  //     'x-app-type': '3',
  //     'x-app-ver': '1',
  //     'x-access-token': '',
  //   },
  // })
  //   .then(async (res) => {
  //     const data = await res.json();
  //     const social_token = '' + data.social_token;
  //     const verify_code = '' + data.verify_code;
  //     if (social_token && verify_code && data.error_message) {
  //       return startMergeSocialAccount({
  //         social_token,
  //         verify_code,
  //         social_type: socialType,
  //       });
  //     }

  //     // if (data.code === 200) {
  //     //   alert('Login Success');
  //     // } else if (data.data) {

  //     //   // setState({
  //     //   //   ...state,
  //     //   //   showMergePopup: true,
  //     //   //   socialToken: socialToken,
  //     //   //   verifyCode: verifyCode,
  //     //   //   socialType: socialType,
  //     //   // });
  //     //   //  startMergeSocialAccount(socialToken, verifyCode)
  //     // }
  //   })
  //   .catch((err) => {
  //     console.log(err?.response);
  //   });
};

export default startValidateUser;
