'use strict';

import dayjs from 'dayjs';

function Answer(id, text, name, date, score=0) {
  this.id = id;
  this.text = text;
  this.name = name;
  this.score = score;
  this.date = dayjs(date);

  /* Method to enable the proper serialization to string of the dayjs object. 
  Needed for the useLocation hook of react router when passing the answer to the edit form (AnswerComponent and AnswerForm). */
  this.serialize = () => {
    return {id: this.id, text: this.text, name: this.name, date: this.date.format('YYYY-MM-DD'), questionId: this.questionId, score: this.score};
  }
}

function Question(id, text, author, date) {
  this.id = id;
  this.text = text;
  this.author = author;
  this.date = dayjs(date);
  this.answers = [];

  this.addAnswer = (answer) => {
    this.answers.push(answer);
  }

  this.getAnswers = () => {
    return [...this.answers];
  }

  this.init = () => {
    this.answers.push(
      new Answer(1, 'Yes', 'Luca Mannella', '2023-02-15', -10),
      new Answer(2, 'Not in a million year', 'Guido van Rossum', '2023-03-02', 5),
      new Answer(3, 'No', 'Luigi De Russis', '2023-03-02', 10),
      new Answer(4, 'Both have their pros and cons', 'Mario Rossi', '2023-03-04')
    );
  }
}

export { Question, Answer };