import React from "react";
import { Stack, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { HiMenuAlt2 } from "react-icons/hi";
import { AiOutlineRight } from "react-icons/ai";
import Menu from "./Menu";
import NotAuth from "./NotAuth";
import Auth from "./Auth";
import { useRouter } from "next/router";

type RightContentProps = {
  user: Boolean;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  const router = useRouter();
  const location = router.pathname;
  return (
    <div className="flex gap-[10px] w-full">
      <div
        className={`${
          location === "/" ? "text-white" : "text-gray-700"
        }   md:flex hidden gap-[10px]  items-center flex-1`}
      >
        <Link
          className=" px-2 flex items-center transition duration-200 hover:underline"
          href={"/"}
        >
          Home
        </Link>
        <Link
          className=" px-2  flex items-center transition duration-200 hover:underline"
          href={"/jobs"}
        >
          Jobs
        </Link>
        <Link
          className="   px-2  flex items-center transition duration-200 hover:underline"
          href={"/employee"}
        >
          Post Job
        </Link>
      </div>
      {user ? <Auth user={user} /> : <NotAuth user={user} />}
    </div>
  );
};
export default RightContent;
