import { useRouter } from 'next/router';
import React, { useState } from 'react';
import InputShared from '../Shared/InputShared/InputShared';
import StartingPointSelect from '../Shared/StartingPointSelect/StartingPointSelect';
import WhyModal from '../Shared/WhyModal/WhyModal';

const flexCenter = 'flex items-center justify-center';

function StartStyle() {
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
        <div className="font-black uppercase text-[56px] text-center text-[white] mobile:text-[24px]">
          Choose a style
        </div>
        <div
          className={`${flexCenter} tabletSM:flex-col mt-[60px] w-[80%] mobile:w-full`}
        >
          <StartingPointSelect
            defaultValue="/home/start-making/style"
            startingPointOptions={startingPointOptions}
            onChange={(e: any) => router.push(e)}
          />
          <div className="h-full tabletSM:mt-[20px] tabletSM:ml-0 w-full ml-[20px]">
            <InputShared
              value="First choose a style below."
              disabled
            />
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

export default StartStyle;
