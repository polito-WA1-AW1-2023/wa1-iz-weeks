import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Alert } from 'react-bootstrap';
import SingleQuestion from './components/SingleQuestionComponent';
import NavHeader from './components/NavbarComponents';
import NotFound from './components/NotFoundComponent';
import AnswerForm from './components/AnswerForm';
import QuestionList from './components/QuestionListComponent';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import API from './API';
import { LoginForm } from './components/AuthComponents';

function App() {
  const [questions, setQuestions] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(()=> {
    // get all the questions from API
    const getQuestions = async () => {
      const questions = await API.getQuestions();
      setQuestions(questions);
    }
    getQuestions();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      await API.getUserInfo(); // we have the user info here
      setLoggedIn(true);
    };
    checkAuth();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setMessage({msg: `Welcome, ${user.name}!`, type: 'success'});
    }catch(err) {
      setMessage({msg: err, type: 'danger'});
    }
  };

  const handleLogout = async () => {
    await API.logOut();
    setLoggedIn(false);
    // clean up everything
    setMessage('');
  };


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
              <NavHeader questions={questions} loggedIn={loggedIn} handleLogout={handleLogout}/>
              <Container fluid className="mt-3">
                {message && <Row>
                  <Alert variant={message.type} onClose={() => setMessage('')} dismissible>{message.msg}</Alert>
                </Row> }
                <Outlet/>
              </Container>
            </>} >
            <Route index 
              element={ <QuestionList questions={questions}/> } />
            <Route path='questions/:questionId' 
              element={<SingleQuestion questions={questions} loggedIn={loggedIn}/> } />
            <Route path='questions/:questionId/addAnswer' 
              element={<AnswerForm />} />
            <Route path='questions/:questionId/editAnswer/:answerId' 
              element={<AnswerForm />} />
            <Route path='*' element={ <NotFound/> } />
            <Route path='/login' element={
              loggedIn ? <Navigate replace to='/' /> : <LoginForm login={handleLogin} />
            } />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App;
