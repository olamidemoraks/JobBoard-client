import ProfileBuildLayout from "@/components/Layout/ProfileBuildLayout";
import Input from "@/components/Utils/Input";
import { Formik } from "formik";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Profile } from "@/type/types";
type phoneProps = {};

const phone: React.FC<phoneProps> = () => {
  const [resume, setResume] = useState<Profile>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("profile") as string);
    }
  });
  const initialData = {
    Mobileno: resume?.Mobileno ?? "",
  };

  const router = useRouter();

  const handleSave = (values: any, formProps: any) => {
    const profile = JSON.parse(localStorage.getItem("profile") as string);
    localStorage.setItem("profile", JSON.stringify({ ...profile, ...values }));
    router.push("address");
  };
  return (
    <ProfileBuildLayout width="w-[25%]">
      <Formik initialValues={initialData} onSubmit={handleSave}>
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          touched,
        }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-3">
            <p className="text-2xl font-semibold">
              Would you like to add a phone number to your resume?
            </p>
            <label className="font-semibold mt-2" htmlFor="phone">
              Phone number
            </label>
            <label className="text-sm">
              Only provided to employers you apply or respond to
            </label>
            <div
              className={` w-full border border-gray-400 rounded-[4px] px-3 py-2 focus:border-b-[2px] focus:border-b-primary-dark`}
            >
              <input
                autoComplete="off"
                id="phone"
                type="tel"
                className="w-full outline-none bg-transparent placeholder:text-gray-500 "
                placeholder=""
                name="Mobileno"
                value={values.Mobileno}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <button
              className=" bg-mid-green text-white w-[100px] py-3 rounded-md"
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
export default phone;
