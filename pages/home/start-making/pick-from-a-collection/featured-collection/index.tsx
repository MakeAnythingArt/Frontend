import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import FeatureCollection from '../../../../../components/FeatureCollection/FeatureCollection';
import CollectionGallery from '../../../../../components/Shared/CollectionGallery/CollectionGallery';
import FeaturedCollectionCard from '../../../../../components/Shared/FeaturedCollectionCard/FeaturedCollectionCard';
import _ from 'lodash';
import Layout from '../../../../../components/Shared/Layout/Layout';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getFeaturedCollectionsByID } from '../../../../../services/collections';
import { getCommunity } from '../../../../../services/community';

function Index() {
  const router = useRouter();
  const id = router?.query?.id;

  const [images, setImages] = useState<any>();

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

  // getting collections
  const {
    data: featuredCollections,
    isLoading,
    refetch,
  } = useQuery(
    ['collection-by-id', id],
    () => getFeaturedCollectionsByID({ collection_id: id }),
    {
      enabled: !!id,
    },
  );

  return (
    <Layout>
      <FeatureCollection />
      <Spin
        size="large"
        spinning={isLoading}
        className="w-full h-full flex items-center justify-center min-h-[200px]"
      >
        {featuredCollections && (
          <div className="w-full flex justify-center items-center">
            <div className="flex flex-row flex-wrap std_maxWidth text-center text-[#FAFAFA]  std_paddingTop justify-center items-center">
              {featuredCollections?.data?.images?.map((image: any) => {
                return (
                  <FeaturedCollectionCard
                    data={image}
                    key={image.id}
                    refetch={refetch}
                  />
                );
              })}
            </div>
          </div>
        )}
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
