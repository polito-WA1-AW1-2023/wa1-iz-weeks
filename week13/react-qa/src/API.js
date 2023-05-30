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

const vote = async (answerId) => {
  const response = await fetch(`${SERVER_URL}/api/answers/${answerId}/vote`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({vote: 'upvote'}),
    credentials: 'include'
  });

  if(!response.ok) {
    const errMessage = await response.json();
    throw errMessage;
  }
  else return null;
  // TODO: add improved error handling
}

const addAnswer = async (answer, questionId) => {
  const response = await fetch(`${SERVER_URL}/api/questions/${questionId}/answers`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({text: answer.text, author: answer.name, score: 0, date: answer.date.format('YYYY-MM-DD')})
  });

  if(!response.ok) {
    const errMessage = await response.json();
    throw errMessage;
  }
  else return null;
}

const updateAnswer = async (answer) => {
  const response = await fetch(`${SERVER_URL}/api/answers/${answer.id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({text: answer.text, author: answer.name, score: answer.score, date: answer.date.format('YYYY-MM-DD')})
  });

  if(!response.ok) {
    const errMessage = await response.json();
    throw errMessage;
  }
  else return null;
}

const logIn = async (credentials) => {
  const response = await fetch(SERVER_URL + '/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });
  if(response.ok) {
    const user = await response.json();
    return user;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

const getUserInfo = async () => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    credentials: 'include',
  });
  const user = await response.json();
  if (response.ok) {
    return user;
  } else {
    throw user;  // an object with the error coming from the server
  }
};

const logOut = async() => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    method: 'DELETE',
    credentials: 'include'
  });
  if (response.ok)
    return null;
}

const API = {getQuestions, getAnswers, vote, addAnswer, updateAnswer, logIn, logOut, getUserInfo};
export default API;