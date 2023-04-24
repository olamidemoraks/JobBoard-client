import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const AddProfile: React.FC = () => {
  const router = useRouter();

  return (
    <Flex
      align="center"
      direction="column"
      mt="40px"
      className="relative pt-[5rem]"
    >
      <div className="p-4 border-[1px] border-gray-400 bg-gray-200/70 rounded-[5px] w-[350px] flex flex-col">
        <p className=" text-[22px] font-bold text-gray-800">
          Add a resume WiHire
        </p>
        <button
          onClick={() => router.push("/profile/build/name")}
          className="w-[100%] bg-mid-green p-2 my-3 text-white rounded-md font-bold"
        >
          Build a WiHire Resume
        </button>
        <p className=" text-[12px] leading-[1.3rem]">
          By continuing, you agree to create a public resume and agree to
          receiving job opportunities from employers.
        </p>
      </div>
    </Flex>
  );
};
export default AddProfile;
