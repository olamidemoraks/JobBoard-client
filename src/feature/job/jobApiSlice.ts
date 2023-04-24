import { apiSlice } from "@/app/api/apiSlice";

export const jobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    applyJob: builder.mutation({
      query: (initialData) => ({
        url: "/job/apply",
        method: "POST",
        body: initialData,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
    }),
  }),
});

export const { useApplyJobMutation } = jobApiSlice;
