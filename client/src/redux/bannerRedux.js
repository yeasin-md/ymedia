import { createSlice } from "@reduxjs/toolkit";

export const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    banners: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //Get All Videos===
    getBannerStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getBannerSuccess: (state, action) => {
      state.isFetching = false;
      state.banners = action.payload;
      state.error = false;
    },
    getBannerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { getBannerStart, getBannerSuccess, getBannerFailure } =
  bannerSlice.actions;
export default bannerSlice.reducer;
