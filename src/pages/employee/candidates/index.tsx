import React from "react";
import { useQuery } from "react-query";
import { getAllCompanyApplicant, getCompany } from "@/app/apiQuery";
import AuthRoute from "@/components/Layout/AuthRoute";
import ApplicantTable from "@/components/Company/ApplicantTable/ApplicantTable";
import { Application } from "@/type/types";

type CandidatesProps = {};

const Candidates: React.FC<CandidatesProps> = () => {
  const { data, isLoading } = useQuery("company", getCompany, {
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <ApplicantTable isLoading={isLoading} company={data} />
    </div>
  );
};
export default AuthRoute(Candidates);
