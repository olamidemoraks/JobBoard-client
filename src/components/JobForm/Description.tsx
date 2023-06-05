import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import dynamic from "next/dynamic";
import Loader from "../Utils/Loader";
import "react-quill/dist/quill.snow.css";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <Loader />,
});

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

type DescriptionProps = {
  setSection: (value: string) => void;
  setformData: (value: any) => void;
};

const Description: React.FC<DescriptionProps> = ({
  setSection,
  setformData,
}) => {
  const [content, setContent] = useState("");

  const descriptionHandler = () => {
    if (!content) {
      return;
    }
    setformData((prev: any) => {
      return {
        ...prev,
        Description: content,
      };
    });

    setSection("middle");
  };
  console.log(typeof content);

  return (
    <>
      <div className="">
        <QuillNoSSRWrapper
          modules={modules}
          onChange={setContent}
          theme="snow"
          className="min-h-[60vh] flex-1 mb-4"
          placeholder="Job description goes here..."
        />
        <div className="flex gap-5 justify-between">
          <Button
            type="button"
            color="gray.500"
            rounded="full"
            _hover={{
              color: "gray.800",
            }}
            display="flex"
            gap="2"
            alignItems="center"
            onClick={() => setSection("start")}
          >
            <FaChevronLeft /> Previous
          </Button>
          <Button
            type="button"
            bg="green.500"
            color="white"
            w="100px"
            px="16px"
            py="12px"
            rounded="full"
            _hover={{
              bg: "green.600",
              color: "white",
            }}
            onClick={descriptionHandler}
          >
            Continue
          </Button>
        </div>
      </div>
    </>
  );
};
export default Description;
