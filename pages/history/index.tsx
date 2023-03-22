import { Empty, message, Spin } from 'antd';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import HistoryBanner from '../../components/History/HistoryBanner/HistoryBanner';
import HistoryRecord from '../../components/History/HistoryRecord/HistoryRecord';
import Layout from '../../components/Shared/Layout/Layout';
import { getHistory } from '../../services/history';

function Index() {
  const {
    data: userHistory,
    isLoading,
    refetch,
  } = useQuery(['getAllHistoryData'], () => getHistory(), {
    onError(err: any) {
      if (axios.isAxiosError(err)) {
        message.error(err?.response?.data);
      }
    },
  });

  return (
    <Layout>
      <HistoryBanner />
      <Spin
        spinning={isLoading}
        className="flex justify-center items-center h-full w-full"
      >
        {userHistory?.data?.histories?.length > 0 ? (
          <HistoryRecord
            routerPathSecondBtn="/favorites"
            cardsData={userHistory?.data}
            isLoading={isLoading}
            refetch={refetch}
          />
        ) : (
          <div className="p-12">
            <Empty description="No History" className="text-[#fff]" />
          </div>
        )}
      </Spin>
    </Layout>
  );
}

export default Index;
