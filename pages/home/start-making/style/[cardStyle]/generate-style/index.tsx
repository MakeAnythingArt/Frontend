import { message, Spin } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import RollDice from '../../../../../../components/Inspiration/RollDice/RollDice';
import ButtonShared from '../../../../../../components/Shared/ButtonShared/ButtonShared';
import Layout from '../../../../../../components/Shared/Layout/Layout';
import { generateImage } from '../../../../../../services/product';

const flexCenter = 'flex items-center justify-center';

function Index() {
  const router = useRouter();
  const prompt: any = router?.query?.prompt;
  const cardStyle: any = router?.query?.style;

  const generatingImage = {
    prompt: prompt?.toUpperCase(),
    style: cardStyle?.includes(' ')
      ? cardStyle?.replace(' ', '_').toUpperCase()
      : cardStyle?.toUpperCase(),
  };
  const { data, isLoading } = useQuery(
    ['generatedImage'],
    () => generateImage({ data: generatingImage }),
    {
      enabled: !!router?.query?.style && !!router?.query?.prompt,
      // staleTime: Infinity,
      onError: (error: any) => {
        message.error(error.response.data);
        router.back();
      },
    },
  );

  return (
    <Layout>
      <Spin
        spinning={isLoading}
        className="w-full min-h-[200px] flex h-full items-center justify-center"
      >
        {data && <RollDice hoverCardsIntegratedData={data} />}
      </Spin>
      <div className={`${flexCenter} std_padding std_paddingTop`}>
        <div
          className={`${flexCenter} flex-col std_maxWidth w-full text-center`}
        >
          <div className="font-extrabold text-[42px] text-[white]">
            Or Start Over
          </div>
          <div className="font-bold text-[20px] text-[white]">
            (Don’t worry, you can always view your history on your history page)
          </div>
          <div className={`${flexCenter} max-w-[200px] w-full mt-[20px]`}>
            <ButtonShared
              clickHandler={() => router.push('/home/start-making')}
              text="Start Over"
              type="primary"
              ghost
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Index;
