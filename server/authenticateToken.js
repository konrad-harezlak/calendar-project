module.exports = authenticateToken;

const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) return res.status(401).send('No JWT token provided. User not authenticated.');
  jwt.verify(token,process.env.JWT_TOKEN, (err, user) => {
    if (err) return res.status(403).send('Invalid token.' + err);
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
