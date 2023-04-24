import React from "react";
import {
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Icon,
  Flex,
  Menu as ChakraMenu,
} from "@chakra-ui/react";
import { HiChevronDown } from "react-icons/hi";
import { statusColor } from "@/utils/constant";

type StageMenuProps = {
  Status?: string;
  updateStatus: (value: string) => void;
  children: any;
};

const StageMenu: React.FC<StageMenuProps> = ({
  Status,
  updateStatus,
  children,
}) => {
  return (
    <ChakraMenu size="sm">
      <MenuButton>{children}</MenuButton>
      <MenuList
        zIndex={"40"}
        bg={"white"}
        padding={"4px"}
        display="flex"
        flexDirection="column"
        gap={2}
        shadow={"xl"}
      >
        <p className=" text-xs uppercase tracking-wide px-4 mt-2">
          Current stage
        </p>
        <MenuItem>
          <button type="button" className=" flex gap-2 items-center">
            <div
              className={`${
                statusColor[Status ?? "new applied"]
              } h-3 w-3 rounded-full`}
            />
            <p className=" capitalize">{Status}</p>
          </button>
        </MenuItem>

        <p className=" text-xs uppercase tracking-wide px-4 mt-2">Move to</p>
        <MenuItem onClick={() => updateStatus("decline")}>
          <button type="button" className=" flex gap-2 items-center">
            <div className={`bg-red-500 h-3 w-3 rounded-full`} />
            <p>Decline</p>
          </button>
        </MenuItem>
        <MenuItem onClick={() => updateStatus("screening")}>
          <button type="button" className=" flex gap-2 items-center">
            <div className={`bg-indigo-500 h-3 w-3 rounded-full`} />
            <p>Screening</p>
          </button>
        </MenuItem>
        <MenuItem onClick={() => updateStatus("interview")}>
          <button type="button" className=" flex gap-2 items-center">
            <div className={`bg-blue-500 h-3 w-3 rounded-full`} />
            <p>Interview</p>
          </button>
        </MenuItem>
        <MenuItem onClick={() => updateStatus("offer")}>
          <button type="button" className=" flex gap-2 items-center">
            <div className={` bg-cyan-500 h-3 w-3 rounded-full`} />
            <p>Offer</p>
          </button>
        </MenuItem>
        <MenuItem onClick={() => updateStatus("hired")}>
          <button type="button" className=" flex gap-2 items-center">
            <div className={`bg-green-500 h-3 w-3 rounded-full`} />
            <p>Hired</p>
          </button>
        </MenuItem>
      </MenuList>
    </ChakraMenu>
  );
};
export default StageMenu;
