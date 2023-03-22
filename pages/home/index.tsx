import React, { useEffect, useState } from 'react';
import Layout from '../../components/Shared/Layout/Layout';
import HomeBanner from '../../components/Home/HomeBanner/HomeBanner';
import CollectionGallery from '../../components/Shared/CollectionGallery/CollectionGallery';
import HomeCollapse from '../../components/Home/HomeCollapse/HomeCollapse';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { useQuery } from 'react-query';
import { getFeaturedCollections } from '../../services/collections';
import { Spin } from 'antd';

function Index() {
  const router = useRouter();
  const [imagesFirst, setImagesFirst] = useState<any>();

  // getting collections
  const {
    data: featuredCollections,
    isLoading: collectionLoading,
    refetch: featureCollectionRefetch,
  } = useQuery(['featured-collection'], () => getFeaturedCollections(), {
    onSuccess: (response: any) => {
      // selecting first collection
      setImagesFirst(response?.data[0]?.images?.slice(0, 7))
    },
  });

  // iterating the collections
  useEffect(() => {
    // after 1s now we select second collection
    let i: number = 1;
    const id = setInterval(() => {
      setImagesFirst(featuredCollections?.data[i]?.images?.slice(0, 7))
      if (i == featuredCollections?.data?.length - 1) {
        // if we reach last collection then we shift to 1st collection
        i = 0;
      } else if (featuredCollections) {
        // now we increments collection's index
        i = i + 1;
      }
    }, 5500);
    return () => clearInterval(id);
  }, [featuredCollections]);

  return (
    <Layout>
      <HomeBanner />
      <Spin
        spinning={collectionLoading}
        className="min-h-[300px] w-full h-[496px] mobile:h-[235.1px] flex items-center justify-center"
      >
        {imagesFirst && (
          <CollectionGallery
            clickHandler={() =>
              router.push('/home/start-making/pick-from-a-collection')
            }
            buttonText="Explore Collections"
            collectionsImages={imagesFirst}
            refetch={featureCollectionRefetch}
            homePage={true}
          />
        )}
      </Spin>
      <HomeCollapse />
    </Layout>
  );
}

export default Index;
