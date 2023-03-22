import { Dropdown, Space } from 'antd';
import React from 'react';
import type { MenuProps } from 'antd';
import { DownOutlined, RightOutlined } from '@ant-design/icons';

function ArtBuilderDropDownStyle({
    dropDownValue,
    setDropDownValue,
    items,
    setInputValue,
}: {
    dropDownValue: any;
    setDropDownValue: any;
    items: any;
    setInputValue: any;
}) {
    const onClick: MenuProps['onClick'] = ({ key }) => {
        setDropDownValue({ ...dropDownValue, value: key });
        // if (inputValue?.length === 0) {
        //     setInputValue(key);
        // } else {
        //     setInputValue(inputValue + ', ' + key);
        // }
        setInputValue(key);
    };

    return (
        <Dropdown
            onOpenChange={(e: any) =>
                setDropDownValue({
                    ...dropDownValue,
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
                    {dropDownValue.value}
                    {dropDownValue.open ? <DownOutlined /> : <RightOutlined />}
                </Space>
            </a>
        </Dropdown>
    );
}

export default ArtBuilderDropDownStyle;
