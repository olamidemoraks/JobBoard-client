import { Education, Profile, Work } from "@/type/types";
import { createSlice } from "@reduxjs/toolkit";

interface ProfileState {
  workExperience: Work[];
  education: Education[];
  profile?: Profile;
}

const initialState: ProfileState = {
  workExperience: [],
  education: [],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getWorkExperience: (state, action) => {
      state.workExperience = action.payload;
    },
  },
});
