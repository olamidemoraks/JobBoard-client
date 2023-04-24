import Input from "@/components/Utils/Input";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateJobMutation } from "@/feature/employer/employerApiSlice";
import { Button } from "@chakra-ui/react";
import Start from "@/components/JobForm/Start";
import Description from "@/components/JobForm/Description";
import Middle from "@/components/JobForm/Middle";
import End from "@/components/JobForm/End";
import AuthRoute from "@/components/Layout/AuthRoute";
// import "@uiw/react-md-editor/markdown-editor.css";
// import "@uiw/react-markdown-preview/markdown.css";
// import dynamic from "next/dynamic";

type CreateJobProps = {};

const CreateJob: React.FC<CreateJobProps> = () => {
  const [isRemote, setIsRemote] = React.useState(false);
  const [formData, setformData] = React.useState({});
  const [benefits, setBenefits] = React.useState<string[]>(["None"]);
  const [payType, setPayType] = React.useState("Range");
  const [currency, setCurrency] = React.useState("USD");
  const [frequency, setFrequency] = React.useState("yr");
  const [sections, setSections] = React.useState("start");

  const handleBenefit = (value: string) => {
    setBenefits((props: any) => {
      if (props?.includes(value)) {
        return props?.filter((values: any) => values !== value);
      }
      if (value === "None") {
        return [value];
      } else {
        return props?.concat(value).filter((values: any) => values !== "None");
      }
    });
  };
  console.log(formData);

  return (
    <div className="flex justify-center mr-6">
      <div className="px-2 ">
        <div className=" mt-6 ">
          <p className=" text-xl font-semibold">Create Job Application</p>
          <p className=" text-green-700 font-semibold text-sm mt-2">
            80% of employers who post a job on WiHire get a quality candidate
            through the site within the first day!
          </p>
        </div>
        <>
          <div className="flex flex-col gap-5 mt-10 mb-10">
            {sections === "start" && (
              <Start
                isRemote={isRemote}
                setIsRemote={setIsRemote}
                setSection={setSections}
                setformData={setformData}
              />
            )}
            {sections === "description" && (
              <Description setSection={setSections} setformData={setformData} />
            )}
            {sections === "middle" && (
              <Middle
                benefits={benefits}
                handleBenefit={handleBenefit}
                setPayType={setPayType}
                payType={payType}
                setCurrency={setCurrency}
                setFrequency={setFrequency}
                setSections={setSections}
                setformData={setformData}
                currency={currency}
                frequency={frequency}
              />
            )}
            {sections === "end" && (
              <End
                setSection={setSections}
                setformData={setformData}
                formData={formData}
              />
            )}
          </div>
        </>
      </div>
    </div>
  );
};
export default AuthRoute(CreateJob);
