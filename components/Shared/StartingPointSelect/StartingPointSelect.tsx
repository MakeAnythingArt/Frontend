import { Select } from 'antd';
import React from 'react';

function StartingPointSelect({
  startingPointOptions,
  onChange,
  defaultValue,
  placeholder,
}: {
  startingPointOptions: any;
  onChange?: any;
  defaultValue?: any;
  placeholder?: any;
}) {
  return (
    <Select
      className="h-full w-full !min-w-[222px] select_fix_height text-[white]"
      popupClassName="startMaking_dropdown"
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
      style={{
        width: 225,
      }}
      options={startingPointOptions}
    />
  );
}

export default StartingPointSelect;
