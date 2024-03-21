const User = require("./userModel");
const {isUserAvailable} = require('./meetingController')
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "userName firstName lastName");
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error ocured while fetching users." });
  }
};
exports.isUserAvailable = async (req, res) => {
  const { userName, date, startTime, endTime } = req.query;

  try {
    const isAvailable = await isUserAvailable(
      userName,
      date,
      startTime,
      endTime
    );
    res.json({ isAvailable });
  } catch (error) {
    console.error("Błąd podczas sprawdzania dostępności użytkownika:", error);
    res
      .status(500)
      .json({ error: "Błąd podczas sprawdzania dostępności użytkownika." });
  }
};
