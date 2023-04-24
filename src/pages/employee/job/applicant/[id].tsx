import { getApplicant, getJob, updateApplicantStatus } from "@/app/apiQuery";
import { Applicant, Job } from "@/type/types";
import { Divider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiDocumentDownload,
  HiOutlineGlobeAlt,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import fileDownload from "js-file-download";
import axios from "axios";
import { BiHeadphone } from "react-icons/bi";
import Loader from "@/components/Utils/Loader";
import AuthRoute from "@/components/Layout/AuthRoute";
import LeftSide from "@/components/Company/Applicant/LeftSide";
import RightSide from "@/components/Company/Applicant/RightSide";
import { Toaster, toast } from "react-hot-toast";

type ApplicantProps = {};

const Applicant: React.FC<ApplicantProps> = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: applicant, isLoading } = useQuery<Applicant>(
    "applicant",
    async () => {
      return getApplicant(router.query.id);
    },
    { enabled: !!router.query.id }
  );
  const { data: job } = useQuery<Job>(
    "job",
    async () => {
      return getJob(applicant?.JId);
    },

    {
      enabled: !!applicant?.JId,
    }
  );

  const mutation = useMutation(updateApplicantStatus, {
    onSettled: () => {
      queryClient.invalidateQueries("applicant");
    },
  });

  const updateStatus = (value: string) => {
    mutation.mutate({ value, id: applicant?._id });
    toast.success(
      `${applicant?.profile.FName} ${applicant?.profile.LName} has been moved to ${value} stage`
    );
  };

  const download = (name: string) => {
    axios({
      url: `http://localhost:5000/api/v1/resume/${name}`,
      method: "Get",
      responseType: "blob",
    })
      .then((res) => {
        console.log(res);
        fileDownload(res.data, `${name}`);
      })
      .catch((err) => console.log(err));
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className=" bg-gray-100">
      <div className="flex justify-between items-center">
        <p className="flex items-center gap-2 text-sm">
          <HiChevronLeft className="text-[18px]" /> Back to {job?.Title}
        </p>
        <p className="flex items-center gap-2 text-sm text-gray-400 hover:text-black">
          Next <HiChevronRight className="text-[18px]" />
        </p>
      </div>
      <Toaster position="top-center" />
      <div className="flex md:flex-row flex-col mt-8 gap-5">
        <div className=" flex-[0.5]">
          <LeftSide
            applicant={applicant}
            job={job}
            updateStatus={updateStatus}
          />
        </div>
        <div className="flex-1">
          <RightSide
            applicant={applicant}
            download={download}
            job={job}
            updateStatus={updateStatus}
          />
        </div>
      </div>
    </div>
  );
};
export default AuthRoute(Applicant);
