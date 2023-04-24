import { Applicant, Job } from "@/type/types";
import React, { useMemo } from "react";
import { FcDisapprove, FcApproval } from "react-icons/fc";
import { BsDot, BsChevronRight } from "react-icons/bs";
import { AiOutlineDisconnect } from "react-icons/ai";
import Link from "next/link";
import { getAllJobApplicant } from "@/app/apiQuery";
import { useQuery } from "react-query";
import moment from "moment";

type EmployeeJobCardProps = {
  job: Job;
};

const EmployeeJobCard: React.FC<EmployeeJobCardProps> = ({ job }) => {
  console.log();
  return (
    <div className="h-[210px] w-[210px] shadow-lg border-t-mid-green border-t-[3px] border border-gray-200 rounded-[4px] p-3  flex flex-col justify-between ">
      <p className="font-bold  text-dark-green">{job?.Title}</p>
      <div className=" flex gap-3 flex-col">
        <div>
          {job.Applicants > 0 ? (
            <div className="flex gap-x-8 ">
              <div className="flex flex-col border-l-[3px] border-l-green-600/40 pl-2 ">
                <p className="text-sm text-gray-400 uppercase">Applicants</p>
                <p className=" text-mid-green text-[18px] ">{job.Applicants}</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center grayscale flex-col">
              <FcDisapprove size={"40"} />
              <p className="text-sm text-gray-400 uppercase">No Applicants</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-[2px] items-center">
          <p className=" text-xs text-gray-400">
            {job.isRemote ? "Remote" : "Not Remote"}
          </p>
          <BsDot className=" text-gray-400 text-sm" />
          <p className=" text-xs text-gray-400">{job.EmploymentType}</p>
        </div>
        <div className="flex justify-between">
          {job.isActive ? (
            <p className="flex text-[11px] items-center gap-1 font-semibold text-gray-600">
              <FcApproval /> published
            </p>
          ) : (
            <p className="flex text-[11px] items-center gap-1 font-semibold text-gray-600">
              <AiOutlineDisconnect /> Draft
            </p>
          )}
          <Link
            href={`job/${job._id}`}
            className="flex text-[11px] items-center gap-1 font-semibold text-gray-600"
          >
            See details <BsChevronRight />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default EmployeeJobCard;
