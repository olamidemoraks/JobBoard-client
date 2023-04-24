import { Applicant } from "@/type/types";
import moment from "moment";
import Link from "next/link";
import React from "react";
import {
  HiDotsHorizontal,
  HiMail,
  HiOutlineCalendar,
  HiOutlineMail,
  HiOutlineUser,
} from "react-icons/hi";

type ApplicantCardProps = {
  applicant: Applicant;
};

const ApplicantCard: React.FC<ApplicantCardProps> = ({ applicant }) => {
  return (
    <Link
      href={`applicant/${applicant._id}`}
      className=" bg-white rounded-md min-w-[270px] w-[290px] h-[100px] shadow-md p-3 flex flex-col justify-between gap-4 cursor-pointer"
    >
      <div className="flex justify-between">
        <div className="flex gap-2 ">
          {applicant?.profile?.Photo ? (
            <div className=" h-10 w-10 rounded-full">
              <img
                className=" h-full w-full object-cover rounded-full"
                src={`http://localhost:5000/profile/${applicant?.profile?.Photo}`}
                alt=""
              />
            </div>
          ) : (
            <div className=" h-10 w-10 rounded-full bg-gray-500 items-center justify-center flex">
              <HiOutlineUser className=" h-1/2 w-1/2 text-white" />
            </div>
          )}
          <div className="flex flex-col gap-[2px]">
            <p className="text-sm font-black truncate max-w-[190px]">
              {`${applicant.profile.FName} ${applicant.profile.LName}`}
            </p>
            <p className=" font-light text-[12px]">
              Applied {moment(applicant.createdAt).toNow()}
            </p>
          </div>
        </div>
        <HiDotsHorizontal />
      </div>
      <div className="flex gap-2 justify-end">
        <HiOutlineMail className=" text-gray-500 text-[17px] cursor-pointer" />
        <HiOutlineCalendar className=" text-gray-500 cursor-pointer" />
      </div>
    </Link>
  );
};
export default ApplicantCard;
