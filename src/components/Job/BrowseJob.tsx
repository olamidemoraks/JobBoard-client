import { Job } from "@/type/types";
import { useState } from "react";
import CompanyModals from "../Modals/Job/CompanyModals";
import JobCard from "./JobCard";
import SearchFilter from "./SeachFilter/SearchFilter";
import { useQueryClient, useMutation, useQuery } from "react-query";
import JobModal from "../Modals/Job/JobModal";
import { createSavedJobs, getSavedJobs, removeSavedJobs } from "@/app/apiQuery";
import useSaved from "@/hooks/useSaved";
import Loader from "../Utils/Loader";
import Empty from "../Utils/Empty";

type BrowseJobProps = {
  Jobs: Job[] | undefined;
  isLoading: boolean;
};

const BrowseJob: React.FC<BrowseJobProps> = ({ Jobs, isLoading }) => {
  const queryClient = useQueryClient();
  const { data: savedJobs } = useQuery("saved", getSavedJobs);
  const [jobOpen, setJobOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [companyId, setCompanyId] = useState("");
  const [jobId, setJobId] = useState("");
  const mutation = useMutation(createSavedJobs, {
    onSettled: () => {
      queryClient.invalidateQueries("saved");
    },
  });

  const handleCompanyModel = (cid: string, jid: string) => {
    setCompanyId(cid);
    setJobId(jid);
    setCompanyOpen(true);
    setJobOpen(false);
  };
  const handleJobModel = (cid: string, jid: string) => {
    setJobId(jid);
    setCompanyId(cid);
    setCompanyOpen(false);
    setJobOpen(true);
  };

  const handleCompanyClose = () => {
    setCompanyId("");
    setJobId("");
    queryClient.removeQueries("getCompany");
    queryClient.removeQueries("job");
    setCompanyOpen(false);
  };
  const handleJobClose = () => {
    setCompanyId("");
    setJobId("");
    queryClient.removeQueries("getCompany");
    queryClient.removeQueries("job");
    setJobOpen(false);
  };

  let content;

  if (isLoading) {
    content = (
      <div className="flex items-center justify-center mt-3">
        <Loader />
      </div>
    );
  }

  if (!isLoading || Jobs) {
    content = (
      <div>
        <div></div>
        <div className="flex flex-col gap-5">
          {Jobs?.map((job: any) => {
            const { isSaved, handleSaveOrUnsaveJob } = useSaved({
              jobId: job._id,
              savedJobs: savedJobs,
              mutation: mutation,
            });
            return (
              <JobCard
                key={job._id}
                Job={job}
                handleCompanyModel={handleCompanyModel}
                handleJobModel={handleJobModel}
                handleSaveOrUnsaveJob={handleSaveOrUnsaveJob}
                isSaved={isSaved}
              />
            );
          })}
        </div>
      </div>
    );
  }
  if (Jobs?.length === 0) {
    content = <Empty text="No Job Found!" />;
  }
  return (
    <div className="mb-16">
      <CompanyModals
        open={companyOpen}
        handleClose={handleCompanyClose}
        companyId={companyId}
        jobId={jobId}
        handleJobModel={handleJobModel}
      />
      <JobModal
        handleClose={handleJobClose}
        jobId={jobId}
        open={jobOpen}
        companyId={companyId}
      />
      <div className=" sticky top-6 ">
        <SearchFilter />
      </div>
      {content}
    </div>
  );
};
export default BrowseJob;
