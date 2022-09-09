import React, { useState } from 'react';

const ExpandedThumbnails = ({ thumbnails = [], index, handleThumbnailClick }) => {
  const [thumbnailIndex, setThumbnailIndex] = useState(0);

  let shownThumbnails = [];
  if (thumbnails.length > 7) {
    if (thumbnailIndex + 7 >= thumbnails.length) {
      shownThumbnails = thumbnails.slice(-7);
    } else {
      shownThumbnails = thumbnails.slice(thumbnailIndex, thumbnailIndex + 7);
    }
  } else {
    shownThumbnails = thumbnails;
  }

  const handleThumbnailClickEvents = (e) => {
    const newHighlightIndex = parseInt(e.target.dataset.id, 10) + thumbnailIndex;
    handleThumbnailClick(newHighlightIndex);

    let newIndex;
    if (thumbnails.length <= 7) {
      newIndex = 0;
    } else if (newHighlightIndex + 7 >= thumbnails.length) {
      newIndex = thumbnails.length - 7;
    } else {
      newIndex = newHighlightIndex;
    }

    setThumbnailIndex(newIndex);
  };

  const handleThumbnailNext = () => {
    setThumbnailIndex(thumbnailIndex + 1);
  };

  const handleThumbnailPrev = () => {
    setThumbnailIndex(thumbnailIndex - 1);
  };

  const prevHidden = thumbnailIndex <= 0;
  const nextHidden = thumbnailIndex + 7 >= thumbnails.length;

  return (
    <div id="expandedThumbnails">
      <div id="expandedThumbnailPrev" onClick={handleThumbnailPrev} hidden={prevHidden}>
        &lt;
      </div>
      {shownThumbnails.map((thumbnail, idx) => {
        const selected = (index - thumbnailIndex) === idx;
        return (
          <div
            className="thumbnailIndicator"
            style={{ color: selected ? 'grey' : 'black', fontSize: selected ? '25px' : '20px' }}
            onClick={handleThumbnailClickEvents}
            data-id={idx}
          >
            {' '}
            &#8226;
          </div>
        );
      })}
      <div id="expandedThumbnailNext" onClick={handleThumbnailNext} hidden={nextHidden}>
        &gt;
      </div>
    </div>
  );
};

export default ExpandedThumbnails;
