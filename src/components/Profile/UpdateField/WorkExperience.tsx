import { Profile } from "@/type/types";
import { month, year } from "@/utils/constant";
import { Formik } from "formik";
import { useState } from "react";
import Input from "../../Utils/Input";
import { UseMutationResult } from "react-query";

type WorkExperienceProps = {
  resume?: Profile;
  closeOption: (value: boolean) => void;
  setResume?: (value: Profile) => void;
  index?: string;
  setIndex?: (value: string) => void;
  isEditing?: boolean;
  mutation?: UseMutationResult;
};

const WorkExperience: React.FC<WorkExperienceProps> = ({
  closeOption,
  resume,
  setResume,
  index,
  setIndex,
  isEditing = false,
  mutation,
}) => {
  const initialWork = resume?.Work?.find((work, idx) => {
    if (index) {
      if (Number(index) === idx) {
        return work;
      }
    } else {
      return;
    }
  });
  const initialData = {
    JobTitle: initialWork?.JobTitle ?? "",
    Company: initialWork?.Company ?? "",
    WorkPeriod: initialWork?.WorkPeriod ?? "",
    Description: initialWork?.Description ?? "",
    Country: "",
    City_State: initialWork?.City_State ?? "",
  };
  const [isEnroll, setIsEnroll] = useState(false);
  const [fromEnrolled, setFromEnrolled] = useState({ month: "", year: 0 });
  const [toEnrolled, setToEnrolled] = useState({ month: "", year: 0 });

  const newWorkProfile = (values: any) => {
    let period;

    if (fromEnrolled.year === 0 || !fromEnrolled.month) {
      if (!index) {
        period = "";
      } else {
        period = initialWork?.WorkPeriod as string;
      }
    } else {
      period = `${fromEnrolled?.month} ${fromEnrolled?.year} to ${
        toEnrolled?.month
      }${toEnrolled?.year === 0 ? "Present" : toEnrolled?.year}`;
    }
    const data = {
      ...values,
      WorkPeriod: period,
    };
    if (!index) {
      const profile: Profile = JSON.parse(
        localStorage.getItem("profile") as string
      );
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...profile, Work: [...profile.Work, { ...data }] })
      );
    } else {
      const updatedResume: any = resume?.Work.map((work, idx) => {
        if (Number(index) === idx) {
          return data;
        }
        return work;
      });
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...resume!, Work: [...updatedResume] })
      );
      setIndex!("");
    }
    setResume!(JSON.parse(localStorage.getItem("profile") as string));
  };

  const updateProfileWork = (values: any) => {
    let period;

    if (fromEnrolled.year === 0 || !fromEnrolled.month) {
      if (!index) {
        period = "";
      } else {
        period = initialWork?.WorkPeriod as string;
      }
    } else {
      period = `${fromEnrolled?.month} ${fromEnrolled?.year} to ${
        toEnrolled?.month
      }${toEnrolled?.year === 0 ? "Present" : toEnrolled?.year}`;
    }

    const data = {
      ...values,
      WorkPeriod: period,
    };
    if (!index) {
      mutation?.mutate({ data: { Work: [...(resume?.Work as any), data] } });
    } else {
      const updatedResume = resume?.Work.map((work, idx) => {
        if (Number(index) === idx) {
          return data;
        }
        return work;
      });
      mutation?.mutate({
        data: { Work: [...(updatedResume as any)] },
      });
      setIndex!("");
    }
  };

  const handleSave = (values: any) => {
    if (isEditing) {
      updateProfileWork(values);
    } else {
      newWorkProfile(values);
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
              value={values.JobTitle}
              name="JobTitle"
              handleBlur={handleBlur}
              onChange={handleChange}
              id="title"
              label="Job title - required"
            />
            <Input
              value={values.Company}
              name="Company"
              handleBlur={handleBlur}
              onChange={handleChange}
              id="Company"
              label="Company"
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
            <label className="font-semibold mt-2" htmlFor="desc">
              Description
            </label>
            <div
              className={` w-full border border-gray-400 rounded-[4px] px-3 py-2 focus:border-b-[2px] focus:border-b-primary-dark`}
            >
              <textarea
                autoComplete="off"
                id="desc"
                className="w-full outline-none bg-transparent placeholder:text-gray-500 "
                placeholder=""
                name="Description"
                value={values.Description}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={7}
              ></textarea>
            </div>
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
export default WorkExperience;
