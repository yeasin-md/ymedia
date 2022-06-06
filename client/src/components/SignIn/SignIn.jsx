import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { BsExclamationTriangleFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
} from '../../redux/userRedux';
import { publicRequest } from '../../requestCalls';
import './SignIn.scss';
import { registerUser } from '../../redux/apiCalls';
import Loading from '../Loading/Loading';
import { useHistory } from 'react-router-dom';
const SignIn = () => {
  const [signmode, setSignmode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [errmsg, setErrmsg] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const { isFetching } = useSelector(state => state.user);
  const handleClickLogin = async e => {
    e.preventDefault();
    if (!email || !password) {
      setErrmsg(`Please Fill Every Section`);
    } else {
      dispatch(loginStart());
      try {
        const res = await publicRequest.post('/auth/login', {
          email,
          password,
        });
        dispatch(loginSuccess(res.data));
        // window.location.reload();
        history.goBack();
      } catch (error) {
        dispatch(loginFailure(error.response.data));
        setErrmsg(error.response.data);
      }
    }
  };

  const handleClickSignup = async e => {
    e.preventDefault();
    if (!signupEmail || !signupUsername || !signupPassword) {
      setErrmsg(`Please Fill Every Section`);
    } else {
      dispatch(registerStart());

      const signupData = {
        username: signupUsername,
        email: signupEmail,
        password: signupPassword,
      };
      try {
        const res = await publicRequest.post('/auth/register', signupData);
        dispatch(registerSuccess(res.data));
        history.goBack();
      } catch (error) {
        dispatch(registerFailure());
        if (error.response.data.keyValue.username) {
          setErrmsg(
            `(${error.response.data.keyValue.username}) is already taken`
          );
        } else if (error.response.data.keyValue.email) {
          setErrmsg(`Email is already taken`);
        } else if (error.response.data.keyValue.channelName) {
          setErrmsg(
            `${error.response.data.keyValue.channelName} is already taken`
          );
        }
      }
    }
  };
  return (
    <div>
      {' '}
      <div className={`container ${signmode ? 'sign-up-mode' : ''}`}>
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  placeholder="Email"
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  placeholder="Password"
                  type="password"
                  onChange={e => setPassword(e.target.value)}
                />
              </div>{' '}
              {isFetching ? <Loading /> : ''}
              {errmsg ? (
                <div className="error-sending-msg input-field">
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
              <button
                className="btn solid"
                disabled={isFetching}
                onClick={handleClickLogin}
              >
                SIGN IN
              </button>
            </form>
            <form className="sign-up-form">
              <h2 className="title">Sign up</h2>
              {/* <span>(req)* should be fill up</span> */}
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  id="username"
                  onChange={e => setSignupUsername(e.target.value)}
                  placeholder="Username"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  onChange={e => setSignupEmail(e.target.value)}
                  id="email"
                  placeholder="Email"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  onChange={e => setSignupPassword(e.target.value)}
                  id="password"
                  placeholder="Password"
                />
              </div>
              {isFetching ? <Loading /> : ''}
              {errmsg ? (
                <div className="error-sending-msg input-field">
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
              <button
                disabled={isFetching}
                onClick={handleClickSignup}
                className="btn"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
              </p>
              <button
                className="btn transparent"
                onClick={() => setSignmode(true)}
                id="sign-up-btn"
              >
                Sign up
              </button>
            </div>
            <img src="img/log.svg" className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
              </p>
              <button
                className="btn transparent"
                onClick={() => setSignmode(false)}
                id="sign-in-btn"
              >
                Sign in
              </button>
            </div>
            <img src="img/register.svg" className="image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
