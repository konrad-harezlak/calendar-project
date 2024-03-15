const Task = require("./taskModel");

exports.getTasks = async (req, res) => {
  const userId = req.user.userId;
  try {
    const tasks = await Task.find({ user: userId });
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error ocured while fetching tasks");
    res.status(500).json({ error: "Error ocured while fetching tasks" });
  }
};
exports.addTask = async (req, res) => {
  const { id, title, description } = req.body;
  const user = req.user.userId;

  try {
    const newTask = new Task({
      user,
      id,
      title,
      description,
      isCompleted: false,
    });
    await newTask.save();
    res
      .status(200)
      .json({ message: "Task Added successfully", task: newTask });
  } catch (err) {
    console.error("Error ocured while adding task: ", err);
    res.status(500).json({ error: "Error ocured while adding task" });
  }
};

exports.changeStatus = async (req, res) => {
  const userId = req.user.userId;
  const { status } = req.body;
  const itemId = req.params.itemId;
  try {
    const task = await Task.findOne({ id: itemId, user: userId });
    task.status = status;
    await task.save();
    res.status(200).json({ message: "Task status updated successfully", task });
  } catch (err) {
    console.error("Error ocured while changing task status: ", err);
  }
};
