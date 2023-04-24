import { Job } from "@/type/types";
import React, { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

type JobDetailsProps = {
  Job: Job | undefined;
};

const JobDetails: React.FC<JobDetailsProps> = ({ Job }) => {
  const [isDrawer, setIsDrawer] = useState(false);
  console.log(Job);
  return (
    <div className="flex gap-4 my-4 md:flex-row flex-col px-7">
      <div className="flex-1 flex flex-col ">
        <p className=" font-black">Job Description</p>
        <div className="">
          {/* job description */}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          cumque aspernatur fugiat quam. Atque cum repudiandae doloremque fuga
          vel eaque nobis. Similique consectetur hic cumque, et optio modi omnis
          laboriosam earum sed? Voluptatem, eius tempora. Beatae illum
          temporibus, porro optio minus ex expedita, aut cupiditate quo saepe
          doloremque, natus adipisci sapiente provident sit commodi est
          perspiciatis dolorum eius molestias deserunt voluptatum cumque
          molestiae. Eos, temporibus doloribus nisi hic voluptates ratione
          repellat recusandae. Culpa commodi vel, nihil incidunt a itaque
          cupiditate officiis doloribus optio, harum asperiores magnam adipisci
          esse alias corporis molestias illo minus quisquam enim, unde sit! Quos
          repellendus quasi omnis eos dolorum minus ratione veritatis molestias
          quisquam. Dolore asperiores placeat quae ut facere, eum rem suscipit
          beatae magni voluptate dolorem ullam voluptatibus a voluptatem ipsam
          eligendi. Velit perspiciatis pariatur laboriosam expedita consequuntur
          vero praesentium perferendis obcaecati provident modi voluptatum
          accusantium maiores voluptas, quidem amet iure placeat explicabo
          tempore soluta fugiat! Nihil accusamus ducimus totam distinctio animi
          voluptatum nulla commodi incidunt amet, enim corporis saepe possimus
          nemo consectetur sunt, exercitationem quae! Id ducimus earum, itaque
          ipsum fuga voluptas quisquam cupiditate magnam, quam voluptate
          voluptatem minus laboriosam inventore asperiores ipsam officiis
          facilis exercitationem tenetur quae quasi deleniti, tempora fugit
          architecto vitae.
        </div>
      </div>
      <div className="flex-[0.5] border border-gray-200 rounded-[7px]  p-3 gap-4 flex-col md:flex hidden">
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
          <p className="text-sm">{Job?.isRemote ? "Yes" : "Not Remotely"}</p>
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
        <div className="flex flex-col gap-2">
          <p className=" font-black text-sm">Contact</p>
          <p className="text-sm">{Job?.Contact}</p>
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

            <div className="flex flex-col gap-2 ">
              <p className=" font-black text-sm">Benfits</p>
              <ul className="flex gap-1 justify-start flex-wrap">
                {Job?.Benefits?.map((benefit, idx) => (
                  <li className="text-sm">{benefit},</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <p className=" font-black text-sm">Contact</p>
              <p className="text-sm">{Job?.Contact}</p>
            </div>
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
};
export default JobDetails;
