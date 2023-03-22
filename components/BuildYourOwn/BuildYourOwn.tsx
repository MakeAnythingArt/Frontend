import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ArtBuilder from '../Shared/ArtBuilder/ArtBuilder';
import _ from 'lodash';
import CollectionGallery from '../Shared/CollectionGallery/CollectionGallery';
import InputShared from '../Shared/InputShared/InputShared';
import StartingPointSelect from '../Shared/StartingPointSelect/StartingPointSelect';
import Title from '../Shared/Title/Title';
import WhyModal from '../Shared/WhyModal/WhyModal';
import { useQuery } from 'react-query';
import { Spin } from 'antd';
import { getCommunity } from '../../services/community';

const startingPoint = [
  {
    id: '/home/start-making/style',
    text: 'Start with a style',
  },
  {
    id: '/home/start-making/pick-from-a-collection',
    text: 'Pick from a collection',
  },
  {
    id: '/home/start-making/build-your-own',
    text: 'Build your own',
  },
  {
    id: '/home/start-making/inspiration',
    text: 'I need inspiration',
  },
];

function BuildYourOwn() {
  const router = useRouter();
  const [isWhyModalOpen, setIsWhyModalOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [images, setImages] = useState<any>();

  const startingPointOptions = startingPoint.map((point: any) => {
    return {
      key: point.id,
      value: point.id,
      label: point.text,
    };
  });

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
    <>
      <div className="flex items-center justify-center flex-col std_padding std_paddingTop w-full text-[#ffffff]">
        <div className="std_maxWidth">
          <div className="flex flex-col justify-center items-center w-full">
            <Title
              title="Use our builder to help craft your art"
              subTitle="Coming up with the perfect description can be difficult. This tool is here to help!"
            />
          </div>
          <div className="py-[40px]">
            <div className="w-full flex items-center justify-between mobile:flex-col ">
              <div>
                <StartingPointSelect
                  onChange={(e: any) => router.push(e)}
                  defaultValue="/home/start-making/build-your-own"
                  startingPointOptions={startingPointOptions}
                />
              </div>
              <div className="flex flex-col  ml-4 w-full mobile:mt-3 mobile:ml-0 tabletSM:ml-0">
                <InputShared
                  value={inputValue}
                  onChange={(e: any) => setInputValue(e.target.value)}
                  placeholderText="Your description will build here. You can edit it once you’re done building."
                />
              </div>
              {/* <div className="w-[220px] ml-4 mobile:hidden">
                <ButtonShared
                  clickHandler={() =>
                    router.push({
                      pathname: '/home/start-making/build-your-own/help-craft',
                      query: {
                        style: 'DEFAULT',
                        prompt: inputValue,
                      },
                    })
                  }
                  text="Generate Images"
                  ghost
                  type="primary"
                />
              </div> */}
            </div>
            <div className="text-center mt-[10px] text-[14px] text-[#A5B5D9] font-medium justify-center mobile:text-[12px]">
              <span className="font-bold mr-[5px]">10 generations</span> left
              before requiring sign-in.
              <span
                onClick={() => setIsWhyModalOpen(true)}
                className="underline ml-[5px] cursor-pointer"
              >
                Why?
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-10 mobile:mt-4">
          <ArtBuilder setInputValue={setInputValue} inputValue={inputValue} />
        </div>
        {isWhyModalOpen && setIsWhyModalOpen && (
          <WhyModal
            isWhyModalOpen={isWhyModalOpen}
            setIsWhyModalOpen={setIsWhyModalOpen}
          />
        )}
      </div>
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
    </>
  );
}

export default BuildYourOwn;
