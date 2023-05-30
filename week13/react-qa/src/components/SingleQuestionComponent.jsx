import { Row, Col } from 'react-bootstrap';
import Answers from './AnswerComponents';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../API';
import { Answer } from '../QAModels';

function SingleQuestion(props) {
  // get the questionId from the URL to retrieve the right question and its answers
  const params = useParams();
  const question = props.questions[params.questionId-1];
  const [answers, setAnswers] = useState([]);
  
  const getAnswers = async () => {
    const answers = await API.getAnswers(params.questionId);
    setAnswers(answers);
  }

  useEffect(()=> {
    // get all the answers of this question from API
    getAnswers();
  }, []);

  const voteUp = (answerId) => {
    // temporary update
    setAnswers(oldAnswer => {
      return oldAnswer.map((ans) => {
        if(ans.id === answerId) {
          // return the "updated" answer
          const answer = new Answer(ans.id, ans.text, ans.name, ans.date, ans.score +1);
          answer.voted = true;
          return answer;
        }
        else
          return ans;
      });
    });

    API.vote(answerId)
      .then(() => getAnswers())
      .catch(err => console.log(err));
  }
  
  return (
    <>
    {/* The check on "question" is needed to intercept errors due to invalid URLs (e.g., /questions/5 when you have two questions only) */}
    {question ? <>
      <QuestionDescription question={question} />
      <Answers answers={answers} voteUp={voteUp} loggedIn={props.loggedIn}></Answers></> :
      <p className='lead'>The selected question does not exist!</p>
    } 
    </>
  );
}

function QuestionDescription(props) {
  return (
    <>
      <Row>
        <QuestionHeader questionNum={props.question.id} author={props.question.author} />
      </Row>
      <Row>
        <QuestionText text={props.question.text} />
      </Row>
    </>
  );
}

function QuestionHeader(props) {
  return (
    <>
      <Col md={6} as="p">
        <strong>Question #{props.questionNum}:</strong>
      </Col>
      <Col md={6} as="p" className="text-end">
        Asked by <span className="badge rounded-pill text-bg-secondary text-end">{props.author}</span>
      </Col>
    </>
  );
}

function QuestionText(props) {
  return (
    <Col as="p" className="lead">{props.text}</Col>
  );
}

export default SingleQuestion;