import React, { useState } from 'react';
import { Collapse, Empty, Image } from 'antd';
import OrderHistory from '../OrderHistory/OrderHistory';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import ImageHistory from '../ImageHistory/ImageHistory';
import Favourites from '../Favourites/Favourites';
import { useRouter } from 'next/router';
import Account from '../Account/Account';

const { Panel } = Collapse;
const flexCenter = `flex items-center justify-center`;

function DashboardDetails() {
  const [menuActive, setMenuActive] = useState<string>('Order History');
  const [activeKeys, setActiveKeys] = useState<any>(['1']);
  const router = useRouter();

  const menu = [
    {
      id: 1,
      title: 'My Account',
      grayIcon: '/Assets/Images/account_icon_gray.svg',
      whiteIcon: '/Assets/Images/account_icon_white.svg',
      panelData: <Account mobileScreen={true} />,
    },
    {
      id: 2,
      title: 'Order History',
      grayIcon: '/Assets/Images/note_icon_gray.svg',
      whiteIcon: '/Assets/Images/note_icon_white.svg',
      panelData: <OrderHistory mobileScreen={true} />,
    },
    {
      id: 3,
      title: 'Image History',
      grayIcon: '/Assets/Images/gallery_icon_gray.svg',
      whiteIcon: '/Assets/Images/gallery_icon_white.svg',
      panelData: <ImageHistory mobileScreen={true} />,
    },
    {
      id: 4,
      title: 'Favourites',
      grayIcon: '/Assets/Images/favorite_icon_gray.svg',
      whiteIcon: '/Assets/Images/favorite_icon_white.svg',
      panelData: <Favourites mobileScreen={true} />,
    },
    {
      id: 5,
      title: 'Logout',
      grayIcon: '/Assets/Images/logout_icon_gray.svg',
      whiteIcon: '/Assets/Images/logout_icon_white.svg',
      panelData: <div className="p-6 text-[white] text-[20px]">No data</div>,
    },
  ];

  return (
    <div className={`${flexCenter} std_padding std_paddingTop`}>
      <div className={`flex items-start justify-center std_maxWidth`}>
        <div
          className={`${flexCenter} tabletSM:hidden flex-col h-[456px] min-w-[312px] rounded-[16px] bg-[#1A2747] border-solid border-[1px] border-[#385494]`}
        >
          {menu?.map((item: any, index: number) => {
            return (
              <div
                onClick={() => {
                  setMenuActive(item.title);
                  if (item?.id === 5) {
                    localStorage.removeItem('make-anything-user');
                    router.push('/home');
                  }
                }}
                key={item.id}
                style={
                  index + 1 !== 5 ? { borderBottom: '1px solid #1E2E54' } : {}
                }
                className={`flex cursor-pointer items-center justify-start py-[25px] w-full pl-9`}
              >
                <Image
                  preview={false}
                  src={
                    menuActive === item.title ? item.whiteIcon : item.grayIcon
                  }
                  alt=""
                  width="24px"
                  height="24px"
                />
                <div
                  style={menuActive === item.title ? { color: 'white' } : {}}
                  className="text-[20px] font-medium text-[#A5B5D9] pl-5"
                >
                  {item.title}
                </div>
              </div>
            );
          })}
        </div>
        <div className="tabletSM:hidden ml-[30px] w-full max-w-[826px] bg-[#1A2747] min-h-[456px] h-full rounded-[16px] border-[1px] border-solid border-[#385494] overflow-hidden">
          {menuActive === 'Order History' ? (
            <OrderHistory />
          ) : menuActive === 'Image History' ? (
            <ImageHistory />
          ) : menuActive === 'Favourites' ? (
            <Favourites />
          ) : menuActive === 'My Account' ? (
            <Account />
          ) : (
            <div className="p-10 text-[white]">
              <Empty
                className="!text-[white]"
                description="Not Found"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </div>
          )}
        </div>
        <div className="hidden tabletSM:block w-full">
          <Collapse
            className="dashboard_collapse"
            bordered={false}
            onChange={(key: any) => setActiveKeys(key)}
            defaultActiveKey={['1']}
            expandIcon={({ isActive }) =>
              isActive ? (
                <UpOutlined
                  style={{
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: 'bold',
                  }}
                />
              ) : (
                <DownOutlined style={{ color: 'white', fontSize: '20px' }} />
              )
            }
            expandIconPosition="end"
          >
            {menu?.map((item: any) => {
              let activeKey = activeKeys?.filter((key: any) => {
                if (item.id.toString() == key) {
                  return true;
                } else {
                  return false;
                }
              });

              return (
                <Panel
                  showArrow={item?.id === 5 ? false : true}
                  header={
                    <div
                      key={item.id}
                      className={`flex cursor-pointer items-center justify-start w-full`}
                      onClick={() => {
                        if (item?.id === 5) {
                          localStorage.removeItem('make-anything-user');
                          router.push('/home');
                        }
                      }}
                    >
                      <Image
                        preview={false}
                        src={
                          activeKey[0] == item.id.toString()
                            ? item.whiteIcon
                            : item.grayIcon
                        }
                        alt=""
                        width="24px"
                        height="24px"
                      />
                      <div
                        style={
                          activeKey[0] == item.id.toString()
                            ? { color: '#FAFAFA' }
                            : { color: '#A5B5D9' }
                        }
                        className="text-[20px] font-medium text-[#A5B5D9] pl-5"
                      >
                        {item.title}
                      </div>
                    </div>
                  }
                  key={item.id.toString()}
                >
                  {item.panelData}
                </Panel>
              );
            })}
          </Collapse>
        </div>
      </div>
    </div>
  );
}

export default DashboardDetails;
