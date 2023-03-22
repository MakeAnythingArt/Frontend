import { Form, Input, message, Spin } from 'antd';
import React from 'react';
import { useMutation } from 'react-query';
import { contact } from '../../services/contact';
import ButtonShared from '../Shared/ButtonShared/ButtonShared';
import FormInput from '../Shared/FormInput/FormInput';

function Contact() {
  const { TextArea } = Input;
  const [form] = Form.useForm();

  const { mutate, isLoading }: any = useMutation(
    (data: { full_name: string; message: string; email: string }) =>
      contact(data),
    {
      onError: (error: any) => {
        if (error?.response.status === 500) {
          message.error('Internal Server Error!');
        } else {
          message.error(error?.response?.data);
        }
      },
      onSuccess: () => {
        message?.success('Your message has been sent successfully!');
        form?.resetFields();
      },
    },
  );

  return (
    <div className="std_padding std_paddingTop w-full text-[#ffffff] flex justify-center items-center">
      <div className="std_maxWidth">
        <>
          <div className="text-[40px] text-[#FAFAFA] font-bold not-italic uppercase flex text-center items-center justify-center mobile:text-[24px]">
            Make Anything Art
          </div>
          <div className="w-full mt-6 font-normal text-[18px] text-[#A5B5D9] flex text-center !justify-center !items-center">
            <div className="w-[580px]">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </div>
          </div>
        </>
        {/* Form */}
        <Spin
          spinning={isLoading}
          className="flex justify-center items-center h-full w-full"
        >
          <div className="flex justify-center items-center std_paddingTop">
            <div
              className="bg-[#1A2747] mt-4 std_maxWidth !rounded-[32px]"
              style={{ border: '1px solid #385494' }}
            >
              <div className="py-8">
                <div className="text-[40px] text-[#FAFAFA] font-bold not-italic uppercase flex text-center items-center justify-center mobile:text-[24px]">
                  Contact Us
                </div>
                <div className="w-full flex justify-center items-center px-16 py-10 mobile:px-4">
                  <Form
                    form={form}
                    className="w-full"
                    name="basic"
                    onFinish={(values: any) => {
                      mutate({
                        full_name: values?.name,
                        email: values?.email,
                        message: values?.description,
                      });
                    }}
                    disabled={isLoading}
                    layout="vertical"
                    autoComplete="off"
                  >
                    <div className="flex items-center justify-between w-full mobile:flex-col">
                      <Form.Item
                        className="form_label w-full mx-[10px]"
                        label="Name"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your name!',
                          },
                        ]}
                      >
                        <FormInput placeholderText="Name" />
                      </Form.Item>
                      <Form.Item
                        className="form_label w-full mx-[10px]"
                        label="Email"
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your email!',
                          },
                        ]}
                      >
                        <FormInput placeholderText="Email" />
                      </Form.Item>
                    </div>
                    <div className="px-2 pt-10 mobile:px-0 mobile:pt-0">
                      <Form.Item
                        className="form_label"
                        label="Message"
                        name="description"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your Message!',
                          },
                        ]}
                      >
                        <TextArea
                          rows={9}
                          placeholder="Write your message here..."
                          style={{
                            background: 'transparent',
                            color: '#A5B5D9',
                            borderColor: '#385494',
                          }}
                          className="startMaking_input"
                        />
                      </Form.Item>
                    </div>
                    <div className="w-full flex justify-center items-center">
                      <div className="flex justify-center items-center w-[170px] pt-10">
                        <ButtonShared
                          text={isLoading ? 'Sending' : 'Send'}
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
          </div>
        </Spin>
        {/* Form End*/}
      </div>
    </div>
  );
}

export default Contact;
