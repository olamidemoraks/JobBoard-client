import React from "react";
import { Skeleton, SkeletonText, Stack, Box } from "@chakra-ui/react";
type ProfileLoadingProps = {};

const ProfileLoading: React.FC<ProfileLoadingProps> = () => {
  return (
    <Stack>
      <div className=" flex h-[100px] justify-between items-center flex-row-reverse">
        <div className=" w-[100px] h-full flex items-center justify-center">
          <Skeleton height="100px" w="100px" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton height={"20px"} width={"300px"} />
        </div>
      </div>
      <div className="my-[50px]">
        <Skeleton mt="4" height="60px" w="550px" />
      </div>
      <div className=" my-[50px]">
        <Skeleton mt="4" height="60px" w="550px" />
      </div>
    </Stack>
  );
};
export default ProfileLoading;
