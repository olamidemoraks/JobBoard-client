import { Button } from "@chakra-ui/react";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";

type DescriptionProps = {
  setSection: (value: string) => void;
  setformData: (value: any) => void;
};

const Description: React.FC<DescriptionProps> = ({
  setSection,
  setformData,
}) => {
  return (
    <>
      {/* <div>
<MDEditor value={mdValue} onChange={setMdValue} />
</div> */}
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
          onClick={() => setSection("middle")}
        >
          Continue
        </Button>
      </div>
    </>
  );
};
export default Description;
