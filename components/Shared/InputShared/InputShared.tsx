import { Input } from 'antd';
import React from 'react';

function InputShared({
  placeholderText,
  value,
  onChange,
  disabled
}: {
  placeholderText?: string;
  value?: any;
  onChange?: any;
  disabled?: boolean
}) {
  return (
    <Input
      onChange={onChange}
      style={{
        height: '56px',
        background: 'transparent',
        color: '#A5B5D9',
        borderColor: '#A5B5D9',
      }}
      className="w-full startMaking_input"
      type="text"
      placeholder={placeholderText}
      value={value}
      disabled={disabled}
    />
  );
}

export default InputShared;
