const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'No JWT token provided' });

  if (token) {
    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
      if (err) {
        console.error(err);
      } else {
        req.user = user;
      }
    });
  }
  next();

}
module.exports = verifyToken;
