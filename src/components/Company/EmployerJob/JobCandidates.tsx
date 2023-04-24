import { getAllJobApplicant, getJob } from "@/app/apiQuery";
import { Applicant, Job } from "@/type/types";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import ApplicantCard from "./ApplicantCard";

type JobCandidatesProps = {
  jobs: Job | undefined;
};

const JobCandidates: React.FC<JobCandidatesProps> = ({ jobs }) => {
  const router = useRouter();
  const { data: applicants, isLoading: applicantLoading } = useQuery<
    Applicant[]
  >(
    "job-applicant",
    async () => {
      return getAllJobApplicant(router.query.id, jobs?.CId);
    },
    {
      refetchOnReconnect: true,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      enabled: !!jobs && !!router.query.id,
    }
  );

  console.log(applicants);
  return (
    <div className="">
      <div className="flex  gap-3 flex-wrap">
        {applicants?.map((applicant) => (
          <ApplicantCard applicant={applicant} key={applicant._id} />
        ))}
      </div>
    </div>
  );
};
export default JobCandidates;
