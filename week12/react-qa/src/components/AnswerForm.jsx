import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Answer } from '../QAModels';
import dayjs from 'dayjs';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';

function AnswerForm(props) {
  let { questionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const editableAnswer = location.state;

  const [id, setId] = useState(editableAnswer ? editableAnswer.id : props.lastId + 1);
  const [text, setText] = useState(editableAnswer ? editableAnswer.text : '');
  const [name, setName] = useState(editableAnswer ? editableAnswer.name : '');
  const [date, setDate] = useState(editableAnswer ? dayjs(editableAnswer.date).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'));
  const [score, setScore] = useState(editableAnswer ? editableAnswer.score : 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    // create a new answer
    const answer = new Answer(id, text, name, date, questionId, score);
    // TODO: add validations!
    if(editableAnswer) {
      props.updateAnswer(answer);
      // navigate('../..', {relative: 'path'});
    }
    else {
      // add the answer to the "answers" state
      props.addAnswer(answer);
      // navigate('..', {relative: 'path'});
    }
    // instead of the two "navigate" above, you can use:
    navigate(`/questions/${questionId}`);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label>Text</Form.Label>
        <Form.Control type="text" minLength={2} required={true} value={text} onChange={(event) => setText(event.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" required={true} value={name} onChange={(event) => setName(event.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" value={date} onChange={(event) => setDate(event.target.value)}></Form.Control>
      </Form.Group>
      {editableAnswer ? 
        <><Button variant="primary" type="submit">Update</Button> <Link to='../..' relative='path' className='btn btn-danger'>Cancel</Link></> :
        <><Button variant="primary" type="submit">Add</Button> <Link to='..' relative='path' className='btn btn-danger'>Cancel</Link></>
      }
    </Form>
  );
}

export default AnswerForm;