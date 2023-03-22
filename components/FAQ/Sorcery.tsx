import { Col, Image, Row } from 'antd';
import React from 'react';

const flexCenter = 'flex items-center justify-center';

function Sorcery() {
  return (
    <div className={`${flexCenter} bg-[#1A2747] mt-[120px] std_padding `}>
      <div className={`${flexCenter}  flex-col w-full`}>
        <div className="text-[40px] p-14 text-[#FAFAFA] font-semibold not-italic uppercase flex text-center items-center justify-center mobile:text-[24px]">
          What is This Sorcery?
        </div>
        <div className="mb-[110px]">
          <Row gutter={[8, 8]}>
            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
              <div className="flex justify-center items-center">
                <div className="max-w-[170px] w-full h-[195px] mobile:w-[105px] mobile:h-[122px] object-cover rounded-[22px]">
                  <Image
                    className="object-cover rounded-[22px] cursor-pointer"
                    preview={false}
                    alt=""
                    height={'100%'}
                    width={'100%'}
                    src="Assets/Images/Suns.svg"
                  />
                </div>
                <div>
                  <div>
                    <div className="max-w-[210px] w-full h-[130px] mobile:w-[131px] mobile:h-[81px] object-cover rounded-[22px] ml-6">
                      <Image
                        className="object-cover rounded-[22px] cursor-pointer"
                        preview={false}
                        alt=""
                        height={'100%'}
                        width={'100%'}
                        src="Assets/Images/cartoons.svg"
                      />
                    </div>
                    <div className="max-w-[210px] w-full h-[185px] mobile:w-[131px] mobile:h-[115px] object-cover rounded-[22px] ml-6 mt-6">
                      <Image
                        className="object-cover rounded-[22px] cursor-pointer"
                        preview={false}
                        alt=""
                        height={'100%'}
                        width={'100%'}
                        src="Assets/Images/mushroom.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col
              xxl={12}
              xl={12}
              lg={12}
              md={24}
              sm={24}
              xs={24}
              className="!px-8 !mt-[35px]"
            >
              <div className="!text-[16px] text-[#A5B5D9] mobile:text-center font-normal">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet,.
                <br />
                <br />
                Sed quia non numquam eius modi tempora incidunt ut labore et
                dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
                veniam, quis nostrum exercitationem ullam corporis suscipit
                laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
                autem vel eum iure reprehenderit qui in ea voluptate velit esse
                quam nihil molestiae consequatur.
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Sorcery;
