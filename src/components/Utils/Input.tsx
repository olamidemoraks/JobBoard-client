import React from "react";
import { FormikErrors, FormikTouched } from "formik";
import { User } from "@/type/types";
import { UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  id: string;
  label?: string;
  value?: string;
  type?: string;
  placeholder?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  touched?: any;
  error?: any;
  handleBlur?: any;
  other?: UseFormRegisterReturn<string>;
  readonly?: boolean;
};

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  value,
  name,
  placeholder,
  onChange,
  error,
  handleBlur,
  touched,
  other,
  readonly,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className=" font-black" htmlFor={id}>
        {label}
      </label>
      <div
        className={` ${
          Boolean(touched) && Boolean(error)
            ? "border-red-500 hover:border-b hover:border-b-red-500"
            : "border-gray-400"
        } w-full border border-gray-400 rounded-[4px] px-3 py-2 hover:border-b-green-500 hover:border-b-[3px] hover:rounded-b-md`}
      >
        <input
          autoComplete="off"
          id={id}
          type={type}
          className="w-full outline-none bg-transparent placeholder:text-gray-400 "
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          {...other}
          readOnly={readonly}
        />
      </div>
      {Boolean(touched) && Boolean(error) && (
        <p className=" text-red-500 text-[12px]">{touched && error}</p>
      )}
    </div>
  );
};
export default Input;
