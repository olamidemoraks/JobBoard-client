import { getAllJobApplicant, getCompany, getJobs } from "@/app/apiQuery";
import EmployeeJobCard from "@/components/Job/EmployeeJobCard";
import AuthRoute from "@/components/Layout/AuthRoute";
import JobLoading from "@/components/Utils/JobLoading";
import Loader from "@/components/Utils/Loader";
import { Applicant, Company, Job } from "@/type/types";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useMemo, useState } from "react";
import { useQuery, QueryClient, dehydrate } from "react-query";

const Job: React.FC = () => {
  const router = useRouter();
  const { data: company, isLoading } = useQuery<Company>("company", getCompany);
  const {
    data: jobs,
    isLoading: jobLoading,
    error,
  } = useQuery<Job[]>(
    "companyjobs",
    async () => {
      return getJobs(company?._id);
    },
    {
      enabled: !!company?._id,
      refetchOnMount: true,
    }
  );

  const [status, setStatus] = useState<any>();
  let sortedJob = jobs;
  sortedJob = useMemo(() => {
    return (sortedJob = jobs?.filter((job) => {
      if (status === "" || status === undefined) return job;
      else {
        return job.isActive == status;
      }
    }));
  }, [status, jobs]);

  console.log(status);
  if (isLoading && jobLoading) {
    return (
      <div>
        <JobLoading />
      </div>
    );
  }

  return (
    <div>
      <div className="flex md:flex-row flex-col md:items-center item-end  md:gap-12 gap-3 py-4">
        <p className=" text-dark-green text-lg">{sortedJob?.length} Job</p>

        <div className="flex items-center text-xs gap-2">
          <p className=" text-gray-500 ">Status:</p>
          <select
            className="font-bold outline-none"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value={""}>choose status</option>
            <option value={1}>Active</option>
            <option value={0}>Not Active</option>
          </select>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-6 mt-6">
        {sortedJob?.map((job) => {
          return <EmployeeJobCard job={job} key={job._id} />;
        })}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery("company", getCompany);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default AuthRoute(Job);
