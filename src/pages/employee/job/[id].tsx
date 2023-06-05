import { getAllJobApplicant, getJob, updateJob } from "@/app/apiQuery";
import { Applicant, Job } from "@/type/types";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import {
  useQuery,
  QueryClient,
  dehydrate,
  useMutation,
  useQueryClient,
} from "react-query";
import { BsChevronLeft, BsCurrencyDollar } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import {
  HiOutlineFolderOpen,
  HiOutlineBriefcase,
  HiOutlineCurrencyDollar,
  HiPencil,
  HiLink,
} from "react-icons/hi";

import Link from "next/link";
import JobCandidates from "@/components/Company/EmployerJob/JobCandidates";
import JobDetails from "@/components/Company/EmployerJob/JobDetails";
import { frequently } from "@/utils/constant";
import { IoLocation, IoLocationOutline } from "react-icons/io5";
import { Switch } from "@chakra-ui/react";
import Loader from "@/components/Utils/Loader";
import AuthRoute from "@/components/Layout/AuthRoute";

type JobDetailProps = {};

const JobDetail: React.FC<JobDetailProps> = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation(updateJob, {
    onSettled: () => {
      queryClient.invalidateQueries("job");
    },
  });
  const { data: job, isLoading } = useQuery<Job>(
    "job",
    async () => {
      return getJob(router.query.id);
    },

    {
      enabled: !!router.query.id,
    }
  );

  const { data: applicants, isLoading: applicantLoading } = useQuery<
    Applicant[]
  >(
    "job-applicant",
    async () => {
      return getAllJobApplicant(job?._id, job?.CId);
    },
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      enabled: !!job,
    }
  );

  const { query } = router;
  const handleView = (values: string) => {
    const path = router.pathname;
    query["view"] = values;
    router.push({ pathname: path, query });
  };

  let content;
  let headerContent;
  if (applicantLoading) {
    content = (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (query.view === "candidates" || query.view === undefined) {
    content = (
      <div
        className="absolute bg-gradient-to-tl to-green-200/60 from-white -left-[40px] -right-[40px] pl-[40px]  py-[15px] min-h-[60vh]"
        style={{ zIndex: "0" }}
      >
        <JobCandidates jobs={job} />
      </div>
    );
  }
  if (query.view === "details") {
    content = (
      <div
        className="absolute bg-gray-200/40  -left-[40px] -right-[40px] pl-[40px] py-[15px] min-h-[60vh]"
        style={{ zIndex: "0" }}
      >
        <JobDetails Job={job} />
      </div>
    );
  }

  const handleStatus = () => {
    const value = {
      isActive: job?.isActive ? !job?.isActive : true,
    };
    mutation.mutate({ values: value, id: job?._id });
  };

  const back = () => {
    router.push("/employee/job");
    queryClient.removeQueries("job-applicant");
  };

  if (!isLoading) {
    headerContent = (
      <div className="flex items-start justify-between mt-5">
        <div className="flex flex-col gap-3 ">
          <p className=" text-xl font-extrabold text-gray-800 ">{job?.Title}</p>
          <div className="flex md:gap-4 gap-1 md:items-center md:flex-row flex-col">
            <p className="md:flex hidden gap-1 items-center  text-gray-700 md:text-sm text-[12px]">
              <HiOutlineBriefcase className="text-[18px]" />{" "}
              {job?.EmploymentType}
            </p>
            <p className=" gap-1 items-center  text-gray-700 md:text-sm text-[12px] md:flex hidden">
              <IoLocationOutline className="text-[18px]" />
              {job?.isRemote ? "Remote" : job?.Location}
            </p>
            <p className=" gap-1 items-center  text-gray-700 md:text-sm flex">
              <HiOutlineCurrencyDollar className="text-[20px]" />
              {`$${job?.PayMin?.toLocaleString()} - $${job?.PayMax?.toLocaleString()} ${
                frequently[job?.frequency ?? "mo"]
              }`}
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <Link
            href={`/employee/job/edit/${router.query.id}`}
            className="bg-gray-300/30 hover:bg-gray-300/70 rounded-full px-2 py-[3px] flex items-center gap-1 "
          >
            <p className="text-neutral-500">Edit</p>{" "}
            <HiPencil className="text-neutral-500" />
          </Link>

          <div className="h-[24px] w-[1px] bg-gray-300" />

          <div
            className=" bg-gray-300/30 rounded-full px-2 py-[3px] flex items-center gap-1 cursor-pointer hover:bg-gray-300/70"
            onClick={handleStatus}
          >
            <p
              className={`${
                job?.isActive ? "text-green-600" : "text-neutral-500"
              }`}
            >
              {job?.isActive ? "Active" : "InActive"}
            </p>
            <Switch
              isChecked={job?.isActive === true ? true : false}
              size="sm"
            />
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    headerContent = (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div
        onClick={back}
        className="flex gap-1 items-center text-xs hover:text-green-600 font-semibold cursor-pointer"
      >
        <BsChevronLeft /> Back to Jobs
      </div>
      {headerContent}

      <div className="mt-7 flex gap-1 ">
        <div
          className={` ${
            query.view === "candidates" || query.view === undefined
              ? "border-b-green-700"
              : "border-b-transparent"
          } text-sm font-black px-2 py-[5px] border-b-[3px]   hover:border-b-green-700/50 cursor-pointer  flex gap-[4px] `}
          onClick={() => handleView("candidates")}
        >
          <p>Candidates</p>{" "}
          <span className=" bg-gray-300/80 py-0 h-max px-[5px] rounded-[12px] text-[13px]">
            {applicants?.length}
          </span>
        </div>
        <div
          className={` ${
            query.view === "details"
              ? "border-b-green-700"
              : "border-b-transparent"
          } text-sm font-black px-2 py-[5px] border-b-[3px]  hover:border-b-green-700/50 cursor-pointer `}
          onClick={() => handleView("details")}
        >
          <p>Job Details</p>
        </div>
      </div>
      <div className="relative" style={{ zIndex: "0" }}>
        {content}
      </div>
    </div>
  );
};
export default AuthRoute(JobDetail);

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery("job", async () => {
    return getJob(context.query.id);
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
