import useProfile from "@/hooks/useProfile";
import { Overview } from "@/type/types";
import React from "react";
import ActivityDisplay from "./ActivityDisplay";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import { BsMailbox2 } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import JobPosted from "./JobPosted";
import RecentApplicant from "./RecentApplicant";

type DashboardProps = {
  overviews: Overview;
};

const Dashboard: React.FC<DashboardProps> = ({ overviews }) => {
  const { email } = useProfile();
  console.log(email);
  return (
    <div className="">
      <div>
        <p className=" font-semibold text-[18px] capitalize">
          Welcome back, {email?.split("@")[0]}
        </p>
        <p className=" text-gray-500 ">
          Here is your job listing statistic reports
        </p>
      </div>
      <div className=" flex gap-10 w-full mt-6 md:flex-row flex-col ">
        <div className="flex gap-y-1 gap-x-3 lg-[80%] md:w-[70%] md:flex-row flex-col lg:flex-nowrap md:flex-wrap h-max">
          <ActivityDisplay
            name="total applications"
            value={overviews?.totalCandidates}
            bgColor="bg-blue-600 "
          >
            <BsPeopleFill className=" text-white h-1/2 w-1/2" />
          </ActivityDisplay>
          <ActivityDisplay
            name="total Jobs"
            value={overviews?.totalJobs}
            bgColor="bg-indigo-600"
          >
            <BsFillBriefcaseFill className=" text-white h-1/2 w-1/2 " />
          </ActivityDisplay>
          <ActivityDisplay
            name="New Messages"
            value={20}
            bgColor="bg-green-600"
          >
            <BsMailbox2 className=" text-white h-1/2 w-1/2 " />
          </ActivityDisplay>
        </div>
        <div className="lg:w-[20%] md:w-[30%] flex flex-col justify-evenly gap-5 mb-5">
          <JobPosted jobs={overviews?.firstFiveJob} />
          <RecentApplicant applicant={overviews?.applicantWithProfile} />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
