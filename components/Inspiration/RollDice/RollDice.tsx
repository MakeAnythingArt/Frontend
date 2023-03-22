/* eslint-disable react-hooks/exhaustive-deps */
import { Col, message, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { createProduct } from '../../../services/product';
import Card from '../../Shared/Cards/Card';
import ProudctCardHover from '../../Shared/Cards/ProudctCardHover';

const flexCenter = 'flex items-center justify-center';

const hoverCardsDataTemp = [
  {
    id: 1,
    src: '/Assets/Images/inspiration_multi_umbrella.svg',
  },
  {
    id: 2,
    src: '/Assets/Images/inspiration_white_umbrella.svg',
  },
  {
    id: 3,
    src: '/Assets/Images/inspiration_orange_umbrella.svg',
  },
  {
    id: 4,
    src: '/Assets/Images/inspiration_orange_yellow_umbrella.svg',
  },
];

const blueprint_ids = [1007, 346, 1082, 836, 541, 1218, 1247, 1220];

function RollDice({
  hoverCardsIntegratedData,
}: {
  hoverCardsIntegratedData?: any;
}) {
  const [hoverCardsData, setHoverCardsData] = useState<any>(
    hoverCardsIntegratedData ? hoverCardsIntegratedData : hoverCardsDataTemp,
  );

  useEffect(() => {
    setHoverCardsData(hoverCardsIntegratedData);
  }, [hoverCardsIntegratedData]);

  const hoverActiveCardHandler = (id: number) => {
    const tempData = hoverCardsData?.images?.map((card: any) => {
      if (card.id === id) {
        mutate({
          use_nobg: false,
          image_id: card?.id,
          blueprint_ids,
        });
        return {
          ...card,
          status: true,
        };
      } else {
        return {
          ...card,
          status: false,
        };
      }
    });
    setHoverCardsData({
      ...hoverCardsData,
      images: tempData,
    });
  };

  const {
    mutate,
    data: blueprints,
    isLoading,
  } = useMutation((data: any) => createProduct({ data }), {
    onError: (err: any) => {
      message.error(err?.response?.data);
    },
  });

  // This will automatically select the first generated Image card
  useEffect(() => {
    const tempData = hoverCardsData?.images?.map((card: any, index: any) => {
      if (index == 0) {
        return {
          ...card,
          status: true,
        };
      } else {
        return {
          ...card,
          status: false,
        };
      }
    });
    setHoverCardsData({
      ...hoverCardsData,
      images: tempData,
    });
    const image_id = hoverCardsData?.images?.filter(
      (image: any, index: any) => index == 0 && image,
    );
    mutate({
      use_nobg: false,
      image_id: image_id[0]?.id,
      blueprint_ids,
    });
  }, []);

  return (
    <div>
      <div className={`${flexCenter} std_padding std_paddingTop text-[#fff]`}>
        <div className={`${flexCenter} flex-col std_maxWidth w-full`}>
          {/* Click Fav Section */}
          <div className="flex justify-center items-center std_paddingTop mobile:mt-6">
            <div className="text-[42px] font-[900] uppercase mobile:text-[24px]">
              Click your favorite
            </div>
          </div>
          <div className="std_maxWidth mt-6 mobile:mt-2">
            {/* Hover Card Product */}
            <div className="relative flex items-center min-h-[295px] tabletSM:min-h-[190px] h-full overflow-x-scroll w-full">
              {hoverCardsData?.images?.map((card: any) => {
                return (
                  <div
                    key={card.id}
                    className="flex w-full mt-[20px] items-center justify-center"
                  >
                    <ProudctCardHover
                      card={card}
                      key={card.id}
                      hoverActiveCardHandler={hoverActiveCardHandler}
                    />
                  </div>
                );
              })}
            </div>

            {/* Choose Canva Section */}
            <div className="flex justify-center items-center mt-[100px] mobile:mt-6">
              <div className="text-[42px] font-[900] uppercase mobile:text-[24px]">
                Choose A Canvas
              </div>
            </div>
            <div className="std_maxWidth mt-6 mobile:mt-2">
              <Spin
                spinning={isLoading}
                className="w-full h-full items-center flex justify-center"
              >
                <Row gutter={[0, 16]}>
                  {blueprints?.map((blueprint: any) => {
                    return (
                      <Col
                        key={blueprint?.id}
                        xxl={6}
                        xl={8}
                        lg={12}
                        md={12}
                        sm={12}
                        xs={24}
                        className="mobile:!flex mobile:!justify-center mobile:!items-center mobile:w-full flex items-center justify-center"
                      >
                        <Card card={blueprint} key={blueprint.id} />
                      </Col>
                    );
                  })}
                </Row>
              </Spin>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RollDice;
