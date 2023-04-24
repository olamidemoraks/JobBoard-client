import ProfileBuildLayout from "@/components/Layout/ProfileBuildLayout";
import EducationInfo from "@/components/Profile/UpdateField/EducationInfo";
import PersonalInfo from "@/components/Profile/UpdateField/PersonalInfo";
import SkillInfo from "@/components/Profile/UpdateField/SkillInfo";
import WorkExperience from "@/components/Profile/UpdateField/WorkExperience";
import { Profile } from "@/type/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { IoAddCircleOutline, IoPencilSharp } from "react-icons/io5";

const preview: React.FC = () => {
  const router = useRouter();

  const [resume, setResume] = useState<Profile>();
  //work state
  const [workExp, setWorkExp] = useState<boolean>(false);
  const [workIndex, setWorkIndex] = useState<string>("");
  //personal
  const [personalInfo, setPersonalInfo] = useState<boolean>(false);
  //education
  const [addEducation, setAddEducation] = useState<boolean>(false);
  const [eduIndex, setEduIndex] = useState<string>("");
  //skills
  const [addSkill, setAddSkill] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setResume(JSON.parse(localStorage.getItem("profile") as string));
    }
  }, []);

  const handleFormSubmit = () => {
    router.push("privacy");
  };

  const handleDeleteWork = (id: any) => {
    let newResume = [];
    newResume = resume!.Work?.filter((_, idx) => idx !== id);
    localStorage.setItem(
      "profile",
      JSON.stringify({ ...resume, Work: [...newResume] })
    );
    setResume(JSON.parse(localStorage.getItem("profile") as string));
  };
  const handleDeleteEducation = (id: any) => {
    let newResume = [];
    newResume = resume!.Education?.filter((_, idx) => idx !== id);
    localStorage.setItem(
      "profile",
      JSON.stringify({ ...resume, Education: [...newResume] })
    );
    setResume(JSON.parse(localStorage.getItem("profile") as string));
  };
  const handleDeleteSkill = (idx: any) => {
    let newSkill = [];
    newSkill = resume!.Skills.filter((_, id) => id !== idx);
    localStorage.setItem(
      "profile",
      JSON.stringify({ ...resume, Skills: [...newSkill] })
    );
    setResume(JSON.parse(localStorage.getItem("profile") as string));
  };

  return (
    <ProfileBuildLayout width="w-[80%]">
      <p className="text-2xl text-gray-800 font-semibold mb-2 mt-2">
        Is your resume ready?
      </p>
      <p className=" text-gray-500">Review and make any changes below</p>
      <div className="shadow-lg border-[2px] border-gray-300 rounded-md w-full py-16 px-16 mt-9">
        {!personalInfo ? (
          <div className="flex w-full justify-between items-start">
            <div className="flex flex-col gap-3">
              <h1 className=" text-xl">{`${resume?.FName} ${resume?.LName}`}</h1>
              {resume?.Headline && (
                <p className="font-semibold">{resume.Headline}</p>
              )}
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
            setResume={setResume}
          />
        )}
        {/* Work experience */}
        <div className=" mt-[2rem]">
          <div className="flex items-center justify-between border-b-[2px] border-b-gray-300 pb-2 ">
            <p className=" text-gray-500">Work Experience</p>
            <IoAddCircleOutline
              className=" cursor-pointer text-xl text-blue-600"
              onClick={() => setWorkExp(true)}
            />
          </div>

          {workExp ? (
            <WorkExperience
              resume={resume}
              closeOption={setWorkExp}
              setResume={setResume}
              index={workIndex}
              setIndex={setWorkIndex}
            />
          ) : (
            <div className="mt-3 flex flex-col gap-4">
              {resume?.Work?.map((item, id) => (
                <div key={id} className="flex items-start justify-between ">
                  <div>
                    <p className=" font-semibold">{item.JobTitle}</p>
                    <p>{item.Company}</p>
                    <p className=" text-gray-500">{item.WorkPeriod}</p>
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
            <p className=" text-gray-500">Education</p>
            <IoAddCircleOutline
              className=" cursor-pointer text-xl text-blue-600"
              onClick={() => setAddEducation(true)}
            />
          </div>

          {!resume?.Education?.length && (
            <div>
              <p className=" text-gray-500 mt-1">
                We recommend at least one education entry.
              </p>
              <button className=" text-blue-600 flex gap-3 py-2 items-center">
                <IoAddCircleOutline
                  className=" cursor-pointer text-xl text-blue-600"
                  onClick={() => setAddEducation(true)}
                />
                Add your education
              </button>
            </div>
          )}

          {addEducation ? (
            <EducationInfo
              resume={resume}
              closeOption={setAddEducation}
              setResume={setResume}
              index={eduIndex}
              setIndex={setEduIndex}
            />
          ) : (
            <div className="mt-3 flex flex-col gap-4">
              {resume?.Education?.map((item, id) => (
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
        <div className=" mt-[2rem]">
          <div className="flex items-center justify-between border-b-[2px] border-b-gray-300 pb-2 ">
            <p className=" text-gray-500">Skills</p>
            <IoAddCircleOutline
              className=" cursor-pointer text-xl text-blue-600"
              onClick={() => setAddSkill(true)}
            />
          </div>

          {!addSkill ? (
            <div className="flex gap-2 mt-2 flex-col">
              {resume?.Skills?.map((skill, idx) => (
                <div key={idx} className="flex items-start justify-between">
                  <div>
                    <p className=" font-semibold">{skill}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    {/* <IoPencilSharp
                  className=" cursor-pointer text-xl text-blue-600"
                  onClick={() => {
                    setAddEducation(true);
                    setEduIndex(idx.toString());
                  }}
                /> */}
                    <BiTrash
                      className=" cursor-pointer text-xl text-blue-600"
                      onClick={() => handleDeleteSkill(idx)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <SkillInfo
              resume={resume}
              setResume={setResume}
              onClose={setAddSkill}
            />
          )}
        </div>
      </div>
      <button
        className=" bg-mid-green text-white w-[100px] py-3 rounded-md mt-4"
        onClick={handleFormSubmit}
      >
        Continue
      </button>
    </ProfileBuildLayout>
  );
};
export default preview;
