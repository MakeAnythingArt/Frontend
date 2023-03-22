import React, { useEffect, useState } from 'react';
import FavouriteBanner from '../../components/History/FavouriteBanner/FavouriteBanner';
import _ from 'lodash';
import CollectionGallery from '../../components/Shared/CollectionGallery/CollectionGallery';
import Layout from '../../components/Shared/Layout/Layout';
import { useQuery } from 'react-query';
import { getFavourites } from '../../services/favourites';
import HistoryRecord from '../../components/History/HistoryRecord/HistoryRecord';
import { message, Spin } from 'antd';
import { useRouter } from 'next/router';
import { getCommunity } from '../../services/community';

function Index() {
  const [images, setImages] = useState<any>();
  const router = useRouter();

  // getting community
  const {
    data: communityData,
    isLoading: communityLoading,
    refetch: communityDataRefetch,
  } = useQuery(['getCommunity'], () => getCommunity(), {
    onSuccess: (response: any) => {
      if (response?.data?.images.length >= 7) {
        setImages(
          response?.data?.images
            ?.slice(0, 7)
            .map((community: any) => community),
        );
      }
    },
  });

  useEffect(() => {
    const id = setInterval(() => {
      const randomizedArray = _.shuffle(communityData?.data?.images);
      setImages(
        randomizedArray?.slice(0, 7).map((community: any) => community),
      );
    }, 5500);
    return () => clearInterval(id);
  }, [communityData?.data?.images]);

  const { data, refetch } = useQuery(['Favorites'], () => getFavourites(), {
    onError: (err: any) => {
      message.error(err?.response?.data);
    },
  });

  return (
    <Layout>
      <FavouriteBanner />
      <Spin
        spinning={communityLoading}
        className="min-h-[300px] w-full h-[496px] mobile:h-[235.1px] flex items-center justify-center"
      >
        {images && images?.length >= 7 && (
          <CollectionGallery
            clickHandler={() => router.push('/community-curated')}
            buttonText="Art by The Community"
            collectionsImages={images}
            refetch={communityDataRefetch}
          />
        )}
      </Spin>
      <HistoryRecord
        routerPathSecondBtn="/history"
        cardsData={data?.data?.images}
        isFavoritePage={true}
        refetch={refetch}
      />
    </Layout>
  );
}

export default Index;
