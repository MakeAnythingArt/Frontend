/* eslint-disable @next/next/no-img-element */
import { message, Upload } from 'antd';
import React from 'react';

const { Dragger } = Upload;

// fileId is temporary optional
function EditImage({
  img,
  fileId,
  height,
  className,
  editIcon,
  image,
  setImage,
  setImageFile,
}: {
  img?: string;
  fileId?: string;
  height?: any;
  className?: any;
  editIcon?: any;
  image?: any;
  setImage?: any;
  setImageFile?: any;
}) {
  const props = {
    customRequest: (val: any) => {
      setImage({ url: URL.createObjectURL(val.file) });
      setImageFile({ file: val.file });
    },
    onDrop(e: any) {
      message.warning(e.dataTransfer.files);
    },
  };

  return (
    <Dragger
      {...props}
      showUploadList={false}
      className="!w-full"
      style={{ width: '100%', height: height }}
    >
      <div className="relative h-full w-full">{editIcon && editIcon}</div>
    </Dragger>
  );
}

export default EditImage;
