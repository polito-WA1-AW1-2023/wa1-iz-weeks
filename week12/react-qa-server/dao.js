/* Data Access Object (DAO) module for accessing Q&A */
/* Initial version taken from exercise 4 (week 03) */
const sqlite = require('sqlite3');
const {Question, Answer} = require('./QAModels');

// open the database
const db = new sqlite.Database('questions.sqlite', (err) => {
  if (err) throw err;
});

/** QUESTIONS **/
// get all the questions
exports.listQuestions = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM question';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      }
      const questions = rows.map((q) => new Question(q.id, q.text, q.author, q.date));
      resolve(questions);
    });
  });
}

// get a question given its id
exports.getQuestion = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM question WHERE id = ?';
    db.get(sql, [id], (err, row) => {
      if (err)
        reject(err);
      if (row == undefined)
        resolve({error: 'Question not found.'}); 
      else {
        const question = new Question(row.id, row.text, row.author, row.date);
        resolve(question);
      }
    });
  });
};

// add a new question
exports.addQuestion = (question) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO question(text, author, date) VALUES (?, ?, DATE(?))';
    db.run(sql, [question.text, question.author, question.date], function(err) {
      if(err) reject(err);
      else resolve(this.lastID);
    });
  });
};

/** ANSWERS **/

// get all the answer of a given question
exports.listAnswersOf = (questionId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM answer WHERE questionId = ?';
    db.all(sql, [questionId], (err, rows) => {
      if (err) {
        reject(err);
      }
      const answers = rows.map((a) => new Answer(a.id, a.text, a.author, a.date, a.score));
      resolve(answers);
    });
  });
};

// add a new answer
exports.addAnswer = (answer, questionId) => {
  return new Promise ((resolve, reject) => {
    const sql = 'INSERT INTO answer(text, author, date, score, questionId) VALUES (?, ?, DATE(?), ?, ?)';
    db.run(sql, [answer.text, answer.author, answer.date, answer.score, questionId], function(err) {
      if(err) reject(err);
      else resolve(this.lastID);
    });
  });
};

// update an existing answer
exports.updateAnswer = (answer, answerId) => {
  return new Promise ((resolve, reject) => {
    const sql = 'UPDATE answer SET text=?, author=?, date=DATE(?), score=? WHERE id=?';
    db.run(sql, [answer.text, answer.author, answer.date, answer.score, answerId], function(err) {
      if(err) {
        console.log(err);
        reject(err);
      }
      else resolve(this.lastID);
    });
  });
};

// vote for an answer
exports.voteAnswer = (answerId, vote) => {
  return new Promise ((resolve, reject) => {
    const delta = vote === 'upvote' ? 1: -1;
    const sql = 'UPDATE answer SET score = score + ? WHERE id = ?';
    db.run(sql, [delta, answerId], function(err) {
      if(err) reject(err);
      resolve(this.changes);
    });
  });
}