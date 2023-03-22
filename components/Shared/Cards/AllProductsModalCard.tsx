/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react';
import ProductPage from '../../ProductPage/ProductPage';
import ButtonShared from '../ButtonShared/ButtonShared';

function AllProductsModalCard({
  card,
  hoverBtnText,
  collectionModal = false,
  blueprint_name,
  clickHandler,
}: {
  card: any;
  hoverBtnText: any;
  collectionModal?: any;
  blueprint_name?: any;
  clickHandler?: any;
}) {
  const cardRef: any = useRef(null);
  const buttonRef: any = useRef(null);
  const [cardData, setCardData] = useState<any>({});
  const [productModalOpen, setProductModalOpen] = useState<boolean>(false);

  useEffect(() => {
    cardRef.current.addEventListener('mouseenter', () => {
      buttonRef.current.style.display = 'flex';
    });
    cardRef.current.addEventListener('mouseleave', () => {
      buttonRef.current.style.display = 'none';
    });
  });

  useEffect(() => {
    if (!collectionModal) {
      const tempCard = {
        ...card,
        blueprint_name,
      };
      setCardData(tempCard);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card]);

  return (
    <div
      className={`flex cursor-pointer justify-center items-center flex-col p-[9px] bg-[#1A2747] w-[304px] mobile:w-[146px] tabletSM:w-[146px] rounded-[26px] shadow-[0px_0.912195px_6.84146px_rgba(0, 0, 0, 0.05)] tabletSM:rounded-[15px] `}
      style={{ cursor: 'pointer', border: '1px solid #385494' }}
      key={card.id}
    >
      <div ref={cardRef} className="relative">
        <img
          src={
            collectionModal
              ? card?.images[0]?.url
              : cardData?.images && cardData?.images[0]?.src
          }
          alt=""
          className="w-[270px] rounded-[10px] mt-1 h-[270px] tabletSM:w-[127px] tabletSM:h-[127px]"
        />
        <div
          style={{ display: 'none' }}
          ref={buttonRef}
          className="absolute top-0 left-0 box_inner_shadow w-[270px] items-center justify-center rounded-[10px] h-[270px] tabletSM:h-[127px] tabletSM:w-[127px] mt-1 tabletSM:rounded-[5px]"
        >
          <div className="w-[160px] tabletSM:w-[100px] h-full flex items-center justify-center">
            <ButtonShared
              clickHandler={
                collectionModal ? clickHandler : () => setProductModalOpen(true)
              }
              className="'!rounded-[10px] !w-full !h-[48px] !text-[16px] flex items-center justify-center tabletSM:!text-[10px]"
              text={hoverBtnText}
              type="primary"
            />
          </div>
        </div>
      </div>
      {collectionModal ? (
        <div className="flex !capitalize w-full justify-center font-bold text-[#FAFAFA] text-[14px] mt-3 mb-1 tabletSM:text-[8px]">
          {card.price ? (
            <span>
              {card?.name} - ${card?.price / 100}
            </span>
          ) : (
            <span>{card?.prompt}</span>
          )}
        </div>
      ) : (
        <div className="flex !capitalize w-full justify-center font-bold text-[#FAFAFA] text-[14px] mt-3 mb-1 tabletSM:text-[8px]">
          <span>
            {cardData?.blueprint_name} -{' '}
            ${cardData?.variants && cardData?.variants[0]?.cost / 100}
          </span>
        </div>
      )}
      {productModalOpen && setProductModalOpen && (
        <ProductPage
          productModalOpen={productModalOpen}
          setProductModalOpen={setProductModalOpen}
          blueprintData={card}
        />
      )}
    </div>
  );
}

export default AllProductsModalCard;
