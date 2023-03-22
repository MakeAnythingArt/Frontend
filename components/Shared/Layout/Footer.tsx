import Image from 'next/image';
import React from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

function Footer({ activePage }: any) {
  const router = useRouter();
  const flexCenter = 'flex items-center justify-center';
  const flexBetween = 'flex items-center justify-between';
  const menuStyles = `${flexCenter} flex-col font-medium cursor-pointer hover:text-[white]`;

  const menu = [
    {
      id: 1,
      comp: (
        <div
          style={activePage.includes('home') ? { color: 'white' } : {}}
          onClick={() => router.push('/home')}
          className={menuStyles}
        >
          Home
        </div>
      ),
    },
    {
      id: 2,
      comp: (
        <div
          style={activePage.includes('history') ? { color: 'white' } : {}}
          onClick={() => router.push('/history')}
          className={menuStyles}
        >
          History
        </div>
      ),
    },
    {
      id: 3,
      comp: (
        <div
          style={activePage.includes('faq') ? { color: 'white' } : {}}
          className={menuStyles}
          onClick={() => router.push('/faq')}
        >
          FAQ
        </div>
      ),
    },
    {
      id: 4,
      comp: (
        <div
          style={activePage.includes('contact') ? { color: 'white' } : {}}
          className={menuStyles}
          onClick={() => router.push('/contact')}
        >
          Contact
        </div>
      ),
    },
    {
      id: 5,
      comp: (
        <ShoppingCartOutlined
          style={{ paddingRight: '20px' }}
          className={`${menuStyles} text-[24px]`}
        />
      ),
    },
  ];

  return (
    <div
      className={`${flexCenter} flex-col w-full std_padding std_paddingTop z-10`}
    >
      <div className="std_maxWidth">
        <div
          style={{ borderBottom: '1px solid #1E2E54' }}
          className={`${flexBetween} mobile:flex-col mobile:items-start h-[97px] w-full mobile:pb-[10px]`}
        >
          <Image
            className="cursor-pointer"
            width={51}
            height={52}
            src="/Assets/Images/logo.svg"
            alt=""
            onClick={() => router.push('/home')}
          />
          <div className={`${flexCenter}`}>
            {menu
              .filter((val: any) => val.id !== 5)
              .map((item: any) => {
                return (
                  <div
                    className="text-[#A5B5D9] font-medium text-[16px]"
                    key={item.id}
                  >
                    <div className={item.id !== 4 ? 'pr-[30px]' : ''}>
                      {item.comp}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div
          className={`${flexBetween} mobile:flex-col mobile:items-start h-[110px] w-full mobile:justify-evenly`}
        >
          <div className="cursor-pointer w-full text-[14px] font-medium text-[#A5B5D9]">
            <span
              onClick={() => {
                router.push('/terms-of-services');
              }}
              className="hover:text-[#198ffe]"
            >
              Terms & Conditions
            </span>
            &nbsp;
            <span
              onClick={() => {
                router.push('/privacy-policy');
              }}
              className="hover:text-[#198ffe]"
            >
              Privacy Policy &copy;2022
            </span>
          </div>
          <div
            className={`flex items-center justify-end w-full mobile:justify-start`}
          >
            <div
              className={`${flexCenter} cursor-pointer mr-[20px] w-[32px] h-[32px] rounded-[4px] bg-[#112a4e]`}
            >
              <Image
                src="/Assets/Images/tiktok_icon.svg"
                width={10}
                height={10}
                alt="tiktok"
              />
            </div>
            <div
              className={`${flexCenter} cursor-pointer w-[32px] h-[32px] rounded-[4px] border-[1px] border-solid border-[white]`}
            >
              <Image
                src="/Assets/Images/insta_icon.svg"
                width={10}
                height={10}
                alt="instagram"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
