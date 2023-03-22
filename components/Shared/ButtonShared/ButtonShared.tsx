import React, { useEffect, useRef } from 'react';
import { Button } from 'antd';

function ButtonShared({
  text,
  clickHandler,
  icon,
  type,
  htmlType,
  danger,
  ghost,
  style,
  disabled,
  postIcon,
  className,
}: {
  text: any;
  type?: any;
  icon?: any;
  clickHandler?: any;
  htmlType?: any;
  danger?: boolean;
  ghost?: boolean;
  style?: any;
  disabled?: boolean;
  postIcon?: any;
  className?: any;
}) {
  const buttonRef = useRef<any>(null);

  useEffect(() => {
    if (buttonRef.current.classList.contains('ant-btn-background-ghost')) {
      buttonRef.current.addEventListener('mouseenter', () => {
        buttonRef.current.classList.remove('ant-btn-background-ghost');
      });
      buttonRef.current.addEventListener('mouseleave', () => {
        buttonRef.current.classList.add('ant-btn-background-ghost');
      });
    }
  });

  return (
    <>
      <Button
        type={type}
        icon={icon}
        onClick={clickHandler}
        htmlType={htmlType}
        className={
          className
            ? className
            : '!rounded-[10px] !w-full !h-[48px] !text-[16px] flex items-center justify-center'
        }
        danger={danger}
        ghost={ghost}
        ref={buttonRef}
        style={style}
        disabled={disabled}
      >
        {text} {postIcon && postIcon}
      </Button>
    </>
  );
}

export default ButtonShared;
