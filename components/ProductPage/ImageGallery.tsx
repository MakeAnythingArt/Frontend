import { Dropdown, Image, message } from 'antd';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { bookmarkProduct, removeBookmarkProduct } from '../../services/cart';

const flexCenter = 'flex items-center justify-center';
const smallImgStyle =
  'bg-[#10192F] rounded-[16px] mr-[10px] w-[120px] h-full max-h-[106px] p-2 cursor-pointer lg:w-[78px] lg:h-[69px] xs:w-[64px] xs:h-[60px]';

function ImageGallery({
  images,
  selectedVariant,
  addToCardHandler,
  product_id,
  setBlueprint,
  blueprint,
}: {
  images: any;
  selectedVariant: any;
  addToCardHandler: any;
  product_id?: any;
  setBlueprint?: any;
  blueprint?: any;
}) {
  const [activeImage, setActiveImage] = useState<any>(
    images && {
      src: images[0]?.src,
    },
  );

  // bookmark
  const { mutate: bookmarking, isLoading: bookmarkLoading } = useMutation(
    (data: any) => bookmarkProduct({ data }),
    {
      onSuccess: () => {
        setBlueprint({
          ...blueprint,
          variants: blueprint?.variants.map((variant: any) => {
            if (variant.id === selectedVariant.id) {
              const tempVariant = variant;
              tempVariant.is_bookmark = true;
              return tempVariant;
            } else {
              return variant;
            }
          }),
        });
      },
      onError: (err: any) => {
        if (err?.response?.status === 500) {
          message.error('Internal Server Error');
        } else {
          message.error(err?.response?.data);
        }
      },
    },
  );

  // remove bookmark single product
  const { mutate: removingBookmark, isLoading: removeBookmarkLoading } =
    useMutation((data: any) => removeBookmarkProduct({ data }), {
      onSuccess: () => {
        setBlueprint({
          ...blueprint,
          variants: blueprint?.variants.map((variant: any) => {
            if (variant.id === selectedVariant.id) {
              const tempVariant = variant;
              tempVariant.is_bookmark = false;
              return tempVariant;
            } else {
              return variant;
            }
          }),
        });
      },
    });

  const items = [
    {
      label: 'Add to Cart',
      key: '1',
      onClick: () => addToCardHandler(),
    },
    // {
    //   label: 'Send to Builder',
    //   key: '2',
    // },
    {
      label: selectedVariant.is_bookmark ? (
        <div
          onClick={() =>
            removingBookmark({
              items: [
                {
                  product_id,
                  variant_id: selectedVariant.id,
                },
              ],
              is_empty: false,
            })
          }
        >
          Remove Bookmark
        </div>
      ) : (
        <div
          onClick={() =>
            bookmarking({
              items: [
                {
                  product_id,
                  variant_id: selectedVariant.id,
                },
              ],
            })
          }
        >
          Bookmark
        </div>
      ),
      key: '3',
    },
  ];

  const menuProps = {
    items,
  };

  return (
    <div className="w-[525px] lg:w-[343px] overflow-hidden">
      <div
        className={`${flexCenter} p-6 bg-[#10192F] rounded-[24px] h-[536px] w-[525px] relative lg:h-[350px] lg:w-[343px] xs:w-[294px] xs:h-[320px]`}
      >
        <Image
          className="object-cover h-[465px] lg:h-[303px] rounded-[24px]"
          preview={false}
          src={activeImage?.src}
          width="100%"
          height="100%"
          alt=""
        />
        <div className="absolute top-[30px] right-[30px]">
          <Dropdown
            menu={menuProps}
            className="cursor-pointer modal-drop-down "
            placement="bottomRight"
            overlayClassName="custom_dropdown"
          >
            <div className="min-w-[30px] w-fit p-1 rounded-full bg-[#151f38]">
              <Image
                src={'/Assets/Images/more.svg'}
                alt=""
                preview={false}
                className=" object-cover  mobile:!w-[12px]"
              />
            </div>
          </Dropdown>
        </div>
      </div>
      <div
        className={`w-full mt-[20px] h-[20%] overflow-x-scroll flex items-center justify-left`}
      >
        {images &&
          images?.map((image: any, index: number) => {
            return (
              <div
                onClick={() => setActiveImage({ src: image?.src })}
                key={index}
                className={`${flexCenter} ${smallImgStyle}`}
                style={
                  activeImage.src === image?.src
                    ? { border: '2px solid white', marginBottom: '5px' }
                    : { marginBottom: '5px' }
                }
              >
                <Image
                  className="object-cover rounded-[16px] min-h-[90px] lg:min-h-[49px] min-w-[86px] lg:min-w-[61px] lg:w-[78px] max-h-[100px]"
                  preview={false}
                  src={image?.src}
                  width="100%"
                  height="100%"
                  alt=""
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ImageGallery;
