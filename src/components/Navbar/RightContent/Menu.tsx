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
type MenuProps = {
  user: Boolean;
};
import { googleLogout } from "@react-oauth/google";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/app/hooks";
import { logout } from "@/feature/auth/authSlice";
import Link from "next/link";
import { useMutation, useQueryClient } from "react-query";
import useProfile from "@/hooks/useProfile";
import { useLogoutMutation } from "@/feature/auth/authApiSlice";
import { Logout } from "@/app/apiQuery";

const Menu: React.FC<MenuProps> = ({ user }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const location = router.pathname;

  const [sendLogout] = useLogoutMutation();

  const { email, isExpired } = useProfile();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    dispatch(logout());
    googleLogout();
    router.push("/auth");
    queryClient.clear();
  };
  return (
    <ChakraMenu>
      <MenuButton
        ml={1}
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
      <MenuList shadow="md" bg={"white"} width="350px" zIndex={20}>
        {user && (
          <MenuItem
            bg={"white"}
            _hover={{ bg: "gray.200", color: "black" }}
            p="0"
            borderBottom="2px"
            borderColor="gray.200"
            color="gray.600"
          >
            <Link href="/profile" className="w-full">
              <Flex
                align={"center"}
                gap="8px"
                w="100%"
                _hover={{ bg: "gray.200" }}
                p="11px 15px"
              >
                <div className="h-9 w-9 bg-indigo-500 rounded-full flex items-center justify-center text-white capitalize">
                  {email?.slice(0, 1)}
                </div>
                <div className="flex flex-col">
                  <p className=" font-semibold bg-transparent">{email}</p>
                  <p className=" text-sm">Ready for interview</p>
                </div>
              </Flex>
            </Link>
          </MenuItem>
        )}
        {user && (
          <MenuItem
            bg={"white"}
            _hover={{ bg: "gray.200", color: "black" }}
            p="0"
            borderBottom="2px"
            borderColor="gray.200"
            color="gray.600"
          >
            <Link href="/profile" className="w-full">
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
        )}
        {!user ? (
          <MenuItem
            bg={"white"}
            _hover={{ bg: "gray.200", color: "black" }}
            p="0"
            borderBottom="2px"
            borderColor="gray.200"
            color="gray.600"
          >
            <Link href="/auth" className="w-full">
              <Flex
                align={"center"}
                justify="space-between"
                w="100%"
                _hover={{ bg: "gray.200" }}
                p="11px 15px"
              >
                <p className=" font-bold bg-transparent">Sign up / Login </p>
                <Icon as={AiOutlineRight} bg="transparent" />
              </Flex>
            </Link>
          </MenuItem>
        ) : null}
        <MenuItem
          bg={"white"}
          _hover={{ bg: "gray.200", color: "black" }}
          p="0"
          borderBottom="2px"
          borderColor="gray.200"
          color="gray.600"
        >
          <Flex
            align={"center"}
            justify="space-between"
            w="100%"
            _hover={{ bg: "gray.200" }}
            p="11px 15px"
          >
            <p className=" font-bold bg-transparent">Find Job</p>
            <Icon as={AiOutlineRight} bg="transparent" />
          </Flex>
        </MenuItem>

        <MenuItem
          bg={"white"}
          _hover={{ bg: "gray.200", color: "black" }}
          p="0"
          borderBottom="2px"
          borderColor="gray.200"
          color="gray.600"
          //   borderBottom="2px"
          //   borderColor="gray.200"
        >
          <Flex
            align={"center"}
            justify="space-between"
            w="100%"
            _hover={{ bg: "gray.200" }}
            p="11px 15px"
          >
            <p className=" font-bold bg-transparent"> Create your CV </p>
            <Icon as={AiOutlineRight} bg="transparent" />
          </Flex>
        </MenuItem>
        <MenuItem
          bg={"white"}
          _hover={{ bg: "gray.200", color: "black" }}
          p="0"
          borderBottom="2px"
          borderColor="gray.200"
          color="gray.600"
        >
          <Link href="/employee" className="w-full">
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
        {user && (
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
              mx="4px"
              _hover={{ bg: "blue.100" }}
              p="11px 15px"
              onClick={handleLogout}
            >
              <p className="font-bold bg-transparent text-primary-dark ">
                Sign Out
              </p>
            </Flex>
          </MenuItem>
        )}
      </MenuList>
    </ChakraMenu>
  );
};
export default Menu;
