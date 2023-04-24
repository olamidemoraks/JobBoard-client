import {
  createSavedJobs,
  getCompanyById,
  getMainJob,
  getSavedJobs,
  getUserAppication,
  removeSavedJobs,
} from "@/app/apiQuery";
import { useAppDispatch } from "@/app/hooks";
import Loader from "@/components/Utils/Loader";
import { openApplyModal } from "@/feature/job/jobSlice";
import useSaved from "@/hooks/useSaved";
import { Company, Job } from "@/type/types";
import { currency, frequently } from "@/utils/constant";
import {
  Box,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  HiBookmark,
  HiChevronDown,
  HiChevronUp,
  HiOutlineBookmark,
} from "react-icons/hi";
import {
  IoCheckmarkCircle,
  IoPersonOutline,
  IoBriefcase,
} from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from "react-query";
import ApplyJobModal from "./ApplyJobModal";

type JobModalProps = {
  open: boolean;
  handleClose: () => void;
  jobId: string;
  companyId: string;
};

const JobModal: React.FC<JobModalProps> = ({
  open,
  handleClose,
  jobId,
  companyId,
}) => {
  const emptyResponse: any = [];
  const dispatch = useAppDispatch();
  const { data: savedJobs } = useQuery("saved", getSavedJobs);
  const queryClient = useQueryClient();
  const mutation = useMutation(createSavedJobs, {
    onSettled: () => {
      queryClient.invalidateQueries("saved");
    },
  });

  //get if already applied
  const { data: userApplication } = useQuery("application", getUserAppication, {
    onSuccess: (data) => {
      if (data.isError === true) {
        queryClient.setQueriesData("application", emptyResponse);
      }
    },
  });

  console.log("user application", userApplication);

  const alreadyApplied = !!userApplication?.find(
    (application: any) => application.JId === jobId
  );
  const { data: company, isLoading } = useQuery<Company>(
    "getCompany",
    async () => {
      return getCompanyById(companyId);
    },
    { refetchOnWindowFocus: false, enabled: !!companyId }
  );

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

  const [isDrawer, setIsDrawer] = useState(false);
  const [isCompanyDrawer, setIsCompanyDrawer] = useState(false);
  const handleApplyModal = () => {
    dispatch(openApplyModal({ data: true }));
  };

  const { handleSaveOrUnsaveJob, isSaved } = useSaved({
    jobId: jobId,
    savedJobs: savedJobs,
    mutation: mutation,
  });

  const saveJob = Array.isArray(savedJobs)
    ? savedJobs?.find((saveJob: any) => saveJob._id === Job?._id)
    : {};

  let companyContent;
  if (isLoading || !company) {
    companyContent = (
      <div className=" bg-gray-200 w-full p-5 flex justify-center items-center">
        <p>Loading....</p>
      </div>
    );
  }
  if (!isLoading) {
    companyContent = (
      <div className=" bg-gray-200 w-full py-5 lg:px-7 px-3">
        <p className="mb-3 font-black">About {company?.CompanyName}</p>
        <div className="p-4  rounded-[4px] bg-white">
          <div className="flex gap-3 cursor-pointer">
            <div className="sm:h-12 sm:w-12 h-8 w-8 rounded-md">
              <img
                className=" h-full w-full object-cover rounded-md"
                src="/images/female.jpg"
                alt=""
              />
            </div>
            <div className="flex flex-col flex-1">
              <p className=" font-black text-[17px]">{company?.CompanyName}</p>
              <p className=" text-gray-700 text-[14px]">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit
              </p>
            </div>
          </div>
          <div className="flex gap-4 my-3 flex-col md:flex-row">
            <div className="flex-1 flex flex-col ">
              <div className="flex gap-1 bg-green-600/20 text-green-900 p-[3px] px-2 rounded-[30px] text-xs items-center uppercase w-max mb-2">
                <IoCheckmarkCircle className=" text-base" />{" "}
                <p>actively hiring</p>
              </div>
              <div className="">
                {/* company description */}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                quisquam earum, vitae omnis consequatur minus voluptatum! Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Officia autem
                facilis libero. Esse, sequi eum.
              </div>
            </div>
            <div className="flex-[0.3] border border-gray-200 rounded-[7px] hidden px-4 py-2 gap-[10px] flex-col md:flex">
              <div className="flex flex-col gap-1">
                <p className="font-black">Website</p>
                <a className=" text-blue-700 text-sm" href={company?.Url}>
                  {company?.Url} chippyvibe.com
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <p className=" font-black">Location</p>
                <p className="text-sm">
                  {/* {company?.Location}   */}
                  Cambridge
                </p>
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
                    <p className="text-sm">{company?.Location}</p>
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
            <p className=" font-black">Founders</p>
            <div className=" border border-gray-200 rounded-[5px] p-4 min-h-[100px] md:w-[500px] w-full flex justify-between items-start">
              <div className="flex flex-col flex-1">
                <p className=" font-bold text-sm"> {company?.Name}</p>
                <p className=" text-sm">{company?.Title}</p>
              </div>
              <div className=" h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                <IoPersonOutline color="#fff" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (jobLoading) {
    return (
      <Modal isOpen={open} onClose={handleClose} size="6xl">
        <ModalOverlay />
        <ModalContent bg="white" height="80vh">
          <ModalBody>
            <div className="flex items-center justify-center mt-3 h-full">
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
        <ModalHeader shadow="sm">
          <ApplyJobModal
            Job={Job}
            company={company}
            alreadyApplied={alreadyApplied}
          />

          <div className="flex justify-between w-full">
            <div className="flex gap-3 cursor-pointer">
              <div className=" h-12 w-12 rounded-md">
                <img
                  className=" h-full w-full object-cover rounded-md"
                  src="/images/female.jpg"
                  alt=""
                />
              </div>
              <div className="flex flex-col w-[90%]  flex-1">
                <p className="font-black text-[17px]">{Job?.Title}</p>
                <p className=" text-sm text-green-800">
                  {Job?.Applicants} applicants
                </p>
                <p className="text-gray-600 text-sm font-normal">
                  {currency[Job?.currency ?? "USD"]}
                  {Job?.PayMin?.toLocaleString()} -{" "}
                  {currency[Job?.currency ?? "USD"]}
                  {Job?.PayMax?.toLocaleString()}{" "}
                  <span className=" text-sm">
                    {frequently[Job?.frequency ?? "yr"]}
                  </span>
                </p>
              </div>
            </div>
            <div className="md:block hidden">
              <div className="flex gap-2 w-full justify-end md:w-max">
                <button
                  className="px-4 py-1 text-base  border-black border rounded-[4px] font-normal hover:border-blue-800 hover:text-blue-800"
                  onClick={() => handleSaveOrUnsaveJob(Job!._id)}
                >
                  {isSaved ? (
                    <HiBookmark className=" text-[18px] " />
                  ) : (
                    <HiOutlineBookmark className=" text-[18px] " />
                  )}
                </button>
                <button
                  className="px-4 py-1 font-normal bg-black text-gray-50 rounded-[4px] w-max text-base hover:bg-blue-800"
                  onClick={handleApplyModal}
                >
                  {alreadyApplied ? "Applied" : "Apply"}
                </button>
              </div>
            </div>
          </div>
        </ModalHeader>
        <Box overflowY={"scroll"} maxHeight="70vh">
          <div className="flex gap-4 my-9 md:flex-row flex-col px-7">
            <div className="flex-1 flex flex-col ">
              <p className=" font-black">Job Description</p>
              <div className="">
                {/* job description */}
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusamus cumque aspernatur fugiat quam. Atque cum repudiandae
                doloremque fuga vel eaque nobis. Similique consectetur hic
                cumque, et optio modi omnis laboriosam earum sed? Voluptatem,
                eius tempora. Beatae illum temporibus, porro optio minus ex
                expedita, aut cupiditate quo saepe doloremque, natus adipisci
                sapiente provident sit commodi est perspiciatis dolorum eius
                molestias deserunt voluptatum cumque molestiae. Eos, temporibus
                doloribus nisi hic voluptates ratione repellat recusandae. Culpa
                commodi vel, nihil incidunt a itaque cupiditate officiis
                doloribus optio, harum asperiores magnam adipisci esse alias
                corporis molestias illo minus quisquam enim, unde sit! Quos
                repellendus quasi omnis eos dolorum minus ratione veritatis
                molestias quisquam. Dolore asperiores placeat quae ut facere,
                eum rem suscipit beatae magni voluptate dolorem ullam
                voluptatibus a voluptatem ipsam eligendi. Velit perspiciatis
                pariatur laboriosam expedita consequuntur vero praesentium
                perferendis obcaecati provident modi voluptatum accusantium
                maiores voluptas, quidem amet iure placeat explicabo tempore
                soluta fugiat! Nihil accusamus ducimus totam distinctio animi
                voluptatum nulla commodi incidunt amet, enim corporis saepe
                possimus nemo consectetur sunt, exercitationem quae! Id ducimus
                earum, itaque ipsum fuga voluptas quisquam cupiditate magnam,
                quam voluptate voluptatem minus laboriosam inventore asperiores
                ipsam officiis facilis exercitationem tenetur quae quasi
                deleniti, tempora fugit architecto vitae.
              </div>
            </div>
            <div className="flex-[0.3] border border-gray-200 rounded-[7px]  p-3 gap-4 flex-col md:flex hidden">
              <div className="flex flex-col gap-2">
                <p className=" font-black">Company</p>
                <div className="flex gap-2">
                  <div className=" h-8 w-8 rounded-md">
                    <img
                      className=" h-full w-full object-cover rounded-md"
                      src="/images/female.jpg"
                      alt=""
                    />
                  </div>
                  <p className="text-sm">{Job?.CompanyName}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className=" font-black">Location</p>
                <p className="text-sm">{Job?.Location}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className=" font-black">Job Type</p>
                <p className="text-sm">{Job?.EmploymentType}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className=" font-black">Hire remotely</p>
                <p className="text-sm">
                  {Job?.isRemote ? "Yes" : "Not Remotely"}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className=" font-black">Experience</p>
                <p className="text-sm">{Job?.Experience}+ years</p>
              </div>

              <div className="flex flex-col gap-2">
                <p className=" font-black">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {Job?.Skills.map((value, idx) => (
                    <p
                      className="bg-gray-200 text-[13px] rounded-full w-max px-2 py-[3px]"
                      key={idx}
                    >
                      {value}
                    </p>
                  ))}
                </div>
              </div>

              <div className="">
                <p className=" font-black">Benfits</p>
                <ul className="flex gap-1 justify-start flex-wrap">
                  {Job?.Benefits?.map((benefit, idx) => (
                    <li className="text-sm">{benefit},</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-3 bg-gray-100 border border-gray-200 rounded-md md:hidden block">
              <div
                className="flex justify-between w-full cursor-pointer"
                onClick={() => setIsDrawer((prev: any) => !prev)}
              >
                <p className=" text-sm ">Job details</p>{" "}
                {isDrawer ? <HiChevronUp /> : <HiChevronDown />}{" "}
              </div>
              {isDrawer && (
                <div className="flex gap-4 flex-col mt-3">
                  <div className="flex flex-col gap-2">
                    <p className=" font-black text-sm">Company</p>
                    <div className="flex gap-2">
                      <div className=" h-6 w-6 rounded-sm">
                        <img
                          className=" h-full w-full object-cover rounded-md"
                          src="/images/female.jpg"
                          alt=" font-black text-sm"
                        />
                      </div>
                      <p className="text-sm">{Job?.CompanyName}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className=" font-black text-sm">Location</p>
                    <p className="text-sm">{Job?.Location}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className=" font-black text-sm">Job Type</p>
                    <p className="text-sm">{Job?.EmploymentType}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className=" font-black text-sm">Hire remotely</p>
                    <p className="text-sm">
                      {Job?.isRemote ? "Yes" : "Not Remotely"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className=" font-black text-sm">Experience</p>
                    <p className="text-sm">{Job?.Experience}+ years</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className=" font-black text-sm">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {Job?.Skills.map((value, idx) => (
                        <p
                          className="bg-gray-200 text-[13px] rounded-full w-max px-2 py-[3px]"
                          key={idx}
                        >
                          {value}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="">
                    <p className="">Benfits</p>
                    <ul className="flex gap-1 justify-start flex-wrap">
                      {Job?.Benefits?.map((benefit, idx) => (
                        <li className="text-sm">{benefit},</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <div></div>
          </div>
          <Divider />
          {companyContent}
        </Box>
        <ModalFooter borderTop="1px" borderTopColor="gray.200">
          <div className="flex gap-2">
            <div className="md:hidden block">
              <div className="flex gap-2 w-full justify-end md:w-max">
                <button
                  className="px-4 py-1 text-base  border-black border rounded-[4px] font-normal hover:border-blue-800 hover:text-blue-800"
                  onClick={() => handleSaveOrUnsaveJob(Job!._id)}
                >
                  {isSaved ? "Remove" : "Save"}
                </button>
                <button
                  className="px-4 py-1 font-normal bg-black text-gray-50 rounded-[4px] w-max text-base hover:bg-blue-800"
                  onClick={handleApplyModal}
                >
                  {alreadyApplied ? "Applied" : "Apply"}
                </button>
              </div>
            </div>
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
export default JobModal;
