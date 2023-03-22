import { Modal } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import ButtonShared from '../ButtonShared/ButtonShared';
import AllProductsModalCard from '../Cards/AllProductsModalCard';
import { CloseOutlined } from '@ant-design/icons';

const flexCenter = 'flex items-center justify-center';

function CollectionModal({
  isCollectionModalOpen,
  setIsCollectionModalOpen,
  collections,
}: {
  isCollectionModalOpen: any;
  setIsCollectionModalOpen: any;
  collections: any;
}) {
  const router = useRouter();

  return (
    <Modal
      className="product_page_modal lg:px-4"
      open={isCollectionModalOpen}
      footer={false}
      onCancel={() => setIsCollectionModalOpen(false)}
      closeIcon={
        <CloseOutlined style={{ color: '#FAFAFA', fontSize: '24px' }} />
      }
      style={{ maxWidth: '1170px', maxHeight: '751px', height: '100%' }}
      width="100%"
      bodyStyle={{ backgroundColor: '#1A2747', borderRadius: '32px' }}
    >
      <div className={`${flexCenter} flex-col py-[50px]`}>
        <div className="font-semibold text-center text-[40px] text-[#FAFAFA]">
          More Collections
        </div>
        <div className={`${flexCenter} flex-wrap w-full py-[40px]`}>
          {collections?.map((collection: any) => {
            return (
              <div key={collection.id} className="py-[10px] px-[10px]">
                <AllProductsModalCard
                  hoverBtnText="View Featured"
                  clickHandler={() =>
                    router.push({
                      pathname:
                        '/home/start-making/pick-from-a-collection/featured-collection',
                      query: { id: collection?.id },
                    })
                  }
                  card={collection}
                  collectionModal={true}
                />
              </div>
            );
          })}
        </div>
        <div className={`${flexCenter} w-full`}>
          <div className="max-w-[250px] w-full">
            <ButtonShared
              clickHandler={() => setIsCollectionModalOpen(false)}
              text="Close"
              type="primary"
              ghost
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CollectionModal;
