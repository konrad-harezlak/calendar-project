const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./userModel');

async function loginUser(req, res) {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(401).json({ message: 'Invalid userName or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid userName or password' });
    }

    const secretKey = 'secret_token';
    const token = jwt.sign({ userId: user._id, userName: user.userName }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ message: 'Successfully logged in', user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error occurred' });
  }
}


module.exports = {
  loginUser
};
