import { getProfile, updateProfile } from "@/app/apiQuery";
import { Education, Profile, Work } from "@/type/types";
import { useEffect, useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  dehydrate,
  QueryClient,
} from "react-query";
import { BsArrowLeft } from "react-icons/bs";
import {
  IoEyeOff,
  IoEye,
  IoPencilSharp,
  IoAddCircleOutline,
} from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";
import PersonalInfo from "@/components/Profile/UpdateField/PersonalInfo";
import { toast, Toaster } from "react-hot-toast";
import WorkExperience from "@/components/Profile/UpdateField/WorkExperience";
import { BiTrash } from "react-icons/bi";
import EducationInfo from "@/components/Profile/UpdateField/EducationInfo";
import SkillInfo from "@/components/Profile/UpdateField/SkillInfo";
import { string } from "yup";
import Link from "next/link";
import ProfileMenu from "@/components/Profile/ProfileMenu";
import Loader from "@/components/Utils/Loader";
import AuthRoute from "@/components/Layout/AuthRoute";
import { GiGraduateCap } from "react-icons/gi";
import {
  AiOutlineFundProjectionScreen,
  AiOutlineTool,
  AiTwotoneTool,
} from "react-icons/ai";

type updateProps = {};
const update: React.FC<updateProps> = () => {
  const queryClient = useQueryClient();
  const {
    data: resume,
    isLoading,
    isError,
  } = useQuery<Profile>("profile", getProfile, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const mutation = useMutation(updateProfile, {
    onSuccess: () => {
      toast.success("Update was successfull");
    },
    onSettled: () => {
      queryClient.invalidateQueries("profile");
    },
  });

  const [experience, setExperience] = useState<[Work]>();
  useEffect(() => {
    setExperience(resume?.Work);
  }, [resume]);

  const [education, setEducation] = useState<[Education]>();
  useEffect(() => {
    setEducation(resume?.Education);
  }, [resume]);
  const [skills, setSkills] = useState<[string]>();
  useEffect(() => {
    setSkills(resume?.Skills);
  }, [resume]);

  const [personalInfo, setPersonalInfo] = useState(false);
  //work
  const [workExp, setWorkExp] = useState<boolean>(false);
  const [workIndex, setWorkIndex] = useState<string>("");
  //education
  const [addEducation, setAddEducation] = useState<boolean>(false);
  const [eduIndex, setEduIndex] = useState<string>("");

  //skill
  const [addSkill, setAddSkill] = useState<boolean>(false);

  const handleDeleteWork = (id: any) => {
    const exp = experience?.filter((_, idx) => idx !== id);
    setExperience(exp as [Work]);
    mutation.mutate({ data: { Work: exp } });
  };
  const handleDeleteEducation = (id: any) => {
    const edu = education?.filter((_, idx) => idx !== id);
    setEducation(edu as [Education]);
    mutation.mutate({ data: { Education: edu } });
  };
  const handleDeleteSkill = (id: any) => {
    const filteredSkill = skills?.filter((_, idx) => idx !== id);
    setSkills(filteredSkill as [string]);
    mutation.mutate({ data: { Skills: filteredSkill } });
  };

  if (isLoading) {
    return (
      <div className="relative pt-[5rem] flex justify-center mx-6 items-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="relative pt-[5rem] flex justify-center mx-6">
      <div className="w-[600px] mt-5">
        <Toaster position="top-center" />
        <div className="flex justify-between w-full items-center">
          <Link href={"/profile"}>
            <BsArrowLeft className=" text-[27px]" />
          </Link>
          <ProfileMenu resume={resume} mutation={mutation} />
        </div>
        <div className="border border-gray-300 py-16 px-16 w-full mt-[2rem] rounded-md mb-4">
          <div>
            {!personalInfo ? (
              <div className="flex w-full justify-between items-start">
                <div className="flex flex-col gap-2">
                  <h1 className=" text-xl">{`${resume?.FName} ${resume?.LName}`}</h1>
                  <p className=" font-semibold">{resume?.Headline}</p>
                  <p>{resume?.City_State}</p>
                  <p className=" text-gray-500 text-sm">
                    {resume?.Relocate && "Willing to relocate anyware"}
                  </p>
                </div>
                <IoPencilSharp
                  className=" cursor-pointer text-xl text-blue-600"
                  onClick={() => setPersonalInfo(true)}
                />
              </div>
            ) : (
              <PersonalInfo
                closeInfo={setPersonalInfo}
                resume={resume}
                isEditing={true}
                mutation={mutation}
              />
            )}
          </div>
          {/* work experience */}
          <div className=" mt-[2rem]">
            <div className="flex items-center justify-between border-b-[2px] border-b-gray-300 pb-2 ">
              <p className=" text-gray-500 flex gap-2">
                <AiOutlineFundProjectionScreen className="text-[24px] text-gray-400" />{" "}
                Work Experience
              </p>
              <IoAddCircleOutline
                className=" cursor-pointer text-xl text-blue-600"
                onClick={() => setWorkExp(true)}
              />
            </div>

            {!experience?.length && (
              <>
                <p className=" text-gray-400 text-sm pt-2">
                  Filling out two or more work experienc will double your chance
                  of being contacted by an employee
                </p>
                <button
                  className=" text-blue-600 flex gap-3 py-2 items-center"
                  onClick={() => setWorkExp(true)}
                >
                  <IoAddCircleOutline className=" cursor-pointer text-xl text-blue-600" />
                  Add your Work Experience
                </button>
              </>
            )}
            {workExp ? (
              <WorkExperience
                resume={resume}
                closeOption={setWorkExp}
                index={workIndex}
                setIndex={setWorkIndex}
                isEditing={true}
                mutation={mutation}
              />
            ) : (
              <div className="mt-3 flex flex-col gap-4">
                {experience?.map((item: any, id: any) => (
                  <div key={id} className="flex items-start justify-between ">
                    <div>
                      <p className=" font-semibold">{item?.JobTitle}</p>
                      <p>{item?.Company}</p>
                      <p className=" text-gray-500">{item?.WorkPeriod}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <IoPencilSharp
                        className=" cursor-pointer text-xl text-blue-600"
                        onClick={() => {
                          setWorkExp(true);
                          setWorkIndex(id.toString());
                        }}
                      />
                      <BiTrash
                        className=" cursor-pointer text-xl text-blue-600"
                        onClick={() => handleDeleteWork(id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Education */}
          <div className=" mt-[2rem]">
            <div className="flex items-center justify-between border-b-[2px] border-b-gray-300 pb-2 ">
              <p className=" text-gray-500 flex gap-2">
                <GiGraduateCap className="text-[24px] text-gray-400" />{" "}
                Education
              </p>
              <IoAddCircleOutline
                className=" cursor-pointer text-xl text-blue-600"
                onClick={() => setAddEducation(true)}
              />
            </div>
            {!education?.length && (
              <div>
                <p className=" text-gray-500 mt-1">
                  We recommend at least one education entry.
                </p>
                <button
                  className=" text-blue-600 flex gap-3 py-2 items-center"
                  onClick={() => setAddEducation(true)}
                >
                  <IoAddCircleOutline className=" cursor-pointer text-xl text-blue-600" />
                  Add your education
                </button>
              </div>
            )}

            {addEducation ? (
              <EducationInfo
                resume={resume}
                closeOption={setAddEducation}
                mutation={mutation}
                index={eduIndex}
                setIndex={setEduIndex}
                isEditing={true}
              />
            ) : (
              <div className="mt-3 flex flex-col gap-4">
                {education?.map((item, id) => (
                  <div key={id} className="flex items-start justify-between ">
                    <div>
                      <p className=" font-semibold">{`${item.Level} in ${item.Field}`}</p>
                      <p>{`${item.CollegeName} - ${item.City_State}`}</p>
                      <p className=" text-gray-500">{item.EducationPeriod}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <IoPencilSharp
                        className=" cursor-pointer text-xl text-blue-600"
                        onClick={() => {
                          setAddEducation(true);
                          setEduIndex(id.toString());
                        }}
                      />
                      <BiTrash
                        className=" cursor-pointer text-xl text-blue-600"
                        onClick={() => handleDeleteEducation(id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Skill */}
          <div className=" mt-[2rem]">
            <div className="flex items-center justify-between border-b-[2px] border-b-gray-300 pb-2 ">
              <p className=" text-gray-500 flex gap-2">
                <AiTwotoneTool className="text-[24px] text-gray-400" /> Skills
              </p>
              <IoAddCircleOutline
                className=" cursor-pointer text-xl text-blue-600"
                onClick={() => setAddSkill(true)}
              />
            </div>

            {!addSkill ? (
              <div className="flex gap-2 mt-2 flex-row flex-wrap">
                {resume?.Skills?.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center bg-blue-100 py-[3px] px-3 rounded-full gap-3  w-max"
                  >
                    <div>
                      <p className="">{skill}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <BiTrash
                        className=" cursor-pointer text-base text-blue-400"
                        onClick={() => handleDeleteSkill(idx)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <SkillInfo
                resume={resume}
                onClose={setAddSkill}
                isEditing={true}
                mutation={mutation}
              />
            )}
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

export default AuthRoute(update);
