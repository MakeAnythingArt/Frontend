/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { Image, message, Spin } from 'antd';
import EditImage from '../../Shared/EditImage/EditImage';
import { useWindowSize } from '../../../hook/windowDimensions';
import { useMutation, useQuery } from 'react-query';
import { uploadFile } from '../../../services/dashboard';
import { getFeaturedCollections } from '../../../services/collections';
import _ from 'lodash';

const flexCenter = 'flex items-center justify-center';

function DashboardBanner() {
  const { width } = useWindowSize();
  const [coverFile, setCoverFile] = useState<any>({ file: null });
  const [coverImage, setCoverImage] = useState<any>({ url: null });
  const [dpImageFile, setDpImageFile] = useState<any>({ file: null });
  const [dpImage, setDpImage] = useState<any>({ url: null });

  const authData: any = localStorage.getItem('make-anything-user');
  const parsedAuthData = JSON.parse(authData);

  // getting collections
  const { isLoading: gettingCover } = useQuery(
    ['featured-collection'],
    () => getFeaturedCollections(),
    {
      onSuccess: (response: any) => {
        const randomizedArrayOne = _.shuffle(response?.data);
        const randomizeCollection = _.shuffle(randomizedArrayOne[0].images);
        setCoverImage({ url: randomizeCollection[0].url });
      },
      enabled: parsedAuthData && parsedAuthData?.user?.cover === null,
    },
  );

  // uploading and updating dp profile
  const { mutate: dpImageMutate } = useMutation(
    (data: any) => uploadFile({ data }),
    {
      onSuccess: (response: any) => {
        if (response.key_name === 'avatar') {
          parsedAuthData.user.avatar = response.avatar;
        } else if (response.key_name === 'cover') {
          parsedAuthData.user.cover = response.cover;
        }
        localStorage.setItem(
          'make-anything-user',
          JSON.stringify(parsedAuthData),
        );
      },
      onError: (err: any) => {
        message.error(err.response.data);
      },
    },
  );

  // update dp image
  useEffect(() => {
    if (dpImageFile.file) {
      dpImageMutate({
        file: dpImageFile.file,
        key_name: 'avatar',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dpImageFile]);

  // update cover photo
  useEffect(() => {
    if (coverFile.file) {
      dpImageMutate({
        file: coverFile.file,
        key_name: 'cover',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coverFile]);

  useEffect(() => {
    setDpImage({ url: parsedAuthData?.user?.avatar });
    setCoverImage({ url: parsedAuthData?.user?.cover });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsedAuthData?.user?.avatar, parsedAuthData?.user?.cover]);

  return (
    <div className={`${flexCenter} std_padding std_paddingTop`}>
      <div className={`${flexCenter} flex-col std_maxWidth`}>
        <div className="w-full min-h-[359px] tabletSM:min-h-[515px] h-full bg-[#1A2747] rounded-tr-[20px] rounded-tl-[20px]">
          <div className="w-full h-[210px] tabletSM:h-[299px] relative cover_photo_wrapper">
            <Spin spinning={gettingCover}>
              <EditImage
                setImage={setCoverImage}
                image={coverImage}
                setImageFile={setCoverFile}
                editIcon={
                  <div
                    className={`${flexCenter} z-[10] cursor-pointer absolute top-[165px] right-[16px] w-[28.6px] h-[28.6px] rounded-full bg-[#344267] tabletSM:top-[254px] tabletSM:right-[12px]`}
                  >
                    <div className={`${flexCenter} w-[11.05px] h-[11.05px]`}>
                      <img
                        className="object-cover"
                        width="100%"
                        height="100%"
                        src="/Assets/Images/edit_icon.svg"
                        alt="edit"
                      />
                    </div>
                  </div>
                }
                height={width > 768 ? '210px' : '299px'}
              />
            </Spin>
            <div className="h-full w-full absolute top-0 left-0">
              <div className="relative">
                <Image
                  className={`${flexCenter} rounded-tl-[20px] rounded-tr-[20px] absolute top-0 right-0 w-[28.6px] h-[28.6px] bg-[#344267] tabletSM:top-0 tabletSM:right-0`}
                  preview={false}
                  height={width > 768 ? '210px' : '299px'}
                  width={'100%'}
                  src={coverImage.url}
                  style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                  }}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div
            className={`flex translate-y-[-92px] items-start justify-center h-[238px] w-full flex-col pl-[20px] tabletSM:pl-0 tabletSM:items-center tabletSM:h-[216px]`}
          >
            <div className="w-[180px] dashboard_userImg relative h-[180px] rounded-full border-solid border-[2px] border-[white] tabletSM:w-[117px] tabletSM:h-[117px] cover_photo_wrapper">
              <EditImage
                setImage={setDpImage}
                image={dpImage}
                setImageFile={setDpImageFile}
                editIcon={
                  <div
                    className={`${flexCenter} z-[10] cursor-pointer absolute top-[138px] right-[16px] w-[28.6px] h-[28.6px] rounded-full bg-[#344267] tabletSM:top-[84px] tabletSM:right-[7px]`}
                  >
                    <div className={`${flexCenter} w-[11.05px] h-[11.05px]`}>
                      <img
                        className="object-cover"
                        width="100%"
                        height="100%"
                        src="/Assets/Images/edit_icon.svg"
                        alt="edit"
                      />
                    </div>
                  </div>
                }
              />
              <div className="h-full w-full absolute top-0 left-0">
                <div className="relative">
                  <Image
                    className="object-cover rounded-full dp_image"
                    preview={false}
                    width="100%"
                    height="176px"
                    src={dpImage.url}
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                      backgroundColor: '#111B33',
                    }}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="flex pl-[200px] items-start justify-center flex-col tabletSM:pl-0 tabletSM:translate-y-[50px] tabletSM:items-center">
              <div className="text-[white] font-normal text-[18px]">
                Hello !
              </div>
              <div className="text-[white] text-center pt-[10px] font-semibold text-[24px]">
                {parsedAuthData?.user?.full_name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardBanner;
