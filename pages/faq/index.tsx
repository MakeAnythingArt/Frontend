import React, { useEffect, useState } from 'react';
import FaqBanner from '../../components/FAQ/FaqBanner';
import SoceryCollapse from '../../components/FAQ/SoceryCollapse';
import Sorcery from '../../components/FAQ/Sorcery';
import CollectionGallery from '../../components/Shared/CollectionGallery/CollectionGallery';
import Layout from '../../components/Shared/Layout/Layout';
import _ from 'lodash';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
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

  return (
    <Layout>
      <FaqBanner />
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
      <Sorcery />
      <SoceryCollapse />
      {/* <FAQ /> */}
    </Layout>
  );
}

export default Index;
