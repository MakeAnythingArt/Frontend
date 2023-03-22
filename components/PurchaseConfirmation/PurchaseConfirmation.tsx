import { Slider } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import ButtonShared from '../Shared/ButtonShared/ButtonShared';

function PurchaseConfirmation() {
  const router = useRouter();
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
  return (
    <div>
      <div className="std_padding std_paddingTop w-full text-[#ffffff] flex justify-center items-center">
        <div className="std_maxWidth">
          {/* This is only shows in the mobile screen */}
          <div className="mb-16 hidden mobile:block">
            <div className="text-[40px] text-[#FAFAFA] font-bold not-italic uppercase flex text-center items-center justify-center mobile:text-[24px]">
              Checkout Details
            </div>
            <div className="w-full mt-6 font-normal text-[18px] text-[#A5B5D9] flex text-center !justify-center !items-center">
              <div className="w-[580px]">
                Give a final review in the checkout page before place order
              </div>
            </div>
          </div>
          {/* This is slider of order */}
          <div className="w-full mb-[50px] flex justify-center items-center mobile:flex-col mobile:w-full mobile:flex mobile:justify-center mobile:items-center mobile:px-[20px]">
            <div className="max-w-[540px] w-full">
              <Slider
                marks={marks}
                step={null}
                defaultValue={100}
                onChange={(e: any) => {
                  if (e === 0) {
                    router.push('/shopping-cart');
                  }
                  if (e == 50) {
                    router.push('/cart');
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
            <div className="text-[40px] text-[#FAFAFA] font-bold not-italic uppercase flex text-center items-center justify-center mobile:text-[24px]">
              Thank you!
            </div>
            <div className="w-full mt-6 font-normal text-[18px] text-[#A5B5D9] flex text-center !justify-center !items-center">
              <div className="w-[580px]">
                Please check your email for the order confirmation.
              </div>
            </div>
          </>

          <div className="w-full flex justify-center items-center mt-6 mobile:flex-col mobile:w-full mobile:flex mobile:justify-center mobile:items-center">
            <div className="max-w-[240px] w-full">
              <ButtonShared
                clickHandler={() => router.push('/home/start-making')}
                type="primary"
                text="Continue Making"
              />
            </div>
            <div className="ml-6 max-w-[240px] w-full mobile:ml-0 mobile:mt-4 ">
              <ButtonShared ghost type="primary" text="Browse Community Art" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseConfirmation;
