import { getCompany, updateCompany } from "@/app/apiQuery";
import Input from "@/components/Utils/Input";
import Loader from "@/components/Utils/Loader";
import { Company } from "@/type/types";
import { sizes } from "@/utils/constant";
import { Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { FaChevronLeft } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as yup from "yup";

type EditCompanyProfileProps = {};

const validateScheme = yup.object().shape({
  CompanyName: yup.string().required("Please provide company name"),
  CompanySize: yup.string().required("Please provide company size"),
  Status: yup.string().required("Please provide company hiring status"),
  CompanySnippet: yup
    .string()
    .max(100, "Please brief description should less than 100 words"),
  Email: yup.string().email().required("please provide an email address"),
});

const initialData = {
  CompanyName: "",
  CompanySize: "",
  Location: "",
  Url: "",
  CompanyDesc: "",
  CompanySnippet: "",
  Email: "",
  MobileNo: "",
  Status: "",
};

const EditCompanyProfile: React.FC<EditCompanyProfileProps> = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: company, isLoading } = useQuery<Company>("company", getCompany);
  const mutates = useMutation("", updateCompany, {
    onSettled: () => {
      queryClient.invalidateQueries("company");
    },
  });

  useEffect(() => {
    if (isLoading === false) {
      initialData.CompanyName = company?.CompanyName ?? "";
      initialData.CompanyDesc = company?.CompanyDesc ?? "";
      initialData.CompanySize = company?.CompanySize ?? "";
      initialData.CompanySnippet = company?.CompanySnippet ?? "";
      initialData.Email = company?.Email ?? "";
      initialData.Location = company?.Location ?? "";
      initialData.MobileNo = company?.MobileNo ?? "";
      initialData.Url = company?.Url ?? "";
      initialData.Status = company?.Status ?? "";
    }
  }, [company, isLoading]);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader />
      </div>
    );
  }
  const handleSubmit = (values: any) => {
    mutates.mutateAsync({ data: { ...values }, id: company?._id });
  };
  return (
    <div className="my-4">
      <Toaster position="top-right" />
      <p
        className="flex gap-3 items-center py-5 text-sm hover:font-bold cursor-pointer w-[100px]"
        onClick={() => router.back()}
      >
        <FaChevronLeft /> Go Back
      </p>
      <div className=" text-center text-2xl">Company Details</div>
      <Formik
        initialValues={initialData}
        onSubmit={handleSubmit}
        validationSchema={validateScheme}
      >
        {({ errors, values, touched, handleSubmit, handleChange }) => (
          <form onSubmit={handleSubmit} className="flex gap-4 flex-col">
            <Input
              id="cn"
              error={errors.CompanyName}
              label="Company name"
              name="CompanyName"
              onChange={handleChange}
              touched={touched.CompanyName}
              value={values.CompanyName}
            />
            <Input
              id="cn"
              error={errors.CompanySnippet}
              label="Brief description"
              name="CompanySnippet"
              onChange={handleChange}
              touched={touched.CompanySnippet}
              value={values.CompanySnippet}
            />

            <div className="flex flex-col gap-2 ">
              <label htmlFor="cd" className=" font-black">
                Company description
              </label>
              <textarea
                id="cd"
                name="CompanyDesc"
                onChange={handleChange}
                value={values.CompanyDesc}
                placeholder="what is your company all about"
                className={`-full border border-gray-400 rounded-[4px] px-3 py-2 hover:border-b-green-500 hover:border-b-[3px] hover:rounded-b-md`}
              ></textarea>
            </div>

            <div className="flex gap-2 md:flex-row flex-col w-full">
              <Input
                id="email"
                error={errors.Email}
                label="Email Address"
                name="Email"
                onChange={handleChange}
                touched={touched.Email}
                value={values.Email}
              />
              <Input
                id="phone"
                error={errors.MobileNo}
                label="Phone number"
                name="MobileNo"
                onChange={handleChange}
                touched={touched.MobileNo}
                value={values.MobileNo}
              />
            </div>
            <Input
              id="location"
              label="Company address"
              name="Location"
              placeholder="Nigeria, Lagos, Ikeja"
              onChange={handleChange}
              value={values.Location}
            />
            <Input
              id="website"
              label="Company website"
              name="URL"
              onChange={handleChange}
              touched={touched.Url}
              value={values.Url}
            />
            <div className="flex md:flex-row flex-col gap-4 md:items-center">
              <div className="flex flex-col gap-2 w-full">
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
                    value={values.Status}
                    name="Status"
                    id="status"
                    onChange={handleChange}
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
              <div className="flex flex-col gap-2 w-full">
                <label className=" font-black" htmlFor="size">
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
                    value={values.CompanySize}
                    onChange={handleChange}
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
            </div>

            <button className="px-4 py-2 bg-mid-green text-white rounded-md">
              Save update
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};
export default EditCompanyProfile;
