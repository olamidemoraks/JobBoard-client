import { createSavedJobs, getSavedJobs, removeSavedJobs } from "@/app/apiQuery";
import useProfile from "@/hooks/useProfile";
import useSaved from "@/hooks/useSaved";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import CompanyModals from "../Modals/Job/CompanyModals";
import JobModal from "../Modals/Job/JobModal";
import Loader from "../Utils/Loader";
import JobCard from "./JobCard";
type SaveJobProps = {};

const SaveJob: React.FC<SaveJobProps> = () => {
  const queryClient = useQueryClient();
  const emptyResponse: any = [];
  const {
    data: Jobs,
    isLoading,
    error,
    isError,
  } = useQuery("saved", getSavedJobs, {
    onSuccess: (data) => {
      if (data.isError === true) {
        queryClient.setQueriesData("saved", emptyResponse);
      }
    },
  });
  const [jobOpen, setJobOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [companyId, setCompanyId] = useState("");
  const [jobId, setJobId] = useState("");

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
  const mutation = useMutation(createSavedJobs, {
    onSettled: () => {
      queryClient.invalidateQueries("saved");
    },
  });
  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-3">
        <Loader />;
      </div>
    );
  }
  if (isError) {
    return <div>An error has occured</div>;
  }
  console.log("Job", isError);

  return (
    <div className="flex flex-col gap-5">
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

      {Jobs.map((job: any) => {
        // const isSaved = !!Jobs?.find((saveJob: any) => saveJob._id === job._id);
        const { isSaved, handleSaveOrUnsaveJob } = useSaved({
          jobId: job._id,
          savedJobs: Jobs,
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
  );
};
export default SaveJob;
