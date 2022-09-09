import React from 'react';
import AnswerList from './AnswerList.jsx';

function QuestionItem({ question, product }) {
  return (
    <div className="QuestionItem">
      <h3>Q: {question.question_body}</h3>
      <AnswerList question={question} questionid={question.question_id} product={product}/>
    </div>
  );
}

export default QuestionItem;
