import React, {useState, useContext, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import ProductContext from '../../../ProductContext.jsx';
import FeaturesContext from '../../../FeaturesContext.jsx';
import { getProduct } from '../../../../getHelpers.js';

const ListComparison = (props) => {
  const { currentProduct } = useContext(ProductContext);
  const { currentFeatures } = useContext(FeaturesContext);
  const [currentList, setCurrentList] = useState([]);
  const [featureList, setFeatureList] = useState([]);

  // filters out duplicate features
  const filterDuplicates = (list) => {
    const record = {};
    return list.filter(item => record.hasOwnProperty(item) ? false : (record[item] = true));
  }

  const mergeFeatures = () => {
    const rawListData = currentFeatures.concat(props.entryFeatures);
    setFeatureList(filterDuplicates(rawListData))
  }

  // merge features render with checks/blanks render
  const handleCurrentChecks = () => {
    return featureList.map(item => {
      return currentFeatures.indexOf(item) === -1
      ? <div className="empty"></div>
      : <FaCheck className="check"/>
    })
  }

  const handleRelatedChecks = () => {
    return featureList.map(item => {
      return props.entryFeatures.indexOf(item) === -1
        ? <div className="empty"></div>
        : <FaCheck className="check"/>
    })
  }

  useEffect(() => {
    mergeFeatures();
  }, [props.entryFeatures])


  if (!props.show) {
    return null;
  } else {
    return (
      <div className="comparison-modal">
        <div className="comparison-content">
          <div className="comparison-list">
            <div className="current-features">Current Product
            {
              handleCurrentChecks()
            }
            </div>
            <div className="features">Features
            {
              featureList.map(item => <div className="feature">{item}</div> )
            }
            </div>
            <div className="related-features">Related Entry Name
            {
              handleRelatedChecks()
            }
            </div>
          </div>
        </div>
        <button className="close-modal" onClick={() => {props.close(false)}}>Click here to close</button>
      </div>
    )
  }
}

export default ListComparison;