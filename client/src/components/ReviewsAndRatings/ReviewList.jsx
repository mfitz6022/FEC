import React from 'react';
import ReviewCard from './ReviewCard.jsx'
import data from './data.js'
import ReviewSort from './ReviewSort.jsx'


export default function ReviewList (props) {
const [renderedReviews, setRenderedReviews] = React.useState(1)


const handleReviewCards = props.reviewData.map((reviewItem, i) => {
  if (i <= renderedReviews){
    return <ReviewCard className='review-item' key={reviewItem.review_id}review={reviewItem} />
  }
  })

  function addMoreReviews(){
    setRenderedReviews(prevState => prevState + 2)
    handleReviewCards
  }

  // function sortReviews (productID, order) {
  //   return axios({
  //    method: 'get',
  //    url: `https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews?product_id=${productID}&sort=${order}`,
  //    headers: {
  //      'Authorization': `${API_KEY}`,
  //    },
  //  });
  // };

  return (
    <div className="review-list">
       <h2>{props.reviewData.length} reviews, sorted by <ReviewSort sort='relevant'/> </h2>
       {handleReviewCards}
       <button className='reviews-btn' onClick={addMoreReviews}>More reviews</button>
       &nbsp;
       <button className='reviews-btn'>Add a review +</button>
    </div>

  )

}

