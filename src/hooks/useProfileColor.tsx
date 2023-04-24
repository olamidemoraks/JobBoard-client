import React, { useEffect, useState } from "react";

const useProfileColor = ({ colorPallete }: { colorPallete: any }) => {
  const [bgColor, setBgColor] = useState("");
  console.log("color pallete", colorPallete);
  useEffect(() => {
    setBgColor(
      colorPallete[
        Math.floor(Math.random() * 5) + Math.floor(Math.random() * 5) ?? 0
      ]
    );
  }, []);
  return {
    bgColor,
  };
};
export default useProfileColor;
