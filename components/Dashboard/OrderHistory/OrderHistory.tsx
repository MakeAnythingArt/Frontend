import { Empty, Spin } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { getUserOrders } from '../../../services/order';
import OrderHistoryItems from '../OrderHistoryItems/OrderHistoryItems';

const flexCenter = 'flex items-center justify-center';

function OrderHistory({ mobileScreen = false }: { mobileScreen?: boolean }) {
  const pagination = {
    page_number: 1,
    page_count: 3,
  };

  const { data, isLoading } = useQuery(['getUserOrder'], () =>
    getUserOrders({ pagination }),
  );

  return (
    <div className={`${flexCenter} flex-col w-full`}>
      {mobileScreen === false && (
        <div className="text-[#FFFFFF] font-bold text-[24px] bg-[#344267] w-full pt-[25px] pb-[20px] pl-[40px] rounded-tr-[16px] rounded-tl-[16px]">
          Order History
        </div>
      )}

      <Spin
        spinning={isLoading}
        className="flex items-center justify-center w-full h-full min-h-[200px]"
      >
        <div className="max-h-[375px] overflow-auto ">
          {data?.orders.length === 0 ? (
            <Empty
              className="!text-[white]"
              description="Not Found"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ) : (
            data?.orders?.map((order: any, index: number) => {
              return (
                <OrderHistoryItems
                  index={index}
                  key={order.id}
                  item={order}
                  totalItems={data?.total_orders}
                />
              );
            })
          )}
        </div>
      </Spin>
    </div>
  );
}

export default OrderHistory;
