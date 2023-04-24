import { apiSlice } from "@/app/api/apiSlice";

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    createCompany: builder.mutation({
      query: (initialdata: any) => ({
        url: "/company",
        method: "POST",
        body: {
          ...initialdata,
        },
      }),
    }),

    createJob: builder.mutation({
      query: (initialdata: any) => ({
        url: "/company/jobs",
        method: "POST",
        body: {
          ...initialdata,
        },
      }),
    }),

    uploadCompanyImage: builder.mutation({
      query: ({ initialData, id }: any) => ({
        url: `/company/${id}`,
        method: "PATCH",
        body: initialData,
      }),
    }),
  }),
});

export const {
  useCreateCompanyMutation,
  useCreateJobMutation,
  useUploadCompanyImageMutation,
} = profileApiSlice;
