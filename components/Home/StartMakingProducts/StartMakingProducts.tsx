import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import AllProductsModal from '../../AllProductsModal/AllProductsModal';
import ButtonShared from '../../Shared/ButtonShared/ButtonShared';
import ProductCard from '../../Shared/Cards/ProductCard';
import InputShared from '../../Shared/InputShared/InputShared';
import StartingPointSelect from '../../Shared/StartingPointSelect/StartingPointSelect';
import Title from '../../Shared/Title/Title';
import WhyModal from '../../Shared/WhyModal/WhyModal';
import { v4 as uuid } from 'uuid';
import _ from 'lodash';
const flexCenter = 'flex items-center justify-center';

function StartMakingProducts() {
  const router = useRouter();
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const [isWhyModalOpen, setIsWhyModalOpen] = useState<boolean>(false);

  const cardsDataArray = [
    {
      id: 1,
      name: 'Backpack',
      price: '$59.99',
      src: '/Assets/Images/art_here_bag.svg',
    },
    {
      id: 2,
      name: 'Moblie Cover',
      price: '$49.99',
      src: '/Assets/Images/art_here_mobile.svg',
    },
    {
      id: 3,
      name: 'Pillow',
      price: '$24.99',
      src: '/Assets/Images/art_here_pillow.svg',
    },
    {
      id: 4,
      name: 'Shopping Bag',
      price: '$59.99',
      src: '/Assets/Images/art_here_girl_bag.svg',
    },
    {
      id: 5,
      name: 'Wall Frame',
      price: '$49.99',
      src: '/Assets/Images/art_here_wall.svg',
    },
    {
      id: 6,
      name: "Men's Shirt",
      price: '$24.99',
      src: '/Assets/Images/art_here_shirt.svg',
    },
    {
      id: 7,
      name: 'Cup Holder Mat',
      price: '$24.99',
      src: '/Assets/Images/art_here_cup.svg',
    },
    {
      id: 8,
      name: 'Wall Frame',
      price: '$24.99',
      src: '/Assets/Images/art_here_lamp.svg',
    },
  ];

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

  const [cardsData, setCardsData] = useState<any>(cardsDataArray.slice(0, 4));
  useEffect(() => {
    const id = setInterval(() => {
      const random = _.shuffle(cardsDataArray);
      setCardsData(random);
    }, 5500);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardsData]);

  const [key, setKey] = useState(uuid());

  useEffect(() => {
    setKey(uuid());
  }, [cardsData]);

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
          title="First, Choose How to start"
          subTitle="You can start with a style, choose from a featured collection, build
                your art from scratch or roll the dice!"
        />
        <div
          className={`${flexCenter} tabletSM:flex-col mt-[60px] w-[80%] mobile:w-full`}
        >
          <StartingPointSelect
            onChange={(e: any) => router.push(e)}
            placeholder="Choose a starting point"
            startingPointOptions={startingPointOptions}
          />
          <div className="h-full tabletSM:mt-[20px] w-full ml-[20px]">
            <InputShared
              disabled
              value="This is where you describe your artwork. Choose a starting point before typing."
            />
          </div>
        </div>
        <div className="text-center mt-[15px] text-[14px] text-[#A5B5D9] font-medium flex">
          <span className="font-bold">10 generations</span> &nbsp;left before
          requiring sign-in.
          <div
            onClick={() => setIsWhyModalOpen(true)}
            className="underline ml-[5px] cursor-pointer"
          >
            Why?
          </div>
        </div>
        <div className="font-bold mt-[60px] text-[32px] text-[white]">
          Product Options
        </div>
        {/* This is product card */}
        <div className="relative flex flex-wrap items-center justify-center min-h-[220px] h-full tabletSM:hidden w-full">
          <div className={`flex flex-wrap items-center w-full justify-center`}>
            {cardsData.slice(0, 4)?.map((card: any, index: any) => {
              return (
                <div key={card.id}>
                  <ProductCard
                    card={card}
                    key={key}
                    lastCard={index === cardsData.length - 1}
                    isAnimation={true}
                  />
                </div>
              );
            })}
          </div>
        </div>
        {/* This is the hover mobile product card */}
        <div className="relative hidden items-center justify-center min-h-[180px] h-full tabletSM:block w-full">
          <div className={`flex flex-wrap items-center justify-center`}>
            {cardsData.slice(0, 2)?.map((card: any, index: any) => {
              return (
                <div key={card.id}>
                  <ProductCard
                    card={card}
                    key={key}
                    lastCard={index === cardsData.length - 1}
                    isAnimation={true}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-[30px]">
          <ButtonShared
            clickHandler={() => setIsProductModalOpen(true)}
            text="View All Products"
            type="primary"
            ghost
          />
        </div>
      </div>
      {isProductModalOpen && setIsProductModalOpen && (
        <AllProductsModal
          isProductModalOpen={isProductModalOpen}
          setIsProductModalOpen={setIsProductModalOpen}
        />
      )}
      {isWhyModalOpen && setIsWhyModalOpen && (
        <WhyModal
          isWhyModalOpen={isWhyModalOpen}
          setIsWhyModalOpen={setIsWhyModalOpen}
        />
      )}
    </div>
  );
}

export default StartMakingProducts;
