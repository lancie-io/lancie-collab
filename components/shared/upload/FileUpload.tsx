import React from 'react';
import { useUpload } from './UploadProvider';

export const FileUploadTrigger = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { uploadFile } = useUpload();

  const triggerUpload = (event: any) => {
    console.log('triggerUpload');
    event.stopPropagation();
    event.preventDefault();
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.click();
    fileInput.onchange = (event: any) => uploadFile(event);
  };

  return (
    <>
      {React.cloneElement(React.Children.only(children) as React.ReactElement, {
        onClick: triggerUpload,
      })}
      {/* <input type="file" style={{ display: 'none' }} onChange={uploadFile} /> */}
    </>
  );
};
