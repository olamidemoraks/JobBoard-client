import { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

// interface Profile {
//   profile: any;
// }
// let storage;
// if (typeof window !== "undefined") {
//   storage = window.localStorage.getItem("_profile");
// }

const initialState = {
  profile: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredential: (state, action) => {
      const profile = action.payload.profile;
      state.profile = profile;
      localStorage.setItem("_profile", JSON.stringify(profile));
    },
    logout: (state, action) => {
      localStorage.removeItem("_profile");
      state.profile = {};
    },
  },
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload.profile,
  //     };
  //   },
  // },
});

export const { setCredential, logout } = authSlice.actions;
export default authSlice.reducer;

export const getToken = (state: RootState) => state.auth.profile;
