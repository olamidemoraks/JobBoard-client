import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASEURL}/api/v1`,
    credentials: "include",
    prepareHeaders: (headers, { getState }: any) => {
      if (getState().auth?.profile?.token) {
        headers.set(
          "authorization",
          `Bearer ${getState().auth?.profile?.token}`
        );
      }
      return headers;
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["Profile"],
  endpoints: (builder) => ({}),
});
