import { Collapse } from 'antd';
import React from 'react';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const flexCenter = 'flex items-center justify-center';

const data = [
  {
    id: 1,
    heading: 'How Does it work?',
    text: `Text-to-image AI is like a magical way of turning words into pictures! It's a type of artificial intelligence that allows computers to understand and interpret natural language, and then generate corresponding images from that language. It's a magical way of turning words into images, and it can be used to automatically generate visuals from written descriptions.`,
  },
  {
    id: 2,
    heading: 'Stage 1: You Create Art',
    text: `Text-to-image AI is like a magical way of turning words into pictures! It's a type of artificial intelligence that allows computers to understand and interpret natural language, and then generate corresponding images from that language. It's a magical way of turning words into images, and it can be used to automatically generate visuals from written descriptions.`,
  },
  {
    id: 3,
    heading: 'Stage 2: Upscaling',
    text: `Text-to-image AI is like a magical way of turning words into pictures! It's a type of artificial intelligence that allows computers to understand and interpret natural language, and then generate corresponding images from that language. It's a magical way of turning words into images, and it can be used to automatically generate visuals from written descriptions.`,
  },
  {
    id: 4,
    heading: 'Stage 3: Printing',
    text: `Text-to-image AI is like a magical way of turning words into pictures! It's a type of artificial intelligence that allows computers to understand and interpret natural language, and then generate corresponding images from that language. It's a magical way of turning words into images, and it can be used to automatically generate visuals from written descriptions.`,
  },
  {
    id: 5,
    heading: 'Stage 4: Shipping',
    text: `Text-to-image AI is like a magical way of turning words into pictures! It's a type of artificial intelligence that allows computers to understand and interpret natural language, and then generate corresponding images from that language. It's a magical way of turning words into images, and it can be used to automatically generate visuals from written descriptions.`,
  },
  {
    id: 6,
    heading: 'Collect Artwork!',
    text: `Text-to-image AI is like a magical way of turning words into pictures! It's a type of artificial intelligence that allows computers to understand and interpret natural language, and then generate corresponding images from that language. It's a magical way of turning words into images, and it can be used to automatically generate visuals from written descriptions.`,
  },
];

function HomeCollapse() {
  return (
    <div className={`${flexCenter} std_padding std_paddingTop`}>
      <div className="std_maxWidth">
        <Collapse
          className="home_collapse"
          bordered={false}
          style={{
            backgroundColor: '#1A2747',
            border: '1px solid #385494',
            borderRadius: '32px',
          }}
          defaultActiveKey={['1']}
          expandIcon={({ isActive }) =>
            isActive ? (
              <MinusOutlined
                style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}
              />
            ) : (
              <PlusOutlined style={{ color: 'white', fontSize: '20px' }} />
            )
          }
        >
          {data.map((item: any) => {
            return (
              <Panel
                header={
                  <div className="text-[white] font-semibold text-[20px]">
                    {item.heading}
                  </div>
                }
                key={item.id.toString()}
              >
                <p className="pl-[59px] mobile:!pl-[39px] text-[#A5B5D9] text-[16px] font-normal">
                  {item.text}
                </p>
              </Panel>
            );
          })}
        </Collapse>
      </div>
    </div>
  );
}

export default HomeCollapse;
