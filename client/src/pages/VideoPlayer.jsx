import React from 'react';
import { Video } from '../components';
import { Footer, Navbar } from '../container';

const VideoPlayer = () => {
  return (
    <>
      <Navbar />
      <Video />
      {/* <Footer /> */}
    </>
  );
};

export default VideoPlayer;
