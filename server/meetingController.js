const Meeting = require('./meetingModel');
const jwt = require('jsonwebtoken');

const createMeeting = async (req, res) => {
    try {
        const { title, date, time, participants } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'sekretny_token');
        console.log(participants);
        const userName = decodedToken.userName;
        if (!participants.includes(userName))
            participants.push(userName);
        console.log(participants)
        const newMeeting = new Meeting({
            title,
            date,
            time,
            participants,
        });
        const savedMeeting = await newMeeting.save();
        console.log('Spotkanie zapisane w bazie danych:', savedMeeting);
        res.status(200).json(savedMeeting);
    } catch (error) {
        console.error('Błąd podczas zapisywania spotkania: i huj', error);
        res.status(500).json({ error: 'Błąd podczas zapisywania spotkania.i huj kurwa mac' });
    }
};

const readMeetings = async (req, res) => {
    try {
        const selectedDate = req.query.date;
        console.log("tutaj" + selectedDate)
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'sekretny_token');
        const meetings = await Meeting.find({ participants: decodedToken.userName, date: selectedDate });
        console.log('Spotkania odczytane z bazy danych:', meetings);
        res.status(200).json(meetings);
    } catch (error) {
        console.error('Błąd podczas odczytu spotkań:', error);
        res.status(500).json({ error: 'Błąd podczas odczytu spotkań.' });
    }
};

module.exports = {
    createMeeting,
    readMeetings
};