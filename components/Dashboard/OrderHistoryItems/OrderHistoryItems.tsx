import { Image } from 'antd';
import React from 'react';

const flexCenter = `flex items-center justify-center`;
const flexStart = `items-center flex justify-start`;

function OrderHistoryItems({
  item,
  index,
  totalItems,
}: {
  item: any;
  index: number;
  totalItems: number;
}) {
  return (
    <div
      style={
        index + 1 !== totalItems
          ? { borderBottom: '2px solid #1E2E54' }
          : { borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }
      }
      className={`bg-[#1A2747] hover:bg-[#33436d6b] flex items-center justify-between w-full py-[25px] px-[20px]`}
    >
      <div className={`${flexStart} w-[50%] h-full`}>
        <div
          className={`${flexCenter} h-[72px] w-[80px] bg-[#344267] rounded-[8px]`}
        >
          <Image
            preview={false}
            className="object-cover"
            src={item?.line_items[0].metadata?.image_url}
            alt=""
            width="45px"
            height="43px"
          />
        </div>
        <div className={`flex items-start justify-center flex-col pl-[20px]`}>
          <div className="pb-[10px] text-[20px] font-medium text-[#FAFAFA] tableSM:text-[18px] tabletSM:pb-0">
            {item.title}
          </div>
          <div className="font-normal text-[14px] text-[#FAFAFA]">
            {item?.line_items[0].metadata?.variant_label}
          </div>
          <div className="font-medium hidden tabletSM:block text-[20px] text-[white]">
            ${item.total_price / 100}
          </div>
        </div>
      </div>
      <div
        className={`flex items-center justify-end tabletSM:justify-end w-[50%]`}
      >
        <div className="font-medium tabletSM:hidden text-[20px] text-[white]">
          ${item.total_price / 100}
        </div>
      </div>
    </div>
  );
}

export default OrderHistoryItems;
