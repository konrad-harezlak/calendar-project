const bcrypt = require('bcrypt');
const User = require('./userModel');

async function registerUser(req, res) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const { userName, email } = req.body;
  const newUser = new User({ userName, email, password: hashedPassword });

  try {
    const existingUser = await User.findOne({ $or: [{ userName }, { email }] });

    if (existingUser) {
      if (existingUser.userName === userName) {
        return res.status(400).json({ message: 'User with this username already exists.' });
      }

      if (existingUser.email === email) {
        return res.status(400).json({ message: 'User with this email already exists.' });
      }
    }

    await newUser.save();
    console.log('User has been successfully registered.');

    res.redirect('/');
  } catch (error) {
    console.error('Error during user registration:', error);
    res.redirect('/registration');
  }
  return res.status(200);
}

module.exports = {
  registerUser
};
