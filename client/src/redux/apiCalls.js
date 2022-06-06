import { useHistory } from 'react-router-dom';
import { publicRequest, userRequest } from '../requestCalls';
import {
  getBannerFailure,
  getBannerStart,
  getBannerSuccess,
} from './bannerRedux';
import {
  getCategoryFailure,
  getCategoryStart,
  getCategorySuccess,
} from './categoryRedux';
import {
  getVideoStart,
  getVideoSuccess,
  getVideoFailure,
  addVideoStart,
  addVideoSuccess,
  addVideoFailure,
} from './videoRedux';

export const getVideos = async dispatch => {
  dispatch(getVideoStart());
  try {
    const res = await publicRequest.get('/videos');
    dispatch(getVideoSuccess(res.data));
  } catch (error) {
    dispatch(getVideoFailure());
  }
};
export const getCats = async dispatch => {
  dispatch(getCategoryStart());
  try {
    const res = await publicRequest.get('/videos/cats');
    dispatch(getCategorySuccess(res.data));
  } catch (error) {
    dispatch(getCategoryFailure());
  }
};
export const getBanners = async dispatch => {
  dispatch(getBannerStart());
  try {
    const res = await publicRequest.get('/videos/banners');
    dispatch(getBannerSuccess(res.data));
  } catch (error) {
    dispatch(getBannerFailure());
  }
};

export const createVideo = async (video, dispatch, config) => {
  dispatch(addVideoStart());
  try {
    const res = await userRequest.post('/videos/upload', video, config);
    dispatch(addVideoSuccess(res.data));
    console.log(res.data);
  } catch (error) {
    dispatch(addVideoFailure());
  }
};

// export const postComment = async();
