import { Job } from "@/type/types";
import { colorWheel, colorWheelShadow } from "@/utils/constant";
import { Switch } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { HiChevronRight, HiPlus } from "react-icons/hi";

type JobPostedProps = {
  jobs: Job[];
};

const JobPosted: React.FC<JobPostedProps> = ({ jobs }) => {
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <p className="font-black">Jobs Posted</p>
        <div className="flex items-center justify-between gap-3">
          <Link
            href={"employee/job/create-job"}
            className=" bg-indigo-600 text-white text-sm px-3 py-1 flex items-center rounded-[6px]"
          >
            <HiPlus />
            Add
          </Link>
          <HiChevronRight />
        </div>
      </div>
      <div className=" flex flex-col gap-3 mt-5 ">
        {jobs?.map((job, idx) => (
          <Link
            href={`employee/job/${job._id}`}
            className={`p-3 flex gap-2 rounded-lg justify-between hover:translate-x-1 duration-300 ease-out hover:shadow-lg cursor-pointer bg-gradient-to-r ${
              colorWheelShadow[idx]
            } ${colorWheel[idx] ?? 0}`}
          >
            <div className="flex gap-2 items-center">
              <div className="h-10 w-10 rounded-md bg-white/25 flex items-center justify-center">
                <p className="text-[20px] font-semibold text-white">
                  {job.Applicants}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[13px] text-white tracking-wide">
                  {job.Title}
                </p>
                <p className=" text-[11px] font-extralight text-white/70">
                  Total Applications
                </p>
              </div>
            </div>
            <div>
              <Switch size="sm" isChecked={job.isActive === true} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default JobPosted;
