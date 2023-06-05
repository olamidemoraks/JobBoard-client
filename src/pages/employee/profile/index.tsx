import Loader from "@/components/Utils/Loader";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  HiCamera,
  HiChevronDoubleDown,
  HiChevronDown,
  HiChevronUp,
  HiMail,
  HiPhone,
  HiUser,
  HiX,
} from "react-icons/hi";
import { IoCheckmarkCircle } from "react-icons/io5";
import {
  MdEdit,
  MdEditDocument,
  MdEditNote,
  MdGroups2,
  MdGroups3,
  MdLocationPin,
} from "react-icons/md";
import { useQuery, useQueryClient } from "react-query";
import { getCompany } from "../../../app/apiQuery";
import { Company } from "../../../type/types";
import UploadButton from "@/components/Utils/UploadButton";
import { useUploadCompanyImageMutation } from "@/feature/employer/employerApiSlice";
import { BarLoader } from "react-spinners";

type ProfileProps = {};

const Profile: React.FC<ProfileProps> = () => {
  const [uploadImage, { isLoading: uploadLoading }] =
    useUploadCompanyImageMutation();
  const queryClient = useQueryClient();

  const { data: company, isLoading } = useQuery<Company>("company", getCompany);
  const [fullDesc, setFullDesc] = useState(false);
  const [selectFile, setSelectFile] = useState<any>();
  const selectFileRef = useRef<HTMLInputElement>(null);

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectFile(event?.target?.files?.[0]);
  };
  const handleSubmitImage = async () => {
    const formData = new FormData();
    formData.append("picture", selectFile as any);
    formData.append("Logo", selectFile.name);
    try {
      await uploadImage({ initialData: formData, id: company?._id }).unwrap();
      setSelectFile("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (uploadLoading === false) {
      queryClient.invalidateQueries("company");
    }
  }, [uploadLoading]);

  if (isLoading) {
    return (
      <div className="flex  h-[60vh] items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="lg:mx-[4rem]">
      <div className="w-full  flex gap-7 md:flex-row flex-col md:items-start">
        <div className="flex flex-col gap-1">
          <div className=" md:h-[120px] md:w-[120px] h-[100px] w-[100px] rounded-sm flex items-center justify-center flex-col relative ">
            {company?.Logo ? (
              <>
                <img
                  src={`${process.env.NEXT_PUBLIC_BASEURL}/company/${company.Logo}`}
                  alt=""
                  className=" w-full h-full rounded-full object-cover"
                />
                <div
                  className="absolute bottom-0 right-2 p-2 bg-gray-400 cursor-pointer z-10 rounded-full"
                  onClick={() => selectFileRef?.current?.click()}
                >
                  <HiCamera className=" text-white text-[19px] " />
                </div>
              </>
            ) : (
              <>
                <div
                  className="flex flex-col items-center cursor-pointer h-full w-full justify-center bg-gray-300 hover:bg-gray-400/50 rounded-sm "
                  onClick={() => selectFileRef?.current?.click()}
                >
                  <HiCamera className=" text-[60px] text-white" />
                  <p className=" font-bold text-white">No Photo</p>
                </div>
              </>
            )}
          </div>
          {selectFile && (
            <div className="flex items-center ">
              <UploadButton handleSubmitImage={handleSubmitImage} />
              <div className=" py-2 px-2 bg-red-400 text-white hover:bg-red-500 flex-[0.5] h-9">
                <HiX
                  className="text-[19px]"
                  onClick={() => setSelectFile("")}
                />
              </div>
            </div>
          )}
          {(uploadLoading || isLoading) && <BarLoader />}

          <input
            ref={selectFileRef}
            type="file"
            onChange={handleSelectFile}
            className=" hidden"
          />
        </div>
        <div className="flex flex-col flex-1 gap-3">
          <div className="flex items-center gap-7">
            <p className="text-3xl font-bold">{company?.CompanyName}</p>
            <Link
              href="profile/edit"
              className="flex gap-1 text-blue-600 items-center cursor-pointer hover:text-blue-700"
            >
              <MdEditNote /> Edit
            </Link>
          </div>
          <p className="  w-[75%]  text-sm">
            {!company?.CompanySnippet ? (
              <p>
                Write a brief description for {company?.CompanyName} company.
              </p>
            ) : (
              company.CompanySnippet
            )}
          </p>
          <div className="flex items-center gap-6">
            <p className="flex gap-1 items-center text-stone-500 text-[13px]">
              <MdGroups2 className=" text-[21px] text-blue-500" />{" "}
              {company?.CompanySize}
            </p>
            <p className="flex gap-1 items-center text-stone-500 text-[13px]">
              <MdLocationPin className="text-[18px] text-red-500" />{" "}
              {company?.Location ?? "Add Company Location"}
            </p>
            <p className="flex gap-1 items-center text-stone-500 text-[13px]">
              <IoCheckmarkCircle className="text-[18px] text-green-500" />{" "}
              {company?.Status ?? "Actively hiring"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-7 mt-2">
        <div className="flex-1 ">
          <p className="text-lg font-black py-2">Company description</p>
          <p className="text-justify h-max relative">
            {fullDesc
              ? company?.CompanyDesc
              : company?.CompanyDesc.substring(0, 300)}
            {company?.CompanyDesc !== undefined &&
              company?.CompanyDesc?.length >= 300 && (
                <div
                  className={`${
                    !fullDesc ? "bg-gradient-to-t  to-white/30 from-white" : ""
                  }   flex justify-center items-end -bottom-10 z-20 absolute w-full h-[150px] `}
                >
                  <p
                    className=" bg-mid-green text-white py-[3px] px-4 text-sm rounded-full flex items-center gap-1 cursor-pointer"
                    onClick={() => setFullDesc((prev) => !prev)}
                  >
                    Read{" "}
                    {!fullDesc ? (
                      <>
                        more <HiChevronDown />
                      </>
                    ) : (
                      <>
                        less <HiChevronUp />
                      </>
                    )}
                  </p>
                </div>
              )}
          </p>
        </div>
        <div className="flex-[0.5] md:mt-0 mt-5">
          <p className="py-2">Contact</p>
          <div className="flex flex-col gap-2">
            <p className="flex gap-1 text-gray-600 text-sm items-center">
              <div className=" bg-gray-500 h-6 w-6 rounded-full flex items-center justify-center">
                <HiUser className=" text-white" />
              </div>
              {company?.Name}
            </p>
            <p className="flex gap-1 text-gray-600 text-sm items-center">
              <div className=" bg-gray-500 h-6 w-6 rounded-full flex items-center justify-center">
                <HiMail className=" text-white" />
              </div>
              {company?.Email}
            </p>
            <p className="flex gap-1 text-gray-600 text-sm items-center">
              <div className=" bg-gray-500 h-6 w-6 rounded-full flex items-center justify-center">
                <HiPhone className=" text-white" />
              </div>
              {company?.MobileNo}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
