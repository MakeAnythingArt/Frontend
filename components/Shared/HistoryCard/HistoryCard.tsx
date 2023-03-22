import { Image } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import FeatureCollectionModal from '../../FeatureCollection/FeatureCollectionModal/FeatureCollectionModal';
import ButtonShared from '../ButtonShared/ButtonShared';
import CardFavouriteArchieve from '../CardFavouriteArchieve/CardFavouriteArchieve';

const flexCenter = 'flex items-center justify-center';

function HistoryCard({
  cardImg,
  isFavoritePage,
  refetch,
  data,
}: {
  cardImg: any;
  archiveIconSrc?: any;
  isFavoritePage?: any;
  refetch?: any;
  data?: any;
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const cardRef: any = useRef(null);
  const buttonRef: any = useRef(null);
  const [historyData, setHistoryData] = useState<any>();

  useEffect(() => {
    cardRef.current.addEventListener('mouseenter', () => {
      buttonRef.current.style.display = 'flex';
    });
    cardRef.current.addEventListener('mouseleave', () => {
      buttonRef.current.style.display = 'none';
    });
  });

  useEffect(() => {
    if (!isFavoritePage) {
      const tempData = {
        ...data,
        id: data.images[0].id,
      };
      setHistoryData(tempData);
    }
  }, [data, isFavoritePage]);

  return (
    <div
      className={`flex items-center justify-evenly flex-col rounded-[32px] border-solid border-[1px] border-[#385494] w-[369px] h-[410px] bg-[#1A2747] mb-[20px] tablet:w-[164.69px] tablet:h-[183.61px] tablet:rounded-[14.291px] hisory_card`}
    >
      <div
        ref={cardRef}
        className="w-[321px] h-[315px] tablet:w-[143.36px] tablet:h-[140.68px] relative"
      >
        <Image
          className="object-cover rounded-[24px] tablet:rounded-[10.7183px]"
          src={isFavoritePage ? cardImg?.url : cardImg}
          width="100%"
          height="100%"
          preview={false}
          alt="image"
        />
        <div
          style={{ display: 'none' }}
          ref={buttonRef}
          className="absolute top-0 left-[0px] box_inner_shadow w-[321px] h-[315px] rounded-[20px] tablet:w-[143.36px] tablet:h-[140.67px] flex items-center justify-center tablet:rounded-[10.7183px] tablet:left-0"
        >
          <div className=" w-[160px] tablet:w-[100px] h-full flex items-center justify-center">
            <ButtonShared
              clickHandler={() => setIsModalOpen(true)}
              className="'!rounded-[10px] !w-full !h-[48px] !text-[16px] flex items-center justify-center tablet:!text-[12px] mobile:!h-[30px] mobile:!w-[75px]"
              text="See Details"
              type="primary"
            />
          </div>
        </div>
      </div>
      <div className={`${flexCenter}`}>
        <div className="cursor-pointer">
          {/* <Image
            preview={false}
            width="100%"
            height="100%"
            src="/Assets/Images/brush.svg"
            alt="brush"
            className="!w-[20px] !h-[20px]"
          /> */}
        </div>

        <div className="ml-2">
          <CardFavouriteArchieve
            card={isFavoritePage ? cardImg : historyData?.images[0]}
            refetch={refetch}
          />
        </div>
      </div>
      {isModalOpen && setIsModalOpen && (
        <FeatureCollectionModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          isFavoritePage={isFavoritePage}
          ImageSrc={cardImg}
          collection={historyData}
          className="modal-svg lg:px-4 lg:flex lg:justify-center lg:items-center topToBottom_productPage history_card_modal_mask"
        />
      )}
    </div>
  );
}

export default HistoryCard;
