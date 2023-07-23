import React from "react";
import {
  IoChatbubbleOutline,
  IoBriefcaseOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { GoDashboard } from "react-icons/go";
import { sidebarData } from "@/utils/constant";
import Link from "next/link";
import { useRouter } from "next/router";
type SidebarProps = {};

const Sidebar: React.FC<SidebarProps> = () => {
  const router = useRouter();
  const activeStyle =
    "bg-gradient-to-r from-transparent via-mid-green/60 to-green-700 rounded-r-full border-l-[3px] border-l-green-500";
  const Icons: any = {
    1: <IoChatbubbleOutline className="md:text-base text-lg" />,
    2: <IoBriefcaseOutline className="md:text-base text-[18px]" />,
    3: <IoPersonOutline className="md:text-base text-xl" />,
    4: <IoPeopleOutline className="md:text-base text-xl" />,
    5: <IoSettingsOutline className="md:text-base text-xl" />,
    6: <GoDashboard className="md:text-base text-xl" />,
  };
  return (
    <div className="lg:w-[230px] md:w-[180px] w-[80px] bg-[#0a0a0a] h-[100vh] flex flex-col justify-between">
      <div>
        <Link href="/">
          <p className=" bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-green-300 to-orange-600 md:text-2xl md:pl-4 pl-2 font-bold mt-[1.6rem]">
            WiHire
          </p>
        </Link>
        <div className=" mt-10 flex flex-col gap-2">
          {sidebarData.map((data, idx) => (
            <div key={idx}>
              {data.title && (
                <p className=" text-gray-500 text-[13px] uppercase py-3 px-4 md:block hidden ">
                  {data.title}
                </p>
              )}
              <Link
                href={data.link}
                className={`${
                  data.link === router.pathname && activeStyle
                } flex md:flex-row flex-col gap-5  text-white text-sm md:items-center text-start px-4 mr-2 py-2  hover:bg-gradient-to-r hover:from-transparent hover:via-mid-green/60 hover:to-green-700/60 rounded-r-full hover:border-l-[3px] hover:border-l-green-500`}
              >
                {Icons[data.icon]}
                <p className="md:block hidden">{data.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className=" bg-gradient-to-b to-transparent from-green-700/50  flex-col rounded-t-[10px] gap-3 items-center mx-auto pt-3 w-[90%] md:flex hidden">
        <div className="flex flex-col gap-3 items-center px-4">
          <p className="text-[12px] text-white text-center">
            Have question about job or permissions?
          </p>
          <Link
            href="#"
            className="bg-gray-200 text-green-500 py-[6px] mb-6  text-[12px] text-center rounded-full w-full"
          >
            Visit Our Help Center
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
