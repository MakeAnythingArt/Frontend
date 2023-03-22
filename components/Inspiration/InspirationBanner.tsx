import { Image } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ButtonShared from '../Shared/ButtonShared/ButtonShared';
import InputShared from '../Shared/InputShared/InputShared';
import StartingPointSelect from '../Shared/StartingPointSelect/StartingPointSelect';
import Title from '../Shared/Title/Title';
import WhyModal from '../Shared/WhyModal/WhyModal';

const flexCenter = 'flex items-center justify-center';

function InspirationBanner() {
  const router = useRouter();
  const [isWhyModalOpen, setIsWhyModalOpen] = useState<boolean>(false);

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
    <div className={`${flexCenter} std_padding std_paddingTop`}>
      <div className={`${flexCenter} flex-col std_maxWidth w-full`}>
        <Title
          title="Roll the dice!"
          subTitle="Randomly pick from over 8,000+ descriptions. Read our FAQ to learn how every image generation is still 100% unique."
        />
        <div className={`${flexCenter} tabletSM:flex-col mt-[30px] w-full`}>
          <StartingPointSelect
            defaultValue="/home/start-making/inspiration"
            startingPointOptions={startingPointOptions}
            onChange={(e: any) => router.push(e)}
          />
          <div className="ml-[10px] tabletSM:ml-0 tabletSM:my-[15px] w-full">
            <InputShared placeholderText="Roll the dice to find the right description for you. You can also tweak it if you’d like." />
          </div>
          <div
            className={`flex items-center justify-start min-w-[250px] w-fit ml-[10px]`}
          >
            <div className="w-[40px] h-[40px]">
              <Image
                src="/Assets/Images/dice.png"
                preview={false}
                alt="dice"
                width="100%"
                height="100%"
                className="object-cover"
              />
            </div>
            <div className="w-full max-w-[200px] ml-[10px]">
              <ButtonShared
                clickHandler={() =>
                  router.push('/home/start-making/inspiration/roll-dice')
                }
                text="Generate Images"
                type="primary"
                ghost
              />
            </div>
          </div>
        </div>
        <div className="text-center mt-[15px] text-[14px] text-[#A5B5D9] font-medium flex">
          <span className="font-bold mr-[5px]">10 generations</span> left before
          requiring sign-in.
          <div
            onClick={() => setIsWhyModalOpen(true)}
            className="underline ml-[5px] cursor-pointer"
          >
            Why?
          </div>
        </div>
      </div>
      {isWhyModalOpen && setIsWhyModalOpen && (
        <WhyModal
          isWhyModalOpen={isWhyModalOpen}
          setIsWhyModalOpen={setIsWhyModalOpen}
        />
      )}
    </div>
  );
}

export default InspirationBanner;
