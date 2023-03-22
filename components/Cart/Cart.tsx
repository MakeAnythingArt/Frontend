import { Checkbox, Col, Image, message, Row, Slider, Spin } from 'antd';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { getCart } from '../../services/cart';
import OrderDesktop from './OrderDesktop';
import OrderForm from './OrderForm';

const flexCenter = 'flex items-center justify-center';

function Cart() {
  const router = useRouter();
  const formRef = useRef(null);
  const [sliderValue, setSliderValue] = useState<number>();
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [checkingOut, setCheckingOut] = useState<boolean>(false)

  const marks = {
    0: {
      style: {
        color: '#fafafa',
      },
      label: <strong className="mobile:text-[10px]">Shopping Cart</strong>,
    },
    50: {
      style: {
        color: '#fafafa',
      },
      label: <strong className="mobile:text-[10px]">Check Out</strong>,
    },
    100: {
      style: {
        color: '#fafafa',
      },
      label: <strong className="mobile:text-[10px]">Order Complete</strong>,
    },
  };

  // fetching cart data
  const { data: cartData, isLoading } = useQuery(['cartData'], () => getCart(), {
    onSuccess: (response: any) => {
      let totalCost = 0;
      response?.items?.forEach((item: any) => {
        const pro: any = item?.product?.variants?.find(
          (variant: any) => variant?.id === item?.variant_id,
        );
        const newCost = pro.cost * item.number_of_items;
        totalCost = totalCost + newCost;
      });
      setTotalPrice(totalCost);
      if (response?.items.length === 0) {
        router.push("/home")
      }
    },
  });

  return (
    <div className="relative text-[#fff] bg-[#111B33] min-h-[calc(100vh-80px)] std_padding std_paddingTop w-full flex justify-center pb-[20px]">
      <div className="std_maxWidth">
        <>
          <div className="text-[40px] text-[#FAFAFA] font-bold not-italic uppercase flex text-center items-center justify-center mobile:text-[24px]">
            Checkout Details
          </div>
          <div className="w-full mt-6 font-normal text-[18px] text-[#A5B5D9] flex text-center !justify-center !items-center">
            <div className="w-[580px]">
              Give a final review in the checkout page before place order
            </div>
          </div>
        </>
        {/* This is slider of order */}
        <div className="w-full mb-[50px] mt-[30px] flex justify-center items-center mobile:flex-col mobile:w-full mobile:flex mobile:justify-center mobile:items-center mobile:px-[20px]">
          <div className="max-w-[540px] w-full">
            <Slider
              marks={marks}
              step={null}
              defaultValue={50}
              value={sliderValue}
              onChange={(e: any) => {
                if (e === 0) {
                  router.push('/shopping-cart');
                }
                if (e == 100) {
                  message.warning('Please place order first');
                  setSliderValue(50);
                }
              }}
              trackStyle={{ backgroundColor: '#A5B5D9' }}
              handleStyle={{ backgroundColor: '#fff' }}
              className="slider_range"
              tooltip={{ formatter: null }}
            />
          </div>
        </div>

        <Spin spinning={checkingOut}>
          {/* Form */}
          <Row gutter={[16, 8]}>
            <Col xxl={14} xl={14} lg={14} md={24} sm={24} xs={24}>
              <div
                className="bg-[#1A2747] mt-4 std_maxWidth !rounded-[16px]"
                style={{ border: '1px solid #385494' }}
              >
                <div className="px-8 py-10 mobile:px-4 mobile:py-6">
                  <div className="text-[20px] text-[#FAFAFA] font-semibold not-italic capitalize flex text-center items-center justify-start mobile:text-[18px]">
                    Shopping Address
                  </div>
                  <OrderForm setCheckingOut={setCheckingOut} formRef={formRef} />
                </div>
              </div>
            </Col>
            <Col
              className="tablet:hidden mt-4"
              xxl={10}
              xl={10}
              lg={10}
              md={24}
              sm={24}
              xs={24}
            >
              <Spin spinning={isLoading} className={`w-full h-full ${flexCenter}`}>
                {cartData && <OrderDesktop formRef={formRef} totalPrice={totalPrice} cartData={cartData} />}
              </Spin>
            </Col>
          </Row>
          {/* Form End*/}
          {/* Payment Form Start */}
          <Row gutter={[16, 8]}>
            <Col xxl={14} xl={14} lg={14} md={24} sm={24} xs={24}>
              <div
                className="bg-[#1A2747] mt-4 std_maxWidth !rounded-[16px]"
                style={{ border: '1px solid #385494' }}
              >
                <div className="px-8 py-10 mobile:px-4 mobile:py-6">
                  <div className="text-[20px] text-[#FAFAFA] font-semibold not-italic capitalize flex text-center items-center justify-start mobile:text-[18px]">
                    Payment Method
                  </div>
                  <Checkbox checked className="text-[#A5B5D9] checkbox_all_shopping_cart mt-[10px]">
                    <div className="flex items-center">
                      <div>
                        <Image
                          src="/Assets/Images/visa.svg"
                          alt=""
                          preview={false}
                          className="object-cover"
                        />
                      </div>
                      <div className="text-[20px] font-normal text-[#fafafa] ml-3">
                        Debit / Credit Card
                      </div>
                    </div>
                  </Checkbox>
                </div>
              </div>
            </Col>
            <Col
              className="tablet:hidden"
              xxl={10}
              xl={10}
              lg={10}
              md={24}
              sm={24}
              xs={24}
            ></Col>
            <Col
              className="hidden tablet:block mt-[10px]"
              xxl={10}
              xl={10}
              lg={10}
              md={24}
              sm={24}
              xs={24}
            >
              <Spin spinning={isLoading} className={`w-full h-full ${flexCenter}`}>
                {cartData && <OrderDesktop formRef={formRef} totalPrice={totalPrice} cartData={cartData} />}
              </Spin>
            </Col>
          </Row>
        </Spin>
      </div>
    </div>
  );
}

export default Cart;


/*  payment method 
    <div>
                  <Form
                    className="w-full mt-6"
                    name="basic"
                    onFinish={onFinish}
                    layout="vertical"
                    autoComplete="off"
                  >
                    <Form.Item name="remember" valuePropName="checked">
                      <Checkbox className="text-[#A5B5D9] checkbox_all_shopping_cart">
                        <div className="flex items-center">
                          <div>
                            <Image
                              src="/Assets/Images/visa.svg"
                              alt=""
                              preview={false}
                              className="object-cover"
                            />
                          </div>
                          <div className="text-[20px] font-normal text-[#fafafa] ml-3">
                            Debit / Credit Card
                          </div>
                        </div>
                      </Checkbox>
                    </Form.Item>

                    <Form.Item
                      className="form_label"
                      name="card"
                      label="Enter Card Number *"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your card number!',
                        },
                      ]}
                    >
                      <FormInput placeholderText="Enter your card number" />
                    </Form.Item>

                    <div className="flex items-center mt-10 justify-between w-full mobile:flex-col">
                      <Form.Item
                        className="form_label w-full"
                        name="expiry"
                        label="Expiration Date"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your expiration!',
                          },
                        ]}
                      >
                        <FormInput placeholderText="MM // YYY" />
                      </Form.Item>
                      <Form.Item
                        className="form_label w-full ml-[10px]"
                        name="lastname"
                        label="CVV *"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your cvv!',
                          },
                        ]}
                      >
                        <FormInput placeholderText="CVV" />
                      </Form.Item>
                      <Form.Item className="form_label w-full ml-[10px] mt-[30px] mobile:mt-[0px] mobile:ml-[0px]">
                        <ButtonShared text="Pay $117.00" type="primary" />
                      </Form.Item>
                    </div>
                    <div className="text-[14px] text-[#A5B5D9] mt-[-10px]">
                      Your card details will be securely saved for faster
                      payments, CVV will not be stored
                    </div>

                    <div className="flex justify-evenly items-center mt-10 mobile:flex-col mobile:w-full">
                      <div className="max-w-[255px] w-full mr-[10px] mobile:mr-0">
                        <Button className="w-full  rounded-[5px] mobile:w-full">
                          <AppleFilled />
                          <span className="text-[#000] font-semibold">Pay</span>
                        </Button>
                      </div>
                      <div className="mobile:mt-[15px] max-w-[255px] w-full">
                        <Button className="w-full  mobile:w-full rounded-[5px] bg-[#000] border-[#000] text-[#fff] hover:!bg-[#000] hover:!border-[#000] hover:!text-[#fff]">
                          <GoogleOutlined />
                          <span className="text-[#fff] font-semibold">Pay</span>
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>
*/
