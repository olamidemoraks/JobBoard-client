import {
  createSavedJobs,
  getCompanyById,
  getMainJob,
  getSavedJobs,
  removeSavedJobs,
} from "@/app/apiQuery";
import Loader from "@/components/Utils/Loader";
import useSaved from "@/hooks/useSaved";
import { Company, Job } from "@/type/types";
import { currency, frequently } from "@/utils/constant";
import {
  Box,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Accordion,
  ModalFooter,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";
import { BsDot } from "react-icons/bs";
import {
  HiBookmark,
  HiChevronDown,
  HiChevronUp,
  HiHeart,
  HiOutlineBookmark,
  HiOutlineHeart,
} from "react-icons/hi";
import { IoCheckmarkCircle, IoPeople, IoPersonOutline } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from "react-query";

type CompanyModalsProps = {
  open: boolean;
  handleClose: () => void;
  companyId: string;
  jobId: string;
  handleJobModel: (cid: string, jid: string) => void;
};

const CompanyModals: React.FC<CompanyModalsProps> = ({
  open,
  handleClose,
  companyId,
  jobId,
  handleJobModel,
}) => {
  console.log("modal company id", companyId);
  const { data: company, isLoading } = useQuery<Company>(
    "getCompany",
    async () => {
      return getCompanyById(companyId);
    },
    { refetchOnWindowFocus: false, enabled: !!companyId }
  );
  console.log(company);
  const { data: Job, isLoading: jobLoading } = useQuery<Job>(
    "job",
    async () => {
      return getMainJob(jobId);
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!jobId,
    }
  );

  const { data: savedJobs } = useQuery("saved", getSavedJobs);
  const queryClient = useQueryClient();
  const mutation = useMutation(createSavedJobs, {
    onSettled: () => {
      queryClient.invalidateQueries("saved");
    },
  });

  const { handleSaveOrUnsaveJob, isSaved } = useSaved({
    jobId: jobId,
    savedJobs: savedJobs,
    mutation: mutation,
  });

  const [isCompanyDrawer, setIsCompanyDrawer] = useState(false);

  const saveJob = Array.isArray(savedJobs)
    ? savedJobs?.find((saveJob: any) => saveJob._id === Job?._id)
    : {};
  let jobContent;

  if (jobLoading) {
    jobContent = <p>Loading...</p>;
  }
  if (!jobLoading) {
    jobContent = (
      <div className=" border border-gray-200 p-3 flex md:flex-row flex-col justify-between rounded-[5px] ">
        <div
          className="flex flex-col flex-1 flex-wrap gap-[2px]  cursor-pointer text-[14px]"
          onClick={() => handleJobModel(Job!.CId, Job!._id)}
        >
          <div>
            <p className=" capitalize text-[15px] font-black md:mr-6 md:mb-0 mb-2">
              {Job?.Title}
            </p>
            <div className="flex gap-3 flex-wrap">
              {Job?.Skills.map((skill, idx) => (
                <p
                  key={idx}
                  className="text-[12px] text-gray-600 bg-gray-300 rounded-[9px] px-2"
                >
                  {skill}
                </p>
              ))}
            </div>
          </div>
          <div className="flex  gap-[2px] items-center capitalize">
            <p className="text-zink-400  text-[13px] font-semibold">
              <span>{frequently[Job?.frequency ?? "mo"]}: </span>
              {currency[Job?.currency ?? "USD"] === "N" ? (
                <span>&#8358;</span>
              ) : (
                currency[Job?.currency ?? "USD"]
              )}
              {Job?.PayMin.toLocaleString()}-{" "}
              {currency[Job?.currency ?? "USD"] === "N" ? (
                <span>&#8358;</span>
              ) : (
                currency[Job?.currency ?? "USD"]
              )}
              {Job?.PayMax.toLocaleString()}
            </p>

            {Job?.isRemote && <p className="text-black/70">- Remote</p>}
            {Job?.Address && <p className="text-black/70">- {Job.Address}</p>}
          </div>
        </div>

        <div className="flex md:flex-row flex-col md:items-center gap-2 justify-end">
          <p className="text-[10px] font-bold text-green-700 uppercase">
            {`Posted ${moment(Job?.createdAt).fromNow()}`}
          </p>
          <div className="flex gap-2 w-full justify-end md:w-max text-[14px]">
            <button
              className="px-2 py-2  border-gray-300 border rounded-[4px] "
              onClick={() => handleSaveOrUnsaveJob(Job!._id)}
            >
              {isSaved ? (
                <HiBookmark className=" text-[18px] " />
              ) : (
                <HiOutlineBookmark className=" text-[18px] " />
              )}
            </button>
            <button
              className="px-2 py-2 bg-black text-white rounded-[4px] md:w-max w-full"
              onClick={() => handleJobModel(Job!.CId, Job!._id)}
            >
              Learn more
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <Modal isOpen={open} onClose={handleClose} size="6xl">
        <ModalOverlay />
        <ModalContent bg="white" height="80vh">
          <ModalBody>
            <div className="flex justify-center items-center h-full">
              <Loader />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }
  return (
    <Modal isOpen={open} onClose={handleClose} size="6xl">
      <ModalOverlay />
      <ModalContent bg="white">
        <ModalHeader shadow="lg">
          <div className="flex gap-3 cursor-pointer">
            <div className=" h-12 w-12 rounded-md">
              <img
                loading="lazy"
                className=" h-full w-full object-cover rounded-md"
                src={`${process.env.NEXT_PUBLIC_BASEURL}/company/${company?.Logo}`}
                alt=""
              />
            </div>
            <div className="flex flex-col gap-1 w-[90%]">
              <p className=" font-black text-[17px]">{company?.CompanyName}</p>
              <p className=" text-gray-700 text-[14px]">
                {company?.CompanySnippet}
              </p>
              <div className="flex text-neutral-500 items-center gap-1 uppercase text-[12px]">
                <IoPeople />
                <p>{company?.CompanySize?.split(" to ").join("-")} Employees</p>
              </div>
            </div>
          </div>
        </ModalHeader>
        <Box overflowY={"scroll"} maxHeight="70vh">
          <ModalBody>
            <div className="flex gap-4 my-3 md:flex-row flex-col">
              <div className="flex-1 flex flex-col">
                <div className="flex gap-1 bg-green-600/20 text-green-900 p-[3px] px-2 rounded-[30px] text-xs items-center uppercase w-max mb-2">
                  <IoCheckmarkCircle className=" text-base" />{" "}
                  <p>actively hiring</p>
                </div>
                <div>{company?.CompanyDesc}</div>
              </div>
              <div className="flex-[0.3] border border-gray-200 rounded-[7px] md:flex p-3 gap-2 flex-col hidden">
                <div className="flex flex-col gap-1">
                  <p className=" font-black">Website</p>
                  <a className=" text-blue-700 text-sm" href={company?.Url}>
                    {company?.Url}
                  </a>
                </div>
                <div className="flex flex-col gap-1">
                  <p className=" font-black">Location</p>
                  <p className="text-sm">{company?.Location}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className=" font-black">Company size</p>
                  <p className="text-sm">{company?.CompanySize} people</p>
                </div>
              </div>
              <div className="p-4 bg-gray-100 border border-gray-200 rounded-md md:hidden block">
                <div
                  className="flex justify-between w-full cursor-pointer"
                  onClick={() => setIsCompanyDrawer((prev: any) => !prev)}
                >
                  <p className=" text-sm ">Company details</p>{" "}
                  {isCompanyDrawer ? <HiChevronUp /> : <HiChevronDown />}{" "}
                </div>
                {isCompanyDrawer && (
                  <div className="flex-[0.3] rounded-[7px] py-2 gap-[12px] flex-col flex mt-3">
                    <div className="flex flex-col gap-1">
                      <p className="font-black text-sm">Website</p>
                      <a className=" text-blue-700 text-sm" href={company?.Url}>
                        {company?.Url} chippyvibe.com
                      </a>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className=" font-black text-sm">Location</p>
                      <p className="text-sm">
                        {/* {company?.Location}   */}
                        Cambridge
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className=" font-black text-sm">Company size</p>
                      <p className="text-sm">{company?.CompanySize} people</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Divider />
            <div className=" flex flex-col gap-3 my-4">
              <p className=" font-black">Job for you</p>
              {jobContent}
            </div>
            <Divider />
            <div className=" flex flex-col gap-3 my-4">
              <p className=" font-black">Founders</p>
              <div className=" border border-gray-200 rounded-[5px] p-4 min-h-[100px] md:w-[500px] w-full flex justify-between items-start">
                <div className="flex flex-col">
                  <p className=" font-bold text-sm"> {company?.Name}</p>
                  <p className=" text-sm">{company?.Title}</p>
                </div>
                <div className=" h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                  <IoPersonOutline color="#fff" />
                </div>
              </div>
            </div>
          </ModalBody>
        </Box>
        <ModalFooter borderTop="1px" borderTopColor="gray.200">
          <div>
            <button
              className="px-2 py-[4px]  border-black border rounded-[4px] "
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default CompanyModals;
