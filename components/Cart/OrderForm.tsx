import { Form, Select, Input, message, Spin } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import FormInput from '../Shared/FormInput/FormInput';
import { Empty } from 'antd';
import { useMutation, useQuery } from 'react-query';
import { checkout, getCart } from '../../services/cart';
import { getCities, getCountries } from '../../services/countries';
import { CountriesCodeNames } from '../../utils/countries';

const { TextArea } = Input;

function OrderForm({ formRef, setCheckingOut }: any) {
  const router = useRouter();
  const [cityOption, setCityOptions] = useState<any>();
  const [countryOption, setCountryOption] = useState<any>();

  // fetch coutries
  const { isLoading: countriesLoading } = useQuery(
    ['countries'],
    () => getCountries(),
    {
      onSuccess: (response: any) => {
        // mapping coutries
        const startingPointOptions = response?.map((item: any) => {
          return {
            key: item,
            value: item,
            label: item,
          };
        });
        setCountryOption(startingPointOptions);
      },
    },
  );

  // fetching cart data
  const { data: cartData } = useQuery(['cartData'], () => getCart());

  // getting cites
  const { mutate: gettingCities } = useMutation(
    (data: any) => getCities({ data }),
    {
      onSuccess: (response: any) => {
        const startingPointOptions = response.map((item: any) => {
          return {
            key: item,
            value: item,
            label: item,
          };
        });
        setCityOptions(startingPointOptions);
      },
    },
  );

  // checkout
  const { mutate: checkingOut, isLoading: checkoutLoading } = useMutation(
    (data: any) => checkout({ data }),
    {
      onSuccess: (response: any) => {
        router.push(response.checkout_session.url, undefined, { scroll: true });
      },
      onError: (error: any) => {
        if (error.response.status === 500) {
          message.error('Internal Server Error');
        } else {
          message.error(error.response.data);
        }
      },
    },
  );

  useEffect(() => {
    setCheckingOut(checkoutLoading);
  }, [checkoutLoading, setCheckingOut]);

  const onFinish = ({
    first_name,
    last_name,
    email,
    phone,
    country,
    address1,
    city,
    zip,
    note,
  }: any) => {
    const line_items = cartData?.items.map((item: any) => {
      return {
        product_id: item?.product?.id,
        variant_id: item?.variant_id,
        quantity: item?.number_of_items,
      };
    });

    const countryCode = CountriesCodeNames.filter(
      (item: any) => country === item.name,
    );

    checkingOut({
      line_items,
      shipping_method: 1,
      address_to: {
        first_name,
        last_name,
        email,
        phone,
        country: countryCode[0].code,
        region: '',
        address1,
        address2: '45',
        city,
        zip,
      },
      note,
    });
  };

  return (
    <Spin spinning={countriesLoading}>
      <Form
        ref={formRef}
        className="w-full mt-6"
        name="basic"
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
      >
        {/* <div
                className="bg-[#1A2747] mt-4 std_maxWidth !rounded-[18px] pt-3 px-3 pb-8"
                style={{ border: '1px solid #385494' }}
            >
                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox className="text-[#A5B5D9] checkbox_all_shopping_cart">
                        Home Address
                    </Checkbox>
                </Form.Item>

      <Form.Item
        className="form_label"
        name="company"
        label="Company Name (Optional) :"
        rules={[
          {
            required: true,
            message: 'Please input your company name!',
          },
        ]}
      >
        <FormInput placeholderText="Enter your company name" />
      </Form.Item>

            <div className="text-[#A5B5D9] text-[18px] mt-3">
                <PlusSquareOutlined />
                &nbsp; Add new address
            </div> */}
        <div className="flex items-center mt-10 justify-between w-full mobile:flex-col">
          <Form.Item
            className="form_label w-full"
            name="first_name"
            label="First Name:"
            rules={[
              {
                required: true,
                message: 'Please input your firstname!',
              },
            ]}
          >
            <FormInput placeholderText="Enter your first name" />
          </Form.Item>
          <Form.Item
            className="form_label w-full ml-[10px]"
            name="last_name"
            label="Last Name:"
            rules={[
              {
                required: true,
                message: 'Please input your lastname!',
              },
            ]}
          >
            <FormInput placeholderText="Enter your last name" />
          </Form.Item>
        </div>

        <Form.Item
          className="form_label"
          name="company"
          label="Company Name (Optional) :"
        >
          <FormInput placeholderText="Enter your company name" />
        </Form.Item>

        <Form.Item
          className="form_label"
          name="country"
          label="Country/ Region:"
          rules={[
            {
              required: true,
              message: 'Please input your street country/ region!',
            },
          ]}
        >
          <Select
            className="h-full !w-full country_select select_fix_height_cart text-[white]"
            placeholder="Select Country"
            popupClassName="startMaking_dropdown_cart"
            options={countryOption}
            onChange={(e: any) =>
              gettingCities({
                country: e,
              })
            }
            showSearch
            notFoundContent={
              <Empty
                className="!text-[white]"
                description="Not Found"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            }
          />
        </Form.Item>

        <Form.Item
          className="form_label"
          name="address1"
          label="Street Address:"
          rules={[
            {
              required: true,
              message: 'Please input your street address!',
            },
          ]}
        >
          <FormInput placeholderText="Enter your street address" />
        </Form.Item>

        <Form.Item
          className="form_label"
          name="city"
          label="City:"
          rules={[
            {
              required: true,
              message: 'Please input your city!',
            },
          ]}
        >
          <Select
            className="h-full !w-full select_fix_height_cart country_select text-[white]"
            placeholder="Please choose country first"
            popupClassName="startMaking_dropdown_cart"
            options={cityOption}
            showSearch
            notFoundContent={
              <Empty
                className="!text-[white]"
                description="Not Found"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            }
          />
        </Form.Item>

        <Form.Item
          className="form_label"
          name="zip"
          label="ZIP Code:"
          rules={[
            {
              required: true,
              message: 'Please input your zip code!',
            },
          ]}
        >
          <FormInput placeholderText="Enter your zip-code" />
        </Form.Item>

        <div className="flex items-center justify-between w-full mobile:flex-col">
          <Form.Item
            className="form_label w-full"
            name="phone"
            label="Mobile Number:"
            rules={[
              {
                required: true,
                message: 'Please input your mobile number!',
              },
            ]}
          >
            <FormInput placeholderText="Enter your mobile number" />
          </Form.Item>
          <Form.Item
            className="form_label w-full ml-[10px]"
            name="email"
            label="Email:"
            rules={[
              {
                required: true,
                message: 'Please input your last-email!',
              },
            ]}
          >
            <FormInput placeholderText="Enter your email" />
          </Form.Item>
        </div>

        <Form.Item className="form_label" name="note" label="Other Notes:">
          <TextArea
            rows={5}
            placeholder="Enter Notes"
            style={{
              background: 'transparent',
              color: '#A5B5D9',
              borderColor: '#385494',
            }}
            className="startMaking_input"
          />
        </Form.Item>
      </Form>
    </Spin>
  );
}

export default OrderForm;
