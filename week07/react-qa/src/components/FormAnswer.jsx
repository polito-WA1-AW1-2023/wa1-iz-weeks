import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function FormAnswer() {
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = () => {
    // do something
  }

  return (
    <Form>
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
      <Button variant="primary" type="submit">Add</Button> <Button variant="danger">Cancel</Button>
    </Form>
  );
}

export default FormAnswer;