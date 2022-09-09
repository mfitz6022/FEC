import React, { useState } from 'react';
import './QA.css';
import PhotoItem from './PhotoItem.jsx';
import axios from 'axios';

function AnswerItem({ answer, incrementCount }) {

  const [report, setReport] = useState(false);
  const [helpful, setHelpful] = useState(false);

  function handleHelpful() {
    if (helpful === false) {
      incrementCount();
    }
    setHelpful(true);
  }

  function handleReport() {
    axios({
      method: 'put',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/rfp/qa/answers/${answer.answer_id}/report`,
      headers: { Authorization: process.env.API_KEY },
    })
      .then(() => {
        console.log('Reported');
      })
      .catch((err) => {
        console.log(err);
      });
    setReport(!report);
  }

  const allPhotos = answer.photos.map((photo, index) => {
    return (<PhotoItem key={index} photo={photo} />);
  });

  return (
    <div className="AnswerItem">
      <h4>A: {answer.body} </h4>
      <div className="ansPhotos">
        {allPhotos}
      </div>
      <div className="answerInfo">
        <div className="postInfo">
          <p>By: {answer.answerer_name} on {answer.date}</p>
        </div>
        <div id={helpful ? 'helpTrue' : 'helpFalse'} className="clickable helpful" onClick={handleHelpful}>
          <p>Helpful?</p>
          <p>Yes ({answer.helpfulness})</p>
        </div>
        <div className="clickable report" onClick={handleReport}>
          <p>{report ? 'Reported' : 'Report'}</p>
        </div>
      </div>
    </div>
  );
}

export default AnswerItem;
