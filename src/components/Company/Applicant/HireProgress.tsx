import { Applicant, Job } from "@/type/types";
import React, { useState } from "react";
import { HiPlus } from "react-icons/hi";
import NoteCard from "./NoteCard";

type HireProgressProps = {
  applicant?: Applicant;
  job?: Job;
  updateStatus: (value: string) => void;
};
const nextStatus: any = {
  "new applied": "screening",
  screening: "interview",
  interview: "offer",
};

const HireProgress: React.FC<HireProgressProps> = ({
  applicant,
  job,
  updateStatus,
}) => {
  const [isNote, setIsNote] = useState(false);
  return (
    <div className="flex flex-col justify-evenly gap-14 p-6">
      <div className=" flex gap-5 flex-col">
        <div className="flex flex-col gap-4">
          <p>Stage of: {job?.Title}</p>
          <div className="flex gap-[5px] w-full">
            <div
              className={`${
                applicant?.Status === "new applied"
                  ? "bg-orange-600 text-white"
                  : applicant?.Status === "screening"
                  ? "bg-indigo-500/50 text-white"
                  : applicant?.Status === "interview"
                  ? "bg-blue-500/50 text-white"
                  : applicant?.Status === "offer"
                  ? "bg-cyan-500/50 text-white"
                  : applicant?.Status === "hired"
                  ? "bg-green-500/50 text-white"
                  : applicant?.Status === "decline"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 "
              }  h-10 flex-1 flex items-center justify-center p-2 sm:text-[15px] text-[14px]  `}
            >
              New Applied
            </div>
            <div
              className={`${
                applicant?.Status === "screening"
                  ? "bg-indigo-600 text-white"
                  : applicant?.Status === "interview"
                  ? "bg-blue-500/50 text-white"
                  : applicant?.Status === "offer"
                  ? "bg-cyan-500/50 text-white"
                  : applicant?.Status === "hired"
                  ? "bg-green-500/50 text-white"
                  : applicant?.Status === "decline"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200"
              }  h-10 flex-1 flex items-center justify-center p-2 sm:text-[15px] text-[14px] `}
            >
              Screening
            </div>
            <div
              className={`${
                applicant?.Status === "interview"
                  ? "bg-blue-600 text-white"
                  : applicant?.Status === "offer"
                  ? "bg-cyan-500/50 text-white"
                  : applicant?.Status === "hired"
                  ? "bg-green-500/50 text-white"
                  : applicant?.Status === "decline"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200"
              }  h-10 flex-1 flex items-center justify-center p-2 sm:text-[15px] text-[14px] `}
            >
              Interview
            </div>
            <div
              className={` ${
                applicant?.Status === "offer"
                  ? "bg-cyan-600 text-white"
                  : applicant?.Status === "hired"
                  ? "bg-green-500/50 text-white"
                  : applicant?.Status === "decline"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200"
              }  h-10 flex-1 flex items-center justify-center p-2 sm:text-[15px] text-[14px] `}
            >
              Offer
            </div>
            <div
              className={`${
                applicant?.Status === "hired"
                  ? "bg-green-600 text-white"
                  : applicant?.Status === "decline"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200"
              }  h-10 flex-1 flex items-center justify-center p-2 sm:text-[15px] text-[14px]  `}
            >
              {applicant?.Status === "hired"
                ? "Hired"
                : applicant?.Status === "decline"
                ? "Decline"
                : "Hired/Decline"}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className=" font-black">Stage Info</p>
          <div className="flex gap-4">
            <div className="flex flex-col gap-4 max-w-[50%]">
              <div className="flex flex-col gap-1">
                <p className=" text-gray-400">Interview Date</p>
                <p> 10-13 July 2021</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className=" text-gray-400">Interview Location</p>
                <p>Califoina, los angelise, New york, 221332</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 max-w-[50%]">
              <div className="flex flex-col gap-1">
                <p className=" text-gray-400">Interview Date</p>
                <p> 10-13 July 2021</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className=" text-gray-400">Interview Location</p>
                <p>Califoina, los angelise, New york, 221332</p>
              </div>
            </div>
          </div>
          {applicant?.Status === "offer" ? (
            <div className="flex gap-4">
              <button
                type="button"
                className="w-[170px] h-10 flex items-center justify-center capitalize  bg-blue-500/60 text-white disabled:bg-blue-500/60  hover:bg-blue-500  rounded-sm"
                onClick={() => updateStatus("hired")}
                // disabled={
                //   applicant?.Status === "hired" || applicant?.Status === "decline"
                //     ? true
                //     : false
                // }
              >
                Hire Applicant
              </button>
              <button
                type="button"
                className="w-[100px] h-10 flex items-center justify-center capitalize border border-red-500/40 text-red-500/40 disabled:border-red-500/40 disabled:text-red-500/40 hover:border-red-500 hover:text-red-500 rounded-sm"
                onClick={() => updateStatus("decline")}
                // disabled={
                //   applicant?.Status === "hired" || applicant?.Status === "decline"
                //     ? true
                //     : false
                // }
              >
                Decline
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="w-[170px] h-10 flex items-center justify-center capitalize border border-green-700/40 text-green-700/40 disabled:border-green-700/40 disabled:text-green-700/40 hover:border-green-700 hover:text-green-700 rounded-sm"
              onClick={() =>
                updateStatus(nextStatus[applicant?.Status || "new applied"])
              }
              disabled={
                applicant?.Status === "hired" || applicant?.Status === "decline"
                  ? true
                  : false
              }
            >
              {applicant?.Status === "hired"
                ? "Applicant Hired"
                : "Move next status"}
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex w-full items-center justify-between">
          <p>Notes</p>
          <button
            type="button"
            className=" flex items-center gap-2 text-green-700/40 hover:text-green-700 "
          >
            <HiPlus /> Add Notes
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {[1, 2, 3].map((item) => (
            <NoteCard key={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default HireProgress;
