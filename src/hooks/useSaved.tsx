import { createSavedJobs, getSavedJobs, removeSavedJobs } from "@/app/apiQuery";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

type savedProps = {
  jobId: any;
  savedJobs: any;
  mutation?: any;
};
const useSaved = ({ jobId, savedJobs, mutation }: savedProps) => {
  const queryClient = useQueryClient();
  //   const { data: savedJobs, isLoading } = useQuery("saved", getSavedJobs);
  //   const [jobId, setJobId] = useState("");
  const isSaved = Array.isArray(savedJobs)
    ? !!savedJobs?.find((saveJob: any) => saveJob._id === jobId)
    : false;

  //   const mutation = useMutation(createSavedJobs, {
  //     onSettled: () => {
  //       queryClient.invalidateQueries("saved");
  //     },
  //   });
  //   const deleteMutation = useMutation(removeSavedJobs, {
  //     onSettled: () => {
  //       queryClient.invalidateQueries("saved");
  //     },
  //   });

  const handleSaveOrUnsaveJob = (JId: string) => {
    const data = {
      JId,
    };
    mutation.mutate({ data });
  };
  return {
    isSaved,
    handleSaveOrUnsaveJob,
  };
};
export default useSaved;
