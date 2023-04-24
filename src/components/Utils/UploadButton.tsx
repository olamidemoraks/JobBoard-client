import React from "react";
import { HiCloudUpload } from "react-icons/hi";

type UploadButtonProps = {
  handleSubmitImage: () => void;
};

const UploadButton: React.FC<UploadButtonProps> = ({ handleSubmitImage }) => {
  return (
    <div
      className="flex flex-col my-1 py-2 px-2 w-full justify-center bg-black text-white  items-center cursor-pointer h-9 text-sm truncate"
      onClick={handleSubmitImage}
    >
      <div className="flex items-center gap-2 ">
        <HiCloudUpload className=" text-pink-400 text-[19px]" /> Upload image
      </div>
    </div>
  );
};
export default UploadButton;
