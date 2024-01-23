import React, { useState, useEffect } from 'react';
import videoBackground from '../../images/backgroundClouds.mp4';

const VideoBackgroundComponent = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = document.createElement('video');
    video.src = videoBackground;
    video.addEventListener('loadeddata', () => {
      setVideoLoaded(true);
    });
  }, []);

  return (
    <div className="video-background">
      {videoLoaded && (
        <video
          src={videoBackground}
          autoPlay
          loop
          muted
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
      )}
    </div>
  );
};

export default VideoBackgroundComponent;