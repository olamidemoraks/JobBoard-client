import useProfileColor from "@/hooks/useProfileColor";
import { Applicant } from "@/type/types";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { MdPerson } from "react-icons/md";

type RecentApplicantProps = {
  applicant: Applicant[];
};

const colorPallete: any = [
  " bg-red-100 border border-red-400 text-red-500",
  " bg-purple-100 border border-purple-400 text-purple-500",
  " bg-cyan-100 border border-cyan-400 text-cyan-500",
  " bg-orange-100 border border-orange-400 text-orange-500",
  " bg-gray-100 border border-gray-400 text-gray-500",
  " bg-yellow-100 border border-yellow-400 text-yellow-500",
  " bg-green-100 border border-green-400 text-green-500",
  " bg-blue-100 border border-blue-400 text-blue-500",
  " bg-ingigo-100 border border-ingigo-400 text-ingigo-500",
  " bg-amber-100 border border-amber-400 text-amber-500",
  "bg-lime-100 border border-lime-400 text-lime-500",
  "bg-emerald-100 border border-emerald-400 text-emerald-500",
];

const ProfileIcon = ({ applicant }: { applicant: Applicant }) => {
  const { bgColor } = useProfileColor({ colorPallete });
  return (
    <div
      className={`h-10 w-10 rounded-full ${bgColor} text-xs flex items-center justify-center`}
    >
      {applicant?.profile?.FName.substring(0, 1)}
      {applicant?.profile?.LName.substring(0, 1)}
    </div>
  );
};

const RecentApplicant: React.FC<RecentApplicantProps> = ({
  applicant: applicants,
}) => {
  console.log("color pallete", colorPallete);

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between w-full">
        <p className="font-black">New Applicants</p>{" "}
        <Link href={""} className="text-xs underline">
          See all
        </Link>
      </div>
      <div className="flex flex-col gap-4 mt-5 ">
        {applicants?.map((applicant) => (
          <Link
            href={`employee/job/applicant/${applicant?._id}`}
            className="flex justify-between cursor-pointer"
          >
            <div className="flex gap-2 items-center">
              {!applicant?.profile?.Photo ? (
                <div className="h-10 w-10 rounded-full bg-indigo-300 flex items-center justify-center">
                  <img
                    src={`http://localhost:5000/profile/${applicant?.profile?.Photo}`}
                    alt="profile"
                    className=" w-full h-full object-cover rounded-full"
                  />
                </div>
              ) : (
                <ProfileIcon applicant={applicant} />
              )}
              <div className="flex flex-col gap-1 flex-1">
                <p className=" text-sm capitalize">
                  {applicant?.profile?.FName} {applicant?.profile?.LName}
                </p>
                <p className=" text-xs font-extralight text-gray-400">
                  Applied for:{" "}
                  <span className=" text-xs text-black">
                    {applicant?.Title}
                  </span>
                </p>
              </div>
            </div>
            <p className=" text-xs text-gray-400">
              {moment(applicant.createdAt).fromNow(true)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default RecentApplicant;
