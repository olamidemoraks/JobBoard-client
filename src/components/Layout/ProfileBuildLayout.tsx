import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/router";
type ProfileBuildLayoutProps = {
  children: any;
  width: string;
};

const ProfileBuildLayout: React.FC<ProfileBuildLayoutProps> = ({
  children,
  width,
}) => {
  const router = useRouter();

  return (
    <div className="relative pt-[5rem] flex justify-center mx-6">
      <div className=" w-[600px] mb-4">
        <div className="mb-2">
          <div className="flex justify-between px-1 py-2 mb-2">
            <BsArrowLeft
              onClick={() => router.back()}
              size={21}
              fontWeight="600"
              className=" text-[19px] cursor-pointer"
            />

            {/* <button className="font-semibold text-mid-green ">
              Save and exit
            </button> */}
          </div>
          <div className="mt-3 bg-gray-300 w-full">
            <div className={`${width} h-[4px] rounded-md bg-mid-green `} />
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};
export default ProfileBuildLayout;
