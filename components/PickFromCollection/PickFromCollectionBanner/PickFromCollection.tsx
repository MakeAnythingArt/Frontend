import React, { useState } from 'react';
import ButtonShared from '../../Shared/ButtonShared/ButtonShared';
import { Row, Col } from 'antd';
import { useRouter } from 'next/router';
import Title from '../../Shared/Title/Title';
import StartingPointSelect from '../../Shared/StartingPointSelect/StartingPointSelect';
import CollectionModal from '../../Shared/CollectionModal/CollectionModal';

function PickFromCollection({ collections }: any) {
  const [isCollectionModalOpen, setIsCollectionModalOpen] =
    useState<boolean>(false);
  const router = useRouter();

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
    <div className="std_padding  flex justify-center items-center ">
      <div className="std_maxWidth">
        <div className="flex flex-col text-center text-[#FAFAFA] justify-center pt-[50px] ">
          <Title
            title="These are collections"
            subTitle="We hand-pick the best AI images in these categories, so you can show
          off amazing artwork, fast."
          />
          <div className="flex flex-row  text-center  justify-center pt-[50px]  items-center">
            <Row className="flex flex-row  text-center  justify-center  items-center">
              <Col
                className="mobile:flex mobile:justify-center tabletSM:flex tabletSM:justify-center tabletSM:pb-[20px]"
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
              >
                <div className="w-[206px]  ">
                  <StartingPointSelect
                    defaultValue="/home/start-making/pick-from-a-collection"
                    startingPointOptions={startingPointOptions}
                    onChange={(e: any) => router.push(e)}
                  />
                </div>
              </Col>
              <Col
                className="mobile:flex mobile:justify-center tabletSM:flex tabletSM:justify-center tabletSM:pb-[20px]"
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
              >
                {collections && (
                  <div className="w-[206px] ml-[20px]">
                    <ButtonShared
                      text={'View More Collection'}
                      type="primary"
                      ghost
                      clickHandler={() => setIsCollectionModalOpen(true)}
                    />
                  </div>
                )}
              </Col>
            </Row>
          </div>
        </div>
      </div>
      {collections && isCollectionModalOpen && setIsCollectionModalOpen && (
        <CollectionModal
          collections={collections}
          isCollectionModalOpen={isCollectionModalOpen}
          setIsCollectionModalOpen={setIsCollectionModalOpen}
        />
      )}
    </div>
  );
}

export default PickFromCollection;
