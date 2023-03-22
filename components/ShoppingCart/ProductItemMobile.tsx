import { Checkbox, Image, Spin } from 'antd';
import React from 'react';
import { useMutation } from 'react-query';
import { bookmarkProduct, removeBookmarkProduct } from '../../services/cart';
import { deleteProduct } from '../../services/product';

const flexCenter = 'flex items-center justify-center';

function ProductItemMobile({
  item,
  cartDataRefetch,
  index,
  setSelectedProducts,
  singleCheckbox,
}: {
  item?: any;
  cartDataRefetch?: any;
  index?: any;
  setSelectedProducts?: any;
  singleCheckbox?: any;
}) {
  // deleting product
  const { mutate: deletingProduct, isLoading: deletingProductLoading } =
    useMutation((data: any) => deleteProduct({ data }), {
      onSuccess: () => {
        cartDataRefetch();
      },
    });

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
      spinning={deletingProductLoading}
      className="w-full h-full flex items-center justify-center"
    >
      <div
        style={{ border: '1px solid #385494' }}
        className="flex items-center justify-between bg-[#1A2747] rounded-[11px] py-[30px] mb-[20px] px-[20px]"
      >
        <div className={`flex items-center justify-start`}>
          <div className={`${flexCenter} text-center mr-[10px]`}>
            <Checkbox
              className="checkbox_shopping_cart"
              checked={item?.checkboxStatus}
              onChange={() => singleCheckbox(item?.product?.id, index, item)}
            />
          </div>
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

          <div className={`flex items-start justify-center flex-col pl-[20px]`}>
            <div className="font-medium text-[20px] text-[#FAFAFA] mb-[5px]">
              {item?.product?.title}
            </div>
            <div className="font-normal text-[14px] text-[#A5B5D9] mb-[5px]">
              {/* Size: */}
              {item?.product?.variants
                ?.filter((variant: any) => variant.id === item?.variant_id)
                .map((variant: any) => variant?.title)}
              {/* | Color: */}
            </div>
            <div className="text-[18px] font-medium text-[#FFFFFF]">
              ${item?.product?.variants
                ?.filter((variant: any) => variant.id === item?.variant_id)
                .map((variant: any) => (variant?.cost * item?.number_of_items) / 100)}
            </div>
          </div>
        </div>
        <div className="flex items-end justify-center flex-col mobile_cart_bookmark_icon">
          {item?.is_bookmark ? (
            <Spin spinning={bookmarkLoading || removeBookmarkLoading}>
              <div
                onClick={removeBookmarkHandler}
                className="h-[32px] w-[32px] flex justify-center items-center bg-[#344267] rounded-full cursor-pointer mb-[10px]"
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
                className="h-[32px] w-[32px] flex justify-center items-center bg-[#344267] rounded-full cursor-pointer mb-[10px]"
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
          <div
            onClick={() =>
              deletingProduct({
                product_id: item?.product?.id,
                variant_id: item?.variant_id,
                is_all: true,
              })
            }
            className="h-[32px] w-[32px] ml-6 flex justify-center items-center bg-[#344267] rounded-full cursor-pointer"
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
      </div>
    </Spin>
  );
}

export default ProductItemMobile;
