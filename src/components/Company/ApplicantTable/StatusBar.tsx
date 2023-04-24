import React from "react";

type StatusBarProps = {
  status: string;
};

const StatusBar: React.FC<StatusBarProps> = ({ status }) => {
  return (
    <div className="flex gap-[2px]">
      <div
        className={`${
          status === "new applied"
            ? "bg-orange-500 text-white"
            : status === "screening"
            ? "bg-indigo-500 text-white"
            : status === "interview"
            ? "bg-blue-500 text-white"
            : status === "offer"
            ? "bg-cyan-500 text-white"
            : status === "hired"
            ? "bg-green-500 text-white"
            : status === "decline"
            ? "bg-red-500 text-white"
            : "bg-gray-200 text-transparent"
        }  h-5 w-6  text-xs flex rounded-sm items-center justify-center `}
      >
        1
      </div>
      <div
        className={`${
          status === "screening"
            ? "bg-indigo-500 text-white"
            : status === "interview"
            ? "bg-blue-500 text-white"
            : status === "offer"
            ? "bg-cyan-500 text-white"
            : status === "hired"
            ? "bg-green-500 text-white"
            : status === "decline"
            ? "bg-red-500 text-white"
            : "bg-gray-200 text-transparent"
        }  h-5 w-6  text-xs flex rounded-sm items-center justify-center `}
      >
        2
      </div>
      <div
        className={`${
          status === "interview"
            ? "bg-blue-500 text-white"
            : status === "offer"
            ? "bg-cyan-500 text-white"
            : status === "hired"
            ? "bg-green-500 text-white"
            : status === "decline"
            ? "bg-red-500 text-white"
            : "bg-gray-200 text-transparent"
        }  h-5 w-6  text-xs flex rounded-sm items-center justify-center `}
      >
        3
      </div>
      <div
        className={` ${
          status === "offer"
            ? "bg-cyan-500 text-white"
            : status === "hired"
            ? "bg-green-500 text-white"
            : status === "decline"
            ? "bg-red-500 text-white"
            : "bg-gray-200 text-transparent"
        }  h-5 w-6  text-xs flex rounded-sm items-center justify-center `}
      >
        4
      </div>
      <div
        className={`${
          status === "hired"
            ? "bg-green-500 text-white"
            : status === "decline"
            ? "bg-red-500 text-white"
            : "bg-gray-200 text-transparent"
        }  h-5 w-6  text-xs flex rounded-sm items-center justify-center  `}
      >
        5
      </div>
    </div>
  );
};
export default StatusBar;
