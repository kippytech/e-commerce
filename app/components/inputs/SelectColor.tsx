"use client";

import { ReactEventHandler, useCallback, useEffect, useState } from "react";
import { ImageType } from "../admin/AddProductForm";
import SelectImage from "./SelectImage";
import Button from "../Button";

type SelectColorProps = {
  item: ImageType;
  addImageToState: (value: ImageType) => void;
  removeImageFromState: (value: ImageType) => void;
  isProductCreated: boolean;
};

function SelectColor({
  item,
  addImageToState,
  removeImageFromState,
  isProductCreated,
}: SelectColorProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (isProductCreated) {
      setIsSelected(false);
      setFile(null);
    }
  }, [isProductCreated]);

  const handleFileChange = useCallback(
    (value: File) => {
      setFile(value);
      addImageToState({ ...item, image: value });
    },
    [item, addImageToState],
  );

  const handleCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsSelected(e.target.checked);

      if (!e.target.checked) {
        setFile(null);
        removeImageFromState(item);
      }
    },
    [item, removeImageFromState],
  );

  return (
    <div className="grid grid-cols-1 items-center overflow-y-auto border-[1.2px] border-slate-200 p-2 md:grid-cols-2">
      <div className="flex h-[60px] items-center gap-2">
        <input
          type="checkbox"
          id={item.color}
          checked={isSelected}
          onChange={handleCheck}
          className="cursor-pointer"
        />
        <label htmlFor={item.color} className="cursor-pointer font-medium">
          {item.color}
        </label>
      </div>
      <>
        {isSelected && !file && (
          <div className="col-span-2 text-center">
            <SelectImage item={item} handleFileChange={handleFileChange} />
          </div>
        )}
        {file && (
          <div className="col-span-2 flex items-center justify-between gap-2 text-sm">
            <p>{file?.name}</p>
            <div className="w-[70px]">
              <Button
                label="Cancel"
                small
                outline
                onClick={() => {
                  setFile(null);
                  removeImageFromState(item);
                }}
              />
            </div>
          </div>
        )}
      </>
    </div>
  );
}

export default SelectColor;
