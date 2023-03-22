import React from 'react';

function Title({ title, subTitle }: { title: string; subTitle: string }) {
  return (
    <>
      <div className="font-black uppercase text-[56px] text-center text-[white] mobile:text-[24px]">
        {title}
      </div>
      <div className="mt-[10px] text-[20px] text-center font-normal text-[#A5B5D9] mobile:text-[16px]">
        {subTitle}
      </div>
    </>
  );
}

export default Title;
