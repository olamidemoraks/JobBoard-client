import React, { useState, useEffect } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { AiOutlineRight, AiOutlineLogout } from "react-icons/ai";
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
import { Profile } from "@/type/types";

const Menu: React.FC<MenuProps> = ({ user }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const location = router.pathname;
  const emptyResponse: any = [];
  const [loggedOut, setLoggedOut] = useState(false);
  const { data, isLoading } = useQuery<Profile>("profile", getProfile, {
    onSuccess: (data: any) => {
      if (data?.isError === true) {
        queryClient.setQueriesData("profile", emptyResponse);
      }
    },
  });

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
        {user ? (
          <div className="w-[2.4rem] h-[2.4rem] text-lg rounded-xl uppercase border-2 border-emerald-600 bg-emerald-600  text-white flex items-center justify-center">
            {data?.FName?.[0]}
          </div>
        ) : (
          <HiMenuAlt2
            className={`${location === "/" ? "fill-white" : "fill-black"}`}
            size={23}
          />
        )}
      </MenuButton>
      <MenuList shadow="md" bg={"white"} minWidth="350px" p={"6px"} zIndex={20}>
        {user && (
          <MenuItem
            bg={"white"}
            _hover={{ bg: "gray.200", color: "black" }}
            borderBottom="2px"
            borderColor="gray.200"
            borderRadius={6}
            color="gray.600"
          >
            <Link href="/profile" className="w-full">
              <Flex
                align={"start"}
                gap="8px"
                w="100%"
                _hover={{ bg: "gray.200" }}
              >
                <div className="w-[2.4rem] h-[2.4rem] text-lg rounded-xl uppercase border-2 border-emerald-600 bg-emerald-600 text-white flex items-center justify-center">
                  {data?.FName?.[0]}
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
            borderRadius={6}
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
              </Flex>
            </Link>
          </MenuItem>
        )}
        {!user ? (
          <MenuItem
            bg={"white"}
            _hover={{ bg: "gray.200", color: "black" }}
            borderRadius={6}
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
              </Flex>
            </Link>
          </MenuItem>
        ) : null}
        <MenuItem
          bg={"white"}
          _hover={{ bg: "gray.200", color: "black" }}
          borderRadius={6}
          color="gray.600"
        >
          <Link href="/jobs">
            <Flex
              align={"center"}
              justify="space-between"
              w="100%"
              _hover={{ bg: "gray.200" }}
              p="11px 15px"
            >
              <p className=" font-bold bg-transparent">Find Job</p>
            </Flex>
          </Link>
        </MenuItem>

        <MenuItem
          bg={"white"}
          _hover={{ bg: "gray.200", color: "black" }}
          borderRadius={6}
          color="gray.600"
          //   borderBottom="2px"
          //   borderColor="gray.200"
        >
          <Link href={user ? "/profile" : "/auth"}>
            <Flex
              align={"center"}
              justify="space-between"
              w="100%"
              _hover={{ bg: "gray.200" }}
              p="11px 15px"
            >
              <p className=" font-bold bg-transparent"> Create your CV </p>
            </Flex>
          </Link>
        </MenuItem>
        <MenuItem
          bg={"white"}
          _hover={{ bg: "gray.200", color: "black" }}
          borderRadius={6}
          color="gray.600"
        >
          <Link href={user ? "/employee" : "/auth"} className="w-full">
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
            </Flex>
          </Link>
        </MenuItem>
        {user && (
          <MenuItem
            bg={"white"}
            _hover={{ bg: "gray.200" }}
            borderRadius={6}
            borderTop="2px"
            borderColor="gray.200"
          >
            <Flex
              align={"center"}
              justify={"center"}
              gap={3}
              w="100%"
              mx="4px"
              p="11px 15px"
              onClick={handleLogout}
            >
              <p className="font-bold bg-transparent text-primary-dark ">
                Log Out
              </p>
              <AiOutlineLogout size={20} />
            </Flex>
          </MenuItem>
        )}
      </MenuList>
    </ChakraMenu>
  );
};
export default Menu;
