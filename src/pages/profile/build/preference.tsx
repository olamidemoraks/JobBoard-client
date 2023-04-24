import AuthRoute from "@/components/Layout/AuthRoute";
import ProfileBuildLayout from "@/components/Layout/ProfileBuildLayout";
import Input from "@/components/Utils/Input";
import { useCreateProfileMutation } from "@/feature/profile/profileApiSlice";
import { Profile } from "@/type/types";
import { Button } from "@chakra-ui/react";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as yup from "yup";

const validateScheme = yup.object().shape({
  JobTitle: yup.string().required("please enter your job role"),
});

const preference: React.FC = () => {
  const [createProfile, { isLoading }] = useCreateProfileMutation();
  const [resume, setResume] = useState<Profile>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("profile") as string);
    }
  });
  const initialData = {
    JobTitle: resume?.JobTitle ?? "",
    Fulltime: true,
    Parttime: true,
    Contract: true,
    Internship: true,
    Temporary: true,
  };
  const router = useRouter();

  const handleSave = async (values: any) => {
    let jobType = [];
    if (values.Fulltime) {
      jobType.push("full-time");
    }
    if (values.Parttime) {
      jobType.push("part-time");
    }
    if (values.Contract) {
      jobType.push("contract");
    }
    if (values.Internship) {
      jobType.push("internship");
    }
    if (values.Temporary) {
      jobType.push("temporary");
    }
    try {
      localStorage.setItem(
        "profile",
        JSON.stringify({
          ...resume,
          JobTitle: values.JobTitle,
          JobType: [...jobType],
        })
      );
      setResume(JSON.parse(localStorage.getItem("profile") as string));
      const data = await createProfile(
        JSON.parse(localStorage.getItem("profile") as string)
      ).unwrap();
      router.push("success");
      // localStorage.removeItem("profile");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ProfileBuildLayout width="w-[95%]">
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
          <form onSubmit={handleSubmit}>
            <div className="mt-3 flex flex-col gap-4">
              <h1 className="text-3xl font-bold">
                What kind of job are you looking for?
              </h1>
              <p className=" text-gray-500">
                Employers searching for candidates may see your job preferences
                when your resume is set to public.
              </p>
              <Input
                label="Desire job title"
                name="JobTitle"
                onChange={handleChange}
                value={values.JobTitle}
                id="title"
                error={errors.JobTitle}
                touched={touched.JobTitle}
              />
              <div className="flex flex-col gap-3">
                <label>Desire job type</label>
                <div className="flex gap-2 items-center">
                  <input
                    id="fulltime"
                    className="h-6 w-6 mr-2 "
                    type="checkbox"
                    checked={values.Fulltime}
                    onChange={handleChange}
                    name="Fulltime"
                  />
                  <label htmlFor="fulltime"> Full-time</label>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    id="parttime"
                    className="h-6 w-6 mr-2 "
                    type="checkbox"
                    checked={values.Parttime}
                    onChange={handleChange}
                    name="Parttime"
                  />
                  <label htmlFor="parttime">Part-time</label>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    id="contract"
                    className="h-6 w-6 mr-2 "
                    type="checkbox"
                    checked={values.Contract}
                    onChange={handleChange}
                    name="Contract"
                  />
                  <label htmlFor="contract">Contract</label>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    id="temporary"
                    className="h-6 w-6 mr-2 "
                    type="checkbox"
                    checked={values.Temporary}
                    onChange={handleChange}
                    name="Temporary"
                  />
                  <label htmlFor="temporary">Temporary</label>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    id="intern"
                    className="h-6 w-6 mr-2 "
                    type="checkbox"
                    checked={values.Internship}
                    onChange={handleChange}
                    name="Internship"
                  />
                  <label htmlFor="intern">Internship</label>
                </div>
              </div>
              <Button
                mt="1rem"
                color="white"
                bg="#225a49"
                _hover={{ bg: "#1c4b3d" }}
                width="90px"
                type="submit"
                isLoading={isLoading}
              >
                Finish
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </ProfileBuildLayout>
  );
};
export default AuthRoute(preference);
