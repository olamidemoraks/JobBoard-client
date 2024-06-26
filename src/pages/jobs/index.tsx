import BrowseJob from "@/components/Job/BrowseJob";
import Hidden from "@/components/Job/Hidden";
import SaveJob from "@/components/Job/SaveJob";
import PageLayout from "@/components/Layout/PageLayout";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery, useQueryClient } from "react-query";
import React, { useEffect } from "react";
import { getSavedJobs, getSeachJobs } from "@/app/apiQuery";
import { Job } from "@/type/types";
import Loader from "@/components/Utils/Loader";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

type JobsProps = {};

const Jobs: React.FC<JobsProps> = () => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const emptyResponse: any = [];

  const { query } = router;

  const {
    data: Jobs,
    isLoading,
    isRefetching,
  } = useQuery<Job[]>(
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
    content = <BrowseJob Jobs={Jobs} isLoading={isLoading || isRefetching} />;
  }
  if (query.type === "saved") {
    content = <SaveJob />;
  }
  // if (query.type === "hidden") {
  //   content = <Hidden />;
  // }

  return (
    <>
      <PageLayout>
        <div className="flex max-w-[1000px] w-[96%] flex-col ">
          <p className=" text-center my-5  ">
            <span className="text-2xl">Let's find you a</span>{" "}
            <br className="sm:hidden  block" />
            <span className="text-2xl uppercase  px-2 sm:mt-0 mt-4 rounded bg-gradient-to-l from-[#FFF2D7] via-[#FFF2D7] to-[#FFF2D7] ">
              job
            </span>
          </p>
          <div className="flex gap-6 mt-4 sm:justify-start justify-center ">
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
            {/* <p
              className={` cursor-pointer ${
                query.type === "hidden" || "" ? "border-b-[2px]" : "bottom-0"
              } pb-1 border-b-gray-600`}
              onClick={() => handleView("hidden")}
            >
              Hidden
            </p> */}
          </div>
          <div className="mt-4 min-h-[40vh]">{content}</div>
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
