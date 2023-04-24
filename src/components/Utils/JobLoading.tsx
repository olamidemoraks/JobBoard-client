import React from "react";
import { Skeleton, SkeletonText, Stack, Box } from "@chakra-ui/react";
type JobLoadingProps = {};

const JobLoading: React.FC<JobLoadingProps> = () => {
  const number = [1, 2, 3, 4];
  return (
    <div>
      <div className=" my-4">
        <Skeleton height={"10px"} width={"400px"} />
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-6 pt-6">
        {number.map((num) => (
          <Skeleton height={"250px"} width={"210px"} />
        ))}
      </div>
    </div>
  );
};
export default JobLoading;
