import React, { useState } from 'react';

const ImageCarousel = ({ images, imageClass = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel">
      <div className="carousel-image">
        <button className="arrow left-arrow" onClick={prevImage}>
          &larr;
        </button>
        <img className={imageClass} src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
        <button className="arrow right-arrow" onClick={nextImage}>
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;
