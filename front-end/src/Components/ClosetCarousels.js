import React from 'react';
import SlickCarousel from './SlickCarousel';
import ImageCarousel from './ImageCarousel';

// Import your PNG images
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.png';
import img5 from '../assets/img5.png';
import img6 from '../assets/img6.png';
import img7 from '../assets/img7.png';
import img8 from '../assets/img8.png';
import img9 from '../assets/img9.png';

const ClosetCarousels = () => {
  // Group images by category
  const shirts = [img1, img2, img3];
  const pants = [img4, img5, img6];
  const shoes = [img7, img8, img9];

  return (
    <div className="carousels-container">
      <ImageCarousel images={shirts} />
      <ImageCarousel images={pants} />
      {/* For shoes, pass an extra class to the image element */}
      <ImageCarousel images={shoes} imageClass="shoes-image" />
    </div>
  );
};

export default ClosetCarousels;
