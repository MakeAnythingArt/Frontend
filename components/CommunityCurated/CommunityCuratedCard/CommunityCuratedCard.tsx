import { LeftOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import { getCommunity } from '../../../services/community';
import ButtonShared from '../../Shared/ButtonShared/ButtonShared';
import FeaturedCollectionCard from '../../Shared/FeaturedCollectionCard/FeaturedCollectionCard';
const flexCenter = 'flex items-center justify-center';

function CommunityCurated() {
  const router = useRouter();

  const { data, refetch } = useQuery(['getCommunity'], () => getCommunity(), {
    onError: (err: any) => {
      message.error(err?.response?.data);
    },
  });

  return (
    <div className={`std_padding std_paddingTop w-full ${flexCenter} flex-col`}>
      <div className={`std_maxWidth ${flexCenter}`}>
        <div className="w-full">
          <div className="flex items-center justify-end w-full xl:justify-center">
            <div className="w-[138px]">
              <ButtonShared
                text={'Back'}
                type="primary"
                ghost
                icon={<LeftOutlined />}
                clickHandler={() => {
                  router.back();
                }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between flex-wrap xl:justify-center">
            {data?.data?.images.map((card: any) => {
              return (
                <FeaturedCollectionCard
                  key={card.id}
                  data={card}
                  refetch={refetch}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityCurated;
