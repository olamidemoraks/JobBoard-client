import { apiSlice } from "@/app/api/apiSlice";

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/seeker",
      }),
    }),
    createProfile: builder.mutation({
      query: (initialdata) => ({
        url: "/seeker",
        method: "POST",
        body: {
          ...initialdata,
        },
      }),
    }),
    editProfile: builder.mutation({
      query: (initialValue) => ({
        url: "/seeker",
        method: "PATCH",
        body: {
          ...initialValue,
        },
      }),
    }),
    uploadImage: builder.mutation({
      query: (initialValue) => ({
        url: "/seeker/image-upload",
        method: "PATCH",
        body: initialValue,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useCreateProfileMutation,
  useEditProfileMutation,
  useUploadImageMutation,
} = profileApiSlice;
