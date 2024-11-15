import React from 'react';
import videoBackground from '../../images/backgroundClouds.mp4';

const VideoBackgroundComponent = () => {
  return (
    <div className='video-background'>
      <video
        src={videoBackground}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      />
    </div>
  );
};

export default VideoBackgroundComponent;
