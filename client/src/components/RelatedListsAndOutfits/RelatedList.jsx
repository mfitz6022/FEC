import React, { useContext, useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { getProduct } from '../../getHelpers.js'
import ProductContext from './../ProductContext.jsx';
import FeaturesContext from './../FeaturesContext.jsx'
import RelatedListEntry from './entries/RelatedListEntry.jsx';
import '/client/dist/Lists.css';

const RelatedList = (props) => {
  const { related } = props;
  const { currentProduct } = useContext(ProductContext);
  const [currentFeatures, setFeatures] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [countLeft, setCountLeft] = useState(0);
  const [countRight, setCountRight] = useState(4);

  useEffect(() => {
    getProduct(currentProduct?.id)
    .then((response) => {
      setFeatures(response.data.features.map(item => item.feature))
    })
    .then(() => {
      setLoading(false);
    })
    .catch((e) => {
      console.error(e);
    })
  }, [currentProduct])

  const slideLeft = () => {
    const slider = document.getElementById('slider');
    slider.scrollLeft -= (window.innerWidth/4.625);
  };

  const slideRight = () => {
    const slider = document.getElementById('slider');
    slider.scrollLeft += (window.innerWidth/4.625);
  };

  const handleCountLeft = () => {
    setCountLeft(countLeft - 1);
    setCountRight(countRight - 1);
  }

  const handleCountRight = () => {
    setCountRight(countRight + 1);
    setCountLeft(countLeft + 1);
  }

  if(isLoading) {
    return <div>loading</div>
  } else {
    return (
      <>
        <h1 className="list-title">Products similar to this one</h1>
        <div className="container related" id="slider">
          <FeaturesContext.Provider value={{currentFeatures}}>
            {countLeft === 0
              ? null
              : <FaArrowLeft className="slide-left" onClick={() => {slideLeft(); handleCountLeft()}} />
            }
            {
            related.map((item, index) => <RelatedListEntry
            item={item} key={index}/>)
            }
            {countRight === related.length
              ? null
              : <FaArrowRight className="slide-right" onClick={() => {slideRight(); handleCountRight()}} />
            }
          </FeaturesContext.Provider>
        </div>
      </>
    );
  }

}


export default RelatedList;
