import { Profile } from "@/type/types";
import { month, year } from "@/utils/constant";
import { Formik } from "formik";
import { useState } from "react";
import Input from "../../Utils/Input";
import { UseMutationResult } from "react-query";

type EducationInfoProps = {
  resume?: Profile;
  closeOption: (value: boolean) => void;
  setResume?: (value: Profile) => void;
  index?: string;
  setIndex?: (value: string) => void;
  isEditing?: boolean;
  mutation?: UseMutationResult;
};

const EducationInfo: React.FC<EducationInfoProps> = ({
  closeOption,
  resume,
  setResume,
  index,
  setIndex,
  isEditing = false,
  mutation,
}) => {
  const initialEdu = resume?.Education?.find((work, idx) => {
    if (index) {
      if (Number(index) === idx) {
        return work;
      }
    } else {
      return;
    }
  });

  const initialData = {
    Level: initialEdu?.Level ?? "",
    CollegeName: initialEdu?.CollegeName ?? "",
    Field: initialEdu?.Field ?? "",
    EducationPeriod: initialEdu?.EducationPeriod ?? "",
    Country: "",
    City_State: initialEdu?.City_State ?? "",
  };
  const [isEnroll, setIsEnroll] = useState(false);
  const [fromEnrolled, setFromEnrolled] = useState({ month: "", year: 0 });
  const [toEnrolled, setToEnrolled] = useState({ month: "", year: 0 });

  const newEducationProfile = (values: any) => {
    let period;

    if (fromEnrolled.year === 0 || !fromEnrolled.month) {
      if (!index) {
        period = "";
      } else {
        period = initialEdu?.EducationPeriod as string;
      }
    } else {
      period = `${fromEnrolled?.month as string} ${fromEnrolled?.year} to ${
        toEnrolled?.month
      }${toEnrolled?.year === 0 ? "Present" : toEnrolled?.year}`;
    }
    const data = {
      ...values,
      EducationPeriod: period,
    };
    if (!index) {
      localStorage.setItem(
        "profile",
        JSON.stringify({
          ...resume,
          Education: [...resume!.Education, { ...data }],
        })
      );
    } else {
      const updatedResume: any = resume?.Education.map((work, idx) => {
        if (Number(index) === idx) {
          return data;
        }
        return work;
      });
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...resume!, Education: [...updatedResume] })
      );
      setIndex!("");
    }
    setResume!(JSON.parse(localStorage.getItem("profile") as string));
  };

  const updateProfileEducation = (values: any) => {
    let period;

    if (fromEnrolled.year === 0 || !fromEnrolled.month) {
      if (!index) {
        period = "";
      } else {
        period = initialEdu?.EducationPeriod as string;
      }
    } else {
      period = `${fromEnrolled?.month} ${fromEnrolled?.year} to ${
        toEnrolled?.month
      }${toEnrolled?.year === 0 ? "Present" : toEnrolled?.year}`;
    }

    const data = {
      ...values,
      EducationPeriod: period,
    };
    if (!index) {
      mutation?.mutate({
        data: { Education: [...(resume?.Education as any), data] },
      });
    } else {
      const updatedResume = resume?.Education.map((work, idx) => {
        if (Number(index) === idx) {
          return data;
        }
        return work;
      });
      mutation?.mutate({
        data: { Education: [...(updatedResume as any)] },
      });

      setIndex!("");
    }
  };

  const handleSave = (values: any) => {
    if (!isEditing) {
      newEducationProfile(values);
    } else {
      updateProfileEducation(values);
    }
    closeOption(false);
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
    <div className="mt-4">
      <Formik initialValues={initialData} onSubmit={handleSave}>
        {({ handleBlur, handleChange, handleSubmit, values }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-3">
            <Input
              value={values.Level}
              name="Level"
              handleBlur={handleBlur}
              onChange={handleChange}
              id="level"
              label="Level of education *"
              placeholder=""
              type="text"
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
            />
            <div className="flex flex-col gap-2">
              <p>
                City - Nigeria (
                <span className=" text-blue-600 hover:underline cursor-pointer">
                  Change
                </span>
                )
              </p>
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
              />
            </div>

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
              <div
                className={` w-full border border-gray-400 rounded-[4px] px-3 py-2 focus:border-b-[2px] focus:border-b-primary-dark`}
              >
                <select
                  className=" bg-transparent w-full"
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
              <div
                className={` w-full border border-gray-400 rounded-[4px] px-3 py-2 focus:border-b-[2px] focus:border-b-primary-dark`}
              >
                <select
                  className=" bg-transparent w-full"
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
                      className=" bg-transparent w-full"
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
                      className=" bg-transparent w-full "
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

            <div className="flex gap-5">
              <button
                className="px-3 py-2 rounded-lg bg-blue-600 text-white "
                type="submit"
              >
                Save
              </button>
              <button
                className="px-3 py-2 rounded-lg border-[1px] border-gray-400"
                onClick={() => closeOption(false)}
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
export default EducationInfo;
