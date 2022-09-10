import React from 'react';
import Ratings from './Ratings.jsx'
import ReviewCard from './ReviewCard.jsx'
import ReviewList from './ReviewList.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-regular-svg-icons';
import './ratingsAndReviews.css';
const axios = require('axios');
const {API_KEY} = process.env;

export default function Reviews ({ product, interactions }) {
const [reviews, setReviews] = React.useState([])
const [meta, setMeta] = React.useState('')

React.useEffect(() => {
  async function fetchData() {
    const request = await axios({
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews',
      headers: { Authorization: process.env.API_KEY },
      params: {
        product_id: product.id,
      },
    });
    setReviews(request.data.results);
    return;
  }
  if (product) {
    fetchData()
    .catch(err => console.log(err))
  }
}, [product]);


React.useEffect(() => {
async function fetchMeta() {
  const request = await axios({
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/meta',
    headers: { Authorization: process.env.API_KEY },
    params: {
      product_id: product.id,
    },
  });
  setMeta(request.data);
  return;
}
if (product) {
  fetchMeta()
  .catch(err => console.log(err))
}
console.log('meta is', meta)}, [product])




  return (
    // <div>
    //   <h1>Ratings and Reviews</h1>
    <div onClick={(e) => interactions(e, 'RatingsAndReviews')}>
      <div id="reviewsWrapper">
        <div />
        <div className="reviews-container">
          <Ratings reviewMeta={meta}/>
          {/* <div> */}
            <ReviewList reviewData={reviews} />
          {/* </div> */}
        </div>
        <div />
      </div>
    </div>
  )
}

// async function getReviews (productID) {
//   return axios({
//    method: 'get',
//    url: `https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews?product_id=${productID}`,
//    headers: {
//      'Authorization': `${API_KEY}`,
//    },
//  });
// };

// React.useEffect(() => {
//   if(product.id){
//   setProductId(product.id)
//   }
//  getReviews(productId)
//  .then(res => {
//   setReviews(res.data)
//  })
//  .catch(err => console.log(err))
// }, [productId])