import { DownOutlined, RightOutlined } from '@ant-design/icons';
import { Checkbox, Col, Dropdown, Row, Slider, Space } from 'antd';
import React, { useState } from 'react';
import ButtonShared from '../ButtonShared/ButtonShared';
import InputShared from '../InputShared/InputShared';
import {
  styleDropDownItems,
  adjectiveDropDownItems,
  artistDropDownItems,
  items,
} from '../../../services/SelectOptions';
import type { MenuProps } from 'antd';
import ArtBuilderDropDown from '../ArtBuilderDropDown/ArtBuilderDropDown';
import { useRouter } from 'next/router';
import ArtBuilderDropDownStyle from '../ArtBuilderDropDownStyle/ArtBuilderDropDownStyle';

function ArtBuilder({
  inputValue,
  setInputValue,
}: {
  inputValue: any;
  setInputValue: any;
}) {
  const router = useRouter();
  const [styleValue, setStyleValue] = useState<any>();
  const [negativePrompt, setNegativePrompt] = useState<any>();
  const [dropDownStyle, setDropDownStyle] = useState<any>({
    value: 'Choose a Style',
    open: false,
  });
  const [dropDownAdjective, setDropDownAdjective] = useState<any>({
    value: 'Select Adjective',
    open: false,
  });
  const [dropDownSubject, setDropDownSubject] = useState<any>({
    value: 'Select Subject',
    open: false,
  });
  const [dropDownArist, setDropDownArist] = useState<any>({
    value: 'Select an Arist',
    open: false,
  });

  const onClick: MenuProps['onClick'] = ({ key }) => {
    setDropDownSubject({ ...dropDownSubject, value: key });
    if (inputValue.length === 0) {
      setInputValue(key);
    } else {
      setInputValue(inputValue + ', ' + key);
    }
  };

  const marks = {
    0: {
      style: {
        color: '#fafafa',
      },
      label: <strong className="mobile:text-[10px]">Fantasy</strong>,
    },
    25: {
      style: {
        color: '#fafafa',
      },
      label: <strong className="mobile:text-[10px]">Drawing</strong>,
    },
    50: {
      style: {
        color: '#fafafa',
      },
      label: <strong className="mobile:text-[10px]">Photo-Real</strong>,
    },
    75: {
      style: {
        color: '#fafafa',
      },
      label: <strong className="mobile:text-[10px]">Realistic 3D</strong>,
    },
    100: {
      style: {
        color: '#fafafa',
      },
      label: <strong className="mobile:text-[10px]">Surreal</strong>,
    },
  };

  const checkboxData = [
    { name: 'Captivating' },
    { name: 'Dynamic' },
    { name: 'Dazzling' },
    { name: 'Futuristic' },
    { name: 'Alien' },
    { name: 'Vivid colors' },
    { name: '4K' },
    { name: 'Masterpiece' },
    { name: 'Highly Detailed' },
    { name: 'Intricate' },
    { name: 'Cinematic' },
    { name: 'Studio Quality' },
    { name: 'Sharp Focus' },
    { name: 'Crisp' },
    { name: 'Professional' },
    { name: 'Deph of field' },
    { name: 'Great Composition' },
    { name: 'Insanely Detailed' },
    { name: 'Elegant' },
    { name: 'Cinemaic Lighting' },
    { name: 'Volumetric Lighting' },
    { name: 'Dramatic' },
  ];

  return (
    <div>
      {/* Starting Making the art builder  */}
      <div className="std_maxWidth">
        <div className="bg-[#1A2747] w-full rounded-[32px] px-[90px] mobile:px-[45px]">
          <div className="font-bold text-[24px] mobile:text-[20px] text-[#fafafa] underline flex justify-center items-center py-[50px]">
            Art Builder
          </div>
          <Row
            gutter={[8, 8]}
            className="mobile:flex mobile:justify-center mobile:items-center"
          >
            <Col
              xxl={6}
              xl={8}
              lg={12}
              md={12}
              sm={24}
              className="flex justify-center items-center mt-2"
            >
              <ArtBuilderDropDownStyle
                setInputValue={setStyleValue}
                setDropDownValue={setDropDownStyle}
                dropDownValue={dropDownStyle}
                items={styleDropDownItems}
              />
            </Col>
            <Col
              xxl={6}
              xl={8}
              lg={12}
              md={12}
              sm={24}
              className="flex justify-center items-center mt-2"
            >
              <ArtBuilderDropDown
                inputValue={inputValue}
                setInputValue={setInputValue}
                setDropDownValue={setDropDownAdjective}
                dropDownValue={dropDownAdjective}
                items={adjectiveDropDownItems}
              />
            </Col>
            <Col
              xxl={6}
              xl={8}
              lg={12}
              md={12}
              sm={24}
              className="flex justify-center items-center mt-2"
            >
              <Dropdown
                onOpenChange={(e: any) =>
                  setDropDownSubject({
                    ...dropDownSubject,
                    open: e,
                  })
                }
                overlayClassName="dropDown_subject_overlay"
                overlayStyle={{
                  width: '220px',
                  background: '#1A2747',
                  borderRadius: '8px',
                  border: '1px solid white',
                  minHeight: '200px',
                }}
                className={`flex items-center justify-start px-[10px] h-[56px] w-[220px] dropDown_subject border-solid border-[white] border-[1px] bg-[#1A2747] !text-[#fff] rounded-[8px]`}
                menu={{ items, onClick }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space className="flex items-center justify-between w-full">
                    {dropDownSubject.value}
                    {dropDownSubject.open ? (
                      <DownOutlined />
                    ) : (
                      <RightOutlined />
                    )}
                  </Space>
                </a>
              </Dropdown>
            </Col>
            <Col
              xxl={6}
              xl={8}
              lg={12}
              md={12}
              sm={24}
              className="flex justify-center items-center mt-2"
            >
              <ArtBuilderDropDown
                inputValue={inputValue}
                setInputValue={setInputValue}
                setDropDownValue={setDropDownArist}
                dropDownValue={dropDownArist}
                items={artistDropDownItems}
              />
            </Col>
          </Row>
          <div className="font-bold text-[24px] text-[#fafafa] mobile:text-[20px] flex justify-center items-center py-[40px]">
            Realism Slider
          </div>
          <div>
            <Slider
              marks={marks}
              step={null}
              defaultValue={25}
              trackStyle={{ backgroundColor: '#1373FF' }}
              handleStyle={{ backgroundColor: '#fff' }}
              className="slider_range"
              tooltip={{ formatter: null }}
            />
          </div>
          <div className="font-bold text-[24px] mobile:text-[20px] underline text-[#fafafa] flex justify-center items-center py-[40px]">
            Add Modifiers
          </div>
          <div className="flex items-center flex-wrap mobile:w-full mobile:justify-center">
            {checkboxData?.map((val: any, index: any) => {
              return (
                <div className="mb-3" key={index}>
                  <Checkbox
                    onChange={(e: any) =>
                      e.target.checked === true
                        ? setInputValue(inputValue + ', ' + val?.name)
                        : setInputValue(
                            inputValue.replace(`, ${val?.name}`, ''),
                          )
                    }
                    className="checkbox_art_builder"
                  >
                    <span className="text-[16px] text-[#fafafa]">
                      {val?.name}
                    </span>
                  </Checkbox>
                </div>
              );
            })}
          </div>
          <div className="py-[40px] w-full flex items-center justify-between mobile:flex-col ">
            <InputShared
              value={negativePrompt}
              onChange={(e: any) => setNegativePrompt(e.target.value)}
              placeholderText="What DON’T you want to see? This is called a negative prompt."
            />
            <div className="w-[220px] ml-4 mobile:w-full mobile:mt-3 mobile:ml-0">
              <ButtonShared
                clickHandler={() =>
                  router.push({
                    pathname: '/home/start-making/build-your-own/help-craft',
                    query: {
                      style: styleValue,
                      prompt: inputValue,
                      negative_prompt: negativePrompt,
                    },
                  })
                }
                text="Generate Images"
                ghost
                type="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtBuilder;
