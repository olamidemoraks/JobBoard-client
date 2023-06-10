import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const success: React.FC = () => {
  return (
    <div className="relative pt-[5rem] flex justify-center mx-6">
      <div className="flex flex-col justify-center text-center gap-5 items-center">
        <div className="h-[200px] w-[200px] ">
          <img
            loading="lazy"
            className="w-full h-full"
            src="../../images/success.jpg"
            alt="success"
          />
        </div>
        <h1 className="text-[27px] font-semibold">
          Your WiHire Resume is ready to share
        </h1>
        <p className=" text-[20px] text-gray-500">
          Now let’s find your next job
        </p>
        <div className="flex gap-4">
          <Link
            href="/profile"
            className="px-4 py-3 bg-mid-green/90  hover:bg-mid-green text-white flex justify-center items-center gap-3 rounded-lg w-[240px] ease-linear duration-200"
          >
            <p className=" font-semibold">Continue to Profile</p>
            <FaArrowRight />
          </Link>
          <Link
            href="/"
            className="px-4 py-3 text-mid-green flex gap-3 justify-center items-center border border-gray-300 hover:border-mid-green rounded-lg w-[240px] ease-linear duration-200"
          >
            <p className=" font-semibold">Find Jobs</p> <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default success;
