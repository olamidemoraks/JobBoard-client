import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoCloudUpload, IoEye, IoEyeOff, IoTrashSharp } from "react-icons/io5";
import { UseMutationResult } from "react-query";

type ProfileMenuProps = {
  resume: any;
  mutation: UseMutationResult;
};

const ProfileMenu: React.FC<ProfileMenuProps> = ({ resume, mutation }) => {
  const handleChangePrivacy = () => {
    const value = {
      Visibility: !resume.Visibility,
    };
    mutation.mutate({ data: value });
  };
  return (
    <Menu>
      <MenuButton>
        <div className=" border border-gray-300 flex items-center rounded-[7px]">
          {resume?.Visibility ? (
            <div className="flex flex-row gap-2 items-center  font-bold px-2 py-2">
              <IoEye /> <p>Public</p>
            </div>
          ) : (
            <div className="flex flex-row gap-2 items-center font-bold px-3 py-2">
              <IoEyeOff /> <p>Private</p>
            </div>
          )}
          <div className="p-2 border-l border-l-gray-300">
            <HiOutlineDotsVertical />
          </div>
        </div>
      </MenuButton>
      <MenuList
        shadow="md"
        bg={"white"}
        width="250px"
        display={"flex"}
        flexDirection="column"
        gap="4px"
      >
        <MenuItem
          bg={"white"}
          display="flex"
          gap="6px"
          alignItems="center"
          _hover={{ bg: "gray.200", color: "black" }}
          color="gray.600"
          px="7px"
          py="4px"
          onClick={handleChangePrivacy}
        >
          <IoEye /> Privacy
        </MenuItem>
        <MenuItem
          bg={"white"}
          display="flex"
          gap="6px"
          alignItems="center"
          _hover={{ bg: "gray.200", color: "black" }}
          color="gray.600"
          px="7px"
          py="4px"
        >
          <IoCloudUpload /> Upload personal resume
        </MenuItem>
        <MenuItem
          bg={"white"}
          display="flex"
          gap="6px"
          alignItems="center"
          _hover={{ bg: "gray.200", color: "red.600" }}
          color="red.500"
          px="7px"
          py="4px"
        >
          <IoTrashSharp /> Delete my WiHire resume
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
export default ProfileMenu;
