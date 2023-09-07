import BrowseJob from "@/components/Job/BrowseJob";
import Hidden from "@/components/Job/Hidden";
import SaveJob from "@/components/Job/SaveJob";
import PageLayout from "@/components/Layout/PageLayout";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery, useQueryClient } from "react-query";
import React from "react";
import { getSavedJobs, getSeachJobs } from "@/app/apiQuery";
import { Job } from "@/type/types";
import Loader from "@/components/Utils/Loader";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Featured from "@/components/Job/Featured";

type JobsProps = {};

const Jobs: React.FC<JobsProps> = () => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const emptyResponse: any = [];

  const { query } = router;
  console.log(query);

  const { data: Jobs, isLoading } = useQuery<Job[]>(
    ["jobs", query],
    async () => {
      return getSeachJobs(query);
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const { data: savedJobs } = useQuery("saved", getSavedJobs, {
    onSuccess: (data) => {
      if (data?.isError === true) {
        queryClient.setQueriesData("saved", emptyResponse);
      }
    },
  });

  const handleView = (values: string) => {
    const path = router.pathname;
    query["type"] = values;
    router.push({ pathname: path, query });
  };
  let content;
  if (query.type === "all" || query.type === undefined) {
    content = <BrowseJob Jobs={Jobs} isLoading={isLoading} />;
  }
  if (query.type === "saved") {
    content = <SaveJob />;
  }
  if (query.type === "hidden") {
    content = <Hidden />;
  }
  if (query.type === "featured") {
    content = <Featured />;
  }

  return (
    <>
      <PageLayout>
        <div className="flex max-w-[1000px] w-[96%] flex-col ">
          <h1 className=" text-3xl font-black">Search for jobs</h1>
          <div className="flex gap-6 mt-4">
            <p
              className={` cursor-pointer ${
                query.type === "all" || query.type === undefined
                  ? "border-b-[2px]"
                  : "bottom-0"
              } pb-1 border-b-gray-600`}
              onClick={() => handleView("all")}
            >
              Browse all
            </p>
            {/* <p
              className={` cursor-pointer ${
                query.type === "featured" || "" ? "border-b-[2px]" : "bottom-0"
              } pb-1 border-b-gray-600`}
              onClick={() => handleView("featured")}
            >
              Featured
            </p> */}
            <div
              className={` cursor-pointer ${
                query.type === "saved" || "" ? "border-b-[2px]" : "bottom-0"
              } pb-1 border-b-gray-600 flex gap-1 items-center`}
              onClick={() => handleView("saved")}
            >
              <p>Saved</p>
              <p className=" bg-gray-400 h-4 w-4 px-[2px] pt-[1px]  text-white flex items-center justify-center  text-[12px] rounded-full">
                {savedJobs?.length}
              </p>
            </div>
            <p
              className={` cursor-pointer ${
                query.type === "hidden" || "" ? "border-b-[2px]" : "bottom-0"
              } pb-1 border-b-gray-600`}
              onClick={() => handleView("hidden")}
            >
              Hidden
            </p>
          </div>
          <div className="mt-4">{content}</div>
        </div>
      </PageLayout>
    </>
  );
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery("jobs", getSeachJobs);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Jobs;
