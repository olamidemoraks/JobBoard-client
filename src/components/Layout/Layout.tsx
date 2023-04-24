import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Sidebar from "../EmployerLayout/Sidebar";

const DynamicNavbarWithNoSSR = dynamic(() => import("../Navbar/Navbar"), {
  ssr: false,
});
const DynamicEmployerNavbarWithNoSSR = dynamic(
  () => import("../EmployerLayout/Navbar"),
  {
    ssr: false,
  }
);
type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  if (router.pathname.split("/")[1] === "employee") {
    return (
      <div className="flex h-[100vh] ">
        <Sidebar />
        <div className="w-full overflow-y-scroll">
          <DynamicEmployerNavbarWithNoSSR />
          <main className="md:px-10 px-5 pt-5  w-full ">{children}</main>
        </div>
      </div>
    );
  }
  return (
    <div className=" overflow-x-hidden min-h-[100vh]">
      <DynamicNavbarWithNoSSR />
      <main>{children}</main>
    </div>
  );
};
export default Layout;
