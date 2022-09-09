import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import AnswerItem from './AnswerItem.jsx';
import AnswerList from './AnswerList.jsx';
import QuestionList from './QuestionList.jsx';
import AnswerModal from '../Modal/AnswerModal.jsx';
import QuestionItem from './QuestionItem.jsx';

/**
 *  @jest-environment jsdom
 */
const question = {
  "question_id": 643044,
  "question_body": "How many times can I buy this?",
  "question_date": "2022-09-03T00:00:00.000Z",
  "asker_name": "I'M HERE!!!!!!!!!!!!!",
  "question_helpfulness": 2,
  "reported": false,
  "answers": {
    "5987958": {
      "id": 5987958,
      "body": "photo",
      "date": "2022-09-03T00:00:00.000Z",
      "answerer_name": "I'M HERE!!!!!!!!!!!!!",
      "helpfulness": 1,
      "photos": [
        "http://res.cloudinary.com/dyzzx6rsu/image/upload/v1662230774/bvjwowaemc5f8hfawsye.jpg"
      ]
    },
    "5987961": {
      "id": 5987961,
      "body": "1 pickk at a time",
      "date": "2022-09-03T00:00:00.000Z",
      "answerer_name": "I'M HERE!!!!!!!!!!!!!",
      "helpfulness": 0,
      "photos": [
        "http://res.cloudinary.com/dyzzx6rsu/image/upload/v1662231127/wfely4qxbchcpazogkil.webp",
        "http://res.cloudinary.com/dyzzx6rsu/image/upload/v1662231133/rhb6sn3nmbr96ijhxrsa.jpg"
      ]
    },
    "5987963": {
      "id": 5987963,
      "body": "a",
      "date": "2022-09-03T00:00:00.000Z",
      "answerer_name": "d",
      "helpfulness": 0,
      "photos": [
        "http://res.cloudinary.com/dyzzx6rsu/image/upload/v1662231677/dhnm2fuzromgvsjo2fjg.jpg",
        "http://res.cloudinary.com/dyzzx6rsu/image/upload/v1662231697/o7y0t0pzamai8trvp5ks.webp",
        "http://res.cloudinary.com/dyzzx6rsu/image/upload/v1662231711/u3avnpfxmlbxnaapj8qw.webp",
        "http://res.cloudinary.com/dyzzx6rsu/image/upload/v1662231685/zbcvi8kwgyxwtjvvtxkw.webp",
        "http://res.cloudinary.com/dyzzx6rsu/image/upload/v1662231672/agu9zkjhht4hti0v6tc4.jpg"
      ]
    },
    "5987990": {
      "id": 5987990,
      "body": "Not random pictures",
      "date": "2022-09-04T00:00:00.000Z",
      "answerer_name": "Definitely not TJ",
      "helpfulness": 0,
      "photos": [
        "http://res.cloudinary.com/dyzzx6rsu/image/upload/v1662251308/pbwmcphdpfbdcvt1gghx.jpg",
        "http://res.cloudinary.com/dyzzx6rsu/image/upload/v1662251319/jyabqagy5l544snepeyk.jpg",
        "http://res.cloudinary.com/dyzzx6rsu/image/upload/v1662251303/z5rtw3p3ysmifs1jxict.jpg",
        "http://res.cloudinary.com/dyzzx6rsu/image/upload/v1662251311/a871lq0vnmaowuhwp2xe.jpg"
      ]
    }
  }
};

const product = {
  "id": 1,
  "name": "Camo Onesie",
  "slogan": "Blend in to your crowd",
  "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
  "category": "Jackets",
  "default_price": "140"
};

const answer = {
  id: 68,
  body: 'We are selling it here without any markup from the middleman!',
  date: '2018-08-18T00:00:00.000Z',
  answerer_name: 'Seller',
  helpfulness: 4,
  photos: [],
};

test('should render AnswerItem', () => {
  const { getByText } = render(<AnswerItem answer={answer}/>);
  expect(getByText('Helpful?')).toBeInTheDocument();
});

test('should show QuestionModal on button click', async () => {
  const user = userEvent.setup();
  render(<QuestionList product={product} />);

  await user.click(screen.getByRole('button'));
  expect(screen.getByText(/Ask Your Question/)).toBeInTheDocument();
});

test('should show AnswerModal on button click', async () => {
  const user = userEvent.setup();
  render(<AnswerList question={question} questionid={question.question_id} product={product}/>);

  await user.click(screen.getByRole('button'));
  expect(screen.getByText(/Submit Your Answer/)).toBeInTheDocument();
});
