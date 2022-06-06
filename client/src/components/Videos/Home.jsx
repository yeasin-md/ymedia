import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';
import { FaPlus, FaUser, FaVideo } from 'react-icons/fa';
import { RiVideoAddFill } from 'react-icons/ri';
import { AiFillSetting } from 'react-icons/ai';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { getBanners, getCats, getVideos } from '../../redux/apiCalls';
import Loading from '../Loading/Loading';
import ReactPlayer from 'react-player';
import moment from 'moment';
import {
  IoMdCheckmarkCircle,
  IoMdCheckmarkCircleOutline,
} from 'react-icons/io';

const Videos = () => {
  const dispatch = useDispatch();
  const videos = useSelector(state => state.video.videos);
  const loading = useSelector(state => state.video.isFetching);
  const user = useSelector(state => state.user.currentUser);

  const categories = useSelector(s => s.cat.categories);
  const banner = useSelector(s => s.banner.banners);
  const [greeting, setGreeting] = useState('');

  const [activeFilter, setActiveFilter] = useState('');
  const [filterVideo, setFilterVideo] = useState(videos);
  useEffect(() => {
    getVideos(dispatch);
    getCats(dispatch);
    getBanners(dispatch);
    setActiveFilter('All');
    setFilterVideo(videos);
    const d = new Date();
    const time = d.getHours();

    if (time < 12) {
      setGreeting('Good Evening');
    }
    if (time > 12) {
      setGreeting('Good afternoon');
    }
    // if (time < 5) {
    //   setGreeting("Good Evening");
    // }
    if (time === 12) {
      setGreeting('Go eat lunch');
    }
  }, [dispatch]);
  useEffect(() => {}, []);

  const handleCatFilter = item => {
    setActiveFilter(item);

    item === 'All'
      ? setFilterVideo(videos)
      : setFilterVideo(videos?.filter(work => work.cName.includes(item)));
  };

  return (
    <>
      {loading ? (
        <div className="home-loading">
          <Loading />
        </div>
      ) : (
        <div className="home-container">
          <div className="home-part1">
            <div className="home-upload-container">
              <p>
                {greeting}, {user ? user.username : 'Hello'}
              </p>
              <Link to="/create-video" className="upload-btn2">
                <span>Create</span>
                <span>
                  <RiVideoAddFill className="upload-btn2-plus" />
                </span>
              </Link>
              {user ? (
                <div className="home-settings">
                  <div
                    className=""
                    style={{
                      display: 'inline-block',
                    }}
                  >
                    <Link to="/settings" className="home-settings-link">
                      <FaVideo /> My Videos
                    </Link>
                  </div>{' '}
                  <br />
                  <div className="" style={{ display: 'inline-block' }}>
                    <Link to="/settings" className="home-settings-link">
                      <AiFillSetting /> Settings
                    </Link>{' '}
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="home-cat-container">
              <p>Categories</p>
              {categories
                ?.slice(0)
                .reverse()
                .map((cat, index) => (
                  <h4
                    key={index}
                    className={` ${
                      activeFilter === cat.title ? 'cat-active' : ''
                    }`}
                    onClick={() => handleCatFilter(cat.title)}
                  >
                    {cat.title}
                  </h4>
                ))}
            </div>
          </div>
          <div className="home-part2">
            <div className="home-banner-container">
              <div>
                <Carousel
                  autoPlay
                  centerMode
                  stopOnHover
                  swipeable
                  dynamicHeight={true}
                  emulateTouch
                  centerSlidePercentage={90}
                  infiniteLoop
                  showIndicators
                  showStatus={false}
                  interval={4000}
                  transitionTime={500}
                  showThumbs={false}
                >
                  {banner?.map((ban, index) => (
                    <div key={index} className="home-banner">
                      <img src={ban.img} className="banner-img" alt="" />
                      <Link to={ban.link} target="_blank" className="legend">
                        SHOW
                      </Link>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
            <div className="home-videos-container">
              <div className="home-cat-container2">
                <div
                  className=" "
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                    marginTop: '10px',
                  }}
                >
                  <p>Categories</p>
                  <div className="" style={{ display: 'flex' }}>
                    <Link to="/create-video" className="upload-btn2">
                      Create <RiVideoAddFill />
                    </Link>
                    {user ? (
                      <Link to="/settings" className="stng">
                        <AiFillSetting />
                      </Link>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="home-cats2">
                  {categories
                    ?.slice(0)
                    .reverse()
                    .map((cat, index) => (
                      <h4
                        key={index}
                        className={` ${
                          activeFilter === cat.title ? 'cat-active' : ''
                        }`}
                        onClick={() => handleCatFilter(cat.title)}
                      >
                        {cat.title}
                      </h4>
                    ))}
                </div>
              </div>
              {loading ? (
                <div
                  className=""
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Loading />
                </div>
              ) : (
                filterVideo
                  ?.slice(0)
                  .reverse()
                  .map((vid, index) => (
                    <div className="home-videos" key={index}>
                      <Link to={`/video/${vid._id}`}>
                        {/* <img src={vid.thumbnail} alt="" /> */}
                        <ReactPlayer url={vid.link} className="thumb-img" />
                      </Link>
                      <div
                        className=""
                        style={{
                          display: 'flex',
                          marginLeft: '5px',
                          marginTop: '12px',
                        }}
                      >
                        <div className="home-videos-avatar">
                          {vid.channelName ? (
                            <>{vid.channelName.substring(2, 0)}</>
                          ) : (
                            <FaUser
                              style={{ color: 'white', fontSize: '13px' }}
                            />
                          )}
                        </div>
                        <div className="" style={{}}>
                          <h4>{vid.title}</h4>
                          <p>{vid.singer}</p>
                          {vid.channelName && (
                            <span>
                              {vid.channelName} <IoMdCheckmarkCircle />
                            </span>
                          )}
                          <p>
                            {/* {moment(, "YYYYMMDD").fromNow()} */}
                            {moment(vid.createdAt).startOf('hour').fromNow()}
                            {/* {moment(vid.createdAt).format("lll")} */}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Videos;
