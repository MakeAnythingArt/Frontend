import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Checkbox, Col, Image, message, Row, Spin } from 'antd';
import React from 'react';
import { useMutation } from 'react-query';
import {
  addToCart,
  bookmarkProduct,
  removeBookmarkProduct,
} from '../../services/cart';
import { deleteProduct } from '../../services/product';

const flexCenter = 'flex items-center justify-center';

function ProductItem({
  cartDataRefetch,
  item,
  index,
  singleCheckbox,
  setSelectedProducts,
}: any) {
  // deleting product
  const { mutate: deletingProduct, isLoading: deletingProductLoading } =
    useMutation((data: any) => deleteProduct({ data }), {
      onSuccess: () => {
        cartDataRefetch();
      },
    });

  // adding item to the cart
  const { mutate: addingToCart, isLoading: addingItemLoading } = useMutation(
    (data: any) => addToCart({ data }),
    {
      onSuccess: () => {
        cartDataRefetch();
      },

      onError: (error: any) => {
        message.error(error?.response?.data);
      },
    },
  );

  // bookmark single product
  const { mutate: bookmarking, isLoading: bookmarkLoading } = useMutation(
    (data: any) => bookmarkProduct({ data }),
    {
      onSuccess: () => {
        cartDataRefetch();
        setSelectedProducts([]);
      },
    },
  );

  // remove bookmark single product
  const { mutate: removingBookmark, isLoading: removeBookmarkLoading } =
    useMutation((data: any) => removeBookmarkProduct({ data }), {
      onSuccess: () => {
        cartDataRefetch();
        setSelectedProducts([]);
      },
    });

  const bookmarkHandler = () => {
    bookmarking({
      items: [0].map(() => {
        return {
          product_id: item?.product?.id,
          variant_id: item?.variant_id,
        };
      }),
    });
  };

  const removeBookmarkHandler = () => {
    removingBookmark({
      items: [0].map(() => {
        return {
          product_id: item?.product?.id,
          variant_id: item?.variant_id,
        };
      }),
      is_empty: false,
    });
  };

  return (
    <Spin
      spinning={deletingProductLoading || addingItemLoading}
      className="w-full h-full items-center justify-center flex"
    >
      <Row
        style={{
          borderBottom: '1px solid #344267',
          padding: '40px 0px',
        }}
      >
        <Col xxl={10} xl={10} lg={10} md={10} sm={10} xs={10}>
          <div className={`flex items-center justify-start pl-[20px]`}>
            <Checkbox
              className="checkbox_shopping_cart mr-[20px]"
              checked={item?.checkboxStatus}
              onChange={() => singleCheckbox(item?.product?.id, index, item)}
            />
            <div
              className={`${flexCenter} w-[80px] h-[72px] rounded-[10px] bg-[#344267]`}
            >
              <Image
                className="object-cover"
                src={item?.product?.images[0]?.src}
                preview={false}
                width="55px"
                height="53px"
                alt=""
              />
            </div>
            <div
              className={`flex items-start justify-center flex-col pl-[20px]`}
            >
              <div className="font-medium text-[20px] text-[#FAFAFA] mb-[5px]">
                {item?.product?.title}
              </div>
              <div className="font-normal text-[14px] text-[#A5B5D9]">
                {/* Size:{' '} */}
                {item?.product?.variants
                  ?.filter((variant: any) => variant.id === item?.variant_id)
                  .map((variant: any) => variant?.title)}{' '}
                {/* | Color: */}
              </div>
            </div>
          </div>
        </Col>
        <Col
          className={`${flexCenter} text-center`}
          xxl={4}
          xl={4}
          lg={4}
          md={4}
          sm={4}
          xs={4}
        >
          <div className={`${flexCenter}`}>
            {item?.number_of_items > 1 ? (
              <div
                onClick={() =>
                  deletingProduct({
                    items: [0].map(() => {
                      return {
                        product_id: item.product.id,
                        variant_id: item.variant_id,
                        number_of_items: 1,
                      };
                    }),
                  })
                }
                className={`${flexCenter} cursor-pointer rounded-full mr-[20px] w-[40px] h-[40px] bg-[#344267]`}
              >
                <MinusOutlined style={{ color: '#A5B5D9', fontSize: '20px' }} />
              </div>
            ) : (
              <div
                className={`${flexCenter} cursor-pointer rounded-full mr-[20px] w-[40px] h-[40px] bg-[#3442675e]`}
              >
                <MinusOutlined
                  style={{ color: '#a5b5d97a', fontSize: '20px' }}
                />
              </div>
            )}
            <div className="font-medium text-[16px] text-[#FAFAFA] mr-[20px]">
              {item?.number_of_items}
            </div>
            <div
              onClick={() =>
                addingToCart({
                  product_id: item?.product?.id,
                  variant_id: item?.variant_id,
                  number_of_items: 1,
                })
              }
              className={`${flexCenter} cursor-pointer rounded-full w-[40px] h-[40px] bg-[#344267]`}
            >
              <PlusOutlined style={{ color: '#A5B5D9', fontSize: '20px' }} />
            </div>
          </div>
        </Col>
        <Col
          className={`${flexCenter} text-center text-[#FFFFFF] font-medium text-[20px]`}
          xxl={4}
          xl={4}
          lg={4}
          md={4}
          sm={4}
          xs={4}
        >
          ${item?.product?.variants
            ?.filter((variant: any) => variant.id === item?.variant_id)
            .map((variant: any) => (variant?.cost * item?.number_of_items) / 100)}
        </Col>
        <Col
          className={`${flexCenter} text-center product_item_spin`}
          xxl={3}
          xl={3}
          lg={3}
          md={3}
          sm={3}
          xs={3}
        >
          {item?.is_bookmark ? (
            <Spin spinning={bookmarkLoading || removeBookmarkLoading}>
              <div
                onClick={removeBookmarkHandler}
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
            </Spin>
          ) : (
            <Spin spinning={bookmarkLoading || removeBookmarkLoading}>
              <div
                onClick={bookmarkHandler}
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
            </Spin>
          )}
        </Col>
        <Col
          className={`${flexCenter} text-center`}
          xxl={3}
          xl={3}
          lg={3}
          md={3}
          sm={3}
          xs={3}
        >
          <div
            onClick={() =>
              deletingProduct({
                items: [0].map(() => {
                  return {
                    product_id: item.product.id,
                    variant_id: item.variant_id,
                    number_of_items: item.number_of_items,
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
        </Col>
      </Row>
    </Spin>
  );
}

export default ProductItem;
