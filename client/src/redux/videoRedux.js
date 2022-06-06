import { createSlice } from '@reduxjs/toolkit';

export const videoSlice = createSlice({
  name: 'video',
  initialState: {
    videos: [],
    isFetching: false,
    likeFetching: false,
    error: false,
  },
  reducers: {
    //Get All Videos===
    getVideoStart: state => {
      state.isFetching = true;
      state.error = false;
    },
    getVideoSuccess: (state, action) => {
      state.isFetching = false;
      state.videos = action.payload;
      state.error = false;
    },

    getVideoFailure: state => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD products===
    addVideoStart: state => {
      state.isFetching = true;
      state.error = false;
    },
    addVideoSuccess: (state, action) => {
      state.isFetching = false;
      state.videos.push(action.payload);
      state.error = false;
    },
    addVideoFailure: state => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD Comments===
    addCommentStart: state => {
      state.isFetching = true;
      state.error = false;
    },
    addCommentSuccess: (state, action) => {
      state.isFetching = false;
      state.videos[
        state.videos.findIndex(item => item._id === action.payload.videoId)
      ] = action.payload.commented;
    },
    addCommentFailure: state => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD LIKE===
    addToLikeStart: state => {
      state.likeFetching = true;
      state.error = false;
    },
    addToLikeSuccess: (state, action) => {
      state.likeFetching = false;
      state.videos[
        state.videos.findIndex(item => item._id === action.payload.videoId)
      ] = action.payload.liked;
    },
    addToLikeFailure: state => {
      state.likeFetching = false;
      state.error = true;
    },

    //REMOVE LIKE===
    removeLikeStart: state => {
      state.likeFetching = true;
      state.error = false;
    },
    removeLikeSuccess: (state, action) => {
      state.likeFetching = false;
      state.videos[
        state.videos.findIndex(item => item._id === action.payload.videoId)
      ] = action.payload.removeLiked;
    },
    removeLikeFailure: state => {
      state.likeFetching = false;
      state.error = true;
    },
    //DELETE userVIdeos===
    deleteVideoStart: state => {
      state.isFetching = true;
      state.error = false;
    },
    deleteVideoSuccess: (state, action) => {
      state.isFetching = false;
      state.videos.splice(
        state.videos.findIndex(item => item._id === action.payload),
        1
      );
    },
    deleteVideoFailure: state => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getVideoStart,
  getVideoSuccess,
  getVideoFailure,

  deleteVideoStart,
  deleteVideoSuccess,
  deleteVideoFailure,

  addVideoStart,
  addVideoSuccess,
  addVideoFailure,

  addCommentStart,
  addCommentSuccess,
  addCommentFailure,

  addToLikeStart,
  addToLikeSuccess,
  addToLikeFailure,

  removeLikeStart,
  removeLikeSuccess,
  removeLikeFailure,
} = videoSlice.actions;
export default videoSlice.reducer;
