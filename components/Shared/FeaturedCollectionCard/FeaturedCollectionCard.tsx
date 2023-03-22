import { Dropdown, Image, message } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { favouriteImage, unFavouriteImage } from '../../../services/favourites';
import FeatureCollectionModal from '../../FeatureCollection/FeatureCollectionModal/FeatureCollectionModal';
import ButtonShared from '../ButtonShared/ButtonShared';
import CardFavouriteArchieve from '../CardFavouriteArchieve/CardFavouriteArchieve';

function FeaturedCollectionCard({
  data,
  refetch,
}: {
  data: any;
  refetch?: any;
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [archived, setArchived] = useState<boolean>(data?.is_favorited);
  const router = useRouter();

  const cardRef: any = useRef(null);
  const buttonRef: any = useRef(null);

  useEffect(() => {
    cardRef.current.addEventListener('mouseenter', () => {
      buttonRef.current.style.display = 'flex';
    });
    cardRef.current.addEventListener('mouseleave', () => {
      buttonRef.current.style.display = 'none';
    });
  });

  //Favourite the image
  const { mutate: favMutate } = useMutation(
    (id: any) => favouriteImage({ image_id: id }),
    {
      onSuccess: () => {
        message.success('Artwork saved!');
        refetch();
      },
      onError: (err: any) => {
        message.error(err?.response?.data);
      },
    },
  );

  //Unfavourite the image
  const { mutate: unFavMutate } = useMutation(
    (id: any) => unFavouriteImage({ image_id: id }),
    {
      onSuccess: () => {
        message.success('Artwork unsaved!');
        refetch();
      },
      onError: (err: any) => {
        message.error(err?.response?.data);
      },
    },
  );

  const items = [
    {
      label: 'See Details',
      onClick: () => setIsModalOpen(true),
      key: '1',
    },
    // {
    //   label: 'Send to Builder',
    //   key: '2',
    //   onClick: () => router.push({
    //     pathname: '/home/start-making/build-your-own',
    //     query: {
    //       imageId: data?.id
    //     }
    //   })
    // },
    {
      label: archived === true ? 'Unfavourite' : 'Favourite',
      onClick: () =>
        archived === false ? favMutate(data?.id) : unFavMutate(data?.id),
      key: '3',
    },
  ];

  useEffect(() => {
    setArchived(data?.is_favorited);
  }, [setArchived, data]);

  return (
    <div className="flex items-center justify-center flex-wrap">
      <div
        key={data?.id}
        className="bg-[#1A2747] cursor-pointer  w-[330px] h-[366px] ml-[20px] rounded-[28px] mt-[20px] tabletSM:w-[212px] tabletSM:h-[234px] tabletSM:ml-[10px] tabletSM:rounded-[16px] mobile:!w-[108px] mobile:!h-[130px] mobile:!ml-[5px] mobile:!rounded-[9px] "
      >
        <div className="flex flex-row justify-around items-center mt-[20px] tabletSM:mt-[10px] mobile:!mt-[5px]">
          <div className="flex items-center justify-start">
            <Image
              src="/Assets/Images/logo.svg"
              alt=""
              preview={false}
              className="object-cover !rounded-[28px] mobile:!w-[14px] mobile:!h-[14px] tabletSM:w-[38px]"
            />
            <p className="text-[14px] !capitalize font-bold mt-[15px] tabletSM:mt-[10px] tabletSM:text-[10px] ml-[8px] mobile:!text-[4px] text-[white]">
              {data?.prompt}
            </p>
          </div>
          <div>
            <Dropdown
              menu={{ items }}
              className="featured-drop-down"
              placement="bottomRight"
              overlayClassName="custom_dropdown"
            >
              <Image
                src="/Assets/Images/more.svg"
                alt=""
                preview={false}
                className="object-cover mobile:!w-[12px]"
              />
            </Dropdown>
          </div>
        </div>
        <div className="flex items-center justify-center w-full pt-[10px] mobile:pt-[4px]">
          <div
            ref={cardRef}
            className="w-[287px] h-[228px] !rounded-[12px]   mobile:!h-[75px]  mobile:!w-[94px] mobile:!rounded-[4px] tabletSM:w-[190px] tabletSM:h-[134px] relative"
          >
            <Image
              src={data?.url}
              alt=""
              preview={false}
              width="100%"
              height="100%"
              className="object-cover rounded-[12px] mobile:rounded-[4px]"
            />
            {setIsModalOpen && (
              <div
                style={{ display: 'none' }}
                ref={buttonRef}
                className="absolute top-0 left-0 box_inner_shadow w-[287px] h-[228px] !rounded-[12px]   mobile:!h-[75px]  mobile:!w-[94px] mobile:!rounded-[4px] tabletSM:w-[190px] tabletSM:h-[134px] flex items-center justify-center"
              >
                <div className=" w-[160px] tabletSM:w-[100px] h-full flex items-center justify-center">
                  <ButtonShared
                    clickHandler={() => setIsModalOpen(true)}
                    className="'!rounded-[10px] !w-full !h-[48px] !text-[16px] flex items-center justify-center tabletSM:!text-[12px] mobile:!h-[30px] mobile:!w-[75px]"
                    text="See Details"
                    type="primary"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between items-center pt-[20px] pl-[20px] pr-[20px] tabletSM:pl-[15px] tabletSM:pr-[15px] mobile:!pt-[5px] tabletSM:pt-[5px]">
          <div>
            {/* <Image
              src="/Assets/Images/brush.svg"
              alt=""
              preview={false}
              className="tabletSM:w-[16px] tabletSM:h-[16px] mobile:!h-[7px] mobile:!w-[7px]"
              onClick={() => router.push({
                pathname: '/home/start-making/build-your-own',
                query: {
                  imageId: data?.id
                }
              })}
            /> */}
          </div>
          <div className="flex flex-row items-center !justify-between !text-center">
            <p className="text-[21px] mb-0 tabletSM:text-[16px]  mobile:!text-[8px] font-bold text-[white]">
              {data?.total_favorites}
            </p>
            <div className="ml-2">
              <CardFavouriteArchieve card={data} refetch={refetch} />
            </div>
          </div>
        </div>
      </div>
      {setIsModalOpen && isModalOpen && (
        <FeatureCollectionModal
          ImageSrc={data?.url}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          collection={data}
          refetch={refetch}
        />
      )}
    </div>
  );
}

export default FeaturedCollectionCard;
