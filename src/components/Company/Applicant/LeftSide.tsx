import { Applicant, Job } from "@/type/types";
import moment from "moment";
import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BiCalendar, BiPhone } from "react-icons/bi";
import {
  HiChevronDown,
  HiChevronUp,
  HiOutlineLocationMarker,
  HiUser,
} from "react-icons/hi";
import StageMenu from "./StageMenu";
import { BsDot } from "react-icons/bs";
import { Divider } from "@chakra-ui/react";
import { GiDroplets } from "react-icons/gi";
import { statusColor } from "@/utils/constant";

type LeftSideProps = {
  applicant?: Applicant;
  job?: Job;
  updateStatus: (value: string) => void;
};

const LeftSide: React.FC<LeftSideProps> = ({
  applicant,
  job,
  updateStatus,
}) => {
  const profile = applicant?.profile;
  const [openContact, setOpenContact] = useState(false);
  return (
    <div className="border border-gray-200 mb-4">
      <div className=" shadow-md rounded-md ">
        <div className="flex items-center flex-row gap-4 p-7 md:flex-col">
          <div className="md:h-[100px] md:w-[100px] h-[100px] w-[100px] rounded-full flex items-center justify-center bg-gray-400">
            {profile?.Photo ? (
              <img
                loading="lazy"
                className=" h-full w-full object-cover rounded-full"
                src={`${process.env.NEXT_PUBLIC_BASEURL}/profile/${applicant?.profile.Photo}`}
                alt="profile image"
              />
            ) : (
              <HiUser className=" h-1/2 w-1/2 text-white" />
            )}
          </div>
          <div className="flex items-center flex-col gap-4">
            <div className=" text-center">
              <h2 className=" text-xl font-black">
                {profile?.FName} {profile?.LName}
              </h2>
              <p className="text-[13px]">
                Applied {moment(applicant?.createdAt).fromNow()}
              </p>
            </div>
            {/* //Activities */}
            {/* <div className="flex gap-3">
              <div className=" bg-gray-200 rounded-full h-7 w-7 text-gray-500 flex items-center justify-center p-1">
                <AiOutlineMail />
              </div>
              <div className=" bg-gray-200 rounded-full h-7 w-7 text-gray-500 flex items-center justify-center p-1">
                <BiCalendar />
              </div>
              <div className=" bg-gray-200 rounded-full h-7 w-7 text-gray-500 flex items-center justify-center p-1">
                <BiPhone />
              </div>
            </div> */}
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-6 p-7  ">
          <div className="md:block hidden w-full">
            <p className=" capitalize  text-gray-500 mb-2">Applied job</p>
            <div className="bg-gray-100 py-3 px-2 rounded-md ">
              <p className=" font-black capitalize  w-full">{job?.Title}</p>
              <div className="flex items-center gap-1 text-sm capitalize">
                <p>{job?.EmploymentType}</p>
                <BsDot />
                <p>{job?.Location}</p>
              </div>
            </div>
          </div>
          <Divider />
          {/* <div className="flex items-center w-full flex-col">
            <p className=" text-gray-400 text-sm uppercase mb-1">
              Change status
            </p>
            <StageMenu Status={applicant?.Status} updateStatus={updateStatus}>
              <div className=" bg-green-600 text-white px-3 py-1 flex items-center gap-1 rounded-full w-max">
                Advance <HiChevronDown />
              </div>
            </StageMenu>
          </div> */}
          <div className="flex flex-col gap-1  justify-center mx-auto">
            <div className="flex items-center justify-between">
              <p>Status</p>
              <div className="flex items-center gap-1">
                <div
                  className={`${
                    statusColor[applicant?.Status ?? "new applied"]
                  } h-2 w-2 rounded-full`}
                />
                <p className=" capitalize">{applicant?.Status}</p>
              </div>
            </div>

            <div className="flex gap-[2px]">
              <div
                className={`${
                  applicant?.Status === "new applied"
                    ? "bg-orange-500 text-white"
                    : applicant?.Status === "screening"
                    ? "bg-indigo-500 text-white"
                    : applicant?.Status === "interview"
                    ? "bg-blue-500 text-white"
                    : applicant?.Status === "offer"
                    ? "bg-cyan-500 text-white"
                    : applicant?.Status === "hired"
                    ? "bg-green-500 text-white"
                    : applicant?.Status === "decline"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200"
                }  px-[25px] py-[2px] rounded-l-full`}
              >
                1
              </div>
              <div
                className={`${
                  applicant?.Status === "screening"
                    ? "bg-indigo-500 text-white"
                    : applicant?.Status === "interview"
                    ? "bg-blue-500 text-white"
                    : applicant?.Status === "offer"
                    ? "bg-cyan-500 text-white"
                    : applicant?.Status === "hired"
                    ? "bg-green-500 text-white"
                    : applicant?.Status === "decline"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200"
                }  px-[25px] py-[2px]`}
              >
                2
              </div>
              <div
                className={`${
                  applicant?.Status === "interview"
                    ? "bg-blue-500 text-white"
                    : applicant?.Status === "offer"
                    ? "bg-cyan-500 text-white"
                    : applicant?.Status === "hired"
                    ? "bg-green-500 text-white"
                    : applicant?.Status === "decline"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200"
                }  px-[25px] py-[2px]`}
              >
                3
              </div>
              <div
                className={` ${
                  applicant?.Status === "offer"
                    ? "bg-cyan-500 text-white"
                    : applicant?.Status === "hired"
                    ? "bg-green-500 text-white"
                    : applicant?.Status === "decline"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200"
                }  px-[25px] py-[2px]`}
              >
                4
              </div>
              <div
                className={`${
                  applicant?.Status === "hired"
                    ? "bg-green-500 text-white"
                    : applicant?.Status === "decline"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200"
                }  px-[25px] py-[2px] rounded-r-full`}
              >
                5
              </div>
            </div>
          </div>
        </div>
        <Divider mt={"1.3rem"} />
        <div className="p-7 md:block hidden">
          <p className=" capitalize font-bold mb-2">Contact Details</p>
          <div className="flex flex-col gap-4">
            <div className=" flex gap-5 items-center">
              <AiOutlineMail className=" text-[21px] text-gray-500" />
              <div>
                <p className=" text-gray-500">Email</p>
                <p>{profile?.Email} olamidemoraks@gmail.com</p>
              </div>
            </div>
            <div className=" flex gap-5 items-center">
              <BiPhone className=" text-[21px] text-gray-500" />
              <div>
                <p className=" text-gray-500">Phone</p>
                <p>{profile?.Mobileno}</p>
              </div>
            </div>
            <div className=" flex gap-5 items-center">
              <HiOutlineLocationMarker className=" text-[21px] text-gray-500" />
              <div>
                <p className=" text-gray-500">Address</p>
                <p>{profile?.Address}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-7 block md:hidden">
          <p
            className=" capitalize font-bold mb-2 flex justify-between items-center bg-gray-200 p-4 rounded-[5px] cursor-pointer"
            onClick={() => setOpenContact((prev) => !prev)}
          >
            Contact Details
            {openContact ? <HiChevronUp /> : <HiChevronDown />}
          </p>
          {openContact && (
            <div className="flex flex-col gap-4 mt-5">
              <div className=" flex gap-5 items-center ">
                <AiOutlineMail className=" text-[21px] text-gray-500" />
                <div>
                  <p className=" text-gray-500">Email</p>
                  <p>{profile?.Email} olamidemoraks@gmail.com</p>
                </div>
              </div>
              <div className=" flex gap-5 items-center ">
                <BiPhone className=" text-[21px] text-gray-500" />
                <div>
                  <p className=" text-gray-500">Phone</p>
                  <p>{profile?.Mobileno}</p>
                </div>
              </div>
              <div className=" flex gap-5 items-center ">
                <HiOutlineLocationMarker className=" text-[21px] text-gray-500" />
                <div>
                  <p className=" text-gray-500">Address</p>
                  <p>{profile?.Address}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default LeftSide;
