import { Profile } from "@/type/types";
import { Formik } from "formik";
import React from "react";
import Input from "../../Utils/Input";
import { UseMutationResult } from "react-query";
type SkillInfoProps = {
  resume?: Profile;
  onClose: (value: boolean) => void;
  setResume?: (value: Profile) => void;
  isEditing?: boolean;
  mutation?: UseMutationResult;
};

const SkillInfo: React.FC<SkillInfoProps> = ({
  resume,
  onClose,
  setResume,
  mutation,
  isEditing = false,
}) => {
  const initialData = {
    Skill: "",
  };
  const handleSave = (values: any) => {
    if (!isEditing) {
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...resume, Skills: [...resume!.Skills, values.Skill] })
      );
      setResume!(JSON.parse(localStorage.getItem("profile") as string));
    } else {
      mutation?.mutate({
        data: { Skills: [...(resume?.Skills as any), values.Skill] },
      });
    }
    onClose(false);
  };
  return (
    <div className="mt-4">
      <Formik initialValues={initialData} onSubmit={handleSave}>
        {({ handleBlur, handleChange, handleSubmit, values }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-3">
            <Input
              value={values.Skill}
              name="Skill"
              handleBlur={handleBlur}
              onChange={handleChange}
              id="level"
              label="Skill - required"
              placeholder=""
              type="text"
            />

            <div className="flex gap-5">
              <button
                className="px-3 py-2 rounded-lg bg-blue-600 text-white "
                type="submit"
              >
                Save
              </button>
              <button
                className="px-3 py-2 rounded-lg border-[1px] border-gray-400"
                onClick={() => onClose(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
export default SkillInfo;
