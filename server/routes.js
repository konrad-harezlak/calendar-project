const express = require("express");
const router = express.Router();
const registrationController = require("./registrationController");
const loginController = require("./loginController");
const settingsController = require("./settingsController");
const authenticateToken = require("./authenticateToken");
const messageController = require("./messagesController");
const usersController = require("./userController");
const meetingController = require("./meetingController");
const { isUserAvailable } = require("./meetingController");
const taskController = require("./taskController");

router.get("/", (req, res) => {
  res.send("Witaj na stronie Y!");
});

router.post("/settings", authenticateToken, settingsController.saveData);

//registartion
router.post("/registration", registrationController.registerUser);
router.get("/registration", (req, res) => {
  console.log("poprawnie zarejestrowano");
});

//login
router.post("/login", loginController.loginUser);
router.get("/login", (req, res) => {
  console.log("odpoweidz poprawne zarejestrowanie");
});

//mesages
router.post("/messages", authenticateToken, messageController.sendMessage);
router.get(
  "/messages/:recipientId",
  authenticateToken,
  messageController.getMessages
);

//users
router.get("/isUserAvailable", usersController.isUserAvaliable);
router.get("/users", usersController.getUsers);

//meetings
router.post("/meetings", meetingController.createMeeting);
router.get("/meetings", meetingController.readMeetings);
router.delete("/meetings/:id", meetingController.deleteParticipantFromMeeting);

//tasks
router.get("/tasks", authenticateToken,taskController.getTasks);
router.post("/tasks", authenticateToken, taskController.addTask);
router.put("/tasks/:itemId",authenticateToken, taskController.changeStatus);

module.exports = router;
