import { FormType } from "@/pages/employee-setup";
import React from "react";
import EmployeeBuildLayout from "../Layout/EmployeeBuildLayout";
import Input from "../Utils/Input";
import {
  useForm,
  UseFormRegister,
  FieldErrors,
  UseFormGetValues,
} from "react-hook-form";
import useProfile from "@/hooks/useProfile";

type NameProps = {
  // navigation: any;
  // formData: FormType;
  // setForm: SetForm;
  getAllValues: UseFormGetValues<FormType>;
  setValue: (id: any, value: any) => void;
  onNext: () => void;
};

const Name: React.FC<NameProps> = ({
  // navigation,
  // formData,
  // setForm,
  getAllValues,
  setValue,
  onNext,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Name: getAllValues().Name ?? "",
      MobileNo: getAllValues().MobileNo ?? "",
      Email: getAllValues().Email ?? "",
      CompanyName: getAllValues().CompanyName ?? "",
    },
  });

  const handleNameSubmit = (values: {
    CompanyName: string;
    Email: string;
    Name: string;
    MobileNo: string;
  }) => {
    for (let value of Object.entries(values)) {
      setValue(value[0], value[1]);
    }
    onNext();
  };

  return (
    <EmployeeBuildLayout width="w-[33.3%]">
      <div>
        <p className=" text-xl font-bold text-center">
          Create an Employee Account
        </p>
        <div>
          <div className="flex flex-col gap-3 mt-5">
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
                other={{ ...register("Email", { required: true }) }}
                label="Email Address"
                name="Email"
                id="email"
                type="email"
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
          </div>

          <div className="flex justify-center mt-6">
            <button
              className=" bg-emerald-600 text-white px-6 py-2 rounded-full font-bold"
              type="button"
              onClick={handleSubmit((value) => handleNameSubmit(value))}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </EmployeeBuildLayout>
  );
};
export default Name;
