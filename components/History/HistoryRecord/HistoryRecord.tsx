import React, { useState } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import HistoryCard from '../../Shared/HistoryCard/HistoryCard';
import { useRouter } from 'next/router';
import ButtonShared from '../../Shared/ButtonShared/ButtonShared';
import Image from 'next/image';

const flexCenter = 'flex items-center justify-center';

function HistoryRecord({
  routerPathSecondBtn,
  cardsData,
  isFavoritePage = false,
  isLoading,
  refetch,
}: {
  archiveIconSrc?: any;
  routerPathSecondBtn: string;
  cardsData: any;
  isFavoritePage?: boolean;
  isLoading?: any;
  refetch?: any;
}) {
  const router = useRouter();
  const [archivedSrc, setArchivedSrc] = useState<boolean>(false);

  return (
    <div className={`${flexCenter} std_padding std_paddingTop w-full`}>
      <div className={`${flexCenter} flex-col std_maxWidth w-full`}>
        <div className={`flex items-center justify-end history_record w-full`}>
          {/* This is for the back button */}
          <div className="w-[138px] mr-[20px]">
            <ButtonShared
              text="Back"
              type="primary"
              icon={<LeftOutlined />}
              ghost
              clickHandler={() => router.back()}
            />
          </div>

          {/* This is for the Favourite button */}
          <div
            className="w-[138px] mr-[20px] flex justify-center items-center cursor-pointer"
            style={{
              border: '1px solid #198ffe',
              borderRadius: '10px',
            }}
          >
            <div className="py-[10.5px] flex items-center">
              <span
                className="text-[#198ffe]"
                onClick={() => router.push(routerPathSecondBtn)}
              >
                Favorites
              </span>
              <div
                onClick={() => setArchivedSrc(!archivedSrc)}
                className={`ml-[10px] w-full h-full`}
              >
                <Image
                  src={
                    archivedSrc
                      ? '/Assets/Images/archive-minus-blue.svg'
                      : '/Assets/Images/archive-add.svg'
                  }
                  alt=""
                  width="22px"
                  height="25.5px"
                />
              </div>
            </div>
          </div>
        </div>
        <Spin
          spinning={isFavoritePage === false && isLoading}
          className="!w-full h-full"
        >
          <div className="mt-[30px] !w-full">
            {isFavoritePage ? <div
              className={`flex items-center justify-between history_record w-full flex-wrap`}
            >
              {cardsData?.map((item: any) => {
                return (
                  <HistoryCard
                    key={item?.id}
                    cardImg={item}
                    refetch={refetch}
                    data={item}
                    isFavoritePage={isFavoritePage}
                  />
                );
              })}
            </div> :
              <div
                className={`flex items-center justify-between history_record w-full flex-wrap`}
              >
                {cardsData?.histories?.map((item: any) => {
                  return (
                    <HistoryCard
                      key={item?.id}
                      cardImg={item?.images[0]?.url}
                      refetch={refetch}
                      data={item}
                      isFavoritePage={isFavoritePage}
                    />
                  );
                })}
              </div>}
          </div>
        </Spin>
      </div>
    </div>
  );
}

export default HistoryRecord;
