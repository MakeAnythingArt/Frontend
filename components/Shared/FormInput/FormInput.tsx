import { Input } from 'antd';
import React from 'react';

function FormInput({
  placeholderText,
  prefix,
  onChange,
  type = 'text',
  value,
  autoComplete,
  disabled,
}: {
  placeholderText: string;
  prefix?: any;
  type?: string;
  onChange?: any;
  value?: string;
  autoComplete?: string;
  disabled?: any;
}) {
  return (
    <>
      <Input
        disabled={disabled}
        prefix={prefix}
        style={{
          height: '56px',
          background: 'transparent',
          color: '#A5B5D9',
          borderColor: '#385494',
        }}
        className="w-full startMaking_input"
        type={type}
        placeholder={placeholderText}
        onChange={onChange}
        value={value}
        autoComplete={autoComplete}
      />
    </>
  );
}

export default FormInput;
