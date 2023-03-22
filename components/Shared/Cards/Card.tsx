/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react';
import ProductPage from '../../ProductPage/ProductPage';
import ButtonShared from '../ButtonShared/ButtonShared';

function Card({ card }: { card: any }) {
  const cardRef: any = useRef(null);
  const buttonRef: any = useRef(null);
  const [productModalOpen, setProductModalOpen] = useState<boolean>(false);

  useEffect(() => {
    cardRef.current.addEventListener('mouseenter', () => {
      buttonRef.current.style.display = 'flex';
    });
    cardRef.current.addEventListener('mouseleave', () => {
      buttonRef.current.style.display = 'none';
    });
  });

  return (
    <>
      <div
        className={`p-[9px] bg-[#1A2747] w-[275px] cursor-pointer mobile:w-[170px] tabletSM:w-[170px] rounded-[15px] shadow-[0px_0.912195px_6.84146px_rgba(0, 0, 0, 0.05)]`}
        key={card.id}
        onClick={() => {
          setProductModalOpen(true);
        }}
      >
        <div ref={cardRef} className="relative">
          <img
            src={card?.images[0]?.src}
            alt={''}
            className="rounded-[10px] w-[250px] h-[250px] tabletSM:w-[150px] tabletSM:h-[150px]"
          />
          <div
            style={{ display: 'none' }}
            ref={buttonRef}
            className="absolute top-0 left-0 box_inner_shadow w-[250px] h-full items-center justify-center rounded-[10px] tabletSM:w-[150px] tabletSM:rounded-[5px]"
          >
            <div className=" w-[160px] tabletSM:w-[112px] h-full flex items-center justify-center">
              <ButtonShared
                clickHandler={() => setProductModalOpen(true)}
                className="'!rounded-[10px] !w-full !h-[48px] !text-[16px] flex items-center justify-center tabletSM:!text-[12px]"
                text={'See Art on Canvas'}
                type="primary"
              />
            </div>
          </div>
        </div>
        <div className="flex !capitalize w-full justify-center text-[#FAFAFA] text-[20px] mt-[15px] font-bold tabletSM:text-[12px]">
          {card?.options[0]?.name} - ${card?.variants[0]?.price / 100}
        </div>
      </div>
      {productModalOpen && setProductModalOpen && (
        <ProductPage
          productModalOpen={productModalOpen}
          setProductModalOpen={setProductModalOpen}
          blueprintData={card}
        />
      )}
    </>
  );
}

export default Card;
