import { Image } from 'antd';
import React from 'react';
import ButtonShared from '../Shared/ButtonShared/ButtonShared';

function OrderDesktop({ cartData, totalPrice, formRef }: any) {
  const formHandler = () => {
    formRef.current.submit();
  };

  return (
    <div
      className="text-[20px] bg-[#1A2747] w-full pb-4 text-[#FAFAFA] font-semibold not-italic capitalize flex items-center justify-start mobile:text-[18px] rounded-[16px]"
      style={{
        borderBottom: '2px solid #1E2E54',
        border: '1px solid rgb(56, 84, 148)',
      }}
    >
      <div className="px-8 py-10 mobile:px-4 mobile:py-6 w-full">
        <div
          className="text-[20px] pb-4 text-[#FAFAFA] font-semibold not-italic capitalize flex text-center items-center justify-start mobile:text-[18px]"
          style={{ borderBottom: '2px solid #1E2E54' }}
        >
          Your Order
        </div>

        <div
          className="mt-[30px] pb-[30px] flex flex-col"
          style={{ borderBottom: '2px solid #1E2E54' }}
        >
          {cartData?.items?.map((item: any) => {
            return (
              <div key={item?.product?.id} className="flex items-center mb-6">
                <div className="w-[80] h-[72]">
                  <div className="bg-[#344267] h-[72px] w-[80px] rounded-[10px] flex justify-center items-center">
                    <Image
                      src={item?.product?.images[0]?.src}
                      width={55}
                      height={52}
                      alt=""
                      preview={false}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="ml-4">
                  <div className="text-[20px] text-[#fafafa] font-medium">
                    {item?.product?.title}
                  </div>
                  <div className="text-[#A5B5D9] text-[16px] font-normal mt-2">
                    $
                    {item?.product?.variants
                      ?.filter(
                        (variant: any) => variant.id === item?.variant_id,
                      )
                      .map(
                        (variant: any) =>
                          (variant?.cost * item?.number_of_items) / 100,
                      )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="mt-[20px] pb-[20px]"
          style={{ borderBottom: '2px solid #1E2E54' }}
        >
          <div className="flex justify-between items-center">
            <div className="text-[16px] text-[#fafafa] font-normal">
              Subtotal
            </div>
            <div className="text-[16px] text-[#fafafa] font-semibold">
              ${totalPrice / 100}
            </div>
          </div>
          {/* <div className="flex justify-between items-center mt-4">
            <div className="text-[16px] text-[#fafafa] font-normal">
              Subtotal
            </div>
            <div className="text-[16px] text-[#fafafa] font-semibold">
              Free
            </div>
          </div> */}
        </div>

        <div className="mt-[15px] pb-[20px]">
          <div className="flex justify-between items-center">
            <div className="text-[24px] text-[#fafafa] font-semibold">
              Total
            </div>
            <div className="text-[24px] text-[#fafafa] font-semibold">
              ${totalPrice / 100}
            </div>
          </div>
        </div>

        <div className="mt-[20px]">
          <ButtonShared
            text="Place Order"
            type="primary"
            clickHandler={formHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderDesktop;
