import React from "react";
import { FcGoogle } from "react-icons/fc";

type GoogleButtonProps = {
  login: () => void;
};

const GoogleButton: React.FC<GoogleButtonProps> = ({ login }) => {
  return (
    <button
      className="flex items-center w-full border border-gray-300 rounded-md px-4 py-3 justify-between bg-gray-100 hover:bg-gray-200"
      onClick={login}
    >
      <FcGoogle size={"23px"} />
      <p className=" font-semibold ">Continue with Google</p>
      <div />
    </button>
  );
};
export default GoogleButton;
