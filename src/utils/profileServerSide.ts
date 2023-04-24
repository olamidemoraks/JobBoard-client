import { getProfile } from "@/app/apiQuery";
import { QueryClient, dehydrate } from "react-query";

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery("profile", getProfile);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
