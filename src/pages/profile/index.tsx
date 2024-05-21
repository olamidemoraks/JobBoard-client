import { getProfile } from "@/app/apiQuery";
import AuthRoute from "@/components/Layout/AuthRoute";
import Image from "next/image";
import AddProfile from "@/components/NoProfileBackup/AddProfile";
import ProfileLoading from "@/components/Utils/ProfileLoading";
import UploadButton from "@/components/Utils/UploadButton";
import { useUploadImageMutation } from "@/feature/profile/profileApiSlice";
import useCountry from "@/hooks/useCountry";
import { Profile } from "@/type/types";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { AiFillEdit, AiOutlineFundProjectionScreen } from "react-icons/ai";
import { GiGraduateCap } from "react-icons/gi";
import {
  HiEye,
  HiLocationMarker,
  HiOutlineUser,
  HiTag,
  HiCamera,
  HiX,
} from "react-icons/hi";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { QueryClient, dehydrate, useQuery, useQueryClient } from "react-query";
import { BarLoader } from "react-spinners";

type ProfileProps = {};

const Profile: React.FC<ProfileProps> = () => {
  const [uploadProfile, { isLoading: uploadLoading }] =
    useUploadImageMutation();
  const { getByValue } = useCountry();
  const emptyResponse: any = [];
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<Profile>("profile", getProfile, {
    onSuccess: (data: any) => {
      if (data?.isError === true) {
        queryClient.setQueriesData("profile", emptyResponse);
      }
    },
  });

  const [selectFile, setSelectFile] = useState<any>();
  const selectFileRef = useRef<HTMLInputElement>(null);

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    // let rawImage = event?.target?.files?.[0] as any;
    // // rawImage.name =
    // //   data?.FName +
    // //   "-" +
    // //   data?.LName +
    // //   "." +
    // //   event?.target?.files?.[0].name.split(".")[1];
    // console.log(rawImage);
    setSelectFile(event?.target?.files?.[0]);
  };
  const handleSubmitImage = async () => {
    const formData = new FormData();
    formData.append("picture", selectFile as any);
    formData.append("Photo", selectFile.name);
    try {
      await uploadProfile(formData).unwrap();
      setSelectFile("");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data);

  useEffect(() => {
    if (uploadLoading === false) {
      queryClient.invalidateQueries("profile");
    }
  }, [uploadLoading]);

  if (isLoading) {
    return (
      <div className="relative pt-[5rem] flex justify-center mx-6 w-full">
        <ProfileLoading />
      </div>
    );
  }

  if (data === null || data === undefined || !data) {
    return <AddProfile />;
  }
  return (
    <div className="relative pt-[4.7rem] flex justify-center mx-6 ">
      <div className="w-full max-w-[800px] relative  mb-4 ">
        <div className=" bg-gradient-to-r from-blue-200 to-indigo-200 h-[100px] w-full z-0 " />
        <div className="flex md:flex-row flex-col gap-2 z-20 mx-5 md:justify-start justify-center  md:mb-4 mb-7">
          <div className="md:h-[220px] md:w-[220px] h-[180px] w-[180px] bg-white  p-3 rounded-md -mt-12 mb-10 mx-auto  -top-10 z-0 shadow-sm cursor-pointer relative">
            {data.Photo ? (
              <>
                <img
                  loading="lazy"
                  className=" h-full w-full object-cover rounded"
                  src={`${process.env.NEXT_PUBLIC_BASEURL}/profile/${data.Photo}`}
                  alt="profile"
                />
                <div
                  className="absolute bottom-0 right-0 p-2 bg-gray-400 cursor-pointer z-10"
                  onClick={() => selectFileRef?.current?.click()}
                >
                  <HiCamera className=" text-white text-[19px] " />
                </div>
              </>
            ) : (
              <>
                <div
                  className="w-full h-full bg-gray-200 flex items-center justify-center rounded-[4px] "
                  onClick={() => selectFileRef?.current?.click()}
                >
                  <HiOutlineUser className=" text-[10rem] text-white" />
                </div>
              </>
            )}
            {selectFile && (
              <div className="flex items-center ">
                <UploadButton handleSubmitImage={handleSubmitImage} />
                <div className=" py-2 px-2 bg-red-400 text-white hover:bg-red-500 flex-[0.5]">
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
          <div className="flex flex-col gap-2 my-1 flex-1">
            <div className="flex justify-between w-full items-center md:flex-row flex-col">
              <p className=" text-[25px] ">
                {data.FName} {data.LName}
              </p>

              <div className="flex gap-[16px] md:gap-[9px] text-blue-500 text-sm">
                <Link href="/profile" className="flex gap-[4px] items-center">
                  <HiEye /> view your public profile
                </Link>
                <Link
                  href={"/profile/contact"}
                  className="flex gap-[4px] items-center"
                >
                  <AiFillEdit /> Edit
                </Link>
              </div>
            </div>
            <div className=" flex gap-2 md:justify-start justify-center">
              <div className="flex gap-1">
                <HiTag className=" text-gray-400" />
                <p className="text-[13px] text-gray-400">
                  {data.JobTitle ?? (
                    <Link href={"/profile/contact"}>Add your role</Link>
                  )}
                </p>
              </div>
              <div className="flex gap-1">
                <HiLocationMarker className=" text-gray-400" />
                <p className="text-[13px] text-gray-400">
                  {data?.Country ? (
                    getByValue(data?.Country)?.label
                  ) : (
                    <Link href={"/profile/contact"}>Add your location</Link>
                  )}
                </p>
              </div>
              <div className="flex gap-1">
                <GiGraduateCap className=" text-gray-400" />
                <p className="text-[13px] text-gray-400">
                  {data?.Education ? (
                    data?.Education[0]?.CollegeName
                  ) : (
                    <Link href={"/profile/update"}>Add your education</Link>
                  )}
                </p>
              </div>
            </div>
            <div className="flex md:justify-start justify-center">
              {!data?.Visibility ? (
                <p className="flex gap-1 items-center text-sm text-gray-600">
                  <IoEyeOff className=" text-lg" />
                  Account is Private (can't be seen by recruiters){" "}
                  <span className=" text-blue-600 text-sm">
                    <Link href={"/profile/update"}>Change</Link>
                  </span>
                </p>
              ) : (
                <p className="flex gap-1 items-center text-sm text-gray-600">
                  <IoEye />
                  Account is Public
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className=" flex justify-between">
            <p>Experience</p>
            <Link className=" text-blue-600" href={"/profile/update"}>
              Edit
            </Link>
          </div>

          {!data?.Work ? (
            <div className="p-3 rounded-sm w-full mt-3 border border-gray-200 text-center text-sm hover:animate-pulse">
              <Link href={"/profile/update"}>
                Please add the companies you've started, worked at, advised,
                etc.
              </Link>
            </div>
          ) : (
            <div className="py-8 px-16 border border-gray-200 rounded-sm mt-2 flex items-start gap-4">
              <AiOutlineFundProjectionScreen className="text-[34px] text-gray-300" />
              <div className=" flex flex-col gap-2">
                {data.Work.map((work) => (
                  <div className="flex flex-col gap-1 border-b border-b-gray-200">
                    <p className="text-[13px] font-light">
                      {work.Company}, {work.City_State}. {work.WorkPeriod}
                    </p>
                    <p className="text-[14px] ">{work.JobTitle}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-5">
          <div className=" flex justify-between">
            <p>Education</p>
            <Link className=" text-blue-600" href={"/profile/update"}>
              Edit
            </Link>
          </div>

          {!data.Education ? (
            <div className="p-3 rounded-sm w-full mt-3 border border-gray-200 text-center text-sm hover:animate-pulse">
              <Link href={"/profile/update"}>
                Please add the college or programs you've started, attended,
                etc.
              </Link>
            </div>
          ) : (
            <div className="py-8 px-16 border border-gray-200 rounded-sm mt-2 flex items-start gap-4">
              <GiGraduateCap className="text-[34px] text-gray-300" />
              <div className=" flex flex-col gap-2">
                {data?.Education.map((education) => (
                  <div className="flex flex-col gap-1">
                    <p className="text-[13px] font-light">
                      {education?.CollegeName}, {education?.City_State}.{" "}
                      {education?.EducationPeriod}
                    </p>
                    <p className="text-[14px] ">
                      {education?.Level}
                      {education?.Field}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-5">
          <div className=" flex justify-between">
            <p>About</p>
            <Link className=" text-blue-600" href={"/profile/update"}>
              Edit
            </Link>
          </div>

          <div className="py-8 px-16 border border-gray-200 rounded-sm mt-2 flex flex-col items-start gap-3">
            <div className="flex gap-6">
              <p className=" text-[15px] text-gray-400">Skills</p>
              <div className="flex gap-1 ">
                {data?.Skills?.map((skill) => (
                  <>
                    <p className="text-[14px]">{skill}, </p>
                  </>
                ))}
              </div>
            </div>
            <div className="flex gap-6">
              <p className=" text-[15px] text-gray-400">Location</p>
              <p className="text-[14px]">
                {getByValue(data.Country)?.label}, {data.City_State}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery("profile", getProfile);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default AuthRoute(Profile);
