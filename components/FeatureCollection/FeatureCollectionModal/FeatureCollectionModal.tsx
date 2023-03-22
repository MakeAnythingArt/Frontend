import { Col, Dropdown, Form, Image, message, Modal, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import AllProductsModal from '../../AllProductsModal/AllProductsModal';
import ButtonShared from '../../Shared/ButtonShared/ButtonShared';
import { CloseOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useMutation, useQuery } from 'react-query';
import { generateImageById } from '../../../services/product';
import { favouriteImage, unFavouriteImage } from '../../../services/favourites';

function FeatureCollectionModal({
  setIsModalOpen,
  isModalOpen,
  ImageSrc,
  className,
  collection,
  isFavoritePage,
  refetch,
}: {
  setIsModalOpen: any;
  isModalOpen: boolean;
  ImageSrc: any;
  className?: string;
  collection?: any;
  isFavoritePage?: any;
  refetch?: any;
}) {
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const [showStroke, setShowStroke] = useState<boolean>(false);
  const [strokeWidth, setStrokewidth] = useState<number>(0);
  const [archived, setArchived] = useState<boolean>(collection?.is_favorited);

  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
    // {
    //   label: 'Send to Builder',
    //   key: '1',
    // },
    {
      label: archived === true ? 'Unfavourite' : 'Favourite',
      onClick: () =>
        archived === false
          ? favMutate(collection?.id)
          : unFavMutate(collection?.id),
      key: '2',
    },
  ];

  const menuProps = {
    items,
  };

  const data = {
    colors: [
      '#EF4444',
      '#F97316',
      '#FACC15',
      '#4ADE80',
      '#2DD4BF',
      '#3B82F6',
      '#6366F1',
      '#EC4899',
      '#F43F5E',
      '#D946EF',
      '#8B5CF6',
      '#0EA5E9',
      '#10B981',
      '#84CC16',
    ],
  };

  const [activeColor, setActiveColor] = useState<string>(data.colors[0]);

  const colorHandler = (color: any) => {
    setActiveColor(color);
    form.setFieldsValue({
      color: activeColor,
    });
    setShowStroke(false);
  };

  const onChange = (e: CheckboxChangeEvent) => {
    setShowStroke(e.target.checked);
  };

  // getting generated Images by id
  const { data: generateImageByIdData, isLoading: generateImageDetailLoading } =
    useQuery(
      ['generate-image-by-id', collection?.id],
      () => generateImageById({ image_id: collection?.id }),
      {
        enabled: !!collection?.id,
      },
    );

  useEffect(() => {
    setArchived(collection?.is_favorited);
  }, [setArchived, collection]);

  return (
    <div>
      <Modal
        className={
          className
            ? className
            : 'modal-svg lg:px-4 lg:flex lg:justify-center lg:items-center topToBottom_productPage'
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        transitionName=""
        width="100%"
        bodyStyle={{ backgroundColor: '#151f38' }}
        style={{
          maxWidth: '1170px',
          borderRadius: '0px',
          minHeight: '751px',
        }}
        closeIcon={
          <CloseOutlined style={{ color: '#FAFAFA', fontSize: '24px' }} />
        }
      >
        <Row className="flex flex-row text-[#ffffff] items-center justify-center lg:flex lg:justify-center lg:items-center">
          <Col sm={24} md={24} lg={12} xxl={12}>
            <div className="bg-[#1A2747]  w-[556px] h-[638px] ml-[20px] rounded-[28px] mt-[20px]  mobile:w-[296px] mobile:h-[358px] lg:flex lg:justify-center lg:items-center lg:flex-col lg:w-full lg:ml-0">
              <div className="flex flex-row justify-between w-full px-[40px] p-[10px]  items-center mt-[20px] ">
                <div className="flex flex-row justify-between items-center text-[#ffffff]">
                  <div className="mr-[10px] w-[60px] h-[63px] mobile:!w-[35] mobile:!h-[38px]">
                    <Image
                      src={'/Assets/Images/logo.svg'}
                      alt=""
                      width={'100%'}
                      preview={false}
                      className="object-cover rounded-[30px] mobile:!rounded-[50%] mobile:!w-[48px] mobile:!h-[48px]"
                    />
                  </div>
                  <p className="text-[18px] font-[700] mt-[15px]">
                    {generateImageByIdData?.data?.prompt}
                  </p>
                </div>
                <Dropdown
                  menu={menuProps}
                  className="cursor-pointer modal-drop-down"
                  placement="bottomRight"
                  overlayClassName="custom_dropdown"
                >
                  <Image
                    src={'/Assets/Images/more.svg'}
                    alt=""
                    preview={false}
                    className="object-cover mobile:!w-[12px]"
                  />
                </Dropdown>
              </div>
              <div className="flex items-center justify-center w-full pt-[10px] mobile:pt-[4px] lg:flex lg:justify-center lg:items-center lg:w-full">
                <div className="w-[512px] h-[512px] !rounded-[24px] pl-[20px] pr-[20px] mobile:!w-[256px] mobile:h-[256px]  mobile:pl-[0px] mobile:pr-[0px] lg:pl-4 lg:p-4 ">
                  <Image
                    src={isFavoritePage ? ImageSrc?.url : ImageSrc}
                    alt=""
                    preview={false}
                    width="100%"
                    height="100%"
                    className="object-cover rounded-[24px] mobile:rounded-[12px]"
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col sm={24} md={24} lg={12} xxl={12}>
            <Spin
              style={{ width: '100%' }}
              spinning={generateImageDetailLoading}
            >
              {generateImageByIdData && (
                <div className="text-[#A5B5D9] flex flex-col pl-[90px] items-center pt-[20px] lg:flex lg:justify-center lg:items-center lg:w-full lg:pl-0 lg:text-center">
                  <div className="flex flex-col w-[85%] lg:w-full">
                    <h3 className="text-[20px]">Prompt</h3>
                    <p className="text-[16px] font-[500] leading-[24px]">
                      {generateImageByIdData?.data?.prompt}
                    </p>
                  </div>
                  <div className="flex flex-col w-[85%] lg:w-full">
                    <h3 className="text-[15px]">Negative Prompt</h3>
                    <p className="text-[12px] leading-[18px]">
                      {generateImageByIdData?.data?.style_negative_prompt}
                    </p>
                  </div>
                  <div className="flex flex-col w-[85%] leading-[21px] lg:w-full">
                    <p className="text-[14px]">Info for nerds:</p>
                    <p className="text-[14px]">
                      Model: {generateImageByIdData?.data?.model}
                    </p>
                    <p className="text-[14px]">
                      Sample: {generateImageByIdData?.data?.step}
                    </p>
                    <p className="text-[14px]">
                      CFG Scale: {generateImageByIdData?.data?.scale}
                    </p>
                    <p className="text-[14px]">
                      Sampler: {generateImageByIdData?.data?.scheduler}
                    </p>
                    <p className="text-[14px]">
                      Seed: {generateImageByIdData?.data?.strength}
                    </p>
                  </div>
                  {/* <div className="flex relative flex-col pt-[10px] w-[85%] lg:w-full lg:flex lg:justify-center lg:items-center">
                <div className="absolute z-50 bottom-[30px] right-0">
                  {showStroke === true && (
                    <>
                      <div className="bg-[white] flex justify-center items-center rounded-[10px] max-w-[340px] py-2 px-4">
                        <Form
                          name="basic"
                          onFinish={onFinish}
                          form={form}
                          autoComplete="off"
                        >
                          <Form.Item name="color">
                            <div className="flex flex-wrap items-center justify-center mt-[8px] lg:justify-center">
                              {data.colors.map((color: any, index: any) => {
                                return (
                                  <div
                                    onClick={() => colorHandler(color)}
                                    style={
                                      activeColor === color
                                        ? {
                                            border: `1px solid ${color}`,
                                            padding: '3px',
                                          }
                                        : {}
                                    }
                                    className={`flex cursor-pointer justify-center items-center mr-[10px] w-[34px] h-[34px] rounded-full`}
                                    key={index}
                                  >
                                    <div
                                      style={{ backgroundColor: color }}
                                      className="w-[26px] h-[26px] rounded-full"
                                    ></div>
                                  </div>
                                );
                              })}
                            </div>
                            <div
                              className="flex items-center mt-2 w-[165px] rounded-[3px] py-1 px-3"
                              style={{ border: '0.621053px solid #E5E7EB' }}
                            >
                              <div className="flex">
                                <div>Stroke Width {strokeWidth}</div>
                              </div>
                              <div className="ml-3 flex flex-col">
                                <UpOutlined
                                  onClick={() =>
                                    setStrokewidth(strokeWidth + 1)
                                  }
                                />
                                {strokeWidth !== 0 ? (
                                  <DownOutlined
                                    onClick={() =>
                                      setStrokewidth(strokeWidth - 1)
                                    }
                                  />
                                ) : (
                                  <DownOutlined disabled={true} />
                                )}
                              </div>
                            </div>
                          </Form.Item>
                        </Form>
                      </div>
                    </>
                  )}
                </div>
                <div
                  className={`flex items-center justify-start w-full mt-[10px] lg:justify-center xs:flex-col`}
                >
                  <div className="mr-[15px] xs:mr-0 xs:mb-0">
                    <Checkbox className="font-normal text-[14px] text-[#A5B5D9] checkbox_all_shopping_cart">
                      Remove Background
                    </Checkbox>
                  </div>
                  <div>
                    <Checkbox
                      onChange={onChange}
                      className="font-normal text-[14px] text-[#A5B5D9] checkbox_all_shopping_cart"
                    >
                      Stroke Options
                    </Checkbox>
                  </div>
                </div>
              </div> */}
                  <div className="flex flex-col w-[90%] mt-[50px] lg:w-full lg:flex lg:justify-center lg:items-center">
                    <div className="w-[318px] ml-[20px] lg:ml-0">
                      <ButtonShared
                        text={'See It On Products'}
                        className={
                          '!rounded-[10px] !w-full !h-[64px] !text-[16px] flex items-center justify-center'
                        }
                        type="primary"
                        style={{ height: '64px' }}
                        clickHandler={() => setIsProductModalOpen(true)}
                      />
                    </div>
                  </div>
                  {isProductModalOpen && setIsProductModalOpen && (
                    <AllProductsModal
                      image_id={collection?.id}
                      isProductModalOpen={isProductModalOpen}
                      setIsProductModalOpen={setIsProductModalOpen}
                    />
                  )}
                </div>
              )}
            </Spin>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default FeatureCollectionModal;
