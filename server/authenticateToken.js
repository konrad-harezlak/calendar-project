const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  console.log(token);
  if (!token) return res.status(401).send('Brak tokenu. Użytkownik nieuwierzytelniony.');

  jwt.verify(token, 'sekretny_token', (err, user) => {
    if (err) return res.status(403).send('Nieprawidłowy token.');

    req.user = user; // Przekaż dane użytkownika do kontrolera
    next(); // Przejdź do następnej funkcji pośredniej lub kontrolera
  });
}

module.exports = authenticateToken;
