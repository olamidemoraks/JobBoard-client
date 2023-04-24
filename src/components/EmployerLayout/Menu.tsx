import React from "react";
import { HiMenuAlt2, HiUser } from "react-icons/hi";
import { AiOutlineRight, AiOutlineUser } from "react-icons/ai";
import {
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Icon,
  Flex,
  Menu as ChakraMenu,
} from "@chakra-ui/react";

import { googleLogout } from "@react-oauth/google";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/app/hooks";
import { logout } from "@/feature/auth/authSlice";
import Link from "next/link";
import { useQueryClient } from "react-query";

const Menu: React.FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const location = router.pathname;

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    googleLogout();
    router.push("/auth");
    queryClient.removeQueries();
    dispatch(logout({}));
  };
  return (
    <ChakraMenu>
      <MenuButton
        p="0"
        bg={"transparent"}
        display="flex"
        alignItems="center"
        justifyItems="center"
        as={Button}
        _hover={{ bg: "transparent" }}
        _active={{ bg: "transparent" }}
        rightIcon={
          <HiMenuAlt2
            color={location === "/" ? "#27d2a5" : "#000"}
            size="20px"
          />
        }
      />
      <MenuList
        shadow="md"
        bg={"white"}
        width="350px"
        style={{ zIndex: "100" }}
      >
        <MenuItem
          bg={"white"}
          _hover={{ bg: "gray.200", color: "black" }}
          p="0"
          borderColor="gray.200"
          color="gray.600"
        >
          <Link href="/employee/profile" className="w-full">
            <Flex
              align={"center"}
              justify="space-between"
              w="100%"
              _hover={{ bg: "gray.200" }}
              p="11px 15px"
            >
              <p className=" font-bold bg-transparent">Profile</p>
              <Icon as={AiOutlineRight} bg="transparent" />
            </Flex>
          </Link>
        </MenuItem>
        <MenuItem
          bg={"white"}
          _hover={{ bg: "gray.200", color: "black" }}
          p="0"
          borderColor="gray.200"
          color="gray.600"
        >
          <Link href="/jobs" className=" w-full">
            <Flex
              align={"center"}
              justify="space-between"
              w="100%"
              _hover={{ bg: "gray.200" }}
              p="11px 15px"
            >
              <p className=" font-bold bg-transparent">
                Continue as Job Seeker
              </p>
              <Icon as={AiOutlineRight} bg="transparent" />
            </Flex>
          </Link>
        </MenuItem>
        <MenuItem
          bg={"white"}
          _hover={{ bg: "gray.200", color: "black" }}
          p="0"
          borderColor="gray.200"
          color="gray.600"
        >
          <Link href="/employee/job/create-job" className="w-full">
            <Flex
              align={"center"}
              justify="space-between"
              w="100%"
              _hover={{ bg: "gray.200" }}
              p="11px 15px"
            >
              <p className=" font-bold bg-transparent"> Post a Job </p>
              <Icon as={AiOutlineRight} bg="transparent" />
            </Flex>
          </Link>
        </MenuItem>

        <MenuItem
          bg={"white"}
          _hover={{ bg: "gray.200" }}
          p="0"
          borderTop="2px"
          borderColor="gray.200"
        >
          <Flex
            align={"center"}
            justify="center"
            w="100%"
            _hover={{ bg: "gray.200" }}
            p="11px 15px"
            onClick={handleLogout}
          >
            <p className="font-bold bg-transparent text-primary-dark ">
              Sign Out
            </p>
          </Flex>
        </MenuItem>
      </MenuList>
    </ChakraMenu>
  );
};
export default Menu;
