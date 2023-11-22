const express = require('express');
const router = express.Router();
const registrationController = require('./registrationController');
const loginController = require('./loginController');
const settingsController = require('./settingsController');
const authenticateToken = require('./authenticateToken');
const messageController = require('./messagesController');
const usersController = require('./userController');
const meetingController = require('./meetingController');
const { isUserAvailable } = require('./meetingController')

router.post('/registration', registrationController.registerUser);
router.get('/registration', (req, res) => {
    console.log("poprawnie zarejestrowano")
})

router.post('/login', loginController.loginUser);
router.get('/login', (req, res) => {
    console.log("odpoweidz poprawne zarejestrowanie")
});

router.get('/', (req, res) => {
    res.send('Witaj na stronie Y!');
});
router.post('/settings', authenticateToken, settingsController.saveData);

router.post('/messages', authenticateToken, messageController.sendMessage);
router.get('/messages/:recipientId', authenticateToken, messageController.getMessages);

router.get('/users', usersController.getUsers)

router.post('/meetings', meetingController.createMeeting);
router.get('/meetings', meetingController.readMeetings);
router.delete('/meetings/:id',meetingController.deleteParticipantFromMeeting);
router.get('/isUserAvailable', async (req, res) => {
    const { userName, date, startTime, endTime } = req.query;

    try {
        const isAvailable = await isUserAvailable(userName, date, startTime, endTime);
        res.json({ isAvailable });
    } catch (error) {
        console.error('Błąd podczas sprawdzania dostępności użytkownika:', error);
        res.status(500).json({ error: 'Błąd podczas sprawdzania dostępności użytkownika.' });
    }
});

module.exports = router;
