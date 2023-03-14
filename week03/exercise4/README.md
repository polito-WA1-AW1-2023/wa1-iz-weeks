# Exercise 4: Q&A, with a database

_Goal: interacting with a database while experimenting with async code_.

Update the previous "Q&A" exercise to use a database.

Manage a list of objects that include information about some questions and their answers. The stored information is the same as the previous exercise, with an _additional id_ for both questions and answers, i.e.,:

| `Question` object |
|----------|
| id (int) |
| question text (string) |
| questioner author name (string) |
| posting date (datejs) |

Note that the "list of answers (array)" is no longer needed, since it will be stored in the database.

| `Answer` object |
|--------|
| id (int) |
| answer text (string) |
| respondent author name (string) |
| posting date (datejs) |
| score (positive or negative integer) |

## Database

The information should also be stored in a SQlite database (`questions.sqlite`), desighend with database tables corresponding to the Q&A data:

### `question` table

| Field | Type |
|-------|------|
| id    | integer |
| question | text |
| name | text |
| date | date |

### `answer` table

| Field | Type |
|-------|------|
| id    | integer |
| answer | text |
| name | text |
| date | date |
| score | integer |
| questionId | integer |

### Methods

Each `Question` object will have the following methods, operating directly on the database:

* `addAnswer(answer)` // pass a fully-constructed `Answer` object and store it both in the database
* `getAnswers()` // returns a Promise that resolves to an array with all the `Answer`s to that question, by querying the database
* `getTop(num)` // returns a Promise that resolves to an array with the _num_ best `Answer`s, according to their score

A new `QuestionList` object represents all the `Question`s, and it will have the following methods operating on the database:

* `addQuestion(question)` // pass a fully-constructed `Question` object
* `getQuestion(id)` // returns a Promise that resolves to a `Question` with the given id
* `afterDate(date)` // returns a Promise that resolves to an array with all the `Question`s after the given date

Suggestion: implement the methods in this order: QuestionList.getQuestion, QuestionList.add, Question.getAnswers, Question.add,  Question.getTop, QuestionList.afterDate.
