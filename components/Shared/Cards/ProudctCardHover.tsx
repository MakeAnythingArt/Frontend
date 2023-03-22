/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from 'react';
import CardFavouriteArchieve from '../CardFavouriteArchieve/CardFavouriteArchieve';

function ProudctCardHover({
  card,
  hoverActiveCardHandler,
}: {
  card: any;
  hoverActiveCardHandler?: any;
}) {
  const cardRef: any = useRef(null);
  const iconRef: any = useRef(null);

  useEffect(() => {
    cardRef.current.addEventListener('mouseenter', () => {
      iconRef.current.style.display = 'flex';
    });

    cardRef.current.addEventListener('mouseleave', () => {
      card.status === true
        ? (iconRef.current.style.display = 'flex')
        : (iconRef.current.style.display = 'none');
    });
  });

  return (
    <div
      ref={cardRef}
      onClick={() => hoverActiveCardHandler(card?.id)}
      className="cursor-pointer flex items-center justify-center mb-4"
    >
      <div
        className={`flex flex-col justify-center items-center p-[9px] bg-[#1A2747] w-[230px] mobile:w-[115px] tabletSM:w-[115px] rounded-[15px] shadow-[0px_0.912195px_6.84146px_rgba(0, 0, 0, 0.05)]} mr-[35px] tabletSM:mr-[15px]  `}
      >
        <img
          src={card?.url}
          alt={''}
          className="w-[205px] rounded-[15px] object-cover h-[205px] tabletSM:w-[100px] tabletSM:h-[100px]"
        />
        <div
          ref={iconRef}
          style={
            card.status === true ? { display: 'flex' } : { display: 'none' }
          }
          className="w-full justify-center text-[#FAFAFA] text-[12px] mt-[6px] tabletSM:text-[9px]"
        >
          <div className="">
            {/* <img
              src="/Assets/Images/brush.svg"
              className="object-cover text-[30px]"
              width="100%"
              height="100%"
              alt=""
            /> */}
          </div>
          {/* Fav Icon */}
          <div className="ml-2">
            <CardFavouriteArchieve card={card} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProudctCardHover;
