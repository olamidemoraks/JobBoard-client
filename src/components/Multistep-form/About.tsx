import { useCreateCompanyMutation } from "@/feature/employer/employerApiSlice";
import { FormType } from "@/pages/employee-setup";
import { sizes, title } from "@/utils/constant";
import React from "react";
import { useForm, UseFormGetValues } from "react-hook-form";
import EmployeeBuildLayout from "../Layout/EmployeeBuildLayout";
import Input from "../Utils/Input";
import { useRouter } from "next/router";

type AboutProps = {
  // navigation: any;
  // formData: FormType;
  // setForm: SetForm;
  getAllValues: UseFormGetValues<FormType>;
  setValue: (id: any, value: any) => void;
  onBack: () => void;
};

const About: React.FC<AboutProps> = ({ setValue, onBack, getAllValues }) => {
  const router = useRouter();
  const [createCompany, { isLoading }] = useCreateCompanyMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Title: getAllValues().Title ?? "",
      Location: getAllValues().Location ?? "",
      CompanySize: getAllValues().CompanySize ?? "",
      Url: getAllValues().Url ?? "",
    },
  });

  const handleFormSubmit = async (values: any) => {
    for (let value of Object.entries(values)) {
      setValue(value[0], value[1]);
    }
    try {
      const data = await createCompany(getAllValues()).unwrap();
      router.push("/employee/job/create-job");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <EmployeeBuildLayout width="w-[80%]">
      <div className="mt-4">
        <p className=" text-xl font-bold text-center">Finalize Your Details</p>

        <form onSubmit={handleSubmit((data) => handleFormSubmit(data))}>
          <div className="mt-3">
            <label htmlFor="title" className=" font-black pb-2">
              Your current title *
            </label>
            <div
              className={`${
                Boolean(errors.Title)
                  ? "border-red-500 text-red-500"
                  : "border-gray-400"
              } w-full border border-gray-400 rounded-[4px] px-3 py-2  hover:border-b-green-500 hover:border-b-[3px] hover:rounded-b-lg`}
            >
              <select
                {...register("Title", { required: true })}
                name="Title"
                id="title"
                className="w-full h-full outline-none"
              >
                <option value="">Select title</option>
                {title.map((size, idx) => (
                  <option value={size} key={idx}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            {errors.Title && (
              <p className=" text-red-500 text-[12px]">Title is required</p>
            )}
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <Input
              other={{ ...register("Location") }}
              label="Company Location"
              name="Location"
              id="zip"
            />
            <div>
              <label htmlFor="size" className=" font-black pb-2">
                Company Size *
              </label>
              <div
                className={`${
                  Boolean(errors.CompanySize)
                    ? "border-red-500 text-red-500"
                    : "border-gray-400"
                } w-full border border-gray-400 rounded-[4px] px-3 py-2  hover:border-b-green-500 hover:border-b-[3px] hover:rounded-b-lg`}
              >
                <select
                  {...register("CompanySize", { required: true })}
                  name="CompanySize"
                  id="size"
                  className="w-full h-full outline-none"
                >
                  <option value="">Select an option</option>
                  {sizes.map((size, idx) => (
                    <option value={size} key={idx}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              {errors.CompanySize && (
                <p className=" text-red-500 text-[12px]">
                  Company size is required
                </p>
              )}
            </div>

            <Input
              other={{ ...register("Url") }}
              label="Company Website"
              placeholder="https://url"
              name="Url"
              id="url"
              type="url"
            />
          </div>

          <div className="flex justify-between mt-6 gap-3">
            <button
              className="border border-emerald-600 text-emerald-600 px-6 py-2 rounded-full font-bold"
              onClick={onBack}
              type="button"
            >
              Previous
            </button>
            <button
              type="submit"
              className=" bg-emerald-600 text-white px-6 py-2 rounded-full font-bold"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </EmployeeBuildLayout>
  );
};
export default About;
