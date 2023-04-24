import { useState, useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/router";
import ProfileBuildLayout from "@/components/Layout/ProfileBuildLayout";
import { Formik } from "formik";
import * as yup from "yup";
import Input from "@/components/Utils/Input";
import { useGetProfileQuery } from "@/feature/profile/profileApiSlice";
import { Profile } from "@/type/types";
import useProfile from "@/hooks/useProfile";
type nameProps = {};

const nameScheme = yup.object().shape({
  FName: yup.string().required("please enter your first name"),
  LName: yup.string().required("please enter your last name"),
});

const name: React.FC<nameProps> = () => {
  const router = useRouter();
  const { email } = useProfile();
  const [resume, setResume] = useState<Profile>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("profile") as string);
    }
  });

  const initialData = {
    FName: resume?.FName ?? "",
    LName: resume?.LName ?? "",
    Email: email ?? "",
  };
  const handleSave = (values: any, formProps: any) => {
    const profile = JSON.parse(localStorage.getItem("profile") as string);
    localStorage.setItem("profile", JSON.stringify({ ...profile, ...values }));
    router.push("phone");
  };
  return (
    <ProfileBuildLayout width="w-[15%]">
      <Formik
        initialValues={initialData}
        validationSchema={nameScheme}
        onSubmit={handleSave}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          touched,
        }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-3">
            <p className="text-2xl font-semibold">What is your name?</p>
            <Input
              value={values.FName}
              name="FName"
              handleBlur={handleBlur}
              onChange={handleChange}
              id="fname"
              label="First Name *"
              placeholder=""
              type="text"
              error={errors.FName}
              touched={touched.FName}
            />
            <Input
              value={values.LName}
              name="LName"
              handleBlur={handleBlur}
              onChange={handleChange}
              id="lname"
              label="Last Name *"
              placeholder=""
              type="text"
              error={errors.LName}
              touched={touched.LName}
            />
            <Input
              value={values.Email}
              name="Email"
              handleBlur={handleBlur}
              onChange={handleChange}
              id="email"
              label="Email Address"
              placeholder=""
              type="email"
            />
            <button
              className=" bg-mid-green text-white w-[100px] py-2 rounded-md"
              type="submit"
            >
              Continue
            </button>
          </form>
        )}
      </Formik>
    </ProfileBuildLayout>
  );
};
export default name;
