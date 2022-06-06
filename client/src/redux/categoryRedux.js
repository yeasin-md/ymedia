import { createSlice } from "@reduxjs/toolkit";

export const catSlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //Get All Videos===
    getCategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.categories = action.payload;
      state.error = false;
    },
    getCategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { getCategoryStart, getCategorySuccess, getCategoryFailure } =
  catSlice.actions;
export default catSlice.reducer;
