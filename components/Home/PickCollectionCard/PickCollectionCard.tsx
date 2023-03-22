import { Image } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import ButtonShared from '../../Shared/ButtonShared/ButtonShared';

function PickCollectionCard({
  val,
  cardRoute,
  buttonText,
  integration,
  pfcComp,
}: {
  val: any;
  cardRoute: any;
  buttonText?: any;
  integration?: any;
  pfcComp?: any;
}) {
  const router = useRouter();
  const cardRef: any = useRef(null);
  const buttonRef: any = useRef(null);
  const [activeCard, setActiveCard] = useState<boolean>(false);

  useEffect(() => {
    cardRef.current.addEventListener('mouseenter', () => {
      buttonRef.current.style.display = 'flex';
    });
    cardRef.current.addEventListener('mouseleave', () => {
      buttonRef.current.style.display = 'none';
    });
  });

  useEffect(() => {
    if (router?.query?.cardStyle) {
      if (router.query.cardStyle === val?.name) {
        setActiveCard(true);
      } else {
        setActiveCard(false);
      }
    }
  }, [router.query.cardStyle, val.name]);

  return (
    <div
      key={val.id}
      className="bg-[#1A2747]  w-[220px] h-[260px] ml-[10px] !rounded-[10px] mt-[20px] tabletSM:w-[120px] tabletSM:h-[150px] tabletSM:ml-[5px] cursor-pointer"
      style={activeCard ? { border: '2px solid white' } : { border: 'none' }}
    >
      <div
        ref={cardRef}
        className="mt-[19px] tabletSM:mt-[5px] tabletSM:px-[5px] relative flex items-center justify-center"
      >
        <Image
          src={integration ? val?.images[0]?.url : val?.src}
          alt=""
          preview={false}
          className="!w-[199px] !h-[198px] rounded-[10px] object-cover tabletSM:!h-[99px] tabletSM:!w-[110px] tabletSM:rounded-[5px]"
          loading="lazy"
        />
        <div
          style={{ display: 'none' }}
          ref={buttonRef}
          className="absolute top-0 left-[10px] box_inner_shadow w-[199px] h-full items-center justify-center rounded-[10px] tabletSM:w-[110px] tabletSM:left-[5px] tabletSM:rounded-[5px]"
        >
          <div className=" w-[160px] tabletSM:w-[100px] h-full flex items-center justify-center">
            {cardRoute !== undefined ? (
              <ButtonShared
                clickHandler={() => {
                  if (pfcComp) {
                    router.push({
                      pathname: cardRoute,
                      query: { id: val?.id },
                    });
                  } else {
                    router.push(cardRoute);
                  }
                }}
                className="'!rounded-[10px] !w-full !h-[48px] !text-[16px] flex items-center justify-center tabletSM:!text-[12px]"
                text={buttonText}
                type="primary"
              />
            ) : (
              <ButtonShared
                className="'!rounded-[10px] !w-full !h-[48px] !text-[16px] flex items-center justify-center tabletSM:!text-[12px]"
                text={buttonText}
                type="primary"
              />
            )}
          </div>
        </div>
      </div>
      <p className=" text-[14px] !capitalize font-[700] tabletSM:text-[12px] pt-[10px] tabletSM:pt-[5px] tabletSM:px-[2px] tabletSM:flex tabletSM:justify-center tabletSM:items-center tabletSM:!h-[calc(150px-112px)]">
        {integration ? val?.prompt : val?.name}
      </p>
    </div>
  );
}

export default PickCollectionCard;
