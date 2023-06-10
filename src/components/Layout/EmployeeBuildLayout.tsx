import React from "react";
import Logo from "../Utils/Logo";

type EmployeeBuildLayoutProps = {
  children: any;
  width: string;
};

const EmployeeBuildLayout: React.FC<EmployeeBuildLayoutProps> = ({
  children,
  width,
}) => {
  return (
    <div className="w-full h-screen p-0 ">
      <div className=" bg-light-green/40 w-full h-2 relative">
        <div className={` h-full bg-green-700 ${width} absolute`} />
      </div>
      <div className="flex items-center mt-20 flex-col">
        <Logo />
        <div className="max-w-[600px] w-[90%]">{children}</div>
      </div>
    </div>
  );
};
export default EmployeeBuildLayout;
