import { FormType } from "@/pages/employee-setup";
import React from "react";
import { SetForm } from "react-hooks-helper";
import EmployeeBuildLayout from "../Layout/EmployeeBuildLayout";
import Input from "../Utils/Input";
import { useForm } from "react-hook-form";
import useProfile from "@/hooks/useProfile";

type NameProps = {
  navigation: any;
  formData: FormType;
  setForm: SetForm;
};

const Name: React.FC<NameProps> = ({ navigation, formData, setForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...formData,
    },
  });
  const { Name, MobileNo, Email, CompanyName } = formData;

  return (
    <EmployeeBuildLayout width="w-[33.3%]">
      <div>
        <p className=" text-xl font-bold text-center">
          Create an Employee Account
        </p>
        <form
          onSubmit={handleSubmit((data) => {
            formData.Name = data.Name;
            formData.CompanyName = data.CompanyName;
            formData.Email = data.Email;
            formData.MobileNo = data.MobileNo;
            navigation.next();
          })}
        >
          <div className="flex flex-col gap-3 mt-5">
            <Input
              other={{ ...register("Name", { required: true }) }}
              error={errors.Name}
              label="Your Name *"
              name="Name"
              id="name"
            />
            {errors.Name && (
              <p className=" text-red-500 text-[12px] -mt-2">
                Name is required
              </p>
            )}
            <div>
              <Input
                value={Email}
                label="Email Address"
                name="Email"
                id="email"
                type="email"
                onChange={setForm}
              />
              {errors.Email && (
                <p className=" text-red-500 text-[12px]">
                  Email address is required
                </p>
              )}
              <p className=" text-sm text-gray-400 mt-1">
                candidate that apply to your job will be sent to this email
              </p>
            </div>
            <Input
              other={{ ...register("MobileNo", { required: true }) }}
              error={errors.MobileNo}
              label="Phone Number *"
              name="MobileNo"
              id="mobile"
            />
            {errors.MobileNo && (
              <p className=" text-red-500 text-[12px] -mt-2">
                Phone number is required
              </p>
            )}
            <Input
              other={{ ...register("CompanyName", { required: true }) }}
              label="Company Name *"
              name="CompanyName"
              id="name"
              error={errors.CompanyName}
            />
            {errors.CompanyName && (
              <p className=" text-red-500 text-[12px] -mt-2">
                Company name is required
              </p>
            )}
          </div>

          <div className="flex justify-center mt-6">
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
export default Name;
