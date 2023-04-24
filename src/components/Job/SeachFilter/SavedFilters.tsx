import { useRouter } from "next/router";
import React from "react";
import { HiX } from "react-icons/hi";

type SavedFiltersProps = {};

const SavedFilters: React.FC<SavedFiltersProps> = () => {
  const router = useRouter();
  const { query, pathname }: any = router;
  const skill: any = query.Skills;
  const role: any = query.EmploymentType;
  const payMin: any = query.PayMin;
  const payMax: any = query.PayMax;
  const minXp: any = query["Experience[gte]"];
  const maxXp: any = query["Experience[lte]"];
  const remote: any = query["isRemote"];

  const clearQueriesParam = () => {
    router.replace("/jobs", undefined, { shallow: true });
  };

  const removeQueriesParam = (param: any) => {
    const params = new URLSearchParams(query);
    params.delete(param);
    router.replace({ pathname, query: params.toString() }, undefined, {
      shallow: true,
    });
  };

  const removeArrayQueriesParam = (param: string[]) => {
    for (let index = 0; index < param.length - 1; index++) {
      removeQueriesParam(param[index]);
    }
  };
  return (
    <div className="flex mt-2 justify-between">
      <div className="flex gap-2">
        <p
          className={`flex items-center justify-center  border border-blue-500 bg-gradient-to-tr from-blue-100 to-transparent text-black px-3 py-1 rounded-[5px] gap-2 ${
            payMin && payMax ? "flex" : "hidden"
          }`}
        >
          ${payMin}-${payMax}
          <HiX
            className=" text-blue-600 cursor-pointer"
            onClick={() => {
              removeArrayQueriesParam(["PayMin", "PayMax"]);
            }}
          />
        </p>
        {skill?.split(" ").length !== 0 && skill !== undefined && (
          <p className="flex items-center justify-center  border border-blue-500 bg-gradient-to-tr from-blue-100 to-transparent text-black px-3 py-1 rounded-[5px] gap-2">
            Skills {skill?.split(" ").length}
            <HiX
              className=" text-blue-600 cursor-pointer"
              onClick={() => removeQueriesParam("Skills")}
            />
          </p>
        )}
        <p
          className={`  items-center justify-center  border border-blue-500 bg-gradient-to-tr from-blue-100 to-transparent text-black px-3 py-1 rounded-[5px] gap-2  ${
            role?.split(" ") ? "flex" : "hidden"
          }`}
        >
          Role Type {role?.split(" ").length}
          <HiX
            className=" text-blue-600 cursor-pointer"
            onClick={() => removeQueriesParam("EmploymentType")}
          />
        </p>
        <p
          className={` items-center justify-center  border border-blue-500 bg-gradient-to-tr from-blue-100 to-transparent text-black px-3 py-1 rounded-[5px] gap-2 ${
            minXp && maxXp ? "flex" : "hidden"
          }`}
        >
          {minXp}-{maxXp} years+
          <HiX
            className=" text-blue-600 cursor-pointer"
            onClick={() => {
              removeArrayQueriesParam(["Experience[gte]", "Experience[lte]"]);
            }}
          />
        </p>
        <p
          className={`  items-center justify-center  border border-blue-500 bg-gradient-to-tr from-blue-100 to-transparent text-black px-3 py-1 rounded-[5px] gap-2  ${
            remote ? "flex" : "hidden"
          }`}
        >
          {remote === "true" ? "Remote" : "Not Remote"}
          <HiX
            className=" text-blue-600 cursor-pointer"
            onClick={() => removeQueriesParam("isRemote")}
          />
        </p>
      </div>
      <p className=" text-blue-700  cursor-pointer" onClick={clearQueriesParam}>
        clear
      </p>
    </div>
  );
};
export default SavedFilters;
