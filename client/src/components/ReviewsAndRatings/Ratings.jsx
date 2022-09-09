import React from 'react';
import data from './data.js';
import RatingsProductMeta from './RatingsProductMeta.jsx';
import RatingsStarMeta from './RatingsStarMeta.jsx';


export default function Ratings (props) {


const [metaData, setMetaData] = React.useState(props.reviewMeta)

console.log("the props for ratings are:,", metaData)
React.useEffect(() =>{
setMetaData(props.reviewMeta)
},[])

  return (
    <div className="ratings-container">
     <h1>Ratings & Reviews</h1>
     <RatingsStarMeta reviewMeta={metaData}/>
     <RatingsProductMeta reviewMeta={metaData}/>
    </div>
  )

}