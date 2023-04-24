import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../Utils/Input";
import { Button } from "@chakra-ui/react";

type StartProps = {
  isRemote: boolean;
  setIsRemote: (value: boolean) => void;
  setSection: (value: string) => void;
  setformData: (value: any) => void;
};

const schema = yup
  .object()
  .shape({
    Title: yup.string().min(5).max(70).required(),
    Location: yup.string().required(),
  })
  .required();

const Start: React.FC<StartProps> = ({
  isRemote,
  setIsRemote,
  setSection,
  setformData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (data: any) => {
    setformData((prev: any) => {
      return {
        ...prev,
        ...data,
        isRemote,
      };
    });
    setSection("description");
  };
  return (
    <form
      onSubmit={handleSubmit((data) => handleFormSubmit(data))}
      className="flex flex-col gap-4"
    >
      <div>
        <Input
          other={{
            ...register("Title"),
          }}
          error={errors.Title}
          name="Title"
          label="*Job Title"
          placeholder="Enter Job Title"
          id="title"
        />
        {errors.Title && (
          <p className=" text-red-500 text-[12px] ">
            Please enter your job title (between 5 and 70 characters)
          </p>
        )}
      </div>
      <div>
        <Input
          other={{ ...register("Location") }}
          error={errors.Location}
          name="Location"
          label="*Job Location"
          id="location"
          placeholder="Enter Zip or city, state"
        />
        {errors.Location && (
          <p className=" text-red-500 text-[12px] ">
            Please enter the job's location, in the U.S., Canada or Australia.
          </p>
        )}
      </div>

      <div>
        <Input
          other={{ ...register("Address") }}
          error={errors.Address}
          name="Address"
          label="Street Address"
          id="Address"
          placeholder="123 Main Street"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className=" font-bold">
          *Can this role be performed as a "remote work from home" job with no
          on-site work required?
        </p>
        <p className=" text-sm text-gray-500">
          Selecting <strong>Yes</strong> will allow this job post to be seen by
          local candidates and candidates looking for remote positions.
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
      <div className="flex justify-end">
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
export default Start;
