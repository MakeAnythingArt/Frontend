import { Collapse } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react';

const { Panel } = Collapse;
const flexCenter = 'flex items-center justify-center';

const text = (
  <p className="text-[#A5B5D9] font-normal text-[16px] pl-6 w-[500px] mobile:w-full mobile:p-0">
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
    doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
    veritatis et quasi architecto beatae vitae dicta sunt explicabo.
  </p>
);

function SoceryCollapse() {
  return (
    <div className={`${flexCenter} mt-[120px] std_padding `}>
      <div className={`${flexCenter} std_maxWidth flex-col w-full`}>
        <div
          className="bg-[#1A2747] w-full mt-4 !rounded-[32px]"
          style={{ border: '1px solid #385494' }}
        >
          <div className="p-12 mobile:p-6 w-full">
            <Collapse
              expandIcon={({ isActive }) => (
                <>{isActive ? <MinusOutlined /> : <PlusOutlined />}</>
              )}
              bordered={false}
              defaultActiveKey={['1']}
              className="collapse_faq"
            >
              <Panel header="What is this sorcery?!" key="1">
                {text}
              </Panel>
              <Panel
                header="Does this mean the design is unique...every time?"
                key="2"
              >
                {text}
              </Panel>
              <Panel header="What about the quality of the prints?" key="3">
                {text}
              </Panel>
              <Panel header="Who runs this joint anyway?" key="4">
                {text}
              </Panel>
              <Panel
                header="When can I expect my artwork to be delivered?"
                key="5"
              >
                {text}
              </Panel>
              <Panel
                header="When can I expect my artwork to be delivered?"
                key="6"
              >
                {text}
              </Panel>
            </Collapse>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SoceryCollapse;
