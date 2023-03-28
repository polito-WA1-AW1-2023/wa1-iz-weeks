'use strict';

function Answer(id, text, name, date, score=0) {
  this.id = id;
  this.text = text;
  this.name = name;
  this.score = score;
  this.date = dayjs(date);

  this.toString = () => {
    return `${this.name} replied '${this.text}' on ${this.date.format('YYYY-MM-DD')} and got a score of ${this.score}`;
  }
}

function Question(id, text, author, date) {
  this.id = id;
  this.text = text;
  this.author = author;
  this.date = dayjs(date);
  this.answers = [];

  this.toString = () => {
    return `Question '${this.text}' asked by ${this.author} on ${this.date}.
    It received ${this.answers.length} answers so far: ${this.answers}`;
  }

  this.addAnswer = (answer) => {
    this.answers.push(answer);
  }

  this.getAnswers = () => {
    return [...this.answers];
  }

  this.init = () => {
    this.answers.push(
      new Answer(1, 'Yes', 'Luca Mannella', '2023-02-15', -10),
      new Answer(2, 'Not in a million year', 'Guido van Rossum', '2023-03-02', 5),
      new Answer(3, 'No', 'Luigi De Russis', '2023-03-02', 10),
      new Answer(4, 'Both have their pros and cons', 'Mario Rossi', '2023-03-04')
    );
  }
}

// STRING LITERAL WAY
function createAnswerRowLiteral(answer) {
  return `<tr>
    <td>${answer.date.format("YYYY-MM-DD")}</td>
    <td>${answer.text}</td>
    <td>${answer.name}</td>
    <td>${answer.score}</td>
    <td><button class="btn btn-info">VOTE</button></td>
  </tr>`
}

// CLASSIC WAY: creating the single element
function createAnswerRow(answer) {
  const tr = document.createElement('tr');

  const tdDate = document.createElement('td');
  tdDate.innerText = answer.date.format('YYYY-MM-DD');
  tr.appendChild(tdDate);

  const tdText = document.createElement('td');
  tdText.innerText = answer.text;
  tr.appendChild(tdText);

  const tdName = document.createElement('td');
  tdName.innerText = answer.name;
  tr.appendChild(tdName);

  const tdScore = document.createElement('td');
  tdScore.innerText = answer.score;
  tr.appendChild(tdScore);

  const tdAction = document.createElement('td');
  tdAction.innerHTML = `<button id="answer-vote-${answer.id}" class="btn btn-info">VOTE</button>`;
  tr.appendChild(tdAction);
  
  tdAction.addEventListener('click', e => {
    console.log(e);
    tdScore.innerText = Number(tdScore.innerText) + 1;
    console.log(e.target.id);
  })
  
  return tr;
}

function fillAnswersTable(answers) {
  const answerTable = document.getElementById('answers-table');
  // const answersTable = document.querySelector('#answers-table');  // <-- alternative approach
  for(const answer of answers) {
    // Using "Classic Way"
    const ansEl = createAnswerRow(answer);  // creating a row
    answerTable.prepend(ansEl);             // prepending the row inside the table
    // Using "String Literal Way"
    // const ansEl = createAnswerRowLiteral(answer);
    // answerTable.insertAdjacentHTML('afterbegin', ansEl);
  }
}

function main () {
  const question = new Question(1, 'Is Javascript better than Python?', 'Luigi De Russis', '2023-02-07');
  question.init();
  const answers = question.getAnswers();
  fillAnswersTable(answers);
}

main();
