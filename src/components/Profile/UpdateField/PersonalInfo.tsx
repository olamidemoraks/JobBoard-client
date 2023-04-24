import { Profile } from "@/type/types";
import React from "react";
import { Formik } from "formik";
import Input from "../../Utils/Input";
import { UseMutationResult } from "react-query";

type PersonalInfoProps = {
  resume?: Profile;
  closeInfo: (value: boolean) => void;
  setResume?: (value: Profile) => void;
  isEditing?: boolean;
  mutation?: UseMutationResult;
};

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  resume,
  closeInfo,
  setResume,
  isEditing = false,
  mutation,
}) => {
  const initialData = {
    FName: resume?.FName ?? "",
    LName: resume?.LName ?? "",
    Headline: resume?.Headline ?? "",
    City_State: resume?.City_State ?? "",
    Mobileno: resume?.Mobileno ?? "",
    Relocate: resume?.Relocate ?? true,
    PCode: resume?.PCode ?? "",
  };

  const handleSave = async (values: any) => {
    if (!isEditing) {
      const data = JSON.parse(localStorage.getItem("profile") as string);
      localStorage.setItem(
        "profile",
        JSON.stringify({
          ...data,
          ...values,
        })
      );

      setResume!(JSON.parse(localStorage.getItem("profile") as string));
    } else {
      try {
        mutation?.mutate({ data: values });
      } catch (error) {
        console.log(error);
      }
    }
    closeInfo(false);
  };
  return (
    <div>
      <p className="mb-3 text-gray-600">Personal Information</p>
      <Formik initialValues={initialData} onSubmit={handleSave}>
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          touched,
        }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              value={values.FName}
              name="FName"
              handleBlur={handleBlur}
              onChange={handleChange}
              id="fname"
              label="First Name - required"
              placeholder=""
              type="text"
            />
            <Input
              value={values.LName}
              name="LName"
              handleBlur={handleBlur}
              onChange={handleChange}
              id="lname"
              label="Last Name - required"
              placeholder=""
              type="text"
            />
            <Input
              value={values.Headline}
              name="Headline"
              handleBlur={handleBlur}
              onChange={handleChange}
              id="headline"
              label="Headline"
              placeholder=""
              type="text"
            />

            <div className="flex flex-col gap-2">
              <p>
                City - Nigeria ({" "}
                <span className=" text-blue-600 hover:underline cursor-pointer">
                  Change
                </span>{" "}
                )
              </p>
              <div>
                <p className=" font-light text-sm">eg. Abuja</p>
                <Input
                  value={values.City_State}
                  name="City_State"
                  handleBlur={handleBlur}
                  onChange={handleChange}
                  id="city"
                  label=""
                  placeholder=""
                  type="text"
                  error={errors.City_State}
                  touched={touched.City_State}
                />
              </div>
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
            </div>

            <div className="flex flex-col gap-1">
              <p>Relocation</p>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  onChange={handleChange}
                  name="Relocate"
                  checked={values.Relocate}
                />
                <span>I am willing to relocate</span>
              </div>
            </div>
            <Input
              id="phone"
              type="tel"
              label="Phone number"
              placeholder=""
              name="Mobileno"
              value={values.Mobileno}
              onChange={handleChange}
            />
            <p className="text-sm text-gray-600">
              By submitting the form, you confirm that you are the primary user
              and subscriber to the telephone number provided, and you agree to
              receive calls (including using artificial or pre-recorded voice),
              texts, and WhatsApp messages from Indeed and employers who use
              Indeed at the telephone number provided above.
            </p>

            <div className="flex gap-5">
              <button
                className="px-3 py-2 rounded-lg bg-blue-600 text-white "
                type="submit"
              >
                Save
              </button>
              <button
                className="px-3 py-2 rounded-lg border-[1px] border-gray-400"
                onClick={() => closeInfo(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
export default PersonalInfo;
