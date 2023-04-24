import React from "react";

type ActivityDisplayProps = {
  name: string;
  value: number;
  children: any;
  bgColor: string;
};

const ActivityDisplay: React.FC<ActivityDisplayProps> = ({
  children,
  name,
  value,
  bgColor,
}) => {
  return (
    <div
      className={`lg:p-5 md:p-3 p-5  rounded-[9px] bg-white border border-gray-200 text-white lg:w-[330px] min-w-[240px] h-[120px] flex justify-between items-center`}
    >
      <div
        className={`${bgColor} flex items-center justify-center h-[50px] w-[50px] rounded-lg bg-black/30`}
      >
        {children}
      </div>
      <div className="flex flex-col items-end">
        <p className=" capitalize text-gray-500 text-left">{name}</p>
        <p className=" text-[30px] font-semibold text-black">{value}</p>
      </div>
    </div>
  );
};
export default ActivityDisplay;
