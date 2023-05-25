# `react-qa-server`

The `react-qa-server` is the server-side app companion of HeapOverrun (i.e., `react-qa`). It presents some APIs to perform some CRUD operations on questions and their answers.

## APIs
Hereafter, we report the designed HTTP APIs, also implemented in the project.

### __List all questions__

URL: `/api/questions`

HTTP Method: GET.

Description: Get all the available questions.

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body:
```
[
  {
    "id": 1,
    "text": "Is JavaScript better than Python?",
    "author": "Luigi De Russis",
    "date": "2023-02-07"
  },
  ...
]
```

### __Get a single question__

URL: `/api/questions/<id>`

HTTP Method: GET.

Description: Get the question represented by the `<id>`.

Response: `200 OK` (success), `404 Not Found` (wrong id), or `500 Internal Server Error` (generic error).

Response body:
```
{
  "id": 1,
  "text": "Is JavaScript better than Python?",
  "author": "Luigi De Russis",
  "date": "2023-02-07"
}
```

### __List all the answers of a given question__

URL: `/api/questions/<id>/answers`

HTTP Method: GET.

Description: Get all the available answers for the question identified by `<id>`.

Response: `200 OK` (success), `404 Not Found` (wrong id), or `500 Internal Server Error` (generic error).

Response body: A JSON array of objects, each describing an answer.
```
[
  {
    "id": 1,
    "text": "Yes",
    "author": "Luca Mannella",
    "score": -10,
    "date": "2023-02-15"
  },
  ...
]
```

### __Create a new answer for a given question__

URL: `/api/questions/<id>/answers`

HTTP Method: POST.

Description: Create a new answer for the question identified by `<id>`.

Request body: A JSON object representing a new answer.
```
{
  "text": "The Italian course has around 230 first-time students",
  "author": "Enrico Masala",
  "score": 0,
  "date": "2023-05-09"
}
```

Response: `201 Created` (success) or `503 Service Unavailable` (generic error). If the request body is not valid, `422 Unprocessable Entity` (validation error).

Response body: _None_

### __Update an existing answer__

URL: `/api/answers/<id>`

HTTP Method: PUT.

Description: Update an identified by `<id>`.

Request body: A JSON object representing the answer.
```
{
  "text": "The Italian course has around 231 first-time students",
  "author": "Enrico Masala",
  "score": 0,
  "date": "2023-05-09"
}
```

Response: `200 OK` (success), `404 Not Found` (wrong id), or `503 Service Unavailable` (generic error). If the request body is not valid, `422 Unprocessable Entity` (validation error).

Response body: _None_

### __Vote for an answer__

URL: `/api/answers/<id>/vote`

HTTP Method: POST.

Description: Upvote (+1) or downvote (-1) an existing answer (identified by its `<id>`).

Request body: A JSON object representing the action.
```
{
  "vote": "upvote"
}
```

Response: `204 No content` (success) or `503 Service Unavailable` (generic error). If the request body is not valid, `422 Unprocessable Entity` (validation error).

Response body: _None_