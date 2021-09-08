const products = require('./data.json') || {};

const express = require('express');
const app = express();

const { v4: uuid } = require('uuid');

app.use(express.json());

app.get('/', (req, res, next) => {
  res.send(products);
});

app.get('/:id', (req, res, next) => {
  const product = products[req.params['id']];
  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send('Product not found.');
  }
});

app.post('/', (req, res, next) => {
  if (!req.body['title'] || !String(req.body['title'].length)) {
    res.status(400).send('Title (title) is required');
  } else {
    const product = {
      id: uuid(),
      title: String(req.body['title'])
    };
    products[product.id] = product;
    res.status(201).send(product);
  }
});

exports.Products = app;
