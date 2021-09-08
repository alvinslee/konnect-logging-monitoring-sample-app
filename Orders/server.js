const orders = require('./data.json') || {};
const PORT = process.env.PORT || 8080;

const express = require('express');
const app = express();

const { v4: uuid } = require('uuid');

app.use(express.json());

app.get('/', (req, res, next) => {
  res.send(orders);
});

app.get('/:id', (req, res, next) => {
  const order = orders[req.params['id']];
  if (order) {
    res.status(200).send(order);
  } else {
    res.status(404).send('Order not found.');
  }
});

app.post('/', (req, res, next) => {
  if (!req.body['userId'] || !String(req.body['userId'].length)) {
    res.status(400).send('User ID (userId) is required');
  } else if (!req.body['productId'] || !String(req.body['productId'].length)) {
    res.status(400).send('Product ID (productId) is required');
  } else {
    const order = {
      id: uuid(),
      userId: String(req.body['userId']),
      productId: String(req.body['productId'])
    };
    orders[order.id] = order;
    res.status(201).send(order);
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
