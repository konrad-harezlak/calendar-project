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

const deleteParticipantFromMeeting = async (req, res) => {
    const meetingId = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'sekretny_token');
    const userName = decodedToken.userName;
    try {
        const meeting = await Meeting.findOne({_id: meetingId});
        if (!meeting) {
            return res.status(404).json({ error: 'Spotkanie o podanym identyfikatorze nie zostało znalezione.' });
        }

        const participantIndex = meeting.participants.findIndex(participant => participant=== userName);
        if (participantIndex === -1) {
            return res.status(404).json({ error: 'Użytkownik o podanym identyfikatorze nie jest uczestnikiem tego spotkania.' });
        }
        meeting.participants.splice(participantIndex, 1);
        await meeting.save();

        res.status(200).json({ message: 'Użytkownik został usunięty z spotkania.' });
    } catch (error) {
        console.error('Błąd podczas usuwania uczestnika ze spotkania:', error);
        res.status(500).json({ error: 'Błąd podczas usuwania uczestnika ze spotkania.' });
    }
};



module.exports = {
    createMeeting,
    readMeetings,
    deleteParticipantFromMeeting
};