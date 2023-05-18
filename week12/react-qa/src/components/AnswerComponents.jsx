import 'bootstrap-icons/font/bootstrap-icons.css';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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
  const [sortOrder, setSortOrder] = useState('none');

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
            sortedAnswers.map((ans) => <AnswerRow answer={ans} key={ans.id} voteUp={props.voteUp}/>)
          }
        </tbody>
      </Table>

      <Link to='addAnswer' className='btn btn-success' role='button'>Add</Link>
    </>
  );
}

function AnswerRow(props) {
  return(
    <tr><AnswerData answer={props.answer}/><AnswerActions voteUp={props.voteUp} answer={props.answer}/></tr>
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
    <Link to={`editAnswer/${props.answer.id}`} className='btn btn-primary' state={props.answer.serialize()}><i className='bi bi-pencil-square'></i></Link> <Button variant='success' onClick={() => props.voteUp(props.answer.id)}><i className='bi bi-arrow-up'></i></Button>
    </td>
}

export default Answers;