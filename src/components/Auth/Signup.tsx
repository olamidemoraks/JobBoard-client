import React from "react";
import Input from "../Utils/Input";
import { User } from "./../../type/types";

import { FormikErrors, FormikTouched } from "formik";

type SignupProps = {
  formData: User;
  setFormData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  touched: FormikTouched<User>;
  errors: FormikErrors<User>;
  handleBlur: any;
};

const Signup: React.FC<SignupProps> = ({
  formData,
  setFormData,
  errors,
  handleBlur,
  touched,
}) => {
  return (
    <>
      <Input
        id="email"
        label="Email Address"
        placeholder=""
        type="email"
        value={formData.Email}
        name="Email"
        onChange={setFormData}
        error={errors.Email}
        handleBlur={handleBlur}
        touched={touched.Email}
      />
      <Input
        id="password"
        label="Password"
        placeholder=""
        type="password"
        value={formData.Password}
        name="Password"
        onChange={setFormData}
        error={errors.Password}
        handleBlur={handleBlur}
        touched={touched.Password}
      />
    </>
  );
};
export default Signup;
