import React from "react";
import { Flex, Stack } from "@chakra-ui/react";
import RightContent from "./RightContent/RightContent";
import useProfile from "@/hooks/useProfile";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "../Utils/Logo";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const router = useRouter();
  const location = router.pathname;
  const { email, isExpired, account } = useProfile();
  const path: string[] = ["/auth", "/employee/employee-setup"];
  if (path.includes(location)) {
    return null;
  } else {
    return (
      <Flex
        className={` mx-auto py-4 z-10 absolute w-full`}
        alignItems={"center"}
        justify={"center"}
        borderBottom={location !== "/" ? "1px" : "0"}
        borderBottomColor={"gray.300"}
      >
        <Flex w={"90%"} alignItems={"center"} justify="space-between">
          <Stack direction="row" spacing="2rem" align="center">
            <p
              className={`${
                location === "/" ? "text-white" : "text-gray-700"
              } mr-5 `}
            >
              <Link href={"/"}>
                <Logo />
              </Link>
            </p>
          </Stack>
          <Flex>
            <RightContent user={!isExpired} />
          </Flex>
        </Flex>
      </Flex>
    );
  }
};
export default Navbar;
