import { updateJob } from "@/app/apiQuery";
import { Job } from "@/type/types";
import { colorWheel, colorWheelShadow } from "@/utils/constant";
import { HTMLChakraComponents, Switch } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { HiChevronRight, HiPlus } from "react-icons/hi";
import { useMutation, useQueryClient } from "react-query";

type JobPostedProps = {
  jobs: Job[];
};

const JobPosted: React.FC<JobPostedProps> = ({ jobs }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(updateJob, {
    onSettled: () => {
      queryClient.invalidateQueries("overview");
    },
  });

  const handleStatus = (e: React.ChangeEvent<HTMLInputElement>, job: Job) => {
    e.stopPropagation();
    const value = {
      isActive: job?.isActive ? !job?.isActive : true,
    };
    mutation.mutate({ values: value, id: job?._id });
  };
  return (
    <div className="w-full min-h-[4rem] ">
      <div className="flex items-center justify-between">
        <p className=" text-neutral-600 ">Jobs Posted</p>
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
            key={job._id}
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
                <p className=" text-[11px] font-extralight text-white/70 ">
                  Total Applications
                </p>
              </div>
            </div>
            <div>
              <Switch
                zIndex={10}
                size="sm"
                isChecked={job.isActive === true}
                onChange={(e) => handleStatus(e, job)}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default JobPosted;
