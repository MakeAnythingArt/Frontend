import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import PickFromCollection from '../../../../components/PickFromCollection/PickFromCollectionBanner/PickFromCollection';
import CollectionGallery from '../../../../components/Shared/CollectionGallery/CollectionGallery';
import Layout from '../../../../components/Shared/Layout/Layout';
import PickCollectionCards from '../../../../components/Shared/PickCollectionCards/PickCollectionCards';
import { useQuery } from 'react-query';
import { getFeaturedCollections } from '../../../../services/collections';
import { Spin } from 'antd';
import { getCommunity } from '../../../../services/community';

function Index() {
  const router = useRouter();
  const [images, setImages] = useState<any>();

  // getting collections
  const { data: featuredCollections, isLoading } = useQuery(
    ['featured-collection'],
    () => getFeaturedCollections(),
  );


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

  return (
    <Layout>
      <PickFromCollection
        collections={
          featuredCollections?.data?.length > 10
            ? featuredCollections?.data?.slice(10)
            : false
        }
      />
      <Spin spinning={isLoading}>
        <PickCollectionCards
          buttonText={'View Featured'}
          cardsData={
            featuredCollections?.data?.length > 10
              ? featuredCollections?.data?.slice(0, 10)
              : featuredCollections?.data
          }
          pfcComp={true}
          cardRoute="/home/start-making/pick-from-a-collection/featured-collection"
          integration={true}
        />
      </Spin>
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
    </Layout>
  );
}

export default Index;
