import { getProfile } from "@/app/apiQuery";
import { Profile } from "@/type/types";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useQuery } from "react-query";

type HeroProps = {};

const Hero: React.FC<HeroProps> = () => {
  const { data, isLoading, isError } = useQuery<Profile>(
    "profile",
    getProfile,
    {
      // refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="bg-gradient relative top-0 left-0 right-0 w-[100%] mx-auto  flex items-center overflow-x-hidden  overflow-y-scroll xl:px-[260px] lg:px-[100px]  md:px-[40px] px-[100px]  justify-between pt-[8rem] md:flex-row flex-col-reverse h-screen  lg:gap-[2rem] md:gap-[6rem] sm:gap-[2px] snap-mandatory snap-start">
      <div className="flex flex-col w-full flex-1 items-start mt-1  mb-[6rem]">
        <div className="relative">
          <p className="lg:text-[68px] text-[56px] max-w-[450px] text-white tracking-wider leading-[74px]">
            Follow your dream job
          </p>
          <div className="w-[60px] h-[40px] absolute left-[10rem] md:left-[17rem] lg:left-[24rem] bottom-8 md:bottom-14 lg:bottom-9">
            <img
              className="w-full h-full object-contain "
              src="./images/sparkles.png"
              alt="sparkle"
            />
          </div>
          <div className="w-[200px] h-[70px] absolute md:left-[10rem] left-[2rem] -bottom-12">
            <img className="w-full h-full" src="./images/wave.png" alt="wave" />
          </div>
        </div>
        <p className=" text-gray-300 text-[20px] max-w-[350px] mt-[3rem] ">
          Explore thousands of jobs in one place and get the job of your dream.
        </p>
        <div className="flex gap-7 mt-[3rem] md:flex-row flex-col w-full">
          <Link
            href="/jobs"
            className=" px-6 py-4 font-bold rounded-lg bg-light-green md:w-[160px] text-center hover:bg-[#4dfacc] transition duration-300"
          >
            Find a job
          </Link>
          <Link
            href="/employee"
            className=" bg-mid-green text-white px-6 py-4 font-bold rounded-lg  md:w-[160px] text-center hover:bg-[#266553] transition duration-300"
          >
            Post Job
          </Link>
        </div>
      </div>
      <div className="flex-1 relative w-full justify-end items-center top-0 right-0 lg:translate-x-28 md:flex hidden">
        {/* " bg-mid-green/50 h-[500px] w-[400px] relative blur-3xl -top-[80px] md:-right-[200px] right-[0] z-0" */}
        <div className=" bg-mid-green/50 h-[500px] w-[400px] relative blur-3xl -top-[80px] md:-right-[200px] right-0 z-0" />
        <div className="absolute right-0 top-20 group">
          <div className="w-[270px]  group-hover:rotate-6 h-[250px] bg-mid-green absolute translate-x-[7.3rem] -translate-y-20  rounded-[23px] border border-light-green/30 group-hover:translate-x-[8rem] group-hover:-translate-y-[5.2rem] ease-linear duration-300" />
          <div className="w-[300px] group-hover:shadow-lg group-hover:shadow-green-500 group-hover:rotate-6 h-[300px] bg-dark-green absolute  translate-x-[4.3rem] -translate-y-16 rounded-[23px] border border-light-green/30 group-hover:translate-x-[5rem] group-hover:-translate-y-[4.5rem] ease-linear duration-[.4s]" />
          <div className="w-[350px] group-hover:shadow-xl group-hover:shadow-green-500/50 h-[350px] relative rounded-[23px] -top-12  border border-light-green/30 group-hover:w-[355px] group-hover:h-[355px] ease-linear duration-300">
            <img
              src="./images/female.jpg"
              alt="female"
              className="w-full h-full object-cover rounded-[23px] "
            />
            <div className="w-[240px] green-glass absolute -bottom-[1.6rem]  md:-right-[2rem] sm-left-[2rem] z-10  rounded-[23px] flex flex-col p-3 gap-2">
              <p className="text-white text-[15px] tracking-wide font-semibold">
                {data?.JobTitle ?? "No profile. Click Here to Create Profile"}
              </p>
              <p className=" text-gray-400 text-sm ">{`${data?.FName ?? ""} ${
                data?.LName ?? ""
              }`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
