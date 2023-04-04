import { Row, Col } from 'react-bootstrap';

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

export default QuestionDescription;