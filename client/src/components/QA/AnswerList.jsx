import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnswerItem from './AnswerItem.jsx';
import AnswerModal from '../Modal/AnswerModal.jsx';
import './QA.css';

function AnswerList({ question, questionid, product }) {

  const [show, setShow] = useState(false);
  const [answersList, setAnswers] = useState([]);
  const [showMoreAnswers, setShowMoreAnswers] = useState(false);

  const options = {
    headers: {'Authorization': process.env.API_KEY},
  }

  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/qa/questions/${questionid}/answers`, options)
      .then((response) => {
        console.log(response.data.results);
        setAnswers(response.data.results);
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  const answers = answersList.map((answer, index) => {
    return (<AnswerItem key={index} answer={answer} options={options} incrementCount={() => incrementCount(index)}/>);
  });

  function handleClick() {
    console.log('See More Answers');
    setShowMoreAnswers(!showMoreAnswers);
  }

  function incrementCount(index) {
    const newAnswersList = answersList.slice();
    const currentAnswer = { ...newAnswersList[index] };
    newAnswersList[index] = currentAnswer;
    currentAnswer.helpfulness += 1;

    setAnswers(newAnswersList);

    axios({
      method: 'put',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/rfp/qa/answers/${currentAnswer.answer_id}/helpful`,
      headers: { Authorization: process.env.API_KEY },
    })
      .then(() => {
        console.log("+1 to helpfulness!");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="AnswerList">
      <div className="initialA">
        {answers.slice(0,2)}
      </div>
      <div id="hideContainer">
        <div id="hideContent" className={showMoreAnswers ? "showA" : "hideA"}>
          {answers.slice(2)}
        </div>
      </div>
      <AnswerModal
        onClose={() => setShow(false)}
        show={show}
        question={question}
        questionid={questionid}
        product={product}
      />
      <p className="clickable SeeMore" onClick={handleClick}>
        {showMoreAnswers ? "Collapse Answers" : "See More Answers"}
      </p>
      <button className="clickable button" onClick={() => setShow(true)}>Add Answer</button>
    </div>
  );
}

export default AnswerList;
