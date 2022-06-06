import React, { Fragment, useState } from 'react';
import { BsExclamationTriangleFill } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import app from '../../firebase';
import Loading from '../Loading/Loading';
import './CreateVideo.scss';
import { useHistory } from 'react-router-dom';
import { createVideo } from '../../redux/apiCalls';
const CreateVideo = () => {
  const user = useSelector(state => state.user.currentUser);
  const uTOKEN = user?.accessToken;
  const config = {
    headers: {
      token: `Bearer ${uTOKEN} `,
    },
  };
  const catSelect = useSelector(state => state.cat.categories);
  const loading = useSelector(state => state.video.isFetching);
  const history = useHistory();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [errmsg, setErrmsg] = useState('');
  const [sccmsg, setSccmsg] = useState('');
  const [progressPecg, setProgressPecg] = useState(0);
  const handleChange = e => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const uploadVideo = async e => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      'state_changed',
      snapshot => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setProgressPecg(Math.round(progress));
        // console.log("Upload is " + Math.round(progress) + "% done");
        switch (snapshot.state) {
          case 'paused':
            // console.log("Upload is paused");
            // setProgressPecg("Paused");
            break;
          case 'running':
            // console.log("Upload is running");
            // setProgressPecg("...");
            break;
          default:
        }
      },
      error => {
        // Handle unsuccessful uploads
        console.log(error.response.data);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          const video = {
            ...inputs,
            link: downloadURL,
            userId: user._id,
            channelName: user.username,
          };

          try {
            createVideo(video, dispatch, config);
            setSccmsg('succeeded');
            setProgressPecg(0);
            // setInputs('');
            setTimeout(() => {
              // window.location.reload();
              history.goBack();
            }, 2000);
          } catch (error) {
            setErrmsg('Please check and try again');
          }

          // try {
          //   const res = userRequest.post('/videos/upload', video);
          //   dispatch(addVideoSuccess(res.data));
          //   setSccmsg('succeded');
          //   setProgressPecg(0);
          //   // window.location.href = '/';
          //   history.goBack();
          // } catch (errors) {
          //   dispatch(addVideoFailure());
          //   console.log(errors.response.data);
          //   setErrmsg('Please check and try again');
          // }
        });
      }
    );
  };

  return (
    <div className="create-container">
      <div className="create-video-form">
        <h4>Create & upload videos</h4>
        <p>Title</p>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder=""
        />
        <p>Origin</p>
        <input
          type="text"
          name="origin"
          onChange={handleChange}
          placeholder=""
        />
        <p>Singer(if any?)</p>
        <input
          type="text"
          name="singer"
          onChange={handleChange}
          placeholder=""
        />
        <p>Category</p>{' '}
        <select id="cars" name="cName" onChange={handleChange}>
          <option className="cat-option" value="">
            Select
          </option>
          {catSelect.map((cat, index) => (
            <Fragment key={index}>
              <option value={cat.title}>{cat.title}</option>
            </Fragment>
          ))}
        </select>
        <p>Description</p>
        <textarea
          type="text"
          name="description"
          onChange={handleChange}
          placeholder=""
        ></textarea>
        <p>Video</p>
        <input
          type="file"
          id="file"
          onChange={e => setFile(e.target.files[0])}
          placeholder=""
        />{' '}
        <br />
        <div className="upload-btn">
          {loading ? <Loading /> : ''}
          {errmsg ? (
            <div className="error-sending-msg">
              <p>
                <BsExclamationTriangleFill />
                {errmsg}
              </p>

              <span onClick={() => setErrmsg('')}>
                <FaTimes />
              </span>
            </div>
          ) : (
            ''
          )}
          {progressPecg ? (
            <div className="progressBar-div">
              <progress
                className="progressBar"
                value={progressPecg}
                max="100"
              ></progress>
              <span
                style={{
                  display: 'flex',
                  width: '13%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {progressPecg}%
              </span>
            </div>
          ) : (
            ''
          )}

          {sccmsg ? (
            <h4
              style={{
                color: 'green',
                fontSize: '20px',
                display: 'flex',

                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              Succeed <IoMdCheckmarkCircleOutline />
            </h4>
          ) : (
            ''
          )}
          <button disabled={loading} onClick={uploadVideo}>
            UPLOAD
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateVideo;
