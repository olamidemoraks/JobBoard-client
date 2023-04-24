import ProfileBuildLayout from "@/components/Layout/ProfileBuildLayout";
import { IoAdd, IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Profile } from "@/type/types";

type skillsProps = {};

const skills: React.FC<skillsProps> = () => {
  const router = useRouter();

  const [resume, setResume] = useState<Profile>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("profile") as string);
    }
  });

  //to set skill object before hand
  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify({ ...resume, Skills: [] }));
  }, []);

  const [skills, setSkills] = useState<string[]>([]);
  const [skill, setSkill] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkill(e.target.value);
  };

  const handleAddSkill = () => {
    if (!skill) {
      return;
    }
    setSkills((prev: string[]) => [skill, ...prev]);
    setSkill("");
  };

  const handleRemoveSkill = (id: any) => {
    setSkills((prev) => {
      return prev.filter((_, idx) => idx !== id);
    });
  };
  const handleSubmit = () => {
    const profile = JSON.parse(localStorage.getItem("profile") as string);
    localStorage.setItem(
      "profile",
      JSON.stringify({
        ...profile,
        Skills: [...(resume?.Skills ?? []), ...skills],
      })
    );
    router.push("preview");
  };
  return (
    <ProfileBuildLayout width="w-[75%]">
      <form onSubmit={handleAddSkill} className="flex flex-col gap-3 mt-3">
        <p className="text-2xl font-semibold">What are some of your skills?</p>
        <p className=" text-gray-600">We recommend adding at least 6 skills</p>

        <div className="flex items-center gap-3 w-full">
          <div
            className={` w-full border border-gray-400 rounded-[4px] px-3 py-2 focus:border-b-[2px] focus:border-b-primary-dark`}
          >
            <input
              autoComplete="off"
              id="phone"
              type="text"
              className="w-full outline-none bg-transparent placeholder:text-gray-500 "
              placeholder="Add a skill"
              value={skill}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            disabled={skill.length === 0 ? true : false}
            className="border border-gray-400 rounded-[4px] px-3 py-3 focus:border-b-[2px] focus:border-b-primary-dark disabled:border-gray-200 disabled:text-gray-200"
            onClick={handleAddSkill}
          >
            <IoAdd />
          </button>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          {skills?.map((value, id) => (
            <div
              className="px-2 py-1 bg-purple-500/10 border-[2px] border-purple-500/30 rounded-[11px] flex items-center gap-2"
              key={id}
            >
              {value}
              <IoClose onClick={() => handleRemoveSkill(id)} />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          {resume?.Skills?.map((value, id) => (
            <div
              className="px-2 py-1 bg-light-purple/10 border-[2px] border-light-purple/30 rounded-[11px] flex items-center gap-2"
              key={id}
            >
              {value}
            </div>
          ))}
        </div>
        <button
          className=" bg-mid-green text-white w-[100px] py-3 rounded-md"
          type="button"
          onClick={handleSubmit}
        >
          Continue
        </button>
      </form>
    </ProfileBuildLayout>
  );
};
export default skills;
