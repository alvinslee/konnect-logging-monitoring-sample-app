const users = require('./data.json') || {};

const express = require('express');
const app = express();

const { v4: uuid } = require('uuid');

app.use(express.json());

app.get('/', (req, res, next) => {
  res.send(users);
});

app.get('/:id', (req, res, next) => {
  const user = users[req.params['id']];
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send('User not found.');
  }
});

app.post('/', (req, res, next) => {
  if (!req.body['name'] || !String(req.body['name'].length)) {
    res.status(400).send('Name (name) is required');
  } else {
    const user = {
      id: uuid(),
      name: String(req.body['name'])
    };
    users[user.id] = user;
    res.status(201).send(user);
  }
});

exports.Users = app;
