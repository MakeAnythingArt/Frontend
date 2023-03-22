import { Slider, Checkbox, Image, Row, Col, message, Spin, Empty } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useWindowSize } from '../../hook/windowDimensions';
import {
  bookmarkProduct,
  getCart,
  removeBookmarkProduct,
} from '../../services/cart';
import { deleteProduct } from '../../services/product';
import ButtonShared from '../Shared/ButtonShared/ButtonShared';
import FormInput from '../Shared/FormInput/FormInput';
import ProductItem from './ProductItem';
import ProductItemMobile from './ProductItemMobile';

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

const tableHeaderStyle = 'font-semibold text-[20px] text-[#FAFAFA]';

function ShoppingCart() {
  const router = useRouter();
  const { width } = useWindowSize();
  const [products, setProducts] = useState<any>();
  const [selectAllCheckbox, setSelectAllCheckbox] = useState<boolean>(false);
  const [allBookmarked, setAllBookmarked] = useState<boolean>();
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [sliderValue, setSliderValue] = useState<number>();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // deleting product
  const { mutate: deletingProduct, isLoading: deletingProductLoading } =
    useMutation((data: any) => deleteProduct({ data }), {
      onSuccess: () => {
        cartDataRefetch();
        setSelectAllCheckbox(!selectAllCheckbox);
      },
      onError: (err: any) => {
        if (err?.response?.status === 500) {
          message.error('Internal Server Error');
        }
      },
    });

  // fetching cart data
  const {
    data: cartData,
    isLoading,
    refetch: cartDataRefetch,
  } = useQuery(['cartData'], () => getCart(), {
    onSuccess: (response: any) => {
      let totalCost = 0;
      response?.items?.forEach((item: any) => {
        const pro = item?.product?.variants?.find(
          (variant: any) => variant?.id === item?.variant_id,
        );
        const newCost = pro.cost * item.number_of_items;
        totalCost = totalCost + newCost;
      });
      setTotalPrice(totalCost);
    },
  });

  // bookmark
  const { mutate: bookmarkingAll, isLoading: bookmarkLoading } = useMutation(
    (data: any) => bookmarkProduct({ data }),
    {
      onSuccess: () => {
        cartDataRefetch();
        setSelectAllCheckbox(false);
        setSelectedProducts([]);
      },
      onError: (err: any) => {
        if (err?.response?.status === 500) {
          message.error('Internal Server Error');
        } else {
          message.error(err?.response?.data);
        }
      },
    },
  );

  const bookmarkAll = () => {
    bookmarkingAll({
      items: selectedProducts,
    });
  };

  // remove bookmark
  const { mutate: removingBookmarkAll, isLoading: removeBookmarkLoading } =
    useMutation((data: any) => removeBookmarkProduct({ data }), {
      onSuccess: () => {
        cartDataRefetch();
        setSelectedProducts([]);
        setSelectAllCheckbox(false);
      },
      onError: (err: any) => {
        if (err?.response?.status === 500) {
          message.error('Internal Server Error');
        } else {
          message.error(err?.response?.data);
        }
      },
    });

  const removeBookmarkAll = () => {
    removingBookmarkAll({
      items: selectedProducts?.map((product: any) => {
        return {
          product_id: product?.product_id,
          variant_id: product?.variant_id,
        };
      }),
      is_empty: false,
    });
  };

  useEffect(() => {
    const itemsWithCheckbox = cartData?.items?.map((item: any) => {
      return {
        ...item,
        checkboxStatus: false,
      };
    });

    setProducts({
      id: cartData?.id,
      items: itemsWithCheckbox,
    });

    const checking = checkSameProperty(itemsWithCheckbox, 'is_bookmark');
    setAllBookmarked(checking);
  }, [cartData]);

  const selectAll = () => {
    setSelectAllCheckbox(!selectAllCheckbox);
    const newProducts = products?.items?.map((item: any) => {
      return {
        ...item,
        checkboxStatus: !selectAllCheckbox,
      };
    });
    setProducts({
      id: products?.id,
      items: newProducts,
    });

    const selectedProductsTemp = newProducts.map((item: any) => {
      if (item?.checkboxStatus === true) {
        return {
          product_id: item?.product?.id,
          variant_id: item?.variant_id,
          number_of_items: item?.number_of_items,
        };
      }
    });

    setSelectedProducts(
      selectedProductsTemp[0] !== undefined ? selectedProductsTemp : [],
    );
  };

  const singleCheckbox = (productId: any, index: number, itemFull: any) => {
    const newProducts = products?.items?.map((item: any) => {
      if (item?.product?.id === productId) {
        products.items[index].checkboxStatus = !item.checkboxStatus;
        return item;
      } else {
        return item;
      }
    });
    setProducts({
      id: products?.id,
      items: newProducts,
    });
    const checking = checkSameProperty(newProducts, 'checkboxStatus');
    setSelectAllCheckbox(checking);
    setSelectedProducts(
      itemFull?.checkboxStatus === false
        ? (products: any) =>
            products?.filter(
              (product: any) => product?.product_id !== productId,
            )
        : (products: any) => [
            ...products,
            {
              product_id: itemFull?.product?.id,
              variant_id: itemFull?.variant_id,
              number_of_items: itemFull?.number_of_items,
            },
          ],
    );
  };

  const checkSameProperty = (arr: any, prop: any) => {
    return arr?.every((item: any) => {
      if (item[prop] === arr[0][prop] && item[prop] === true) {
        return true;
      } else {
        return false;
      }
    });
  };

  return (
    <Spin
      spinning={isLoading}
      className="w-full h-full flex items-center justify-center"
    >
      <div className="relative text-[#fff] bg-[#111B33] min-h-[calc(100vh-80px)] std_padding std_paddingTop w-full flex justify-center pb-[60px]">
        <div className="std_maxWidth">
          <>
            <div className="text-[40px] text-[#FAFAFA] font-bold not-italic uppercase flex text-center items-center justify-center mobile:text-[24px]">
              Shopping Cart
            </div>
            <div className="w-full mt-6 font-normal text-[18px] text-[#A5B5D9] flex text-center !justify-center !items-center">
              <div className="w-[580px]">
                You have {products?.items?.length} item in your cart
              </div>
            </div>
          </>
          {/* This is slider of order */}
          <div className="w-full mb-[50px] mt-[30px] flex justify-center items-center mobile:flex-col mobile:w-full mobile:flex mobile:justify-center mobile:items-center mobile:px-[20px]">
            <div className="max-w-[540px] w-full">
              <Slider
                marks={marks}
                step={null}
                defaultValue={0}
                value={sliderValue}
                onChange={(e: any) => {
                  if (e !== 0) {
                    message.warning('Please follow the procedure');
                    setSliderValue(0);
                  }
                }}
                trackStyle={{ backgroundColor: '#A5B5D9' }}
                handleStyle={{ backgroundColor: '#fff' }}
                className="slider_range"
                tooltip={{ formatter: null }}
              />
            </div>
          </div>

          <>
            <div
              className="bg-[#1A2747] mt-4 std_maxWidth !rounded-[16px]"
              style={{ border: '1px solid #385494' }}
            >
              <div className="p-6 pl-[20px] flex justify-between items-center">
                <div>
                  <Checkbox
                    checked={selectAllCheckbox}
                    onChange={selectAll}
                    className="checkbox_all_shopping_cart"
                  >
                    <span
                      style={
                        width > 1100
                          ? { marginLeft: '16px' }
                          : { marginLeft: '0px' }
                      }
                      className="text-[20px] font-semibold text-[#fff] mobile:text-[16px]"
                    >
                      Select All ({products?.items?.length} items)
                    </span>
                  </Checkbox>
                </div>
                {selectedProducts?.length > 0 && (
                  <div className="flex justify-between items-center">
                    {allBookmarked ? (
                      <div
                        onClick={removeBookmarkAll}
                        className="h-[48px] w-[48px] mobile:h-[30px] mobile:w-[30px] flex justify-center items-center bg-[#344267] rounded-full cursor-pointer"
                      >
                        <Image
                          src="/Assets/Images/archive-minus_blue.svg"
                          preview={false}
                          alt=""
                          width={19}
                          height={22}
                        />
                      </div>
                    ) : (
                      <div
                        onClick={bookmarkAll}
                        className="h-[48px] w-[48px] mobile:h-[30px] mobile:w-[30px] flex justify-center items-center bg-[#344267] rounded-full cursor-pointer"
                      >
                        <Image
                          src="/Assets/Images/archive-add.svg"
                          preview={false}
                          alt=""
                          width={19}
                          height={22}
                        />
                      </div>
                    )}
                    <div
                      onClick={() =>
                        deletingProduct({
                          items: selectedProducts.map((product: any) => {
                            return {
                              product_id: product.product_id,
                              variant_id: product.variant_id,
                              number_of_items: product.number_of_items,
                            };
                          }),
                        })
                      }
                      className="h-[48px] w-[48px] mobile:h-[30px] mobile:w-[30px] ml-6 mobile:ml-2 flex justify-center items-center bg-[#344267] rounded-full cursor-pointer"
                    >
                      <Image
                        src="/Assets/Images/trash.svg"
                        preview={false}
                        alt=""
                        width={19}
                        height={22}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>

          {/* Table */}

          <>
            {width > 1100 ? (
              <div
                className="bg-[#1A2747] mt-4 std_maxWidth !rounded-[16px]"
                style={{ border: '1px solid #385494' }}
              >
                <div className="p-6 px-0 w-full">
                  <Row
                    style={{
                      borderBottom: '1px solid #344267',
                      padding: '20px 0px',
                    }}
                  >
                    <Col
                      className={`${tableHeaderStyle} pl-[60px]`}
                      xxl={10}
                      xl={10}
                      lg={10}
                      md={10}
                      sm={10}
                      xs={10}
                    >
                      Product Details
                    </Col>
                    <Col
                      className={`${tableHeaderStyle} text-center`}
                      xxl={4}
                      xl={4}
                      lg={4}
                      md={4}
                      sm={4}
                      xs={4}
                    >
                      Quantity
                    </Col>
                    <Col
                      className={`${tableHeaderStyle} text-center`}
                      xxl={4}
                      xl={4}
                      lg={4}
                      md={4}
                      sm={4}
                      xs={4}
                    >
                      Price
                    </Col>
                    <Col
                      className={`${tableHeaderStyle} text-center`}
                      xxl={3}
                      xl={3}
                      lg={3}
                      md={3}
                      sm={3}
                      xs={3}
                    >
                      Bookmark
                    </Col>
                    <Col
                      className={`${tableHeaderStyle} text-center`}
                      xxl={3}
                      xl={3}
                      lg={3}
                      md={3}
                      sm={3}
                      xs={3}
                    >
                      Delete
                    </Col>
                  </Row>
                  <Spin
                    spinning={
                      deletingProductLoading ||
                      bookmarkLoading ||
                      removeBookmarkLoading
                    }
                  >
                    {products && products?.items?.length === 0 ? (
                      <Empty
                        className="!text-[white]"
                        description="Empty"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                      />
                    ) : (
                      products?.items?.map((item: any, index: any) => {
                        return (
                          <ProductItem
                            key={item?.product?.id}
                            item={item}
                            index={index}
                            cartDataRefetch={cartDataRefetch}
                            singleCheckbox={singleCheckbox}
                            setSelectedProducts={setSelectedProducts}
                          />
                        );
                      })
                    )}
                  </Spin>
                </div>
              </div>
            ) : (
              <div className="py-[30px]">
                {products && products?.items?.length === 0 ? (
                  <Empty
                    className="!text-[white]"
                    description="Empty"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                ) : (
                  products?.items?.map((item: any, index: any) => {
                    return (
                      <ProductItemMobile
                        key={item?.product?.id}
                        item={item}
                        index={index}
                        cartDataRefetch={cartDataRefetch}
                        setSelectedProducts={setSelectedProducts}
                        singleCheckbox={singleCheckbox}
                      />
                    );
                  })
                )}
              </div>
            )}
          </>

          <div
            className="bg-[#1A2747] mt-6 std_maxWidth !rounded-[16px]"
            style={{ border: '1px solid #385494' }}
          >
            <div className="p-8">
              <>
                <div className="flex items-center mobile:flex-col">
                  <FormInput placeholderText="Enter promo code" />
                  <div className="w-[230px] ml-4 mobile:mt-4 mobile:ml-0">
                    <ButtonShared
                      text="Apply"
                      type="primary"
                      className="!rounded-[10px] text-center !w-full !h-[57px] !text-[16px] flex items-center justify-center"
                      disabled={products?.items?.length === 0}
                      style={
                        products?.items?.length === 0
                          ? {
                              color: 'white',
                              backgroundColor: 'rgb(66, 170, 255)',
                              borderColor: 'rgb(66, 170, 255)',
                            }
                          : {}
                      }
                    />
                  </div>
                </div>
              </>
              <>
                <div
                  className="rounded-[10px] mt-[20px]"
                  style={{ border: '1px dashed #385494' }}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <div className="text-[16px] font-medium mobile:text-[14px]">
                        Subtotal
                      </div>
                      {products && (
                        <div className="text-[16px] font-medium mobile:text-[14px]">
                          ${totalPrice / 100}
                        </div>
                      )}
                    </div>
                    {/* <div className="flex justify-between items-center mt-6">
                      <div className="text-[16px] font-medium mobile:text-[14px]">
                        Shipping
                      </div>
                      <div className="text-[16px] font-medium mobile:text-[14px]">
                        $XXX
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-6">
                      <div className="text-[16px] font-medium mobile:text-[14px]">
                        Total (Tax incl.)
                      </div>
                      <div className="text-[16px] font-medium mobile:text-[14px]">
                        $XXX
                      </div>
                    </div> */}
                    <div className="flex justify-end items-center mt-10">
                      {products && (
                        <div className="text-[20px] font-semibold mobile:text-[16px]">
                          Total: ${totalPrice / 100}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
              <>
                <div className="mt-8 flex items-center justify-center">
                  <div className="w-[350px] mobile:w-full">
                    <ButtonShared
                      text="Proceed to Checkout"
                      type="primary"
                      className="!rounded-[10px] text-center !w-full !h-[57px] !text-[16px] flex items-center justify-center"
                      clickHandler={() => router.push('/cart')}
                      disabled={products?.items?.length === 0}
                      style={
                        products?.items?.length === 0
                          ? {
                              color: 'white',
                              backgroundColor: 'rgb(66, 170, 255)',
                              borderColor: 'rgb(66, 170, 255)',
                            }
                          : {}
                      }
                    />
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
}

export default ShoppingCart;
