import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Answer } from '../QAModels';
import dayjs from 'dayjs';

function AnswerForm(props) {
  const [id, setId] = useState(props.answer ? props.answer.id : props.lastId + 1);
  const [text, setText] = useState(props.answer ? props.answer.text : '');
  const [name, setName] = useState(props.answer ? props.answer.name : '');
  const [date, setDate] = useState(props.answer ? props.answer.date.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'));
  const [score, setScore] = useState(props.answer ? props.answer.score : 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    // create a new answer
    const answer = new Answer(id, text, name, date, score);
    // TODO: add validations!
    if(props.answer) {
      props.updateAnswer(answer);
    }
    else {
      // add the answer to the "answers" state
      props.addAnswer(answer);
    }
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
      <Button variant="primary" type="submit">Add</Button> <Button variant="danger" onClick={props.cancel}>Cancel</Button>
    </Form>
  );
}

export default AnswerForm;