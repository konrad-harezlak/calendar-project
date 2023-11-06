const Meeting = require('./meetingModel');
const jwt = require('jsonwebtoken');

const createMeeting = async (req, res) => {
    try {
        const { title, date, time, participants } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'sekretny_token');
        const userName = decodedToken.userName;
        if (!participants.includes(userName))
            participants.push(userName);
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
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'sekretny_token');
        const meetings = await Meeting.find({ participants: decodedToken.userName, date: selectedDate });
        console.log('Spotkania odczytane z bazy danych');
        res.status(200).json(meetings);
    } catch (error) {
        console.error('Błąd podczas odczytu spotkań:', error);
        res.status(500).json({ error: 'Błąd podczas odczytu spotkań.' });
    }
};

const deleteMeeting = async (req, res) => {
    const meetingId = req.params.id;

    try {
        const deletedMeeting = await Meeting.findOneAndDelete({ _id: meetingId });
        if (deletedMeeting) {
            res.status(200).json({ message: 'Spotkanie zostało usunięte.' });
        } else {
            res.status(404).json({ error: 'Spotkanie o podanym identyfikatorze nie zostało znalezione.' });
        }
    } catch (error) {
        console.error('Błąd podczas usuwania spotkania:', error);
        res.status(500).json({ error: 'Błąd podczas usuwania spotkania.' });
    }
};



module.exports = {
    createMeeting,
    readMeetings,
    deleteMeeting
};