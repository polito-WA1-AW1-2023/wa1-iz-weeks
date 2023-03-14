'use strict';

const dayjs = require('dayjs');
const sqlite = require('sqlite3');

const db = new sqlite.Database('questions.sqlite', (err) => { 
    if (err) throw err;
});

function QuestionList() {

    this.getQuestion = function getQuestion(id) {
        return new Promise((resolve, reject) => {
            console.log("Preparing for the query");
            const sql = "SELECT * FROM question WHERE id = ?";
            db.get(sql, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve (row);
                }
            });
        });
    }

    this.addQuestion = function addQuestion(question) {
        // console.log("The received question is: ", question);
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO question VALUES (?, ?, ?, ?)";
            db.run(sql, [question.id, question.text, question.author, question.date.toISOString()]);
        });
    }

    this.addAnswer = function addAnswer(answer, questionId) {
        console.log("The received answer is: ", answer);
        console.log("The associated question ID is: ", questionId);
        return new Promise ((resolve, reject) => {
            const sql = "INSERT INTO answer VALUES (?, ?, ?, ?, ?, ?)";
            db.run(sql, [answer.id, answer.text, answer.author, answer.date.toISOString(), answer.score, questionId]);
        });
    }

}

function Answer(id, text, author, score, date) {
    this.id = id;
    this.text = text;
    this.author = author;
    this.score = score;
    this.date = dayjs(date);

    this.toString = () => {
        return `${this.author} replied '${this.text}' on ${this.date.toISOString()} and got a score of ${this.score}`;
    }
}

function Question(id, text, author, date) {
    this.id = id;
    this.text = text;
    this.author = author;
    this.date = dayjs(date);
    
    this.toString = () => {
        return `Question '${this.text}' asked by ${this.author} on ${this.date.toISOString()}.`;
    }
}

async function main() {
    const qList = new QuestionList() ;
    console.log("Question list created!");

    const q1 = await qList.getQuestion(1);
    console.log("The first question is: ", q1);

    // Beware: if you run the program many times, you will have an error (you are trying to re-enter entries with an already assigned ID)

    let questionId = 3;
    let question = new Question(questionId, "How to succesfully pass Web App I?", "Luca Mannella", "2018-05-13T12:00:00Z");
    qList.addQuestion(question);
    const q3 = await qList.getQuestion(questionId);
    console.log("The third question is: ", q3);

    questionId++;
    question = new Question(questionId, "Does JS documentaion say the truth?","Luca Mannella", "2023-03-14");
    qList.addQuestion(question);
    const q4 = await qList.getQuestion(4);
    console.log("The fourth question is: ", q4);

    let answerId = 5;
    const answer = new Answer(answerId, "Yes, the doc was right", "Brendan Eich", 150, "2023-03-14");
    qList.addAnswer(answer, q4.id);
}

main();
debugger;
