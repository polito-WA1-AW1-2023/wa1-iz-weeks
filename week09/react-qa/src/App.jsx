import 'bootstrap/dist/css/bootstrap.min.css';
import { Question, Answer } from './QAModels';
import { Container } from 'react-bootstrap';
import Answers from './components/AnswerComponents';
import NavHeader from './components/NavbarComponents';
import QuestionDescription from './components/QuestionComponents';
import { useState } from 'react';

const fakeQuestion = new Question(1, 'Is JavaScript better than Python?', 'Luigi De Russis', '2023-02-07');
const fakeAnswers = new Array(
  new Answer(1, 'Yes', 'Luca Mannella', '2023-02-15', -10),
  new Answer(2, 'Not in a million year', 'Guido van Rossum', '2023-03-02', 5),
  new Answer(3, 'No', 'Luigi De Russis', '2023-03-02', 10),
  new Answer(4, 'Both have their pros and cons', 'Mario Rossi', '2023-03-04'));

function App() {
  const [question, setQuestion] = useState(fakeQuestion);
  const [answers, setAnswers] = useState(fakeAnswers);

  const voteUp = (answerId) => {
    setAnswers(oldAnswer => {
      return oldAnswer.map((ans) => {
        if(ans.id === answerId) {
          // return the "updated" answer
          return new Answer(ans.id, ans.text, ans.name, ans.date, ans.score +1);
        }
        else
          return ans;
      });
    });
  }

  const addAnswer = (answer) => {
    setAnswers((oldAnswers) => [...oldAnswers, answer]);
  }

  const updateAnswer = (answer) => {
    setAnswers(oldAnswer => {
      return oldAnswer.map((ans) => {
        if(ans.id === answer.id) {
          return new Answer(answer.id, answer.text, answer.name, answer.date, answer.score);
        }
        else
          return ans;
      });
    });
  }

  return (
    <>
      <NavHeader questionNum={question.id} />
      <Container fluid className="mt-3">
        <QuestionDescription question={question} />
        <Answers answers={answers} voteUp={voteUp} addAnswer={addAnswer} updateAnswer={updateAnswer}></Answers>
      </Container>
    </>
    
  )
}

export default App;
