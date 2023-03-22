import React from 'react';

const flexCenter = 'flex items-center justify-center';

function FaqBanner() {
  return (
    <div className={`${flexCenter} std_padding std_paddingTop`}>
      <div className={`${flexCenter} flex-col std_maxWidth w-full`}>
        <div className="text-[40px] text-[#FAFAFA] font-bold not-italic uppercase flex text-center items-center justify-center mobile:text-[24px]">
          Frequently Asked Questions
        </div>
        <div className="w-full mt-6 font-normal text-[18px] text-[#A5B5D9] flex text-center !justify-center !items-center">
          <div className="w-[580px]">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaqBanner;
