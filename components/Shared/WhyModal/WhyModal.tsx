import { Modal } from 'antd';
import React from 'react';
import ButtonShared from '../ButtonShared/ButtonShared';

const textStyle = 'text-[18px] font-normal text-[#A5B5D9] pt-[15px]';
const flexCenter = 'flex items-center justify-center';

function WhyModal({
  isWhyModalOpen,
  setIsWhyModalOpen,
}: {
  isWhyModalOpen: any;
  setIsWhyModalOpen: any;
}) {
  return (
    <Modal
      className="product_page_modal lg:px-4 topToBottom_whyModal"
      open={isWhyModalOpen}
      footer={false}
      closable={false}
      transitionName=""
      style={{ maxWidth: '762px', maxHeight: '689px', height: '100%' }}
      width="100%"
      bodyStyle={{ backgroundColor: '#1A2747', borderRadius: '32px' }}
    >
      <div className={`${flexCenter} flex-col py-[50px]`}>
        <div className="font-semibold text-center text-[40px] text-[#FAFAFA]">
          Why do we limit the Number of Generations?
        </div>
        <div
          className={`${flexCenter} flex-col px-16 text-center tabletSM:px-10`}
        >
          <div className={textStyle}>
            Getting artificial intelligence (AI) to generate these images
            requires industrial-scale GPUs, which are very expensive.
          </div>
          <div className={textStyle}>
            In order to discourage any misuse of our service, we allow up to 10
            runs before sign in, and up o 100 runs per apparel bought after sign
            in.
          </div>
          <div className={textStyle}>
            All of he main functionality is also protected by ReCaptcha, which
            means that we regularly check that you are human, though without
            puzzles.
          </div>
        </div>
        <div className={`${flexCenter} w-full py-[20px] mt-[25px]`}>
          <div className="max-w-[250px] w-full">
            <ButtonShared
              clickHandler={() => setIsWhyModalOpen(false)}
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

export default WhyModal;
