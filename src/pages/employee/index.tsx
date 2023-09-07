import { getCompany, getOverview } from "@/app/apiQuery";
import React from "react";
import { QueryClient, dehydrate, useQuery } from "react-query";
import { useRouter } from "next/router";
import useProfile from "@/hooks/useProfile";
import AuthRoute from "@/components/Layout/AuthRoute";
import Dashboard from "@/components/Company/Dashboard";
import Loader from "@/components/Utils/Loader";

type indexProps = {};

const index: React.FC<indexProps> = () => {
  const { isExpired, email } = useProfile();
  const router = useRouter();
  const { data, isLoading } = useQuery("company", getCompany, {
    refetchOnWindowFocus: false,
  });
  const { data: overview, isLoading: overiewLoading } = useQuery(
    "overview",
    async () => {
      return getOverview(data._id);
    },
    {
      refetchInterval: 500 * 1000,
      refetchOnMount: true,
      // refetchOnReconnect: true,
      // refetchOnWindowFocus: true,
      enabled: !!data,
    }
  );

  console.log("overview", overview);

  React.useEffect(() => {
    if (isLoading === false) {
      if (data === null || data === undefined) {
        router.push("/employee-setup");
      }
    }
  }, [data, isLoading]);

  if (overiewLoading) {
    return (
      <div className=" flex items-center justify-center h-[66vh]">
        <Loader />
      </div>
    );
  }

  return <Dashboard overviews={overview} />;
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery("company", getCompany);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default AuthRoute(index);
