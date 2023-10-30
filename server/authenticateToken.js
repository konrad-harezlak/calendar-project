const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Brak tokenu. Użytkownik nieuwierzytelniony.');
  jwt.verify(token, 'sekretny_token', (err, user) => {
    if (err) return res.status(403).send('Nieprawidłowy token.'+err);
    req.user = user; // Przekaż dane użytkownika do kontrolera
    next(); // Przejdź do następnej funkcji pośredniej lub kontrolera
  });
}

module.exports = authenticateToken;
