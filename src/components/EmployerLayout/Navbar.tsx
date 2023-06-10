import { getCompany } from "@/app/apiQuery";

import Link from "next/link";
import useProfile from "@/hooks/useProfile";
import React from "react";
import { useQuery } from "react-query";
import { FiBell, FiPlus } from "react-icons/fi";
import Menu from "./Menu";
import { Company } from "@/type/types";
import { HiOfficeBuilding } from "react-icons/hi";

const Navbar: React.FC = () => {
  const { email, isExpired, account } = useProfile();
  const { data, isLoading } = useQuery<Company>("company", getCompany, {
    refetchOnWindowFocus: false,
  });
  return (
    <div
      className="flex md:justify-between justify-end py-3 border-b border-b-gray-200/90 w-full  px-10 sticky top-0 bg-white"
      style={{ zIndex: "100" }}
    >
      <div className="md:flex hidden gap-3 items-center">
        {data?.Logo ? (
          <div className="h-9 w-9 rounded-full">
            <img
              loading="lazy"
              src={`${process.env.NEXT_PUBLIC_BASEURL}/company/${data.Logo}`}
              alt=""
              className=" w-full h-full rounded-full object-cover "
            />
          </div>
        ) : (
          <div className="h-9 w-9 bg-orange-600 rounded-full flex items-center justify-center text-white">
            <HiOfficeBuilding />
          </div>
        )}
        <div className="flex flex-col">
          <p className="text-[12px]">Company</p>
          <p className=" text-sm font-semibold">{data?.CompanyName}</p>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <Link href="/employee/job/create-job" className="mr-3 transition">
          <div className="flex items-center justify-center text-base text-white bg-green-600 p-1 rounded-[10rem] shadow-md shadow-neutral-400 group ease-in duration-200">
            <FiPlus />
            <p className="hidden group-hover:block  px-1 text-sm">New</p>
          </div>
        </Link>
        <div className="h-9 w-9 bg-indigo-500 rounded-full flex items-center justify-center text-white capitalize">
          {email?.slice(0, 1)}
        </div>
        <div className="md:flex hidden flex-col">
          <p className="text-sm font-semibold capitalize">
            {email?.split("@")[0]}
          </p>
          <p className=" text-xs text-gray-500">{data?.Title}</p>
        </div>
        <Menu />
      </div>
    </div>
  );
};
export default Navbar;
