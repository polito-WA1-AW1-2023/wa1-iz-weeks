import { Answer, Question } from './QAModels';
const SERVER_URL = 'http://localhost:3001';

const getQuestions = async () => {
  const response = await fetch(SERVER_URL + '/api/questions');
  if(response.ok) {
    const questionsJson = await response.json();
    return questionsJson.map(q => new Question(q.id, q.text, q.author, q.date));
  }
  else
    throw new Error('Internal server error');
}

const getAnswers = async (questionId) => {
  const response = await fetch(SERVER_URL + `/api/questions/${questionId}/answers`);
  const answersJson = await response.json();
  if(response.ok) {
    return answersJson.map(ans => new Answer(ans.id, ans.text, ans.author, ans.date, ans.score));
  }
  else
    throw answersJson;
}

const API = {getQuestions, getAnswers};
export default API;