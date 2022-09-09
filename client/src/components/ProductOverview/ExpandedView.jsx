import React, { useState, useEffect } from 'react';
import ExpandedViewGallery from './ExpandedViewGallery.jsx';
import ExpandedThumbnails from './ExpandedThumbnails.jsx';

const ExpandedView = ({ photos, style, syncFromExpandedView, index, styleIndex }) => {
  const [imageIndex, setImageIndex] = useState(index || 0);

  useEffect(() => {
    setImageIndex(index);
  }, [index]);

  const handleNextClick = () => {
    setImageIndex(imageIndex + 1);
  };

  const handlePrevClick = () => {
    setImageIndex(imageIndex - 1);
  };

  const handleThumbnailClick = (idx) => {
    setImageIndex(idx);
  };

  const handleCloseExpandedView = () => {
    syncFromExpandedView({
      active: false, imageIndex, style, photos, styleIndex,
    });
  };

  const images = [];
  const thumbnails = [];

  for (let i = 0; i < photos?.length; i += 1) {
    thumbnails.push(photos[i].thumbnail_url);
    images.push(photos[i].url);
  }

  return (
    <div id="expandedViewContainer">
      <ExpandedViewGallery
        images={images}
        index={imageIndex}
        styleIndex={styleIndex}
        prev={handlePrevClick}
        next={handleNextClick}
        closeExpandedView={handleCloseExpandedView}
      />
      <ExpandedThumbnails
        thumbnails={thumbnails}
        index={imageIndex}
        handleThumbnailClick={handleThumbnailClick}
      />
    </div>
  );
};

export default ExpandedView;
