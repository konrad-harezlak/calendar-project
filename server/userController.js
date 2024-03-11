const User = require("./userModel");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "userName firstName lastName");
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error ocured while fetching users." });
  }
};
exports.isUserAvaliable = async (req, res) => {
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
