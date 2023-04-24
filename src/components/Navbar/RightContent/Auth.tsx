import React from "react";
import { Stack, Flex } from "@chakra-ui/react";
import Link from "next/link";
import Menu from "./Menu";
import { useRouter } from "next/router";

type AuthProps = {
  user: Boolean;
};

const Auth: React.FC<AuthProps> = ({ user }) => {
  const router = useRouter();
  const location = router.pathname;

  return (
    <>
      {/* <Link
        className={`${
          location === "/" ? "text-gray-300" : "text-gray-700"
        } px-2 text-[17px] font-semibold hover:text-light-green flex items-center  ease-linear duration-[.3s]`}
        href={"/profile"}
      >
        Profile
      </Link> */}
      <Flex align={"center"} justify="center">
        <Menu user={user} />
      </Flex>
    </>
  );
};
export default Auth;
