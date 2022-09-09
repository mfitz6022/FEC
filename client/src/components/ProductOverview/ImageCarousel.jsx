import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ImageCarousel = ({
  images = [], index, prev, next, setExpandedView,
}) => {
  const handleImageClick = () => {
    setExpandedView();
  };

  return (
    <div id="imageGalleryContainer">
      <div hidden={index === 0}>
        <FaArrowLeft id="imageGalleryPrev" onClick={prev} />
      </div>
      <div hidden={index === images.length - 1}>
        <FaArrowRight id="imageGalleryNext" onClick={next} />
      </div>
      <div id="imageGallery">
        <img id="galleryImage" src={images[index]} alt="" onClick={handleImageClick} />
      </div>
    </div>
  );
};

export default ImageCarousel;
