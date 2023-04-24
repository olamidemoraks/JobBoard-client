import React from "react";
import { ScaleLoader } from "react-spinners";
type LoaderProps = {};

const Loader: React.FC<LoaderProps> = () => {
  return (
    <div>
      <ScaleLoader color="#0f2874" />
    </div>
  );
};
export default Loader;
