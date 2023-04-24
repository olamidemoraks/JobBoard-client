import { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  applyModalOpen: false,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    openApplyModal: (state, action) => {
      state.applyModalOpen = action.payload.data;
    },
  },
});

export const { openApplyModal } = jobSlice.actions;
export default jobSlice.reducer;

export const applyModal = (state: RootState) => state.job.applyModalOpen;
