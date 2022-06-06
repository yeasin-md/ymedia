import React, { Fragment, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FaRegClipboard, FaShare, FaUser } from 'react-icons/fa';
import {
  IoMdCheckmarkCircle,
  IoMdCheckmarkCircleOutline,
} from 'react-icons/io';
import { BiLogIn } from 'react-icons/bi';
import { BsDot, BsSlashCircle } from 'react-icons/bs';
import { RiArrowUpSFill, RiArrowDownSFill } from 'react-icons/ri';
import './Video.scss';
import { AiFillLike, AiOutlineDownload, AiOutlineLike } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import moment from 'moment';
import { BASE_URL, userRequest } from '../../requestCalls';
import {
  addCommentFailure,
  addCommentStart,
  addCommentSuccess,
  addToLikeStart,
  addToLikeSuccess,
  addToLikeFailure,
  removeLikeStart,
  removeLikeSuccess,
  removeLikeFailure,
} from '../../redux/videoRedux';
const Video = () => {
  let { videoId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const video = useSelector(state =>
    state.video.videos.find(i => i._id === videoId)
  );
  const user = useSelector(u => u.user.currentUser);
  const uTOKEN = user?.accessToken;
  const config = {
    headers: {
      token: `Bearer ${uTOKEN} `,
    },
  };
  const relatedVideos = useSelector(state =>
    state.video.videos.filter(r => r.cName.includes(video.cName[0]))
  );
  const loading = useSelector(s => s.video.isFetching);
  const likeLoading = useSelector(s => s.video.likeFetching);
  const commentInputRef = useRef();
  const [sccMsg, setSccMsg] = useState('');
  const [shared, setShared] = useState(false);
  const [commentPlaceholder, setCommentPlaceholder] = useState(false);
  const [comment, setComment] = useState('');
  const [noOfComment, setNoOfComment] = useState(-2);
  const shareUrl = window.location.href;
  const copyToClip = () => {
    navigator.clipboard.writeText(shareUrl);
    setShared(true);
  };
  const cancledBtn = () => {
    setCommentPlaceholder(false);
    commentInputRef.current.value = '';
  };

  const postComment = async e => {
    e.preventDefault();
    dispatch(addCommentStart());

    const commentData = {
      review: comment,
      userId: user._id,
      videoId: videoId,
      commentator: user.username,
    };
    try {
      const res = await userRequest.post(
        `/videos/add-review`,
        commentData,
        config
      );

      commentInputRef.current.value = '';
      setCommentPlaceholder(false);
      const commented = res.data;
      dispatch(addCommentSuccess({ videoId, commented }));
      setSccMsg('Comment Captured');
    } catch (error) {
      dispatch(addCommentFailure());
      console.log(error.message);
    }
  };
  if (sccMsg) {
    setTimeout(() => {
      setSccMsg('');
    }, 2000);
  }
  const addToLike = async e => {
    e.preventDefault();
    dispatch(addToLikeStart());
    try {
      const res = await userRequest.post(
        `/videos/add-like`,
        {
          likedUser: user._id,
          likedUsername: user.username,
          likedVideoId: videoId,
        },
        config
      );
      const liked = res.data;
      dispatch(addToLikeSuccess({ videoId, liked }));
    } catch (error) {
      dispatch(addToLikeFailure());
      console.log(error);
    }
  };
  const likedUserList = video.likes.map(item => {
    return item.likedUser ? item.likedUser : '';
  });
  const removeLike = video.likes.filter(i => i.likedUser?.includes(user?._id));
  const removeLikeId = removeLike.map(i => i._id);

  const removeLikeButton = async e => {
    e.preventDefault();
    dispatch(removeLikeStart());
    try {
      const res = await userRequest.post(
        '/videos/remove-like',
        {
          likedId: removeLikeId,
          likedVideoId: videoId,
        },
        config
      );
      const removeLiked = res.data;
      dispatch(removeLikeSuccess({ videoId, removeLiked }));
    } catch (error) {
      dispatch(removeLikeFailure());
      console.log(error);
    }
  };
  return (
    <div className="video-container">
      <div className="video-wrapper">
        {/* {loading ? (
          <Loading />
        ) : ( */}
        <>
          <ReactPlayer url={video.link} className="video-player" controls />
          <div className="video-details">
            <div className="show-video-details">
              <h4>
                {video.title} || {video.origin}
              </h4>
              <p
                style={{
                  marginTop: '.5rem',
                  fontWeight: '500',
                  fontSize: '13px',
                }}
              >
                {moment(video.createdAt).format('D MMM YYYY')}
              </p>
            </div>{' '}
            <div className="social-buttons">
              <div
                className={`video-like ${
                  likedUserList.includes(user?._id) ? 'video-liked' : ''
                }`}
              >
                {!user ? (
                  <span onClick={() => history.push('/signin')}>
                    <AiOutlineLike /> Like ({video.likes.length})
                    {likeLoading && <p className="like-loader"></p>}
                  </span>
                ) : likedUserList.includes(user?._id) ? (
                  <span onClick={removeLikeButton}>
                    <AiFillLike /> Liked ({video.likes.length})
                    {likeLoading && <p className="like-loader"></p>}
                    {/* {removeLiker[0]._id} */}
                  </span>
                ) : (
                  <span onClick={addToLike}>
                    <AiOutlineLike /> Like ({video.likes.length})
                    {likeLoading && <p className="like-loader"></p>}
                  </span>
                )}
              </div>
              {shared === true ? (
                <div className="copied ">
                  Copied <FaRegClipboard />{' '}
                </div>
              ) : (
                <div className={`share-link`} onClick={() => copyToClip()}>
                  <FaShare style={{ marginRight: '5' }} />
                  <span>SHARE</span>
                </div>
              )}{' '}
              <div className="video-like">
                <span>
                  <AiOutlineDownload />
                </span>
              </div>
            </div>
          </div>{' '}
          <div className="video-details-channel">
            <div className="home-videos-avatar channel-avatar">
              {video.channelName ? (
                <>{video.channelName.substring(2, 0)}</>
              ) : (
                <FaUser style={{ color: 'white', fontSize: '13px' }} />
              )}
            </div>
            {video.channelName ? (
              <span>
                {video.channelName} <IoMdCheckmarkCircle />
              </span>
            ) : (
              <span>anonymous</span>
            )}
          </div>{' '}
          <p style={{ marginTop: '1.2rem' }}>
            <b>Origin/Movie:</b> {video.origin}
          </p>
          <p>
            <b>Singer:</b> {video.singer}
          </p>
          <p style={{ marginTop: '.7rem' }}> Details: {video.description}</p>
          <div className="video-comments-section">
            <p>
              <strong>Comments ({video.reviews.length}):</strong>
            </p>

            <div className="post-comment">
              {!user ? (
                <Link className="post-comment-redirect" to="/signin">
                  <span>
                    Please Login to Comment <BiLogIn />
                  </span>
                </Link>
              ) : (
                <>
                  <div className="post-comment-user">
                    <div className="home-videos-avatar ">
                      {user.username.substring(2, 0)}
                    </div>
                    <span>{user?.username}</span>
                  </div>
                  <div className="post-comment-placeholder">
                    <textarea
                      type="text"
                      ref={commentInputRef}
                      name=""
                      placeholder="add a comment..."
                      id=""
                      onChange={e => setComment(e.target.value)}
                      onClick={() => setCommentPlaceholder(true)}
                    />
                  </div>
                  {loading ? <Loading /> : ''}
                </>
              )}
              {sccMsg && (
                <h4
                  style={{
                    color: 'green',
                    fontSize: '20px',
                    display: 'flex',
                    transition: 'all 250ms ease-in-out',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {sccMsg} <IoMdCheckmarkCircleOutline />
                </h4>
              )}

              {commentPlaceholder ? (
                <>
                  <hr style={{ margin: '0 1rem', color: 'blue' }} />
                  <div className="post-comment-button">
                    <button
                      // onClick={e => setCommentPlaceholder(false)}
                      onClick={cancledBtn}
                      className="post-comment-cancel"
                    >
                      CANCEL
                    </button>
                    <button
                      className="post-comment-sure"
                      onClick={postComment}
                      disabled={!comment}
                    >
                      COMMENT {!comment && <BsSlashCircle />}
                    </button>
                  </div>
                </>
              ) : (
                ''
              )}
            </div>
            <div className="video-comments-container">
              {video.reviews
                ? video.reviews
                    .slice(noOfComment)
                    .reverse()
                    .map((rev, index) => (
                      <Fragment key={index}>
                        <div className="single-comment">
                          <div className="single-comment-user">
                            <div className="home-videos-avatar comment-avatar">
                              <FaUser
                                style={{ color: 'white', fontSize: '13px' }}
                              />
                            </div>
                            <span>
                              {/* {rev.user} */}
                              <strong>
                                {rev.user ? rev.commentator : ''}
                              </strong>{' '}
                              <BsDot />{' '}
                              {moment(rev.createdAt).startOf('hour').fromNow()}
                            </span>
                          </div>
                          <p className="p-comment">{rev.review}</p>
                        </div>
                      </Fragment>
                    ))
                : ''}
              {video.reviews.length > 2 && (
                <>
                  {noOfComment === 0 ? (
                    <div className="showmore-comments">
                      <span onClick={() => setNoOfComment(-2)}>
                        Close <RiArrowUpSFill />
                      </span>
                    </div>
                  ) : (
                    <div className="showmore-comments">
                      <span
                        className="showmore-comments"
                        onClick={() => setNoOfComment(0)}
                      >
                        View All <RiArrowDownSFill />
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      </div>

      <div className="video-related-videos">
        <h4
          className=""
          style={{ marginLeft: '.6rem', fontSize: '19px', fontWeight: '500' }}
        >
          Related Videos
        </h4>

        {relatedVideos ? (
          relatedVideos.map((r, index) => (
            <div key={index}>
              <Link to={`/video/${r._id}`} className="related-videos-wrapper">
                {/* <img src={r.thumbnail} alt="" /> */}
                <ReactPlayer url={r.link} className="related-thumb" />

                <div className="related-videos-details">
                  <h4>{r.title}</h4>
                  <p>{r.singer}</p>
                  {r.channelName && (
                    <p>
                      {r.channelName} <IoMdCheckmarkCircle />
                    </p>
                  )}
                  <p>
                    {/* {moment(r.createdA, 'YYYYMMDD').fromNow()} */}
                    {moment(r.createdAt).startOf('hour').fromNow()}
                    {/* {moment(vid.createdAt).format("lll")} */}
                  </p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <h4>No Videos Found Similar</h4>
        )}
      </div>
    </div>
  );
};

export default Video;
