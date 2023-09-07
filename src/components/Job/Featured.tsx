import { getFeatureJob } from "@/app/featureApiQuery";
import React from "react";
import { useQuery } from "react-query";

type FeaturedProps = {};

const Featured: React.FC<FeaturedProps> = () => {
  const { data } = useQuery({
    queryKey: ["feature-job"],
    queryFn: async () => {
      await getFeatureJob();
    },
  });
  // console.log("featured job", data);
  // let featuredJob = []
  // const jobs = data?.data?.map((job: any) => {
  //   const job = {
  //     _id: job.job_id,
  //     Title: job.job_title,
  //           : job
  //   }
  //   return
  // });
  return <div>Have a good coding</div>;
};
export default Featured;
