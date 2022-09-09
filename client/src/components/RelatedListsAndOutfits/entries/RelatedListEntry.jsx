import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { FaRegStar } from 'react-icons/fa';
import { getProduct, getStyles, getRelated } from '../../../getHelpers.js';
import ProductContext from '../../ProductContext.jsx';
import RatingsStars from '../../ReviewsAndRatings/RatingsStars.jsx';
import ListComparison from './modals/listComparison.jsx';

const {API_KEY} = process.env;

const RelatedListEntry = (props) => {
  const { handleProductChange } = useContext(ProductContext);
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [features, setFeatures] = useState([]);
  const [price, setPrice] = useState('');
  const [reviews, setReviews] = useState('');
  const [show, setShow] = useState(false);
  const [sale, setSale] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const newRender = (productID) => {
    handleProductChange(productID);
  };

  useEffect(() => {

    getProduct(props.item)
      .then((res) => {
        setName(res.data.name);
        setCategory(res.data.category);
        setFeatures(res.data.features.map(item => item.value ? item.value : item.feature));
      })
      .then(() => {
        getStyles(props.item)
        .then((res) => {
          setImage(res.data.results[0].photos[0].thumbnail_url);
          setPrice(res.data.results[0].original_price);
          setSale(res.data.results[0].sale_price);
          setLoading(false);
        })
      })
      .catch((e) => {
        console.error(e);
      });
  }, [props.item]);

  if (isLoading) {
    return <div>Loading...</div>
  } else {
    return (
      <>
        <ListComparison onClose={() => setShow(false)}
          show={show}
          close={setShow}
          entryFeatures={features}/>
        <div className="entry">
          <FaRegStar className="button-compare-outfit" onClick={()=>{setShow(true)}}/>
          <div className="image-container">
            <img className="image"
              src={image}
              alt="could not be displayed"
              onClick={() => {newRender(props.item)}}/>
          </div>
          <h2 className="name">{name}</h2>
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
            <RatingsStars stars={4.5} />
          </div>
        </div>
      </>
    );
  }
};

export default RelatedListEntry;
