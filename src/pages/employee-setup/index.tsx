import AuthRoute from "@/components/Layout/AuthRoute";
import About from "@/components/Multistep-form/About";
import CompanyInfo from "@/components/Multistep-form/CompanyInfo";
import Name from "@/components/Multistep-form/Name";
import useProfile from "@/hooks/useProfile";
import React, { useState } from "react";
import { useForm as reactForm } from "react-hook-form";

export type FormType = {
  Name: string;
  Email: string;
  MobileNo: string;
  Location: string;
  Snippet: string;
  CompanyDesc: string;
  Status: string;
  Url: string;
  CompanySize: string;
  CompanyName: string;
  Title: string;
};

const steps = [{ id: "name" }, { id: "company" }, { id: "about" }];
enum STEPS {
  name = 0,
  company = 1,
  about = 2,
}
const Setup: React.FC = () => {
  const { email } = useProfile();
  const defaultData = {
    Name: "",
    Email: email ?? "",
    MobileNo: "",
    Location: "",
    Snippet: "",
    CompanyDesc: "",
    Status: "",
    Url: "",
    CompanyName: "",
    CompanySize: "",
    Title: "",
  };
  const [step, setStep] = useState(STEPS.name);

  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };

  // const [formData, setForm] = useForm(defaultData);

  // const { step, navigation }: Step | any = useStep({
  //   steps,
  //   initialStep: 0,
  // });

  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = reactForm({
    defaultValues: defaultData,
  });

  const setCustomValue = (id: any, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  console.log(getValues());
  const props = { register, errors };
  switch (step) {
    case STEPS.name:
      return (
        <Name
          getAllValues={getValues}
          setValue={setCustomValue}
          onNext={onNext}
        />
      );
    case STEPS.company:
      return (
        <CompanyInfo
          getAllValues={getValues}
          setValue={setCustomValue}
          onNext={onNext}
          onBack={onBack}
        />
      );

    case STEPS.about:
      return (
        <About
          getAllValues={getValues}
          setValue={setCustomValue}
          onBack={onBack}
        />
      );
  }
};
export default AuthRoute(Setup);
