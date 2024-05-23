import React from "react";
import { Stack, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { HiMenuAlt2 } from "react-icons/hi";
import { AiOutlineRight } from "react-icons/ai";
import Menu from "./Menu";

type NotAuthProps = {
  user: Boolean;
};

const NotAuth: React.FC<NotAuthProps> = ({ user }) => {
  return (
    <>
      <Link
        href="/auth"
        className="px-3 pb-[5px] ml-2 pt-[6px] text-white  bg-mid-green  rounded-lg  min-w-[90px] text-center md:block hidden"
      >
        Get Started
      </Link>

      <Flex display={{ base: "flex", md: "none" }} align={"center"}>
        <Menu user={user} />
      </Flex>
    </>
  );
};
export default NotAuth;
