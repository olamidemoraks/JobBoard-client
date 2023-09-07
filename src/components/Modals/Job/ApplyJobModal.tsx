import { getUserAppication, updateJob } from "@/app/apiQuery";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useApplyJobMutation } from "@/feature/job/jobApiSlice";
import { applyModal, openApplyModal } from "@/feature/job/jobSlice";
import { Company, Job } from "@/type/types";
import { currency, frequently } from "@/utils/constant";
import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { BsBuildings } from "react-icons/bs";
import { HiCloudUpload, HiRefresh } from "react-icons/hi";
import { IoPersonOutline } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from "react-query";

type ApplyJobModalProps = {
  Job?: Job;
  company?: Company;
  alreadyApplied: boolean;
};

const ApplyJobModal: React.FC<ApplyJobModalProps> = ({
  Job,
  company,
  alreadyApplied,
}) => {
  const [applyJob, { isLoading, error }] = useApplyJobMutation();

  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const open = useAppSelector(applyModal);
  const [isDrawer, setIsDrawer] = useState(false);
  //this will be sent as part of the email
  const [note, setNote] = useState("");

  const [selectedFile, setSelectedFile] = useState<any>();
  const selectFileRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<string[]>([]);

  function handleClose() {
    dispatch(openApplyModal({ data: false }));
  }

  const onSelectResume = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event?.target?.files?.[0]);
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!note) {
      setErrors((prev) => [...prev, "please fill in the note above"]);
      return;
    }
    if (Job?.resume === "true") {
      if (!selectedFile) {
        setErrors((prev) => [...prev, "You required to submit your resume!"]);
        return;
      }
    }
    const formData = new FormData();
    formData.append("Notes", note);
    formData.append("resume", selectedFile as any);
    formData.append("JId", Job?._id as string);
    formData.append("CId", Job?.CId as string);
    formData.append("File", selectedFile?.name);

    try {
      await applyJob(formData);
      queryClient.invalidateQueries("application");
      setSelectedFile(null);
      setNote("");
      handleClose();
    } catch (error) {
      console.log("AppliedJob error", error);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      setTimeout(() => {
        setErrors([]);
      }, 5000);
    }
  }, [errors]);

  return (
    <Modal isOpen={open} onClose={handleClose} size="4xl">
      <ModalOverlay />
      <ModalContent bg={"white"}>
        <div className=" md:py-8 pb-6 w-full flex gap-7 md:flex-row flex-col">
          <div className="hidden flex-col gap-5 flex-[0.5] md:flex px-7">
            <p className=" font-semibold text-gray-400 text-sm">APPLY TO</p>
            <div className="flex flex-col gap-2 ">
              <div className="flex gap-2">
                {Job?.CompanyLogo ? (
                  <>
                    <div className=" h-8 w-8 rounded-md">
                      <img
                        loading="lazy"
                        className=" h-full w-full object-cover rounded-md"
                        src={`${process.env.NEXT_PUBLIC_BASEURL}/company/${Job.CompanyLogo}`}
                        alt=""
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className=" h-8 w-8 rounded-md bg-gray-400 flex items-center justify-center">
                      <BsBuildings className=" text-white h-1/2 w-1/2" />
                    </div>
                  </>
                )}
                <Link
                  href=""
                  className=" text-blue-600 font-semibold hover:underline "
                >
                  {Job?.CompanyName}
                </Link>
              </div>
              <div className="flex flex-col w-[90%] gap-1">
                <p className=" font-semibold text-gray-500 text-[17px]">
                  {Job?.Title}
                </p>
                <p className="text-gray-600 font-normal">
                  {currency[Job?.currency ?? "USD"]}
                  {Job?.PayMin?.toLocaleString()} -{" "}
                  {currency[Job?.currency ?? "USD"]}
                  {Job?.PayMax?.toLocaleString()}{" "}
                  <span className=" ">
                    {frequently[Job?.frequency ?? "yr"]}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-gray-500 font-semibold ">Location</p>
                <p className="text-gray-500">{Job?.Location}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className=" text-gray-500 font-semibold">Job Type</p>
                <p className="text-gray-500">{Job?.EmploymentType}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className=" text-gray-500 font-semibold">Hire remotely</p>
                <p className="text-gray-500">
                  {Job?.isRemote ? "Yes" : "Not Remotely"}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className=" text-gray-500 font-semibold">Experience</p>
                <p className="text-gray-500">{Job?.Experience}+ years</p>
              </div>

              <div className="flex flex-col gap-2">
                <p className=" text-gray-500 font-semibold">Skills</p>
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
                <p className=" text-gray-500 font-semibold">Benfits</p>
                <ul className="flex gap-1 justify-start flex-wrap">
                  {Job?.Benefits?.map((benefit, idx) => (
                    <li className="text-gray-500 ">{benefit},</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 py-7 px-7 bg-gray-200 md:hidden">
            <p className=" font-semibold text-gray-400 text-sm">APPLY TO</p>
            <div className="flex gap-2 items-center">
              <div className=" h-8 w-8 rounded-md">
                <img
                  loading="lazy"
                  className=" h-full w-full object-cover rounded-md"
                  src="/images/female.jpg"
                  alt=""
                />
              </div>
              <Link href="" className=" text-blue-800 hover:underline ">
                {Job?.CompanyName}
              </Link>
            </div>
            <div className="flex flex-col w-[90%] gap-[2px]">
              <p className=" font-semibold text-gray-500 text-[17px]">
                {Job?.Title}
              </p>
              <p className="text-gray-600 font-normal">
                {currency[Job?.currency ?? "USD"]}
                {Job?.PayMin?.toLocaleString()} -{" "}
                {currency[Job?.currency ?? "USD"]}
                {Job?.PayMax?.toLocaleString()}{" "}
                <span className=" ">{frequently[Job?.frequency ?? "yr"]}</span>
              </p>
            </div>
            <p
              className=" text-gray-400 text-[13px] cursor-pointer hover:underline hover:text-gray-500"
              onClick={() => setIsDrawer((prev) => !prev)}
            >
              SHOW MORE
            </p>

            {isDrawer && (
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <p className="text-gray-500 font-semibold ">Location</p>
                  <p className="text-gray-500">{Job?.Location}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className=" text-gray-500 font-semibold">Job Type</p>
                  <p className="text-gray-500">{Job?.EmploymentType}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className=" text-gray-500 font-semibold">Hire remotely</p>
                  <p className="text-gray-500">
                    {Job?.isRemote ? "Yes" : "Not Remotely"}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className=" text-gray-500 font-semibold">Experience</p>
                  <p className="text-gray-500">{Job?.Experience}+ years</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className=" text-gray-500 font-semibold">Skills</p>
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
                  <p className=" text-gray-500 font-semibold">Benfits</p>
                  <ul className="flex gap-1 justify-start flex-wrap">
                    {Job?.Benefits?.map((benefit, idx) => (
                      <li className="text-gray-500 ">{benefit},</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-4 px-7">
            <p className=" font-semibold text-gray-400 text-sm">
              YOUR APPLICATION
            </p>
            <Divider />
            <p>
              Is your profile up to date? Click{" "}
              <span className=" text-blue-500">
                <Link href="/profile">here</Link>
              </span>{" "}
              to verify how you will appear to recruiters.
            </p>
            <div className=" w-full flex justify-between">
              <div className="flex gap-1 flex-col">
                <p className=" font-black">
                  Your hiring contact is {company?.Name}
                </p>
                <p className=" text-sm">
                  Let them know why you are a good fit.
                </p>
              </div>
              <div className=" h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                <IoPersonOutline color="#fff" />
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              {alreadyApplied ? (
                <>
                  <div className="bg-orange-100 text-orange-400 p-2 border border-orange-200 rounded-md mb-2">
                    <p>
                      You have already applied for this job, please check your
                      application for update on your status for this job. click{" "}
                      <span className=" text-blue-600 cursor-pointer">
                        here
                      </span>{" "}
                      to check your status
                    </p>
                  </div>
                </>
              ) : (
                <textarea
                  rows={6}
                  id=""
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={`Write a note to ${company?.Name} at ${Job?.CompanyName}`}
                  className="border-2 border-gray-400 outline-none rounded-md p-3 w-full"
                ></textarea>
              )}

              <div className="mb-3">
                {(Job?.resume === "true" || Job?.resume === "optional") && (
                  <div>
                    <p>
                      Upload your resume -{" "}
                      {Job.resume === "true" ? (
                        <span className=" text-red-500/70 text-[12px] font-semibold">
                          *Required
                        </span>
                      ) : (
                        <span className=" text-green-700/70 text-[12px] font-semibold">
                          Optional
                        </span>
                      )}{" "}
                    </p>
                    <div
                      className="flex gap-2 p-2 border border-gray-300 border-dashed items-center justify-center rounded-md my-1 hover:text-black text-gray-500 cursor-pointer group"
                      onClick={() => selectFileRef.current?.click()}
                    >
                      {selectedFile?.name ? (
                        <div className="flex items-center gap-7 justify-center w-[80%]">
                          <p>{selectedFile?.name?.substring(0, 22)}</p>
                          <HiRefresh className=" text-blue-500/70 group-hover:text-blue-500" />
                        </div>
                      ) : (
                        <p className="flex items-center justify-center w-full gap-3">
                          upload{" "}
                          <HiCloudUpload className=" text-pink-500/70 group-hover:text-pink-500" />
                        </p>
                      )}
                    </div>
                    <input
                      ref={selectFileRef}
                      type="file"
                      onChange={onSelectResume}
                      className="hidden"
                    />
                  </div>
                )}
              </div>
              {errors.length > 0 && (
                <div className=" bg-rose-200 text-rose-400 p-2 border border-rose-300 rounded-md mb-2">
                  {errors.map((error) => (
                    <p>{error}</p>
                  ))}
                </div>
              )}
              <div className="w-full flex justify-end gap-5">
                <button
                  type="button"
                  className=" font-semibold "
                  onClick={handleClose}
                >
                  cancel
                </button>
                <button
                  type="submit"
                  disabled={note.length > 9 ? false : true}
                  className="  px-3 py-[3px] rounded-sm bg-black text-white disabled:bg-gray-200 disabled:text-gray-400"
                >
                  {isLoading ? "Sending..." : "Send application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
export default ApplyJobModal;
