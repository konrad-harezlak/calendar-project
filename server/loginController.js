const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./userModel');

async function loginUser(req, res) {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });
    if (!user) {
      console.log('user')
      return res.status(401).json({ message: 'Nieprawidłowy userName lub hasło' });
      
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log('pass')
      return res.status(401).json({ message: 'Nieprawidłowy userName lub hasło' });
      
    }

    // Użytkownik zalogowany pomyślnie
    res.status(200).json({ message: 'Zalogowano pomyślnie', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Wystąpił błąd serwera' });
  }
}

module.exports = {
  loginUser
};
