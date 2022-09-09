import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import '../../../dist/productOverview.css';

const StyleIcons = ({
  allStyles, setSelectedStyle, style, index,
}) => {
  const [ticked, setTicked] = useState({});

  const setFallbackToDefaultStyle = () => {
    let defaultStyle = allStyles[0];
    let defaultIndex = 0;

    for (let i = 0; i < allStyles.length; i += 1) {
      if (allStyles[i]['default?']) {
        defaultStyle = allStyles[i];
        defaultIndex = i;
        break;
      }
    }

    const node = document.getElementsByClassName('checkOverlay')[defaultIndex];

    setTicked({ node, index: defaultIndex });
    setSelectedStyle(defaultStyle);
    node?.removeAttribute('hidden');
  };

  useEffect(() => {
    setFallbackToDefaultStyle();
  }, [allStyles]);

  const handleOnClick = (event) => {
    const clicked = event.target.previousSibling;

    if (clicked === ticked.node) return;

    for (let i = 0; i < allStyles.length; i += 1) {
      if (allStyles[i].style_id === parseInt(event.target.dataset.id, 10)) {
        setSelectedStyle(allStyles[i]);
        break;
      }
    }

    if (clicked.getAttribute('hidden') || clicked.getAttribute('hidden') === ''
    ) {
      ticked?.node.setAttribute('hidden', true);
      clicked.removeAttribute('hidden');
      setTicked({ node: clicked, index: clicked.dataset.id });
    }
  };

  return allStyles?.map((style, idx) => {
    const jpg = style.photos[0].thumbnail_url;
    return (
      <div key={style.style_id} className="styleIcon">
        <div className="iconContainer">
          <div className="checkOverlay" data-index={idx} hidden>
            <FontAwesomeIcon icon={faCircleCheck} />
          </div>
          <img
            src={jpg}
            alt={style.name}
            data-id={style.style_id}
            onClick={handleOnClick}
            role="presentation"
          />
        </div>
      </div>
    );
  });
};

export default StyleIcons;
