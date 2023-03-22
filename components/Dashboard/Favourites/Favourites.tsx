import { Empty, message, Spin } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { getFavourites } from '../../../services/favourites';
import FavouriteItems from '../FavouriteItems/FavouriteItems';

const flexCenter = 'flex items-center justify-center';

function Favourites({ mobileScreen = false }: { mobileScreen?: any }) {
  const {
    data: favouritesData,
    isLoading,
    refetch: fetchFavourites,
  } = useQuery(['Favorites'], () => getFavourites(), {
    onError: (err: any) => {
      message.error(err?.response?.data);
    },
  });

  return (
    <div className={`${flexCenter} flex-col w-full`}>
      {mobileScreen === false && (
        <div className="text-[#FFFFFF] font-bold text-[24px] bg-[#344267] w-full pt-[25px] pb-[20px] pl-[40px] rounded-tr-[16px] rounded-tl-[16px]">
          Favourites
        </div>
      )}

      <Spin
        spinning={isLoading}
        className="Favourite_item flex items-center justify-center w-full h-full min-h-[200px]"
      >
        <div className="max-h-[375px] overflow-auto ">
          {favouritesData?.data?.images?.length === 0 ? (
            <Empty
              className="!text-[white]"
              description="Not Found"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ) : (
            favouritesData?.data?.images?.map((item: any, index: number) => {
              return (
                <FavouriteItems
                  index={index}
                  fetchFavourites={fetchFavourites}
                  key={item.id}
                  item={item}
                  totalItems={favouritesData?.data?.images?.length}
                />
              );
            })
          )}
        </div>
      </Spin>
    </div>
  );
}

export default Favourites;
