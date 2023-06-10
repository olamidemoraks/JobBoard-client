import { Company, Job } from "@/type/types";
import { useState } from "react";
import { IoPeople, IoCheckmarkCircle, IoChevronForward } from "react-icons/io5";
import moment from "moment";
import CompanyModals from "../Modals/Job/CompanyModals";
import { useQuery } from "react-query";
import { getSavedJobs } from "@/app/apiQuery";
import { currency, frequently } from "@/utils/constant";
import { HiBookmark, HiOutlineBookmark } from "react-icons/hi";
import { BsBuildings } from "react-icons/bs";

type JobCardProps = {
  Job: Job & Company;
  isSaved: boolean;
  handleCompanyModel: (cid: string, jid: string) => void;
  handleJobModel: (cid: string, jid: string) => void;
  handleSaveOrUnsaveJob: (JId: string) => void;
};

// £¥
const JobCard: React.FC<JobCardProps> = ({
  Job,
  handleSaveOrUnsaveJob,
  handleCompanyModel,
  isSaved,
  handleJobModel,
}) => {
  const { data: savedJobs, isLoading } = useQuery("saved", getSavedJobs);
  const saveJob = Array.isArray(savedJobs)
    ? savedJobs?.find((saveJob: any) => saveJob._id === Job._id)
    : {};

  console.log(Job);
  return (
    <div className=" bg-gradient-to-t to-gray-200/70 via-white from-[#fff] w-full min-h-[200px] shadow-sm p-4 flex flex-col gap-6 rounded-md border border-gray-300">
      <div
        className="flex gap-3 cursor-pointer group"
        onClick={() => {
          handleCompanyModel(Job?.CId, Job?._id);
        }}
      >
        {Job?.Logo ? (
          <>
            <div className=" h-12 w-12 rounded-md">
              <img
                loading="lazy"
                className=" h-full w-full object-cover rounded-md"
                src={`${process.env.NEXT_PUBLIC_BASEURL}/company/${Job.Logo}`}
                alt=""
              />
            </div>
          </>
        ) : (
          <>
            <div className=" h-12 w-12 rounded-md bg-gray-400 flex items-center justify-center">
              <BsBuildings className=" text-white h-1/2 w-1/2" />
            </div>
          </>
        )}
        <div className="flex flex-col gap-1 w-[90%]">
          <p className=" font-black text-[18px] group-hover:underline">
            {Job?.CompanyName}
          </p>
          <p className=" text-gray-700 text-[14px]">{Job?.CompanySnippet}</p>
          <div className="flex text-neutral-400 font-semibold items-center gap-1 uppercase text-[11px]">
            <IoPeople />
            <p>{Job.CompanySize.split(" to ").join("-")} Employees</p>
          </div>
        </div>

        <IoChevronForward />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 bg-green-600/20 text-green-900 p-[3px] px-2 rounded-[30px] text-xs items-center uppercase w-max">
          <IoCheckmarkCircle className=" text-base" />{" "}
          <p className="font-bold text-[10px]">actively hiring</p>
        </div>
        <div className=" border border-gray-200 p-3 flex md:flex-row flex-col justify-between rounded-[4px]">
          <div
            className="flex md:flex-row flex-col flex-1 flex-wrap gap-[2px]  cursor-pointer text-[14px]"
            onClick={() => handleJobModel(Job?.CId, Job?._id)}
          >
            <div className=" flex md:items-center md:gap-2 gap-1 md:flex-row flex-col">
              <p className=" capitalize text-[15px] font-black  ">
                {Job?.Title}
              </p>
              <div className="flex gap-3 flex-wrap mr-2">
                {Job?.Skills.map((skill, idx) => (
                  <p
                    className="text-[12px] text-gray-600 bg-gray-200 rounded-[9px] px-2"
                    key={idx}
                  >
                    {skill}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex gap-[2px] md:flex-row flex-col md:items-center capitalize">
              <p className="text-black/80 text-[13px] font-semibold">
                <span>{frequently[Job?.frequency]}: </span>
                {currency[Job?.currency] === "N" ? (
                  <span>&#8358;</span>
                ) : (
                  currency[Job?.currency]
                )}
                {Job?.PayMin.toLocaleString()}-
                {currency[Job?.currency] === "N" ? (
                  <span>&#8358;</span>
                ) : (
                  currency[Job?.currency]
                )}
                {Job?.PayMax.toLocaleString()}
              </p>

              {Job?.isRemote && <p className="text-black/80"> - Remotely</p>}
              {Job?.Address && (
                <p className="text-black/80"> - {Job?.Address}</p>
              )}
            </div>
          </div>
          <div className="flex md:flex-row flex-col md:items-center gap-2 justify-end">
            <p className="text-[11px] font-bold text-green-700 uppercase">
              {`Posted ${moment(Job?.createdAt).fromNow()}`}
            </p>
            <div className="flex gap-2 w-full justify-end md:w-max text-[14px] ">
              <button
                className="px-2 py-2 border-gray-300 border rounded-[4px] hover:border-blue-800 hover:text-blue-800 group w-max h-max"
                onClick={() => handleSaveOrUnsaveJob(Job?._id)}
              >
                {isSaved ? (
                  <HiBookmark className=" text-[18px] " />
                ) : (
                  <HiOutlineBookmark className=" text-[18px] " />
                )}
              </button>
              <button
                className="px-2 py-2 bg-black text-white rounded-[4px] md:w-max w-full hover:bg-blue-800 "
                onClick={() => handleJobModel(Job?.CId, Job?._id)}
              >
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default JobCard;
