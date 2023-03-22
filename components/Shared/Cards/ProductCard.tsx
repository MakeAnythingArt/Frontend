'use client';

import { useSpring, animated } from '@react-spring/web';
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react';

function ProductCard({
  card,
  lastCard,
  setProductModalOpen,
  isAnimation = true,
}: {
  card: any;
  lastCard?: any;
  setProductModalOpen?: any;
  isAnimation?: boolean;
}) {
  const [styles, api] = useSpring(() => ({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: { duration: 1500 },
  }));

  useEffect(() => {
    if (isAnimation) {
      api.start({ opacity: 1 });

      const timer = setTimeout(() => {
        api.start({ opacity: 0 });
      }, 4000);

      return () => {
        api.start({ opacity: 0 });
        clearTimeout(timer);
      };
    }
  }, [api, isAnimation]);

  return (
    <animated.div
      // @ts-nocheck
      style={{
        ...styles,
      }}
    >
      <div>
        {/* <div className={`fade${index}`}> */}
        {
          <div
            className={`p-[9px] bg-[#1A2747] mt-2 mb-3 w-[170px] mobile:w-[130px] tabletSM:w-[130px] rounded-[15px] shadow-[0px_0.912195px_6.84146px_rgba(0, 0, 0, 0.05)]  ${
              lastCard ? 'mr-0' : 'mr-[36px] tabletSM:mr-[23px]'
            } `}
            key={card.id}
            onClick={() => setProductModalOpen && setProductModalOpen(true)}
            style={setProductModalOpen ? { cursor: 'pointer' } : {}}
          >
            <img
              src={card?.src}
              alt={''}
              className="w-[150px] rounded-[15px] object-cover h-[150px] tabletSM:w-[110px] tabletSM:h-[110px]"
            />
            <div className="flex !capitalize w-full justify-center font-semibold text-[#FAFAFA] text-[12px] mt-[10px] tabletSM:text-[9px]">
              {card?.name} - {card?.price}
            </div>
          </div>
        }
      </div>
    </animated.div>
  );
}

export default ProductCard;
