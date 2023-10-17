const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Brak tokena JWT' });

  if (token) {
    jwt.verify(token, 'secret-key', (err, user) => {
      if (err) {
        // W przypadku nieprawidłowego tokenu zignoruj błąd i kontynuuj przetwarzanie
        console.error(err);
      } else {
        // Jeśli token jest prawidłowy, przekaż użytkownika do następnego middleware
        req.user = user;
      }
    });
  }
  next();
}
module.exports = verifyToken;
