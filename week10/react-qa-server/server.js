'use strict';

// imports
const express = require('express');
const morgan = require('morgan');
const dao = require('./dao');

// init
const app = express();
const port = 3001;

// set up middlewares
app.use(express.json());
app.use(morgan('dev'));

/* ROUTES*/
// GET /api/questions
app.get('/api/questions', (request, response) => {
  dao.listQuestions()
  .then(questions => response.json(questions))
  .catch(() => response.status(500).end());
});

// GET /api/questions/<id>
app.get('/api/questions/:id', async(req, res) => {
  try {
    const question = await dao.getQuestion(req.params.id);
    res.json(question);
  } catch {
    res.status(500).end();
  }
});

// POST /api/answers/<id>/vote
app.post('/api/answers/:id/vote', async (req, res) => {
  try{
    const num = await dao.voteAnswer(req.params.id, req.body.vote);
    if(num === 1)
      res.status(204).end();
    else
      throw new Error();
  } catch {
    res.status(503).end();
  }
});

// start the server
app.listen(port, () => 'API server started');

