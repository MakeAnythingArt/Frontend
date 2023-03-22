import { useRouter } from 'next/router';
import React from 'react';
import PickCollectionCard from '../../Home/PickCollectionCard/PickCollectionCard';

const flexCenter = 'flex items-center justify-center';

function PickCollectionCards({
  cardRoute,
  cardsData,
  buttonText,
  pfcComp = false,
  integration = false,
}: {
  cardsData: any;
  cardRoute?: any;
  buttonText?: any;
  pfcComp?: boolean;
  integration?: boolean;
}) {
  const router = useRouter();

  return (
    <div className={`${flexCenter} std_padding std_paddingTop`}>
      <div className={`${flexCenter} flex-col std_maxWidth w-full`}>
        <div className="flex flex-row flex-wrap text-center text-[#FAFAFA] justify-center">
          {cardsData?.map((val: any) => {
            let btnText;
            if (router.query.cardStyle == val?.name) {
              btnText = 'Style Applied';
            } else {
              btnText = 'Apply Style';
            }
            return (
              <PickCollectionCard
                pfcComp={pfcComp}
                integration={integration}
                buttonText={pfcComp ? buttonText : btnText}
                key={val.id}
                val={val}
                cardRoute={
                  pfcComp ? cardRoute : `/home/start-making/style/${val?.name}`
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PickCollectionCards;
