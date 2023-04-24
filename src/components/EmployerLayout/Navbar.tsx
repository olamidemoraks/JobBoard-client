import { getCompany } from "@/app/apiQuery";
import useProfile from "@/hooks/useProfile";
import React from "react";
import { useQuery } from "react-query";
import { FiBell } from "react-icons/fi";
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
              src={`http://localhost:5000/company/${data.Logo}`}
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
      <div className="flex gap-2 items-center ">
        <FiBell className=" text-lg mr-4" />
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
