import 'bootstrap/dist/css/bootstrap.min.css';
import { Question } from './QAModels';
import { Container } from 'react-bootstrap';
import Answers from './components/AnswerComponents';
import NavHeader from './components/NavbarComponents';
import QuestionDescription from './components/QuestionComponents';

const fakeQuestion = new Question(1, 'Is JavaScript better than Python?', 'Luigi De Russis', '2023-02-07');
fakeQuestion.init();

function App() {

  return (
    <>
      <NavHeader questionNum={fakeQuestion.id} />
      <Container fluid className="mt-3">
        <QuestionDescription question={fakeQuestion} />
        <Answers answers={fakeQuestion.getAnswers()}></Answers>
      </Container>
    </>
    
  )
}

export default App;
