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

  useEffect(()=> {
    // get all the questions from API
    const getQuestions = async () => {
      const questions = await API.getQuestions();
      setQuestions(questions);
    }
    getQuestions();
  }, []);

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
              element={<AnswerForm />} />
            <Route path='questions/:questionId/editAnswer/:answerId' 
              element={<AnswerForm />} />
            <Route path='*' element={ <NotFound/> } />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App;
