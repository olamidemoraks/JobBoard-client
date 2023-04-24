import { apiSlice } from "@/app/api/apiSlice";
import { logout } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (arg) => ({
        url: "/auth/signup",
        method: "POST",
        body: {
          ...arg,
        },
      }),
    }),
    login: builder.mutation({
      query: (arg) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          ...arg,
        },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFufilled }: any) {
        try {
          await queryFufilled;
          dispatch(logout({}));
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useLogoutMutation } =
  authApiSlice;
