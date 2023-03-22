import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import InspirationBanner from '../../../../components/Inspiration/InspirationBanner';
import CollectionGallery from '../../../../components/Shared/CollectionGallery/CollectionGallery';
import Layout from '../../../../components/Shared/Layout/Layout';
import { Spin } from 'antd';
import { useQuery } from 'react-query';
import { getCommunity } from '../../../../services/community';

function Index() {
  const router = useRouter();

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

  return (
    <Layout>
      <InspirationBanner />
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
