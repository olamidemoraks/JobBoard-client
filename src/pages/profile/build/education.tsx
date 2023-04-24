import ProfileBuildLayout from "@/components/Layout/ProfileBuildLayout";
import Input from "@/components/Utils/Input";
import { Profile } from "@/type/types";
import { month, year } from "@/utils/constant";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import * as yup from "yup";

type educationProps = {};

const initialData = {
  Level: "",
  CollegeName: "",
  Field: "",
  EducationPeriod: "",
  Country: "",
  City_State: "",
};
const validateScheme = yup.object().shape({
  Level: yup.string().required("Level of education is required"),
});
const education: React.FC<educationProps> = () => {
  const router = useRouter();
  const [isEnroll, setIsEnroll] = useState(false);
  const [fromEnrolled, setFromEnrolled] = useState({ month: "", year: 0 });
  const [toEnrolled, setToEnrolled] = useState({ month: "", year: 0 });
  const [yearError, setYearError] = useState("");
  const [monthError, setMonthError] = useState("");
  useEffect(() => {
    [
      setTimeout(() => {
        setMonthError("");
        setYearError("");
      }, 3000),
    ];
  }, [yearError, monthError]);

  const handleSave = (values: any) => {
    if (!fromEnrolled.month && fromEnrolled.year === 0) {
      if (!fromEnrolled.month) {
        setMonthError("please enter the month of enrollment");
      }
      if (fromEnrolled.year === 0) {
        setYearError("please enter the year of enrollment");
      }
      return;
    }
    const data = {
      ...values,
      EducationPeriod: `${fromEnrolled?.month as string} ${
        fromEnrolled?.year
      } to ${toEnrolled?.month} ${toEnrolled?.year}`,
    };
    const profile: Profile = JSON.parse(
      localStorage.getItem("profile") as string
    );
    localStorage.setItem(
      "profile",
      JSON.stringify({
        ...profile,
        Education: [{ ...profile.Education, ...data }],
      })
    );
    router.push("experience");
  };
  const handleSkip = () => {
    router.push("experience");
  };
  const handleFromEnrolled = (
    event: React.ChangeEvent<HTMLSelectElement>,
    name: string
  ) => setFromEnrolled((prev) => ({ ...prev, [name]: event.target.value }));
  const handleToEnrolled = (
    event: React.ChangeEvent<HTMLSelectElement>,
    name: string
  ) => setToEnrolled((prev) => ({ ...prev, [name]: event.target.value }));
  return (
    <ProfileBuildLayout width="w-[45%]">
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
            <p className="text-2xl font-semibold">Add education </p>
            <Input
              value={values.Level}
              name="Level"
              handleBlur={handleBlur}
              onChange={handleChange}
              id="level"
              label="Level of education *"
              placeholder=""
              type="text"
              error={errors.Level}
              touched={touched.Level}
            />
            <Input
              value={values.Field}
              name="Field"
              handleBlur={handleBlur}
              onChange={handleChange}
              id="field"
              label="Field of study"
              placeholder=""
              type="text"
            />
            <Input
              value={values.CollegeName}
              name="CollegeName"
              handleBlur={handleBlur}
              onChange={handleChange}
              id="collegeName"
              label="School name"
              placeholder=""
              type="text"
            />
            <label className="font-semibold mt-2" htmlFor="phone">
              Country
            </label>
            <p>Nigeria</p>
            <Input
              value={values.City_State}
              name="City_State"
              handleBlur={handleBlur}
              onChange={handleChange}
              id="city"
              label="City, State"
              placeholder=""
              type="text"
            />

            <label>Time period</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="h-5 w-5"
                checked={isEnroll}
                onChange={() => {
                  setIsEnroll((prev) => !prev);
                }}
              />
              <span>Currently enrolled</span>
            </div>
            <label className="font-semibold mt-2" htmlFor="from">
              From
            </label>
            <div className="flex gap-3">
              <div className=" w-full ">
                <div
                  className={` w-full border border-gray-400 rounded-[4px] px-3 py-2 focus:border-b-[2px] focus:border-b-primary-dark`}
                >
                  <select
                    className=" bg-transparent w-full h-full"
                    onChange={(e) => handleFromEnrolled(e, "month")}
                  >
                    <option value="">Month</option>
                    {month.map((value, id) => (
                      <option key={id} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
                {monthError && (
                  <p className=" text-sm text-red-500 pt-1">{monthError}</p>
                )}
              </div>
              <div className=" w-full ">
                <div
                  className={` w-full border border-gray-400 rounded-[4px] px-3 py-2 focus:border-b-[2px] focus:border-b-primary-dark`}
                >
                  <select
                    className=" bg-transparent w-full h-full"
                    onChange={(e) => handleFromEnrolled(e, "year")}
                  >
                    <option value="">Year</option>
                    {year().map((value, id) => (
                      <option key={id} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
                {yearError && (
                  <p className=" text-sm text-red-500 pt-1">{yearError}</p>
                )}
              </div>
            </div>
            <label className="font-semibold mt-2" htmlFor="from">
              To
            </label>
            {!isEnroll ? (
              <>
                <div className="flex gap-3">
                  <div
                    className={` w-full border border-gray-400 rounded-[4px] px-3 py-2 focus:border-b-[2px] focus:border-b-primary-dark`}
                  >
                    <select
                      className=" bg-transparent w-full h-full"
                      onChange={(e) => handleToEnrolled(e, "month")}
                    >
                      <option value="">Month</option>
                      {month.map((value, id) => (
                        <option key={id} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div
                    className={` w-full border border-gray-400 rounded-[4px] px-3 py-2 focus:border-b-[2px] focus:border-b-primary-dark`}
                  >
                    <select
                      className=" bg-transparent w-full h-full"
                      onChange={(e) => handleToEnrolled(e, "year")}
                    >
                      <option value="">Year</option>

                      {year().map((value, id) => (
                        <option key={id} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            ) : (
              <p className=" text-gray-600">Present</p>
            )}
            <div className="flex gap-3 mt-2">
              <button
                className=" bg-mid-green text-white w-[100px] py-3 rounded-md "
                type="submit"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleSkip}
                className=" border-[3px]  text-mid-green w-[100px] py-3 rounded-md "
              >
                Skip
              </button>
            </div>
          </form>
        )}
      </Formik>
    </ProfileBuildLayout>
  );
};
export default education;
