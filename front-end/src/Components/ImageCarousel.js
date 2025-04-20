// src/Components/ImageCarousel.js
import React from 'react';

export default function ImageCarousel({
  images,
  imageClass = '',
  selectedIndex = 0,      // controlled index
  onChangeIndex = () => {}// notify parent when index changes
}) {
  const nextImage = () => {
    const nxt = (selectedIndex + 1) % images.length;
    onChangeIndex(nxt);
  };

  const prevImage = () => {
    const prev = (selectedIndex - 1 + images.length) % images.length;
    onChangeIndex(prev);
  };

  return (
    <div className="carousel">
      <div className="carousel-image">
        <button className="arrow left-arrow" onClick={prevImage}>
          &larr;
        </button>
        <img
          className={imageClass}
          src={images[selectedIndex]}
          alt={`Slide ${selectedIndex + 1}`}
        />
        <button className="arrow right-arrow" onClick={nextImage}>
          &rarr;
        </button>
      </div>
    </div>
  );
}
