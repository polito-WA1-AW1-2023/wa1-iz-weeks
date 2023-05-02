import 'bootstrap/dist/css/bootstrap.min.css';
import { Question, Answer } from './QAModels';
import { Container } from 'react-bootstrap';
import NavHeader from './components/NavbarComponents';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import SingleQuestion from './components/QuestionComponents';
import AnswerForm from './components/AnswerForm';
import NotFound from './components/NotFoundComponent';

const fakeQuestion = new Question(1, 'Is JavaScript better than Python?', 'Luigi De Russis', '2023-02-07');
const fakeAnswers = new Array(
  new Answer(1, 'Yes', 'Luca Mannella', '2023-02-15', 1, -10),
  new Answer(2, 'Not in a million year', 'Guido van Rossum', 1, '2023-03-02', 5),
  new Answer(3, 'No', 'Luigi De Russis', '2023-03-02', 1, 10),
  new Answer(4, 'Both have their pros and cons', 'Mario Rossi', 1, '2023-03-04'));

function App() {
  const [question, setQuestion] = useState(fakeQuestion);
  const [answers, setAnswers] = useState(fakeAnswers);

  const voteUp = (answerId) => {
    setAnswers(oldAnswer => {
      return oldAnswer.map((ans) => {
        if(ans.id === answerId) {
          // return the "updated" answer
          return new Answer(ans.id, ans.text, ans.name, ans.date, ans.questionId, ans.score +1);
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
          return new Answer(answer.id, answer.text, answer.name, answer.date, answer.questionId, answer.score);
        }
        else
          return ans;
      });
    });
  }

  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* 
        - / (index) -> all the questions
        - /questions/:questionId -> the page with the :questionId question info and its answers
        - /questions/:questionId/addAnswer -> the form to add a new answer
        - /questions/:questionId/editAnswer/:answerId -> the form to update the :answerId answer
        - * -> not found
        */}
        <Route element={<><NavHeader questionNum={question.id} />
          <Container fluid className="mt-3">
            <Outlet />
          </Container></>} >
          <Route path='/questions/:questionId' 
            element={<SingleQuestion question={question} answers={answers} voteUp={voteUp}/>}/>
          <Route path='/questions/:questionId/addAnswer' 
            element={<AnswerForm addAnswer={addAnswer} lastId={Math.max([...answers.map(ans => ans.id)])} />} />
            <Route path='/questions/:questionId/editAnswer/:answerId' 
            element={<AnswerForm updateAnswer={updateAnswer} />} />
            <Route path='*' element={<NotFound/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
    
  )
}

export default App;
