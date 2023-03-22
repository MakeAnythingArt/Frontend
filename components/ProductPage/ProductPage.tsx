import { Form, message, Modal, Select } from 'antd';
import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import ButtonShared from '../Shared/ButtonShared/ButtonShared';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import ImageGallery from './ImageGallery';
import { useRouter } from 'next/router';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useMutation } from 'react-query';
import { addToCart } from '../../services/cart';

const data = {
  title: 'Unisex Hoodie',
  price: '$XX.XX',
  description: `This unisex heavy blend hooded sweatshirt is relaxation itself. Made
                        with a thick blend of cotton and polyester, it feels plush, soft and
                        warm, a perfect choice for any cold day. In the front, the spacious
                        kangaroo pocket adds daily practicality while the hood's
                        drawstring is the same color as the base sweater for extra style
                        points.`,
  ingredients: [
    '50% cotton, 50% polyester',
    'Medium-heavy fabric (8.0 oz/yd² (271 g/m²))',
    'Classic fit',
    'Tear-away label',
    'Runs true to size',
  ],
  shippingTime: '8-12 Days',
  colors: ['#FFFFFF', '#138cff', '#AA4141', '#62C4EE'],
  sizes: ['small', 'medium', 'large'],
};

const flexCenter = 'flex items-center justify-center';

function ProductPage({
  setProductModalOpen,
  productModalOpen,
  blueprintData,
}: {
  setProductModalOpen: any;
  productModalOpen: any;
  blueprintData?: any;
}) {
  const [form] = Form.useForm();
  const router = useRouter();

  const [activeColor, setActiveColor] = useState<string>(data.colors[0]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [showStroke, setShowStroke] = useState<boolean>(false);
  const [strokeWidth, setStrokewidth] = useState<number>(0);
  const [blueprint, setBlueprint] = useState<any>(
    blueprintData && blueprintData,
  );
  const [productCost, setProductCost] = useState<number>(
    blueprint?.variants[0]?.cost,
  );
  const [variantFirstCost, setVariantFirstCost] = useState<number>(
    blueprint?.variants[0]?.cost,
  );
  const [selectedVariant, setSelectedVariant] = useState<any>(
    blueprint?.variants[0],
  );

  // adding item to the cart
  const { mutate: addingToCart } = useMutation(
    (data: any) => addToCart({ data }),
    {
      onError: (error: any) => {
        message.error(error?.message?.response);
      },
    },
  );

  const colorHandler = (color: any) => {
    setActiveColor(color);
    form.setFieldsValue({
      color: activeColor,
    });
  };

  const quantityIncrement = () => {
    setQuantity(quantity + 1);
    form.setFieldsValue({ quantity });
    setProductCost(productCost + variantFirstCost);
  };

  const quantityDecrement = () => {
    setQuantity(quantity - 1);
    form.setFieldsValue({ quantity });
    setProductCost(productCost - variantFirstCost);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const sizeOptions = blueprint?.variants.map((size: any) => {
    return {
      key: size.id,
      value: size.id,
      label: size.title,
    };
  });

  const dataModal = {
    colors: [
      '#EF4444',
      '#F97316',
      '#FACC15',
      '#4ADE80',
      '#2DD4BF',
      '#3B82F6',
      '#6366F1',
      '#EC4899',
      '#F43F5E',
      '#D946EF',
      '#8B5CF6',
      '#0EA5E9',
      '#10B981',
      '#84CC16',
    ],
  };

  const [activeColorModal, setActiveColorModal] = useState<string>(
    data.colors[0],
  );

  const colorHandlerModal = (color: any) => {
    setActiveColorModal(color);
    form.setFieldsValue({
      color: activeColorModal,
    });
    setShowStroke(false);
  };

  const onChange = (e: CheckboxChangeEvent) => {
    setShowStroke(e.target.checked);
  };

  const addToCardHandler = () => {
    setModalOpen(true);
    addingToCart({
      product_id: blueprint?.id,
      variant_id: selectedVariant?.id,
      number_of_items: quantity,
    });
  };

  return (
    <>
      <Modal
        title={false}
        className="product_page_modal lg:px-4 topToBottom_productPage"
        open={productModalOpen}
        onOk={() => setProductModalOpen(false)}
        onCancel={() => setProductModalOpen(false)}
        style={{
          maxWidth: '1170px',
          maxHeight: '751px',
          height: '100%',
          transition: '0.3s ease-in-out',
        }}
        width="100%"
        transitionName=""
        footer={false}
        bodyStyle={{ backgroundColor: '#1A2747', borderRadius: '32px' }}
        closeIcon={
          <CloseOutlined style={{ color: '#FAFAFA', fontSize: '24px' }} />
        }
      >
        <div className={`flex items-start justify-center w-full py-12 px-14`}>
          <div
            className={`${flexCenter} lg:hidden flex-col h-full w-[50%] lg:w-full lg:mt-[20px]`}
          >
            {blueprint?.images && (
              <ImageGallery
                selectedVariant={selectedVariant}
                addToCardHandler={addToCardHandler}
                product_id={blueprint?.id}
                setBlueprint={setBlueprint}
                blueprint={blueprint}
                images={
                  blueprint?.images.length > 5
                    ? blueprint?.images.slice(0, 5)
                    : blueprint?.images
                }
              />
            )}
          </div>
          <div
            className={`${flexCenter} flex-col pl-14 px-5 w-[50%] lg:w-full lg:text-center lg:px-0`}
          >
            <div
              className={`flex items-center justify-between w-full lg:flex-col`}
            >
              <div className="font-bold text-[20px] text-[#FAFAFA]">
                {data.title}
              </div>
              <div className="font-extrabold text-[20px] text-[#FAFAFA]">
                ${productCost / 100}
              </div>
            </div>
            <div className="font-medium text-[14px] mt-[10px] text-[#FFFFFF] leading-[20px] relative">
              <div
                dangerouslySetInnerHTML={{ __html: blueprint?.description }}
              />
              {/* <ul className="mt-[10px] ml-[30px] lg:flex lg:items-center lg:justify-center lg:flex-col">
                {data.ingredients.map((ingredient: any) => {
                  return <li key={ingredient}>{ingredient}</li>;
                })}
              </ul> */}
              {/* <div
                className={`flex items-center justify-start lg:justify-center`}
              >
                <div className="underline mr-[10px] cursor-pointer">
                  Shipping Time:
                </div>
                <div>{data.shippingTime}</div>
              </div>
              <div className="absolute top-[115px] right-0 !z-50">
                {showStroke === true && (
                  <>
                    <div className="bg-[white] flex justify-center items-center rounded-[10px] max-w-[340px] py-2 px-4">
                      <Form
                        name="basic"
                        onFinish={onFinish}
                        form={form}
                        autoComplete="off"
                      >
                        <Form.Item name="color">
                          <div className="flex flex-wrap items-center mt-[8px] lg:justify-center">
                            {dataModal.colors.map((color: any, index: any) => {
                              return (
                                <div
                                  onClick={() => colorHandlerModal(color)}
                                  style={
                                    activeColorModal === color
                                      ? {
                                        border: `1px solid ${color}`,
                                        padding: '3px',
                                      }
                                      : {}
                                  }
                                  className={`flex cursor-pointer justify-center items-center mr-[10px] w-[34px] h-[34px] rounded-full`}
                                  key={index}
                                >
                                  <div
                                    style={{ backgroundColor: color }}
                                    className="w-[26px] h-[26px] rounded-full"
                                  ></div>
                                </div>
                              );
                            })}
                            <div
                              className="flex items-center mt-2 w-[165px] rounded-[3px] py-1 px-3"
                              style={{ border: '0.621053px solid #E5E7EB' }}
                            >
                              <div className="flex">
                                <div>Stroke Width {strokeWidth}</div>
                              </div>
                              <div className="ml-3 flex flex-col">
                                <UpOutlined
                                  onClick={() =>
                                    setStrokewidth(strokeWidth + 1)
                                  }
                                />
                                {strokeWidth !== 0 ? (
                                  <DownOutlined
                                    onClick={() =>
                                      setStrokewidth(strokeWidth - 1)
                                    }
                                  />
                                ) : (
                                  <DownOutlined disabled={true} />
                                )}
                              </div>
                            </div>
                          </div>
                        </Form.Item>
                      </Form>
                    </div>
                  </>
                )}
              </div> */}
              <Form
                name="basic"
                onFinish={onFinish}
                form={form}
                autoComplete="off"
              >
                {/* <div
                  className={`flex items-center justify-start w-full mt-[10px] lg:justify-center xs:flex-col`}
                >
                  <Form.Item
                    className="mr-[15px] xs:mr-0 xs:mb-0"
                    name="background"
                    valuePropName="checked"
                  >
                    <Checkbox className="font-normal text-[14px] text-[#A5B5D9] checkbox_all_shopping_cart">
                      Remove Background
                    </Checkbox>
                  </Form.Item>
                  <Form.Item name="stroke" valuePropName="checked">
                    <Checkbox
                      onChange={onChange}
                      className="font-normal text-[14px] text-[#A5B5D9] checkbox_all_shopping_cart"
                    >
                      Stroke Options
                    </Checkbox>
                  </Form.Item>
                </div> */}
                <div
                  className={`lg:flex items-center justify-center hidden flex-col h-full w-full mb-[20px] lg:mt-2`}
                >
                  {blueprint?.images && (
                    <ImageGallery
                      selectedVariant={selectedVariant}
                      addToCardHandler={addToCardHandler}
                      blueprint={blueprint}
                      product_id={blueprint?.id}
                      images={
                        blueprint?.images.length > 5
                          ? blueprint?.images.slice(0, 5)
                          : blueprint?.images
                      }
                      setBlueprint={setBlueprint}
                    />
                  )}
                </div>
                {/* <div>
                  <div className="font-bold text-[24px] mt-[-7px] text-[#FAFAFA] mobile:text-[20px]">
                    Colors
                  </div>
                  <Form.Item name="color">
                    <div className="flex items-center justify-start mt-[8px] lg:justify-center">
                      {data.colors.map((color: any, index: any) => {
                        return (
                          <div
                            onClick={() => colorHandler(color)}
                            style={
                              activeColor === color
                                ? {
                                  border: `1px solid ${color}`,
                                  padding: '3px',
                                }
                                : {}
                            }
                            className={`${flexCenter} mr-[10px] w-[34px] h-[34px] rounded-full`}
                            key={index}
                          >
                            <div
                              style={{ backgroundColor: color }}
                              className="w-[26px] h-[26px] rounded-full"
                            ></div>
                          </div>
                        );
                      })}
                    </div>
                  </Form.Item>
                </div> */}
                <div className="flex items-center mt-2 lg:mt-0 justify-start lg:justify-center lg:flex-col">
                  <div className="mr-[20px] lg:mr-0">
                    <div className="font-bold text-[24px] text-[#FAFAFA] mobile:text-[20px]">
                      Size
                    </div>
                    <Form.Item
                      initialValue={blueprint?.variants[0].id}
                      name="size"
                    >
                      <Select
                        className="h-full select_fix_height text-[white]"
                        placeholder="Select Size"
                        popupClassName="startMaking_dropdown"
                        onChange={(size: any) => {
                          form.setFieldsValue({ size });
                          const currentVariant = blueprint?.variants?.filter(
                            (variant: any) => variant.id === size,
                          );
                          setVariantFirstCost(currentVariant[0].cost);
                          setProductCost(currentVariant[0].cost * quantity);
                          setSelectedVariant(currentVariant[0]);
                        }}
                        dropdownStyle={{
                          backgroundColor: '#EFEFEF',
                          borderTopLeftRadius: 0,
                          borderTopRightRadius: 0,
                        }}
                        style={{
                          width: 225,
                        }}
                        options={sizeOptions}
                      />
                    </Form.Item>
                  </div>
                  <div>
                    <div className="font-bold text-[24px] text-[#FAFAFA] mobile:text-[20px]">
                      Quantity
                    </div>
                    <Form.Item name="quantity">
                      <div
                        className={`${flexCenter} w-[225px] h-[56px] border-solid border-[1px] border-[#FAFAFA] rounded-[6px]`}
                      >
                        {quantity > 1 ? (
                          <MinusOutlined
                            onClick={quantityDecrement}
                            style={{
                              fontSize: '20px',
                              color: '#A5B5D9',
                              marginRight: '25px',
                            }}
                          />
                        ) : (
                          <MinusOutlined
                            style={{
                              marginRight: '20px',
                              color: '#a5b5d97a',
                              fontSize: '20px',
                            }}
                          />
                        )}
                        <div className="text-[#A5B5D9] text-[20px] mr-[25px]">
                          {quantity}
                        </div>
                        <PlusOutlined
                          onClick={quantityIncrement}
                          style={{ fontSize: '20px', color: '#A5B5D9' }}
                        />
                      </div>
                    </Form.Item>
                  </div>
                </div>
                <Form.Item>
                  <div className={`${flexCenter} w-full`}>
                    <div className="lg:max-w-[343px] w-full">
                      <ButtonShared
                        text="Add to Cart"
                        type="primary"
                        htmlType="submit"
                        style={{ marginTop: '6px' }}
                        clickHandler={addToCardHandler}
                      />
                    </div>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        title={false}
        className="product_page_modal_checkout lg:px-4 modalTopToBottom"
        centered
        open={modalOpen}
        closable={false}
        // onOk={() => setModalOpen(false)}
        // onCancel={() => setModalOpen(false)}
        style={{
          maxWidth: '100%',
          maxHeight: '275px',
          height: '100%',
          top: '50px',
        }}
        width="100%"
        footer={false}
        bodyStyle={{ backgroundColor: '#1A2747' }}
        transitionName=""
        maskTransitionName=""
        closeIcon={
          <CloseOutlined style={{ color: '#FAFAFA', fontSize: '24px' }} />
        }
      >
        <div className={`flex items-start justify-center w-full py-12 px-14`}>
          <div
            className={`flex items-center justify-center w-full lg:flex-col`}
          >
            <div className="font-bold text-[20px] text-[#FAFAFA]">
              <ButtonShared
                text="Keep Making?"
                htmlType="submit"
                type="primary"
                clickHandler={() => {
                  router.push('/home/start-making');
                }}
              />
            </div>
            <div className="ml-10 lg:ml-0 lg:mt-3">
              <ButtonShared
                text="Check Out"
                htmlType="submit"
                type="primary"
                clickHandler={() => {
                  router.push('/shopping-cart');
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ProductPage;
