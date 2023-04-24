import ProfileBuildLayout from "@/components/Layout/ProfileBuildLayout";
import Input from "@/components/Utils/Input";
import { Profile } from "@/type/types";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import * as yup from "yup";

type addressProps = {};

const validateScheme = yup.object().shape({
  City_State: yup.string().required("City, State is required"),
});
const address: React.FC<addressProps> = () => {
  const [resume, setResume] = useState<Profile>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("profile") as string);
    }
  });
  const initialData = {
    Country: resume?.Country ?? "",
    Address: resume?.Address ?? "",
    PCode: resume?.PCode ?? "",
    City_State: resume?.City_State ?? "",
  };
  const router = useRouter();

  const handleSave = (values: any) => {
    const profile = JSON.parse(localStorage.getItem("profile") as string);
    localStorage.setItem("profile", JSON.stringify({ ...profile, ...values }));
    router.push("education");
  };
  return (
    <ProfileBuildLayout width="w-[35%]">
      <Formik
        initialValues={initialData}
        validationSchema={validateScheme}
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
            <p className="text-2xl font-semibold">Where are you located?</p>
            <p className=" text-lg">This helps match you with nearby jobs</p>
            <label className="font-semibold mt-2" htmlFor="phone">
              Country
            </label>
            <p>Nigeria</p>
            <Input
              value={values.Address}
              name="Address"
              handleBlur={handleBlur}
              onChange={handleChange}
              id="address"
              label="Street Address"
              placeholder=""
              type="text"
              error={errors.Address}
              touched={touched.Address}
            />
            <Input
              value={values.City_State}
              name="City_State"
              handleBlur={handleBlur}
              onChange={handleChange}
              id="city"
              label="City, Street *"
              placeholder=""
              type="text"
              error={errors.City_State}
              touched={touched.City_State}
            />
            <Input
              value={values.PCode}
              name="PCode"
              handleBlur={handleBlur}
              onChange={handleChange}
              id="pcode"
              label="Postal Code"
              placeholder=""
              type="text"
              error={errors.PCode}
              touched={touched.PCode}
            />
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
export default address;
