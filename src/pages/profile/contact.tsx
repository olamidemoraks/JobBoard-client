import { getProfile, updateProfile } from "@/app/apiQuery";
import { MomoizedCountryMenu } from "@/components/Utils/CountryMenu";
import Input from "@/components/Utils/Input";
import Loader from "@/components/Utils/Loader";
import useCountry from "@/hooks/useCountry";
import useProfile from "@/hooks/useProfile";
import { Profile } from "@/type/types";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { BsArrowLeft } from "react-icons/bs";
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import * as yup from "yup";

type contactProps = {};

const validateScheme = yup.object().shape({
  FName: yup.string().required("Please enter your first name"),
  LName: yup.string().required("Please enter your last name"),
  City_State: yup.string().required("Please enter your city or state"),
  JobTitle: yup.string().required("Please enter your primary role"),
});

let initialData = {
  FName: "",
  LName: "",
  Headline: "",
  City_State: "",
  Mobileno: "",
  Relocate: true,
  PCode: "",
  JobTitle: "",
  Address: "",
  Gender: "",
  DOB: "",
};

const contact: React.FC<contactProps> = () => {
  const { getByValue } = useCountry();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { email } = useProfile();
  const { data: resume, isLoading } = useQuery<Profile>(
    "profile",
    getProfile,
    {}
  );
  const [country, setCountry] = useState(resume?.Country ?? "");
  const setCountryOption = useCallback(
    (value: string) => {
      setCountry(value);
    },
    [country]
  );

  const mutation = useMutation(updateProfile, {
    onSuccess: () => {
      //   toast.success("Update was successfull");
      router.back();
    },
    onSettled: () => {
      queryClient.invalidateQueries("profile");
    },
  });
  const [Headline, setHeadline] = useState<string>("");
  const [headlineError, setHeadlineError] = useState(false);

  useEffect(() => {
    if (isLoading === false) {
      initialData.FName = resume?.FName ?? "";
      initialData.LName = resume?.LName ?? "";
      initialData.Headline = resume?.Headline ?? "";
      initialData.City_State = resume?.City_State ?? "";
      initialData.Mobileno = resume?.Mobileno ?? "";
      initialData.Relocate = resume?.Relocate ?? true;
      initialData.PCode = resume?.PCode ?? "";
      initialData.Address = resume?.Address ?? "";
      initialData.JobTitle = resume?.JobTitle ?? "";
      initialData.DOB = resume?.DOB ?? "";
      initialData.Gender = resume?.Gender ?? "";

      setHeadline(initialData.Headline ?? "");
    }
  }, [resume, isLoading]);

  let limit = 160 - Headline.length;
  const handleHeadlineChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (event.target.value.length > 160) {
      setHeadlineError(true);
      return;
    }
    if (event.target.value.length <= 160) {
      setHeadlineError(false);
    }
    setHeadline(event.target.value);
  };

  const handleSave = (values: any) => {
    mutation?.mutate({ data: { ...values, Country: country } });
  };
  if (isLoading) {
    return (
      <div className="flex  h-[60vh] items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="relative pt-[5rem] flex justify-center mx-6">
      <div className="w-[600px] mt-5">
        <div className="flex justify-between w-full items-center mb-5">
          <Link href={"/profile"}>
            <BsArrowLeft className=" text-[27px]" />
          </Link>
        </div>
        <p className="mb-3 font-black text-2xl">Personal Information</p>
        <Formik
          initialValues={initialData}
          onSubmit={handleSave}
          validationSchema={validateScheme}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            values,
            touched,
          }) => (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                value={values.FName}
                name="FName"
                handleBlur={handleBlur}
                onChange={handleChange}
                id="fname"
                label="First Name *"
                placeholder=""
                type="text"
                error={errors.FName}
                touched={touched.FName}
              />
              <Input
                value={values.LName}
                name="LName"
                handleBlur={handleBlur}
                onChange={handleChange}
                id="lname"
                label="Last Name *"
                placeholder=""
                type="text"
                error={errors.LName}
                touched={touched.LName}
              />

              <div className="flex md:flex-row flex-col gap-4 w-full items-center">
                <div className="w-full">
                  <label
                    className=" font-semibold flex items-center justify-between"
                    htmlFor="dob"
                  >
                    Date of Birth
                  </label>
                  <input
                    className={` w-full border border-gray-400 rounded-[4px] px-3 py-2 hover:border-b-green-500 hover:border-b-[3px] hover:rounded-b-md outline-none`}
                    id="dob"
                    type="date"
                    name="DOB"
                    value={values.DOB}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <label
                    className=" font-semibold flex items-center justify-between"
                    htmlFor="gender"
                  >
                    Gender
                  </label>
                  <select
                    value={values.Gender}
                    onChange={handleChange}
                    name="Gender"
                    id="gender"
                    className={` w-full border border-gray-400 rounded-[4px] px-3 py-2 hover:border-b-green-500 hover:border-b-[3px] hover:rounded-b-md outline-none`}
                  >
                    <option value="">--Select your gender--</option>
                    <option value="male">Male</option>
                    <option value="Female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>
              <Input
                value={values.JobTitle}
                name="JobTitle"
                handleBlur={handleBlur}
                onChange={handleChange}
                id="role"
                label="Your primary role - required"
                placeholder="eg. Frontend developer"
                type="text"
                error={errors.JobTitle}
                touched={touched.JobTitle}
              />

              <div>
                <label
                  htmlFor="headline"
                  className=" font-semibold flex items-center justify-between"
                >
                  Your bio
                  <span className="text-gray-400">{limit}</span>
                </label>

                <textarea
                  className={`${
                    headlineError
                      ? "border-red-500 hover:border-b hover:border-b-red-500"
                      : "border-gray-400"
                  } w-full border border-gray-400 rounded-[4px] px-3 py-2 hover:border-b-green-500 hover:border-b-[3px] hover:rounded-b-md outline-none`}
                  name="Headline"
                  value={Headline}
                  placeholder="Stanford CS, Fullstack generalist, Launched a successful Android app, Developed a game"
                  id="headline"
                  onChange={(event) => handleHeadlineChange(event)}
                ></textarea>
              </div>
              <Input
                id="phone"
                type="tel"
                label="Phone number"
                placeholder=""
                name="Mobileno"
                value={values.Mobileno}
                onChange={handleChange}
              />
              <p className="text-sm text-gray-600">
                By submitting the form, you confirm that you are the primary
                user and subscriber to the telephone number provided, and you
                agree to receive calls (including using artificial or
                pre-recorded voice), texts, and WhatsApp messages from Indeed
                and employers who use Indeed at the telephone number provided
                above.
              </p>
              <p className=" font-black">Email</p>
              <div className="flex items-center justify-between w-full">
                <p>{email}</p>
                <p className=" text-blue-600 cursor-pointer">change</p>
              </div>

              <div>
                <p className="mb-3 font-black">Location</p>
                <p className="text-gray-600">
                  This helps match you with nearby jobs
                </p>
              </div>
              <label className="font-semibold mt-2">Country</label>
              <div className="flex items-center justify-between w-full">
                <p>{getByValue(country)?.label ?? "Select Country"}</p>
                <MomoizedCountryMenu setCountryOption={setCountryOption} />
              </div>
              <Input
                value={values.Address}
                name="Address"
                handleBlur={handleBlur}
                onChange={handleChange}
                id="address"
                label="Street Address"
                placeholder=""
                type="text"
                error={errors.Address}
                touched={touched.Address}
              />
              <Input
                value={values.City_State}
                name="City_State"
                handleBlur={handleBlur}
                onChange={handleChange}
                id="city"
                label="City, Street *"
                placeholder=""
                type="text"
                error={errors.City_State}
                touched={touched.City_State}
              />
              <Input
                value={values.PCode}
                name="PCode"
                handleBlur={handleBlur}
                onChange={handleChange}
                id="pcode"
                label="Postal Code"
                placeholder=""
                type="text"
              />

              <div className="flex flex-col gap-1">
                <p>Relocation</p>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={handleChange}
                    name="Relocate"
                    checked={values.Relocate}
                  />
                  <span>I am willing to relocate</span>
                </div>
              </div>
              <div className="flex gap-5 mb-10">
                <button
                  className="px-3 py-2 rounded-lg bg-blue-600 text-white w-full"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default contact;

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery("profile", getProfile);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
