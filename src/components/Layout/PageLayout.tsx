import React from "react";
import Sidebar from "./Sidebar";

type PageProps = {
  children: any;
};
const PageLayout: React.FC<PageProps> = ({ children }) => {
  return (
    <div className=" pt-[6rem] flex">
      {/* <div className=" static md:left-2 md:h-[60vh] top-2  bg-blue-100 z-50 mr-4">
        <Sidebar />
      </div> */}
      <div className="flex w-full justify-center">{children}</div>
    </div>
  );
};
export default PageLayout;
