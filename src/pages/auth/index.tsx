import React, { useRef, useState } from "react";
import { Button, Divider } from "@chakra-ui/react";
import Login from "@/components/Auth/Login";
import Signup from "@/components/Auth/Signup";
import { User } from "@/type/types";
import { toast, Toaster } from "react-hot-toast";
import * as yup from "yup";
import { Formik } from "formik";
import { GoogleLogin } from "@react-oauth/google";
import { setCredential } from "@/feature/auth/authSlice";
import {
  useLoginMutation,
  useSignupMutation,
} from "@/feature/auth/authApiSlice";
import { useAppDispatch } from "@/app/hooks";
import { useRouter } from "next/router";
import useProfile from "@/hooks/useProfile";
import Logo from "@/components/Utils/Logo";

const signupScheme = yup.object().shape({
  Email: yup
    .string()
    .email("provide a valid email")
    .required("Please provide your email"),
  Password: yup
    .string()
    .min(8, "Password should be atleast 8 char long.")
    .required("Please provide your password"),
});

const loginSheme = yup.object().shape({
  Email: yup
    .string()
    .email("provide a valid email")
    .required("Please provide your email"),
  Password: yup.string().required("Please provide your password"),
});

const initialValue: User = {
  Email: "",
  Password: "",
  AccountType: "seeker",
};

const Auth: React.FC = () => {
  const seekerRef = useRef<HTMLInputElement>(null);
  const employerRef = useRef<HTMLInputElement>(null);
  const [account, setAccount] = useState("");
  const router = useRouter();
  const [authOption, setAuthOption] = useState<String>("login");
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [signup, { isLoading: signupLoading }] = useSignupMutation();
  const isLogin = authOption === "login";
  const isSignup = authOption === "signup";
  const { email } = useProfile();
  const dispatch = useAppDispatch();

  const handleLogin = async (values: User, formProps: any) => {
    try {
      const data = await login(values).unwrap();
      dispatch(
        setCredential({
          profile: { token: data.token, account: values.AccountType },
        })
      );
      router.push("/");
    } catch (error: any) {
      toast.error(error?.data?.msg);
    }
  };
  const handleSignup = async (values: any, formProps: any) => {
    try {
      const data = await signup(values).unwrap();
      dispatch(
        setCredential({
          profile: { token: data.token, account: values.AccountType },
        })
      );
      if (values.AccountType === "seeker") {
        router.push("/profile/build/name");
      } else if (values.AccountType === "employer") {
        router.push("/employee-setup");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.msg);
    }
  };
  const handleSumit = async (values: any, formProps: any) => {
    if (isLogin) {
      handleLogin(values, formProps);
    } else {
      handleSignup(values, formProps);
    }
  };

  const handleAuthOption = (value: String, resetForm: () => void) => {
    setAuthOption(value);
    resetForm();
  };

  const handleSuccess = async (response: any) => {
    dispatch(setCredential({ token: response.credential }));
    dispatch(
      setCredential({
        profile: { token: response.credential, account: "seeker" },
      })
    );
    router.push("/");
  };

  return (
    <div className="flex items-center h-[100vh] flex-col  relative pt-[5rem] bg-gray-200">
      <Logo />
      <Toaster position="top-center" />
      <div className=" border bg-white border-gray-300 sm:w-[450px] w-[90%] rounded-md sm:p-8 p-5 mt-5 flex gap-4 flex-col shadow-md">
        {/* <h2 className=" font-semibold text-[20px] text-gray-600 leading-3">
          Ready to take the next step?
        </h2> */}
        {isSignup ? (
          <p className=" text-2xl font-semibold text-[22px] text-gray-700 text-center">
            Create an account
          </p>
        ) : (
          <p className=" font-bold text-lg text-gray-700 text-center ">
            Sign in
          </p>
        )}
        {/* <GoogleButton login={googleLogin} /> */}
        {/* <GoogleLogin
          width="100%"
          onSuccess={(response) => handleSuccess(response)}
          onError={() => console.log("Something went wrong")}
        />
        <div className="flex items-center gap-2 justify-center">
          <div className="w-[230px] h-[1px] bg-gray-200" />
          OR
          <div className="w-[230px] h-[1px] bg-gray-200" />
        </div> */}
        <Formik
          initialValues={initialValue}
          validationSchema={isLogin ? loginSheme : signupScheme}
          onSubmit={handleSumit}
        >
          {({
            errors,
            values,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            handleReset,
          }) => (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {isLogin ? (
                <Login
                  formData={values}
                  errors={errors}
                  handleBlur={handleBlur}
                  touched={touched}
                  setFormData={handleChange}
                />
              ) : (
                <Signup
                  formData={values}
                  errors={errors}
                  handleBlur={handleBlur}
                  touched={touched}
                  setFormData={handleChange}
                />
              )}
              {isSignup && (
                <div className="flex flex-col gap-2 w-full">
                  <p className=" font-semibold">Account Type</p>
                  <div className="flex gap-2 w-full">
                    <p
                      className={`hover:underline p-3 border rounded-lg text-sm cursor-pointer text-dark-green w-full ${
                        account === "seeker"
                          ? "underline  border-emerald-400"
                          : "no-underline   border-gray-400"
                      } `}
                      onClick={() => {
                        seekerRef.current?.click();
                        setAccount("seeker");
                      }}
                    >
                      I'm seeking for a job
                    </p>
                    <input
                      ref={seekerRef}
                      type="button"
                      name="AccountType"
                      value={"seeker"}
                      className="px-2 text-[12px] py-1 bg-primary-light/60 rounded-md cursor-pointer hover:bg-primary-light uppercase hidden"
                      onClick={handleChange}
                    />

                    <p
                      className={`hover:underline p-3 border rounded-lg text-sm cursor-pointer text-dark-green w-full ${
                        account === "employer"
                          ? "underline border-emerald-400"
                          : "no-underline  border-gray-400"
                      } `}
                      onClick={() => {
                        employerRef.current?.click();
                        setAccount("employer");
                      }}
                    >
                      I'm looking for workers
                    </p>
                    <input
                      ref={employerRef}
                      type="button"
                      name="AccountType"
                      value={"employer"}
                      className="px-2 py-1 text-[12px] bg-secondary-light/60 rounded-md cursor-pointer hover:bg-secondary-light uppercase hidden"
                      onClick={handleChange}
                    />
                  </div>
                </div>
              )}
              <Button
                width={"full"}
                bg=" #1c4b3dd3"
                color={"white"}
                _hover={{ bg: "#1c4b3d" }}
                type="submit"
                isLoading={signupLoading || loginLoading}
              >
                {isLogin ? "Login" : "Sign Up"}
              </Button>
              <Divider />
              <div className="">
                {isLogin ? (
                  <div className="text-center">
                    I don't have an account.{" "}
                    <span
                      className=" text-dark-green font-semibold hover:underline cursor-pointer "
                      onClick={() => handleAuthOption("signup", handleReset)}
                    >
                      Create an account.
                    </span>
                  </div>
                ) : (
                  <div className="text-center">
                    I already have an account.{" "}
                    <span
                      className=" text-dark-green font-semibold hover:underline cursor-pointer "
                      onClick={() => handleAuthOption("login", handleReset)}
                    >
                      login
                    </span>
                  </div>
                )}
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Auth;
