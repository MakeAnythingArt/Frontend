import { Image } from 'antd';
import React, { useState } from 'react';

const flexCenter = `flex items-center justify-center`;
const flexStart = `items-center flex justify-start`;

function ImageHistoryItems({
  item,
  index,
  totalItems,
}: {
  item: any;
  index: number;
  totalItems: number;
}) {
  const [isArchive, setIsArchive] = useState<boolean>(false);

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
        <div className="w-[80px]">
          <div
            className={`${flexCenter} h-[72px] w-[80px] bg-[#344267] rounded-[8px]`}
          >
            <Image
              preview={false}
              className="object-cover rounded-[8px]"
              src={item?.images[0]?.url}
              alt=""
              width="70px"
              height="60px"
            />
          </div>
        </div>
        <div className={`flex items-start justify-center flex-col pl-[20px]`}>
          <div className="pb-[10px] text-[20px] font-medium text-[#FAFAFA] tableSM:text-[18px] tabletSM:pb-0">
            {item?.prompt}
          </div>
        </div>
      </div>
      <div
        className={`flex items-center justify-end tabletSM:justify-end w-[50%]`}
      >
        <div className="font-medium tabletSM:hidden text-[20px] text-[white]">
          {item.price}
        </div>
        <div
          onClick={() => setIsArchive(!isArchive)}
          className={`${flexCenter} rounded-full w-[40px] h-[40px] bg-[#344267] cursor-pointer`}
        >
          <Image
            className="mt-[4px]"
            preview={false}
            src={
              isArchive
                ? '/Assets/Images/archive-minus_blue.svg'
                : '/Assets/Images/archive-add.svg'
            }
            alt=""
            width="75%"
            height="75%"
          />
        </div>
      </div>
    </div>
  );
}

export default ImageHistoryItems;
