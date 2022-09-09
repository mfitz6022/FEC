import React, { useState, useEffect } from 'react';
import ImageCarousel from './ImageCarousel.jsx';
import ThumbnailCarousel from './ThumbnailCarousel.jsx';

const Gallery = ({
  product, photos = [], syncFromDefaultView, index
}) => {
  const [imageIndex, setImageIndex] = useState(index || 0);
  const thumbnails = [];
  const images = [];

  useEffect(() => {
    setImageIndex(0);
  }, [product]);

  useEffect(() => {
    if (imageIndex > photos.length - 1) {
      setImageIndex(0);
    }
  }, [photos]);

  useEffect(() => {
    setImageIndex(index);
  }, [index]);

  const prev = () => {
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
    }
  };

  const next = () => {
    if (imageIndex < photos.length - 1) {
      setImageIndex(imageIndex + 1);
    }
  };

  for (let i = 0; i < photos.length; i += 1) {
    thumbnails.push(photos[i].thumbnail_url);
    images.push(photos[i].url);
  }

  const handleThumbnailClick = (idx) => {
    setImageIndex(idx);
  };

  const handleOpenExpandedView = () => {
    syncFromDefaultView(imageIndex);
  };

  return photos.length > 0 ? (
    <div id="galleryWrapper">
      <div id="thumbnailCarouselContainer">
        <ThumbnailCarousel
          thumbnails={thumbnails}
          index={imageIndex}
          handleThumbnailClick={handleThumbnailClick}
        />
      </div>
      <div id="imageCarouselContainer">
        <ImageCarousel
          images={images}
          index={imageIndex}
          prev={prev}
          next={next}
          setExpandedView={handleOpenExpandedView}
        />
      </div>
    </div>
  ) : null;
};

export default Gallery;
