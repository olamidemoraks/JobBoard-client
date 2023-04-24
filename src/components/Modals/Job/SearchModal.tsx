import SavedFilters from "@/components/Job/SeachFilter/SavedFilters";
import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Switch,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineLaptop } from "react-icons/ai";
import { BiTargetLock } from "react-icons/bi";
import { HiBriefcase, HiOfficeBuilding, HiX } from "react-icons/hi";
import { IoAdd } from "react-icons/io5";

import { MdGraphicEq } from "react-icons/md";

type SearchModalProps = {
  open: boolean;
  handleClose: () => void;
  location: string;
  title: string;
  setTitle: (value: string) => void;
  setLocation: (value: string) => void;
};

const SearchModal: React.FC<SearchModalProps> = ({
  open,
  handleClose,
  title,
  location,
  setLocation,
  setTitle,
}) => {
  const router = useRouter();
  const { query } = router;

  const [salary, setSalary] = useState({
    min: 0,
    max: 100000,
  });
  const [experience, setExperience] = useState({
    min: 0,
    max: 12,
  });
  const [jobType, setJobType] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [skill, setSkill] = useState("");
  const [isRemote, setIsRemote] = useState<boolean>();

  const handleJobType = (values: string) => {
    setJobType((props: any) => {
      if (props?.includes(values)) {
        return props?.filter((value: string) => value !== values);
      } else {
        return props?.concat(values);
      }
    });
  };
  const handleSkills = (values: string) => {
    setSkills((props: any) => {
      if (props.includes(values)) {
        return props.filter((value: string) => value !== values);
      } else {
        return props.concat(values);
      }
    });
  };
  const handleSubmitSkill = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!skill) return;
    setSkills((props: any) => {
      if (props.includes(skill)) {
        return props.filter((value: string) => value !== skill);
      } else {
        return props.concat(skill);
      }
    });
    setSkill("");
  };

  const handleSubmitSearch = () => {
    const path = router.pathname;
    query["Title"] = title;
    query["Address"] = location;
    if (salary.min > 0 || salary.max < 100000) {
      query["PayMin"] = salary.min.toString();
      query["PayMax"] = salary.max.toString();
    }
    if (experience.min > 1 || experience.max < 12) {
      query["Experience[gte]"] = experience.min.toString();
      query["Experience[lte]"] = experience.max.toString();
    }
    if (jobType.length > 0) {
      query["EmploymentType"] = jobType.join(" ");
    }
    if (skills.length > 0) {
      query["Skills"] = skills.join(" ");
    }
    if (isRemote !== undefined) {
      query["isRemote"] = isRemote.toString();
    }

    router.push({ pathname: path, query });
    handleClose();
  };

  return (
    <Modal isOpen={open} onClose={handleClose} size="4xl">
      <ModalOverlay />
      <ModalContent height="89vh" overflowY="scroll">
        <div className="flex items-center md:flex-row flex-col gap-4 p-4 ">
          <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 w-full gap-2 h-10">
            <HiBriefcase className=" text-gray-400 text-[20px]" />
            <input
              type="text"
              className="w-full outline-none placeholder:text-gray-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a job title"
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 w-full  gap-2 h-10">
            <HiOfficeBuilding className=" text-gray-400 text-[19px]" />
            <input
              type="text"
              className="w-full outline-none placeholder:text-gray-400"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Add a location"
            />
          </div>
        </div>
        <div className="px-4 pb-4 sticky top-0 bg-white z-40">
          <SavedFilters />
        </div>
        <div className="p-4 flex md:flex-row flex-col w-full gap-4 border-t border-t-gray-300">
          <div className="w-full flex flex-col gap-2 border border-gray-200 rounded-md p-4 hover:bg-gray-200/70 hover:border-blue-600">
            <p className=" font-black mb-2">Salary</p>
            <p className=" text-gray-400 text-sm">
              ${salary.min}k-${salary.max}k
            </p>
            <RangeSlider
              onChangeEnd={(value) =>
                setSalary(() => ({ min: value[0], max: value[1] }))
              }
              aria-label={["min", "max"]}
              defaultValue={[0, 100000]}
              min={0}
              max={100000}
              step={100}
            >
              <RangeSliderTrack bg="gray.200">
                <RangeSliderFilledTrack bg={"teal.500"} />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} boxSize={4} bg={"teal.500"} />
              <RangeSliderThumb index={1} boxSize={4} bg={"teal.500"} />
            </RangeSlider>
          </div>

          <div className="w-full flex flex-col gap-2 border border-gray-200 rounded-md p-4 hover:bg-gray-200/70 hover:border-blue-600">
            <p className=" font-black mb-2">Required Experience</p>
            <p className=" text-gray-400 text-sm">
              {experience.min}-{experience.max} years+
            </p>
            <RangeSlider
              onChangeEnd={(value) =>
                setExperience(() => ({
                  min: value[0],
                  max: value[1],
                }))
              }
              aria-label={["min", "max"]}
              defaultValue={[0, 12]}
              min={0}
              max={12}
              step={1}
            >
              <RangeSliderTrack bg="gray.200">
                <RangeSliderFilledTrack bg={"teal.500"} />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} boxSize={4} bg={"teal.500"} />
              <RangeSliderThumb index={1} boxSize={4} bg={"teal.500"} />
            </RangeSlider>
          </div>
        </div>

        <div className="p-4 flex flex-col md:flex-row w-full gap-4 border-t border-t-gray-300 h-full">
          <div className="w-full flex flex-col gap-2 min-h-max">
            <div className="flex gap-2  text-[17px] items-center font-black">
              <AiOutlineLaptop /> <p>Job Detail</p>
            </div>
            <div className="w-full flex flex-col gap-2 border border-gray-200 rounded-md p-4 hover:bg-gray-200/70 hover:border-blue-600 h-full">
              <p>Job type</p>

              <div className="flex flex-col gap-1">
                <label className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={jobType.includes("Full-Time")}
                    className="h-4 w-4"
                    onChange={() => handleJobType("Full-Time")}
                  />
                  Full Time
                </label>
                <label className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    checked={jobType.includes("Part-Time")}
                    className="h-4 w-4"
                    onChange={() => handleJobType("Part-Time")}
                  />
                  Part Time
                </label>
                <label className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    checked={jobType.includes("Permanent")}
                    className="h-4 w-4"
                    onChange={() => handleJobType("Permanent")}
                  />
                  Permanent
                </label>
                <label className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    checked={jobType.includes("Contract")}
                    className="h-4 w-4"
                    onChange={() => handleJobType("Contract")}
                  />
                  Contract
                </label>
                <label className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    checked={jobType.includes("Temporary")}
                    className="h-4 w-4"
                    onChange={() => handleJobType("Temporary")}
                  />
                  Temporary
                </label>
                <label className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    checked={jobType.includes("Internship")}
                    className="h-4 w-4"
                    onChange={() => handleJobType("Internship")}
                  />
                  Internship
                </label>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2">
            <div className="flex text-[17px] items-center font-black gap-2">
              <BiTargetLock /> <p>Area of interest</p>
            </div>
            <div className="w-full flex flex-col gap-2 border border-gray-200 rounded-md p-4 hover:bg-gray-200/70 hover:border-blue-600 max-h-[450px] overflow-y-scroll">
              <form
                onSubmit={(event) => {
                  handleSubmitSkill(event);
                }}
              >
                <div className=" border border-gray-300 rounded-md px-2 py-1 w-fullh-10 bg-white">
                  <input
                    type="text"
                    className="w-full outline-none placeholder:text-gray-400"
                    placeholder="Type to search"
                    value={skill}
                    onChange={(event) => setSkill(event.target.value)}
                  />
                </div>
                <button className="hidden" type="submit">
                  click
                </button>
              </form>
              <div>
                <p className=" text-sm text-gray-300 capitalize">Selected</p>
                <div className="flex flex-col gap-1">
                  {skills.map((value) => (
                    <div
                      className="flex items-center justify-between"
                      key={value}
                    >
                      <p className=" capitalize">{value}</p>
                      <HiX
                        className=" text-blue-500 cursor-pointer text-[18px]"
                        onClick={() => handleSkills(value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className=" flex flex-col gap-1">
                <p className=" text-sm text-gray-300 capitalize">Pupular</p>
                <div className="flex items-center justify-between">
                  <p>Python</p>{" "}
                  {skills.includes("python") ? (
                    <HiX
                      className=" text-blue-500 cursor-pointer text-[18px]"
                      onClick={() => handleSkills("python")}
                    />
                  ) : (
                    <IoAdd
                      className=" text-blue-500 cursor-pointer text-[18px]"
                      onClick={() => handleSkills("python")}
                    />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p>React.js</p>{" "}
                  {skills.includes("react.js") ? (
                    <HiX
                      className=" text-blue-500 cursor-pointer text-[18px]"
                      onClick={() => handleSkills("react.js")}
                    />
                  ) : (
                    <IoAdd
                      className=" text-blue-500 cursor-pointer text-[18px]"
                      onClick={() => handleSkills("react.js")}
                    />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p>Node.js</p>{" "}
                  {skills.includes("node.js") ? (
                    <HiX
                      className=" text-blue-500 cursor-pointer text-[18px]"
                      onClick={() => handleSkills("node.js")}
                    />
                  ) : (
                    <IoAdd
                      className=" text-blue-500 cursor-pointer text-[18px]"
                      onClick={() => handleSkills("node.js")}
                    />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p>Java</p>{" "}
                  {skills.includes("java") ? (
                    <HiX
                      className=" text-blue-500 cursor-pointer text-[18px]"
                      onClick={() => handleSkills("java")}
                    />
                  ) : (
                    <IoAdd
                      className=" text-blue-500 cursor-pointer text-[18px]"
                      onClick={() => handleSkills("java")}
                    />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p>Ruby on Rails</p>{" "}
                  {skills.includes("ruby on rails") ? (
                    <HiX
                      className=" text-blue-500 cursor-pointer text-[18px]"
                      onClick={() => handleSkills("ruby on rails")}
                    />
                  ) : (
                    <IoAdd
                      className=" text-blue-500 cursor-pointer text-[18px]"
                      onClick={() => handleSkills("ruby on rails")}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="md:w-[50%] w-full  flex flex-col gap-2 border border-gray-200 rounded-md p-4 hover:bg-gray-200/70 hover:border-blue-600 max-h-[450px] ">
            <p className=" font-black">Remote culture</p>

            <div className="flex items-center gap-2">
              <Switch
                isChecked={isRemote === true ? true : false}
                onChange={() =>
                  setIsRemote((prev: any) => {
                    if (prev === null) return true;
                    else {
                      return !prev;
                    }
                  })
                }
              />
              Only show jobs at companies that are mostly or fully remote
            </div>
          </div>
        </div>
        <ModalFooter position="sticky" bottom={"0"} right="0">
          <button
            className=" bg-black text-white px-2 py-[2px] rounded-[5px]"
            onClick={handleSubmitSearch}
          >
            view results
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default SearchModal;
