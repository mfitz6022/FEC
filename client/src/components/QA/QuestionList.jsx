import React, { useState, useEffect } from 'react';
import axios from 'axios';
// eslint-disable-next-line import/extensions
import QuestionItem from './QuestionItem.jsx';
import QuestionModal from '../Modal/QuestionModal.jsx';
import './QA.css';

function QuestionList({ product, interactions }) {
  console.log(product);

  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);
  const [questionsList, setQuestions] = useState([]);
  const [seeMoreQuestions, setSeeMoreQuestions] = useState(false);

  const filteredQs = [];

  useEffect(() => {
    async function fetchData() {
      const request = await axios({
        method: 'get',
        url: 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/qa/questions/',
        headers: { Authorization: process.env.API_KEY },
        params: {
          product_id: product.id,
          count: 50,
        },
      });
      console.log(request.data.results);
      setQuestions(request.data.results);
      return;
    }
    if (product) {
      fetchData();
    }
  }, [product]);

  function handleClick() {
    console.log('Clicked');
    setSeeMoreQuestions(true);
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  questionsList.forEach((question) => {
    if (question.question_body.toLowerCase().includes(search.toLowerCase())) {
      filteredQs.push(question);
    }
  });

  const questions = filteredQs.map((question, index) => (<QuestionItem key={index} question={question} product={product} />));

  return (
    <div onClick={(e) => interactions(e, 'Q&A')}>
      <div id="QAContainer">
        <div></div>
        <div className="QA">
          <h1 className="QAhead">Questions & Answers</h1>
          <div className="searchbar">
            <input
              className="searchChild"
              type="text"
              placeholder="Have a question? Search for answers..."
              value={search}
              onChange={handleSearch}
            />
            <button className="clickable button" onClick={() => setShow(true)}>Ask a Question</button>
          </div>
          <div className="QuestionList">
            <div id="QAList">
              <QuestionModal onClose={() => setShow(false)} show={show} product={product} />
              <div id="initialQ">
                {questions.slice(0, 4)}
              </div>
              <div id="hideQContainer">
                <div id="hideQContent" className={seeMoreQuestions ? 'showQ' : 'hideQ'}>
                  {questions.slice(4, 8)}
                </div>
              </div>
              <p className="clickable SeeMore" onClick={handleClick}>See More Questions</p>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default QuestionList;
