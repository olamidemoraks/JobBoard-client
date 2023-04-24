import AuthRoute from "@/components/Layout/AuthRoute";
import About from "@/components/Multistep-form/About";
import CompanyInfo from "@/components/Multistep-form/CompanyInfo";
import Name from "@/components/Multistep-form/Name";
import useProfile from "@/hooks/useProfile";
import React from "react";
import { useForm, useStep, Step } from "react-hooks-helper";

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

const Setup: React.FC = () => {
  const { email } = useProfile();
  const defaultData = {
    Name: "",
    Email: email,
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
  const [formData, setForm] = useForm(defaultData);
  const { step, navigation }: Step | any = useStep({
    steps,
    initialStep: 0,
  });
  const props = { navigation, formData, setForm };
  switch (step.id) {
    case "name":
      return <Name {...props} />;
    case "company":
      return <CompanyInfo {...props} />;
    case "about":
      return <About {...props} />;
  }
  return <div></div>;
};
export default AuthRoute(Setup);
