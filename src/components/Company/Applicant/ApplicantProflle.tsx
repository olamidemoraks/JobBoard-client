import { Applicant } from "@/type/types";
import { Divider } from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

type ApplicantProfileProps = {
  applicant?: Applicant;
  download: (value: string) => void;
};

const ApplicantProfile: React.FC<ApplicantProfileProps> = ({
  applicant,
  download,
}) => {
  const profile = applicant?.profile;
  const [fullDesc, setFullDesc] = useState(false);

  const description =
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum suscipit dicta iusto blanditiis praesentium consequuntur officiis voluptatum quibusdam nobis dolorum est quos modi illum accusamus, facilis at impedit alias ab delectus nisi nulla ratione temporibus. Eligendi, quis repellendus velit dicta recusandae eius facere libero, modi vero unde veniam dolore provident eos adipisci numquam explicabo praesentium facilis. Dolorum suscipit nulla voluptatem sit, expedita cumque praesentium nihil delectus similique mollitia reprehenderit quae quisquam. Suscipit explicabo magnam molestiae mollitia assumenda, blanditiis quisquam maxime eveniet molestias voluptas necessitatibus culpa odit impedit. Aliquid quia placeat adipisci quis fugiat accusamus, dolor ipsa, ab voluptatum numquam iste rerum eaque aliquam minus omnis rem optio maxime? Quod reprehenderit maiores quibusdam aliquid qui expedita consectetur? Laudantium corrupti aliquid vel voluptatem. Rem nemo praesentium impedit fugiat nobis delectus debitis ipsum sint explicabo autem et labore odio in tempore, iure excepturi molestias error aperiam cumque, similique ea ullam nostrum magni sequi? Sunt vero pariatur odit voluptatem dolorem eius iusto ut, aperiam id ex enim totam! Molestiae, quibusdam. Eveniet nesciunt, id minus officiis, possimus eaque corporis odit deserunt non eos dolorem quod repellendus ratione quo excepturi maiores fugiat voluptate, ducimus architecto sequi? Voluptates quod, eos quae maxime quaerat sint corporis unde earum. Quibusdam, ducimus rem. A ex quod incidunt esse reprehenderit eligendi, itaque obcaecati hic eaque dolorem nemo voluptatem eius repellat iusto quasi praesentium deleniti, eveniet aliquid id quos odit? Rerum, fugit earum similique ad aut sapiente? Illum non recusandae excepturi tempora, optio pariatur natus, eaque ut praesentium asperiores, consectetur dolorem quia sapiente? Corporis, qui? Ut nam aperiam eos mollitia officiis fuga itaque ducimus assumenda, tempora tenetur nesciunt veniam dolorum veritatis possimus, temporibus non, quas eligendi impedit laudantium! Numquam soluta reiciendis repellendus sequi nemo dolorem ut neque, voluptates saepe laudantium perferendis ullam nihil illo quisquam voluptate delectus quas quod tenetur eum est.";

  return (
    <div className="p-5 flex gap-4 flex-col">
      <div className="flex gap-4 items-center px-4">
        <p className=" font-semibold">Profile Details</p>
        {applicant?.File && applicant?.File !== "undefined" && (
          <button
            className="px-3 py-2 bg-gray-300 rounded-[5px]"
            onClick={() => download(applicant?.File)}
          >
            Resume
          </button>
        )}
      </div>

      <div className="py-4 flex flex-col gap-4">
        <p className="text-[19px] font-black ">Personal Details</p>
        <div className="flex justify-between gap-4 w-[50%]">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p className=" text-gray-600">First Name</p>
              <p>{profile?.FName}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className=" text-gray-600">Gender</p>
              <p>Male</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p className=" text-gray-600">Last Name</p>
              <p>{profile?.LName}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className=" text-gray-600">Date of Birth</p>
              <p>
                {moment(profile?.DOB).format("MMMM DD, YYYY")}
                {"  "}
                <span className=" text-gray-500">
                  {moment(profile?.DOB).fromNow(true)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className="py-4 flex flex-col gap-4">
        <p className="text-[19px] font-black ">Cover Letter</p>
        {applicant?.Notes && (
          <p className=" text-justify">
            {applicant?.Notes.length > 900 && !fullDesc
              ? applicant.Notes.substring(0, 1000) + "..."
              : applicant.Notes}
          </p>
        )}
        <p
          onClick={() => setFullDesc((prev) => !prev)}
          className="flex items-center gap-2 text-green-600 cursor-pointer hover:text-green-700"
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
      <Divider />

      <div className="py-4 flex flex-col gap-4">
        <p className="text-[19px] font-black ">Experiences</p>
        <div className="flex flex-col gap-4">
          {profile?.Work.map((work) => (
            <div className="flex flex-col gap-1">
              <p className=" font-black">
                {work.JobTitle} at {work.Company}
              </p>
              <p>{work.WorkPeriod}</p>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      <div className="py-4 flex flex-col gap-4">
        <p className="text-[19px] font-black ">Educations</p>
        <div className="flex flex-col gap-4">
          {profile?.Education.map((education) => (
            <div className="flex flex-col gap-1">
              <p className=" font-black">
                {education.Field} at {education.CollegeName}
              </p>
              <p>{education.EducationPeriod}</p>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      <div className="py-4 flex flex-col gap-4">
        <p className="text-[19px] font-black ">Skills</p>
        <div className="flex flex-wrap gap-4">
          {profile?.Skills.map((skill) => (
            <p>{skill}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ApplicantProfile;
