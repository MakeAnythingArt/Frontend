/* eslint-disable @next/next/no-img-element */
import { message, Spin } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { generateImage } from '../../../services/product';
import RollDice from '../../Inspiration/RollDice/RollDice';
import ProductPage from '../../ProductPage/ProductPage';
import ArtBuilder from '../../Shared/ArtBuilder/ArtBuilder';
import ButtonShared from '../../Shared/ButtonShared/ButtonShared';
import InputShared from '../../Shared/InputShared/InputShared';
import StartingPointSelect from '../../Shared/StartingPointSelect/StartingPointSelect';
import Title from '../../Shared/Title/Title';
import WhyModal from '../../Shared/WhyModal/WhyModal';

function HelpCraft() {
  const [productModalOpen, setProductModalOpen] = useState<boolean>(false);
  const [isWhyModalOpen, setIsWhyModalOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [data, setData] = useState<any>();

  const router = useRouter();
  const prompt: any = router?.query?.prompt;
  const style: any = router?.query?.style;
  const negative_prompt: any = router?.query?.negative_prompt;

  const generatingImage = {
    prompt,
    style,
    negative_prompt,
  };
  const { isLoading: queryLoading } = useQuery(
    ['generatedImage'],
    () => generateImage({ data: generatingImage }),
    {
      enabled: !!router?.query?.style && !!router?.query?.prompt,
      staleTime: Infinity,
      onError: (error: any) => {
        message.error(error.response.data);
        router.back();
      },
      onSuccess: (response: any) => {
        setData(response);
      },
    },
  );

  const { mutate, isLoading: mutateLoading } = useMutation(
    (data: any) => generateImage({ data }),
    {
      onError: (error: any) => {
        message.error(error.response.data);
      },
      onSuccess: (response: any) => {
        setData(response);
      },
    },
  );

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

  const startingPointOptions = startingPoint.map((point: any) => {
    return {
      key: point.id,
      value: point.id,
      label: point.text,
    };
  });

  return (
    <Spin
      spinning={queryLoading || mutateLoading}
      className="w-full min-h-[200px] flex h-full items-center justify-center"
    >
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
                  defaultValue="/home/start-making/build-your-own"
                  startingPointOptions={startingPointOptions}
                  onChange={(e: any) => router.push(e)}
                />
              </div>
              <div className="flex flex-col  ml-4 w-full mobile:mt-3 tabletSM:ml-0">
                <InputShared
                  value={inputValue}
                  onChange={(e: any) => setInputValue(e.target.value)}
                  placeholderText="Your description will build here. You can edit it once you’re done building."
                />
              </div>
              <div className="w-[220px] ml-4 mobile:hidden">
                <ButtonShared
                  clickHandler={() =>
                    mutate({
                      style: 'DEFAULT',
                      prompt: inputValue,
                    })
                  }
                  text="Generate Images"
                  ghost
                  type="primary"
                />
              </div>
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
        <Spin
          spinning={queryLoading || mutateLoading}
          className="w-full min-h-[200px] flex h-full items-center justify-center"
        >
          {data && <RollDice hoverCardsIntegratedData={data} />}
        </Spin>
        {productModalOpen && setProductModalOpen && (
          <ProductPage
            productModalOpen={productModalOpen}
            setProductModalOpen={setProductModalOpen}
            blueprintData={data}
          />
        )}

        {isWhyModalOpen && setIsWhyModalOpen && (
          <WhyModal
            isWhyModalOpen={isWhyModalOpen}
            setIsWhyModalOpen={setIsWhyModalOpen}
          />
        )}
      </div>
    </Spin>
  );
}

export default HelpCraft;
