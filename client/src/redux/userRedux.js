import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isAuthenticated: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: state => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.error = false;
    },

    loginFailure: state => {
      state.isFetching = false;
      state.error = true;
      state.isAuthenticated = false;
    },
    registerStart: state => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.error = false;
    },
    registerFailure: state => {
      state.isFetching = false;
      state.error = true;
      state.isAuthenticated = false;
    },
    logoutSuccess: state => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  registerStart,
  registerSuccess,
  registerFailure,
} = userSlice.actions;
export default userSlice.reducer;
