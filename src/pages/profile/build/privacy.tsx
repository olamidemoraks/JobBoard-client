import ProfileBuildLayout from "@/components/Layout/ProfileBuildLayout";
import { Profile } from "@/type/types";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

type privacyProps = {};

const privacy: React.FC<privacyProps> = () => {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const [resume, setResume] = useState<Profile>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("profile") as string);
    }
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem(
      "profile",
      JSON.stringify({ ...resume, Visibility: isVisible })
    );
    router.push("preference");
  };
  return (
    <ProfileBuildLayout width="w-[87%]">
      <form onSubmit={handleSubmit}>
        <div>
          <h1 className="text-2xl font-bold mb-3 mt-2">
            Make your resume public so employers can find you
          </h1>
          <div className="flex flex-col gap-3">
            <div
              onClick={() => setIsVisible(true)}
              className={`flex flex-col gap-2 border rounded-lg p-3 cursor-pointer ${
                isVisible ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <IoEye className=" text-[20px]" />
                  <p className=" font-semibold">Public</p>
                </div>
                <input
                  type="radio"
                  className="h-6 w-6"
                  checked={isVisible ? true : false}
                  onChange={() => {}}
                />
              </div>
              <div className="cursor-pointer text-[13px]">
                Your resume and profile information can be found on wiHire by
                employers looking for qualified candidates, according to our
                terms.
              </div>
            </div>
            <div
              onClick={() => setIsVisible(false)}
              className={`flex flex-col gap-2 border rounded-lg p-3 cursor-pointer ${
                !isVisible ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <IoEyeOff className=" text-[20px]" />
                  <p className=" font-semibold">Private</p>
                </div>
                <input
                  type="radio"
                  className="h-6 w-6"
                  checked={!isVisible ? true : false}
                  onChange={() => {}}
                />
              </div>
              <div className="cursor-pointer text-[13px]">
                Employers cannot find your resume in the search on weHire. This
                does not affect previous application or prevent employers your
                responded to from contacting you.
              </div>
            </div>
          </div>
          <Button
            mt="1rem"
            color="white"
            bg="#225a49"
            _hover={{ bg: "#1c4b3d" }}
            width="90px"
            type="submit"
          >
            Continue
          </Button>
        </div>
      </form>
    </ProfileBuildLayout>
  );
};
export default privacy;
