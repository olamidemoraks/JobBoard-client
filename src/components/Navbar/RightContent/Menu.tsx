import React, { useState, useEffect } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { AiOutlineRight } from "react-icons/ai";
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
import { useQueryClient, useQuery } from "react-query";
import useProfile from "@/hooks/useProfile";
import { useLogoutMutation } from "@/feature/auth/authApiSlice";
import { getProfile } from "@/app/apiQuery";

const Menu: React.FC<MenuProps> = ({ user }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const location = router.pathname;
  const [loggedOut, setLoggedOut] = useState(false);
  const { data, isLoading } = useQuery<Profile>("profile", getProfile, {
    onSuccess: (data: any) => {
      if (data?.isError === true) {
        queryClient.setQueriesData("profile", emptyResponse);
      }
    },
  });
  console.log("Logged out", loggedOut);

  const { email } = useProfile();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    // googleLogout();
    setLoggedOut(true);
    // router.push("/auth");
    // dispatch(logout({}));
  };

  useEffect(() => {
    if (loggedOut) {
      router.push("/auth");
      dispatch(logout({}));
      setTimeout(() => {
        queryClient.invalidateQueries();
        console.log("Logged out");
      }, 1000);
      setLoggedOut(false);
    }
  }, [loggedOut]);
  return (
    <ChakraMenu>
      <MenuButton
        bg={"transparent"}
        display="flex"
        alignItems="center"
        justifyItems="center"
        as={Button}
        _hover={{ bg: "transparent" }}
        _active={{ bg: "transparent" }}
      >
        <div className="w-[2.4rem] h-[2.4rem] text-lg rounded-xl uppercase border-2 border-emerald-600 bg-indigo-500 text-white flex items-center justify-center">
          {data?.FName[0]}
        </div>
      </MenuButton>
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
                <div className="w-[2.4rem] h-[2.4rem] text-lg rounded-xl uppercase border-2 border-emerald-600 bg-indigo-500 text-white flex items-center justify-center">
                  {data?.FName[0]}
                </div>
                <div className="flex flex-col">
                  <p className=" font-semibold bg-transparent">{email}</p>
                  <p className=" text-zinc-600">
                    {data?.FName} {data?.LName}
                  </p>
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
              <p className=" font-bold bg-transparent">
                {" "}
                Continue as Employer{" "}
              </p>
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
