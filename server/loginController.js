const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./userModel');

async function loginUser(req, res) {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });
    
    if (!user) {
      return res.status(401).json({ message: 'Nieprawidłowy userName lub hasło' });

    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Nieprawidłowy userName lub hasło' });

    }
    const secretKey = 'sekretny_token';
    const token = jwt.sign({ userId: user._id, userName: user.userName }, secretKey, { expiresIn: '1h' });

   
    res.status(200).json({ message: 'Zalogowano pomyślnie', user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Wystąpił błąd serwera' });
  }
}
 
module.exports = {
  loginUser
};
