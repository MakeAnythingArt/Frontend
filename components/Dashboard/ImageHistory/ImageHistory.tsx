import { Empty, message, Spin } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { getHistory } from '../../../services/history';
import ImageHistoryItems from '../ImageHistoryItem/ImageHistoryItems';

const flexCenter = 'flex items-center justify-center';

function ImageHistory({ mobileScreen = false }: { mobileScreen?: any }) {
  const { data: userHistory, isLoading } = useQuery(
    ['getAllHistoryData'],
    () => getHistory(),
    {
      onError(err: any) {
        message.error(err?.response?.data);
      },
    },
  );

  return (
    <div className={`${flexCenter} flex-col w-full`}>
      {mobileScreen === false && (
        <div className="text-[#FFFFFF] font-bold text-[24px] bg-[#344267] w-full pt-[25px] pb-[20px] pl-[40px] rounded-tr-[16px] rounded-tl-[16px]">
          Image History
        </div>
      )}

      <Spin
        spinning={isLoading}
        className="flex items-center justify-center w-full h-full min-h-[200px]"
      >
        <div className="max-h-[375px] overflow-auto ">
          {userHistory?.data?.histories.length === 0 ? (
            <Empty
              className="!text-[white]"
              description="Not Found"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ) : (
            userHistory?.data?.histories?.map((item: any, index: number) => {
              return (
                <ImageHistoryItems
                  index={index}
                  key={item.id}
                  item={item}
                  totalItems={userHistory?.data?.length}
                />
              );
            })
          )}
        </div>
      </Spin>
    </div>
  );
}

export default ImageHistory;
