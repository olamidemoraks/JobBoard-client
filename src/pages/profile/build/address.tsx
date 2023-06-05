import ProfileBuildLayout from "@/components/Layout/ProfileBuildLayout";
import { MomoizedCountryMenu } from "@/components/Utils/CountryMenu";
import Input from "@/components/Utils/Input";
import useCountry from "@/hooks/useCountry";
import { Profile } from "@/type/types";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import * as yup from "yup";

type addressProps = {};

const validateScheme = yup.object().shape({
  City_State: yup.string().required("City, State is required"),
});
const address: React.FC<addressProps> = () => {
  const { getByValue } = useCountry();
  const [resume, setResume] = useState<Profile>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("profile") as string);
    }
  });
  const initialData = {
    Address: resume?.Address ?? "",
    PCode: resume?.PCode ?? "",
    City_State: resume?.City_State ?? "",
  };
  const [country, setCountry] = useState("");
  const router = useRouter();
  const setCountryOption = useCallback(
    (value: string) => {
      setCountry(value);
    },
    [country]
  );
  const handleSave = (values: any) => {
    const profile = JSON.parse(localStorage.getItem("profile") as string);
    localStorage.setItem(
      "profile",
      JSON.stringify({ ...profile, ...values, Country: country })
    );
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
            <div className="flex w-full justify-between">
              <p>{getByValue(country)?.label ?? "Select Country"} </p>
              <MomoizedCountryMenu setCountryOption={setCountryOption} />
            </div>
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
