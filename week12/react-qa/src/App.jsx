import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Question, Answer } from './QAModels';
import SingleQuestion from './components/SingleQuestionComponent';
import NavHeader from './components/NavbarComponents';
import NotFound from './components/NotFoundComponent';
import AnswerForm from './components/AnswerForm';
import QuestionList from './components/QuestionListComponent';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import API from './API';

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(()=> {
    // get all the questions from API
    const getQuestions = async () => {
      const questions = await API.getQuestions();
      setQuestions(questions);
    }
    getQuestions();
  }, []);

  const addAnswer = (answer) => {
    setAnswers((oldAnswers) => [...oldAnswers, answer]);
  }

  const updateAnswer = (answer) => {
    setAnswers(oldAnswer => {
      return oldAnswer.map((ans) => {
        if(ans.id === answer.id) {
          return new Answer(answer.id, answer.text, answer.name, answer.date, ans.questionId, answer.score);
        }
        else
          return ans;
      });
    });
  }

  return (
    <BrowserRouter>
        <Routes>
          {/* 
          - / (index) -> all the questions
          - /questions/:questionId -> the page with the :questionId question info and its answers
          - /questions/:questionId/addAnswer -> the form to add a new answer
          - /questions/:questionId/editAnswer/:answerId -> the form to update the :answerId answer
          - * -> not found
          */}
          <Route element={
            <>
              <NavHeader questions={questions}/>
              <Container fluid className="mt-3">
                <Outlet/>
              </Container>
            </>} >
            <Route index 
              element={ <QuestionList questions={questions}/> } />
            <Route path='questions/:questionId' 
              element={<SingleQuestion questions={questions}/> } />
            <Route path='questions/:questionId/addAnswer' 
              element={<AnswerForm addAnswer={addAnswer} lastId={Math.max(...answers.map(ans => ans.id))}/>} />
            <Route path='questions/:questionId/editAnswer/:answerId' 
              element={<AnswerForm updateAnswer={updateAnswer} />} />
            <Route path='*' element={ <NotFound/> } />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App;
