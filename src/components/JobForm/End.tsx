import { useCreateJobMutation } from "@/feature/employer/employerApiSlice";
import useProfile from "@/hooks/useProfile";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { IoAdd, IoClose } from "react-icons/io5";
import { yearOfExperience } from "@/utils/constant";
type EndProps = {
  setSection: (value: string) => void;
  setformData: (value: string) => void;
  formData: any;
};

const End: React.FC<EndProps> = ({ formData, setSection, setformData }) => {
  const router = useRouter();
  const [createJob, { isLoading }] = useCreateJobMutation();
  const { email } = useProfile();

  const [resume, setResume] = useState("optional");
  const [isDate, setIsDate] = useState(false);
  const [deadline, setDeadline] = useState("");
  const [Experience, setExperience] = useState<any>();

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

  const handleSubmit = async () => {
    const data = {
      ...formData,
      resume,
      Deadline: deadline,
      Contact: email,
      Skills: [...skills],
      Experience,
    };
    if (!Experience) {
      return;
    }
    try {
      const response = await createJob(data).unwrap();
      console.log(response);
      toast.success("Job application successful");
      router.push("/employee/job");
    } catch (error) {
      toast.error("An Error has occur");
      console.log(error);
    }
  };
  return (
    <form className="flex flex-col gap-5 " onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <p className="font-semibold">Skill you will prefer for the job</p>
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
            onClick={handleAddSkill}
            type="submit"
            disabled={skill.length === 0 ? true : false}
            className="border border-gray-400 rounded-[4px] px-3 py-3 focus:border-b-[2px] focus:border-b-primary-dark disabled:border-gray-200 disabled:text-gray-300"
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
      </div>
      <div className="flex flex-col gap-2">
        <p className=" font-semibold">How many year of experience in field</p>

        <select
          name=""
          id=""
          className={` w-full border border-gray-300 rounded-[4px] px-3 py-2 outline-0 focus:border-b-[2px] focus:border-gray-400`}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            setExperience(event.target.value)
          }
        >
          <option value="">Select year of experience in field</option>
          {yearOfExperience().map((number) => (
            <option value={number} key={number}>{`${number} years`}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <p className=" font-semibold">
          Would you like people to submit a resume?
          <span className=" text-red-400"> *</span>
        </p>
        <div
          className={`${
            resume === "yes" ? "border-gray-400" : "border-gray-300"
          }  w-full p-3 border  rounded-md `}
        >
          <Toaster position="top-right" />
          <label className="flex gap-2 w-full">
            <input
              type="radio"
              className="h-5 w-5"
              checked={resume === "yes"}
              onChange={() => {
                setResume("yes");
              }}
            />
            Yes
          </label>
          <p className="ml-[31px] text-sm text-gray-500">
            People will be required to include a resume
          </p>
        </div>
        <div
          className={`${
            resume === "no" ? "border-gray-400" : "border-gray-300"
          }  w-full p-3 border  rounded-md `}
        >
          <label className="flex gap-2 w-full">
            <input
              type="radio"
              className="h-5 w-5"
              checked={resume === "no"}
              onChange={() => setResume("no")}
            />
            No
          </label>
          <p className="ml-[31px] text-sm text-gray-500">
            People will not be asked to include a resume
          </p>
        </div>
        <div
          className={`${
            resume === "optional" ? "border-gray-400" : "border-gray-300"
          }  w-full p-3 border  rounded-md `}
        >
          <label className="flex gap-2 w-full">
            <input
              type="radio"
              className="h-5 w-5"
              checked={resume === "optional"}
              onChange={() => setResume("optional")}
            />
            Option
          </label>
          <p className="ml-[31px] text-sm text-gray-500">
            People can choose whether to include a resume
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className=" font-semibold">Is there an application deadline</p>
        <div className="w-full p-3 border border-gray-300 rounded-md ">
          <label className="flex gap-2 w-full">
            <input
              type="radio"
              className="h-5 w-5"
              checked={isDate}
              onChange={() => setIsDate(true)}
            />
            Yes
          </label>
        </div>
        <div className="w-full p-3 border border-gray-300 rounded-md ">
          <label className="flex gap-2 w-full">
            <input
              type="radio"
              className="h-5 w-5"
              checked={!isDate}
              onChange={() => setIsDate(false)}
            />
            No
          </label>
        </div>
        {isDate && (
          <div>
            <input
              type="date"
              id=""
              onChange={(event) => setDeadline(event.target.value)}
            />
          </div>
        )}
      </div>
      <div className="flex justify-between">
        <Button
          type="button"
          color="gray.500"
          rounded="full"
          _hover={{
            color: "gray.800",
          }}
          display="flex"
          gap="2"
          alignItems="center"
          onClick={() => setSection("middle")}
        >
          <FaChevronLeft /> Previous
        </Button>
        <Button
          type="button"
          bg="green.500"
          color="white"
          w="200px"
          px="16px"
          py="12px"
          rounded="full"
          _hover={{
            bg: "green.600",
            color: "white",
          }}
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          Save and Continue
        </Button>
      </div>
    </form>
  );
};
export default End;
