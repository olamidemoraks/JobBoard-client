import React from "react";

type NoteCardProps = {};

const NoteCard: React.FC<NoteCardProps> = () => {
  return (
    <div className=" border border-gray-200 p-4 rounded-sm">
      <div className="flex gap-2">
        {/* user image will be here */}
        <div className="h-6 w-6 bg-gray-300 rounded-full" />

        <div className="flex flex-col gap-2 w-full">
          <div className=" h-1 w-[30%] rounded-full bg-gray-300" />
          <div className=" h-1 w-[60%] rounded-full bg-gray-300" />
          <div className=" h-1 w-[40%] rounded-full bg-gray-300" />
          <div className=" h-1 w-[23%] rounded-full bg-gray-300" />
        </div>
      </div>
    </div>
  );
};
export default NoteCard;
