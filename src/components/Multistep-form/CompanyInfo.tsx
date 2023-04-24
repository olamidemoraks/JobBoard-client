import { FormType } from "@/pages/employee-setup";
import React from "react";
import { SetForm } from "react-hooks-helper";
import { useForm } from "react-hook-form";
import EmployeeBuildLayout from "../Layout/EmployeeBuildLayout";
import Input from "../Utils/Input";

type CompanyInfoProps = {
  navigation: any;
  formData: FormType;
  setForm: SetForm;
};

const CompanyInfo: React.FC<CompanyInfoProps> = ({
  navigation,
  formData,
  setForm,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...formData,
    },
  });

  return (
    <EmployeeBuildLayout width="w-[60%]">
      <div className="mt-4">
        <p className=" text-xl font-bold text-center">Company Details</p>
        <form
          onSubmit={handleSubmit((data) => {
            formData.CompanyDesc = data.CompanyDesc;
            formData.Snippet = data.Snippet;
            formData.Status = data.Status;
            navigation.next();
          })}
        >
          <div className="flex flex-col gap-3 mt-5">
            <label className=" font-black" htmlFor="size">
              Write a short detail about your company
            </label>
            <textarea
              className=" w-full border border-gray-400 rounded-[4px] px-3 py-2  hover:border-b-green-500 hover:border-b-[3px] hover:rounded-b-lg outline-none"
              {...register("Snippet")}
              name="Snippet"
              id="Snippet"
              rows={1}
            ></textarea>

            <div className="flex flex-col gap-2">
              <label className=" font-black" htmlFor="size">
                Hiring need status
              </label>
              <div
                className={`${
                  Boolean(errors.Status)
                    ? "border-red-500 text-red-500"
                    : "border-gray-400"
                } w-full border border-gray-400 rounded-[4px] px-3 py-2  hover:border-b-green-500 hover:border-b-[3px] hover:rounded-b-lg`}
              >
                <select
                  {...register("Status", { required: true })}
                  name="Status"
                  id="status"
                  className="w-full h-full outline-none"
                >
                  <option value="">
                    -Which of this best describe your hiring need?-
                  </option>
                  <option value="actively hiring">I'm actively hiring</option>
                  <option value="monthly hiring">
                    I need to hire every few month
                  </option>
                  <option value="hire infrequently">
                    I hire infrequently{" "}
                  </option>
                </select>
              </div>
              {errors.CompanySize && (
                <p className=" text-red-500 text-[12px]">
                  please select the option that best describe your hiring need
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className=" font-black" htmlFor="desc">
                Company description
              </label>
              <textarea
                className=" w-full border border-gray-400 rounded-[4px] px-3 py-2  hover:border-b-green-500 hover:border-b-[3px] hover:rounded-b-lg outline-none"
                {...register("CompanyDesc")}
                name="CompanyDesc"
                id="desc"
                rows={5}
              ></textarea>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button
              className="border border-emerald-600 text-emerald-600 px-6 py-2 rounded-full font-bold"
              onClick={() => navigation.previous()}
            >
              Previous
            </button>
            <button
              className=" bg-emerald-600 text-white px-6 py-2 rounded-full font-bold"
              type="submit"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </EmployeeBuildLayout>
  );
};
export default CompanyInfo;
