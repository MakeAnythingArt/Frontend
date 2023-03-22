'use client';
import { Button, Checkbox, Form, Image, message } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import startValidateUser, { startLoginWithSocial } from '../../services/auth';
import { signInWithFacebook, signInWithGoogle } from '../../utils/firebase';
import ButtonShared from '../Shared/ButtonShared/ButtonShared';
import FormInput from '../Shared/FormInput/FormInput';

function Login() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState<boolean>();

  const { mutate, isLoading } = useMutation(
    (values: any) => startValidateUser(values.email, values.password, 'login'),
    {
      onSuccess: (res: any) => {
        res && localStorage.setItem('make-anything-user', JSON.stringify(res));
        router.push('/home');
      },
      onError: (error: any) => {
        message.error(error.response.data);
      },
    },
  );

  const onFinish = (values: any) => {
    mutate(values);
    //   localStorage.setItem('elderly-employee-auth', JSON.stringify(res));
    //   router.push('/posts');
  };

  const loginWithGoogle = async () => {
    await signInWithGoogle(async (accessToken: any, error: any) => {
      if (accessToken) {
        const socialLoginData = await startLoginWithSocial(
          accessToken,
          'google',
        );
        socialLoginData &&
          localStorage.setItem(
            'make-anything-user',
            JSON.stringify(socialLoginData),
          );
        router.push('/home');
      }
    });
  };

  const loginWithFacebook = async () => {
    await signInWithFacebook(async (accessToken: any, error: any) => {
      if (accessToken) {
        const socialLoginData = await startLoginWithSocial(
          accessToken,
          'facebook',
        );
        socialLoginData &&
          localStorage.setItem(
            'make-anything-user',
            JSON.stringify(socialLoginData),
          );
        router.push('/home');
      }
    });
  };

  return (
    <div className="relative text-[#fff] bg-[#111B33] min-h-[calc(100vh-80px)] std_padding std_paddingTop w-full login_page flex justify-center pb-[60px]">
      <div className="std_maxWidth px-[100px] tabletSM:px-[0px]">
        <div className="flex justify-center items-center">
          <div
            className="bg-[#1A2747] mt-4 std_maxWidth !rounded-[32px]"
            style={{ border: '1px solid #385494' }}
          >
            <div className="px-16 py-20 tabletSM:px-4 tabletSM:py-10">
              <div className="text-[40px] text-[#FAFAFA] font-semibold not-italic capitalize flex text-center items-center justify-start mobile:text-[24px]">
                Log In
              </div>
              {/* Form */}
              <Form
                className="w-full mt-6"
                onFinish={onFinish}
                layout="vertical"
                name="login"
                disabled={isLoading}
                autoComplete="off"
              >
                <Form.Item
                  className="form_label w-full"
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your email!',
                    },
                  ]}
                >
                  <FormInput
                    autoComplete="off"
                    value={''}
                    type="email"
                    placeholderText="Email Address"
                    prefix={
                      <Image
                        src="/Assets/Images/sms.svg"
                        width={25}
                        height={25}
                        alt="sms"
                        preview={false}
                      />
                    }
                  />
                </Form.Item>
                <Form.Item
                  className="form_label w-full"
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <FormInput
                    value={''}
                    autoComplete="off"
                    placeholderText="Password"
                    type="password"
                    prefix={
                      <Image
                        src="/Assets/Images/pass.svg"
                        width={25}
                        height={25}
                        alt="pass"
                        preview={false}
                      />
                    }
                  />
                </Form.Item>

                <div className={`flex items-center justify-start w-full`}>
                  <Form.Item name="remember" valuePropName="checked">
                    <Checkbox
                      className="checkbox_all_shopping_cart"
                      onChange={(e: any) => setIsChecked(e.target.checked)}
                    />
                  </Form.Item>
                  <div className="text-[#A5B5D9] mb-[22px] ml-[8px]">
                    I agree to platform’s
                    <a
                      target="_blank"
                      href="/terms-of-services"
                      className="text-[#fff] cursor-pointer ml-[5px]"
                    >
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a
                      target="_blank"
                      href="/privacy-policy"
                      className="text-[#fff] cursor-pointer"
                    >
                      Privacy Policy
                    </a>
                  </div>
                </div>

                <div className="w-full flex justify-center items-center">
                  <ButtonShared
                    style={{
                      color: '#fff',
                    }}
                    text={isLoading ? 'Sending...' : 'Send'}
                    htmlType="submit"
                    type="primary"
                    disabled={!isChecked}
                  />
                </div>
              </Form>
              <div className="w-full flex justify-center items-center mt-4 text-[14px] text-[#A5B5D9]">
                Or continue with
              </div>

              <div className="w-full flex justify-center items-center mt-4">
                <Button
                  className="!rounded-[10px] bg-[#1A2747] text-[white] !w-full !h-[48px] !text-[16px] flex items-center justify-center border-[#A5B5D9] hover:!border-[#A5B5D9]"
                  type="default"
                  onClick={loginWithGoogle}
                >
                  <div className="flex justify-center items-center">
                    <div>
                      <Image
                        src="/Assets/Images/google.svg"
                        alt="google"
                        preview={false}
                        height={24}
                        width={24}
                      />
                    </div>
                    <div className="ml-2 text-[#A5B5D9]">
                      Log in using Google
                    </div>
                  </div>
                </Button>
              </div>

              <div className="w-full flex justify-center items-center mt-6">
                <Button
                  className="!rounded-[10px] bg-[#1A2747] text-[white] !w-full !h-[48px] !text-[16px] flex items-center justify-center border-[#A5B5D9] hover:!border-[#A5B5D9]"
                  type="default"
                  onClick={loginWithFacebook}
                >
                  <div className="flex justify-center items-center">
                    <div>
                      <Image
                        src="/Assets/Images/facebook.svg"
                        alt="google"
                        preview={false}
                        height={24}
                        width={24}
                      />
                    </div>
                    <div className="ml-2 text-[#A5B5D9]">
                      Log in using Facebook
                    </div>
                  </div>
                </Button>
              </div>

              <div className="w-full flex justify-center items-center mt-6 text-[14px] text-[#A5B5D9]">
                Don’t have an account?{' '}
                <b
                  onClick={() => router.push('/signup')}
                  className="text-[#fff] ml-1 cursor-pointer"
                >
                  Create an account!
                </b>
              </div>
            </div>
          </div>
        </div>
        {/* Form End*/}
      </div>
    </div>
  );
}

export default Login;
