import Image from "next/image";
import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="flex h-[2rem] w-[2rem] relative items-center justify-between ">
        <Image
          src={"/images/logo.svg"}
          height={100}
          width={200}
          className="w-full h-full object-cover scale-[2.5]"
          alt="logo"
        />
      </div>
      <p className="md:text-2xl text-xl  font-bold">WiHire</p>
    </div>
  );
};
export default Logo;
