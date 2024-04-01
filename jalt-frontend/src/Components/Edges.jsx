import React, { useState, useEffect } from 'react';
import tunnelImage from '../Images/tunnel.jpg';
import st42Image from '../Images/42st.jpg';
import doorsImage from '../Images/doors.jpg';
import trainImage from '../Images/train.jpg';

const Edges = () => {
  const images = [tunnelImage, st42Image, doorsImage, trainImage];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const imageStyle = {
    width: '20%',
    height: '100%',
    position: 'fixed',
    top: 80,
    bottom: 0,
    zIndex: -1,
  };

  const leftImageStyle = {
    ...imageStyle,
    left: 0,
  };

  const rightImageStyle = {
    ...imageStyle,
    right: 0,
  };

  return (
    <div>
      <img src={images[currentImageIndex]} alt="Left" style={leftImageStyle} />
      <img src={images[currentImageIndex]} alt="Right" style={rightImageStyle} />
    </div>
  );
};

export default Edges;
