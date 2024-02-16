"use client";

import { useCallback } from "react";
import { ImageType } from "../admin/AddProductForm";
import { useDropzone } from "react-dropzone";

type SelectImageProps = {
  item?: ImageType;
  handleFileChange: (value: File) => void;
};

function SelectImage({ item, handleFileChange }: SelectImageProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        handleFileChange(acceptedFiles[0]);
      }
    },
    [handleFileChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png"] },
  });
  return (
    <div
      {...getRootProps()}
      className="flex cursor-pointer items-center justify-center border-2 border-dashed border-slate-400 p-2 text-sm font-normal text-slate-400"
    >
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the image here</p> : <p>{item?.color}</p>}
    </div>
  );
}

export default SelectImage;
