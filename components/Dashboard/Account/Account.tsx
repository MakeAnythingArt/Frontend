import { Form, Input, message, Spin } from 'antd';
import React from 'react';
import { useMutation } from 'react-query';
import { uploadFile } from '../../../services/dashboard';
import ButtonShared from '../../Shared/ButtonShared/ButtonShared';
import FormInput from '../../Shared/FormInput/FormInput';

const flexCenter = 'flex items-center justify-center';
const { TextArea } = Input;

function Account({ mobileScreen = false }: { mobileScreen?: any }) {
  const [form] = Form.useForm();

  const authData: any = localStorage.getItem('make-anything-user');
  const parsedAuthData = JSON.parse(authData);

  const { mutate, isLoading } = useMutation(
    (data: any) => uploadFile({ data }),
    {
      onSuccess: (res: any) => {
        message?.success('Profile updated successfully');
        parsedAuthData.user.full_name = res.full_name;
        localStorage.setItem(
          'make-anything-user',
          JSON.stringify(parsedAuthData),
        );
      },
      onError: (err: any) => {
        message.error(err.response.data);
      },
    },
  );

  return (
    <div className={`${flexCenter} flex-col w-full`}>
      {mobileScreen === false && (
        <div className="text-[#FFFFFF] font-bold text-[24px] bg-[#344267] w-full pt-[25px] pb-[20px] pl-[40px] rounded-tr-[16px] rounded-tl-[16px]">
          My Account
        </div>
      )}

      <Spin
        spinning={false}
        className="flex items-center justify-center w-full h-full min-h-[200px]"
      >
        <div className="flex justify-center items-center">
          <div className="bg-[#1A2747] std_maxWidth !rounded-[32px]">
            <div className="w-full flex justify-center items-center px-4 py-10">
              <Form
                form={form}
                className="w-full"
                name="basic"
                onFinish={mutate}
                disabled={isLoading}
                layout="vertical"
                autoComplete="off"
              >
                <div className="flex justify-between w-full tabletSM:flex-col">
                  <div className="w-full mr-10 tabletSM:ml-0">
                    <Form.Item
                      className="form_label w-full mx-[10px] tabletSM:mx-0"
                      label="Name"
                      name="full_name"
                      initialValue={parsedAuthData?.user?.full_name}
                    >
                      <FormInput placeholderText="Name" />
                    </Form.Item>
                    <Form.Item
                      className="form_label w-full mx-[10px] tabletSM:mx-0"
                      label="Email"
                      name="email"
                      initialValue={parsedAuthData?.user?.email}
                    >
                      <FormInput placeholderText="Email" disabled />
                    </Form.Item>
                  </div>
                  <Form.Item
                    className="form_label w-full mx-[10px] tabletSM:mx-0"
                    label="Shipping Address"
                    name="shippingAddress"
                  >
                    <TextArea
                      rows={7}
                      placeholder="Write your shipping address here..."
                      style={{
                        background: 'transparent',
                        color: '#A5B5D9',
                        borderColor: '#385494',
                      }}
                      className="startMaking_input"
                    />
                  </Form.Item>
                </div>
                <div className="w-full flex justify-end items-center pr-2 tabletSM:pr-0">
                  <div className="flex justify-center items-center w-[170px] pt-4">
                    <ButtonShared
                      text={isLoading ? 'Submiting...' : 'Submit'}
                      ghost
                      htmlType="submit"
                      type="primary"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
}

export default Account;
