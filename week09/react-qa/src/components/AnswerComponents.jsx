import 'bootstrap-icons/font/bootstrap-icons.css';
import { Row, Col, Table, Button } from 'react-bootstrap';
import AnswerForm from './AnswerForm';
import { useState } from 'react';

function Answers(props) {
  return (
    <>
      <Row>
        <Col as="h2">Answers ({props.answers.length}):</Col>
      </Row>
      <Row>
        <Col lg={10} className="mx-auto">
          <AnswerTable answers={props.answers} voteUp={props.voteUp} addAnswer={props.addAnswer} updateAnswer={props.updateAnswer}></AnswerTable>
        </Col> 
      </Row>
    </>
  );
}

function AnswerTable(props) {
  const [showForm, setShowForm] = useState(false);
  const [sortOrder, setSortOrder] = useState('none');
  const [editableAnswer, setEditableAnswer] = useState();

  const sortedAnswers = [...props.answers];
  if (sortOrder === 'asc')
    sortedAnswers.sort((a,b) => a.score - b.score);
  else if (sortOrder === 'desc')
    sortedAnswers.sort((a,b) => b.score - a.score);

  const sortByScore = () => {
    setSortOrder((oldOrder) => oldOrder === 'asc' ? 'desc' : 'asc');
  }

  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>Date</th>
            <th>Text</th>
            <th>Author</th>
            <th>Score <Button variant="link" onClick={sortByScore} style={{color: 'black'}}><i className={sortOrder === 'asc' ? 'bi bi-sort-numeric-up' : 'bi bi-sort-numeric-down'}></i></Button></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            sortedAnswers.map((ans) => <AnswerRow answer={ans} key={ans.id} voteUp={props.voteUp} setShowForm={setShowForm} setEditableAnswer={setEditableAnswer}/>)
          }
        </tbody>
      </Table>

      { /* Assumption: the last id will be in the last item in the array */}
      { showForm ? 
          <AnswerForm 
            key={editableAnswer ? editableAnswer.id : -1} 
            lastId={props.answers.slice(-1)[0].id} 
            answer={editableAnswer} 
            addAnswer={(answer) => {props.addAnswer(answer); setShowForm(false);}} 
            cancel={() => setShowForm(false)} 
            updateAnswer={(answer) => {props.updateAnswer(answer); setShowForm(false);}}
          /> 
        : 
          <Button variant="success" onClick={() => { setShowForm(true); setEditableAnswer(); }}>Add</Button>}
    </>
  );
}

function AnswerRow(props) {
  return(
    <tr><AnswerData answer={props.answer}/><AnswerActions voteUp={props.voteUp} answer={props.answer} setShowForm={props.setShowForm} setEditableAnswer={props.setEditableAnswer}/></tr>
  );
}

function AnswerData(props) {
  return(
    <>
      <td>{props.answer.date.format('YYYY-MM-DD')}</td>
      <td>{props.answer.text}</td>
      <td>{props.answer.name}</td>
      <td>{props.answer.score}</td>
    </>
  );
}

function AnswerActions(props) {
  return <td>
    <Button variant='primary' onClick={() => {props.setShowForm(true); props.setEditableAnswer(props.answer);}}><i className='bi bi-pencil-square'></i></Button> <Button variant='success' onClick={() => props.voteUp(props.answer.id)}><i className='bi bi-arrow-up'></i></Button>
    </td>
}

export default Answers;