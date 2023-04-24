import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@chakra-ui/react";
import { FaChevronLeft } from "react-icons/fa";

type MiddleProps = {
  benefits: string[];
  handleBenefit: (values: string) => void;
  setPayType: React.Dispatch<React.SetStateAction<string>>;
  payType: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  setFrequency: React.Dispatch<React.SetStateAction<string>>;
  setSections: (value: string) => void;
  setformData: (value: any) => void;
  currency: string;
  frequency: string;
};

const schema = yup
  .object()
  .shape({
    PayMin: yup.number().required(),
    PayMax: yup.number(),
    EmploymentType: yup.string().required(),
  })
  .required();

const Middle: React.FC<MiddleProps> = ({
  benefits,
  handleBenefit,
  payType,
  setCurrency,
  currency,
  frequency,
  setFrequency,
  setPayType,
  setSections,
  setformData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);
  const handleFormSubmit = (data: any) => {
    setformData((prev: any) => {
      return {
        ...prev,
        ...data,
        currency,
        frequency,
        Benefits: [...benefits],
      };
    });
    setSections("end");
  };
  return (
    <form
      onSubmit={handleSubmit((data) => handleFormSubmit(data))}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1">
        <p className=" font-semibold">*Employment Type</p>
        <select
          className={` ${
            errors.EmploymentType &&
            "border-red-400 focus:border-red-500 text-red-500"
          } outline-none  px-3 py-3 border-gray-300 border focus:border-green-500  rounded-[3px] font-normal text-base w-full`}
          {...register("EmploymentType")}
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
          characters max.). Note: editing this field will affect all jobs at
          this hiring company.
        </p>
        <textarea
          className="w-full border border-gray-300 rounded-[4px] px-3 py-2 focus:border-b-green-500 focus:border-b-[3px] hover:rounded-b-lg outline-none "
          {...register("Pitch")}
          placeholder="Awesome CEO, great benefits, and lots of room for growth!"
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
            <label className="flex gap-2 text-sm">
              <input
                type="checkbox"
                checked={benefits?.includes("Medical Insurance")}
                className=" checked:bg-green-600"
                onChange={() => handleBenefit("Medical Insurance")}
              />
              Medical Insurance
            </label>
            <label className="flex gap-2 text-sm ">
              <input
                type="checkbox"
                className=" checked:bg-green-600"
                checked={benefits?.includes("Dental Insurance")}
                onChange={() => handleBenefit("Dental Insurance")}
              />
              Dental Insurance
            </label>
            <label className="flex gap-2 text-sm ">
              <input
                checked={benefits?.includes("Vision Insurance")}
                type="checkbox"
                className=" checked:bg-green-600"
                onChange={() => handleBenefit("Vision Insurance")}
              />
              Vision Insurance
            </label>
            <label className="flex gap-2 text-sm ">
              <input
                type="checkbox"
                className=" checked:bg-green-600"
                checked={benefits?.includes("401k")}
                onChange={() => handleBenefit("401k")}
              />
              401k
            </label>
            <label className="flex gap-2 text-sm ">
              <input
                type="checkbox"
                className=" checked:bg-green-600"
                checked={benefits?.includes("Life Insurance")}
                onChange={() => handleBenefit("Life Insurance")}
              />
              Life Insurance
            </label>
            <label className="flex gap-2 text-sm ">
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
          Please include pay information. Job postings with pay information
          receive maximum visibility on WiHhire!
        </p>

        <div className="border border-gray-300 py-5 px-4 rounded-lg flex gap-2 flex-col   w-full">
          <div className="flex gap-2  md:flex-row flex-col md:items-center w-full">
            <div className="flex flex-col gap-1 ">
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
                {...register("PayMin", { required: true })}
                name="PayMin"
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
                  {...register("PayMax", { required: true })}
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
            <p className=" text-red-500 text-sm">
              Please check the minimum compensation field to ensure there are no
              errors
            </p>
          )}

          <p className=" text-red-500 text-sm">
            {errors?.PayMax?.message as any}
          </p>
        </div>
      </div>

      <div className="flex gap-5 justify-between">
        <Button
          type="button"
          color="gray.500"
          rounded="full"
          _hover={{
            color: "gray.800",
          }}
          display="flex"
          gap="2"
          alignItems="center"
          onClick={() => setSections("description")}
        >
          <FaChevronLeft /> Previous
        </Button>
        <Button
          type="submit"
          bg="green.500"
          color="white"
          w="100px"
          px="16px"
          py="12px"
          rounded="full"
          _hover={{
            bg: "green.600",
            color: "white",
          }}
        >
          Continue
        </Button>
      </div>
    </form>
  );
};
export default Middle;
