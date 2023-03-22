import React, { useState } from 'react';
import { ShoppingCartOutlined, CloseOutlined } from '@ant-design/icons';
import ButtonShared from '../ButtonShared/ButtonShared';
import { Badge, Drawer, Dropdown, Image, MenuProps } from 'antd';
import { useRouter } from 'next/router';
import useAuth from '../../../hook/useAuth';
import { getCart } from '../../../services/cart';
import { useQuery } from 'react-query';

const flexCenter = 'flex items-center justify-center';
const flexBetween = 'flex items-center justify-between';
const menuStyles = `${flexCenter} flex-col font-medium cursor-pointer hover:text-[white]`;
const menuItemStyle =
  'text-[#A5B5D9] cursor-pointer font-medium text-[29.9px] mb-[15px]';

function Header({ activePage }: any) {
  const router = useRouter();
  const { authToken } = useAuth();
  const userData = localStorage.getItem('make-anything-user');

  // fetching cart data
  const { data: cartData } = useQuery(['cartData'], () => getCart(), {
    enabled: !!userData,
  });

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const menu = [
    {
      id: 1,
      comp: (
        <div className={menuStyles} onClick={() => router.push('/home')}>
          Home
        </div>
      ),
      routeName: 'home',
    },
    {
      id: 2,
      comp: (
        <div className={menuStyles} onClick={() => router.push('/history')}>
          History
        </div>
      ),
      routeName: 'history',
    },
    {
      id: 3,
      comp: (
        <div className={menuStyles} onClick={() => router.push('/faq')}>
          FAQ
        </div>
      ),
      routeName: 'faq',
    },
    {
      id: 4,
      comp: (
        <div className={menuStyles} onClick={() => router.push('/contact')}>
          Contact
        </div>
      ),
      routeName: 'contact',
    },
    {
      id: 5,
      comp: (
        <div className="relative">
          <ShoppingCartOutlined
            onClick={() => router.push('/shopping-cart')}
            style={{ paddingRight: '20px' }}
            className={`${menuStyles} text-[24px]`}
          />
          {cartData && (
            <div className="absolute top-[-12px] right-10">
              <Badge size="small" count={cartData?.items?.length}>
                <div className="hidden">{cartData?.items?.length}</div>
              </Badge>
            </div>
          )}
        </div>
      ),
      routeName: 'cart',
    },
  ];

  const onClose = () => {
    setModalOpen(false);
  };

  const items: MenuProps['items'] = [
    {
      key: '2',
      label: (
        <div
          onClick={() => {
            router.push('/dashboard');
          }}
        >
          Edit
        </div>
      ),
    },
    {
      key: '1',
      label: (
        <div
          onClick={() => {
            localStorage.removeItem('make-anything-user');
            router.push('/home');
          }}
        >
          Logout
        </div>
      ),
    },
  ];

  return (
    <div
      className={`${flexCenter} std_padding w-full h-[80px] bg-[#111B33] sticky top-0 left-0 z-[99]`}
    >
      <div className="std_maxWidth">
        <div className={`tablet:hidden ${flexBetween} w-full`}>
          <div className="w-[51px]">
            <Image
              width={51}
              height={52}
              src="/Assets/Images/logo.svg"
              alt=""
              className="cursor-pointer"
              onClick={() => router.push('/home')}
              preview={false}
            />
          </div>
          <div className={`${flexCenter} w-full`}>
            <div className="flex items-center justify-end w-full text-[#A5B5D9]">
              {menu.map((item: any, index: any) => {
                return (
                  <div key={item.id}>
                    {activePage ? (
                      <div
                        style={
                          activePage.includes(item.routeName)
                            ? { color: 'white' }
                            : {}
                        }
                        className={`relative ${flexCenter} w-[80px]`}
                      >
                        <div className="w-full">{item.comp}</div>
                        {activePage.includes(item.routeName) && (
                          <div
                            style={
                              index + 1 === menu.length
                                ? { display: 'none' }
                                : {}
                            }
                            className="bg-[white] absolute bottom-[-15px] left-[45%] rounded-full w-[10px] h-[10px]"
                          />
                        )}
                      </div>
                    ) : (
                      <div
                        key={item.id}
                        className={`relative ${flexCenter} w-[80px]`}
                      >
                        <div className="w-full">{item.comp}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {!authToken ? (
              <>
                <div className="w-[219px] pr-[25px]">
                  <ButtonShared
                    text="Log In"
                    type="primary"
                    ghost
                    style={{ fontWeight: 700 }}
                    clickHandler={() => router.push('/login')}
                  />
                </div>
                <div className="w-[219px]">
                  <ButtonShared
                    text="Sign Up"
                    type="primary"
                    style={{ fontWeight: 700 }}
                    clickHandler={() => router.push('/signup')}
                  />
                </div>
              </>
            ) : (
              <Dropdown
                className="layout_dp_dropdown"
                menu={{ items }}
                placement="bottom"
                trigger={['click']}
                overlayClassName="custom_dropdown"
              >
                <div className="relative cursor-pointer">
                  <Image
                    src="/Assets/Images/profile-circle.svg"
                    width={25}
                    height={25}
                    alt="sms"
                    preview={false}
                  />
                </div>
              </Dropdown>
            )}
          </div>
        </div>
        <div className={`desktop:hidden ${flexBetween} w-full`}>
          <Image
            className="cursor-pointer"
            src="/Assets/Images/menu_icon.svg"
            onClick={() => setModalOpen(true)}
            width={24}
            height={24}
            alt="menu"
            preview={false}
          />
          <div className="w-[51px]">
            <Image
              className="cursor-pointer w-[51px]"
              width={51}
              height={52}
              src="/Assets/Images/logo.svg"
              alt=""
              onClick={() => router.push('/home')}
            />
          </div>
          <div className="relative">
            <ShoppingCartOutlined
              style={{ paddingRight: 0 }}
              className={`${flexCenter} flex-col font-medium pr-[30px] cursor-pointer text-[#A5B5D9] text-[28px]`}
              onClick={() => router.push('/shopping-cart')}
            />
            {cartData && (
              <div className="absolute top-[-11px] right-[4px]">
                <Badge size="small" count={cartData?.items?.length}>
                  <div className="hidden">{cartData?.items?.length}</div>
                </Badge>
              </div>
            )}
          </div>
        </div>
        <Drawer
          className="menu_drawer !bg-[#111B33]"
          title={false}
          placement="left"
          onClose={onClose}
          open={modalOpen}
          width="100%"
          headerStyle={{
            borderBottom: 'none',
            padding: '16px 10px',
            margin: '10px 10px',
          }}
          closeIcon={<CloseOutlined className="text-[25px] text-[white]" />}
        >
          <div className={`${flexCenter} flex-col`}>
            <div className="w-[51px]">
              <Image
                className="mb-[30px] cursor-pointer w-[51px]"
                width={51}
                height={52}
                preview={false}
                src="/Assets/Images/logo.svg"
                alt=""
                onClick={() => router.push('/home')}
              />
            </div>
            {authToken && (
              <div className="flex items-center justify-between">
                <Dropdown
                  className="layout_dp_dropdown mt-8"
                  menu={{ items }}
                  placement="bottom"
                  trigger={['click']}
                >
                  <div className="relative cursor-pointer">
                    <Image
                      src="/Assets/Images/profile-circle.svg"
                      width={25}
                      height={25}
                      alt="sms"
                      preview={false}
                    />
                  </div>
                </Dropdown>
                <div className="relative mt-8 ml-2">
                  <ShoppingCartOutlined
                    style={{ paddingRight: 0 }}
                    className={`${flexCenter} flex-col font-medium pr-[30px] cursor-pointer text-[#A5B5D9] text-[28px]`}
                    onClick={() => router.push('/shopping-cart')}
                  />
                  {cartData && (
                    <div className="absolute top-[-11px] right-[4px]">
                      <Badge size="small" count={cartData?.items?.length}>
                        <div className="hidden">{cartData?.items?.length}</div>
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className={`${flexCenter} flex-col mb-[30px] mt-8`}>
              <div
                className={menuItemStyle}
                onClick={() => router.push('/home')}
                style={activePage?.includes('home') ? { color: 'white' } : {}}
              >
                Home
              </div>
              <div
                className={menuItemStyle}
                onClick={() => router.push('/history')}
                style={
                  activePage?.includes('history') ? { color: 'white' } : {}
                }
              >
                History
              </div>
              <div
                className={menuItemStyle}
                onClick={() => router.push('/faq')}
                style={activePage?.includes('faq') ? { color: 'white' } : {}}
              >
                FAQ
              </div>
              <div
                className={menuItemStyle}
                onClick={() => router.push('/contact')}
                style={
                  activePage?.includes('contact') ? { color: 'white' } : {}
                }
              >
                Contact
              </div>
            </div>
            {!authToken && (
              <div className={`${flexCenter} flex-col`}>
                <div className="w-[219px] mb-[15px]">
                  <ButtonShared
                    text="Log In"
                    type="primary"
                    ghost
                    style={{ fontWeight: 700 }}
                    clickHandler={() => router.push('/login')}
                  />
                </div>
                <div className="w-[219px]">
                  <ButtonShared
                    text="Sign Up"
                    type="primary"
                    style={{ fontWeight: 700 }}
                    clickHandler={() => router.push('/signup')}
                  />
                </div>
              </div>
            )}
          </div>
        </Drawer>
      </div>
    </div>
  );
}

export default Header;
