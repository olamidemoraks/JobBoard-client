import React from "react";
import {
  IoHomeOutline,
  IoPersonOutline,
  IoBriefcaseOutline,
} from "react-icons/io5";

type SidebarProps = {};

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <div className=" md:w-[90px]  md:top-10 flex flex-col">
      <div className="flex md:flex-col gap-10 mt-6 items-center flex-row">
        <div className="flex flex-col gap-2 items-center w-max cursor-pointer">
          <IoHomeOutline className=" text-2xl text-gray-600" />
          <p className=" text-gray-600 text-sm">Home</p>
        </div>
        <div className="flex flex-col gap-2 items-center w-max cursor-pointer">
          <IoPersonOutline className=" text-2xl text-gray-600" />
          <p className=" text-gray-600 text-sm">profile</p>
        </div>
        <div className="flex flex-col gap-2 items-center w-max cursor-pointer">
          <IoBriefcaseOutline className=" text-2xl text-gray-600" />
          <p className=" text-gray-500 text-sm">Job</p>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
