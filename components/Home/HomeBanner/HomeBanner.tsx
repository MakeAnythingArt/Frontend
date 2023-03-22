'use client';
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import ButtonShared from '../../Shared/ButtonShared/ButtonShared';
import ProductCard from '../../Shared/Cards/ProductCard';
import { v4 as uuid } from 'uuid';

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

function HomeBanner() {
  const [cardsData, setCardsData] = useState<any>(cardsDataArray.slice(0, 3));
  const router = useRouter();

  useEffect(() => {
    const id = setInterval(() => {
      const random = _.shuffle(cardsDataArray);
      setCardsData(random);
    }, 5500);
    return () => clearInterval(id);
  }, [cardsData]);

  const [key, setKey] = useState(uuid());

  useEffect(() => {
    setKey(uuid());
  }, [cardsData]);

  return (
    <div>
      <div className="text-[16px] text-[#FAFAFA] flex w-full justify-center mt-12 desktop:hidden font-semibold">
        PRODUCT OPTIONS
      </div>
      <div className="relative mt-[200px] tabletSM:mt-[140px]">
        <div className="w-full flex justify-center absolute top-[-120px] z-[8] pl-[16px]">
          <div className="flex w-[600px] tabletSM:hidden">
            {cardsData.slice(0, 3)?.map((card: any, index: any) => {
              return (
                <div key={card.id}>
                  <ProductCard
                    card={card}
                    key={key}
                    lastCard={index === cardsData.length - 1}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full flex justify-center absolute top-[-120px] z-[8] pl-[16px]">
          <div className="hidden tabletSM:flex">
            {cardsData.slice(0, 2).map((card: any, index: any) => {
              return (
                <ProductCard
                  card={card}
                  key={card.id}
                  lastCard={index === cardsData.length - 1}
                  isAnimation={false}
                />
              );
            })}
          </div>
        </div>
        <div className="mt-[100px] tabletSM:mb-[-163px] relative">
          <div>
            <video
              src={
                'https://res.cloudinary.com/binary-marvels/video/upload/v1673722604/Banner_BG_Compressed_pr5s2i.mp4'
              }
              autoPlay={true}
              muted
              loop
              className="w-full object-cover object-top !h-[422px]  tabletSM:invisible"
            ></video>
          </div>

          <div
            className="absolute w-full !max-h-[422px] h-full top-0 "
            style={{ background: 'rgb(16, 25, 47, 0.8)' }}
          ></div>
          <div className="absolute top-0 left-0 flex w-full justify-center h-full items-center flex-col desktop:text-[56px] tabletSM:text-[32px] font-medium text-[#FAFAFA] tabletSM:px-[25px] tabletSM:top-[-75px]">
            <div className="tabletSM:px-[27px] tabletSM:mt-24 leading-[140%] font-bold text-center">
              DESIGN ANY ART ON ANY CANVAS
            </div>
            <div className="font-medium text-[#A5B5D9] text-[18px] mt-[12px] text-center leading-[150%] tabletSM:w-[75%] tabletSM:text-[14px]">
              Use AI to create
              <span className="font-bold">never-before-seen</span> art and print
              it on accessories, items, and gifts.
            </div>
            <div className="w-[150px] z-[1] mt-6 tabletSM:mt-6">
              <ButtonShared
                text="Start Making"
                type="primary"
                ghost
                style={{ fontWeight: 700 }}
                clickHandler={() => router.push('/home/start-making')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;
