import { Image, message } from 'antd';
import React from 'react';
import { useMutation } from 'react-query';
import { unFavouriteImage } from '../../../services/favourites';

const flexCenter = `flex items-center justify-center`;
const flexStart = `items-center flex justify-start`;

function FavouriteItems({
  item,
  index,
  totalItems,
  fetchFavourites,
}: {
  item: any;
  index: number;
  totalItems: number;
  fetchFavourites: any;
}) {
  //Unfavourite the image
  const { mutate: unFavMutate } = useMutation(
    (id: any) => unFavouriteImage({ image_id: id }),
    {
      onSuccess: () => {
        message.success('Artwork unsaved!');
        fetchFavourites();
      },
      onError: (err: any) => {
        message.error(err?.response?.data);
      },
    },
  );

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
              src={item?.url}
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
          onClick={() => unFavMutate(item?.id)}
          className={`${flexCenter} rounded-full w-[40px] h-[40px] bg-[#344267] cursor-pointer`}
        >
          <Image
            className="mt-[4px]"
            preview={false}
            src={'/Assets/Images/archive-minus_blue.svg'}
            alt=""
            width="75%"
            height="75%"
          />
        </div>
      </div>
    </div>
  );
}

export default FavouriteItems;
