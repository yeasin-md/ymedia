import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { MdDelete } from 'react-icons/md';
import './MyVideos.scss';
import { userRequest } from '../../requestCalls';
import moment from 'moment';
import {
  deleteVideoFailure,
  deleteVideoStart,
  deleteVideoSuccess,
} from '../../redux/videoRedux';
const MyVideos = () => {
  const dispatch = useDispatch();
  const user = useSelector(s => s.user.currentUser);
  const uTOKEN = user?.accessToken;
  const config = {
    headers: {
      token: `Bearer ${uTOKEN} `,
    },
  };
  const myVideos = useSelector(state =>
    state.video.videos.filter(r => r.userId.includes(user._id))
  );
  return (
    <div className="myvideos-container">
      <h4 style={{ marginLeft: 5 }}>Total {myVideos?.length} videos</h4>
      {myVideos
        ?.slice(0)
        .reverse()
        .map((vid, index) => (
          <Fragment key={index}>
            <div>
              <div className="myvideos-wrapper">
                <div className="" style={{ display: 'flex', flexWrap: 'wrap' }}>
                  <div className="myvideos-player">
                    <ReactPlayer url={vid.link} className="myvideos-thumb" />
                  </div>
                  <div className="myvideos-details">
                    <span>
                      <strong>title:</strong> {vid.title}
                    </span>
                    <span>
                      <strong>origin:</strong> {vid.origin}
                    </span>
                    <span>
                      <strong>singer:</strong> {vid.singer}
                    </span>
                    <span>
                      <strong>category:</strong> {vid.cName}
                    </span>{' '}
                    <span>
                      <strong>created at:</strong>{' '}
                      {moment(vid.createdAt).format('Do MMM YYYY, h:mm:ss a')}
                    </span>
                    <a href={`/video/${vid._id}`}>Show</a>
                  </div>
                </div>
                <div className="myvideos-edit">
                  <span
                    onClick={async e => {
                      e.preventDefault();
                      dispatch(deleteVideoStart());
                      try {
                        await userRequest.delete(
                          `/videos/delete/${vid._id}`,
                          config
                        );
                        dispatch(deleteVideoSuccess(vid._id));
                      } catch (error) {
                        dispatch(deleteVideoFailure());
                        console.log(error.response.data);
                      }
                    }}
                  >
                    <MdDelete /> Delete
                  </span>
                </div>
              </div>
            </div>
          </Fragment>
        ))}
    </div>
  );
};

export default MyVideos;
