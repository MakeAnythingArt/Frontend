import { message, Modal, Spin } from 'antd';
import React, { useEffect } from 'react';
import ButtonShared from '../Shared/ButtonShared/ButtonShared';
import AllProductsModalCard from '../Shared/Cards/AllProductsModalCard';
import { CloseOutlined } from '@ant-design/icons';
import { useMutation } from 'react-query';
import { createProduct } from '../../services/product';

const blueprints_names = [
  'Backpack',
  'Wall Art',
  'Tote Bag',
  'Pillow',
  'Phone Case',
  'Hoodie',
  'Poster',
  'Coaster',
];

function AllProductsModal({
  isProductModalOpen,
  setIsProductModalOpen,
  image_id,
}: {
  isProductModalOpen: any;
  setIsProductModalOpen: any;
  image_id?: any;
}) {
  const handleOk = () => {
    setIsProductModalOpen(false);
  };

  const handleCancel = () => {
    setIsProductModalOpen(false);
  };

  // creating the product using blueprints and image Id
  const {
    mutate,
    data: blueprints,
    isLoading,
  } = useMutation((data: any) => createProduct({ data }), {
    onError: (err: any) => {
      if (err?.response.status === 500) {
        message.error('Internal Server Error!');
      } else {
        message.error(err?.response?.data);
      }
    },
    retry: true,
  });

  useEffect(() => {
    const blueprint_ids = [1007, 346, 1082, 836, 541, 1218, 1247, 1220];
    image_id &&
      mutate({
        use_nobg: false,
        image_id,
        blueprint_ids,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image_id]);

  return (
    <Modal
      className="modal-svg lg:px-4 bottomToTop"
      open={isProductModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
      closeIcon={
        <CloseOutlined style={{ color: '#FAFAFA', fontSize: '24px' }} />
      }
      width="100%"
      bodyStyle={{ backgroundColor: '#151f38' }}
      transitionName=""
      style={{
        maxWidth: '1170px',
        borderRadius: '0px',
        minHeight: '751px',
      }}
    >
      <div className="text-[40px] font-semibold text-[#fafafa] p-6 flex justify-center items-center text-center mobile:text-[24px] mobile:font-bold">
        All Products
      </div>
      <Spin
        className="w-full h-full flex justify-center items-center !bg-[none]"
        spinning={isLoading}
      >
        <div
          className={`flex items-center justify-center flex-wrap w-full py-[40px]`}
        >
          {blueprints?.map((card: any, index: any) => {
            return (
              <div key={card.id} className="py-[10px] px-[10px]">
                <AllProductsModalCard
                  hoverBtnText="View Art on Canvas"
                  card={card}
                  key={card.id}
                  blueprint_name={blueprints_names[index]}
                />
              </div>
            );
          })}
        </div>
      </Spin>
      <div className="text-[40px] font-semibold text-[#fafafa] p-6 flex justify-center items-center text-center mobile:text-[24px] mobile:font-bold">
        <div className="w-[220px]">
          <ButtonShared
            text="Close"
            type="primary"
            ghost
            clickHandler={() => setIsProductModalOpen(false)}
          />
        </div>
      </div>
    </Modal>
  );
}

export default AllProductsModal;
