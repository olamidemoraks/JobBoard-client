import { Applicant, Job } from "@/type/types";
import { Divider } from "@chakra-ui/react";
import { profile } from "console";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import ApplicantProfile from "./ApplicantProflle";
import HireProgress from "./HireProgress";
import InterviewSchedule from "./InterviewSchedule";

type RightSideProps = {
  applicant?: Applicant;
  download: (value: string) => void;
  job?: Job;
  updateStatus: (value: string) => void;
};

const RightSide: React.FC<RightSideProps> = ({
  applicant,
  download,
  job,
  updateStatus,
}) => {
  const router = useRouter();
  const { query } = router;
  const profile = applicant?.profile;

  const handleNavigator = (value: string) => {
    const path = router.pathname;

    query["section"] = value;

    router.push({ pathname: path, query });
  };
  let content;
  if (query["section"] === "") {
    content = <ApplicantProfile download={download} applicant={applicant} />;
  }
  if (query["section"] === "progress") {
    content = (
      <HireProgress
        job={job}
        applicant={applicant}
        updateStatus={updateStatus}
      />
    );
  }
  if (query["section"] === "schedule") {
    content = <InterviewSchedule />;
  }

  return (
    <div className="border border-gray-200 min-h-[50vh]">
      <div className=" border-b border-b-gray-300 flex gap-2 px-5">
        <div
          className={`   border-b-[3px] w-max p-4 cursor-pointer  ${
            query["section"] === ""
              ? "border-b-green-700 hover:border-b-green-700 font-semibold"
              : "border-transparent text-gray-500 hover:border-b-green-700/40"
          }`}
          onClick={() => handleNavigator("")}
        >
          Candidate Profile
        </div>
        <div
          className={`  w-max p-4 cursor-pointer   border-b-[3px] ${
            query["section"] === "progress"
              ? "border-b-green-700 hover:border-b-green-700 font-semibold"
              : "border-transparent  text-gray-500 hover:border-b-green-700/40"
          }`}
          onClick={() => handleNavigator("progress")}
        >
          Hiring Progress
        </div>
        <div
          className={` w-max p-4 cursor-pointer   border-b-[3px] ${
            query["section"] === "schedule"
              ? "border-b-green-700 hover:border-b-green-700 font-semibold"
              : "border-transparent text-gray-500  hover:border-b-green-700/40 "
          }`}
          onClick={() => handleNavigator("schedule")}
        >
          Interview Schedule
        </div>
      </div>
      {content}
    </div>
  );
};
export default RightSide;
