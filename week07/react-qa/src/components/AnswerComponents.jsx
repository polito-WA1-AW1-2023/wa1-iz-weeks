import 'bootstrap-icons/font/bootstrap-icons.css';
import { Row, Col, Table, Button } from 'react-bootstrap';
import FormAnswer from './FormAnswer';

function Answers(props) {
  return (
    <>
      <Row>
        <Col as="h2">Answers ({props.answers.length}):</Col>
      </Row>
      <Row>
        <Col lg={10} className="mx-auto">
          <AnswerTable answers={props.answers} voteUp={props.voteUp}></AnswerTable>
          <FormAnswer />
        </Col> 
      </Row>
    </>
  );
}

function AnswerTable(props) {
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Date</th>
          <th>Text</th>
          <th>Author</th>
          <th>Score</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          props.answers.map((ans) => <AnswerRow answer={ans} key={ans.id} voteUp={props.voteUp}/>)
        }
      </tbody>
    </Table>
  );
}

function AnswerRow(props) {
  return(
    <tr><AnswerData answer={props.answer}/><AnswerActions voteUp={props.voteUp} answerId={props.answer.id}/></tr>
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
    <Button variant='success' onClick={() => props.voteUp(props.answerId)}><i className='bi bi-plus'></i></Button>
    </td>
}

export default Answers;