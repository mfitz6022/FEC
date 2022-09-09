import React, { useState, useEffect } from 'react';
import { getProduct, getStyles, getRelated } from '../../../getHelpers.js';
import ProductContext from '../../ProductContext.jsx';
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import RatingsStars from '../../ReviewsAndRatings/RatingsStars.jsx';
// import '/client/dist/Lists.css';

const OutfitListEntry = (props) => {
  const {outfit, remove, updateCount, count} = props;
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [reviews, setReviews] = useState('');
  const [sale, setSale] = useState(null);

  const newRender = (productID) => {
    handleProductChange(productID);
  };

  useEffect(() => {
    getProduct(outfit)
      .then((res) => {
        setCategory(res.data.category);
        setName(res.data.name);
      })
      .catch((e) => {
        console.error(e);
      });

    getStyles(outfit)
      .then((res) => {
        setImage(res.data.results[0].photos[0].thumbnail_url);
        setPrice(res.data.results[0].original_price);
        setSale(res.data.results[0].sale_price);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [outfit]);

  return (
    <div className="entry">
      <FaTimes
        className="button-compare-outfit"
        onClick={() => {remove(outfit); updateCount(count - 1)}}/>
      <div className="image-container">
        <img className="image"
        src={image} alt="could not be displayed" />
      </div>
      <h3 className="name">{name}</h3>
      <h4 className="category">{category}</h4>
      <div className="price-container">
            {
              sale
                ? <>
                    <h4 className="price original-onsale">${price}</h4>
                    <h4 className="price sale">${sale}</h4>
                  </>
                : <h4 className="price original">${price}</h4>
            }
          </div>
      <div className="reviews">
        <RatingsStars stars={5} />
      </div>
    </div>
  );
};

export default OutfitListEntry;
