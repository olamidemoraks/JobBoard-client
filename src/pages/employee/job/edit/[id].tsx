import React, { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import {
  useQuery,
  QueryClient,
  dehydrate,
  useMutation,
  useQueryClient,
} from "react-query";
import { Job } from "@/type/types";
import { deleteJob, getJob, updateJob } from "@/app/apiQuery";
import { Formik } from "formik";
import * as yup from "yup";
import Input from "@/components/Utils/Input";
import { Button } from "@chakra-ui/react";
import { FaChevronLeft } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import { yearOfExperience } from "@/utils/constant";
import { IoAdd, IoClose } from "react-icons/io5";
import AuthRoute from "@/components/Layout/AuthRoute";
import Loader from "@/components/Utils/Loader";

type EditJobProps = {};

const schema = yup.object().shape({
  Title: yup
    .string()
    .min(5, "Title should not be less than 5 characters")
    .max(70, "Title should not be more than 70 characters")
    .required("Please provide a job title"),
  Location: yup.string().required("Please provide a location"),
  PayMin: yup
    .number()
    .required(
      " Please check the minimum compensation field to ensure there are no errors"
    ),
  PayMax: yup
    .number()
    .required(
      " Please check the maximum compensation field to ensure there are no errors"
    ),
  EmploymentType: yup.string().required(),
});
const initialData = {
  Title: "",
  Description: "",
  Location: "",
  Address: "",
  EmploymentType: "",
  Deadline: "",
  HireNumber: "",

  PayMin: 0,
  PayMax: 0,
  Pitch: "",
};
const EditJob: React.FC<EditJobProps> = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: job, isLoading } = useQuery<Job>("job", async () => {
    return getJob(router.query.id);
  });
  const mutation = useMutation(updateJob, {
    onSuccess: () => {
      toast.success("Update Successfull");
    },
    onSettled: () => {
      queryClient.invalidateQueries("jobs");
      queryClient.invalidateQueries("job");
    },
  });

  const deleteMutation = useMutation(deleteJob, {
    onSuccess: () => {
      toast.success("Delete Successfull");
    },
    onSettled: () => {
      queryClient.invalidateQueries("jobs");
    },
  });

  const [isRemote, setIsRemote] = useState(false);
  const [benefits, setBenefits] = useState<string[]>(["None"]);
  const [payType, setPayType] = useState("Range");
  const [currency, setCurrency] = useState("USD");
  const [frequency, setFrequency] = useState("yr");
  const [isDate, setIsDate] = useState(false);
  const [deadline, setDeadline] = useState("");

  const [Experience, setExperience] = useState<any>("");

  const [skills, setSkills] = useState<string[]>([]);
  const [skill, setSkill] = useState("");

  useEffect(() => {
    if (isLoading === false) {
      initialData.Title = job?.Title ?? "";
      initialData.Description = job?.Description ?? "";
      initialData.Location = job?.Location ?? "";
      initialData.Address = job?.Address ?? "";
      initialData.EmploymentType = job?.EmploymentType ?? "";
      initialData.Deadline = job?.Deadline ?? "";
      initialData.HireNumber = job?.HireNumber ?? "";
      initialData.PayMin = job?.PayMin ?? 0;
      initialData.PayMax = job?.PayMax ?? 0;
      initialData.Pitch = job?.Pitch ?? "";
      setBenefits(job?.Benefits ?? ["None"]);
      setIsRemote(job?.isRemote ?? false);
      setCurrency((job?.currency as any) ?? "USD");
      setFrequency((job?.frequency as any) ?? "yr");
      setDeadline(job?.Deadline ?? "");
      setExperience(job?.Experience ?? "");
      setSkills(job?.Skills ?? []);
    }
  }, [job, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader />
      </div>
    );
  }
  const handleAddSkill = () => {
    if (!skill) {
      return;
    }
    setSkills((prev: string[]) => [...prev, skill]);
    setSkill("");
  };

  const handleRemoveSkill = (id: any) => {
    setSkills((prev) => {
      return prev.filter((_, idx) => idx !== id);
    });
  };

  const handleBenefit = (value: string) => {
    setBenefits((props: any) => {
      if (props?.includes(value)) {
        return props?.filter((values: any) => values !== value);
      }
      if (value === "None") {
        return [value];
      } else {
        return props?.concat(value).filter((values: any) => values !== "None");
      }
    });
  };

  const handleJobSubmit = async (values: any) => {
    const data = {
      ...values,
      frequency,
      currency,
      Benefits: [...benefits],
      isRemote,
      Deadline: deadline,
      Experience,
      Skills: [...skills],
    };
    try {
      mutation.mutate({ values: data, id: job?._id });
      router.push(`/employee/job/${job?._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    deleteMutation.mutate({ id: job?._id });
    router.push(`/employee/job/`);
  };

  return (
    <div className="md:px-10 px-2 ">
      <Toaster position="top-right" />
      <p
        className="flex gap-3 items-center py-5 text-sm hover:font-bold cursor-pointer w-[100px]"
        onClick={() => router.back()}
      >
        <FaChevronLeft /> Go Back
      </p>
      <Formik
        initialValues={initialData}
        validationSchema={schema}
        onSubmit={handleJobSubmit}
      >
        {({ errors, values, handleChange, handleSubmit, touched }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <Input
              value={values.Title}
              error={errors.Title}
              onChange={handleChange}
              name="Title"
              label="Job Title"
              placeholder="Enter Job Title"
              id="title"
            />
            <Input
              value={values.Location}
              error={errors.Location}
              onChange={handleChange}
              name="Location"
              label="*Job Location"
              id="location"
              placeholder="Enter Zip or city, state"
            />
            <Input
              value={values.Address}
              error={errors.Address}
              onChange={handleChange}
              name="Address"
              label="Street Address"
              id="Address"
              placeholder="123 Main Street"
            />
            <div className="flex flex-col gap-2">
              <p className=" font-bold">
                *Can this role be performed as a "remote work from home" job
                with no on-site work required?
              </p>
              <p className=" text-sm text-gray-500">
                Selecting <strong>Yes</strong> will allow this job post to be
                seen by local candidates and candidates looking for remote
                positions.
              </p>
              <div className="flex gap-3 flex-col">
                <div className="w-full p-3 border border-gray-300 rounded-md ">
                  <label className="flex gap-2 w-full">
                    <input
                      type="radio"
                      className="h-5 w-5"
                      checked={isRemote ? true : false}
                      onChange={() => setIsRemote(true)}
                    />
                    Yes
                  </label>
                </div>
                <div className="w-full p-3 border border-gray-300 rounded-md">
                  <label className="flex gap-2 w-full">
                    <input
                      className="h-5 w-5"
                      type="radio"
                      checked={!isRemote ? true : false}
                      onChange={() => setIsRemote(false)}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className=" font-semibold">*Employment Type</p>
              <select
                className={` ${
                  errors.EmploymentType &&
                  "border-red-400 focus:border-red-500 text-red-500"
                } outline-none  px-3 py-3 border-gray-300 border focus:border-green-500  rounded-[3px] font-normal text-base w-full`}
                onChange={handleChange}
                name={"EmploymentType"}
                value={values.EmploymentType}
              >
                <option value="">-Select employment type-</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Permanent">Permanent</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
                <option value="Internship">Internship</option>
              </select>
              {errors.EmploymentType && (
                <p className=" text-sm text-red-500">Select employment type</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <p className=" font-bold">Why Work at This Company?</p>
              <p className=" text-sm text-gray-500">
                Give a one-line sales pitch for working at this company (140
                characters max.). Note: editing this field will affect all jobs
                at this hiring company.
              </p>
              <textarea
                className="w-full border border-gray-300 rounded-[4px] px-3 py-2 focus:border-b-green-500 focus:border-b-[3px] hover:rounded-b-lg outline-none "
                value={values.Pitch}
                name="Pitch"
                placeholder="Awesome CEO, great benefits, and lots of room for growth!"
                onChange={handleChange}
              ></textarea>
            </div>

            <div>
              <p className=" font-semibold">*Benefit</p>
              <div className="p-4  border-[1px] border-gray-200 flex gap-2 flex-col rounded-lg">
                {benefits?.length === 0 && (
                  <p className="text-red-500 text-[12px]">
                    Please select benefit, or None of This
                  </p>
                )}

                <div className=" flex gap-4 flex-wrap">
                  <label className="flex gap-2 text-sm ">
                    <input
                      type="checkbox"
                      checked={benefits?.includes("Medical Insurance")}
                      className=" checked:bg-green-600"
                      onChange={() => handleBenefit("Medical Insurance")}
                    />
                    Medical Insurance
                  </label>
                  <label className="flex gap-2 text-sm  ">
                    <input
                      type="checkbox"
                      className=" checked:bg-green-600"
                      onChange={() => handleBenefit("Dental Insurance")}
                    />
                    Dental Insurance
                  </label>
                  <label className="flex gap-2 text-sm  ">
                    <input
                      checked={benefits?.includes("Vision Insurance")}
                      type="checkbox"
                      className=" checked:bg-green-600"
                      onChange={() => handleBenefit("Vision Insurance")}
                    />
                    Vision Insurance
                  </label>
                  <label className="flex gap-2 text-sm  ">
                    <input
                      type="checkbox"
                      className=" checked:bg-green-600"
                      checked={benefits?.includes("401k")}
                      onChange={() => handleBenefit("401k")}
                    />
                    401k
                  </label>
                  <label className="flex gap-2 text-sm  ">
                    <input
                      type="checkbox"
                      className=" checked:bg-green-600"
                      checked={benefits?.includes("Life Insurance")}
                      onChange={() => handleBenefit("Life Insurance")}
                    />
                    Life Insurance
                  </label>
                  <label className="flex gap-2 text-sm  ">
                    <input
                      type="checkbox"
                      className=" checked:bg-green-600"
                      checked={benefits?.includes("None")}
                      onChange={() => handleBenefit("None")}
                    />
                    None of these
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className=" font-bold">*Pay Information:</p>
              <p className=" text-sm text-gray-500">
                Please include pay information. Job postings with pay
                information receive maximum visibility on WiHhire!
              </p>

              <div className="border border-gray-300 py-5 px-4 rounded-lg flex gap-2 flex-col   w-full">
                <div className="flex gap-2 md:flex-row flex-col md:items-center w-full">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="pay" className="text-sm font-bold">
                      Pay Type
                    </label>
                    <div>
                      <select
                        name="payType"
                        id="pay"
                        className="outline-none  px-3 py-4 border-gray-300 border focus:border-green-500  rounded-[3px] w-full"
                        onChange={(event) => setPayType(event.target.value)}
                      >
                        <option value="Range" className="mt-3 ">
                          Pay Range
                        </option>
                        <option value="Exact">Exact Pay Amount</option>
                      </select>
                    </div>
                  </div>

                  <label className="flex flex-col gap-1 text-sm font-bold">
                    Minimum Pay
                    <input
                      className={` ${
                        errors.PayMin && "border-red-400 focus:border-red-500"
                      } outline-none  px-3 py-3 border-gray-300 border focus:border-green-500  rounded-[3px] font-normal text-base w-full`}
                      name="PayMin"
                      value={values.PayMin}
                      onChange={handleChange}
                      placeholder="$ Min"
                    />
                  </label>
                  {payType === "Range" && (
                    <label className="flex flex-col gap-1 text-sm font-bold">
                      Maximum Pay
                      <input
                        className={` ${
                          errors.PayMax && "border-red-400 focus:border-red-500"
                        } outline-none  px-3 py-3 border-gray-300 border focus:border-green-500  rounded-[3px] font-normal text-base w-full`}
                        value={values.PayMax}
                        onChange={handleChange}
                        placeholder="$ Max"
                        name="PayMax"
                      />
                    </label>
                  )}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="currency" className="text-sm font-bold">
                      Currency
                    </label>
                    <div>
                      <select
                        name="Currency"
                        id="currency"
                        className="outline-none  px-3 py-4 border-gray-300 border focus:border-green-400  rounded-[3px] w-full"
                        value={currency}
                        onChange={(event) => setCurrency(event.target.value)}
                      >
                        <option value="USD" className="mt-3 ">
                          USD
                        </option>
                        <option value="CAD">CAD</option>
                        <option value="NGN">NGN</option>
                        <option value="GBP">GBP</option>
                        <option value="AUD">AUD</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="Frequency" className="text-sm font-bold">
                      Frequency
                    </label>
                    <div>
                      <select
                        name="Frequency"
                        id="Frequency"
                        className="outline-none  px-3 py-4 border-gray-300 border focus:border-green-500  rounded-[3px] w-full"
                        value={frequency}
                        onChange={(event) => setFrequency(event.target.value)}
                      >
                        <option value="yr">Annually</option>
                        <option value="mo" className="mt-3 ">
                          Monthly
                        </option>
                        <option value="wk">Weekly</option>
                        <option value="day">Daily</option>
                        <option value="hr">Hourly</option>
                      </select>
                    </div>
                  </div>
                </div>
                {errors.PayMin && (
                  <p className=" text-red-500 text-sm">{errors.PayMin}</p>
                )}
                {errors.PayMax && (
                  <p className=" text-red-500 text-sm">{errors.PayMax}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-semibold">Skill you will prefer for the job</p>
              <div className="flex items-center gap-3 w-full">
                <div
                  className={` w-full border border-gray-400 rounded-[4px] px-3 py-2 focus:border-b-[2px] focus:border-b-primary-dark`}
                >
                  <input
                    autoComplete="off"
                    id="phone"
                    type="text"
                    className="w-full outline-none bg-transparent placeholder:text-gray-500 "
                    placeholder="Add a skill"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleAddSkill}
                  type="submit"
                  disabled={skill.length === 0 ? true : false}
                  className="border border-gray-400 rounded-[4px] px-3 py-3 focus:border-b-[2px] focus:border-b-primary-dark disabled:border-gray-200 disabled:text-gray-300"
                >
                  <IoAdd />
                </button>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                {skills?.map((value, id) => (
                  <div
                    className="px-2 py-1 bg-gradient-to-r from-black/25 to-green-700/30 border-[2px] border-black/30 rounded-[11px] flex items-center gap-2"
                    key={id}
                  >
                    {value}
                    <IoClose onClick={() => handleRemoveSkill(id)} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className=" font-semibold">
                How many year of experience in field
              </p>

              <select
                name=""
                id=""
                className={` w-full border border-gray-300 rounded-[4px] px-3 py-2 outline-0 focus:border-b-[2px] focus:border-gray-400`}
                value={Experience}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                  setExperience(event.target.value)
                }
              >
                <option value="">Select year of experience in field</option>
                {yearOfExperience().map((number) => (
                  <option
                    value={number}
                    key={number}
                  >{`${number} years`}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <p className=" font-semibold">Is there an application deadline</p>
              <div className="w-full p-3 border border-gray-300 rounded-md ">
                <label className="flex gap-2 w-full">
                  <input
                    type="radio"
                    className="h-5 w-5"
                    checked={isDate}
                    onChange={() => setIsDate(true)}
                  />
                  Yes
                </label>
              </div>
              <div className="w-full p-3 border border-gray-300 rounded-md ">
                <label className="flex gap-2 w-full">
                  <input
                    type="radio"
                    className="h-5 w-5"
                    checked={!isDate}
                    onChange={() => setIsDate(false)}
                  />
                  No
                </label>
              </div>
              {isDate && (
                <div>
                  <input
                    type="date"
                    id=""
                    onChange={(event) => setDeadline(event.target.value)}
                  />
                </div>
              )}
            </div>
            <div className="flex md:flex-row flex-col justify-between my-5 gap-3">
              <Button
                type="button"
                color="gray.500"
                rounded="full"
                _hover={{
                  color: "gray.800",
                }}
                display={{ base: "none", md: "flex" }}
                gap="2"
                alignItems="center"
                onClick={() => {
                  router.back();
                }}
              >
                <FaChevronLeft /> Back
              </Button>

              <div className="flex gap-4  md:flex-row flex-col items-center">
                <Button
                  type="button"
                  bg="red.500"
                  color="gray.100"
                  w="100px"
                  px="16px"
                  py="12px"
                  rounded="full"
                  _hover={{
                    bg: "red.600",
                    color: "white",
                  }}
                  isLoading={isLoading}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button
                  type="submit"
                  bg="blue.500"
                  color="gray.100"
                  w="200px"
                  px="16px"
                  py="12px"
                  rounded="full"
                  _hover={{
                    bg: "blue.600",
                    color: "white",
                  }}
                  isLoading={isLoading}
                >
                  Save and Continue
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery("job", async () => {
    return getJob(context.query.id);
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
export default AuthRoute(EditJob);
