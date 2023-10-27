const User = require('./userModel'); 

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'userName firstName lastName');
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wystąpił błąd podczas pobierania użytkowników.' });
  }
};
