import { LeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import React from 'react';
import ButtonShared from '../Shared/ButtonShared/ButtonShared';
import Title from '../Shared/Title/Title';

function FeatureCollection() {
  const router = useRouter();

  return (
    <div className="std_padding std_paddingTop flex justify-center items-center ">
      <div className="std_maxWidth ">
        <Title
          subTitle="Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo."
          title="FEATURED COLLECTION NAME"
        />
        <div className="flex flex-row  text-center  justify-center std_paddingTop  items-center">
          <div className="w-[138px] ml-[20px]">
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
      </div>
    </div>
  );
}

export default FeatureCollection;
