const bcrypt = require('bcrypt');
const User = require('./userModel');

async function registerUser(req, res) {
  try {
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: 'Użytkownik o podanej nazwie już istnieje.' });
    }
    
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const { userName, email } = req.body;
    const newUser = new User({ userName, email, password: hashedPassword });
    await newUser.save();
    console.log('Użytkownik został pomyślnie zarejestrowany.');
    res.redirect('/login');
  } catch (error) {
    console.error('Błąd podczas rejestracji użytkownika:', error);
    res.redirect('/registration');
  }
}

module.exports = {
  registerUser
};
